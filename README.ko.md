
# Antigravity Link(VS Code 확장)

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**귀하의 언어로 읽어보세요:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **v1.0.13의 새로운 기능** — 모바일에서 생성 중지, MCP 서버 + OpenAPI 사양, 15개 언어 UI, 파일 업로드 개선. [CHANGELOG](CHANGELOG.md)를 참조하세요.

---

## 내용물

- [데모](#데모)
- [당신이 얻는 것](#당신이-얻는-것)
- [설치](#설치)
- [전제 조건](#전제-조건)
- [빠른 시작](#빠른-시작)
- [명령](#명령)
- [설정](#설정)
- [에이전트 빌더의 경우](#에이전트-빌더의-경우)
- [작동 원리](#작동-방식상위-수준)
- [계정 안전](#계정-안전)
- [문제 해결](#문제-해결)
- [FAQ](#faq)
- [국제화 및 접근성](#국제화-및-접근성)
- [기여](#기여)
- [API 참조](#api)
- [MCP 서버 참조](#mcp-서버)

---

Antigravity 세션을 실행 중이며 책상에서 물러나야 합니다. AI는 중세대다. 컴퓨터로 돌아오지 않고도 휴대폰에서 모니터링하고, 리디렉션하고, 파일을 업로드하고, 작성된 내용을 읽고 싶을 것입니다.

Antigravity Link가 이를 가능하게 합니다. QR 코드를 스캔하면 휴대폰이 활성 채팅의 라이브 미러가 됩니다. 스트리밍되는 응답을 읽고, 메시지를 보내고, 생성을 중지하고, 파일을 업로드하고, 음성으로 지시하고, 여러 Antigravity 창 간에 전환할 수 있습니다. 이 모든 작업이 로컬 네트워크의 모바일 브라우저에서 가능합니다.

자동화를 위해 확장 프로그램은 로컬 HTTP API와 MCP 서버도 노출하므로 에이전트와 외부 도구가 Antigravity 세션을 프로그래밍 방식으로 구동할 수 있습니다.

## 데모

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

<details>
<summary>스크린샷</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

</details>

## 당신이 얻는 것

- 활성 Antigravity 채팅의 라이브 미러 — 휴대폰에서 읽고 상호 작용하세요.
- 활성 Antigravity 채팅에 파일을 업로드합니다.
- 모바일에서 음성을 텍스트로 입력합니다(마이크 권한에 HTTPS 필요).
- 전용 중지 칩으로 휴대폰에서 생성을 중지하세요.
- 여러 Antigravity 창에 대한 활성 인스턴스 전환.
- 자동화 및 통합을 위한 로컬 HTTP API([API](#api) 참조)
- AI 보조 통합을 위한 MCP 서버([MCP server](#mcp-server) 참조)
- 토큰 인증을 갖춘 로컬 전용 서버입니다.
- 자동 감지 및 RTL 지원을 통해 16개 언어로 인터페이스를 사용할 수 있습니다.

## 설치

Antigravity 확장 마켓플레이스에서 설치하세요. **Antigravity Link** 또는 [install directly from Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)를 검색하세요.

## 전제 조건

- **Antigravity IDE**가 설치되어 실행 중입니다.
- **동일한 Wi-Fi 네트워크에 있는 휴대폰과 컴퓨터.**
- **Antigravity는 원격 디버깅 플래그로 시작되었습니다.** 이는 확장 프로그램이 세션을 검색하고 연결하는 데 필요합니다. 아래 빠른 시작의 시작 명령을 참조하세요.

## 빠른 시작

1) 원격 디버깅이 활성화된 상태에서 Antigravity를 시작합니다. 이는 필수입니다. 이 플래그 없이 시작된 세션은 확장 프로그램에서 검색할 수 없습니다.

**Windows**(시작 메뉴 바로가기):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

**맥OS:**
```bash
open -a Antigravity --args --remote-debugging-port=9000
```

**리눅스:**
```bash
antigravity --remote-debugging-port=9000
```

여러 Antigravity 세션이 지원되지만 모든 창은 이 명령으로 실행되어야 합니다.

2) VS Code에서 다음을 실행합니다.
`Antigravity Link: Start Server`

3) 그런 다음 다음을 실행하십시오.
`Antigravity Link: Show QR Code`

4) 휴대폰으로 QR 코드를 스캔하세요. 모바일 UI가 준비되었습니다.

5) 인증서가 자체 서명되어 있으므로 연결이 안전하지 않다는 경고가 전화기에 표시될 수 있습니다. 이는 로컬 HTTPS에서 예상됩니다. 계속 진행하려면 브라우저의 "고급" 또는 이와 유사한 옵션을 사용하십시오(Safari/Chrome/Firefox 간에 표현이 다름).

## 명령

| 명령 | 설명 |
| --- | --- |
| Antigravity Link: Start Server | 로컬 브릿지 서버를 시작합니다. |
| Antigravity Link: Stop Server | 서버를 중지합니다. |
| Antigravity Link: Show QR Code | 연결 QR 코드를 표시합니다. |
| Antigravity Link: Select Network Interface | QR URL이 광고하는 네트워크 인터페이스를 선택합니다. |

## 설정

| 환경 | 기본 | 설명 |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | 로컬 브리지 서버용 포트입니다. |
| `antigravityLink.autoStart` | `false` | VS Code 실행 시 서버를 시작합니다. |
| `antigravityLink.useHttps` | `true` | 마이크 액세스를 위해 HTTPS를 통해 제공하세요. |
| `antigravityLink.preferredHost` | `""` | QR URL(예: `192.168.1.101`)에서 광고할 선택적 LAN IPv4입니다. |
| `antigravityLink.strictWorkbenchOnly` | `true` | 안정성을 위해 `workbench.html` CDP 대상에만 바인딩하세요. |
| `antigravityLink.includeFallbackTargets` | `false` | 엄격 모드가 비활성화된 경우 jetski/launchpad 대체 대상을 허용합니다. |

## 에이전트 빌더의 경우

빠르게 통합하려면 다음 순서를 사용하세요.

1) 확장 서버를 시작하고 QR URL(`?token=...`)에서 토큰을 복사합니다.
2) MCP 도구(`mcp-server.mjs`)를 사용하거나 `https://localhost:3000`에 대한 직접 HTTP 호출을 사용하세요.
3) `/snapshot`, `/send` 및 `/stop`를 사용하여 제어 흐름을 검증합니다.

OpenAPI 예:

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

MCP 클라이언트 구성 예:

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

`<extension-dir>`를 설치된 확장 프로그램의 경로로 바꿉니다.
- **윈도우:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **맥OS/리눅스:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

## 작동 방식(상위 수준)

- 확장은 로컬 서버(HTTP 또는 HTTPS)를 시작합니다.
- Chrome DevTools 프로토콜(CDP)을 통해 Antigravity 대상을 검색합니다.
- 휴대폰이 모바일 UI에 연결되어 업로드/명령 요청을 보냅니다.
- 확장 프로그램은 선택한 채팅 대상에 삽입하고 파일을 `uploads/`에 저장합니다.

## 계정 안전

Antigravity Link에는 알려진 금지 사례가 없으며 그러한 상태를 유지하도록 설계되었습니다.

확장 프로그램은 Antigravity가 사용자의 컴퓨터에 노출하는 디버그 포트(VS Code의 내장 디버거 및 브라우저 개발 도구에서 사용하는 것과 동일한 Chrome DevTools 프로토콜)에 연결하여 작동합니다. 이는 로컬 UI를 읽고 마치 키보드 앞에 앉아 있는 것처럼 정확하게 키 누르기와 클릭을 시뮬레이션합니다.

이것이 실제로 의미하는 바는 다음과 같습니다.
- **Antigravity가 이미 전송한 것 외에는 Google 서버에 대한 요청이 이루어지지 않습니다**. 확장 프로그램은 LAN 외부에서 네트워크에 액세스할 수 없습니다.
- **Antigravity의 네트워크 트래픽에는 아무것도 주입되지 않습니다.** 확장 프로그램은 화면을 읽고 편집기에 입력합니다. API 호출을 가로채거나 수정하지 않습니다.
- **Antigravity 파일은 수정되지 않습니다.** 패치, 후크 또는 바이너리 수정이 없습니다.
- **서버는 전적으로 사용자의 컴퓨터에서 실행됩니다.** 서버를 외부에 명시적으로 노출하지 않는 한 프롬프트, 채팅 기록 및 파일은 로컬 네트워크를 떠나지 않습니다.
- **이 확장 프로그램은 데이터를 제3자 서비스로 전송하지 않습니다**.

소스 코드는 MIT 라이선스가 있으며 완전히 감사 가능합니다: https://github.com/cafeTechne/antigravity-link-extension

## 문제 해결

- **인스턴스를 찾을 수 없음**: 위에 표시된 `--remote-debugging-port` 명령을 사용하여 모든 Antigravity 창이 시작되었는지 확인하세요.
- **모바일에서 연결할 수 없습니다**: 휴대전화와 컴퓨터가 동일한 네트워크에 있는지 확인하세요.
- **업로드가 저장되지만 채팅에는 표시되지 않습니다**: 모바일 UI에서 올바른 활성 인스턴스로 전환합니다.
- **"초기화 중..."에서 멈춤**: 서버에 연결할 수 있지만 채팅 화면이 아직 캡처되지 않았습니다. CDP 연결이 초기화될 때까지 몇 초간 기다립니다.

## FAQ

**iOS와 Android에서 작동하나요?**
예. 모바일 UI는 iOS의 Safari, Android의 Chrome 등 모든 최신 모바일 브라우저에서 실행됩니다.

**이것은 셀룰러 또는 VPN을 통해 작동합니까?**
기본적으로는 아닙니다. 서버는 LAN 전용입니다. 원격 액세스를 위해서는 ngrok와 같은 터널을 통해 노출해야 합니다. 토큰 인증 및 HTTPS는 관계없이 그대로 유지됩니다.

**자체 서명된 인증서 경고를 받아도 안전합니까?**
예. 인증서는 서버 시작 시 컴퓨터에 로컬로 생성됩니다. 경고가 나타나는 이유는 연결이 안전하지 않아서가 아니라 공용 인증 기관에서 발급한 것이 아니기 때문입니다.

**이를 자동화에 사용할 수 있나요?**
예. 로컬 HTTP API와 MCP 서버는 바로 이를 위해 설계되었습니다. [API](#api) 및 [MCP server](#mcp-server) 섹션을 참조하세요.

## 국제화 및 접근성

모바일 인터페이스는 자동으로 브라우저의 언어를 감지하고 다음으로 렌더링합니다.

영어 · 日本語 · 中文（简体）· 中文（繁體） · 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Viet · Bahasa Indonesia · العربية

아랍어는 자동으로 오른쪽에서 왼쪽으로 렌더링됩니다. 언어 감지는 구성이 필요 없이 `navigator.language`를 사용합니다.

인터페이스는 시맨틱 HTML, ARIA 역할, 연결 상태를 위한 `aria-live` 영역, 키보드 탐색 및 화면 판독기 호환 레이블로 구축되었습니다.

## 기여

풀 요청을 환영합니다. 대규모 변경을 시작하기 전에 코드베이스에서 TODO를 확인하거나 GitHub 문제를 열어 아이디어를 논의하세요.
설정 및 PR 노트는 `CONTRIBUTING.md`를 참조하세요.

---

## API

확장은 `https://localhost:3000`(또는 구성된 포트)에서 로컬 HTTP API를 노출합니다. `/ping`를 제외한 모든 엔드포인트에는 `Authorization: Bearer <token>` 헤더가 필요합니다. 토큰은 QR 코드 URL에서 `?token=` 다음의 값입니다.

| 방법 | 엔드포인트 | 설명 |
| --- | --- | --- |
| 얻다 | `/ping` | 상태 확인 — `pong`를 반환합니다. 인증이 필요하지 않습니다. |
| 얻다 | `/snapshot` | 현재 채팅 화면: HTML, CSS, 모드/모델, `isGenerating`. |
| 얻다 | `/instances` | 활성 Antigravity 창을 나열합니다. |
| 우편 | `/instance` | 활성 창을 전환합니다. 본체: `{ "targetId": "..." }` |
| 우편 | `/send` | 메시지를 보내세요. 본체: `{ "message": "..." }` |
| 우편 | `/click` | UI 요소를 클릭합니다. 본체: `{ "selector"?, "text"?, "x"?, "y"? }` |
| 우편 | `/stop` | AI 생성을 중지합니다. |
| 우편 | `/upload` | 파일(멀티파트/양식 데이터, 필드 이름 `file`)을 업로드합니다. |
| 얻다 | `/task` | 현재 작업 문서를 읽습니다. |
| 얻다 | `/walkthrough` | 현재 연습 문서를 읽어보세요. |
| 얻다 | `/plan` | 현재 구현 계획을 읽어보세요. |

전체 스키마: [`openapi.yaml`](openapi.yaml)

## MCP 서버

Antigravity Link는 AI 보조자가 Antigravity 세션을 직접 구동할 수 있도록 하는 MCP(모델 컨텍스트 프로토콜) 서버를 제공합니다.

**설정**

MCP 클라이언트 구성(예: `claude_desktop_config.json`)에 다음을 추가합니다.

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

`<extension-dir>`를 설치된 확장 프로그램의 경로로 바꿉니다.
- **윈도우:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **맥OS/리눅스:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

토큰은 QR 코드 URL에서 `?token=` 이후의 값입니다. MCP 클라이언트가 연결되기 전에 확장 서버가 실행되고 있어야 합니다.

**사용 가능한 도구**

| 도구 | 설명 |
| --- | --- |
| `get_snapshot` | 현재 채팅 상태, 모드, 모델 및 생성 상태를 가져옵니다. |
| `send_message` | 활성 채팅에 메시지를 보냅니다. |
| `stop_generation` | 활성 AI 생성을 취소합니다. |
| `get_instances` | 사용 가능한 Antigravity 창을 나열합니다. |
| `switch_instance` | 다른 Antigravity 창으로 전환합니다. |
| `click_element` | 선택기, 텍스트 또는 좌표를 기준으로 UI 요소를 클릭합니다. |
| `get_task` | 현재 작업 문서를 읽습니다. |
| `get_walkthrough` | 현재 연습 문서를 읽어보세요. |
| `get_plan` | 현재 구현 계획을 읽어보세요. |

## 독립형 및 작업 공간 자산

이 확장은 독립적입니다. 자체 `public/` 자산과 `uploads/` 폴더를 제공하며 상위 `npm run dev` 빌드가 필요하지 않습니다.

*작업 공간*에 `public/` 또는 `uploads/`가 포함된 경우 확장 프로그램은 자동으로 해당 경로를 선호합니다. 이를 통해 쉽게 모바일 UI를 사용자 정의하거나 프로젝트 루트에 업로드를 유지할 수 있지만 작업 영역마다 동작이 다를 수 있음을 의미하기도 합니다.

---

## 스타의 역사

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## 감사의 말

다음을 포함한 초기 커뮤니티 프로젝트에서 영감을 얻었습니다.
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat
