import { CDPConnection, Snapshot, InjectResult, ClickResult } from '../types';
import { convertVsCodeIcons } from '../utils';

// Scripts
const CAPTURE_SCRIPT = `(() => {
    try {
        const containerSelectors = [
            '#cascade',
            '.titlebar.cascade-panel-open',
            '.cascade-bar',
            '[id="workbench.parts.titlebar"]'
        ];
        
        let cascade;
        for (const sel of containerSelectors) {
            cascade = document.querySelector(sel);
            if (cascade) break;
        }
        
        let cleanHtml;
        if (cascade) {
            const clone = cascade.cloneNode(true);
            const input = clone.querySelector('[contenteditable="true"]')?.closest('div[id^="cascade"] > div');
            if (input) input.remove();
            cleanHtml = (clone as HTMLElement).outerHTML;
        } else {
            cleanHtml = document.body.outerHTML;
        }
        
        // FAST MODE: Just use outerHTML. Shadow DOM support temporarily disabled to fix mobile hang.
        const fullBodyHtml = document.body.outerHTML;
        
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

        return {
            html: cleanHtml,
            controlsHtml: fullBodyHtml,
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
        return { error: e.toString() };
    }
})()`;

// Service Methods

export async function captureSnapshot(cdp: CDPConnection): Promise<Snapshot | null> {
    for (const ctx of cdp.contexts) {
        try {
            const result = await cdp.call("Runtime.evaluate", {
                expression: CAPTURE_SCRIPT,
                returnByValue: true,
                contextId: ctx.id
            });

            if (result.result?.value) {
                const snapshot = result.result.value as Snapshot;
                if (snapshot.error) continue;

                // Convert vscode-file:// icons to base64 in both HTML and CSS
                snapshot.html = convertVsCodeIcons(snapshot.html);
                snapshot.css = convertVsCodeIcons(snapshot.css);
                return snapshot;
            }
        } catch { }
    }
    return null;
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
