
# Antigravity Link (extension VS Code)

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Lisez ceci dans votre langue :**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **Quoi de neuf dans la version 1.0.13** — Arrêtez la génération à partir d'un mobile, serveur MCP + spécification OpenAPI, interface utilisateur en 15 langues, améliorations du téléchargement de fichiers. Voir [CHANGELOG](CHANGELOG.md).

---

## Contenu

- [Démo](#démo)
- [Ce que vous obtenez](#ce-que-vous-obtenez)
- [Installation](#installation)
- [Conditions préalables](#conditions-préalables)
- [Démarrage rapide](#démarrage-rapide)
- [Commandes](#commandes)
- [Paramètres](#paramètres)
- [Pour les constructeurs d'agents](#pour-les-constructeurs-dagents)
- [Comment ça marche](#comment-ça-marche-haut-niveau)
- [Sécurité du compte](#sécurité-du-compte)
- [Dépannage](#dépannage)
- [FAQ](#faq)
- [Internationalisation et accessibilité](#internationalisation-et-accessibilité)
- [Contribuer](#contribuer)
- [Référence API](#api)
- [Référence du serveur MCP](#serveur-mcp)

---

Vous exécutez une session Antigravity et devez vous éloigner de votre bureau. L’IA est de mi-génération. Vous souhaitez le surveiller, le rediriger, télécharger un fichier ou simplement lire ce qu'il a écrit, depuis votre téléphone, sans revenir sur votre ordinateur.

Antigravity Link rend cela possible. Scannez un code QR et votre téléphone devient un miroir en direct du chat actif : lisez les réponses pendant leur diffusion, envoyez des messages, arrêtez la génération, téléchargez des fichiers, dictez par la voix et basculez entre plusieurs fenêtres Antigravity, le tout à partir d'un navigateur mobile, sur votre réseau local.

Pour l'automatisation, l'extension expose également une API HTTP locale et un serveur MCP afin que les agents et les outils externes puissent piloter les sessions Antigravity par programme.

## Démo

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

<details>
<summary>Captures d'écran</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

</details>

## Ce que vous obtenez

- Miroir en direct du chat Antigravity actif : lisez et interagissez depuis votre téléphone.
- Téléchargez le fichier dans le chat Antigravity actif.
- Saisie voix-texte depuis un mobile (HTTPS requis pour les autorisations du micro).
- Arrêtez la génération depuis votre téléphone avec une puce d'arrêt dédiée.
- Commutation d'instance active pour plusieurs fenêtres Antigravity.
- API HTTP locale pour l'automatisation et les intégrations (voir [API](#api)).
- Serveur MCP pour l'intégration de l'assistant AI (voir [MCP server](#mcp-server)).
- Serveur local uniquement avec authentification par jeton.
- Interface disponible en 16 langues avec détection automatique et support RTL.

## Installation

Installez à partir du marché des extensions Antigravity – recherchez **Antigravity Link** – ou [install directly from Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension).

## Conditions préalables

- **Antigravity IDE** installé et en cours d'exécution.
- **Un téléphone et un ordinateur sur le même réseau Wi-Fi.**
- **Antigravity lancé avec l'indicateur de débogage à distance.** Ceci est requis pour que l'extension découvre et se connecte à votre session. Voir la commande de lancement dans Démarrage rapide ci-dessous.

## Démarrage rapide

1) Démarrez Antigravity avec le débogage à distance activé. Ceci est obligatoire ; les sessions lancées sans cet indicateur ne sont pas détectables par l'extension.

**Windows** (raccourci du menu Démarrer) :
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

**macOS :**
```bash
open -a Antigravity --args --remote-debugging-port=9000
```

**Linux :**
```bash
antigravity --remote-debugging-port=9000
```

Plusieurs sessions Antigravity sont prises en charge, mais chaque fenêtre doit être lancée avec cette commande.

2) Dans VS Code, exécutez :
`Antigravity Link: Start Server`

3) Puis exécutez :
`Antigravity Link: Show QR Code`

4) Scannez le code QR avec votre téléphone. Votre interface utilisateur mobile est prête.

5) Votre téléphone peut vous avertir que la connexion n'est pas sécurisée car le certificat est auto-signé. Ceci est attendu pour le HTTPS local. Utilisez l'option « Avancé » de votre navigateur ou une option similaire pour continuer (la formulation diffère entre Safari/Chrome/Firefox).

## Commandes

| Commande | Description |
| --- | --- |
| Antigravity Link: Start Server | Démarre le serveur de pont local. |
| Antigravity Link: Stop Server | Arrête le serveur. |
| Antigravity Link: Show QR Code | Affiche le code de connexion QR. |
| Antigravity Link: Select Network Interface | Choisissez l'interface réseau annoncée par l'URL QR. |

## Paramètres

| Paramètre | Défaut | Description |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | Port pour le serveur de pont local. |
| `antigravityLink.autoStart` | `false` | Démarrez le serveur au lancement de VS Code. |
| `antigravityLink.useHttps` | `true` | Servir sur HTTPS pour l'accès au micro. |
| `antigravityLink.preferredHost` | `""` | LAN IPv4 en option pour annoncer dans l'URL QR (exemple : `192.168.1.101`). |
| `antigravityLink.strictWorkbenchOnly` | `true` | Liez-vous uniquement aux cibles `workbench.html` CDP pour plus de stabilité. |
| `antigravityLink.includeFallbackTargets` | `false` | Autoriser les cibles de secours du jetski/lancement lorsque le mode strict est désactivé. |

## Pour les constructeurs d'agents

Si vous souhaitez intégrer rapidement, utilisez cette séquence :

1) Démarrez le serveur d'extension et copiez le jeton à partir de l'URL QR (`?token=...`).
2) Utilisez soit les outils MCP (`mcp-server.mjs`), soit des appels HTTP directs vers `https://localhost:3000`.
3) Validez le flux de contrôle avec `/snapshot`, `/send` et `/stop`.

Exemple OpenAPI :

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

Exemple de configuration client MCP :

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

Remplacez `<extension-dir>` par le chemin d'accès à l'extension installée :
- **Windows :** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux :** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

## Comment ça marche (haut niveau)

- L'extension démarre un serveur local (HTTP ou HTTPS).
- Il découvre les cibles Antigravity via le protocole Chrome DevTools (CDP).
- Votre téléphone se connecte à l'interface utilisateur mobile et envoie des demandes de téléchargement/commande.
- L'extension s'injecte dans la cible de discussion sélectionnée et enregistre les fichiers sur `uploads/`.

## Sécurité du compte

Antigravity Link n’a aucun cas d’interdiction connu et est conçu pour le rester.

L'extension fonctionne en se connectant à un port de débogage que Antigravity expose sur votre propre machine – le même protocole Chrome DevTools utilisé par le débogueur et les outils de développement de navigateur intégrés de VS Code. Il lit votre interface utilisateur locale et simule les pressions et les clics sur les touches, exactement comme si vous étiez assis devant votre clavier.

Ce que cela signifie en pratique :
- **Aucune demande n'est adressée aux serveurs de Google** au-delà de ce que Antigravity envoie déjà. L'extension n'a pas d'accès au réseau en dehors de votre réseau local.
- **Rien n'est injecté dans le trafic réseau de Antigravity.** L'extension lit votre écran et tape dans votre éditeur — elle n'intercepte ni ne modifie les appels API.
- **Aucun fichier Antigravity n'est modifié.** Il n'y a aucun correctif, hook ou modification binaire.
- **Le serveur s'exécute entièrement sur votre ordinateur.** Vos invites, votre historique de discussion et vos fichiers ne quittent jamais votre réseau local, sauf si vous exposez explicitement le serveur en externe.
- **Aucune donnée n'est envoyée à des services tiers** par cette extension.

Le code source est sous licence MIT et entièrement auditable : https://github.com/cafeTechne/antigravity-link-extension

## Dépannage

- **Aucune instance trouvée** : assurez-vous que chaque fenêtre Antigravity a été lancée avec la commande `--remote-debugging-port` indiquée ci-dessus.
- **Impossible de se connecter depuis un mobile** : assurez-vous que votre téléphone et votre ordinateur sont sur le même réseau.
- **Les téléchargements sont enregistrés mais n'apparaissent pas dans le chat** : passez à l'instance active appropriée dans l'interface utilisateur mobile.
- **Bloqué sur « Initialisation… »** : Le serveur est accessible mais la surface de discussion n'a pas encore été capturée. Attendez quelques secondes que la connexion CDP s'initialise.

## FAQ

**Est-ce que cela fonctionne sur iOS et Android ?**
Oui. L'interface utilisateur mobile fonctionne dans n'importe quel navigateur mobile moderne : Safari sur iOS, Chrome sur Android et d'autres fonctionnent tous.

**Est-ce que cela fonctionne sur cellulaire ou VPN ?**
Pas par défaut : le serveur est uniquement LAN. Pour un accès à distance, vous devrez l'exposer via un tunnel tel que ngrok. L'authentification par jeton et HTTPS restent en place malgré tout.

**L'avertissement du certificat auto-signé peut-il être accepté en toute sécurité ?**
Oui. Le certificat est généré localement sur votre machine au démarrage du serveur. L'avertissement apparaît car il n'est pas émis par une autorité de certification publique, et non parce que la connexion n'est pas sécurisée.

**Puis-je l'utiliser pour l'automatisation ?**
Oui. L'API HTTP locale et le serveur MCP sont conçus exactement pour cela. Voir les sections [API](#api) et [MCP server](#mcp-server).

## Internationalisation et accessibilité

L'interface mobile détecte automatiquement la langue de votre navigateur et s'affiche dans :

English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

L’arabe est automatiquement rendu de droite à gauche. La détection de langue utilise `navigator.language` sans configuration requise.

L'interface est construite avec du HTML sémantique, des rôles ARIA, des régions `aria-live` pour l'état de connexion, la navigation au clavier et des étiquettes compatibles avec les lecteurs d'écran.

## Contribuer

Les demandes de tirage sont les bienvenues. Vérifiez les TODO dans la base de code ou ouvrez un ticket GitHub pour discuter des idées avant de commencer des modifications importantes.
Voir `CONTRIBUTING.md` pour les notes de configuration et de relations publiques.

---

## API

L'extension expose une API HTTP locale sur `https://localhost:3000` (ou sur votre port configuré). Tous les points de terminaison, à l'exception de `/ping`, nécessitent un en-tête `Authorization: Bearer <token>`. Le jeton est la valeur après `?token=` dans l'URL du code QR.

| Méthode | Point de terminaison | Description |
| --- | --- | --- |
| OBTENIR | `/ping` | Bilan de santé : renvoie `pong`. Aucune authentification requise. |
| OBTENIR | `/snapshot` | Surface de discussion actuelle : HTML, CSS, mode/modèle, `isGenerating`. |
| OBTENIR | `/instances` | Liste les fenêtres Antigravity actives. |
| POSTE | `/instance` | Changer de fenêtre active. Corps : `{ "targetId": "..." }` |
| POSTE | `/send` | Envoyer un message. Corps : `{ "message": "..." }` |
| POSTE | `/click` | Cliquez sur un élément de l'interface utilisateur. Corps : `{ "selector"?, "text"?, "x"?, "y"? }` |
| POSTE | `/stop` | Arrêtez la génération d’IA. |
| POSTE | `/upload` | Téléchargez un fichier (multipart/form-data, nom de champ `file`). |
| OBTENIR | `/task` | Lisez le document de tâche actuel. |
| OBTENIR | `/walkthrough` | Lisez le document pas à pas actuel. |
| OBTENIR | `/plan` | Lisez le plan de mise en œuvre actuel. |

Schéma complet : [`openapi.yaml`](openapi.yaml)

## Serveur MCP

Antigravity Link est livré avec un serveur MCP (Model Context Protocol) qui permet aux assistants IA de piloter directement votre session Antigravity.

**Installation**

Ajoutez les éléments suivants à la configuration de votre client MCP (par exemple `claude_desktop_config.json`) :

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

Remplacez `<extension-dir>` par le chemin d'accès à l'extension installée :
- **Windows :** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux :** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

Le jeton est la valeur après `?token=` dans l'URL du code QR. Le serveur d'extension doit être en cours d'exécution avant la connexion du client MCP.

**Outils disponibles**

| Outil | Description |
| --- | --- |
| `get_snapshot` | Obtenez l'état actuel du chat, le mode, le modèle et l'état de génération. |
| `send_message` | Envoyez un message au chat actif. |
| `stop_generation` | Annulez la génération d’IA active. |
| `get_instances` | Liste les fenêtres Antigravity disponibles. |
| `switch_instance` | Basculez vers une autre fenêtre Antigravity. |
| `click_element` | Cliquez sur un élément de l'interface utilisateur par sélecteur, texte ou coordonnées. |
| `get_task` | Lisez le document de tâche actuel. |
| `get_walkthrough` | Lisez le document pas à pas actuel. |
| `get_plan` | Lisez le plan de mise en œuvre actuel. |

## Actifs autonomes ou d'espace de travail

Cette extension est autonome. Il est livré avec ses propres actifs `public/` et son dossier `uploads/` et ne nécessite pas la version parent `npm run dev`.

Si votre *espace de travail* contient `public/` ou `uploads/`, l'extension préférera automatiquement ces chemins. Cela facilite la personnalisation de l'interface utilisateur mobile ou la conservation des téléchargements à la racine de votre projet, mais cela signifie également que le comportement peut différer selon les espaces de travail.

---

## Histoire des étoiles

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## Remerciements

Inspiré par les premiers projets communautaires, notamment :
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat
