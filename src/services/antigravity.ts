import { CDPConnection, Snapshot, InjectResult, ClickResult } from '../types';
import { convertVsCodeIcons } from '../utils';
import util from 'util';

// Runs in the MAIN world (no contextId) to detect generation state from the outer frame,
// since the snapshot capture runs in a sub-frame that lacks the input box.
const GENERATION_PROBE_SCRIPT = `(() => {
    try {
        // Ground-truth selector confirmed from ag_bridge poke.mjs (2026-03-28):
        // Antigravity's cancel button always has data-tooltip-id="input-send-button-cancel-tooltip"
        // and is only visible (offsetParent !== null) while generation is active.
        const cancelBtn = document.querySelector('[data-tooltip-id="input-send-button-cancel-tooltip"]');
        const isGenerating = !!(cancelBtn && cancelBtn.offsetParent !== null);
        return {
            isGenerating,
            cancelBtnFound: !!cancelBtn,
            cancelBtnVisible: isGenerating,
            cancelBtnAria: cancelBtn ? (cancelBtn.getAttribute('aria-label') || '') : null
        };
    } catch(e) {
        return { error: String(e), isGenerating: false };
    }
})()`;

// Scripts
const CAPTURE_SCRIPT = `(() => {
    try {
        const normalizeText = (value) => String(value || '').replace(/\\s+/g, ' ').trim();
        const commandPalettePattern = /(developer:\\s|reload window|recently used|other commands|command palette|show qr code|start server|stop server|end demo mode)/i;
        const modePattern = /^(fast|planning|agent|ask|chat|code|edit|execution|execute|writing)(?:\\s+mode)?$/i;
        const modelPattern = /\\b(gemini|claude|gpt(?:-[\\w.]+)?|sonnet|haiku|flash|pro|opus|llama|deepseek|model)\\b/i;
        const esc = (s) => {
            try {
                return (window.CSS && CSS.escape) ? CSS.escape(String(s)) : String(s).replace(/["\\\\]/g, '\\\\$&');
            } catch {
                return String(s);
            }
        };

        const toSelector = (el) => {
            if (!el || !el.tagName) return '';
            const testId = el.getAttribute && el.getAttribute('data-testid');
            if (testId) return el.tagName.toLowerCase() + '[data-testid="' + esc(testId) + '"]';
            if (el.id && !/^(base-ui-|:r)/.test(el.id)) return '#' + esc(el.id);
            const aria = el.getAttribute && el.getAttribute('aria-label');
            if (aria) return el.tagName.toLowerCase() + '[aria-label="' + esc(aria) + '"]';
            if (el.id) return '#' + esc(el.id);
            const parts = [];
            let cur = el;
            let depth = 0;
            while (cur && cur.nodeType === Node.ELEMENT_NODE && depth < 6) {
                let seg = cur.tagName.toLowerCase();
                if (cur.id) {
                    seg += '#' + esc(cur.id);
                    parts.unshift(seg);
                    break;
                }
                let nth = 1;
                let sib = cur;
                while ((sib = sib.previousElementSibling)) {
                    if (sib.tagName === cur.tagName) nth += 1;
                }
                seg += ':nth-of-type(' + nth + ')';
                parts.unshift(seg);
                cur = cur.parentElement;
                depth += 1;
            }
            return parts.join(' > ');
        };

        const collectControls = (root) => {
            const controlsRoot = root || document.body;
            const allButtons = Array.from(controlsRoot.querySelectorAll('button, [role="button"]'));
            const filtered = allButtons
                .map((el) => ({
                    el,
                    text: normalizeText(el.innerText || el.textContent || '')
                }))
                .filter((item) =>
                    item.text &&
                    item.text.length <= 96 &&
                    !commandPalettePattern.test(item.text)
                );

            const mode = filtered.find((item) =>
                modePattern.test(item.text) && !modelPattern.test(item.text)
            ) || null;

            const modelTriggerEl = controlsRoot.querySelector('button[data-testid="model-selector-trigger"]') ||
                document.querySelector('button[data-testid="model-selector-trigger"]');
            const modelTriggerText = modelTriggerEl ? normalizeText(modelTriggerEl.innerText || modelTriggerEl.textContent || '') : '';
            const model = (modelTriggerEl && modelTriggerText)
                ? { el: modelTriggerEl, text: modelTriggerText }
                : (filtered.find((item) =>
                    item !== mode && modelPattern.test(item.text)
                ) || null);

            // Stop/Task/Walkthrough are searched in document.body, not just the cascade,
            // because they may live in a toolbar or composer outside the cascade element.
            const allBodyButtons = Array.from(document.body.querySelectorAll('button, [role="button"]'));

            // Ground-truth selector confirmed from ag_bridge poke.mjs (2026-03-28):
            // The cancel button always has data-tooltip-id="input-send-button-cancel-tooltip"
            // and is only visible (offsetParent !== null) while generation is active.
            const stopEl = document.querySelector('[data-tooltip-id="input-send-button-cancel-tooltip"]') || null;
            const isGenerating = !!(stopEl && stopEl.offsetParent !== null);

            // Detect Task / Walkthrough buttons by visible text or aria-label.
            // Also query [role="tab"] and <a> in case they're rendered as non-button elements.
            const allBodyClickable = Array.from(document.body.querySelectorAll(
                'button, [role="button"], [role="tab"], a[href]'
            ));

            const taskPat = /^tasks?$/i;
            const taskEl = allBodyClickable.find((el) => {
                const text = normalizeText(el.innerText || el.textContent || '');
                const aria = normalizeText(el.getAttribute('aria-label') || '');
                return taskPat.test(text) || taskPat.test(aria);
            }) || null;

            const walkthroughPat = /^walkthrough$/i;
            const walkthroughEl = allBodyClickable.find((el) => {
                const text = normalizeText(el.innerText || el.textContent || '');
                const aria = normalizeText(el.getAttribute('aria-label') || '');
                return walkthroughPat.test(text) || walkthroughPat.test(aria);
            }) || null;

            return {
                scope: /^(cascade|conversation|chat|thread|messages|history|session)$/i.test(String(controlsRoot.id || ''))
                    ? String(controlsRoot.id || '').toLowerCase()
                    : (controlsRoot === document.body ? 'document' : (controlsRoot.id || controlsRoot.tagName || 'unknown').toLowerCase()),
                mode: mode ? { text: mode.text, selector: toSelector(mode.el) } : null,
                model: model ? { text: model.text, selector: toSelector(model.el) } : null,
                stop: stopEl ? { selector: toSelector(stopEl) } : null,
                task: taskEl ? { text: normalizeText(taskEl.innerText || taskEl.textContent || 'Task'), selector: toSelector(taskEl) } : null,
                walkthrough: walkthroughEl ? { text: normalizeText(walkthroughEl.innerText || walkthroughEl.textContent || 'Walkthrough'), selector: toSelector(walkthroughEl) } : null,
                isGenerating
            };
        };

        const candidateSelectors = [
            '#cascade',
            '#conversation',
            '#chat',
            '#thread',
            '#messages',
            '#history',
            '#session',
            '[data-testid="conversation-view"]',
            '[data-testid="cascade-root"]',
            '[data-testid="conversation-root"]',
            '[data-testid="chat-root"]',
            '[data-testid="thread-root"]',
            '[data-testid*="chat" i]',
            '[data-testid*="conversation" i]',
            '[data-testid*="thread" i]',
            '[data-testid="aux-pane-split"] > div:first-child',
            '[data-testid="aux-pane-split"]',
            'main [id^="cascade"]',
            'main [id*="cascade"]',
            'main [id^="conversation"]',
            'main [id*="conversation"]',
            'main [id^="chat"]',
            'main [id*="chat"]',
            'main [id*="thread"]',
            'main [id*="message"]'
        ];

        const candidates = [];
        for (const sel of candidateSelectors) {
            try {
                for (const el of Array.from(document.querySelectorAll(sel))) {
                    if (!el || !el.tagName) continue;
                    candidates.push(el);
                }
            } catch { }
        }

        // Content-based fallback: find the closest common ancestor of the first
        // message element and the composer. This works regardless of container ID.
        try {
            const firstMsg = document.querySelector('[data-message-id], article[role="article"], [data-testid*="message" i]');
            const composer = document.querySelector('[data-lexical-editor="true"][contenteditable="true"], [contenteditable="true"][role="textbox"], [contenteditable="true"][role="combobox"]');
            if (firstMsg && composer) {
                let el = firstMsg.parentElement;
                while (el && el !== document.body && el !== document.documentElement) {
                    if (el.contains(composer)) { candidates.push(el); break; }
                    el = el.parentElement;
                }
            }
        } catch { }

        const uniqueCandidates = Array.from(new Set(candidates));
        const ranked = uniqueCandidates
            .map((el) => {
                const id = (el.id || '').toLowerCase();
                const testId = (el.getAttribute && el.getAttribute('data-testid') || '').toLowerCase();
                const parentTestId = (el.parentElement && el.parentElement.getAttribute && el.parentElement.getAttribute('data-testid') || '').toLowerCase();
                const className = String(el.className || '').toLowerCase();
                const text = normalizeText(el.textContent || '');
                const hasComposer = !!el.querySelector('[data-lexical-editor="true"][contenteditable="true"], [contenteditable="true"][role="textbox"], [contenteditable="true"][role="combobox"], textarea');
                const hasMessageLike = !!el.querySelector('[data-message-id], [data-testid*="message" i], [class*="message"], article, [role="article"]');
                let score = 0;
                if (testId === 'conversation-view') score += 64;
                if (id === 'cascade') score += 60;
                if (id === 'conversation') score += 60;
                if (id === 'chat') score += 56;
                if (id === 'thread') score += 54;
                if (id === 'messages') score += 50;
                if (id === 'history') score += 46;
                if (id === 'session') score += 44;
                if (parentTestId === 'aux-pane-split') score += 42;
                if (testId === 'aux-pane-split') score += 38;
                if (id.includes('cascade')) score += 20;
                if (id.includes('conversation')) score += 20;
                if (id.includes('chat')) score += 12;
                if (id.includes('thread')) score += 12;
                if (id.includes('message')) score += 10;
                if (className.includes('cascade')) score += 8;
                if (className.includes('conversation')) score += 8;
                if (className.includes('chat')) score += 6;
                if (className.includes('thread')) score += 6;
                if (hasComposer) score += 20;
                if (hasMessageLike) score += 14;
                if (text.length > 1200) score += 8;
                if (text.length > 400) score += 4;
                if (className.includes('titlebar')) score -= 50;
                if (className.includes('quick-input') || className.includes('command')) score -= 25;
                return { el, score };
            })
            .sort((a, b) => b.score - a.score);

        const cascade = ranked.length > 0 && ranked[0].score > 0 ? ranked[0].el : null;
        const controlsRoot = cascade || document.body;
        const fullBodyHtml = document.body.outerHTML;

        const surfaceSignals = {
            hasCascade: !!cascade,
            hasComposer: !!controlsRoot.querySelector('[data-lexical-editor="true"][contenteditable="true"], [contenteditable="true"][role="textbox"], [contenteditable="true"][role="combobox"], textarea'),
            hasMessages: !!controlsRoot.querySelector('[data-message-id], [data-testid*="message" i], [class*="message"], article, [role="article"]'),
            hasCommandPalette: !!document.querySelector('.quick-input-widget, [id*="quickInput" i], [aria-label*="Type a command" i]'),
            hasQuickPick: !!document.querySelector('.quick-input-widget, [class*="quick-input" i], [class*="quickpick" i]'),
            locationHref: String(location.href || '')
        };

        let cleanHtml = fullBodyHtml;
        if (cascade) {
            const clone = cascade.cloneNode(true);
            const composer = clone.querySelector('[data-lexical-editor="true"][contenteditable="true"], [contenteditable="true"][role="textbox"], [contenteditable="true"][role="combobox"]');
            if (composer) {
                // Remove ONLY the text composer (#antigravity.agentSidePanelInputBox or form/composer)
                // so sibling approval/permission cards ("Allow", "Reject", "Run") inside
                // [data-testid="agent-input-box"] stay visible and clickable on mobile.
                const removableByClass =
                    composer.closest('#antigravity\\\\.agentSidePanelInputBox') ||
                    composer.closest('form, [class*="composer"], [id*="input" i], [id*="composer"]') ||
                    composer.closest('[data-testid="agent-input-box"]');
                // Only use the cascade>child fallback if the cascade has multiple direct children.
                // With a single child, that child contains both messages AND the composer — removing
                // it would wipe all message content from the snapshot.
                const cascadeChild = composer.closest(
                    'div[id^="cascade"] > div, div[id^="conversation"] > div, div[id^="chat"] > div, div[id^="thread"] > div, div[id^="messages"] > div, div[id^="history"] > div, div[id^="session"] > div'
                );
                const cascadeChildSafe = cascadeChild &&
                    cascadeChild.parentElement &&
                    cascadeChild.parentElement.children.length > 1 ? cascadeChild : null;
                const removable = removableByClass || cascadeChildSafe;
                if (removable && removable !== clone) removable.remove();
            }
            cleanHtml = clone.outerHTML;
        }

        let allCSS = '';
        for (const sheet of document.styleSheets) {
            try {
                for (const rule of sheet.cssRules) {
                    allCSS += rule.cssText + '\\n';
                }
            } catch (e) { }
        }
        
        const rootStyles = window.getComputedStyle(document.documentElement);
        const bodyStyles = window.getComputedStyle(document.body);

        const controls = collectControls(cascade || document.body);
        return {
            html: cleanHtml,
            controlsHtml: fullBodyHtml,
            controlsMeta: controls,
            isGenerating: controls.isGenerating ?? false,
            surfaceSignals,
            css: allCSS,
            backgroundColor: bodyStyles.backgroundColor,
            color: bodyStyles.color,
            fontFamily: bodyStyles.fontFamily,
            themeClass: document.documentElement.className,
            themeAttr: document.documentElement.getAttribute('data-theme') || '',
            colorScheme: rootStyles.colorScheme || 'dark',
            bodyBg: bodyStyles.backgroundColor,
            bodyColor: bodyStyles.color,
            rootStyle: document.documentElement.getAttribute('style') || ''
        };
    } catch (e) {
        const err = (() => {
            try {
                const anyErr = e && typeof e === 'object' ? e : {};
                return {
                    name: anyErr && anyErr.name ? String(anyErr.name) : undefined,
                    message: anyErr && anyErr.message ? String(anyErr.message) : undefined,
                    stack: anyErr && anyErr.stack ? String(anyErr.stack) : undefined,
                    toString: String(e)
                };
            } catch {
                return { toString: 'error serializing error' };
            }
        })();
        return { error: err };
    }
})()`;

// Service Methods

type SnapshotDebugContext = {
    id: number;
    exceptionDetails?: {
        text?: string;
        lineNumber?: number;
        columnNumber?: number;
        exception?: {
            type?: string;
            subtype?: string;
            description?: string;
            value?: string;
        };
    };
    result?: {
        type?: string;
        subtype?: string;
        description?: string;
        hasValue?: boolean;
        valueType?: string;
    };
    error?: string;
};

type SnapshotDebugResult = { snapshot?: Snapshot; errors: string[]; contexts: SnapshotDebugContext[] };

function stringifyValue(value: unknown): string {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    try {
        const seen = new Set();
        return JSON.stringify(value, (_key, val) => {
            if (typeof val === 'object' && val !== null) {
                if (seen.has(val)) return '[Circular]';
                seen.add(val);
            }
            return val;
        });
    } catch {
        try {
            return util.inspect(value, { depth: 3, breakLength: 120 });
        } catch {
            return String(value);
        }
    }
}

function formatException(details: any): string {
    if (!details) return 'unknown exception';
    const text = stringifyValue(details.text || details.exception?.description || details.exception?.value);
    const line = typeof details.lineNumber === 'number' ? ` line ${details.lineNumber}` : '';
    const col = typeof details.columnNumber === 'number' ? ` col ${details.columnNumber}` : '';
    return `${text || 'exception'}${line}${col}`.trim();
}

async function captureSnapshotInternal(cdp: CDPConnection): Promise<SnapshotDebugResult> {
    const errors: string[] = [];
    const contexts: SnapshotDebugContext[] = [];

    for (const ctx of cdp.contexts) {
        const ctxDiag: SnapshotDebugContext = { id: ctx.id };
        try {
            const result = await cdp.call("Runtime.evaluate", {
                expression: CAPTURE_SCRIPT,
                returnByValue: true,
                contextId: ctx.id
            });

            const exceptionDetails = (result as any)?.exceptionDetails;
            if (exceptionDetails) {
                ctxDiag.exceptionDetails = {
                    text: exceptionDetails.text,
                    lineNumber: exceptionDetails.lineNumber,
                    columnNumber: exceptionDetails.columnNumber,
                    exception: exceptionDetails.exception ? {
                        type: exceptionDetails.exception.type,
                        subtype: exceptionDetails.exception.subtype,
                        description: exceptionDetails.exception.description,
                        value: stringifyValue(exceptionDetails.exception.value)
                    } : undefined
                };
                errors.push(`ctx ${ctx.id}: ${formatException(exceptionDetails)}`);
                continue;
            }

            if (result.result?.value) {
                const snapshot = result.result.value as Snapshot;
                if (snapshot.error) {
                    ctxDiag.error = stringifyValue(snapshot.error);
                    errors.push(`ctx ${ctx.id}: ${stringifyValue(snapshot.error)}`);
                    continue;
                }

                // Convert vscode-file:// icons to base64 in both HTML and CSS
                snapshot.html = convertVsCodeIcons(snapshot.html);
                snapshot.css = convertVsCodeIcons(snapshot.css);

                // Run generation probe in the MAIN world (no contextId) since the
                // snapshot frame is a sub-frame that doesn't have the input box.
                try {
                    const probeResult = await cdp.call("Runtime.evaluate", {
                        expression: GENERATION_PROBE_SCRIPT,
                        returnByValue: true
                    });
                    const probeVal = probeResult?.result?.value;
                    if (probeVal && !probeVal.error) {
                        (snapshot as any).isGenerating = probeVal.isGenerating ?? false;
                    }
                } catch { /* generation probe is best-effort */ }

                return { snapshot, errors, contexts };
            }

            if (result.result) {
                const type = (result.result as any).type || 'unknown';
                const subtype = (result.result as any).subtype || '';
                const desc = (result.result as any).description || '';
                ctxDiag.result = {
                    type,
                    subtype,
                    description: desc,
                    hasValue: Object.prototype.hasOwnProperty.call(result.result, 'value'),
                    valueType: typeof (result.result as any).value
                };
                const meta = [type, subtype].filter(Boolean).join('/');
                errors.push(`ctx ${ctx.id}: empty result (${meta || 'n/a'}${desc ? ` - ${desc}` : ''})`);
            } else {
                errors.push(`ctx ${ctx.id}: empty result (no result object)`);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : stringifyValue(err);
            ctxDiag.error = message;
            errors.push(`ctx ${ctx.id}: ${message}`);
        } finally {
            contexts.push(ctxDiag);
        }
    }

    // Fallback: try main world without contextId
    try {
        const result = await cdp.call("Runtime.evaluate", {
            expression: CAPTURE_SCRIPT,
            returnByValue: true
        });

        const exceptionDetails = (result as any)?.exceptionDetails;
        if (exceptionDetails) {
            errors.push(`default context: ${formatException(exceptionDetails)}`);
        } else if (result.result?.value) {
            const snapshot = result.result.value as Snapshot;
            if (!snapshot.error) {
                snapshot.html = convertVsCodeIcons(snapshot.html);
                snapshot.css = convertVsCodeIcons(snapshot.css);
                return { snapshot, errors, contexts };
            }
            errors.push(`default context: ${stringifyValue(snapshot.error)}`);
        } else {
            errors.push('default context: empty result');
        }
    } catch (err) {
        const message = err instanceof Error ? err.message : stringifyValue(err);
        errors.push(`default context: ${message}`);
    }

    return { errors, contexts };
}

export async function captureSnapshot(cdp: CDPConnection): Promise<Snapshot | null> {
    const { snapshot } = await captureSnapshotInternal(cdp);
    return snapshot ?? null;
}

export async function captureSnapshotDebug(cdp: CDPConnection): Promise<SnapshotDebugResult> {
    return captureSnapshotInternal(cdp);
}

export async function injectMessage(cdp: CDPConnection, text: string): Promise<InjectResult> {
    const safeText = JSON.stringify(text);

    const EXPRESSION = `(async () => {
        // Find visible editor - Broad discovery
        const editorSelectors = [
            '[data-testid="agent-input-box"] [data-lexical-editor="true"][contenteditable="true"]',
            '[data-testid="agent-input-box"] [contenteditable="true"]',
            '#conversation [data-lexical-editor="true"][contenteditable="true"]',
            '#cascade [data-lexical-editor="true"][contenteditable="true"]',
            '#chat [data-lexical-editor="true"][contenteditable="true"]',
            '#thread [data-lexical-editor="true"][contenteditable="true"]',
            '[data-lexical-editor="true"][contenteditable="true"]',
            '[contenteditable="true"][role="combobox"]',
            '[contenteditable="true"][role="textbox"]',
            'div.max-h-\\\\[300px\\\\].rounded.cursor-text'
        ];

        let editor = null;
        for (const sel of editorSelectors) {
            const el = [...document.querySelectorAll(sel)].filter(e => e.offsetParent !== null).at(-1);
            if (el) {
                editor = el;
                break;
            }
        }

        if (!editor) return { ok:false, reason:"editor_not_found" };

        const selectAllInEditor = () => {
            editor.focus();
            try {
                const range = document.createRange();
                range.selectNodeContents(editor);
                const sel = window.getSelection();
                if (sel) {
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            } catch {}
        };

        const readEditorText = () => (editor.innerText || editor.textContent || '').trim();
        const targetText = ${safeText};
        const expectedTrimmed = targetText.trim();

        // Clear any existing draft cleanly
        selectAllInEditor();
        if (readEditorText().length > 0) {
            try {
                editor.dispatchEvent(new InputEvent("beforeinput", { bubbles: true, cancelable: true, inputType: "deleteContentBackward" }));
            } catch {}
            try { document.execCommand?.("delete", false, null); } catch {}
            await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
            selectAllInEditor();
        }

        // Strategy 1 (Primary for Antigravity 2.0 / Lexical): ClipboardEvent('paste')
        // Works reliably even when the OOPIF iframe is unfocused and updates Lexical's internal EditorState.
        let inserted = false;
        try {
            const dt = new DataTransfer();
            dt.setData("text/plain", targetText);
            editor.dispatchEvent(new ClipboardEvent("paste", { bubbles: true, cancelable: true, clipboardData: dt }));
            await new Promise(r => setTimeout(r, 80));
            const cur = readEditorText();
            if (cur.length > 0 && (!expectedTrimmed || cur.includes(expectedTrimmed.slice(0, 40)))) {
                inserted = true;
            }
        } catch {}

        // Strategy 2: execCommand('insertText')
        if (!inserted) {
            selectAllInEditor();
            try {
                document.execCommand?.("insertText", false, targetText);
                await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
                const cur = readEditorText();
                if (cur.length > 0 && (!expectedTrimmed || cur.includes(expectedTrimmed.slice(0, 40)))) {
                    inserted = true;
                }
            } catch {}
        }

        // Strategy 3: beforeinput / input events (do not pre-mutate textContent if Lexical handles beforeinput)
        if (!inserted) {
            selectAllInEditor();
            try {
                editor.dispatchEvent(new InputEvent("beforeinput", { bubbles: true, cancelable: true, inputType: "insertText", data: targetText }));
                await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
                const cur = readEditorText();
                if (cur.length > 0) inserted = true;
            } catch {}
        }

        if (!inserted) {
            editor.textContent = targetText;
            editor.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: targetText }));
        }

        await new Promise(r => setTimeout(r, 100));

        // Submit Button Discovery
        const submitSelectors = [
            'button[data-testid="send-button"]',
            'svg.lucide-arrow-right',
            'svg.lucide-arrow-up',
            'button[aria-label*="Send"]',
            'button[aria-label*="Submit"]'
        ];

        let submit = null;
        for (const sel of submitSelectors) {
            const el = document.querySelector(sel)?.closest("button");
            if (el && !el.disabled && el.offsetParent !== null) {
                submit = el;
                break;
            }
        }

        if (submit) {
            submit.click();
            return { ok:true, method:"click_submit" };
        }

        editor.dispatchEvent(new KeyboardEvent("keydown", { bubbles:true, cancelable:true, key:"Enter", code:"Enter", keyCode:13, which:13 }));
        editor.dispatchEvent(new KeyboardEvent("keyup", { bubbles:true, cancelable:true, key:"Enter", code:"Enter", keyCode:13, which:13 }));
        
        return { ok:true, method:"enter_keypress" };
    })()`;

    let lastResult: InjectResult = { ok: false, reason: "no_context" };

    for (const ctx of cdp.contexts) {
        try {
            const result = await cdp.call("Runtime.evaluate", {
                expression: EXPRESSION,
                returnByValue: true,
                awaitPromise: true,
                contextId: ctx.id
            });

            const injResult = result.result?.value as InjectResult | undefined;

            if (injResult) {
                if (injResult.ok) return injResult;
                lastResult = injResult;
            }
        } catch { }
    }

    // Fallback: main world (no contextId) — handles cases where no sub-contexts
    // were captured during the 1-second wait in connectCDP.
    try {
        const result = await cdp.call("Runtime.evaluate", {
            expression: EXPRESSION,
            returnByValue: true,
            awaitPromise: true
        });
        const injResult = result.result?.value as InjectResult | undefined;
        if (injResult?.ok) return injResult;
        if (injResult) lastResult = injResult;
    } catch { }

    return lastResult;
}

export async function clickElement(
    cdp: CDPConnection,
    text?: string,
    tag?: string,
    x?: number,
    y?: number,
    selector?: string
): Promise<ClickResult> {
    // Smart Click Script
    const CLICK_SCRIPT = `(() => {
        const textToFind = ${JSON.stringify(text || '')};
        const tagToFind = ${JSON.stringify(tag || '*')};
        const targetX = ${JSON.stringify(x)};
        const targetY = ${JSON.stringify(y)};
        const selectorToFind = ${JSON.stringify(selector || '')};
        
        function isVisible(el) {
            const rect = el.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).visibility !== 'hidden';
        }

        function clickElement(el) {
             const rect = el.getBoundingClientRect();
             const clickX = targetX || (rect.left + rect.width / 2);
             const clickY = targetY || (rect.top + rect.height / 2);

             const opts = {
                 bubbles: true,
                 cancelable: true,
                 view: window,
                 button: 0,
                 buttons: 1,
                 clientX: clickX,
                 clientY: clickY,
                 screenX: clickX,
                 screenY: clickY
             };

             // Proper browser event order (pointerdown -> mousedown -> pointerup -> mouseup -> native click)
             // so Base UI (@base-ui/react) and Radix triggers/menuitems open and select cleanly.
             try { el.dispatchEvent(new PointerEvent('pointerdown', opts)); } catch(e) {}
             el.dispatchEvent(new MouseEvent('mousedown', opts));
             try { el.dispatchEvent(new PointerEvent('pointerup', { ...opts, buttons: 0 })); } catch(e) {}
             el.dispatchEvent(new MouseEvent('mouseup', { ...opts, buttons: 0 }));
             if (typeof el.click === 'function') {
                 el.click();
             } else {
                 el.dispatchEvent(new MouseEvent('click', { ...opts, buttons: 0 }));
             }
             
             if (['INPUT', 'TEXTAREA'].includes(el.tagName) || el.getAttribute('contenteditable') === 'true') {
                 el.focus();
             }
        }

        // Recursive search that enters Shadow DOM
        function findInTree(root, predicate) {
            if (!root) return null;
            
            // Try standard query selector first for speed if it's an element/doc
            if (root.querySelector && selectorToFind) {
                try {
                    const found = root.querySelector(selectorToFind);
                    if (found && isVisible(found)) return found;
                } catch(e) {}
            }

            const elements = root.querySelectorAll ? Array.from(root.querySelectorAll('*')) : [];
            for (const el of elements) {
                if (predicate(el)) return el;
                if (el.shadowRoot) {
                    const found = findInTree(el.shadowRoot, predicate);
                    if (found) return found;
                }
            }
            return null;
        }

        // 0. Special action: dismiss any open popup/menu cleanly on the host IDE
        if (selectorToFind === '__dismiss_menu__') {
            const escOpts = { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true, cancelable: true };
            (document.activeElement || document.body).dispatchEvent(new KeyboardEvent('keydown', escOpts));
            document.dispatchEvent(new KeyboardEvent('keydown', escOpts));
            const openTrigger = document.querySelector('button[data-testid="model-selector-trigger"][aria-expanded="true"]');
            if (openTrigger) openTrigger.click();
            return { success: true, method: 'dismiss_menu', target: 'Escape' };
        }

        // 1. Selector (Highest Priority)
        if (selectorToFind) {
            const el = findInTree(document, (e) => {
                try { return e.matches && e.matches(selectorToFind) && isVisible(e); } catch(err) { return false; }
            });
            if (el) {
                clickElement(el);
                return { success: true, method: 'selector_hit', target: selectorToFind };
            }
        }

        // 2. Precise text match (Shadow-aware, preferring open menus/popups & interactive elements)
        if (textToFind && textToFind.length > 0) {
            const normText = (el) => (el.innerText || el.textContent || '').replace(/\\s+/g, ' ').trim();
            const openMenus = Array.from(document.querySelectorAll('[data-base-ui-portal] [role="menu"], [role="menu"][data-open], [role="listbox"][data-open], [data-base-ui-portal]'));
            let menuMatch = null;
            for (const menu of openMenus) {
                const items = Array.from(menu.querySelectorAll('[role="menuitem"], [role="menuitemradio"], [role="option"], button, [role="button"]')).filter(isVisible);
                menuMatch = items.find((el) => normText(el) === textToFind)
                    || items.find((el) => normText(el).toLowerCase().startsWith(textToFind.toLowerCase()))
                    || items.find((el) => normText(el).toLowerCase().includes(textToFind.toLowerCase()));
                if (menuMatch) break;
            }
            if (menuMatch) {
                clickElement(menuMatch);
                return { success: true, method: 'menu_text_hit', target: textToFind };
            }

            // Prefer exact button / interactive element match (e.g. "Allow", "Reject", "Run")
            // using the last visible match so active/bottom-most approval prompts win over old turns.
            const interactiveCandidates = Array.from(document.querySelectorAll('button, [role="button"], [role="menuitem"], [role="option"], a[href]')).filter(isVisible);
            const exactBtn = interactiveCandidates.filter((el) => normText(el) === textToFind).at(-1)
                || interactiveCandidates.filter((el) => normText(el).toLowerCase() === textToFind.toLowerCase()).at(-1);
            if (exactBtn) {
                clickElement(exactBtn);
                return { success: true, method: 'button_text_hit', target: textToFind };
            }

            const match = findInTree(document, (el) => {
                const tag = el.tagName.toLowerCase();
                const isCorrectTag = tagToFind === '*' || tag === tagToFind.toLowerCase();
                if (!isCorrectTag) return false;
                
                const text = normText(el);
                return text === textToFind && isVisible(el);
            }) || findInTree(document, (el) => {
                const tag = el.tagName.toLowerCase();
                const isCorrectTag = tagToFind === '*' || tag === tagToFind.toLowerCase();
                if (!isCorrectTag) return false;
                
                const text = normText(el);
                return text.includes(textToFind) && isVisible(el);
            });
            
            if (match) {
                let interactive = match;
                let parent = match.parentElement || (match.parentNode && match.parentNode.host ? match.parentNode.host : null);
                while (parent && parent !== document.body) {
                    const tag = parent.tagName.toLowerCase();
                    const role = parent.getAttribute ? parent.getAttribute('role') : '';
                    if (tag === 'button' || tag === 'a' || role === 'button' || role === 'menuitem' || role === 'menuitemradio' || role === 'option') {
                        interactive = parent;
                        break;
                    }
                    parent = parent.parentElement || (parent.parentNode && parent.parentNode.host ? parent.parentNode.host : null);
                }

                clickElement(interactive);
                return { success: true, method: 'text_hit', target: textToFind };
            }
        }

        // 3. Fallback: Coordinate-based interaction (only when selector and text did not match)
        if (typeof targetX === 'number' && typeof targetY === 'number') {
            const el = document.elementFromPoint(targetX, targetY);
            if (el) {
                let interactive = el;
                let parent = el.parentElement;
                while (parent && parent !== document.body) {
                    const tag = parent.tagName.toLowerCase();
                    if (tag === 'button' || tag === 'a' || parent.getAttribute('role') === 'button' || parent.onclick) {
                        interactive = parent;
                        break;
                    }
                    parent = parent.parentElement;
                }
                clickElement(interactive);
                return { success: true, method: 'coordinate_hit', target: interactive.tagName };
            }
        }

        return { success: false, error: 'No element found' };
    })()`;

    for (const ctx of cdp.contexts) {
        try {
            const result = await cdp.call("Runtime.evaluate", {
                expression: CLICK_SCRIPT,
                returnByValue: true,
                awaitPromise: true,
                contextId: ctx.id
            });

            const val = result.result?.value as ClickResult;
            if (val && val.success) {
                return val;
            }
        } catch (e) { }
    }

    // Fallback: main world (no contextId)
    try {
        const result = await cdp.call("Runtime.evaluate", {
            expression: CLICK_SCRIPT,
            returnByValue: true,
            awaitPromise: true
        });
        const val = result.result?.value as ClickResult;
        if (val && val.success) {
            return val;
        }
    } catch (e) { }

    return { success: false, reason: 'Could not find element' };
}

// Text patterns for "Add context"-style buttons (broadened to survive UI renames).
const ADD_CTX_PATTERNS = ['add context', 'add file', 'attach', 'upload context', 'context'];
// Text/aria patterns for the file/media sub-menu item.
const MEDIA_PATTERNS = ['media', 'file', 'files', 'image', 'images', 'photo', 'document', 'upload'];

export async function injectFile(cdp: CDPConnection, filePath: string, targetSelector?: string): Promise<InjectResult> {
    console.log(`[injectFile] Attempting injection for ${filePath} (selector: ${targetSelector || 'auto'})`);

    try {
        await cdp.call("Page.enable", {});
        await cdp.call("DOM.enable", {});
        await cdp.call("Page.setInterceptFileChooserDialog", { enabled: true });

        // Strategy 1: direct file-input injection — doesn't rely on UI button labels at all.
        // Try this first; it works when Antigravity pre-renders the input in the DOM.
        for (const ctx of cdp.contexts) {
            const direct = await tryDirectInputInjection(cdp, ctx.id, filePath, targetSelector);
            if (direct.ok) {
                console.log(`   [ctx:${ctx.id}] Direct injection succeeded`);
                return direct;
            }
        }

        // Strategy 2: UI interaction — find the attachment-opener button, click it,
        // then click the file/media sub-menu item, then inject into the revealed input.
        let targetCtxId: number | null = null;

        for (const ctx of cdp.contexts) {
            const res = await cdp.call("Runtime.evaluate", {
                expression: `(() => {
                    const patterns = ${JSON.stringify(ADD_CTX_PATTERNS)};
                    const el = Array.from(document.querySelectorAll('div, button, [role="button"]')).find(el => {
                        const text = (el.innerText || el.textContent || '').toLowerCase().trim();
                        const aria = (el.getAttribute('aria-label') || '').toLowerCase();
                        const tip  = (el.getAttribute('data-tooltip-id') || el.getAttribute('data-testid') || '').toLowerCase();
                        return patterns.some(p => text.includes(p) || aria.includes(p) || tip.includes(p));
                    });
                    return !!el;
                })()`,
                contextId: ctx.id,
                returnByValue: true
            });
            if (res.result?.value) {
                targetCtxId = ctx.id;
                break;
            }
        }

        if (!targetCtxId) {
            console.log('   No attachment-opener button found in any context');
            return { ok: false, reason: 'ui_not_found' };
        }

        console.log(`   [ctx:${targetCtxId}] Found attachment-opener. Clicking...`);

        const clickResult = await cdp.call("Runtime.evaluate", {
            expression: `(async () => {
                try {
                    const addPatterns  = ${JSON.stringify(ADD_CTX_PATTERNS)};
                    const filePatterns = ${JSON.stringify(MEDIA_PATTERNS)};

                    const opener = Array.from(document.querySelectorAll('div, button, [role="button"]')).find(el => {
                        const text = (el.innerText || el.textContent || '').toLowerCase().trim();
                        const aria = (el.getAttribute('aria-label') || '').toLowerCase();
                        const tip  = (el.getAttribute('data-tooltip-id') || el.getAttribute('data-testid') || '').toLowerCase();
                        return addPatterns.some(p => text.includes(p) || aria.includes(p) || tip.includes(p));
                    });
                    if (!opener) return 'no_opener';
                    opener.click();
                    await new Promise(r => setTimeout(r, 700));

                    // Find the visible file/media sub-menu item — prefer exact match first.
                    const candidates = Array.from(document.querySelectorAll(
                        'div, button, [role="button"], [role="menuitem"], [role="option"], li'
                    )).filter(el => el.offsetParent !== null);

                    const fileBtn = candidates.find(el => {
                        const text = (el.innerText || el.textContent || '').trim().toLowerCase();
                        const aria = (el.getAttribute('aria-label') || '').toLowerCase();
                        return filePatterns.some(p => text === p || aria === p);
                    }) || candidates.find(el => {
                        const text = (el.innerText || el.textContent || '').trim().toLowerCase();
                        const aria = (el.getAttribute('aria-label') || '').toLowerCase();
                        return filePatterns.some(p => text.includes(p) || aria.includes(p));
                    });

                    if (fileBtn) {
                        const label = (fileBtn.textContent || '').trim();
                        fileBtn.click();
                        return 'clicked:' + label;
                    }
                    return 'file_btn_not_found';
                } catch(e) { return 'error:' + e.toString(); }
            })()`,
            contextId: targetCtxId,
            awaitPromise: true
        });
        console.log(`   UI click result: ${clickResult.result?.value}`);

        // Retry loop: wait for the file input to appear after the menu animation.
        for (let attempt = 0; attempt < 6; attempt++) {
            const findInputRes = await cdp.call("Runtime.evaluate", {
                expression: `(() => {
                    const selector = ${JSON.stringify(targetSelector || '')};
                    let input = null;
                    if (selector) { try { input = document.querySelector(selector); } catch(e) {} }
                    if (!input) {
                        const inputs = Array.from(document.querySelectorAll('input[type="file"]'));
                        input = inputs.find(i => i.offsetParent !== null) || inputs[0];
                    }
                    return input ? (input.dataset.agId = 'ag-' + Date.now()) : null;
                })()`,
                contextId: targetCtxId,
                returnByValue: true
            });

            const uid = findInputRes.result?.value;
            if (uid) {
                const ret = await cdp.call("Runtime.evaluate", {
                    expression: `document.querySelector('[data-ag-id="${uid}"]')`,
                    contextId: targetCtxId
                });
                if (ret.result?.objectId) {
                    const ok = await setFilesAndDispatch(cdp, ret.result.objectId, filePath);
                    if (ok) return { ok: true, method: 'ui_interaction_injection' };
                }
            }
            await new Promise(r => setTimeout(r, 300));
        }

        return { ok: false, reason: 'input_not_invokable' };

    } catch (e) {
        console.log('Injection failed:', (e as Error).message);
    }

    return { ok: false, reason: 'injection_error' };
}

async function setFilesAndDispatch(cdp: CDPConnection, objectId: string, filePath: string): Promise<boolean> {
    await cdp.call("DOM.setFileInputFiles", { files: [filePath], objectId });
    await cdp.call("Runtime.callFunctionOn", {
        objectId,
        functionDeclaration: `function() {
             const tracker = this._valueTracker;
             if (tracker) tracker.setValue('');
             this.dispatchEvent(new Event('input', { bubbles: true }));
             this.dispatchEvent(new Event('change', { bubbles: true }));
         }`
    });
    return true;
}

async function tryDirectInputInjection(
    cdp: CDPConnection,
    contextId: number,
    filePath: string,
    targetSelector?: string
): Promise<InjectResult> {
    try {
        const res = await cdp.call("Runtime.evaluate", {
            expression: `(() => {
                const selector = ${JSON.stringify(targetSelector || '')};
                let input = null;
                if (selector) {
                    try { input = document.querySelector(selector); } catch(e) {}
                }
                if (!input) {
                    const inputs = Array.from(document.querySelectorAll('input[type="file"]'));
                    // Prefer visible input but fall back to any
                    input = inputs.find(i => i.offsetParent !== null) || inputs[0];
                }
                return input ? (input.dataset.agId = 'ag-' + Date.now()) : null;
            })()`,
            contextId,
            returnByValue: true
        });

        const uid = res.result?.value;
        if (!uid) return { ok: false, reason: 'input_not_found' };

        const ret = await cdp.call("Runtime.evaluate", {
            expression: `document.querySelector('[data-ag-id="${uid}"]')`,
            contextId
        });

        if (ret.result && ret.result.objectId) {
            await setFilesAndDispatch(cdp, ret.result.objectId, filePath);
            return { ok: true, method: 'direct_input_injection' };
        }

        return { ok: false, reason: 'input_not_invokable' };
    } catch {
        return { ok: false, reason: 'input_not_invokable' };
    }
}

export async function probeVSCode(cdp: CDPConnection): Promise<any> {
    const PROBE_SCRIPT = `(async () => {
        const results = {
            vscode: typeof vscode !== 'undefined',
            ipcKeys: []
        };

        if (typeof vscode !== 'undefined' && vscode.ipcRenderer) {
            results.ipcKeys = Object.keys(vscode.ipcRenderer);
        }

        return results;
    })()`;

    const allProbes: any[] = [];
    for (const ctx of cdp.contexts) {
        try {
            const result = await cdp.call("Runtime.evaluate", {
                expression: PROBE_SCRIPT,
                returnByValue: true,
                awaitPromise: true,
                contextId: ctx.id
            });
            allProbes.push({ contextId: ctx.id, data: result.result?.value });
        } catch (e) {
            allProbes.push({ contextId: ctx.id, error: (e as Error).message });
        }
    }
    return { target: cdp.title, probes: allProbes };
}
