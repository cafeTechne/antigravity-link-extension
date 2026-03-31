# Antigravity Link (Estensione per VS Code)

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Leggi nella tua lingua:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

---

Repository GitHub: https://github.com/cafeTechne/antigravity-link-extension

Open VSX: https://open-vsx.org/extension/cafetechne/antigravity-link-extension

Porta le tue sessioni Antigravity sul telefono. Carica file, detta prompt, interrompi la generazione e gestisci più chat Antigravity attive da un'interfaccia ottimizzata per il mobile — oppure automatizzale tramite MCP o l'API HTTP locale.

## A chi è rivolto

- Team che vogliono un compagno mobile semplice e sicuro per l'IDE Antigravity di Google.
- Utenti avanzati che desiderano caricare file rapidamente e usare la voce in qualsiasi momento.
- Sviluppatori che vogliono automatizzare o integrare sessioni Antigravity tramite API o MCP.
- Sviluppatori alle prime armi che vogliono interagire con una sessione Antigravity in esecuzione senza alcuna configurazione.

## Cosa ottieni

- Specchio in tempo reale della chat Antigravity attiva — leggi e interagisci dal telefono.
- Caricamento di file nella chat Antigravity attiva.
- Inserimento vocale dal mobile (HTTPS richiesto per i permessi del microfono).
- Interruzione della generazione dal telefono con un pulsante dedicato.
- Cambio di istanza attiva tra più finestre Antigravity.
- API HTTP locale per automazione e integrazioni.
- Server MCP per l'integrazione con assistenti IA.
- Server solo locale con autenticazione tramite token.
- Interfaccia disponibile in 16 lingue con rilevamento automatico e supporto RTL.

## Avvio rapido

1) Avvia Antigravity con il debug remoto abilitato. Questo è obbligatorio; le sessioni avviate senza questo parametro non sono rilevabili dall'estensione.

Esempio (Windows):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

2) In VS Code, esegui: `Antigravity Link: Start Server`

3) Poi esegui: `Antigravity Link: Show QR Code`

4) Scansiona il codice QR con il telefono. L'interfaccia mobile è pronta.

5) Il telefono potrebbe avvisare che la connessione non è sicura perché il certificato è auto-firmato. Questo è previsto per HTTPS locale. Usa l'opzione «Avanzate» del browser per continuare.

## Comandi

| Comando | Descrizione |
| --- | --- |
| Antigravity Link: Start Server | Avvia il server bridge locale. |
| Antigravity Link: Stop Server | Ferma il server. |
| Antigravity Link: Show QR Code | Visualizza il codice QR di connessione. |
| Antigravity Link: Select Network Interface | Sceglie quale interfaccia di rete viene pubblicizzata nell'URL del QR. |

## API

L'estensione espone un'API HTTP locale su `https://localhost:3000`. Tutti gli endpoint tranne `/ping` richiedono un'intestazione `Authorization: Bearer <token>`.

| Metodo | Endpoint | Descrizione |
| --- | --- | --- |
| GET | `/ping` | Controllo dello stato. Nessuna autenticazione richiesta. |
| GET | `/snapshot` | Interfaccia chat corrente: HTML, CSS, modalità/modello, isGenerating. |
| GET | `/instances` | Elenca le finestre Antigravity attive. |
| POST | `/instance` | Cambia la finestra attiva. Corpo: `{ "targetId": "..." }` |
| POST | `/send` | Invia un messaggio. Corpo: `{ "message": "..." }` |
| POST | `/click` | Clicca un elemento dell'interfaccia. Corpo: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | Interrompe la generazione IA. |
| POST | `/upload` | Carica un file (multipart/form-data). |
| GET | `/task` | Legge il documento di attività corrente. |
| GET | `/walkthrough` | Legge il documento di procedura guidata corrente. |
| GET | `/plan` | Legge il piano di implementazione corrente. |

Schema completo: [`openapi.yaml`](openapi.yaml)

## Server MCP

Aggiungi alla configurazione del tuo client MCP:

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

Strumenti disponibili: `get_snapshot`, `send_message`, `stop_generation`, `get_instances`, `switch_instance`, `click_element`, `get_task`, `get_walkthrough`, `get_plan`

## Sicurezza e privacy

- Il server viene eseguito localmente ed è autenticato tramite token.
- HTTPS è abilitato per impostazione predefinita per consentire l'accesso al microfono su dispositivi mobili.
- Questa estensione non invia dati a servizi di terze parti.

## Risoluzione dei problemi

- **Nessuna istanza trovata**: assicurati che ogni finestra Antigravity sia stata avviata con `--remote-debugging-port`.
- **Impossibile connettersi dal mobile**: verifica che il telefono e il computer siano sulla stessa rete.
- **Bloccato su «Inizializzazione…»**: attendi qualche secondo che la connessione CDP si inizializzi.

## Internazionalizzazione e accessibilità

L'interfaccia mobile rileva automaticamente la lingua del browser e viene visualizzata in:
English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

L'arabo viene visualizzato da destra a sinistra. Il rilevamento della lingua usa `navigator.language` senza alcuna configurazione.

## Contribuire

Accettiamo pull request e siamo alla ricerca attiva di collaboratori.
Consulta `CONTRIBUTING.md` per le istruzioni di configurazione e le note sui PR.

## Licenza

MIT. Vedi `LICENSE`.
