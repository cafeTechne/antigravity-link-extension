# Antigravity Link（VS Code 扩展）

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**选择语言：**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

---

GitHub 仓库: https://github.com/cafeTechne/antigravity-link-extension

Open VSX: https://open-vsx.org/extension/cafetechne/antigravity-link-extension

将 Antigravity 会话带到您的手机上。通过移动端友好的界面上传文件、语音输入提示词、停止生成，并管理多个活跃的 Antigravity 聊天窗口——或通过 MCP 或本地 HTTP API 进行自动化操作。

## 适用人群

- 希望为 Google Antigravity IDE 提供简单、安全移动伴侣的团队。
- 希望随时随地快速上传文件和使用语音输入的高级用户。
- 希望通过 API 或 MCP 自动化或集成 Antigravity 会话的开发者。
- 希望以零配置方式与运行中的 Antigravity 会话交互的新手开发者。

## 功能特性

- 活跃 Antigravity 聊天的实时镜像——从手机上浏览和操作。
- 向活跃 Antigravity 聊天上传文件。
- 从移动端进行语音输入（需要 HTTPS 以获取麦克风权限）。
- 通过专用停止按钮从手机停止生成。
- 多 Antigravity 窗口的活跃实例切换。
- 用于自动化和集成的本地 HTTP API。
- 用于 AI 助手集成的 MCP 服务器。
- 带有令牌认证的纯本地服务器。
- 支持 16 种语言，自动检测语言并支持 RTL 布局。

## 快速开始

1) 启用远程调试后启动 Antigravity。这是必须的；没有此标志启动的会话无法被扩展发现。

示例（Windows）：
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

2) 在 VS Code 中运行：`Antigravity Link: Start Server`

3) 然后运行：`Antigravity Link: Show QR Code`

4) 用手机扫描二维码。移动界面即可使用。

5) 由于证书是自签名的，手机可能会警告连接不安全。这在本地 HTTPS 中是正常现象。使用浏览器的"高级"选项继续访问即可。

## 命令

| 命令 | 说明 |
| --- | --- |
| Antigravity Link: Start Server | 启动本地桥接服务器。 |
| Antigravity Link: Stop Server | 停止服务器。 |
| Antigravity Link: Show QR Code | 显示连接二维码。 |
| Antigravity Link: Select Network Interface | 选择二维码 URL 所使用的网络接口。 |

## API

扩展在 `https://localhost:3000` 上公开本地 HTTP API。除 `/ping` 外，所有端点均需要 `Authorization: Bearer <token>` 请求头。

| 方法 | 端点 | 说明 |
| --- | --- | --- |
| GET | `/ping` | 健康检查。无需认证。 |
| GET | `/snapshot` | 当前聊天界面：HTML、CSS、模式/模型、isGenerating。 |
| GET | `/instances` | 列出活跃的 Antigravity 窗口。 |
| POST | `/instance` | 切换活跃窗口。请求体：`{ "targetId": "..." }` |
| POST | `/send` | 发送消息。请求体：`{ "message": "..." }` |
| POST | `/click` | 点击 UI 元素。请求体：`{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | 停止 AI 生成。 |
| POST | `/upload` | 上传文件（multipart/form-data）。 |
| GET | `/task` | 读取当前任务文档。 |
| GET | `/walkthrough` | 读取当前演练文档。 |
| GET | `/plan` | 读取当前实现计划。 |

完整 schema：[`openapi.yaml`](openapi.yaml)

## MCP 服务器

添加到您的 MCP 客户端配置中：

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

## 安全与隐私

- 服务器在本地运行，并通过令牌进行认证。
- 默认启用 HTTPS，以允许移动端访问麦克风。
- 本扩展不会向任何第三方服务发送数据。

## 故障排除

- **找不到实例**：请确保每个 Antigravity 窗口都是通过 `--remote-debugging-port` 启动的。
- **无法从移动端连接**：确保手机和电脑处于同一网络下。
- **停留在"初始化中…"**：请等待几秒钟，让 CDP 连接完成初始化。

## 国际化与无障碍

移动界面会自动检测浏览器语言并以以下语言显示：
English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

阿拉伯语以从右到左的方式显示。语言检测使用 `navigator.language`，无需任何配置。

## 贡献

我们接受 Pull Request，并积极寻找贡献者。
设置方法和 PR 说明请参阅 `CONTRIBUTING.md`。

## 许可证

MIT。详情请参阅 `LICENSE`。
