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
            if (el.id) return '#' + esc(el.id);
            const testId = el.getAttribute && el.getAttribute('data-testid');
            if (testId) return el.tagName.toLowerCase() + '[data-testid="' + esc(testId) + '"]';
            const aria = el.getAttribute && el.getAttribute('aria-label');
            if (aria) return el.tagName.toLowerCase() + '[aria-label="' + esc(aria) + '"]';
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

            const model = filtered.find((item) =>
                item !== mode && modelPattern.test(item.text)
            ) || null;

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
                scope: /^(cascade|conversation|chat)$/i.test(String(controlsRoot.id || ''))
                    ? String(controlsRoot.id || '').toLowerCase()
                    : (controlsRoot === document.body ? 'document' : (controlsRoot.tagName || 'unknown').toLowerCase()),
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
            '[data-testid="cascade-root"]',
            '[data-testid="conversation-root"]',
            '[data-testid="chat-root"]',
            'main [id^="cascade"]',
            'main [id*="cascade"]',
            'main [id^="conversation"]',
            'main [id*="conversation"]',
            'main [id^="chat"]',
            'main [id*="chat"]'
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

        const uniqueCandidates = Array.from(new Set(candidates));
        const ranked = uniqueCandidates
            .map((el) => {
                const id = (el.id || '').toLowerCase();
                const className = String(el.className || '').toLowerCase();
                const text = normalizeText(el.textContent || '');
                const hasComposer = !!el.querySelector('[data-lexical-editor="true"][contenteditable="true"], [contenteditable="true"][role="textbox"], textarea');
                const hasMessageLike = !!el.querySelector('[data-message-id], [data-testid*="message" i], [class*="message"], article, [role="article"]');
                let score = 0;
                if (id === 'cascade') score += 60;
                if (id === 'conversation') score += 60;
                if (id === 'chat') score += 56;
                if (id.includes('cascade')) score += 20;
                if (id.includes('conversation')) score += 20;
                if (id.includes('chat')) score += 12;
                if (className.includes('cascade')) score += 8;
                if (className.includes('conversation')) score += 8;
                if (className.includes('chat')) score += 6;
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
            hasComposer: !!controlsRoot.querySelector('[data-lexical-editor="true"][contenteditable="true"], [contenteditable="true"][role="textbox"], textarea'),
            hasMessages: !!controlsRoot.querySelector('[data-message-id], [data-testid*="message" i], [class*="message"], article, [role="article"]'),
            hasCommandPalette: !!document.querySelector('.quick-input-widget, [id*="quickInput" i], [aria-label*="Type a command" i]'),
            hasQuickPick: !!document.querySelector('.quick-input-widget, [class*="quick-input" i], [class*="quickpick" i]'),
            locationHref: String(location.href || '')
        };

        let cleanHtml = fullBodyHtml;
        if (cascade) {
            const clone = cascade.cloneNode(true);
            const composer = clone.querySelector('[data-lexical-editor="true"][contenteditable="true"], [contenteditable="true"][role="textbox"]');
            if (composer) {
                const removable = composer.closest('form, [class*="composer"], [id*="input"], [id*="composer"]')
                    || composer.closest('div[id^="cascade"] > div, div[id^="conversation"] > div, div[id^="chat"] > div');
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
            bodyColor: bodyStyles.color
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
            '#cascade [data-lexical-editor="true"][contenteditable="true"]',
            '[data-lexical-editor="true"][contenteditable="true"]',
            '[contenteditable="true"][role="textbox"]',
            'div.max-h-\\\\[300px\\\\].rounded.cursor-text' // New Tailwind-based selector
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

        editor.focus();
        document.execCommand?.("selectAll", false, null);
        document.execCommand?.("delete", false, null);

        let inserted = false;
        try { inserted = !!document.execCommand?.("insertText", false, ${safeText}); } catch {}
        if (!inserted) {
            editor.textContent = ${safeText};
            editor.dispatchEvent(new InputEvent("beforeinput", { bubbles:true, inputType:"insertText", data:${safeText} }));
            editor.dispatchEvent(new InputEvent("input", { bubbles:true, inputType:"insertText", data:${safeText} }));
        }

        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

        // Submit Button Discovery
        const submitSelectors = [
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

        editor.dispatchEvent(new KeyboardEvent("keydown", { bubbles:true, key:"Enter", code:"Enter" }));
        editor.dispatchEvent(new KeyboardEvent("keyup", { bubbles:true, key:"Enter", code:"Enter" }));
        
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
                 clientX: clickX,
                 clientY: clickY,
                 screenX: clickX,
                 screenY: clickY
             };

             el.dispatchEvent(new MouseEvent('mousedown', opts));
             el.dispatchEvent(new MouseEvent('mouseup', opts));
             el.dispatchEvent(new MouseEvent('click', opts));
             
             try {
                 el.dispatchEvent(new PointerEvent('pointerdown', opts));
                 el.dispatchEvent(new PointerEvent('pointerup', opts));
             } catch(e) {}
             
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

        // 2. Coordinate-based interaction
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

        // 3. Fallback: Precise text match (Shadow-aware)
        if (textToFind && textToFind.length > 0) {
            const match = findInTree(document, (el) => {
                const tag = el.tagName.toLowerCase();
                const isCorrectTag = tagToFind === '*' || tag === tagToFind.toLowerCase();
                if (!isCorrectTag) return false;
                
                const text = el.innerText || el.textContent || '';
                return text.trim() === textToFind && isVisible(el);
            }) || findInTree(document, (el) => {
                const tag = el.tagName.toLowerCase();
                const isCorrectTag = tagToFind === '*' || tag === tagToFind.toLowerCase();
                if (!isCorrectTag) return false;
                
                const text = el.innerText || el.textContent || '';
                return text.includes(textToFind) && isVisible(el);
            });
            
            if (match) {
                let interactive = match;
                let parent = match.parentElement || (match.parentNode && match.parentNode.host ? match.parentNode.host : null);
                while (parent && parent !== document.body) {
                    const tag = parent.tagName.toLowerCase();
                    if (tag === 'button' || tag === 'a' || parent.getAttribute('role') === 'button') {
                        interactive = parent;
                        break;
                    }
                    parent = parent.parentElement || (parent.parentNode && parent.parentNode.host ? parent.parentNode.host : null);
                }

                clickElement(interactive);
                return { success: true, method: 'text_hit', target: textToFind };
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

    return { success: false, reason: 'Could not find element' };
}

// Robust Strategy: UI Interaction + File Chooser Interception
export async function injectFile(cdp: CDPConnection, filePath: string, targetSelector?: string): Promise<InjectResult> {
    console.log(`[injectFile] Attempting injection for ${filePath} (selector: ${targetSelector || 'auto'})`);

    try {
        await cdp.call("Page.enable", {});
        await cdp.call("DOM.enable", {});
        await cdp.call("Page.setInterceptFileChooserDialog", { enabled: true });

        // Try to locate a context with "Add context" UI
        let targetCtxId: number | null = null;

        for (const ctx of cdp.contexts) {
            const res = await cdp.call("Runtime.evaluate", {
                expression: `(() => {
                    const btn = Array.from(document.querySelectorAll('div, button')).find(el => (el.innerText || '').toLowerCase().includes('add context'));
                    return !!btn;
                })()`,
                contextId: ctx.id,
                returnByValue: true
            });
            if (res.result?.value) {
                targetCtxId = ctx.id;
                break;
            }
        }

        // Fallback: if we didn't find the UI, try direct file input in any context
        if (!targetCtxId) {
            for (const ctx of cdp.contexts) {
                const direct = await tryDirectInputInjection(cdp, ctx.id, filePath, targetSelector);
                if (direct.ok) return direct;
            }
            return { ok: false, reason: 'ui_not_found' };
        }

        console.log(`   [ctx:${targetCtxId}] Found UI context. Initiating click sequence...`);

        // Execute Click Sequence
        const interactionResult = await cdp.call("Runtime.evaluate", {
            expression: `(async () => {
                try {
                    const buttons = Array.from(document.querySelectorAll('div, button'));
                    const addContextBtn = buttons.find(el => (el.innerText || '').includes('Add context'));
                    if (!addContextBtn) return 'no_add_btn';
                    
                    addContextBtn.click();
                    await new Promise(r => setTimeout(r, 600)); // Wait for menu animation
                    
                    const mediaBtn = Array.from(document.querySelectorAll('div, button'))
                                    .find(el => (el.innerText || '').trim() === 'Media' && el.offsetParent !== null);
                    
                    if (mediaBtn) {
                        mediaBtn.click();
                        return 'clicked_media';
                    }
                    return 'media_not_found';
                } catch(e) { return e.toString(); }
            })()`,
            contextId: targetCtxId,
            awaitPromise: true
        });
        console.log(`   UI Click sequence result: ${interactionResult.result?.value}`);

        // Try to find the file input with retries (menu animation latency)
        for (let attempt = 0; attempt < 5; attempt++) {
            const findInputRes = await cdp.call("Runtime.evaluate", {
                expression: `(() => {
                     const selector = ${JSON.stringify(targetSelector || '')};
                     let input = null;
                     if (selector) {
                        try { input = document.querySelector(selector); } catch(e) {}
                     }
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

                if (ret.result && ret.result.objectId) {
                    const ok = await setFilesAndDispatch(cdp, ret.result.objectId, filePath);
                    if (ok) return { ok: true, method: 'ui_interaction_injection' };
                }
            }

            await new Promise(r => setTimeout(r, 200));
        }

        // Last resort: try direct input injection in all contexts
        for (const ctx of cdp.contexts) {
            const direct = await tryDirectInputInjection(cdp, ctx.id, filePath, targetSelector);
            if (direct.ok) return direct;
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
