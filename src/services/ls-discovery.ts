/**
 * Language Server RPC helpers — CancelCascadeInvocation and cascade-ID lookup.
 *
 * Shell-based LS process discovery (Get-CimInstance / ps / netstat) has been
 * removed. The primary cascade-ID source is the VS Code command
 * `antigravity.getDiagnostics` (called in extension.ts). Stop generation falls
 * back to a CDP DOM click on the cancel button when no LS connection is available.
 *
 * An LsConnection can still be supplied externally (e.g. from a future VS Code
 * command that exposes LS connection details) — the RPC path remains intact.
 *
 * RPC endpoint:
 *   POST http(s)://127.0.0.1:{port}/exa.language_server_pb.LanguageServerService/CancelCascadeInvocation
 *   Headers: Content-Type: application/json
 *            x-codeium-csrf-token: {csrfToken}
 *   Body:    { "cascadeId": "<googleAgentId>" }
 */

import * as http from 'http';
import * as https from 'https';

export interface LsConnection {
    port: number;
    csrfToken: string;
    useTls: boolean;
    cachedAt: number;
}

let _cache: LsConnection | null = null;
const CACHE_TTL_MS = 60_000;

/**
 * Return a cached LsConnection if one was set externally, otherwise null.
 * Shell-based auto-discovery is no longer performed.
 */
export async function getLsConnection(): Promise<LsConnection | null> {
    if (_cache && Date.now() - _cache.cachedAt < CACHE_TTL_MS) {
        return _cache;
    }
    return null;
}

/** Force-invalidate the cache. */
export function invalidateLsCache(): void {
    _cache = null;
}

/**
 * Query the LS for the active cascade ID.
 * Returns '' when no LsConnection is available — stop falls back to DOM click.
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

        const trajectories: unknown[] = (
            (parsed as Record<string, unknown>)['trajectories'] ??
            (parsed as Record<string, unknown>)['cascade_trajectories'] ??
            (parsed as Record<string, unknown>)['cascades'] ??
            []
        ) as unknown[];

        if (!Array.isArray(trajectories) || trajectories.length === 0) return '';

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

/** Generic POST to the LS — destination must be 127.0.0.1. */
function lsPost(url: string, conn: LsConnection, payload: string): Promise<string | null> {
    // All LS RPC targets are on 127.0.0.1; refuse anything that isn't localhost.
    if (!/^https?:\/\/127\.0\.0\.1:/.test(url)) return Promise.resolve(null);

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
                // The LS uses a self-signed cert; cert validation is intentionally
                // skipped. The destination is always 127.0.0.1 so there is no
                // man-in-the-middle risk.
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
    if (!/^https?:\/\/127\.0\.0\.1:/.test(url)) {
        return { ok: false, status: 0, body: 'invalid host' };
    }
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
                // Self-signed LS cert on 127.0.0.1 — no MITM risk, skip validation.
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
