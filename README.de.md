
# Antigravity Link (VS Code-Erweiterung)

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Lesen Sie dies in Ihrer Sprache:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **Was ist neu in v1.0.13** – Generierung über Mobilgeräte stoppen, MCP-Server + OpenAPI-Spezifikation, 15-sprachige Benutzeroberfläche, Verbesserungen beim Datei-Upload. Siehe [CHANGELOG](CHANGELOG.md).

---

## Inhalt

- [Demo](#demo)
- [Was Sie bekommen](#was-sie-bekommen)
- [Installation](#installation)
- [Voraussetzungen](#voraussetzungen)
- [Schnellstart](#schnellstart)
- [Befehle](#befehle)
- [Einstellungen](#einstellungen)
- [Für Agentenentwickler](#für-agentenentwickler)
- [Wie es funktioniert](#wie-es-funktioniert-hohes-niveau)
- [Kontosicherheit](#kontosicherheit)
- [Fehlerbehebung](#fehlerbehebung)
- [FAQ](#faq)
- [Internationalisierung und Zugänglichkeit](#internationalisierung-und-zugänglichkeit)
- [Mitwirken](#mitwirken)
- [API-Referenz](#api)
- [MCP-Serverreferenz](#mcp-server)

---

Sie führen eine Antigravity-Sitzung durch und müssen Ihren Schreibtisch verlassen. Die KI ist mittlerer Generation. Sie möchten es überwachen, umleiten, eine Datei hochladen oder einfach nur lesen, was es geschrieben hat – von Ihrem Telefon aus, ohne zu Ihrem Computer zurückkehren zu müssen.

Antigravity Link macht das möglich. Scannen Sie einen QR-Code und Ihr Telefon wird zum Live-Spiegel des aktiven Chats: Lesen Sie Antworten während des Streams, senden Sie Nachrichten, stoppen Sie die Generierung, laden Sie Dateien hoch, diktieren Sie per Sprache und wechseln Sie zwischen mehreren Antigravity-Fenstern – alles über einen mobilen Browser in Ihrem lokalen Netzwerk.

Zur Automatisierung stellt die Erweiterung außerdem eine lokale HTTP-API und einen MCP-Server bereit, sodass Agenten und externe Tools Antigravity-Sitzungen programmgesteuert steuern können.

## Demo

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

<details>
<summary>Screenshots</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

</details>

## Was Sie bekommen

- Live-Spiegel des aktiven Antigravity-Chats – lesen und interagieren Sie von Ihrem Telefon aus.
- Datei-Upload in den aktiven Antigravity-Chat.
- Sprach-zu-Text-Eingabe vom Mobilgerät aus (HTTPS für Mikrofonberechtigungen erforderlich).
- Stoppen Sie die Stromerzeugung über Ihr Telefon mit einem speziellen Stopp-Chip.
- Aktiver Instanzwechsel für mehrere Antigravity-Fenster.
- Lokale HTTP-API für Automatisierung und Integrationen (siehe [API](#api)).
- MCP-Server für die KI-Assistenten-Integration (siehe [MCP server](#mcp-server)).
- Nur lokaler Server mit Token-Authentifizierung.
- Schnittstelle in 16 Sprachen mit automatischer Erkennung und RTL-Unterstützung verfügbar.

## Installation

Installation über den Antigravity-Erweiterungsmarktplatz – suchen Sie nach **Antigravity Link** – oder [install directly from Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension).

## Voraussetzungen

- **Antigravity IDE** installiert und ausgeführt.
- **Ein Telefon und ein Computer im selben WLAN-Netzwerk.**
- **Antigravity wurde mit dem Remote-Debugging-Flag gestartet.** Dies ist erforderlich, damit die Erweiterung Ihre Sitzung erkennen und eine Verbindung zu ihr herstellen kann. Den Startbefehl finden Sie weiter unten im Abschnitt „Schnellstart“.

## Schnellstart

1) Starten Sie Antigravity mit aktiviertem Remote-Debugging. Dies ist erforderlich; Ohne dieses Flag gestartete Sitzungen sind für die Erweiterung nicht erkennbar.

**Windows** (Verknüpfung im Startmenü):
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

Es werden mehrere Antigravity-Sitzungen unterstützt, aber jedes Fenster muss mit diesem Befehl gestartet werden.

2) Führen Sie in VS Code Folgendes aus:
`Antigravity Link: Start Server`

3) Führen Sie dann Folgendes aus:
`Antigravity Link: Show QR Code`

4) Scannen Sie den QR-Code mit Ihrem Telefon. Ihre mobile Benutzeroberfläche ist fertig.

5) Ihr Telefon warnt möglicherweise, dass die Verbindung unsicher ist, da das Zertifikat selbstsigniert ist. Dies wird für lokales HTTPS erwartet. Verwenden Sie die Option „Erweitert“ Ihres Browsers oder eine ähnliche Option, um fortzufahren (der Wortlaut unterscheidet sich zwischen Safari/Chrome/Firefox).

## Befehle

| Befehl | Beschreibung |
| --- | --- |
| Antigravity Link: Start Server | Startet den lokalen Bridge-Server. |
| Antigravity Link: Stop Server | Stoppt den Server. |
| Antigravity Link: Show QR Code | Zeigt den Verbindungscode QR an. |
| Antigravity Link: Select Network Interface | Wählen Sie aus, welche Netzwerkschnittstelle die QR-URL ankündigt. |

## Einstellungen

| Einstellung | Standard | Beschreibung |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | Port für den lokalen Bridge-Server. |
| `antigravityLink.autoStart` | `false` | Starten Sie den Server beim VS Code-Start. |
| `antigravityLink.useHttps` | `true` | Für den Mikrofonzugriff über HTTPS bereitstellen. |
| `antigravityLink.preferredHost` | `""` | Optionales LAN IPv4 zum Ankündigen in der QR-URL (Beispiel: `192.168.1.101`). |
| `antigravityLink.strictWorkbenchOnly` | `true` | Aus Stabilitätsgründen nur an `workbench.html` CDP-Ziele binden. |
| `antigravityLink.includeFallbackTargets` | `false` | Erlauben Sie Jetski-/Launchpad-Fallback-Ziele, wenn der strikte Modus deaktiviert ist. |

## Für Agentenentwickler

Wenn Sie eine schnelle Integration wünschen, verwenden Sie diese Reihenfolge:

1) Starten Sie den Erweiterungsserver und kopieren Sie das Token von der QR-URL (`?token=...`).
2) Verwenden Sie entweder MCP-Tools (`mcp-server.mjs`) oder direkte HTTP-Aufrufe gegen `https://localhost:3000`.
3) Überprüfen Sie den Kontrollfluss mit `/snapshot`, `/send` und `/stop`.

OpenAPI-Beispiel:

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

Beispiel für die Clientkonfiguration MCP:

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

Ersetzen Sie `<extension-dir>` durch den Pfad zur installierten Erweiterung:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

## Wie es funktioniert (hohes Niveau)

- Die Erweiterung startet einen lokalen Server (HTTP oder HTTPS).
- Es erkennt Antigravity-Ziele über das Chrome DevTools-Protokoll (CDP).
- Ihr Telefon stellt eine Verbindung zur mobilen Benutzeroberfläche her und sendet Upload-/Befehlsanfragen.
- Die Erweiterung fügt sich in das ausgewählte Chat-Ziel ein und speichert Dateien unter `uploads/`.

## Kontosicherheit

Für Antigravity Link sind keine Verbotsfälle bekannt und das soll auch so bleiben.

Die Erweiterung stellt eine Verbindung zu einem Debug-Port her, den Antigravity auf Ihrem eigenen Computer verfügbar macht – das gleiche Chrome DevTools-Protokoll, das vom integrierten Debugger und den Browser-Devtools von VS Code verwendet wird. Es liest Ihre lokale Benutzeroberfläche und simuliert Tastendrücke und Klicks, genau so, als ob Sie an Ihrer Tastatur sitzen würden.

Was das in der Praxis bedeutet:
- **Es werden keine Anfragen an die Server von Google gestellt**, die über das hinausgehen, was Antigravity bereits sendet. Die Nebenstelle hat keinen Netzwerkzugriff außerhalb Ihres LAN.
- **Es wird nichts in den Netzwerkverkehr von Antigravity eingeschleust.** Die Erweiterung liest Ihren Bildschirm und gibt Eingaben in Ihren Editor ein – sie fängt keine API-Aufrufe ab oder ändert sie nicht.
- **Es werden keine Antigravity-Dateien geändert.** Es gibt keine Patches, Hooks oder Binäränderungen.
- **Der Server läuft vollständig auf Ihrem Computer.** Ihre Eingabeaufforderungen, Ihr Chat-Verlauf und Ihre Dateien verlassen niemals Ihr lokales Netzwerk, es sei denn, Sie stellen den Server ausdrücklich extern zur Verfügung.
- **Durch diese Erweiterung werden keine Daten an Drittanbieterdienste gesendet**.

Der Quellcode ist MIT-lizenziert und vollständig überprüfbar: https://github.com/cafeTechne/antigravity-link-extension

## Fehlerbehebung

- **Keine Instanzen gefunden**: Stellen Sie sicher, dass jedes Antigravity-Fenster mit dem oben gezeigten `--remote-debugging-port`-Befehl gestartet wurde.
- **Verbindung über Mobilgerät nicht möglich**: Stellen Sie sicher, dass sich Ihr Telefon und Ihr Computer im selben Netzwerk befinden.
- **Uploads werden gespeichert, erscheinen aber nicht im Chat**: Wechseln Sie in der mobilen Benutzeroberfläche zur richtigen aktiven Instanz.
- **Hängt bei „Initialisierung…“ fest**: Der Server ist erreichbar, aber die Chatoberfläche wurde noch nicht erfasst. Warten Sie einige Sekunden, bis die CDP-Verbindung initialisiert ist.

## FAQ

**Funktioniert das auf iOS und Android?**
Ja. Die mobile Benutzeroberfläche läuft in jedem modernen mobilen Browser – Safari auf iOS, Chrome auf Android und andere funktionieren alle.

**Funktioniert das über Mobilfunk oder VPN?**
Nicht standardmäßig – der Server ist nur LAN-fähig. Für den Fernzugriff müssten Sie es über einen Tunnel wie ngrok verfügbar machen. Die Token-Authentifizierung und HTTPS bleiben unabhängig davon bestehen.

**Kann die Warnung zum selbstsignierten Zertifikat sicher akzeptiert werden?**
Ja. Das Zertifikat wird beim Serverstart lokal auf Ihrem Rechner generiert. Die Warnung wird angezeigt, weil sie nicht von einer öffentlichen Zertifizierungsstelle ausgegeben wurde, und nicht, weil die Verbindung unsicher ist.

**Kann ich dies zur Automatisierung verwenden?**
Ja. Die lokale HTTP-API und der MCP-Server sind genau dafür konzipiert. Siehe die Abschnitte [API](#api) und [MCP server](#mcp-server).

## Internationalisierung und Zugänglichkeit

Die mobile Benutzeroberfläche erkennt automatisch die Sprache Ihres Browsers und stellt Folgendes dar:

Englisch · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

Arabisch wird automatisch von rechts nach links gerendert. Die Spracherkennung verwendet `navigator.language`, ohne dass eine Konfiguration erforderlich ist.

Die Schnittstelle ist durchgehend mit semantischem HTML, ARIA-Rollen, `aria-live`-Regionen für den Verbindungsstatus, Tastaturnavigation und mit Bildschirmlesegeräten kompatiblen Beschriftungen aufgebaut.

## Mitwirken

Pull-Anfragen sind willkommen. Überprüfen Sie die TODOs in der Codebasis oder öffnen Sie ein GitHub-Problem, um Ideen zu besprechen, bevor Sie mit großen Änderungen beginnen.
Siehe `CONTRIBUTING.md` für Setup- und PR-Hinweise.

---

## API

Die Erweiterung stellt eine lokale HTTP-API unter `https://localhost:3000` (oder Ihrem konfigurierten Port) bereit. Alle Endpunkte außer `/ping` erfordern einen `Authorization: Bearer <token>`-Header. Das Token ist der Wert nach `?token=` in der QR-Code-URL.

| Verfahren | Endpunkt | Beschreibung |
| --- | --- | --- |
| ERHALTEN | `/ping` | Gesundheitsprüfung – gibt `pong` zurück. Keine Authentifizierung erforderlich. |
| ERHALTEN | `/snapshot` | Aktuelle Chatoberfläche: HTML, CSS, Modus/Modell, `isGenerating`. |
| ERHALTEN | `/instances` | Aktive Antigravity-Fenster auflisten. |
| POST | `/instance` | Aktives Fenster wechseln. Körper: `{ "targetId": "..." }` |
| POST | `/send` | Senden Sie eine Nachricht. Körper: `{ "message": "..." }` |
| POST | `/click` | Klicken Sie auf ein UI-Element. Körper: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | Stoppen Sie die KI-Generierung. |
| POST | `/upload` | Laden Sie eine Datei hoch (multipart/form-data, Feldname `file`). |
| ERHALTEN | `/task` | Lesen Sie das aktuelle Aufgabendokument. |
| ERHALTEN | `/walkthrough` | Lesen Sie das aktuelle Walkthrough-Dokument. |
| ERHALTEN | `/plan` | Lesen Sie den aktuellen Umsetzungsplan. |

Vollständiges Schema: [`openapi.yaml`](openapi.yaml)

## MCP-Server

Antigravity Link liefert einen MCP-Server (Model Context Protocol), mit dem KI-Assistenten Ihre Antigravity-Sitzung direkt steuern können.

**Aufstellen**

Fügen Sie Folgendes zu Ihrer MCP-Clientkonfiguration hinzu (z. B. `claude_desktop_config.json`):

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

Ersetzen Sie `<extension-dir>` durch den Pfad zur installierten Erweiterung:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

Das Token ist der Wert nach `?token=` in der Code-URL QR. Der Erweiterungsserver muss ausgeführt werden, bevor der MCP-Client eine Verbindung herstellt.

**Verfügbare Werkzeuge**

| Werkzeug | Beschreibung |
| --- | --- |
| `get_snapshot` | Erhalten Sie den aktuellen Chat-Status, Modus, Modell und Generierungsstatus. |
| `send_message` | Senden Sie eine Nachricht an den aktiven Chat. |
| `stop_generation` | Aktive KI-Generierung abbrechen. |
| `get_instances` | Verfügbare Antigravity-Fenster auflisten. |
| `switch_instance` | Wechseln Sie zu einem anderen Antigravity-Fenster. |
| `click_element` | Klicken Sie per Selektor, Text oder Koordinaten auf ein UI-Element. |
| `get_task` | Lesen Sie das aktuelle Aufgabendokument. |
| `get_walkthrough` | Lesen Sie das aktuelle Walkthrough-Dokument. |
| `get_plan` | Lesen Sie den aktuellen Umsetzungsplan. |

## Eigenständige vs. Arbeitsbereichsressourcen

Diese Erweiterung ist in sich geschlossen. Es liefert seine eigenen `public/`-Assets und den `uploads/`-Ordner und erfordert nicht den übergeordneten `npm run dev`-Build.

Wenn Ihr *Arbeitsbereich* `public/` oder `uploads/` enthält, bevorzugt die Erweiterung diese Pfade automatisch. Dies macht es einfach, die mobile Benutzeroberfläche anzupassen oder Uploads in Ihrem Projektstamm zu behalten, bedeutet aber auch, dass das Verhalten zwischen den Arbeitsbereichen unterschiedlich sein kann.

---

## Sterngeschichte

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## Danksagungen

Inspiriert von frühen Gemeinschaftsprojekten, darunter:
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat
