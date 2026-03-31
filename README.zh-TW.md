# Antigravity Link（VS Code 擴充功能）

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**選擇語言：**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

---

GitHub 儲存庫: https://github.com/cafeTechne/antigravity-link-extension

Open VSX: https://open-vsx.org/extension/cafetechne/antigravity-link-extension

將 Antigravity 工作階段帶到您的手機上。透過行動裝置友善的介面上傳檔案、語音輸入提示、停止生成，並管理多個活躍的 Antigravity 聊天視窗——或透過 MCP 或本地 HTTP API 進行自動化操作。

## 適用對象

- 希望為 Google Antigravity IDE 提供簡單、安全行動伴侶的團隊。
- 希望隨時隨地快速上傳檔案並使用語音輸入的進階使用者。
- 希望透過 API 或 MCP 自動化或整合 Antigravity 工作階段的開發者。
- 希望以零設定方式與執行中的 Antigravity 工作階段互動的新手開發者。

## 功能特色

- 活躍 Antigravity 聊天的即時鏡像——從手機瀏覽並操作。
- 向活躍的 Antigravity 聊天上傳檔案。
- 從行動裝置進行語音輸入（需要 HTTPS 以取得麥克風權限）。
- 透過專用停止按鈕從手機停止生成。
- 多個 Antigravity 視窗的活躍實例切換。
- 用於自動化與整合的本地 HTTP API。
- 用於 AI 助理整合的 MCP 伺服器。
- 帶有令牌驗證的純本地伺服器。
- 支援 16 種語言，自動偵測語言並支援 RTL 排版。

## 快速開始

1) 啟用遠端偵錯後啟動 Antigravity。這是必要的；未使用此旗標啟動的工作階段無法被擴充功能發現。

範例（Windows）：
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

2) 在 VS Code 中執行：`Antigravity Link: Start Server`

3) 接著執行：`Antigravity Link: Show QR Code`

4) 用手機掃描 QR 碼。行動介面即可使用。

5) 由於憑證為自簽憑證，手機可能會警告連線不安全。這在本地 HTTPS 中是預期的行為。請使用瀏覽器的「進階」選項繼續前往。

## 指令

| 指令 | 說明 |
| --- | --- |
| Antigravity Link: Start Server | 啟動本地橋接伺服器。 |
| Antigravity Link: Stop Server | 停止伺服器。 |
| Antigravity Link: Show QR Code | 顯示連線 QR 碼。 |
| Antigravity Link: Select Network Interface | 選擇 QR 碼 URL 所使用的網路介面。 |

## API

擴充功能在 `https://localhost:3000` 上公開本地 HTTP API。除 `/ping` 外，所有端點均需要 `Authorization: Bearer <token>` 標頭。

| 方法 | 端點 | 說明 |
| --- | --- | --- |
| GET | `/ping` | 健康檢查。無需驗證。 |
| GET | `/snapshot` | 目前的聊天介面：HTML、CSS、模式/模型、isGenerating。 |
| GET | `/instances` | 列出活躍的 Antigravity 視窗。 |
| POST | `/instance` | 切換活躍視窗。請求本體：`{ "targetId": "..." }` |
| POST | `/send` | 傳送訊息。請求本體：`{ "message": "..." }` |
| POST | `/click` | 點擊 UI 元素。請求本體：`{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | 停止 AI 生成。 |
| POST | `/upload` | 上傳檔案（multipart/form-data）。 |
| GET | `/task` | 讀取目前的任務文件。 |
| GET | `/walkthrough` | 讀取目前的逐步說明文件。 |
| GET | `/plan` | 讀取目前的實作計畫。 |

完整 schema：[`openapi.yaml`](openapi.yaml)

## MCP 伺服器

新增至您的 MCP 用戶端設定：

```json
{
  "antigravity-link": {
    "command": "node",
    "args": ["/path/to/antigravity-link-extension/mcp-server.mjs"],
    "env": {
      "AG_BRIDGE_URL": "https://localhost:3000",
      "AG_BRIDGE_TOKEN": "<your-token>"
    }
  }
}
```

可用工具：`get_snapshot`, `send_message`, `stop_generation`, `get_instances`, `switch_instance`, `click_element`, `get_task`, `get_walkthrough`, `get_plan`

## 安全性與隱私

- 伺服器在本地執行，並透過令牌進行驗證。
- 預設啟用 HTTPS，以允許行動裝置存取麥克風。
- 本擴充功能不會向任何第三方服務傳送資料。

## 疑難排解

- **找不到實例**：請確認每個 Antigravity 視窗都是以 `--remote-debugging-port` 啟動的。
- **無法從行動裝置連線**：確認手機和電腦處於同一網路下。
- **卡在「初始化中…」**：請等待幾秒鐘，讓 CDP 連線完成初始化。

## 國際化與無障礙

行動介面會自動偵測瀏覽器語言，並以下列語言顯示：
English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

阿拉伯語以從右到左的方式顯示。語言偵測使用 `navigator.language`，無需任何設定。

## 貢獻

我們接受 Pull Request，並積極尋找貢獻者。
設定方法與 PR 說明請參閱 `CONTRIBUTING.md`。

## 授權條款

MIT。詳情請參閱 `LICENSE`。
