/**
 * Tracks whether Antigravity is actively generating a response.
 *
 * Strategy: the snapshot HTML hash changes on every poll while the AI is streaming.
 * When the hash stops changing the window expires and isGenerating flips false.
 * This avoids fragile DOM-signal approaches (send-button presence, aria-disabled, etc.)
 * that produce false positives when the input is empty at rest.
 *
 * Additionally, after `stableThreshold` consecutive polls with the same hash,
 * isGenerating flips false immediately — even within the time window. This prevents
 * the stop chip from lingering for the full window duration when the user stops
 * generation from the IDE and the HTML settles in one final poll.
 */
export class IsGeneratingTracker {
    private lastHashChangedAt = 0;
    private prevHash: string | null = null;
    /** Consecutive polls with the same hash since the last hash change. */
    private stableCount = 0;

    constructor(
        private readonly windowMs = 10_000,
        private readonly stableThreshold = 2,
    ) {}

    /**
     * Call once per snapshot poll.
     * @param currentHash  Hash of snapshot.html for this poll.
     * @param now          Timestamp in ms (injectable for testing).
     * @returns Whether generation appears to be active.
     */
    update(currentHash: string, now = Date.now()): boolean {
        if (this.prevHash !== null && currentHash !== this.prevHash) {
            // Hash changed — generation is active; reset stable counter.
            this.lastHashChangedAt = now;
            this.stableCount = 0;
        } else if (this.prevHash !== null) {
            // Hash is the same as the previous poll.
            this.stableCount++;
        }
        this.prevHash = currentHash;
        return (
            this.lastHashChangedAt > 0 &&
            (now - this.lastHashChangedAt) < this.windowMs &&
            this.stableCount < this.stableThreshold
        );
    }

    /** Call when CDP reconnects so stale hash state doesn't carry over. */
    reset(): void {
        this.lastHashChangedAt = 0;
        this.prevHash = null;
        this.stableCount = 0;
    }

    get lastChangedAt(): number { return this.lastHashChangedAt; }
}
