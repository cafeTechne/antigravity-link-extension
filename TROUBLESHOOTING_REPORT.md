# Antigravity Link Extension - Troubleshooting Report

**Date:** 2026-02-08  
**Environment:** Windows 11, Antigravity IDE (VS Code fork)

---

## Issue 1: Antigravity Not Discoverable by Extension

**Symptom:** Extension reported "No instances found" when attempting to start.

**Root Cause:** Antigravity was launched without the `--remote-debugging-port=9000` flag. The extension relies on CDP (Chrome DevTools Protocol) to discover and communicate with Antigravity instances.

**Solution:** Modified all user shortcuts (Start Menu, Desktop, Taskbar) to include:

```
--remote-debugging-port=9000
```

**Time to Diagnose:** ~5 minutes

---

## Issue 2: Shortcuts Not Retaining Arguments

**Symptom:** After running a PowerShell script to update shortcuts, the user relaunched Antigravity but the debug port was still not active.

**Root Cause:** The user's Desktop folder was redirected to OneDrive (`C:\Users\<user>\OneDrive\Desktop`), not the standard `C:\Users\<user>\Desktop`. The bulk update script missed this location.

**Solution:** Manually identified the correct OneDrive Desktop path and recreated the shortcut with proper arguments using `WScript.Shell`:

```powershell
$s = (New-Object -ComObject WScript.Shell).CreateShortcut("path\to\shortcut.lnk")
$s.Arguments = "--remote-debugging-port=9000"
$s.Save()
```

**Time to Diagnose:** ~10 minutes

---

## Issue 3: Extension Hanging on "Activating Extensions..."

**Symptom:** After enabling `antigravityLink.autoStart: true`, Antigravity would hang indefinitely on "Activating extensions..." and never fully load.

**Root Cause:** The default port for the extension server (`3000`) was already occupied by another process. The extension's `start()` method blocks during activation when the port is unavailable, and there was no timeout or user-facing error.

**Solution:** Changed the extension port to `3005` in `settings.json`:

```json
"antigravityLink.port": 3005
```

**Time to Diagnose:** ~8 minutes (required running diagnostic scripts and checking `netstat`)

---

## Suggestions for the Plugin Author

### 1. **Improve Onboarding Experience**

- Add a first-run wizard that checks:
  - Is Antigravity running with `--remote-debugging-port`?
  - Is the configured port available?
  - Network interface detection for QR code generation.
- Display actionable error messages instead of silent failures.

### 2. **Handle Port Conflicts Gracefully**

- If the default port is busy, try the next available port (e.g., 3001, 3002...).
- Show a notification: "Port 3000 is busy. Using port 3001 instead."
- Alternatively, fail fast with a clear error instead of blocking extension activation.

### 3. **Auto-Detect OneDrive Desktop Redirection**

- When updating shortcuts or providing instructions, check for common redirections:
  - `$env:USERPROFILE\OneDrive\Desktop`
  - `$env:OneDrive\Desktop`
- Many Windows users have this enabled by default.

### 4. **Provide a One-Click Setup Script**

- Bundle a PowerShell script that:
  - Finds the Antigravity executable.
  - Updates all common shortcut locations.
  - Sets the correct registry keys or environment variables if applicable.
- Offer this as a command: `Antigravity Link: Configure System`.

### 5. **Add a "Health Check" Command**

- A command like `Antigravity Link: Diagnose` that reports:
  - CDP port status (9000)
  - Extension server port status (3000 or configured)
  - Detected Antigravity instances
  - Network interfaces and IP addresses

### 6. **Document the Debug Port Requirement Prominently**

- The README mentions it, but users often skip to "Quick Start."
- Consider adding a warning in the extension description on the Marketplace.
- Show a persistent notification if no CDP instances are found after 10 seconds.

### 7. **Consider Non-Blocking Activation**

- Move server startup out of the `activate()` lifecycle.
- Use a deferred startup pattern so the extension activates immediately, then starts the server in the background.
- This prevents the IDE from hanging if something goes wrong.

---

## Summary

| Issue                     | Root Cause                        | Fix                         |
| ------------------------- | --------------------------------- | --------------------------- |
| No instances found        | Missing `--remote-debugging-port` | Updated shortcuts           |
| Shortcut not working      | OneDrive Desktop redirection      | Manually fixed correct path |
| IDE hanging on activation | Port 3000 occupied                | Changed to port 3005        |

**Total Setup Time:** ~30 minutes (could be reduced to <5 minutes with suggested improvements)

---

_Prepared for submission to the plugin author via GitHub issue or PR._
