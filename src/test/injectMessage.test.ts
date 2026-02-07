import assert from 'assert';
import { injectMessage } from '../services/antigravity';
import { CDPConnection, CDPContext } from '../types';

function makeFakeCall(mode: 'success' | 'fail' | 'enter_keypress') {
    return async (method: string, params: any) => {
        if (method === 'Runtime.evaluate') {
            const expr: string = params.expression || '';

            // Editor Discovery
            if (expr.includes('editorSelectors')) {
                if (mode === 'fail') {
                    return { result: { value: { ok: false, reason: 'editor_not_found' } } };
                }

                if (mode === 'enter_keypress') {
                    return { result: { value: { ok: true, method: 'enter_keypress' } } };
                }

                return { result: { value: { ok: true, method: 'click_submit' } } };
            }
            return { result: { value: null } };
        }
        return {};
    };
}

describe('injectMessage (unit)', () => {
    it('returns ok:true and method:click_submit when editor and submit button are found', async () => {
        const contexts: CDPContext[] = [{ id: 1, name: 'main', origin: 'http://localhost' }];
        const cdp: CDPConnection = {
            id: 'fake-id',
            ws: null as any,
            call: makeFakeCall('success'),
            contexts,
            title: 'fake',
            url: 'ws://fake'
        };

        const res = await injectMessage(cdp, 'Hello World');
        assert.strictEqual(res.ok, true);
        assert.strictEqual(res.method, 'click_submit');
    });

    it('returns ok:true and method:enter_keypress when submit button is not found but editor is', async () => {
        const contexts: CDPContext[] = [{ id: 1, name: 'main', origin: 'http://localhost' }];
        const cdp: CDPConnection = {
            id: 'fake-id',
            ws: null as any,
            call: makeFakeCall('enter_keypress'),
            contexts,
            title: 'fake',
            url: 'ws://fake'
        };

        const res = await injectMessage(cdp, 'Hello World');
        assert.strictEqual(res.ok, true);
        assert.strictEqual(res.method, 'enter_keypress');
    });

    it('returns ok:false and reason:editor_not_found when no editor is found', async () => {
        const contexts: CDPContext[] = [{ id: 1, name: 'main', origin: 'http://localhost' }];
        const cdp: CDPConnection = {
            id: 'fake-id',
            ws: null as any,
            call: makeFakeCall('fail'),
            contexts,
            title: 'fake',
            url: 'ws://fake'
        };

        const res = await injectMessage(cdp, 'Hello World');
        assert.strictEqual(res.ok, false);
        assert.strictEqual(res.reason, 'editor_not_found');
    });
});
