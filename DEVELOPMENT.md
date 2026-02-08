# Antigravity Link - Development Guide

This guide will help you set up the development environment, run the extension locally, and contribute to the project.

## Prerequisites

1.  **Node.js**: Ensure you have Node.js installed (v18+ recommended).
2.  **Antigravity IDE**: You need the Antigravity IDE installed.
3.  **VS Code**: For developing the extension itself.

## Setup

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/cafeTechne/antigravity-link-extension
    cd antigravity-link-extension
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Running the Extension (Debug Mode)

To test the extension, you need to run it inside a special "Extension Development Host" window of VS Code.

1.  Open the project folder in VS Code.
2.  Press **F5** (or go to **Run and Debug** > **Run Extension**).
3.  A new VS Code window will open with the extension loaded.

### Connecting to Antigravity

For the extension to work, it needs to talk to a running instance of Antigravity via the Chrome DevTools Protocol (CDP).

1.  **Launch Antigravity** with the remote debugging flag:
    - **Windows**:
      ```powershell
      & "path\to\Antigravity.exe" --remote-debugging-port=9000
      ```
    - **Mac/Linux**:
      ```bash
      /path/to/antigravity --remote-debugging-port=9000
      ```

2.  In the **Extension Development Host** window (the one opened by F5):
    - Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
    - Run `Antigravity Link: Start Server`.
    - Run `Antigravity Link: Show QR Code`.

## Building

To compile the TypeScript code to JavaScript:

```bash
npm run compile
```

To watch for changes automatically:

```bash
npm run watch
```

To package the extension for distribution (`.vsix`):

```bash
npm run package
```

(Requires `vsce` installed globally or via npx)

## Testing

Run the test suite with:

```bash
npm test
```

## Architecture Overview

- **`src/extension.ts`**: The main entry point. Registers commands and manages the server lifecycle.
- **`src/server/`**: Contains the Express server and WebSocket logic.
- **`src/services/cdp.ts`**: Handles discovery of Antigravity instances and connection via Chrome DevTools Protocol.
- **`src/services/antigravity.ts`**: Contains logic for injecting scripts and files into the IDE.

## Contribution Tips

- **Linting**: Ensure your code follows the project's style.
- **Types**: Avoid `any` where possible.
- **Async/Await**: The project invokes many async CDP commands; ensure proper error handling.
