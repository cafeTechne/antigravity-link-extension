# Antigravity Link (VS Code Extension)

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

GitHub repo: https://github.com/cafeTechne/antigravity-link-extension
Open VSX: https://open-vsx.org/extension/cafetechne/antigravity-link-extension

Bring your Antigravity sessions to your phone. Upload files, dictate prompts, and control multiple active Antigravity chats from a mobile-friendly interface.

## Who this is for

- Teams who want a simple, secure mobile companion for Google's Antigravity IDE.
- Power users who want fast uploads and voice-to-text on the go.
- New developers who want a zero-config way to interact with a running Antigravity session.

## What you get

- File upload into the active Antigravity chat.
- Voice-to-text input from mobile (HTTPS required for mic permissions).
- Active instance switching for multiple Antigravity windows.
- Local-only server with token authentication.

## Demo photos

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

## Quick start

1) Start Antigravity with remote debugging enabled. This is required; sessions launched without this flag are not discoverable by the extension.

Example (Windows, Start Menu shortcut path):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```
Replace `<username>` with your Windows username. Multiple Antigravity sessions are supported, but every window must be launched with this command.

2) In VS Code, run:
`Antigravity Link: Start Server`

3) Then run:
`Antigravity Link: Show QR Code`

4) Scan the QR code with your phone. Your mobile UI is ready.

5) Your phone may warn that the connection is unsafe because the certificate is self-signed. This is expected for local HTTPS. Use your browser's "Advanced" or similar option to proceed (wording differs between Safari/Chrome/Firefox).

## Commands

| Command | Description |
| --- | --- |
| Antigravity Link: Start Server | Starts the local bridge server. |
| Antigravity Link: Stop Server | Stops the server. |
| Antigravity Link: Show QR Code | Displays the connection QR code. |

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | Port for the local bridge server. |
| `antigravityLink.autoStart` | `false` | Start the server on VS Code launch. |
| `antigravityLink.useHttps` | `true` | Serve over HTTPS for mic access. |

## Standalone vs workspace assets

This extension is self-contained. It ships its own `public/` assets and `uploads/` folder and does not require the parent `npm run dev` build.

If your *workspace* contains `public/` or `uploads/`, the extension will prefer those paths automatically. This makes it easy to customize the mobile UI or keep uploads in your project root, but it also means behavior can differ between workspaces.

## How it works (high level)

- The extension starts a local server (HTTP or HTTPS).
- It discovers Antigravity targets via the Chrome DevTools Protocol (CDP).
- Your phone connects to the mobile UI and sends upload/command requests.
- The extension injects into the selected chat target and saves files to `uploads/`.

## Security and privacy

- The server runs locally and is authenticated with a token.
- HTTPS is enabled by default to allow microphone access on mobile.
- No data is sent to third-party services by this extension.

## Troubleshooting

- **No instances found**: Make sure every Antigravity window was launched with the `--remote-debugging-port` command shown above.
- **Can't connect from mobile**: Ensure your phone and computer are on the same network.
- **Uploads save but don't appear in chat**: Switch to the correct Active Instance in the mobile UI.

## Contributing

We are accepting pull requests and actively looking for contributors. If you want to help, check the TODOs in the codebase or open an issue to discuss ideas.

## License

MIT. See `LICENSE`.

## Acknowledgments

Inspired by early community projects including:
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat
