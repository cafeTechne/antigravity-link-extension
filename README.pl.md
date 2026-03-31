# Antigravity Link (Rozszerzenie VS Code)

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Czytaj w swoim języku:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

---

Repozytorium GitHub: https://github.com/cafeTechne/antigravity-link-extension

Open VSX: https://open-vsx.org/extension/cafetechne/antigravity-link-extension

Przenieś swoje sesje Antigravity na telefon. Przesyłaj pliki, dyktuj prompty, zatrzymuj generowanie i zarządzaj wieloma aktywnymi czatami Antigravity z poziomu interfejsu przyjaznego dla urządzeń mobilnych — lub automatyzuj je za pomocą MCP albo lokalnego HTTP API.

## Dla kogo jest to rozszerzenie

- Zespoły, które chcą prostego i bezpiecznego mobilnego towarzysza dla IDE Antigravity od Google.
- Zaawansowani użytkownicy, którzy chcą szybko przesyłać pliki i korzystać z dyktowania głosowego w każdej chwili.
- Programiści, którzy chcą automatyzować lub integrować sesje Antigravity przez API lub MCP.
- Początkujący programiści, którzy chcą korzystać z działającej sesji Antigravity bez żadnej konfiguracji.

## Co zyskujesz

- Podgląd na żywo aktywnego czatu Antigravity — czytaj i steruj z telefonu.
- Przesyłanie plików do aktywnego czatu Antigravity.
- Wejście głosowe na tekst z urządzenia mobilnego (HTTPS wymagany dla uprawnień mikrofonu).
- Zatrzymanie generowania z telefonu za pomocą dedykowanego przycisku.
- Przełączanie aktywnej instancji przy wielu oknach Antigravity.
- Lokalne HTTP API do automatyzacji i integracji.
- Serwer MCP do integracji z asystentami AI.
- Serwer działający wyłącznie lokalnie z uwierzytelnianiem tokenem.
- Interfejs dostępny w 16 językach z automatycznym wykrywaniem i obsługą RTL.

## Szybki start

1) Uruchom Antigravity z włączonym zdalnym debugowaniem. Jest to wymagane; sesje uruchomione bez tego parametru nie są wykrywalne przez rozszerzenie.

Przykład (Windows):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

2) W VS Code uruchom: `Antigravity Link: Start Server`

3) Następnie uruchom: `Antigravity Link: Show QR Code`

4) Zeskanuj kod QR telefonem. Mobilny interfejs jest gotowy.

5) Telefon może ostrzec, że połączenie jest niebezpieczne, ponieważ certyfikat jest samopodpisany. Jest to oczekiwane zachowanie dla lokalnego HTTPS. Skorzystaj z opcji „Zaawansowane" w przeglądarce, aby kontynuować.

## Polecenia

| Polecenie | Opis |
| --- | --- |
| Antigravity Link: Start Server | Uruchamia lokalny serwer pomostowy. |
| Antigravity Link: Stop Server | Zatrzymuje serwer. |
| Antigravity Link: Show QR Code | Wyświetla kod QR połączenia. |
| Antigravity Link: Select Network Interface | Wybiera interfejs sieciowy podawany w URL kodu QR. |

## API

Rozszerzenie udostępnia lokalne HTTP API pod adresem `https://localhost:3000`. Wszystkie endpointy oprócz `/ping` wymagają nagłówka `Authorization: Bearer <token>`.

| Metoda | Endpoint | Opis |
| --- | --- | --- |
| GET | `/ping` | Sprawdzenie stanu. Bez uwierzytelniania. |
| GET | `/snapshot` | Bieżący widok czatu: HTML, CSS, tryb/model, isGenerating. |
| GET | `/instances` | Lista aktywnych okien Antigravity. |
| POST | `/instance` | Przełączenie aktywnego okna. Ciało: `{ "targetId": "..." }` |
| POST | `/send` | Wysłanie wiadomości. Ciało: `{ "message": "..." }` |
| POST | `/click` | Kliknięcie elementu interfejsu. Ciało: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | Zatrzymanie generowania AI. |
| POST | `/upload` | Przesłanie pliku (multipart/form-data). |
| GET | `/task` | Odczyt bieżącego dokumentu zadania. |
| GET | `/walkthrough` | Odczyt bieżącego przewodnika. |
| GET | `/plan` | Odczyt bieżącego planu implementacji. |

Pełny schemat: [`openapi.yaml`](openapi.yaml)

## Serwer MCP

Dodaj do konfiguracji klienta MCP:

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

Dostępne narzędzia: `get_snapshot`, `send_message`, `stop_generation`, `get_instances`, `switch_instance`, `click_element`, `get_task`, `get_walkthrough`, `get_plan`

## Bezpieczeństwo i prywatność

- Serwer działa lokalnie i jest chroniony tokenem uwierzytelniającym.
- HTTPS jest domyślnie włączony, aby umożliwić dostęp do mikrofonu na urządzeniach mobilnych.
- Rozszerzenie nie wysyła żadnych danych do usług zewnętrznych.

## Rozwiązywanie problemów

- **Nie znaleziono instancji**: upewnij się, że każde okno Antigravity zostało uruchomione z parametrem `--remote-debugging-port`.
- **Nie można połączyć się z urządzenia mobilnego**: sprawdź, czy telefon i komputer są w tej samej sieci.
- **Utknięcie na „Inicjalizacja…"**: poczekaj kilka sekund na nawiązanie połączenia CDP.

## Internacjonalizacja i dostępność

Mobilny interfejs automatycznie wykrywa język przeglądarki i wyświetla się w:
English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

Arabski jest wyświetlany od prawej do lewej. Wykrywanie języka korzysta z `navigator.language` bez żadnej konfiguracji.

## Współtworzenie

Przyjmujemy pull requesty i aktywnie szukamy współtwórców.
Instrukcje konfiguracji i uwagi dotyczące PR znajdziesz w `CONTRIBUTING.md`.

## Licencja

MIT. Zobacz `LICENSE`.
