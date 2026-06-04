
# Antigravity Link (VS Code Extension)

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Read this in your language:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **What's new in v1.0.20** — Security: removed `child_process` dependency entirely; debug endpoints now require auth; localhost guard on all LS RPC calls. See [CHANGELOG](CHANGELOG.md).

---

## Contents

- [Demo](#demo)
- [What you get](#what-you-get)
- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Commands](#commands)
- [Settings](#settings)
- [For agent builders](#for-agent-builders)
- [How it works](#how-it-works-high-level)
- [Account safety](#account-safety)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [Internationalization and accessibility](#internationalization-and-accessibility)
- [Contributing](#contributing)
- [API reference](#api)
- [MCP server reference](#mcp-server)

---

You're running an Antigravity session and need to step away from your desk. The AI is mid-generation. You want to monitor it, redirect it, upload a file, or just read what it wrote from your phone, without coming back to your computer.

Antigravity Link makes that possible. Scan a QR code and your phone becomes a live mirror of the active chat: read responses as they stream, send messages, stop generation, upload files, dictate via voice, and switch between multiple Antigravity windows all from a mobile browser, on your local network.

For automation, the extension also exposes a local HTTP API and an MCP server so agents and external tools can drive Antigravity sessions programmatically.

## Demo

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

<details>
<summary>Screenshots</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

</details>

## What you get

- Live mirror of the active Antigravity chat — read and interact from your phone.
- File upload into the active Antigravity chat.
- Voice-to-text input from mobile (HTTPS required for mic permissions).
- Stop generation from your phone with a dedicated stop chip.
- Active instance switching for multiple Antigravity windows.
- Local HTTP API for automation and integrations (see [API](#api)).
- MCP server for AI assistant integration (see [MCP server](#mcp-server)).
- Local-only server with token authentication.
- Interface available in 16 languages with automatic detection and RTL support.

## Installation

Install from the Antigravity extensions marketplace: search **Antigravity Link** or [install directly from Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension).

## Prerequisites

- **Antigravity IDE** installed and running.
- **A phone and computer on the same Wi-Fi network.**
- **Antigravity launched with the remote debugging flag.** This is required for the extension to discover and connect to your session. See the launch command in Quick start below.

## Quick start

1) Start Antigravity with remote debugging enabled. This is required; sessions launched without this flag are not discoverable by the extension.

**Windows:**
```powershell
& "C:\Users\<username>\AppData\Local\Programs\Antigravity IDE\Antigravity IDE.exe" --remote-debugging-port=9000
```

**macOS:**
```bash
open -a "Antigravity IDE" --args --remote-debugging-port=9000
```

**Linux:**
```bash
antigravity-ide --remote-debugging-port=9000
```

Multiple Antigravity sessions are supported, but every window must be launched with this command.

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
| Antigravity Link: Select Network Interface | Choose which network interface the QR URL advertises. |

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | Port for the local bridge server. |
| `antigravityLink.autoStart` | `false` | Start the server on VS Code launch. |
| `antigravityLink.useHttps` | `true` | Serve over HTTPS for mic access. |
| `antigravityLink.preferredHost` | `""` | Optional LAN IPv4 to advertise in QR URL (example: `192.168.1.101`). |
| `antigravityLink.strictWorkbenchOnly` | `true` | Only bind to `workbench.html` CDP targets for stability. |
| `antigravityLink.includeFallbackTargets` | `false` | Allow jetski/launchpad fallback targets when strict mode is disabled. |

## For agent builders

If you want to integrate quickly, use this sequence:

1) Start the extension server and copy the token from the QR URL (`?token=...`).
2) Use either MCP tools (`mcp-server.mjs`) or direct HTTP calls against `https://localhost:3000`.
3) Validate control flow with `/snapshot`, `/send`, and `/stop`.

OpenAPI example:

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

MCP client configuration example:

```json
{
  "antigravity-link": {
    "command": "node",
    "args": ["<extension-dir>/mcp-server.mjs"],
    "env": {
      "AG_BRIDGE_URL": "https://localhost:3000",
      "AG_BRIDGE_TOKEN": "<token>"
    }
  }
}
```

Replace `<extension-dir>` with the path to the installed extension:
- **Windows:** `%USERPROFILE%\.antigravity-ide\extensions\cafetechne.antigravity-link-extension-1.0.20`
- **macOS/Linux:** `~/.antigravity-ide/extensions/cafetechne.antigravity-link-extension-1.0.20`

## How it works (high level)

- The extension starts a local server (HTTP or HTTPS).
- It discovers Antigravity targets via the Chrome DevTools Protocol (CDP).
- Your phone connects to the mobile UI and sends upload/command requests.
- The extension injects into the selected chat target and saves files to `uploads/`.

## Account safety

Antigravity Link has no known ban cases and is designed to stay that way.

The extension works by connecting to a debug port that Antigravity exposes on your own machine the same Chrome DevTools Protocol used by VS Code's built-in debugger and browser devtools. It reads your local UI and simulates keypresses and clicks, exactly as if you were sitting at your keyboard.

What this means in practice:
- **All network activity is local.** The extension communicates only with: your phone on the LAN via the HTTPS server it starts; Antigravity IDE's Chrome DevTools Protocol port on `localhost:9000`; and Antigravity's Language Server process on `127.0.0.1` for the stop-generation RPC. No data is sent to Google's servers or any external service beyond what Antigravity itself sends.
- **Nothing is injected into Antigravity's network traffic.** The extension reads your screen and types into your editor it does not intercept or modify API calls.
- **No Antigravity files are modified.** There are no patches, hooks, or binary modifications.
- **The server runs entirely on your machine.** Your prompts, chat history, and files never leave your local network unless you explicitly expose the server externally.
- **No data is sent to third-party services** by this extension.

The source code is MIT-licensed and fully auditable: https://github.com/cafeTechne/antigravity-link-extension

## Troubleshooting

- **No instances found**: Make sure every Antigravity window was launched with the `--remote-debugging-port` command shown above.
- **Can't connect from mobile**: Ensure your phone and computer are on the same network.
- **Uploads save but don't appear in chat**: Switch to the correct Active Instance in the mobile UI.
- **Stuck on "Initializing…"**: The server is reachable but the chat surface has not been captured yet. Wait a few seconds for the CDP connection to initialize.

## FAQ

**Does this work on iOS and Android?**
Yes. The mobile UI runs in any modern mobile browser Safari on iOS, Chrome on Android, and others all work.

**Does this work over cellular or VPN?**
Not by default: the server is LAN-only. For remote access you would need to expose it through a tunnel such as ngrok, wireguard, etc.. The token authentication and HTTPS remain in place regardless.

**Is the self-signed certificate warning safe to accept?**
Yes. The certificate is generated locally on your machine at server start. The warning appears because it is not issued by a public certificate authority, not because the connection is insecure.

**Can I use this for automation?**
Yes. The local HTTP API and MCP server are designed for exactly this. See the [API](#api) and [MCP server](#mcp-server) sections.

## Internationalization and accessibility

The mobile interface automatically detects your browser's language and renders in:

English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

Arabic is rendered right-to-left automatically. Language detection uses `navigator.language` with no configuration required.

The interface is built with semantic HTML, ARIA roles, `aria-live` regions for connection status, keyboard navigation, and screen-reader-compatible labels throughout.

## Contributing

Pull requests are welcome. Check the TODOs in the codebase or open a GitHub issue to discuss ideas before starting large changes.
See `CONTRIBUTING.md` for setup and PR notes.

---

## API

The extension exposes a local HTTP API at `https://localhost:3000` (or your configured port). All endpoints except `/ping` require an `Authorization: Bearer <token>` header. The token is the value after `?token=` in the QR code URL.

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/ping` | Health check — returns `pong`. No auth required. |
| GET | `/snapshot` | Current chat surface: HTML, CSS, mode/model, `isGenerating`. |
| GET | `/instances` | List active Antigravity windows. |
| POST | `/instance` | Switch active window. Body: `{ "targetId": "..." }` |
| POST | `/send` | Send a message. Body: `{ "message": "..." }` |
| POST | `/click` | Click a UI element. Body: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | Stop AI generation. |
| POST | `/upload` | Upload a file (multipart/form-data, field name `file`). |
| GET | `/task` | Read the current task document. |
| GET | `/walkthrough` | Read the current walkthrough document. |
| GET | `/plan` | Read the current implementation plan. |

Full schema: [`openapi.yaml`](openapi.yaml)

## MCP server

Antigravity Link ships an MCP (Model Context Protocol) server that lets AI assistants drive your Antigravity session directly.

**Setup**

Add the following to your MCP client configuration (e.g. `claude_desktop_config.json`):

```json
{
  "antigravity-link": {
    "command": "node",
    "args": ["<extension-dir>/mcp-server.mjs"],
    "env": {
      "AG_BRIDGE_URL": "https://localhost:3000",
      "AG_BRIDGE_TOKEN": "<your-token>"
    }
  }
}
```

Replace `<extension-dir>` with the path to the installed extension:
- **Windows:** `%USERPROFILE%\.antigravity-ide\extensions\cafetechne.antigravity-link-extension-1.0.20`
- **macOS/Linux:** `~/.antigravity-ide/extensions/cafetechne.antigravity-link-extension-1.0.20`

The token is the value after `?token=` in the QR code URL. The extension server must be running before the MCP client connects.

**Available tools**

| Tool | Description |
| --- | --- |
| `get_snapshot` | Get current chat state, mode, model, and generation status. |
| `send_message` | Send a message to the active chat. |
| `stop_generation` | Cancel active AI generation. |
| `get_instances` | List available Antigravity windows. |
| `switch_instance` | Switch to a different Antigravity window. |
| `click_element` | Click a UI element by selector, text, or coordinates. |
| `get_task` | Read the current task document. |
| `get_walkthrough` | Read the current walkthrough document. |
| `get_plan` | Read the current implementation plan. |

## Standalone vs workspace assets

This extension is self-contained. It ships its own `public/` assets and `uploads/` folder and does not require the parent `npm run dev` build.

If your *workspace* contains `public/` or `uploads/`, the extension will prefer those paths automatically. This makes it easy to customize the mobile UI or keep uploads in your project root, but it also means behavior can differ between workspaces.

---

## Star history

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## Acknowledgments

Inspired by early community projects including:
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat
