# How to Use Your New Material 3 UI

You can start using the updated **Material 3 Expressive Design** right now for your personal workflow. Here are the simple steps:

### 🚀 To Run It Now:

1.  **Launch Antigravity**: Open your Antigravity IDE with the debugging port enabled:
    ```powershell
    & "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
    ```
2.  **Start the Link Server**: In VS Code (where you have this project open):
    - Press `Ctrl + Shift + P` to open the Command Palette.
    - Type and select: `Antigravity Link: Start Server`.
3.  **Open the App**:
    - Select `Antigravity Link: Show QR Code` from the Command Palette.
    - Scan the QR with your phone (on the same Wi-Fi) or open the URL in your browser.

### 🛡️ To Keep It Permanently:

Since you are currently on the `feature/material-3-design-overhaul` branch, you will see this design as long as you stay on this branch.

If you want this new look to be your **default** (the main version):

1.  Open the terminal in VS Code.
2.  Run these two simple commands:
    ```bash
    git checkout main
    git merge feature/material-3-design-overhaul
    ```
    _This will bring all the M3 changes into your main version of the app._

Enjoy the modern, expressive Material 3 experience! 📱✨
