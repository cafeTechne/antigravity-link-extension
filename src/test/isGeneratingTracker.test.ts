import assert from 'assert';
import { IsGeneratingTracker } from '../server/isGeneratingTracker';

const WINDOW = 10_000;
const t0 = 1_000_000;

describe('IsGeneratingTracker', () => {
    let tracker: IsGeneratingTracker;

    beforeEach(() => {
        tracker = new IsGeneratingTracker(WINDOW);
    });

    describe('initial state', () => {
        it('returns false on the very first poll', () => {
            assert.strictEqual(tracker.update('hash1', t0), false);
        });
    });

    describe('stable hash (idle)', () => {
        it('returns false when hash never changes', () => {
            tracker.update('hash1', t0);
            assert.strictEqual(tracker.update('hash1', t0 + 3_000), false);
            assert.strictEqual(tracker.update('hash1', t0 + 30_000), false);
        });
    });

    describe('hash changes (streaming)', () => {
        it('returns true immediately after first hash change', () => {
            tracker.update('hash1', t0);
            assert.strictEqual(tracker.update('hash2', t0 + 3_000), true);
        });

        it('stays true while hash keeps changing', () => {
            tracker.update('hash1', t0);
            tracker.update('hash2', t0 + 3_000);
            assert.strictEqual(tracker.update('hash3', t0 + 6_000), true);
            assert.strictEqual(tracker.update('hash4', t0 + 9_000), true);
        });

        it('stays true while hash is stable but within the 10s window', () => {
            tracker.update('hash1', t0);
            tracker.update('hash2', t0 + 3_000);
            assert.strictEqual(tracker.update('hash2', t0 + 8_000), true);
        });

        it('returns false once hash is stable for longer than the window', () => {
            tracker.update('hash1', t0);
            tracker.update('hash2', t0 + 3_000); // last change at t0+3s
            assert.strictEqual(tracker.update('hash2', t0 + 12_999), true);  // 1ms before expiry
            assert.strictEqual(tracker.update('hash2', t0 + 13_000), false); // exactly at expiry
            assert.strictEqual(tracker.update('hash2', t0 + 20_000), false);
        });

        it('resets the window when hash changes again after a pause', () => {
            tracker.update('hash1', t0);
            tracker.update('hash2', t0 + 3_000);
            tracker.update('hash2', t0 + 11_000); // still within window
            tracker.update('hash3', t0 + 12_000); // new change — window restarts
            assert.strictEqual(tracker.update('hash3', t0 + 21_500), true);  // 9.5s after last change
            assert.strictEqual(tracker.update('hash3', t0 + 22_500), false); // 10.5s after
        });
    });

    describe('reset() on reconnect', () => {
        it('returns false on first poll after reset', () => {
            tracker.update('hash1', t0);
            tracker.update('hash2', t0 + 3_000);
            tracker.reset();
            assert.strictEqual(tracker.update('hash3', t0 + 4_000), false);
        });

        it('does not carry stale change timestamp across reconnect', () => {
            tracker.update('hash1', t0);
            tracker.update('hash2', t0 + 3_000);
            tracker.reset();
            tracker.update('hashA', t0 + 4_000);
            assert.strictEqual(tracker.update('hashA', t0 + 5_000), false);
        });

        it('correctly detects new generation after a reset', () => {
            tracker.update('hash1', t0);
            tracker.update('hash2', t0 + 3_000);
            tracker.reset();
            tracker.update('hashA', t0 + 10_000);
            tracker.update('hashA', t0 + 13_000);
            assert.strictEqual(tracker.update('hashA', t0 + 16_000), false); // idle after reset
            tracker.update('hashB', t0 + 19_000);
            assert.strictEqual(tracker.update('hashC', t0 + 22_000), true);  // new generation
        });
    });

    describe('consecutive stable polls (IDE-stop early exit)', () => {
        it('flips false after stableThreshold consecutive stable polls within the window', () => {
            // Simulates: generation ends → IDE stop → hash settles after one last change.
            // With 3-second poll intervals the UI should clear after ~2 stable polls (~6 s),
            // not after the full 10 s window.
            tracker.update('hash1', t0);
            tracker.update('hash2', t0 + 3_000); // change → stableCount=0, true
            tracker.update('hash2', t0 + 6_000); // stable → stableCount=1, still true
            // stableCount reaches threshold (2) → flips false even though only 6 s into window
            assert.strictEqual(tracker.update('hash2', t0 + 9_000), false);
        });

        it('resets stable count when hash changes again', () => {
            tracker.update('hash1', t0);
            tracker.update('hash2', t0 + 1_000); // stableCount=0
            tracker.update('hash2', t0 + 2_000); // stableCount=1
            tracker.update('hash3', t0 + 3_000); // new change → stableCount resets to 0
            assert.strictEqual(tracker.update('hash3', t0 + 4_000), true);  // stableCount=1 < 2
            assert.strictEqual(tracker.update('hash3', t0 + 5_000), false); // stableCount=2 → false
        });

        it('reset() clears stable count', () => {
            tracker.update('hash1', t0);
            tracker.update('hash2', t0 + 3_000); // stableCount=0, generating
            tracker.reset();
            // After reset, first poll with same hash should not carry over stableCount
            tracker.update('hashA', t0 + 4_000); // prevHash=null, stableCount=0
            tracker.update('hashA', t0 + 5_000); // stableCount=1
            // stableCount < 2 but lastHashChangedAt=0 → false (idle)
            assert.strictEqual(tracker.update('hashA', t0 + 6_000), false);
        });

        it('custom stableThreshold=1 means any stable poll flips false immediately', () => {
            const t = new IsGeneratingTracker(10_000, 1);
            t.update('hash1', t0);
            t.update('hash2', t0 + 1_000); // change → stableCount=0, true
            // First stable poll hits threshold=1 → false
            assert.strictEqual(t.update('hash2', t0 + 2_000), false);
        });
    });

    describe('window boundary edge cases', () => {
        it('window of 0ms means isGenerating is never true', () => {
            const t = new IsGeneratingTracker(0);
            t.update('a', t0);
            t.update('b', t0 + 1);
            assert.strictEqual(t.update('b', t0 + 1), false);
        });

        it('large window keeps isGenerating true for a long time', () => {
            const t = new IsGeneratingTracker(60_000);
            t.update('a', t0);
            t.update('b', t0 + 1_000);
            assert.strictEqual(t.update('b', t0 + 59_000), true);
            assert.strictEqual(t.update('b', t0 + 61_000), false);
        });
    });

    describe('DOM-ended reset pattern (IDE stop clears chip immediately)', () => {
        // Simulates server logic: when domIsGenerating goes false, call reset()
        // BEFORE update() so the chip clears this same poll.

        it('reset before update causes immediate false even within window', () => {
            // Establish generating state
            tracker.update('a', t0);
            tracker.update('b', t0 + 1_000);                 // hash changed → true
            assert.strictEqual(tracker.update('b', t0 + 2_000), true);  // within window

            // DOM says generation ended — server calls reset() then update()
            tracker.reset();
            assert.strictEqual(tracker.update('b', t0 + 3_000), false); // cleared immediately
        });

        it('after reset, new generation is detected normally', () => {
            // First generation
            tracker.update('a', t0);
            tracker.update('b', t0 + 1_000);
            assert.strictEqual(tracker.update('b', t0 + 2_000), true);

            // IDE stop → reset
            tracker.reset();
            assert.strictEqual(tracker.update('b', t0 + 3_000), false);

            // User sends another query → hash changes again → detected
            assert.strictEqual(tracker.update('c', t0 + 6_000), true);
        });

        it('reset while hash is stable still clears the chip', () => {
            tracker.update('a', t0);
            tracker.update('b', t0 + 1_000);  // hash changed → tracking started
            // One stable poll: stableCount=1, still below threshold of 2
            assert.strictEqual(tracker.update('b', t0 + 2_000), true);

            // DOM ends → reset() before update() — cleared this poll
            tracker.reset();
            assert.strictEqual(tracker.update('b', t0 + 3_000), false);
        });
    });
});
