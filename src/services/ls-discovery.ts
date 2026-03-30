/**
 * Language Server discovery and CancelCascadeInvocation RPC.
 *
 * Discovers the Antigravity Language Server's ConnectRPC port and CSRF token
 * from the LS process CLI arguments, then provides a typed helper to cancel
 * the active cascade invocation.
 *
 * Discovery strategy (verified from antigravity-sdk ls-bridge.ts, 2026-03-01):
 *   Phase 1: Parse LS process CLI via Get-CimInstance (Windows) / ps (Unix)
 *            → extracts --csrf_token and --extension_server_port
 *   Phase 2: netstat to find LISTENING ports for the LS PID, excluding the
 *            extension_server_port, then probe HTTPS then HTTP.
 *
 * The RPC endpoint is:
 *   POST http(s)://127.0.0.1:{port}/exa.language_server_pb.LanguageServerService/CancelCascadeInvocation
 *   Headers: Content-Type: application/json
 *            x-codeium-csrf-token: {csrfToken}
 *   Body:    { "cascadeId": "<googleAgentId>" }
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import * as http from 'http';
import * as https from 'https';

const execAsync = promisify(exec);

export interface LsConnection {
    port: number;
    csrfToken: string;
    useTls: boolean;
    cachedAt: number;
}

// Cache: re-use for 60 s, invalidate on RPC failure
let _cache: LsConnection | null = null;
const CACHE_TTL_MS = 60_000;

/** Return cached connection if fresh, otherwise rediscover. */
export async function getLsConnection(): Promise<LsConnection | null> {
    if (_cache && Date.now() - _cache.cachedAt < CACHE_TTL_MS) {
        return _cache;
    }
    _cache = await discoverLsConnection();
    return _cache;
}

/** Force-invalidate the cache (e.g. after an RPC failure). */
export function invalidateLsCache(): void {
    _cache = null;
}

// ─── GetAllCascadeTrajectories → active cascade ID ─────────────────────────

/**
 * Ask the LS for all cascade trajectories and return the cascadeId of the
 * most-recently-started one that looks active (running / generating).
 *
 * The response shape is not documented, so we probe defensively:
 *   { trajectories: [ { cascadeId, status, ... }, ... ] }
 * or similar.  We log the raw body so the caller can refine the path if needed.
 */
export async function getActiveCascadeIdFromLs(): Promise<string> {
    try {
        const conn = await getLsConnection();
        if (!conn) return '';

        const proto = conn.useTls ? 'https' : 'http';
        const url = `${proto}://127.0.0.1:${conn.port}/exa.language_server_pb.LanguageServerService/GetAllCascadeTrajectories`;

        const body = await lsPost(url, conn, '{}');
        if (!body) return '';

        console.log('[LS] GetAllCascadeTrajectories raw:', body.slice(0, 500));

        let parsed: unknown;
        try { parsed = JSON.parse(body); } catch { return ''; }

        // Probe common response shapes
        const trajectories: unknown[] = (
            (parsed as Record<string, unknown>)['trajectories'] ??
            (parsed as Record<string, unknown>)['cascade_trajectories'] ??
            (parsed as Record<string, unknown>)['cascades'] ??
            []
        ) as unknown[];

        if (!Array.isArray(trajectories) || trajectories.length === 0) return '';

        // Prefer a trajectory whose status looks active; fall back to the last one
        const isActive = (t: unknown) => {
            const status = String(
                (t as Record<string, unknown>)['status'] ??
                (t as Record<string, unknown>)['state'] ?? ''
            ).toLowerCase();
            return status.includes('run') || status.includes('generat') || status.includes('activ') || status === '';
        };

        const active = trajectories.find(isActive) ?? trajectories[trajectories.length - 1];
        const id: string = String(
            (active as Record<string, unknown>)['cascadeId'] ??
            (active as Record<string, unknown>)['cascade_id'] ??
            (active as Record<string, unknown>)['id'] ??
            (active as Record<string, unknown>)['trajectoryId'] ??
            ''
        );

        console.log(`[LS] active cascadeId: "${id}"`);
        return id;
    } catch (err) {
        console.log('[LS] getActiveCascadeIdFromLs error:', (err as Error).message);
        return '';
    }
}

/** Generic POST helper used by LS RPC calls (returns raw response body). */
function lsPost(url: string, conn: LsConnection, payload: string): Promise<string | null> {
    return new Promise((resolve) => {
        const mod = conn.useTls ? https : http;
        const req = (mod as typeof https).request(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(payload),
                    'x-codeium-csrf-token': conn.csrfToken,
                },
                rejectUnauthorized: false,
                timeout: 5000,
            },
            (res) => {
                let body = '';
                res.on('data', (chunk: Buffer) => { body += chunk.toString(); });
                res.on('end', () => {
                    const ok = (res.statusCode ?? 0) >= 200 && (res.statusCode ?? 0) < 300;
                    resolve(ok ? body : null);
                });
            },
        );
        req.on('error', () => resolve(null));
        req.on('timeout', () => { req.destroy(); resolve(null); });
        req.write(payload);
        req.end();
    });
}

// ─── CancelCascadeInvocation ────────────────────────────────────────────────

/**
 * Cancel the running cascade invocation for the given cascadeId.
 * Throws on network error; resolves (possibly with a non-200 body) on HTTP error.
 */
export async function cancelCascadeInvocation(
    cascadeId: string,
    conn: LsConnection,
): Promise<{ ok: boolean; status?: number; body?: string }> {
    const proto = conn.useTls ? 'https' : 'http';
    const url = `${proto}://127.0.0.1:${conn.port}/exa.language_server_pb.LanguageServerService/CancelCascadeInvocation`;
    const payload = JSON.stringify({ cascadeId });

    return new Promise((resolve, reject) => {
        const mod = conn.useTls ? https : http;
        const req = (mod as typeof https).request(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(payload),
                    'x-codeium-csrf-token': conn.csrfToken,
                },
                rejectUnauthorized: false,
                timeout: 5000,
            },
            (res) => {
                let body = '';
                res.on('data', (chunk: Buffer) => { body += chunk.toString(); });
                res.on('end', () => {
                    const ok = (res.statusCode ?? 0) >= 200 && (res.statusCode ?? 0) < 300;
                    resolve({ ok, status: res.statusCode, body });
                });
            },
        );
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('LS RPC timeout')); });
        req.write(payload);
        req.end();
    });
}

// ─── Discovery ──────────────────────────────────────────────────────────────

async function discoverLsConnection(): Promise<LsConnection | null> {
    try {
        const proc = await findLsProcess();
        if (!proc) {
            console.log('[LS] no language_server process found');
            return null;
        }

        const conn = await findConnectPort(proc.pid, proc.extPort, proc.csrfToken);
        if (!conn) {
            console.log('[LS] could not find ConnectRPC port via netstat');
            return null;
        }

        console.log(`[LS] discovered: port=${conn.port} tls=${conn.useTls} csrf=present`);
        return { ...conn, csrfToken: proc.csrfToken, cachedAt: Date.now() };
    } catch (err) {
        console.log('[LS] discovery error:', (err as Error).message);
        return null;
    }
}

interface LsProcess {
    pid: number;
    csrfToken: string;
    extPort: number;
}

async function findLsProcess(): Promise<LsProcess | null> {
    const platform = process.platform;
    let output: string;

    try {
        if (platform === 'win32') {
            const psScript =
                "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'language_server' -and $_.CommandLine -match 'csrf_token' } | ForEach-Object { $_.ProcessId.ToString() + '|' + $_.CommandLine }";
            const encoded = Buffer.from(psScript, 'utf16le').toString('base64');
            const result = await execAsync(
                `powershell.exe -NoProfile -EncodedCommand ${encoded}`,
                { encoding: 'utf8', timeout: 10_000, windowsHide: true } as any,
            );
            output = String(result.stdout);
        } else {
            const result = await execAsync(
                "ps -eo pid,args 2>/dev/null | grep language_server | grep csrf_token | grep -v grep",
                { encoding: 'utf8', timeout: 5_000 },
            );
            output = result.stdout;
        }
    } catch {
        return null;
    }

    const lines = output.split('\n').filter(l => l.trim().length > 0);
    if (lines.length === 0) return null;

    const line = lines[0];
    let pid: number;
    if (platform === 'win32') {
        pid = parseInt(line.split('|')[0].trim(), 10);
    } else {
        pid = parseInt(line.trim().split(/\s+/)[0], 10);
    }

    const csrfToken = extractArg(line, 'csrf_token');
    const extPortStr = extractArg(line, 'extension_server_port');
    const extPort = extPortStr ? parseInt(extPortStr, 10) : 0;

    if (!csrfToken || isNaN(pid)) return null;
    return { pid, csrfToken, extPort };
}

async function findConnectPort(
    pid: number,
    extPort: number,
    csrfToken: string,
): Promise<{ port: number; useTls: boolean } | null> {
    let output: string;
    try {
        if (process.platform === 'win32') {
            const result = await execAsync(
                `netstat -aon | findstr "LISTENING" | findstr "${pid}"`,
                { encoding: 'utf8', timeout: 5_000, windowsHide: true } as any,
            );
            output = String(result.stdout);
        } else {
            const result = await execAsync(
                `ss -tlnp 2>/dev/null | grep "pid=${pid}" || netstat -tlnp 2>/dev/null | grep "${pid}"`,
                { encoding: 'utf8', timeout: 5_000 },
            );
            output = result.stdout;
        }
    } catch {
        return null;
    }

    const ports: number[] = [];
    for (const m of output.matchAll(/127\.0\.0\.1:(\d+)/g)) {
        const p = parseInt(m[1], 10);
        if (p !== extPort && !ports.includes(p)) ports.push(p);
    }
    if (ports.length === 0) return null;

    // Probe HTTPS first (preferred), fall back to HTTP
    for (const port of ports) {
        if (await probePort(port, true, csrfToken)) return { port, useTls: true };
    }
    for (const port of ports) {
        if (await probePort(port, false, csrfToken)) return { port, useTls: false };
    }
    return null;
}

function probePort(port: number, useTls: boolean, csrfToken: string): Promise<boolean> {
    const mod = useTls ? https : http;
    const proto = useTls ? 'https' : 'http';
    const url = `${proto}://127.0.0.1:${port}/exa.language_server_pb.LanguageServerService/GetUserStatus`;
    return new Promise((resolve) => {
        const req = (mod as typeof https).request(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': 2,
                    'x-codeium-csrf-token': csrfToken,
                },
                rejectUnauthorized: false,
                timeout: 2000,
            },
            (res) => {
                // 200 or 401 = correct endpoint (401 = wrong csrf but server responded)
                resolve(res.statusCode === 200 || res.statusCode === 401);
            },
        );
        req.on('error', () => resolve(false));
        req.on('timeout', () => { req.destroy(); resolve(false); });
        req.write('{}');
        req.end();
    });
}

function extractArg(cmdLine: string, argName: string): string | null {
    const eqMatch = cmdLine.match(new RegExp(`--${argName}=([^\\s"]+)`));
    if (eqMatch) return eqMatch[1];
    const spaceMatch = cmdLine.match(new RegExp(`--${argName}\\s+([^\\s"]+)`));
    if (spaceMatch) return spaceMatch[1];
    return null;
}
