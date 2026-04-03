
# Antigravity Link（VS Code 分机）

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**用您的语言阅读此内容：**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **v1.0.13 中的新增功能** — 停止从移动设备生成、MCP 服务器 + OpenAPI 规范、15 种语言 UI、文件上传改进。参见 [CHANGELOG](CHANGELOG.md)。

---

## 内容

- [演示](#演示)
- [你得到什么](#你得到什么)
- [安装](#安装)
- [先决条件](#先决条件)
- [快速启动](#快速启动)
- [命令](#命令)
- [设置](#设置)
- [对于代理建设者](#对于代理建设者)
- [它是如何运作的](#它是如何工作的高级)
- [账户安全](#账户安全)
- [故障排除](#故障排除)
- [常问问题](#常问问题)
- [国际化和可访问性](#国际化和可访问性)
- [贡献](#贡献)
- [API参考](#应用程序编程接口)
- [MCP 服务器参考](#mcp服务器)

---

您正在运行 Antigravity 会话，需要离开办公桌。 AI是中期的。您想要通过手机监控它、重定向它、上传文件或只是读取它所写的内容，而无需返回计算机。

Antigravity Link 使这成为可能。扫描 QR 代码，您的手机将成为活动聊天的实时镜像：在流式传输时读取响应、发送消息、停止生成、上传文件、通过语音指令以及在多个 Antigravity 窗口之间切换 - 所有这些都通过本地网络上的移动浏览器进行。

对于自动化，该扩展还公开本地 HTTP API 和 MCP 服务器，以便代理和外部工具可以以编程方式驱动 Antigravity 会话。

## 演示

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

<details>
<summary>截图</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

</details>

## 你得到什么

- 活动 Antigravity 聊天的实时镜像 - 从您的手机上阅读和交互。
- 文件上传到活动的 Antigravity 聊天中。
- 从移动设备进行语音到文本输入（麦克风权限需要 HTTPS）。
- 使用专用停止芯片停止手机生成。
- 多个 Antigravity 窗口的活动实例切换。
- 用于自动化和集成的本地 HTTP API（请参阅 [API](#api)）。
- 用于AI助手集成的MCP服务器（参见[MCP server](#mcp-server)）。
- 具有令牌身份验证的仅限本地服务器。
- 界面提供 16 种语言，具有自动检测和 Z​​XQPH0XZ 支持。

## 安装

从 Antigravity 扩展市场安装 - 搜索 **Antigravity Link** - 或 [install directly from Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)。

## 先决条件

- **Antigravity IDE** 已安装并正在运行。
- **手机和电脑处于同一 Wi-Fi 网络。**
- **Antigravity 使用远程调试标志启动。** 这是扩展发现并连接到您的会话所必需的。请参阅下面快速启动中的启动命令。

## 快速启动

1) 在启用远程调试的情况下启动 Antigravity。这是必需的；扩展无法发现没有此标志启动的会话。

**Windows**（开始菜单快捷方式）：
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

**苹果系统：**
```bash
open -a Antigravity --args --remote-debugging-port=9000
```

**Linux：**
```bash
antigravity --remote-debugging-port=9000
```

支持多个 Antigravity 会话，但每个窗口都必须使用此命令启动。

2) 在 VS Code 中，运行：
`Antigravity Link: Start Server`

3) 然后运行：
`Antigravity Link: Show QR Code`

4) 用手机扫描QR码。您的移动用户界面已准备就绪。

5) 您的手机可能会警告连接不安全，因为证书是自签名的。这对于本地 HTTPS 来说是预期的。使用浏览器的“高级”或类似选项继续（Safari/Chrome/Firefox 之间的措辞有所不同）。

## 命令

| 命令 | 描述 |
| --- | --- |
| Antigravity Link: Start Server | 启动本地桥接服务器。 |
| Antigravity Link: Stop Server | 停止服务器。 |
| Antigravity Link: Show QR Code | 显示连接 QR 代码。 |
| Antigravity Link: Select Network Interface | 选择 QR URL 通告的网络接口。 |

## 设置

| 环境 | 默认 | 描述 |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | 本地桥接服务器的端口。 |
| `antigravityLink.autoStart` | `false` | 在 VS Code 启动时启动服务器。 |
| `antigravityLink.useHttps` | `true` | 通过 HTTPS 进行麦克风访问。 |
| `antigravityLink.preferredHost` | `""` | 在 QR URL 中通告的可选 LAN IPv4（示例：`192.168.1.101`）。 |
| `antigravityLink.strictWorkbenchOnly` | `true` | 仅结合 `workbench.html` CDP 靶标以确保稳定性。 |
| `antigravityLink.includeFallbackTargets` | `false` | 禁用严格模式时允许使用水上摩托艇/启动板后备目标。 |

## 对于代理建设者

如果您想快速集成，请使用以下顺序：

1) 启动扩展服务器并从 QR URL (`?token=...`) 复制令牌。
2) 使用 MCP 工具 (`mcp-server.mjs`) 或针对 `https://localhost:3000` 的直接 HTTP 调用。
3) 使用 `/snapshot`、`/send` 和 `/stop` 验证控制流。

开放API示例：

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

MCP客户端配置示例：

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

将 `<extension-dir>` 替换为已安装扩展的路径：
- **Windows：** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux：** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

## 它是如何工作的（高级）

- 该扩展启动本地服务器（HTTP 或 HTTPS）。
- 它通过 Chrome DevTools 协议 (CDP) 发现 Antigravity 目标。
- 您的手机连接到移动 UI 并发送上传/命令请求。
- 该扩展程序会注入选定的聊天目标并将文件保存到 `uploads/`。

## 账户安全

Antigravity Link 没有已知的禁令案例，并且旨在保持这种状态。

该扩展通过连接到 Antigravity 在您自己的计算机上公开的调试端口来工作 - VS Code 的内置调试器和浏览器开发工具使用相同的 Chrome DevTools 协议。它读取您的本地 UI 并模拟按键和点击，就像您坐在键盘前一样。

这在实践中意味着什么：
- **除了 Antigravity 已发送的请求之外，不会向 Google 服务器发出任何请求。该分机无法访问 LAN 之外的网络。
- **没有任何内容注入到 Antigravity 的网络流量中。** 该扩展程序会读取您的屏幕并在编辑器中输入内容 - 它不会拦截或修改 API 调用。
- **没有修改 Antigravity 文件。** 没有补丁、挂钩或二进制修改。
- **服务器完全在您的计算机上运行。** 您的提示、聊天历史记录和文件永远不会离开您的本地网络，除非您明确地将服务器暴露在外部。
- **此扩展不会将任何数据发送到第三方服务**。

源代码已获得 MIT 许可且完全可审核：https://github.com/cafeTechne/antigravity-link-extension

## 故障排除

- **未找到实例**：确保每个 Antigravity 窗口都是使用上面显示的 `--remote-debugging-port` 命令启动的。
- **无法从手机连接**：确保您的手机和计算机位于同一网络。
- **上传保存但不出现在聊天中**：切换到移动用户界面中正确的活动实例。
- **卡在“正在初始化...”**：服务器可访问，但聊天界面尚未捕获。等待几秒钟，让 CDP 连接初始化。

## 常问问题

**这适用于 iOS 和 Android 吗？**
是的。移动 UI 可以在任何现代移动浏览器中运行 - iOS 上的 Safari、Android 上的 Chrome 以及其他浏览器都可以运行。

**这可以通过蜂窝网络或 VPN 运行吗？**
默认情况下并非如此 — 服务器仅适用于 LAN。对于远程访问，您需要通过 ngrok 等隧道公开它。无论如何，令牌身份验证和 HTTPS 仍然保留。

**自签名证书警告是否可以安全接受？**
是的。该证书是在服务器启动时在您的计算机上本地生成的。出现警告是因为它不是由公共证书颁发机构颁发的，而不是因为连接不安全。

**我可以用它来实现自动化吗？**
是的。本地 HTTP API 和 MCP 服务器正是为此而设计的。请参阅 [API](#api) 和 [MCP server](#mcp-server) 部分。

## 国际化和可访问性

移动界面会自动检测您的浏览器语言并呈现为：

英语 · 日本语 · 中文（简体） · 中文（繁体） · 한국어 · 德语 · 法语 · 西班牙语 · 葡萄牙语 · Русский · 意大利语 · 波兰语 · 土耳其语 · Tiếng Việt · 印尼语 · 巴哈萨语

阿拉伯语会自动从右到左呈现。语言检测使用 `navigator.language`，无需配置。

该界面采用语义 HTML、ARIA 角色、用于连接状态的 `aria-live` 区域、键盘导航和屏幕阅读器兼容标签构建。

## 贡献

欢迎请求请求。在开始重大更改之前，请检查代码库中的 TODO 或打开 GitHub 问题来讨论想法。
有关设置和 PR 说明，请参阅 `CONTRIBUTING.md`。

---

## 应用程序编程接口

该扩展在 `https://localhost:3000`（或您配置的端口）公开本地 HTTP API。除 `/ping` 之外的所有端点都需要 `Authorization: Bearer <token>` 标头。令牌是QR代码URL中`?token=`后面的值。

| 方法 | 端点 | 描述 |
| --- | --- | --- |
| 得到 | `/ping` | 健康检查 — 返回 `pong`。无需授权。 |
| 得到 | `/snapshot` | 当前聊天界面：HTML、CSS、模式/模型、`isGenerating`。 |
| 得到 | `/instances` | 列出活动的 Antigravity 窗口。 |
| 邮政 | `/instance` | 切换活动窗口。机身：`{ "targetId": "..." }` |
| 邮政 | `/send` | 发送消息。机身：`{ "message": "..." }` |
| 邮政 | `/click` | 单击 UI 元素。机身：`{ "selector"?, "text"?, "x"?, "y"? }` |
| 邮政 | `/stop` | 停止人工智能的产生。 |
| 邮政 | `/upload` | 上传文件（multipart/form-data，字段名称 `file`）。 |
| 得到 | `/task` | 阅读当前任务文档。 |
| 得到 | `/walkthrough` | 阅读当前的演练文档。 |
| 得到 | `/plan` | 阅读当前的实施计划。 |

完整架构：[`openapi.yaml`](openapi.yaml)

## MCP服务器

Antigravity Link 附带 MCP（模型上下文协议）服务器，可让 AI 助手直接驱动您的 Antigravity 会话。

**设置**

将以下内容添加到您的 MCP 客户端配置（例如 `claude_desktop_config.json`）：

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

将 `<extension-dir>` 替换为已安装扩展的路径：
- **Windows：** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux：** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

令牌是QR代码URL中`?token=`后面的值。在 MCP 客户端连接之前，扩展服务器必须正在运行。

**可用工具**

| 工具 | 描述 |
| --- | --- |
| `get_snapshot` | 获取当前聊天状态、模式、模型和生成状态。 |
| `send_message` | 向活动聊天发送消息。 |
| `stop_generation` | 取消主动 AI 生成。 |
| `get_instances` | 列出可用的 Antigravity 窗口。 |
| `switch_instance` | 切换到不同的 Antigravity 窗口。 |
| `click_element` | 通过选择器、文本或坐标单击 UI 元素。 |
| `get_task` | 阅读当前任务文档。 |
| `get_walkthrough` | 阅读当前的演练文档。 |
| `get_plan` | 阅读当前的实施计划。 |

## 独立资产与工作区资产

这个扩展是独立的。它附带了自己的 `public/` 资源和 `uploads/` 文件夹，并且不需要父 `npm run dev` 构建。

如果您的*工作空间*包含 `public/` 或 `uploads/`，则扩展将自动首选这些路径。这使得自定义移动 UI 或将上传内容保留在项目根目录中变得很容易，但这也意味着工作区之间的行为可能有所不同。

---

## 明星历史

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## 致谢

受到早期社区项目的启发，包括：
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat
