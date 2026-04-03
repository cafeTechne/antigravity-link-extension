
# Antigravity Link (rozszerzenie VS Code)

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Przeczytaj to w swoim języku:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **Co nowego w wersji 1.0.13** — Zatrzymaj generowanie z urządzeń mobilnych, serwer MCP + specyfikacja OpenAPI, 15-językowy interfejs użytkownika, ulepszenia przesyłania plików. Zobacz [CHANGELOG](CHANGELOG.md).

---

## Zawartość

- [Demonstracja](#demonstracja)
- [Co dostajesz](#co-dostajesz)
- [Instalacja](#instalacja)
- [Warunki wstępne](#warunki-wstępne)
- [Szybki start](#szybki-start)
- [Polecenia](#polecenia)
- [Ustawienia](#ustawienia)
- [Dla twórców agentów](#dla-twórców-agentów)
- [Jak to działa](#jak-to-działa-wysoki-poziom)
- [Bezpieczeństwo konta](#bezpieczeństwo-konta)
- [Rozwiązywanie problemów](#rozwiązywanie-problemów)
- [Często zadawane pytania](#często-zadawane-pytania)
- [Internacjonalizacja i dostępność](#internacjonalizacja-i-dostępność)
- [Wkład](#wkład)
- [Odniesienie do API](#api)
- [Odniesienie do serwera MCP](#serwer-mcp)

---

Prowadzisz sesję Antigravity i musisz odejść od biurka. AI jest średniej generacji. Chcesz go monitorować, przekierowywać, przesyłać plik lub po prostu przeczytać, co napisał – z telefonu, bez konieczności wracania do komputera.

Dzięki Antigravity Link jest to możliwe. Zeskanuj kod QR, a Twój telefon stanie się lustrzanym odbiciem aktywnego czatu: czytaj odpowiedzi podczas przesyłania strumieniowego, wysyłaj wiadomości, zatrzymuj generowanie, przesyłaj pliki, dyktuj głosowo i przełączaj się między wieloma oknami Antigravity — a wszystko to z poziomu przeglądarki mobilnej w sieci lokalnej.

W celu automatyzacji rozszerzenie udostępnia również lokalny interfejs API HTTP i serwer MCP, dzięki czemu agenci i narzędzia zewnętrzne mogą programowo sterować sesjami Antigravity.

## Demonstracja

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

<details>
<summary>Zrzuty ekranu</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

</details>

## Co dostajesz

- Lustro na żywo aktywnego czatu Antigravity — czytaj i korzystaj z telefonu.
- Przesyłanie pliku do aktywnego czatu Antigravity.
- Wprowadzanie głosu na tekst z telefonu komórkowego (wymagane HTTPS w celu uzyskania uprawnień do mikrofonu).
- Zatrzymaj generowanie z telefonu za pomocą dedykowanego chipa zatrzymującego.
- Aktywne przełączanie instancji dla wielu okien Antigravity.
- Lokalne API HTTP do automatyzacji i integracji (patrz [API](#api)).
- Serwer MCP do integracji asystentów AI (patrz [MCP server](#mcp-server)).
- Serwer lokalny z uwierzytelnianiem tokenowym.
- Interfejs dostępny w 16 językach z automatycznym wykrywaniem i obsługą RTL.

## Instalacja

Zainstaluj z rynku rozszerzeń Antigravity — wyszukaj **Antigravity Link** — lub [install directly from Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension).

## Warunki wstępne

- **Antigravity IDE** zainstalowany i uruchomiony.
- **Telefon i komputer w tej samej sieci Wi-Fi.**
- **Antigravity został uruchomiony z flagą zdalnego debugowania.** Jest to wymagane, aby rozszerzenie mogło wykryć Twoją sesję i połączyć się z nią. Zobacz polecenie uruchomienia w Szybkim uruchomieniu poniżej.

## Szybki start

1) Uruchom Antigravity z włączonym zdalnym debugowaniem. Jest to wymagane; sesje uruchomione bez tej flagi nie są wykrywane przez rozszerzenie.

**Windows** (skrót do menu Start):
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

Obsługiwanych jest wiele sesji Antigravity, ale każde okno musi zostać uruchomione za pomocą tego polecenia.

2) W VS Code uruchom:
`Antigravity Link: Start Server`

3) Następnie uruchom:
`Antigravity Link: Show QR Code`

4) Zeskanuj telefonem kod QR. Twój mobilny interfejs użytkownika jest gotowy.

5) Twój telefon może ostrzec, że połączenie jest niebezpieczne, ponieważ certyfikat jest podpisany samodzielnie. Jest to oczekiwane dla lokalnego HTTPS. Aby kontynuować, użyj opcji „Zaawansowane” lub podobnej w przeglądarce (sformułowanie różni się w przypadku Safari/Chrome/Firefox).

## Polecenia

| Rozkaz | Opis |
| --- | --- |
| Antigravity Link: Start Server | Uruchamia lokalny serwer mostkowy. |
| Antigravity Link: Stop Server | Zatrzymuje serwer. |
| Antigravity Link: Show QR Code | Wyświetla kod połączenia QR. |
| Antigravity Link: Select Network Interface | Wybierz interfejs sieciowy reklamowany przez adres URL QR. |

## Ustawienia

| Ustawienie | Domyślny | Opis |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | Port dla lokalnego serwera mostowego. |
| `antigravityLink.autoStart` | `false` | Uruchom serwer po uruchomieniu VS Code. |
| `antigravityLink.useHttps` | `true` | Podawaj przez HTTPS, aby uzyskać dostęp do mikrofonu. |
| `antigravityLink.preferredHost` | `""` | Opcjonalna sieć LAN IPv4 do reklamowania w adresie URL QR (przykład: `192.168.1.101`). |
| `antigravityLink.strictWorkbenchOnly` | `true` | Dla stabilności łącz tylko cele `workbench.html` CDP. |
| `antigravityLink.includeFallbackTargets` | `false` | Zezwalaj na cele zastępcze dla skuterów wodnych/launchpadów, gdy tryb ścisły jest wyłączony. |

## Dla twórców agentów

Jeśli chcesz szybko zintegrować, użyj tej sekwencji:

1) Uruchom serwer rozszerzeń i skopiuj token z adresu URL QR (`?token=...`).
2) Użyj narzędzi MCP (`mcp-server.mjs`) lub bezpośrednich wywołań HTTP przeciwko `https://localhost:3000`.
3) Sprawdź przepływ sterowania za pomocą `/snapshot`, `/send` i `/stop`.

Przykład OpenAPI:

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

Przykład konfiguracji klienta MCP:

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

Zastąp `<extension-dir>` ścieżką do zainstalowanego rozszerzenia:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

## Jak to działa (wysoki poziom)

- Rozszerzenie uruchamia lokalny serwer (HTTP lub HTTPS).
- Wykrywa cele Antigravity za pośrednictwem protokołu Chrome DevTools (CDP).
- Twój telefon łączy się z mobilnym interfejsem użytkownika i wysyła żądania przesyłania/polecenia.
- Rozszerzenie wstawia wybrany cel czatu i zapisuje pliki w `uploads/`.

## Bezpieczeństwo konta

Antigravity Link nie ma znanych przypadków blokowania i ma tak pozostać.

Rozszerzenie działa poprzez podłączenie do portu debugowania, który Antigravity udostępnia na twoim komputerze — tego samego protokołu Chrome DevTools, którego używa wbudowany debuger VS Code i narzędzia programistyczne przeglądarki. Odczytuje lokalny interfejs użytkownika i symuluje naciśnięcia klawiszy i kliknięcia, dokładnie tak, jakbyś siedział przy klawiaturze.

Co to oznacza w praktyce:
- **Do serwerów Google** nie są wysyłane żadne żądania poza tym, co już wysłał Antigravity. Rozszerzenie nie ma dostępu do sieci poza siecią LAN.
- **Nic nie jest wprowadzane do ruchu sieciowego Antigravity.** Rozszerzenie czyta Twój ekran i pisze w edytorze — nie przechwytuje ani nie modyfikuje wywołań API.
- **Żadne pliki Antigravity nie są modyfikowane.** Nie ma żadnych poprawek, haków ani modyfikacji binarnych.
- **Serwer działa całkowicie na Twoim komputerze.** Twoje monity, historia czatów i pliki nigdy nie opuszczają Twojej sieci lokalnej, chyba że wyraźnie udostępnisz serwer na zewnątrz.
- **Dzięki temu rozszerzeniu żadne dane nie są przesyłane do usług stron trzecich**.

Kod źródłowy posiada licencję MIT i jest w pełni kontrolowalny: https://github.com/cafeTechne/antigravity-link-extension

## Rozwiązywanie problemów

- **Nie znaleziono instancji**: Upewnij się, że każde okno Antigravity zostało uruchomione za pomocą polecenia `--remote-debugging-port` pokazanego powyżej.
- **Nie można połączyć się z telefonu komórkowego**: Upewnij się, że telefon i komputer są w tej samej sieci.
- **Przesłane pliki są zapisywane, ale nie pojawiają się na czacie**: Przełącz na właściwą aktywną instancję w mobilnym interfejsie użytkownika.
- **Zablokowano na „Inicjowaniu…”**: Serwer jest osiągalny, ale powierzchnia czatu nie została jeszcze przechwycona. Poczekaj kilka sekund na inicjalizację połączenia CDP.

## Często zadawane pytania

**Czy to działa na iOS i Androidzie?**
Tak. Mobilny interfejs użytkownika działa w dowolnej nowoczesnej przeglądarce mobilnej — Safari na iOS, Chrome na Androidzie i inne działają.

**Czy to działa w sieci komórkowej lub VPN?**
Domyślnie nie — serwer działa tylko w sieci LAN. Aby uzyskać zdalny dostęp, musisz udostępnić go przez tunel, taki jak ngrok. Niezależnie od tego uwierzytelnianie tokenem i HTTPS pozostają na swoim miejscu.

**Czy można bezpiecznie zaakceptować ostrzeżenie dotyczące certyfikatu z podpisem własnym?**
Tak. Certyfikat jest generowany lokalnie na Twoim komputerze podczas uruchamiania serwera. Ostrzeżenie pojawia się, ponieważ nie zostało wydane przez publiczny urząd certyfikacji, a nie dlatego, że połączenie jest niepewne.

**Czy mogę użyć tego do automatyzacji?**
Tak. Lokalne API HTTP i serwer MCP są przeznaczone właśnie do tego. Zobacz sekcje [API](#api) i [MCP server](#mcp-server).

## Internacjonalizacja i dostępność

Interfejs mobilny automatycznie wykrywa język Twojej przeglądarki i renderuje w:

Angielski · 日本語 · 中文 (简体） · 中文（繁體） · 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonezja · العربية

Język arabski jest automatycznie renderowany od prawej do lewej. Wykrywanie języka wykorzystuje `navigator.language` bez konieczności konfiguracji.

Interfejs jest zbudowany z semantycznego HTML, ról ARIA, regionów `aria-live` dla stanu połączenia, nawigacji za pomocą klawiatury i etykiet kompatybilnych z czytnikiem ekranu.

## Wkład

Żądania ściągnięcia są mile widziane. Sprawdź TODO w bazie kodu lub otwórz zgłoszenie w GitHubie, aby omówić pomysły przed rozpoczęciem dużych zmian.
Zobacz `CONTRIBUTING.md`, aby uzyskać informacje dotyczące konfiguracji i notatek PR.

---

## API

Rozszerzenie udostępnia lokalny interfejs API HTTP pod adresem `https://localhost:3000` (lub skonfigurowanym przez Ciebie portem). Wszystkie punkty końcowe z wyjątkiem `/ping` wymagają nagłówka `Authorization: Bearer <token>`. Token to wartość znajdująca się po `?token=` w adresie URL kodu QR.

| Metoda | Punkt końcowy | Opis |
| --- | --- | --- |
| DOSTAWAĆ | `/ping` | Kontrola stanu — zwraca `pong`. Nie jest wymagane żadne uwierzytelnienie. |
| DOSTAWAĆ | `/snapshot` | Bieżąca powierzchnia czatu: HTML, CSS, tryb/model, `isGenerating`. |
| DOSTAWAĆ | `/instances` | Lista aktywnych okien Antigravity. |
| POST | `/instance` | Przełącz aktywne okno. Korpus: `{ "targetId": "..." }` |
| POST | `/send` | Wyślij wiadomość. Korpus: `{ "message": "..." }` |
| POST | `/click` | Kliknij element interfejsu użytkownika. Korpus: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | Zatrzymaj generowanie AI. |
| POST | `/upload` | Prześlij plik (wieloczęściowy/dane formularza, nazwa pola `file`). |
| DOSTAWAĆ | `/task` | Przeczytaj dokument bieżącego zadania. |
| DOSTAWAĆ | `/walkthrough` | Przeczytaj bieżący dokument instruktażowy. |
| DOSTAWAĆ | `/plan` | Przeczytaj aktualny plan wdrożenia. |

Pełny schemat: [`openapi.yaml`](openapi.yaml)

## Serwer MCP

Antigravity Link dostarczany jest z serwerem MCP (Model Context Protocol), który umożliwia asystentom AI bezpośrednie sterowanie sesją Antigravity.

**Organizować coś**

Dodaj następujące elementy do konfiguracji klienta MCP (np. `claude_desktop_config.json`):

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

Zastąp `<extension-dir>` ścieżką do zainstalowanego rozszerzenia:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

Token to wartość znajdująca się po `?token=` w adresie URL kodu QR. Serwer rozszerzeń musi być uruchomiony przed połączeniem się klienta MCP.

**Dostępne narzędzia**

| Narzędzie | Opis |
| --- | --- |
| `get_snapshot` | Uzyskaj aktualny stan czatu, tryb, model i status generacji. |
| `send_message` | Wyślij wiadomość do aktywnego czatu. |
| `stop_generation` | Anuluj aktywne generowanie AI. |
| `get_instances` | Lista dostępnych okien Antigravity. |
| `switch_instance` | Przełącz na inne okno Antigravity. |
| `click_element` | Kliknij element interfejsu użytkownika według selektora, tekstu lub współrzędnych. |
| `get_task` | Przeczytaj dokument bieżącego zadania. |
| `get_walkthrough` | Przeczytaj bieżący dokument instruktażowy. |
| `get_plan` | Przeczytaj aktualny plan wdrożenia. |

## Zasoby autonomiczne a zasoby obszaru roboczego

To rozszerzenie jest samodzielne. Zawiera własne zasoby `public/` i folder `uploads/` i nie wymaga nadrzędnej kompilacji `npm run dev`.

Jeśli Twój *obszar roboczy* zawiera `public/` lub `uploads/`, rozszerzenie automatycznie będzie preferować te ścieżki. Ułatwia to dostosowywanie mobilnego interfejsu użytkownika lub przechowywanie przesłanych plików w katalogu głównym projektu, ale oznacza to również, że zachowanie może się różnić w zależności od obszaru roboczego.

---

## Historia gwiazd

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## Podziękowanie

Zainspirowany wczesnymi projektami społecznościowymi, w tym:
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat
