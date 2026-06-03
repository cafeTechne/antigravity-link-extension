import http from 'http';
import { WebSocket } from 'ws';
import {
    CDPConnection,
    CDPResult,
    CDPContext,
    CDPInfo,
    CDPTarget
} from '../types';

// Constants for Discovery (mirror standalone dev server)
const PORTS = [
    9000, 9001, 9002, 9003, 9004, 9005,
    9222, 9223, 9224, 9225, 9226, 9227, 9228, 9229, 9230,
    5858
];
// Allow slower hosts to respond and contexts to initialize
const HTTP_TIMEOUT = 2000;
const CDP_CONTEXT_WAIT = 1000;
const CDP_CONNECT_TIMEOUT = 3500;
const CDP_CALL_TIMEOUT = 3500;

// Helper: HTTP GET JSON with timeout
function getJson<T>(url: string, timeout = HTTP_TIMEOUT): Promise<T> {
    return new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data) as T); } catch (e) {
                    // Silent fail for JSON parse errors on non-debug pages
                    reject(e);
                }
            });
        });

        req.on('error', reject);
        req.setTimeout(timeout, () => {
            req.destroy();
            reject(new Error(`Timeout after ${timeout}ms`));
        });
    });
}

// Find all Antigravity CDP endpoints (with logging to aid target selection)
export async function discoverInstances(): Promise<CDPInfo[]> {
    const allInstances: CDPInfo[] = [];
    const seen = new Set<string>();
    const targetFilter = (process.env.AG_CDP_TARGET_FILTER || '').toLowerCase();
    const strictWorkbenchOnly = (process.env.AG_STRICT_WORKBENCH_ONLY || 'true').toLowerCase() !== 'false';
    const includeFallbackTargets = (process.env.AG_INCLUDE_FALLBACK_TARGETS || 'false').toLowerCase() === 'true';

    type RankedCandidate = CDPInfo & { __rank: number; __isWorkbench: boolean; __isJetski: boolean; __isLaunchpad: boolean };
    const rankedCandidates: RankedCandidate[] = [];

    const listsByPort = await Promise.all(
        PORTS.map(async (port) => {
            try {
                const list = await getJson<CDPTarget[]>(`http://127.0.0.1:${port}/json/list`);
                return { port, list };
            } catch {
                return { port, list: [] as CDPTarget[] };
            }
        })
    );

    for (const { port, list } of listsByPort) {
        for (const t of list) {
            const title = t.title || '';
            const url = t.url || '';
            const type = (t as any).type || '';
            const lowerTitle = title.toLowerCase();
            const lowerUrl = url.toLowerCase();

            const isSelf = title === 'Antigravity Link' || title === 'Antigravity-Link';
            const isBridgeUi = lowerTitle === 'antigravity link' || lowerTitle === 'antigravity-link'
                || lowerTitle === 'antigravity link qr';
            const isDevtools = lowerTitle.includes('devtools') || lowerUrl.includes('devtools');
            const isWebview = lowerTitle.includes('vscode-webview') || lowerUrl.includes('vscode-webview');
            const isOwnExtensionWebview = isWebview && lowerUrl.includes('extensionid=cafetechne.antigravity-link-extension');
            const isServiceWorker = type === 'service_worker';
            const isLaunchpad = lowerTitle.includes('launchpad');
            const isWorkbench = lowerUrl.includes('workbench.html');
            const isJetski = lowerUrl.includes('workbench-jetski-agent.html') || lowerUrl.includes('jetski');
            const isBlank = title.trim().length === 0 || lowerTitle.startsWith('instance :');
            const looksChat =
                lowerTitle.includes('antigravity') ||
                lowerUrl.includes('workbench') ||
                lowerUrl.includes('jetski') ||
                lowerUrl.includes('/chat') ||
                lowerUrl.includes('/assistant');
            const matchesFilter = !targetFilter || lowerTitle.includes(targetFilter) || lowerUrl.includes(targetFilter);

            if (isSelf || isBridgeUi || isDevtools || isOwnExtensionWebview || isServiceWorker || isBlank || !looksChat) continue;
            if (!matchesFilter) continue;
            if (!t.webSocketDebuggerUrl) continue;

            const dedupeKey = (t.webSocketDebuggerUrl || `${port}-${t.id || title}`).toLowerCase();
            if (seen.has(dedupeKey)) continue;
            seen.add(dedupeKey);

            let rank = 0;
            if (lowerUrl.includes('workbench.html') || lowerTitle.includes('workbench')) rank += 8;
            if (lowerUrl.includes('workbench-jetski-agent.html') || lowerUrl.includes('jetski')) rank += 6;
            if (lowerTitle.includes('antigravity')) rank += 3;
            if (isWebview) rank -= 1;
            if (isLaunchpad) rank -= 2;
            if (strictWorkbenchOnly && isWorkbench) rank += 20;
            if (!strictWorkbenchOnly && isJetski) rank -= 1;
            if (targetFilter && (lowerTitle.includes(targetFilter) || lowerUrl.includes(targetFilter))) rank += 20;

            rankedCandidates.push({
                id: t.id || t.webSocketDebuggerUrl || `${port}-${title}`,
                port,
                url: t.webSocketDebuggerUrl,
                title: title || `Instance :${port}`,
                __rank: rank,
                __isWorkbench: isWorkbench,
                __isJetski: isJetski,
                __isLaunchpad: isLaunchpad
            });
        }
    }

    const byRank = (a: RankedCandidate, b: RankedCandidate) => b.__rank - a.__rank;

    let selected: RankedCandidate[] = [];
    if (strictWorkbenchOnly) {
        // Primary: true workbench only, excluding Launchpad
        selected = rankedCandidates.filter(c => c.__isWorkbench && !c.__isLaunchpad);
        // Fallback for newer Antigravity layouts: include jetski/workbench-like targets except Launchpad
        if (selected.length === 0) {
            selected = rankedCandidates.filter(c => (c.__isWorkbench || c.__isJetski) && !c.__isLaunchpad);
        }
    } else {
        selected = rankedCandidates.filter(c => includeFallbackTargets || !c.__isLaunchpad);
    }

    selected.sort(byRank);
    for (const c of selected) {
        allInstances.push({
            id: c.id,
            port: c.port,
            url: c.url,
            title: c.title
        });
    }

    return allInstances;
}

// Connect to CDP
export async function connectCDP(url: string, id: string, title?: string): Promise<CDPConnection> {
    const ws = new WebSocket(url);
    await new Promise<void>((resolve, reject) => {
        let settled = false;
        const timer = setTimeout(() => {
            if (settled) return;
            settled = true;
            try { ws.terminate(); } catch { }
            reject(new Error(`CDP websocket open timeout after ${CDP_CONNECT_TIMEOUT}ms`));
        }, CDP_CONNECT_TIMEOUT);

        const cleanup = () => {
            clearTimeout(timer);
            ws.off('open', onOpen);
            ws.off('error', onError);
        };

        const onOpen = () => {
            if (settled) return;
            settled = true;
            cleanup();
            resolve();
        };

        const onError = (error: Error) => {
            if (settled) return;
            settled = true;
            cleanup();
            reject(error);
        };

        ws.on('open', onOpen);
        ws.on('error', onError);
    });

    let idCounter = 1;
    const call = (method: string, params: Record<string, unknown>, sessionId?: string): Promise<any> => new Promise((resolve, reject) => {
        const id = idCounter++;
        let settled = false;
        const timer = setTimeout(() => {
            if (settled) return;
            settled = true;
            cleanup();
            reject(new Error(`CDP call timeout after ${CDP_CALL_TIMEOUT}ms for ${method}`));
        }, CDP_CALL_TIMEOUT);

        const cleanup = () => {
            clearTimeout(timer);
            ws.off('message', handler);
            ws.off('close', onClose);
        };

        const onClose = () => {
            if (settled) return;
            settled = true;
            cleanup();
            reject(new Error(`CDP connection closed while waiting for ${method}`));
        };

        const handler = (msg: Buffer | string) => {
            if (settled) return;
            try {
                const data = JSON.parse(msg.toString()) as { id?: number; error?: { message: string }; result?: any };
                if (data.id === id) {
                    settled = true;
                    cleanup();
                    if (data.error) reject(data.error);
                    else resolve(data.result);
                }
            } catch {
                // ignore non-JSON frames
            }
        };
        ws.on('message', handler);
        ws.on('close', onClose);

        const payload: any = { id, method, params };
        if (sessionId) payload.sessionId = sessionId;

        ws.send(JSON.stringify(payload), (error) => {
            if (!error || settled) return;
            settled = true;
            cleanup();
            reject(error);
        });
    });

    const contexts: CDPContext[] = [];
    ws.on('message', (msg: Buffer | string) => {
        try {
            const data = JSON.parse(msg.toString()) as { method?: string; params?: any };
            if (data.method === 'Runtime.executionContextCreated') {
                const ctx = data.params.context;
                contexts.push(ctx);
            }
        } catch { }
    });

    await call("Runtime.enable", {});

    // Wait briefly for contexts
    await new Promise(r => setTimeout(r, CDP_CONTEXT_WAIT));

    return { id, ws, call, contexts, title, url };
}
