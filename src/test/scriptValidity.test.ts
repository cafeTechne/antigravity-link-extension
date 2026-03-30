/**
 * Validates that all CDP-injected JavaScript template literals in antigravity.ts
 * are valid JavaScript. Catches bugs like TypeScript type assertions (as Type)
 * or references to undefined variables inside injected scripts.
 */
import assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

const SRC = fs.readFileSync(
    path.join(__dirname, '../../src/services/antigravity.ts'),
    'utf8'
).replace(/\r\n/g, '\n');

function extractScript(src: string, varName: string): string {
    const marker = `const ${varName} = \``;
    const start = src.indexOf(marker);
    assert.notStrictEqual(start, -1, `${varName} not found in antigravity.ts`);
    const contentStart = start + marker.length;
    let i = contentStart;
    while (i < src.length) {
        if (src[i] === '\\') { i += 2; continue; }
        if (src[i] === '`') break;
        i++;
    }
    return src.slice(contentStart, i);
}

function tryParseJS(script: string): string | null {
    try { new Function(script); return null; }
    catch (e) { return (e as Error).message; }
}

function findTsCasts(script: string): string[] {
    return script.split('\n')
        .map((line, i) => ({ line, i }))
        .filter(({ line }) => /\)\s+as\s+[A-Z]|\bas\s+[A-Z]\w+[\s;,)\]]/.test(line))
        .map(({ line, i }) => `line ${i + 1}: ${line.trim()}`);
}

describe('CDP injected scripts — syntax validity', () => {
    it('GENERATION_PROBE_SCRIPT parses as valid JavaScript', () => {
        const script = extractScript(SRC, 'GENERATION_PROBE_SCRIPT');
        const err = tryParseJS(script);
        assert.strictEqual(err, null, `Parse error: ${err}`);
    });

    it('CAPTURE_SCRIPT parses as valid JavaScript', () => {
        const script = extractScript(SRC, 'CAPTURE_SCRIPT');
        const err = tryParseJS(script);
        assert.strictEqual(err, null, `Parse error: ${err}`);
    });

    it('GENERATION_PROBE_SCRIPT has no TypeScript-only syntax', () => {
        const issues = findTsCasts(extractScript(SRC, 'GENERATION_PROBE_SCRIPT'));
        assert.strictEqual(issues.length, 0, `TS casts found:\n${issues.join('\n')}`);
    });

    it('CAPTURE_SCRIPT has no TypeScript-only syntax', () => {
        const issues = findTsCasts(extractScript(SRC, 'CAPTURE_SCRIPT'));
        assert.strictEqual(issues.length, 0, `TS casts found:\n${issues.join('\n')}`);
    });

    it('CAPTURE_SCRIPT does not reference undeclared variables', () => {
        const script = extractScript(SRC, 'CAPTURE_SCRIPT');
        // 'inputBox' was previously referenced but never declared — guard against recurrence
        const guarded = ['inputBox'];
        for (const name of guarded) {
            if (new RegExp(`\\b${name}\\b`).test(script)) {
                assert.ok(
                    new RegExp(`(?:const|let|var)\\s+${name}\\b`).test(script),
                    `'${name}' is referenced but not declared in CAPTURE_SCRIPT`
                );
            }
        }
    });
});
