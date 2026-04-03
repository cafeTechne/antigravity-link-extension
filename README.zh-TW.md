
# Antigravity Link（VS Code 分機）

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**用您的語言閱讀此內容：**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **v1.0.13 中的新增功能** — 停止從行動裝置產生、MCP 伺服器 + OpenAPI 規格、15 種語言 UI、檔案上傳改進。參見 [CHANGELOG](CHANGELOG.md)。

---

## 內容

- [示範](#示範)
- [你得到什麼](#你得到什麼)
- [安裝](#安裝)
- [先決條件](#先決條件)
- [快速啟動](#快速啟動)
- [命令](#命令)
- [設定](#設定)
- [對於代理建設者](#對於代理建設者)
- [它是如何運作的](#它是如何工作的高級)
- [帳戶安全](#帳戶安全)
- [故障排除](#故障排除)
- [常問問題](#常問問題)
- [國際化和可訪問性](#國際化和可訪問性)
- [貢獻](#貢獻)
- [API參考](#應用程式介面)
- [MCP 伺服器參考](#mcp伺服器)

---

您正在執行 Antigravity 會話，需要離開辦公桌。 AI是中期的。您想要透過手機監控它、重新導向它、上傳檔案或只是讀取它所寫的內容，而無需返回電腦。

Antigravity Link 讓這一切成為可能。掃描 QR 代碼，您的手機將成為活動聊天的即時鏡像：在串流時讀取回應、發送訊息、停止產生、上傳檔案、透過語音指令以及在多個 Antigravity 視窗之間切換 - 所有這些都透過本地網路上的行動瀏覽器進行。

對於自動化，該擴充功能還公開本地 HTTP API 和 MCP 伺服器，以便代理和外部工具可以以程式方式驅動 Antigravity 會話。

## 示範

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

<details>
<summary>截圖</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

</details>

## 你得到什麼

- 活動 Antigravity 聊天的即時鏡像 - 從您的手機上閱讀和互動。
- 文件上傳到活動的 Antigravity 聊天。
- 從行動裝置進行語音到文字輸入（麥克風權限需要 HTTPS）。
- 使用專用停止晶片停止手機生成。
- 多個 Antigravity 視窗的活動實例切換。
- 用於自動化和整合的本機 HTTP API（請參閱 [API](#api)）。
- 用於AI助理整合的MCP伺服器（請參閱[MCP server](#mcp-server)）。
- 具有令牌身份驗證的僅限本機伺服器。
- 介面提供 16 種語言，具有自動偵測和 RTL 支援。

## 安裝

從 Antigravity 擴充市場安裝 - 搜尋 **Antigravity Link** - 或 [install directly from Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)。

## 先決條件

- **Antigravity IDE** 已安裝並正在運作。
- **手機和電腦處於同一 Wi-Fi 網路。 **
- **Antigravity 使用遠端偵錯標誌啟動。 ** 這是擴展發現並連接到您的會話所必需的。請參閱下面快速啟動中的啟動命令。

## 快速啟動

1) 在啟用遠端偵錯的情況下啟動 Antigravity。這是必需的；擴展無法發現沒有此標誌啟動的會話。

**Windows**（開始功能表捷徑）：
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

**蘋果系統：**
```bash
open -a Antigravity --args --remote-debugging-port=9000
```

**Linux：**
```bash
antigravity --remote-debugging-port=9000
```

支援多個 Antigravity 會話，但每個視窗都必須使用此命令啟動。

2) 在 VS Code 中，運行：
`Antigravity Link: Start Server`

3) 然後運行：
`Antigravity Link: Show QR Code`

4) 用手機掃描QR碼。您的行動用戶介面已準備就緒。

5) 您的手機可能會警告連線不安全，因為憑證是自簽署的。這對於本地 HTTPS 來說是預期的。使用瀏覽器的「進階」或類似選項繼續（Safari/Chrome/Firefox 之間的措詞有所不同）。

## 命令

| 命令 | 描述 |
| --- | --- |
| Antigravity Link: Start Server | Starts the local bridge server. |
| Antigravity Link: Stop Server | 停止伺服器。 |
| Antigravity Link: Show QR Code | 顯示連接 QR 代碼。 |
| Antigravity Link: Select Network Interface | 選擇 QR URL 通告的網路介面。 |

## 設定

| 環境 | 預設 | 描述 |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | 本地橋接伺服器的連接埠。 |
| `antigravityLink.autoStart` | `false` | 在 VS Code 啟動時啟動伺服器。 |
| `antigravityLink.useHttps` | `true` | 透過 HTTPS 進行麥克風存取。 |
| `antigravityLink.preferredHost` | `""` | 在 QR URL 中通告的選用 LAN IPv4（範例：`192.168.1.101`）。 |
| `antigravityLink.strictWorkbenchOnly` | `true` | 僅結合 `workbench.html` CDP 標靶以確保穩定性。 |
| `antigravityLink.includeFallbackTargets` | `false` | 停用嚴格模式時允許使用水上摩托車/啟動板後備目標。 |

## 對於代理建設者

如果您想快速集成，請使用以下順序：

1) 啟動擴充伺服器並從 QR URL (`?token=...`) 複製令牌。
2) 使用 MCP 工具 (`mcp-server.mjs`) 或針對 `https://localhost:3000` 的直接 HTTP 呼叫。
3) 使用 `/snapshot`、`/send` 和 `/stop` 驗證控制流。

開放API範例：

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

MCP客戶端設定範例：

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

將 `<extension-dir>` 替換為已安裝擴充的路徑：
- **Windows：** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux：** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

## 它是如何工作的（高級）

- 此擴充啟動本機伺服器（HTTP 或 HTTPS）。
- 它透過 Chrome DevTools 協議 (CDP) 發現 Antigravity 目標。
- 您的手機連接到行動 UI 並發送上傳/命令請求。
- 此擴充功能會注入選定的聊天目標並將檔案儲存到 `uploads/`。

## 帳戶安全

Antigravity Link 沒有已知的禁令案例，並且旨在保持這種狀態。

該擴充功能透過連接到 Antigravity 在您自己的電腦上公開的偵錯連接埠來運作 - VS Code 的內建偵錯器和瀏覽器開發工具使用相同的 Chrome DevTools 協定。它讀取您的本機 UI 並模擬按鍵和點擊，就像您坐在鍵盤前一樣。

這在實踐中意味著什麼：
- **除了 Antigravity 已發送的請求之外，不會向 Google 伺服器發出任何請求。該分機無法存取 LAN 以外的網路。
- **沒有任何內容注入到 Antigravity 的網路流量中。 ** 該擴充功能會讀取您的螢幕並在編輯器中輸入內容 - 它不會攔截或修改 API 呼叫。
- **没有修改 Antigravity 文件。 ** 沒有補丁、掛鉤或二進位修改。
- **伺服器完全在您的電腦上運行。 ** 您的提示、聊天歷史記錄和文件永遠不會離開您的本地網絡，除非您明確地將伺服器暴露在外部。
- **此擴充功能不會將任何資料傳送至第三方服務**。

原始碼已獲得 MIT 許可且完全可審核：https://github.com/cafeTechne/antigravity-link-extension

## 故障排除

- **未找到實例**：確保每個 Antigravity 視窗都是使用上面顯示的 `--remote-debugging-port` 命令啟動的。
- **無法從手機連接**：確保您的手機和電腦位於同一網路。
- **上傳儲存但不出現在聊天中**：切換到行動用戶介面中正確的活動實例。
- **卡在“正在初始化...”**：伺服器可訪問，但聊天介面尚未捕獲。等待幾秒鐘，讓 CDP 連線初始化。

## 常問問題

**這適用於 iOS 和 Android 嗎？ **
是的。行動 UI 可以在任何現代行動瀏覽器中運行 - iOS 上的 Safari、Android 上的 Chrome 以及其他瀏覽器都可以運行。

**這可以透過蜂窩網路或 VPN 運作嗎？ **
預設並非如此 — 伺服器僅適用於 LAN。對於遠端訪問，您需要透過 ngrok 等隧道公開它。無論如何，令牌身份驗證和 HTTPS 仍然保留。

**自簽名憑證警告是否可以安全接受？ **
是的。該證書是在伺服器啟動時在您的電腦上本地產生的。出現警告是因為它不是由公共憑證授權單位頒發的，而不是因為連線不安全。

**我可以用它來實現自動化嗎？ **
是的。本機 HTTP API 和 MCP 伺服器正是為此而設計的。請參閱 [API](#api) 和 [MCP server](#mcp-server) 部分。

## 國際化和可訪問性

行動介面會自動偵測您的瀏覽器語言並呈現為：

英文 · 日本語 · 中文（簡體） · 中文（繁體） · 한국어 · 德語 · 法語 · 西班牙語 · 葡萄牙語 · Русский · 義大利語 · 波蘭語 ·土耳其語 · Tiếng ệ ·廣州 ệt

阿拉伯語會自動從右到左呈現。語言偵測使用 `navigator.language`，無需配置。

此介面採用語意 HTML、ARIA 角色、用於連接狀態的 `aria-live` 區域、鍵盤導航和螢幕閱讀器相容標籤建構。

## 貢獻

歡迎請求請求。在開始重大變更之前，請檢查程式碼庫中的 TODO 或開啟 GitHub 問題來討論想法。
有關設定和 PR 說明，請參閱 `CONTRIBUTING.md`。

---

## 應用程式介面

此擴充功能在 `https://localhost:3000`（或您配置的連接埠）公開本機 HTTP API。除 `/ping` 之外的所有端點都需要 `Authorization: Bearer <token>` 標頭。令牌是QR代碼URL中`?token=`後面的值。

| 方法 | 端點 | 描述 |
| --- | --- | --- |
| 得到 | `/ping` | 健康檢查 — 返回 `pong`。無需授權。 |
| 得到 | `/snapshot` | 目前聊天介面：HTML、CSS、模式/模型、`isGenerating`。 |
| 得到 | `/instances` | 列出活動的 Antigravity 視窗。 |
| 郵政 | `/instance` | 切換活動視窗。機身：`{ "targetId": "..." }` |
| 郵政 | `/send` | 發送訊息。機身：`{ "message": "..." }` |
| 郵政 | `/click` | 點選 UI 元素。機身：`{ "selector"?, "text"?, "x"?, "y"? }` |
| 郵政 | `/stop` | 停止人工智慧的產生。 |
| 郵政 | `/upload` | 上傳檔案（multipart/form-data，欄位名稱 `file`）。 |
| 得到 | `/task` | 閱讀目前任務文檔。 |
| 得到 | `/walkthrough` | 閱讀目前的演練文件。 |
| 得到 | `/plan` | 閱讀目前的實施計劃。 |

完整架構：[`openapi.yaml`](openapi.yaml)

## MCP伺服器

Antigravity Link 隨附 MCP（模型上下文協定）伺服器，可讓 AI 助理直接驅動您的 Antigravity 工作階段。

**設定**

將以下內容新增至您的 MCP 用戶端設定（例如 `claude_desktop_config.json`）：

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

將 `<extension-dir>` 替換為已安裝擴充的路徑：
- **Windows：** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux：** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

令牌是QR代碼URL中`?token=`後面的值。在 MCP 用戶端連線之前，擴充伺服器必須正在執行。

**可用工具**

| 工具 | 描述 |
| --- | --- |
| `get_snapshot` | 取得目前聊天狀態、模式、模型和生成狀態。 |
| `send_message` | 向活動聊天發送訊息。 |
| `stop_generation` | 取消主動 AI 生成。 |
| `get_instances` | 列出可用的 Antigravity 視窗。 |
| `switch_instance` | 切換到不同的 Antigravity 視窗。 |
| `click_element` | 透過選擇器、文字或座標點擊 UI 元素。 |
| `get_task` | 閱讀目前任務文檔。 |
| `get_walkthrough` | 閱讀目前的演練文件。 |
| `get_plan` | 閱讀目前的實施計劃。 |

## 獨立資產與工作區資產

這個擴展是獨立的。它附帶了自己的 `public/` 資源和 `uploads/` 資料夾，並且不需要父 `npm run dev` 建置。

如果您的*工作空間*包含 `public/` 或 `uploads/`，則擴充將自動首選這些路徑。這使得自訂行動 UI 或將上傳內容保留在專案根目錄中變得很容易，但這也意味著工作區之間的行為可能有所不同。

---

## 明星歷史

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## 致謝

受到早期社區計畫的啟發，包括：
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat
