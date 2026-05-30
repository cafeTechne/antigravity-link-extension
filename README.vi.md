# Antigravity Link (Tiện ích mở rộng VS Code)

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Đọc bằng ngôn ngữ của bạn:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **Điểm mới trong v1.0.13** — Dừng quá trình tạo nội dung từ thiết bị di động, máy chủ MCP + thông số OpenAPI, giao diện 15 ngôn ngữ, cải tiến tải tệp lên. Xem [CHANGELOG](CHANGELOG.md).

---

## Mục lục

- [Demo](#demo)
- [Những gì bạn nhận được](#những-gì-bạn-nhận-được)
- [Cài đặt](#cài-đặt)
- [Yêu cầu tiên quyết](#yêu-cầu-tiên-quyết)
- [Bắt đầu nhanh](#bắt-đầu-nhanh)
- [Lệnh](#lệnh)
- [Cài đặt tùy chỉnh](#cài-đặt-tùy-chỉnh)
- [Dành cho người xây dựng tác nhân](#dành-cho-người-xây-dựng-tác-nhân)
- [Cách hoạt động](#cách-hoạt-động-tổng-quan)
- [An toàn tài khoản](#an-toàn-tài-khoản)
- [Khắc phục sự cố](#khắc-phục-sự-cố)
- [Câu hỏi thường gặp](#câu-hỏi-thường-gặp)
- [Quốc tế hóa và khả năng tiếp cận](#quốc-tế-hóa-và-khả-năng-tiếp-cận)
- [Đóng góp](#đóng-góp)
- [Tham khảo API](#api)
- [Tham khảo máy chủ MCP](#máy-chủ-mcp)

---

Bạn đang chạy một phiên Antigravity và cần rời khỏi bàn làm việc. AI đang giữa chừng quá trình tạo nội dung. Bạn muốn theo dõi nó, điều hướng lại, tải tệp lên, hoặc chỉ đọc những gì nó đã viết — từ điện thoại của bạn, mà không cần quay lại máy tính.

Antigravity Link giúp điều đó trở nên khả thi. Quét mã QR và điện thoại của bạn trở thành gương trực tiếp của cuộc trò chuyện đang hoạt động: đọc các phản hồi khi chúng được phát trực tiếp, gửi tin nhắn, dừng quá trình tạo nội dung, tải tệp lên, đọc bằng giọng nói, và chuyển đổi giữa nhiều cửa sổ Antigravity — tất cả từ trình duyệt di động, trên mạng nội bộ của bạn.

Để tự động hóa, tiện ích cũng cung cấp một HTTP API cục bộ và máy chủ MCP để các tác nhân và công cụ bên ngoài có thể điều khiển các phiên Antigravity theo chương trình.

## Demo

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

<details>
<summary>Ảnh chụp màn hình</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

</details>

## Những gì bạn nhận được

- Gương trực tiếp của cuộc trò chuyện Antigravity đang hoạt động — đọc và tương tác từ điện thoại.
- Tải tệp vào cuộc trò chuyện Antigravity đang hoạt động.
- Nhập liệu bằng giọng nói từ di động (yêu cầu HTTPS cho quyền truy cập microphone).
- Dừng quá trình tạo nội dung từ điện thoại bằng nút dừng chuyên dụng.
- Chuyển đổi phiên bản đang hoạt động khi có nhiều cửa sổ Antigravity.
- HTTP API cục bộ để tự động hóa và tích hợp (xem [API](#api)).
- Máy chủ MCP để tích hợp trợ lý AI (xem [Máy chủ MCP](#máy-chủ-mcp)).
- Máy chủ chỉ chạy cục bộ với xác thực bằng token.
- Giao diện hỗ trợ 16 ngôn ngữ với tự động nhận diện và hỗ trợ RTL.

## Cài đặt

Cài từ chợ tiện ích mở rộng Antigravity — tìm kiếm **Antigravity Link** — hoặc [cài trực tiếp từ Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension).

## Yêu cầu tiên quyết

- **Antigravity IDE** đã được cài đặt và đang chạy.
- **Điện thoại và máy tính kết nối cùng một mạng Wi-Fi.**
- **Antigravity được khởi động với cờ gỡ lỗi từ xa.** Đây là yêu cầu bắt buộc để tiện ích có thể khám phá và kết nối với phiên làm việc của bạn. Xem lệnh khởi động trong phần Bắt đầu nhanh bên dưới.

## Bắt đầu nhanh

1) Khởi động Antigravity với tính năng gỡ lỗi từ xa được bật. Đây là điều bắt buộc; các phiên khởi động mà không có cờ này sẽ không được tiện ích phát hiện.

**Windows** (phím tắt Start Menu):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

**macOS:**
```bash
open -a Antigravity --args --remote-debugging-port=9000
```

**Linux:**
```bash
antigravity --remote-debugging-port=9000
```

Nhiều phiên Antigravity được hỗ trợ, nhưng mỗi cửa sổ phải được khởi động bằng lệnh này.

2) Trong VS Code, chạy:
`Antigravity Link: Start Server`

3) Sau đó chạy:
`Antigravity Link: Show QR Code`

4) Quét mã QR bằng điện thoại. Giao diện di động đã sẵn sàng.

5) Điện thoại có thể cảnh báo rằng kết nối không an toàn vì chứng chỉ tự ký. Đây là điều bình thường với HTTPS cục bộ. Dùng tùy chọn «Nâng cao» hoặc tương tự trong trình duyệt để tiếp tục (cách diễn đạt khác nhau giữa Safari/Chrome/Firefox).

## Lệnh

| Lệnh | Mô tả |
| --- | --- |
| Antigravity Link: Start Server | Khởi động máy chủ cầu nối cục bộ. |
| Antigravity Link: Stop Server | Dừng máy chủ. |
| Antigravity Link: Show QR Code | Hiển thị mã QR kết nối. |
| Antigravity Link: Select Network Interface | Chọn giao diện mạng được quảng bá trong URL QR. |

## Cài đặt tùy chỉnh

| Cài đặt | Mặc định | Mô tả |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | Cổng cho máy chủ cầu nối cục bộ. |
| `antigravityLink.autoStart` | `false` | Tự động khởi động máy chủ khi VS Code mở. |
| `antigravityLink.useHttps` | `true` | Phục vụ qua HTTPS để cho phép truy cập microphone. |
| `antigravityLink.preferredHost` | `""` | IPv4 LAN tùy chọn để quảng bá trong URL QR (ví dụ: `192.168.1.101`). |
| `antigravityLink.strictWorkbenchOnly` | `true` | Chỉ liên kết với các mục tiêu CDP `workbench.html` để đảm bảo ổn định. |
| `antigravityLink.includeFallbackTargets` | `false` | Cho phép các mục tiêu dự phòng jetski/launchpad khi chế độ nghiêm ngặt bị tắt. |

## Dành cho người xây dựng tác nhân

Nếu bạn muốn tích hợp nhanh, hãy dùng trình tự này:

1) Khởi động máy chủ tiện ích và sao chép token từ URL QR (`?token=...`).
2) Dùng công cụ MCP (`mcp-server.mjs`) hoặc gọi HTTP trực tiếp tới `https://localhost:3000`.
3) Xác nhận luồng điều khiển với `/snapshot`, `/send`, và `/stop`.

Ví dụ OpenAPI:

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

Ví dụ cấu hình client MCP:

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

Thay `<extension-dir>` bằng đường dẫn đến tiện ích đã cài đặt:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

## Cách hoạt động (tổng quan)

- Tiện ích khởi động một máy chủ cục bộ (HTTP hoặc HTTPS).
- Nó khám phá các mục tiêu Antigravity thông qua Chrome DevTools Protocol (CDP).
- Điện thoại của bạn kết nối với giao diện di động và gửi yêu cầu tải lên/lệnh.
- Tiện ích tiêm vào mục tiêu trò chuyện đã chọn và lưu tệp vào `uploads/`.

## An toàn tài khoản

Antigravity Link không có trường hợp cấm tài khoản nào được biết đến và được thiết kế để duy trì như vậy.

Tiện ích hoạt động bằng cách kết nối với cổng gỡ lỗi mà Antigravity mở ra trên máy của bạn — cùng Chrome DevTools Protocol được VS Code's debugger tích hợp sẵn và browser devtools sử dụng. Nó đọc giao diện cục bộ của bạn và mô phỏng các lần nhấn phím và nhấp chuột, chính xác như thể bạn đang ngồi tại bàn phím.

Điều này có nghĩa là trong thực tế:
- **Không có yêu cầu nào được gửi đến máy chủ của Google** ngoài những gì Antigravity đã gửi. Tiện ích không có quyền truy cập mạng bên ngoài mạng LAN của bạn.
- **Không có gì được tiêm vào lưu lượng mạng của Antigravity.** Tiện ích đọc màn hình của bạn và gõ vào trình soạn thảo — nó không chặn hoặc sửa đổi các cuộc gọi API.
- **Không có tệp Antigravity nào bị sửa đổi.** Không có bản vá, hook, hay sửa đổi nhị phân.
- **Máy chủ chạy hoàn toàn trên máy của bạn.** Các prompt, lịch sử trò chuyện và tệp của bạn không bao giờ rời khỏi mạng nội bộ trừ khi bạn chủ động mở máy chủ ra bên ngoài.
- **Không có dữ liệu nào được gửi đến dịch vụ bên thứ ba** bởi tiện ích này.

Mã nguồn được cấp phép MIT và hoàn toàn có thể kiểm tra: https://github.com/cafeTechne/antigravity-link-extension

## Khắc phục sự cố

- **Không tìm thấy phiên bản nào**: Đảm bảo mọi cửa sổ Antigravity được khởi động với lệnh `--remote-debugging-port` được hiển thị ở trên.
- **Không thể kết nối từ điện thoại**: Đảm bảo điện thoại và máy tính đang ở trên cùng một mạng.
- **Tải lên được lưu nhưng không xuất hiện trong trò chuyện**: Chuyển sang Active Instance đúng trong giao diện di động.
- **Bị kẹt ở "Đang khởi tạo…"**: Máy chủ đã kết nối được nhưng bề mặt trò chuyện chưa được chụp. Đợi vài giây để kết nối CDP được khởi tạo.

## Câu hỏi thường gặp

**Có hoạt động trên iOS và Android không?**
Có. Giao diện di động chạy trong bất kỳ trình duyệt di động hiện đại nào — Safari trên iOS, Chrome trên Android và các trình duyệt khác đều hoạt động.

**Có hoạt động qua mạng di động hoặc VPN không?**
Không theo mặc định — máy chủ chỉ dành cho mạng LAN. Để truy cập từ xa, bạn cần mở nó qua một đường hầm như ngrok. Xác thực token và HTTPS vẫn có hiệu lực bất kể điều kiện nào.

**Việc chấp nhận cảnh báo về chứng chỉ tự ký có an toàn không?**
Có. Chứng chỉ được tạo cục bộ trên máy của bạn khi khởi động máy chủ. Cảnh báo xuất hiện vì nó không được cấp bởi cơ quan cấp chứng chỉ công cộng, không phải vì kết nối không an toàn.

**Tôi có thể dùng cái này để tự động hóa không?**
Có. HTTP API cục bộ và máy chủ MCP được thiết kế chính xác cho điều này. Xem phần [API](#api) và [Máy chủ MCP](#máy-chủ-mcp).

## Quốc tế hóa và khả năng tiếp cận

Giao diện di động tự động nhận diện ngôn ngữ trình duyệt và hiển thị bằng:

English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

Tiếng Ả Rập được hiển thị từ phải sang trái tự động. Tính năng nhận diện ngôn ngữ sử dụng `navigator.language` mà không cần cấu hình.

Giao diện được xây dựng với HTML ngữ nghĩa, vai trò ARIA, vùng `aria-live` cho trạng thái kết nối, điều hướng bằng bàn phím, và nhãn tương thích với trình đọc màn hình xuyên suốt.

## Đóng góp

Chúng tôi chấp nhận pull request. Kiểm tra các TODO trong codebase hoặc mở một GitHub issue để thảo luận về ý tưởng trước khi bắt đầu các thay đổi lớn.
Xem `CONTRIBUTING.md` để biết hướng dẫn thiết lập và ghi chú về PR.

## Giấy phép

MIT. Xem `LICENSE`.

---

## API

Tiện ích cung cấp HTTP API cục bộ tại `https://localhost:3000` (hoặc cổng bạn đã cấu hình). Tất cả các endpoint trừ `/ping` đều yêu cầu header `Authorization: Bearer <token>`. Token là giá trị sau `?token=` trong URL mã QR.

| Phương thức | Endpoint | Mô tả |
| --- | --- | --- |
| GET | `/ping` | Kiểm tra sức khỏe — trả về `pong`. Không cần xác thực. |
| GET | `/snapshot` | Bề mặt trò chuyện hiện tại: HTML, CSS, chế độ/mô hình, `isGenerating`. |
| GET | `/instances` | Liệt kê các cửa sổ Antigravity đang hoạt động. |
| POST | `/instance` | Chuyển cửa sổ đang hoạt động. Body: `{ "targetId": "..." }` |
| POST | `/send` | Gửi tin nhắn. Body: `{ "message": "..." }` |
| POST | `/click` | Nhấp vào phần tử giao diện. Body: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | Dừng quá trình tạo nội dung AI. |
| POST | `/upload` | Tải lên tệp (multipart/form-data, tên trường `file`). |
| GET | `/task` | Đọc tài liệu nhiệm vụ hiện tại. |
| GET | `/walkthrough` | Đọc tài liệu hướng dẫn từng bước hiện tại. |
| GET | `/plan` | Đọc kế hoạch triển khai hiện tại. |

Schema đầy đủ: [`openapi.yaml`](openapi.yaml)

## Máy chủ MCP

Antigravity Link đi kèm với máy chủ MCP (Model Context Protocol) cho phép các trợ lý AI điều khiển phiên Antigravity của bạn trực tiếp.

**Thiết lập**

Thêm nội dung sau vào cấu hình client MCP của bạn (ví dụ: `claude_desktop_config.json`):

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

Thay `<extension-dir>` bằng đường dẫn đến tiện ích đã cài đặt:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

Token là giá trị sau `?token=` trong URL mã QR. Máy chủ tiện ích phải đang chạy trước khi client MCP kết nối.

**Các công cụ có sẵn**

| Công cụ | Mô tả |
| --- | --- |
| `get_snapshot` | Lấy trạng thái trò chuyện hiện tại, chế độ, mô hình và trạng thái tạo nội dung. |
| `send_message` | Gửi tin nhắn đến cuộc trò chuyện đang hoạt động. |
| `stop_generation` | Hủy quá trình tạo nội dung AI đang hoạt động. |
| `get_instances` | Liệt kê các cửa sổ Antigravity có sẵn. |
| `switch_instance` | Chuyển sang cửa sổ Antigravity khác. |
| `click_element` | Nhấp vào phần tử giao diện theo selector, văn bản hoặc tọa độ. |
| `get_task` | Đọc tài liệu nhiệm vụ hiện tại. |
| `get_walkthrough` | Đọc tài liệu hướng dẫn từng bước hiện tại. |
| `get_plan` | Đọc kế hoạch triển khai hiện tại. |

## Độc lập so với tài nguyên workspace

Tiện ích này hoàn toàn độc lập. Nó đi kèm với các tài nguyên `public/` và thư mục `uploads/` riêng và không yêu cầu bản dựng `npm run dev` của thư mục gốc.

Nếu *workspace* của bạn chứa `public/` hoặc `uploads/`, tiện ích sẽ ưu tiên các đường dẫn đó tự động. Điều này giúp dễ dàng tùy chỉnh giao diện di động hoặc giữ các tệp tải lên trong thư mục gốc dự án, nhưng cũng có nghĩa là hành vi có thể khác nhau giữa các workspace.

---

## Lịch sử sao

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## Lời cảm ơn

Lấy cảm hứng từ các dự án cộng đồng đầu tiên bao gồm:
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat
