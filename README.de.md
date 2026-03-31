# Antigravity Link (VS Code-Erweiterung)

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**In einer anderen Sprache lesen:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

---

GitHub-Repository: https://github.com/cafeTechne/antigravity-link-extension

Open VSX: https://open-vsx.org/extension/cafetechne/antigravity-link-extension

Bringen Sie Ihre Antigravity-Sitzungen auf Ihr Smartphone. Laden Sie Dateien hoch, diktieren Sie Prompts, stoppen Sie die Generierung und steuern Sie mehrere aktive Antigravity-Chats über eine mobilfreundliche Oberfläche — oder automatisieren Sie sie über MCP oder die lokale HTTP-API.

## Für wen ist das gedacht?

- Teams, die eine einfache und sichere mobile Ergänzung für Googles Antigravity IDE suchen.
- Fortgeschrittene Nutzer, die unterwegs schnell Dateien hochladen und Spracheingabe nutzen möchten.
- Entwickler, die Antigravity-Sitzungen über API oder MCP automatisieren oder integrieren möchten.
- Einsteiger, die ohne jede Konfiguration mit einer laufenden Antigravity-Sitzung interagieren möchten.

## Was Sie erhalten

- Live-Spiegelung des aktiven Antigravity-Chats — vom Smartphone aus lesen und bedienen.
- Datei-Upload in den aktiven Antigravity-Chat.
- Sprach-zu-Text-Eingabe vom Mobilgerät (HTTPS für Mikrofonberechtigung erforderlich).
- Generierung vom Smartphone aus mit einem dedizierten Stop-Chip stoppen.
- Umschalten zwischen aktiven Instanzen bei mehreren Antigravity-Fenstern.
- Lokale HTTP-API für Automatisierung und Integrationen.
- MCP-Server für die Integration von KI-Assistenten.
- Rein lokaler Server mit Token-Authentifizierung.
- Oberfläche in 16 Sprachen mit automatischer Erkennung und RTL-Unterstützung.

## Schnellstart

1) Starten Sie Antigravity mit aktiviertem Remote-Debugging. Dies ist zwingend erforderlich; Sitzungen, die ohne dieses Flag gestartet wurden, sind für die Erweiterung nicht auffindbar.

Beispiel (Windows):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

2) Führen Sie in VS Code aus: `Antigravity Link: Start Server`

3) Führen Sie dann aus: `Antigravity Link: Show QR Code`

4) Scannen Sie den QR-Code mit Ihrem Smartphone. Die mobile Oberfläche ist bereit.

5) Ihr Smartphone warnt möglicherweise, dass die Verbindung unsicher ist, da das Zertifikat selbstsigniert ist. Dies ist bei lokalem HTTPS normal. Verwenden Sie die Option „Erweitert" im Browser, um fortzufahren.

## Befehle

| Befehl | Beschreibung |
| --- | --- |
| Antigravity Link: Start Server | Startet den lokalen Bridge-Server. |
| Antigravity Link: Stop Server | Stoppt den Server. |
| Antigravity Link: Show QR Code | Zeigt den Verbindungs-QR-Code an. |
| Antigravity Link: Select Network Interface | Wählt die Netzwerkschnittstelle, die die QR-URL bekannt gibt. |

## API

Die Erweiterung stellt unter `https://localhost:3000` eine lokale HTTP-API bereit. Alle Endpunkte außer `/ping` erfordern einen `Authorization: Bearer <token>`-Header.

| Methode | Endpunkt | Beschreibung |
| --- | --- | --- |
| GET | `/ping` | Statusprüfung. Keine Authentifizierung erforderlich. |
| GET | `/snapshot` | Aktuelle Chat-Oberfläche: HTML, CSS, Modus/Modell, isGenerating. |
| GET | `/instances` | Listet aktive Antigravity-Fenster auf. |
| POST | `/instance` | Wechselt das aktive Fenster. Body: `{ "targetId": "..." }` |
| POST | `/send` | Sendet eine Nachricht. Body: `{ "message": "..." }` |
| POST | `/click` | Klickt ein UI-Element. Body: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | Stoppt die KI-Generierung. |
| POST | `/upload` | Lädt eine Datei hoch (multipart/form-data). |
| GET | `/task` | Liest das aktuelle Aufgabendokument. |
| GET | `/walkthrough` | Liest das aktuelle Walkthrough-Dokument. |
| GET | `/plan` | Liest den aktuellen Implementierungsplan. |

Vollständiges Schema: [`openapi.yaml`](openapi.yaml)

## MCP-Server

Zur MCP-Client-Konfiguration hinzufügen:

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

Verfügbare Tools: `get_snapshot`, `send_message`, `stop_generation`, `get_instances`, `switch_instance`, `click_element`, `get_task`, `get_walkthrough`, `get_plan`

## Sicherheit und Datenschutz

- Der Server läuft lokal und ist mit einem Token authentifiziert.
- HTTPS ist standardmäßig aktiviert, um Mikrofonzugriff auf Mobilgeräten zu ermöglichen.
- Diese Erweiterung sendet keine Daten an Drittanbieter-Dienste.

## Fehlerbehebung

- **Keine Instanzen gefunden**: Stellen Sie sicher, dass jedes Antigravity-Fenster mit `--remote-debugging-port` gestartet wurde.
- **Verbindung vom Mobilgerät nicht möglich**: Vergewissern Sie sich, dass Smartphone und Computer im selben Netzwerk sind.
- **Bleibt bei „Initialisierung…" hängen**: Warten Sie einige Sekunden, bis die CDP-Verbindung initialisiert ist.

## Internationalisierung und Barrierefreiheit

Die mobile Oberfläche erkennt die Browsersprache automatisch und rendert in:
English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

Arabisch wird von rechts nach links dargestellt. Die Spracherkennung verwendet `navigator.language` ohne jegliche Konfiguration.

## Mitwirken

Wir nehmen Pull Requests an und suchen aktiv nach Mitwirkenden.
Setup und PR-Hinweise finden Sie in `CONTRIBUTING.md`.

## Lizenz

MIT. Siehe `LICENSE`.
