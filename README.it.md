
# Antigravity Link (estensione VS Code)

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Leggi questo nella tua lingua:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **Novità nella versione 1.0.13** — Interruzione della generazione da dispositivi mobili, server MCP + specifiche OpenAPI, interfaccia utente in 15 lingue, miglioramenti al caricamento dei file. Vedi [CHANGELOG](CHANGELOG.md).

---

## Contenuto

- [Dimostrazione](#dimostrazione)
- [Cosa ottieni](#cosa-ottieni)
- [Installazione](#installazione)
- [Prerequisiti](#prerequisiti)
- [Avvio rapido](#avvio-rapido)
- [Comandi](#comandi)
- [Impostazioni](#impostazioni)
- [Per i costruttori di agenti](#per-i-costruttori-di-agenti)
- [Come funziona](#come-funziona-alto-livello)
- [Sicurezza del conto](#sicurezza-del-conto)
- [Risoluzione dei problemi](#risoluzione-dei-problemi)
- [Domande frequenti](#domande-frequenti)
- [Internazionalizzazione e accessibilità](#internazionalizzazione-e-accessibilità)
- [Contribuire](#contribuire)
- [Riferimento API](#api)
- [Riferimento del server MCP](#server-mcp)

---

Stai eseguendo una sessione Antigravity e devi allontanarti dalla scrivania. L’intelligenza artificiale è di mezza generazione. Vuoi monitorarlo, reindirizzarlo, caricare un file o semplicemente leggere ciò che ha scritto, dal tuo telefono, senza tornare al computer.

Antigravity Link lo rende possibile. Scansiona un codice QR e il tuo telefono diventa uno specchio live della chat attiva: leggi le risposte mentre vengono trasmesse, invia messaggi, interrompi la generazione, carica file, detta tramite voce e passa tra più finestre Antigravity, il tutto da un browser mobile, sulla tua rete locale.

Per l'automazione, l'estensione espone anche un'API HTTP locale e un server MCP in modo che agenti e strumenti esterni possano gestire sessioni Antigravity a livello di programmazione.

## Dimostrazione

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

<details>
<summary>Schermate</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

</details>

## Cosa ottieni

- Mirror live della chat Antigravity attiva: leggi e interagisci dal tuo telefono.
- Caricamento file nella chat Antigravity attiva.
- Input da voce a testo da dispositivo mobile (HTTPS richiesto per le autorizzazioni del microfono).
- Interrompi la generazione dal tuo telefono con un chip di arresto dedicato.
- Commutazione di istanze attive per più finestre Antigravity.
- API HTTP locale per automazione e integrazioni (vedi [API](#api)).
- Server MCP per integrazione assistente AI (vedi [MCP server](#mcp-server)).
- Server solo locale con autenticazione tramite token.
- Interfaccia disponibile in 16 lingue con rilevamento automatico e supporto RTL.

## Installazione

Installa dal marketplace delle estensioni Antigravity: cerca **Antigravity Link** — o [install directly from Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension).

## Prerequisiti

- **Antigravity IDE** installato e funzionante.
- **Un telefono e un computer sulla stessa rete Wi-Fi.**
- **Antigravity avviato con il flag di debug remoto.** Questo è necessario affinché l'estensione rilevi e si connetta alla tua sessione. Vedere il comando di avvio in Avvio rapido di seguito.

## Avvio rapido

1) Avvia Antigravity con il debug remoto abilitato. Questo è richiesto; le sessioni avviate senza questo flag non sono rilevabili dall'estensione.

**Windows** (scorciatoia nel menu Start):
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

Sono supportate più sessioni Antigravity, ma ogni finestra deve essere avviata con questo comando.

2) In VS Code, esegui:
`Antigravity Link: Start Server`

3) Quindi esegui:
`Antigravity Link: Show QR Code`

4) Scansiona il codice QR con il tuo telefono. La tua interfaccia utente mobile è pronta.

5) Il telefono potrebbe avvisare che la connessione non è sicura perché il certificato è autofirmato. Questo è previsto per HTTPS locale. Utilizza l'opzione "Avanzate" del tuo browser o un'opzione simile per procedere (il testo differisce tra Safari/Chrome/Firefox).

## Comandi

| Comando | Descrizione |
| --- | --- |
| Antigravity Link: Start Server | Avvia il server bridge locale. |
| Antigravity Link: Stop Server | Arresta il server. |
| Antigravity Link: Show QR Code | Visualizza il codice di connessione QR. |
| Antigravity Link: Select Network Interface | Scegli quale interfaccia di rete pubblicizza l'URL QR. |

## Impostazioni

| Collocamento | Predefinito | Descrizione |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | Porta per il server bridge locale. |
| `antigravityLink.autoStart` | `false` | Avvia il server all'avvio di VS Code. |
| `antigravityLink.useHttps` | `true` | Servire su HTTPS per l'accesso al microfono. |
| `antigravityLink.preferredHost` | `""` | LAN IPv4 opzionale per pubblicizzare nell'URL QR (esempio: `192.168.1.101`). |
| `antigravityLink.strictWorkbenchOnly` | `true` | Associarsi solo ai target `workbench.html` CDP per stabilità. |
| `antigravityLink.includeFallbackTargets` | `false` | Consenti bersagli di fallback su moto d'acqua/launchpad quando la modalità rigorosa è disabilitata. |

## Per i costruttori di agenti

Se vuoi integrare rapidamente, usa questa sequenza:

1) Avvia il server dell'estensione e copia il token dall'URL QR (`?token=...`).
2) Utilizza gli strumenti MCP (`mcp-server.mjs`) o dirigi le chiamate HTTP contro `https://localhost:3000`.
3) Convalida il flusso di controllo con `/snapshot`, `/send` e `/stop`.

Esempio OpenAPI:

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

Esempio di configurazione client MCP:

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

Sostituisci `<extension-dir>` con il percorso dell'estensione installata:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

## Come funziona (alto livello)

- L'estensione avvia un server locale (HTTP o HTTPS).
- Rileva i target Antigravity tramite il protocollo Chrome DevTools (CDP).
- Il telefono si connette all'interfaccia utente mobile e invia richieste di caricamento/comando.
- L'estensione si inserisce nella destinazione della chat selezionata e salva i file su `uploads/`.

## Sicurezza del conto

Antigravity Link non ha casi di ban noti ed è progettato per rimanere tale.

L'estensione funziona collegandosi a una porta di debug che Antigravity espone sul tuo computer: lo stesso protocollo Chrome DevTools utilizzato dal debugger integrato di VS Code e dagli strumenti di sviluppo del browser. Legge l'interfaccia utente locale e simula la pressione dei tasti e i clic, esattamente come se fossi seduto alla tastiera.

Cosa significa in pratica:
- **Non viene effettuata alcuna richiesta ai server di Google** oltre a quanto già inviato da Antigravity. L'interno non ha accesso alla rete al di fuori della tua LAN.
- **Niente viene inserito nel traffico di rete di Antigravity.** L'estensione legge il tuo schermo e digita nel tuo editor: non intercetta né modifica le chiamate API.
- **Nessun file Antigravity viene modificato.** Non sono presenti patch, hook o modifiche binarie.
- **Il server funziona interamente sul tuo computer.** I tuoi messaggi, la cronologia chat e i file non lasciano mai la tua rete locale a meno che tu non esponga esplicitamente il server all'esterno.
- **Nessun dato viene inviato a servizi di terze parti** da questa estensione.

Il codice sorgente ha la licenza MIT ed è completamente verificabile: https://github.com/cafeTechne/antigravity-link-extension

## Risoluzione dei problemi

- **Nessuna istanza trovata**: assicurati che ogni finestra Antigravity sia stata avviata con il comando `--remote-debugging-port` mostrato sopra.
- **Impossibile connettersi dal cellulare**: assicurati che il telefono e il computer siano sulla stessa rete.
- **I caricamenti vengono salvati ma non vengono visualizzati nella chat**: passa all'istanza attiva corretta nell'interfaccia utente mobile.
- **Bloccato su "Inizializzazione in corso..."**: il server è raggiungibile ma la superficie della chat non è stata ancora catturata. Attendere qualche secondo affinché la connessione CDP venga inizializzata.

## Domande frequenti

**Funziona su iOS e Android?**
SÌ. L'interfaccia utente mobile funziona con qualsiasi browser mobile moderno: Safari su iOS, Chrome su Android e altri funzionano tutti.

**Funziona su cellulare o VPN?**
Non per impostazione predefinita: il server è solo LAN. Per l'accesso remoto dovresti esporlo attraverso un tunnel come ngrok. L'autenticazione del token e HTTPS rimangono comunque attivi.

**L'avviso del certificato autofirmato è sicuro da accettare?**
SÌ. Il certificato viene generato localmente sul tuo computer all'avvio del server. L'avviso viene visualizzato perché non è stato emesso da un'autorità di certificazione pubblica e non perché la connessione non è sicura.

**Posso usarlo per l'automazione?**
SÌ. L'API HTTP locale e il server MCP sono progettati esattamente per questo. Vedere le sezioni [API](#api) e [MCP server](#mcp-server).

## Internazionalizzazione e accessibilità

L'interfaccia mobile rileva automaticamente la lingua del tuo browser ed esegue il rendering in:

Inglese · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

L'arabo viene reso automaticamente da destra a sinistra. Il rilevamento della lingua utilizza `navigator.language` senza necessità di configurazione.

L'interfaccia è costruita con HTML semantico, ruoli ARIA, regioni `aria-live` per lo stato della connessione, navigazione tramite tastiera ed etichette compatibili con lo screen reader ovunque.

## Contribuire

Le richieste di pull sono benvenute. Controlla le TODO nella codebase o apri una discussione su GitHub per discutere idee prima di iniziare grandi modifiche.
Vedere `CONTRIBUTING.md` per le note sulla configurazione e sulle PR.

---

## API

L'estensione espone un'API HTTP locale su `https://localhost:3000` (o la porta configurata). Tutti gli endpoint tranne `/ping` richiedono un'intestazione `Authorization: Bearer <token>`. Il token è il valore dopo `?token=` nell'URL del codice QR.

| Metodo | Punto finale | Descrizione |
| --- | --- | --- |
| OTTENERE | `/ping` | Controllo dello stato: restituisce `pong`. Nessuna autenticazione richiesta. |
| OTTENERE | `/snapshot` | Superficie di chat corrente: HTML, CSS, modalità/modello, `isGenerating`. |
| OTTENERE | `/instances` | Elenca le finestre Antigravity attive. |
| INVIARE | `/instance` | Cambia la finestra attiva. Corpo: `{ "targetId": "..." }` |
| INVIARE | `/send` | Invia un messaggio Corpo: `{ "message": "..." }` |
| INVIARE | `/click` | Fai clic su un elemento dell'interfaccia utente. Corpo: `{ "selector"?, "text"?, "x"?, "y"? }` |
| INVIARE | `/stop` | Interrompi la generazione dell'intelligenza artificiale. |
| INVIARE | `/upload` | Carica un file (multipart/form-data, nome campo `file`). |
| OTTENERE | `/task` | Leggi il documento dell'attività corrente. |
| OTTENERE | `/walkthrough` | Leggi l'attuale documento dettagliato. |
| OTTENERE | `/plan` | Leggi l'attuale piano di attuazione. |

Schema completo: [`openapi.yaml`](openapi.yaml)

## Server MCP

Antigravity Link viene fornito con un server MCP (Model Context Protocol) che consente agli assistenti AI di gestire direttamente la sessione Antigravity.

**Impostare**

Aggiungi quanto segue alla configurazione del tuo client MCP (ad esempio `claude_desktop_config.json`):

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

Sostituisci `<extension-dir>` con il percorso dell'estensione installata:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

Il token è il valore dopo `?token=` nell'URL del codice QR. Il server dell'estensione deve essere in esecuzione prima che il client MCP si connetta.

**Strumenti disponibili**

| Attrezzo | Descrizione |
| --- | --- |
| `get_snapshot` | Ottieni lo stato attuale della chat, la modalità, il modello e lo stato di generazione. |
| `send_message` | Invia un messaggio alla chat attiva. |
| `stop_generation` | Annulla la generazione attiva dell'IA. |
| `get_instances` | Elenca le finestre Antigravity disponibili. |
| `switch_instance` | Passa a una finestra Antigravity diversa. |
| `click_element` | Fai clic su un elemento dell'interfaccia utente tramite selettore, testo o coordinate. |
| `get_task` | Leggi il documento dell'attività corrente. |
| `get_walkthrough` | Leggi l'attuale documento dettagliato. |
| `get_plan` | Leggi l'attuale piano di attuazione. |

## Risorse autonome e risorse dell'area di lavoro

Questa estensione è autonoma. Viene fornito con le proprie risorse `public/` e la cartella `uploads/` e non richiede la build `npm run dev` principale.

Se il tuo *spazio di lavoro* contiene `public/` o `uploads/`, l'estensione preferirà automaticamente tali percorsi. Ciò semplifica la personalizzazione dell'interfaccia utente mobile o il mantenimento dei caricamenti nella radice del progetto, ma significa anche che il comportamento può differire tra le aree di lavoro.

---

## Storia delle stelle

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## Ringraziamenti

Ispirato dai primi progetti della comunità, tra cui:
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat
