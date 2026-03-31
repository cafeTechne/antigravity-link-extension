# Antigravity Link (Tiện ích mở rộng VS Code)

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Đọc bằng ngôn ngữ của bạn:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

---

Kho GitHub: https://github.com/cafeTechne/antigravity-link-extension

Open VSX: https://open-vsx.org/extension/cafetechne/antigravity-link-extension

Mang các phiên làm việc Antigravity của bạn lên điện thoại. Tải lên tệp, đọc lệnh bằng giọng nói, dừng quá trình tạo nội dung và điều khiển nhiều cuộc trò chuyện Antigravity đang hoạt động qua giao diện thân thiện với di động — hoặc tự động hóa chúng thông qua MCP hoặc HTTP API cục bộ.

## Dành cho ai

- Các nhóm muốn có một công cụ di động đơn giản, bảo mật cho Antigravity IDE của Google.
- Người dùng thành thạo muốn tải tệp nhanh và nhập liệu bằng giọng nói khi di chuyển.
- Lập trình viên muốn tự động hóa hoặc tích hợp phiên Antigravity qua API hoặc MCP.
- Lập trình viên mới muốn tương tác với phiên Antigravity đang chạy mà không cần cấu hình gì.

## Những gì bạn nhận được

- Gương trực tiếp của cuộc trò chuyện Antigravity đang hoạt động — đọc và tương tác từ điện thoại.
- Tải tệp vào cuộc trò chuyện Antigravity đang hoạt động.
- Nhập liệu bằng giọng nói từ di động (yêu cầu HTTPS cho quyền truy cập microphone).
- Dừng quá trình tạo nội dung từ điện thoại bằng nút dừng chuyên dụng.
- Chuyển đổi giữa các phiên bản đang hoạt động khi có nhiều cửa sổ Antigravity.
- HTTP API cục bộ để tự động hóa và tích hợp.
- Máy chủ MCP để tích hợp trợ lý AI.
- Máy chủ chỉ chạy cục bộ với xác thực bằng token.
- Giao diện hỗ trợ 16 ngôn ngữ với tự động nhận diện và hỗ trợ RTL.

## Bắt đầu nhanh

1) Khởi động Antigravity với tính năng gỡ lỗi từ xa được bật. Đây là điều bắt buộc; các phiên khởi động mà không có cờ này sẽ không được tiện ích phát hiện.

Ví dụ (Windows):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

2) Trong VS Code, chạy: `Antigravity Link: Start Server`

3) Sau đó chạy: `Antigravity Link: Show QR Code`

4) Quét mã QR bằng điện thoại. Giao diện di động đã sẵn sàng.

5) Điện thoại có thể cảnh báo rằng kết nối không an toàn vì chứng chỉ tự ký. Đây là điều bình thường với HTTPS cục bộ. Dùng tùy chọn «Nâng cao» trong trình duyệt để tiếp tục.

## Lệnh

| Lệnh | Mô tả |
| --- | --- |
| Antigravity Link: Start Server | Khởi động máy chủ cầu nối cục bộ. |
| Antigravity Link: Stop Server | Dừng máy chủ. |
| Antigravity Link: Show QR Code | Hiển thị mã QR kết nối. |
| Antigravity Link: Select Network Interface | Chọn giao diện mạng được quảng bá trong URL QR. |

## API

Tiện ích cung cấp HTTP API cục bộ tại `https://localhost:3000`. Tất cả các endpoint trừ `/ping` đều yêu cầu header `Authorization: Bearer <token>`.

| Phương thức | Endpoint | Mô tả |
| --- | --- | --- |
| GET | `/ping` | Kiểm tra sức khỏe. Không cần xác thực. |
| GET | `/snapshot` | Giao diện trò chuyện hiện tại: HTML, CSS, chế độ/mô hình, isGenerating. |
| GET | `/instances` | Liệt kê các cửa sổ Antigravity đang hoạt động. |
| POST | `/instance` | Chuyển cửa sổ đang hoạt động. Body: `{ "targetId": "..." }` |
| POST | `/send` | Gửi tin nhắn. Body: `{ "message": "..." }` |
| POST | `/click` | Nhấp vào phần tử giao diện. Body: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | Dừng quá trình tạo nội dung AI. |
| POST | `/upload` | Tải lên tệp (multipart/form-data). |
| GET | `/task` | Đọc tài liệu nhiệm vụ hiện tại. |
| GET | `/walkthrough` | Đọc tài liệu hướng dẫn từng bước hiện tại. |
| GET | `/plan` | Đọc kế hoạch triển khai hiện tại. |

Schema đầy đủ: [`openapi.yaml`](openapi.yaml)

## Máy chủ MCP

Thêm vào cấu hình client MCP của bạn:

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

Các công cụ có sẵn: `get_snapshot`, `send_message`, `stop_generation`, `get_instances`, `switch_instance`, `click_element`, `get_task`, `get_walkthrough`, `get_plan`

## Bảo mật và quyền riêng tư

- Máy chủ chạy cục bộ và được xác thực bằng token.
- HTTPS được bật theo mặc định để cho phép truy cập microphone trên thiết bị di động.
- Tiện ích này không gửi dữ liệu đến bất kỳ dịch vụ bên thứ ba nào.

## Khắc phục sự cố

- **Không tìm thấy phiên bản nào**: đảm bảo mọi cửa sổ Antigravity được khởi động với `--remote-debugging-port`.
- **Không thể kết nối từ điện thoại**: kiểm tra xem điện thoại và máy tính có cùng mạng không.
- **Bị kẹt ở "Đang khởi tạo…"**: đợi vài giây để kết nối CDP được khởi tạo.

## Quốc tế hóa và khả năng tiếp cận

Giao diện di động tự động nhận diện ngôn ngữ trình duyệt và hiển thị bằng:
English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

Tiếng Ả Rập được hiển thị từ phải sang trái. Tính năng nhận diện ngôn ngữ sử dụng `navigator.language` mà không cần cấu hình.

## Đóng góp

Chúng tôi chấp nhận pull request và đang tích cực tìm kiếm người đóng góp.
Xem `CONTRIBUTING.md` để biết hướng dẫn thiết lập và ghi chú về PR.

## Giấy phép

MIT. Xem `LICENSE`.
