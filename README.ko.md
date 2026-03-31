# Antigravity Link (VS Code 확장)

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**다른 언어로 읽기:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

---

GitHub 저장소: https://github.com/cafeTechne/antigravity-link-extension

Open VSX: https://open-vsx.org/extension/cafetechne/antigravity-link-extension

Antigravity 세션을 스마트폰으로 가져오세요. 모바일 친화적인 인터페이스에서 파일 업로드, 음성 프롬프트 입력, 생성 중지, 여러 활성 Antigravity 채팅 관리 등을 할 수 있으며, MCP 또는 로컬 HTTP API를 통해 자동화도 가능합니다.

## 대상 사용자

- Google Antigravity IDE를 위한 간단하고 안전한 모바일 동반 앱을 원하는 팀.
- 이동 중에 빠른 파일 업로드와 음성 입력을 원하는 파워 유저.
- API 또는 MCP를 통해 Antigravity 세션을 자동화하거나 통합하려는 개발자.
- 실행 중인 Antigravity 세션과 별도 설정 없이 상호작용하려는 초보 개발자.

## 제공 기능

- 활성 Antigravity 채팅의 실시간 미러 — 스마트폰에서 읽고 조작 가능.
- 활성 Antigravity 채팅에 파일 업로드.
- 모바일에서 음성 텍스트 입력 (마이크 사용을 위해 HTTPS 필요).
- 전용 중지 버튼으로 스마트폰에서 생성 중지.
- 여러 Antigravity 창의 활성 인스턴스 전환.
- 자동화 및 통합을 위한 로컬 HTTP API.
- AI 어시스턴트 통합을 위한 MCP 서버.
- 토큰 인증이 적용된 로컬 전용 서버.
- 자동 감지 및 RTL 지원이 포함된 16개 언어 인터페이스.

## 빠른 시작

1) 원격 디버깅을 활성화하여 Antigravity를 시작합니다. 이는 필수 사항으로, 이 플래그 없이 시작된 세션은 확장에서 검색할 수 없습니다.

예시 (Windows):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

2) VS Code에서 실행: `Antigravity Link: Start Server`

3) 그런 다음 실행: `Antigravity Link: Show QR Code`

4) 스마트폰으로 QR 코드를 스캔합니다. 모바일 UI가 준비됩니다.

5) 인증서가 자체 서명된 것이므로 스마트폰이 연결이 안전하지 않다고 경고할 수 있습니다. 이는 로컬 HTTPS에서 예상되는 동작입니다. 브라우저의 "고급" 옵션을 사용하여 계속 진행하세요.

## 명령어

| 명령어 | 설명 |
| --- | --- |
| Antigravity Link: Start Server | 로컬 브리지 서버를 시작합니다. |
| Antigravity Link: Stop Server | 서버를 중지합니다. |
| Antigravity Link: Show QR Code | 연결 QR 코드를 표시합니다. |
| Antigravity Link: Select Network Interface | QR URL이 알리는 네트워크 인터페이스를 선택합니다. |

## API

확장은 `https://localhost:3000`에 로컬 HTTP API를 제공합니다. `/ping`을 제외한 모든 엔드포인트에는 `Authorization: Bearer <token>` 헤더가 필요합니다.

| 메서드 | 엔드포인트 | 설명 |
| --- | --- | --- |
| GET | `/ping` | 상태 확인. 인증 불필요. |
| GET | `/snapshot` | 현재 채팅 화면: HTML, CSS, 모드/모델, isGenerating. |
| GET | `/instances` | 활성 Antigravity 창 목록. |
| POST | `/instance` | 활성 창 전환. 본문: `{ "targetId": "..." }` |
| POST | `/send` | 메시지 전송. 본문: `{ "message": "..." }` |
| POST | `/click` | UI 요소 클릭. 본문: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | AI 생성 중지. |
| POST | `/upload` | 파일 업로드 (multipart/form-data). |
| GET | `/task` | 현재 작업 문서 읽기. |
| GET | `/walkthrough` | 현재 안내 문서 읽기. |
| GET | `/plan` | 현재 구현 계획 읽기. |

전체 스키마: [`openapi.yaml`](openapi.yaml)

## MCP 서버

MCP 클라이언트 설정에 추가하세요:

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

사용 가능한 도구: `get_snapshot`, `send_message`, `stop_generation`, `get_instances`, `switch_instance`, `click_element`, `get_task`, `get_walkthrough`, `get_plan`

## 보안 및 개인정보

- 서버는 로컬에서 실행되며 토큰으로 인증됩니다.
- 모바일에서 마이크 접근을 허용하기 위해 HTTPS가 기본으로 활성화되어 있습니다.
- 이 확장은 제3자 서비스로 데이터를 전송하지 않습니다.

## 문제 해결

- **인스턴스를 찾을 수 없음**: 모든 Antigravity 창이 `--remote-debugging-port`로 시작되었는지 확인하세요.
- **모바일에서 연결 불가**: 스마트폰과 컴퓨터가 같은 네트워크에 있는지 확인하세요.
- **"초기화 중…"에서 멈춤**: CDP 연결이 초기화될 때까지 몇 초 기다리세요.

## 국제화 및 접근성

모바일 인터페이스는 브라우저 언어를 자동으로 감지하여 다음 언어로 렌더링합니다:
English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

아랍어는 오른쪽에서 왼쪽으로 렌더링됩니다. 언어 감지는 설정 없이 `navigator.language`를 사용합니다.

## 기여

Pull Request를 환영하며 적극적으로 기여자를 찾고 있습니다.
설정 및 PR 안내는 `CONTRIBUTING.md`를 참조하세요.

## 라이선스

MIT. `LICENSE`를 참조하세요.
