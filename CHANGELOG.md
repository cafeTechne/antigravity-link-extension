# Changelog

## 1.0.17

### Antigravity IDE 2.0 Compatibility

- Broadened chat-container detection to handle renamed containers in Antigravity IDE 2.0. Added `#thread`, `#messages`, `#history`, `#session` to the candidate selector list alongside `#cascade`/`#conversation`.
- Added content-based container fallback: finds the closest common ancestor of the first message element and the composer, so the correct container is identified even when its ID is unknown.
- Updated `cascadeChild` composer-removal selector, `isSnapshotUsable` regex, and the CDP probe to recognise all new container names.
- Broadened `CHAT_SURFACE_SELECTOR` in the mobile client to match new container IDs.

### Blank Page Fix

- Fixed a bug where opening the mobile UI returned a blank page when the active workspace contained a `public/` folder (e.g. a React or Next.js project) without an `index.html`. The extension now only prefers the workspace `public/` directory if it contains `index.html`; otherwise it falls back to the extension's own bundled UI.

## 1.0.16

### Mirror Rendering
- Extended icon-chip dark-background rule to `div`-wrapped tooltip icons (e.g. merge, export) in AI response action rows.
- Excluded truncated text buttons ("Show N more", section headers) from icon-chip sizing via `:not(.truncate)` guard.
- `text-muted-foreground` text now renders at full foreground contrast in the mobile mirror.
- File path attachment chips styled as legible dark pills; white 1×1 GIF placeholder image suppressed.
- User message text no longer clipped to 10 vh; action bar (timestamp, copy, undo) stacks below text in a column layout instead of floating beside it, eliminating the narrow-last-line gap on long messages.
- `text-secondary-foreground` spans in collapsible section headers no longer collapse to 1-character-wide columns.

### Stop Button Reliability
- Removed overly aggressive mirror-tap → `stopGeneration()` routing that fired during any mirror interaction while the AI was generating.
- Added 10-second post-click cooldown to suppress false `isGenerating` blips that occur when Antigravity briefly reveals its cancel button during copy/show-more actions.
- Fixed stop state getting stuck when a snapshot is rejected as unusable immediately after generation ends (server now clears `isGenerating` immediately instead of waiting for CDP reinit).

### Copy to Mobile Clipboard
- Tapping the copy icon in the mirror now writes the message text to the mobile clipboard using the Clipboard API with an `execCommand` fallback for browsers that block clipboard access on self-signed HTTPS.
- Shows a checkmark on the button for 1.5 s on success.

### Thumbs Up / Thumbs Down
- Selected rating state is now visible in the mirror via `[aria-pressed="true"]` CSS (blue tint).
- Optimistic `.ag-thumb-selected` class applied on click so the selection is visible immediately, before the next snapshot arrives.

### Input Box
- Pasted text no longer overflows the input box horizontally (`overflow-wrap: break-word` + `overflow-x: hidden`).

### File Upload
- Upload now attempts direct `input[type="file"]` injection first, removing the dependency on UI button text that Google periodically renames.
- Broadened fallback UI search covers renamed "Add context" labels (`attach`, `add file`, `upload context`) and renamed "Media" labels (`file`, `files`, `images`, `photo`, `document`); also searches `[role="menuitem"]` and `li` elements.

### Upload Feedback
- Replaced blocking `alert()` dialogs with a non-blocking toast pill that slides up and auto-dismisses (2.5 s on success, 4 s on error).
- Upload button shows a checkmark icon for 2 s on successful injection.

## 1.0.15

### Documentation

- Updated Quick Start launch commands for the Antigravity IDE rename: Windows command changed from the Start Menu `.lnk` shortcut (which does not forward CLI flags) to the direct `.exe` path `AppData\Local\Programs\Antigravity IDE\Antigravity IDE.exe`, macOS from `open -a Antigravity` to `open -a "Antigravity IDE"`, Linux from `antigravity` to `antigravity-ide`.
- Updated MCP server extension path from `~/.antigravity/extensions/` to `~/.antigravity-ide/extensions/` to match the new install location.

## 1.0.14

### Critical Bug Fixes (Google Chat Layout Change)

- Fixed snapshot capture failure caused by Google's chat container rename from `#cascade` to `#conversation`.
- Fixed empty HTML snapshots by adding a guard to the composer-removal logic; it now only removes the parent container if multiple children exist, preventing the entire conversation from being nuked in the new single-child DOM structure.
- Enabled case-insensitive matching for the input box ID (`antigravity.agentSidePanelInputBox`) to ensure it is reliably removed from snapshots without affecting other content.

## 1.0.13

### Stop Generation

- Added ground-truth cancel button detection using `[data-tooltip-id="input-send-button-cancel-tooltip"]` (confirmed from ag_bridge source), replacing unreliable aria/text heuristics that were clicking the wrong button.
- `/stop` endpoint now attempts the Language Server RPC (`CancelCascadeInvocation`) and always follows up with a direct DOM click, even if the RPC returns 200 — an empty `{}` response indicates a silent no-op when the cascade ID doesn't match.
- Stop attempts are self-documenting: every call writes `ag-stop-probe.json` with RPC result, cascade ID, and DOM click results for diagnostics.
- Generation state (`isGenerating`) now derived directly from cancel button visibility rather than hash-change heuristics.

### Mobile Stop UI

- Stop chip dims and becomes non-interactive while the stop request is in flight, giving immediate visual feedback.
- Send button transforms into a red stop button during generation and restores when generation ends.
- Mirror taps during generation are routed to `stopGeneration()` instead of being forwarded as raw CDP clicks (prevents accidental mic button activation).

### Mirror Fixes

- Undo buttons hidden in the mirror — they break command row layout on mobile and only open a modal in the IDE.
- Loading state now shows "Connected. Waiting for chat surface..." when the server is reachable but has no snapshot yet, instead of hanging indefinitely on "Initializing...".

### Bug Fixes

- Fixed TypeScript type assertion (`as HTMLElement`) inside `CAPTURE_SCRIPT` — this was causing a JavaScript SyntaxError in every CDP context, silently preventing all snapshot capture.
- Fixed reference to undeclared `inputBox` variable inside `collectControls()` in `CAPTURE_SCRIPT` — caused a ReferenceError on every snapshot poll.
- Fixed command palette entries showing raw `%command.startServer%` NLS placeholders instead of readable titles.
- Fixed `.vscodeignore` to exclude `.claude/` agent worktrees, debug JSON files, and log files from the packaged extension.

### Developer Experience

- Added `npm run deploy` script: bundles and copies `out/extension.js` + `public/index.html` directly to the installed extension directory. Combined with "Developer: Reload Extension Host", this eliminates the vsix install/reload cycle during development.
- Added `.vscode/launch.json` for F5 Extension Development Host support.
- Added `src/test/scriptValidity.test.ts`: 5 tests that validate CDP-injected scripts parse as valid JavaScript and contain no TypeScript-only syntax, preventing recurrence of the above bugs.

## 1.0.12

### Mobile Rendering and Layout

- Fixed theme variable scoping in the mirror (`:root` remapped to `:host`) so `--vscode-*` colors/icons render correctly inside Shadow DOM.
- Fixed Tailwind border baseline ordering so `.border` styles are no longer suppressed.
- Fixed oversized reaction controls by constraining thumb/good-bad button containers after context switches.
- Fixed icon-only SVG button fallback behavior so valid Lucide buttons are not replaced by text labels.
- Improved mirror layout by collapsing VS Code full-viewport flex stacks that caused large blank areas on mobile.
- Added placeholder suppression for virtualized message skeleton rows that produced empty scroll gaps.
- Fixed horizontal overflow in the mobile mirror while preserving code-block horizontal scrolling.
- Updated chip-row layout to wrap cleanly on narrow screens.
- Improved auto-scroll targeting to follow real mirror content height instead of blank flex space.

### Mode/Model Control Reliability

- Fixed mode/model chip update timing by reusing the latest snapshot immediately after click-forward events.
- Ensured mode/model chip metadata updates even while the user is scrolling.
- Improved menu panel selection so semantic mode/model matches always win over generic fallback panels.

### New Chips and Content Sheets

- Added `Stop` chip integration (when available from controls metadata) to trigger IDE stop-generation actions.
- Added persistent `Task`, `Walkthrough`, and `Plan` chips in the dock.
- Added a reusable bottom content sheet with title/body/close controls for rendered text content.
- Added markdown rendering for headings, lists, emphasis, inline code, and horizontal rules.
- Added snapshot-based prose extraction for task/walkthrough fallback content.
- Broadened in-snapshot plan detection and added cached fallback behavior.
- Improved 404 diagnostics for task/walkthrough retrieval with searched brain-directory paths.

### Server and Data Endpoints

- Added brain-file discovery sorted by most-recently-modified UUID workspace directories.
- Added `GET /task` endpoint for `task.md.resolved`.
- Added `GET /walkthrough` endpoint for `walkthrough.md.resolved`.
- Added `GET /plan` endpoint with ordered fallback lookup across resolved and non-resolved plan filenames.

### Asset Conversion and Icon Path Fixes

- Fixed local asset path regex matching for multi-character Windows path segments to stop unresolved icon fetches.
- Added normalization for `/C:/...` style Windows paths from VS Code icon URLs before file lookup.

## 1.0.11

- Fix: Resolved `SyntaxError` in snapshot capture script affecting connection.
- Fix: Improved error handling and diagnostics for mobile bridge.
- Fix: Ensure correct discovery of Antigravity UI targets.

## 1.0.10

- Fix: Resilient DOM selectors for message injection (fixes broken chat in Google update).
- Fix: Hide legacy UI elements (Review Changes, Mic, etc.) in mobile client via post-processing.
- Improved diagnostic probing for future rapid fixes.


## 1.0.9

- Correct repository and issue URLs in `package.json` and `CHANGELOG.md`.

## 1.0.8

- Fix: Resolved `EROFS: read-only file system` error on macOS by moving SSL certificate storage to the extension directory.
- Closes [#1](https://github.com/cafeTechne/antigravity-link-extension/issues/1).


- Add README badges and repository links.
- Add contributing note and improve discoverability.

## 1.0.2

- Update README demo image links to public URLs.

## 1.0.1

- Clarify Windows Start Menu launch path and multi-session requirements.
