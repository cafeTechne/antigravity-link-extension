# Antigravity Link (Extension VS Code)

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Lire dans votre langue :**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

---

Dépôt GitHub : https://github.com/cafeTechne/antigravity-link-extension

Open VSX : https://open-vsx.org/extension/cafetechne/antigravity-link-extension

Accédez à vos sessions Antigravity depuis votre téléphone. Téléversez des fichiers, dictez des prompts, arrêtez la génération et gérez plusieurs chats Antigravity actifs depuis une interface adaptée au mobile — ou automatisez-les via MCP ou l'API HTTP locale.

## À qui s'adresse cette extension ?

- Les équipes souhaitant un compagnon mobile simple et sécurisé pour l'IDE Antigravity de Google.
- Les utilisateurs avancés qui veulent des téléversements rapides et la saisie vocale en déplacement.
- Les développeurs souhaitant automatiser ou intégrer des sessions Antigravity via API ou MCP.
- Les développeurs débutants voulant interagir avec une session Antigravity en cours sans aucune configuration.

## Ce que vous obtenez

- Miroir en direct du chat Antigravity actif — lisez et interagissez depuis votre téléphone.
- Téléversement de fichiers dans le chat Antigravity actif.
- Saisie vocale depuis le mobile (HTTPS requis pour les permissions du microphone).
- Arrêt de la génération depuis votre téléphone avec un bouton dédié.
- Basculement entre les instances actives pour plusieurs fenêtres Antigravity.
- API HTTP locale pour l'automatisation et les intégrations.
- Serveur MCP pour l'intégration d'assistants IA.
- Serveur local uniquement avec authentification par token.
- Interface disponible en 16 langues avec détection automatique et support RTL.

## Démarrage rapide

1) Démarrez Antigravity avec le débogage distant activé. C'est indispensable ; les sessions lancées sans ce paramètre ne sont pas détectables par l'extension.

Exemple (Windows) :
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

2) Dans VS Code, exécutez : `Antigravity Link: Start Server`

3) Puis exécutez : `Antigravity Link: Show QR Code`

4) Scannez le QR code avec votre téléphone. L'interface mobile est prête.

5) Votre téléphone peut avertir que la connexion n'est pas sécurisée, car le certificat est auto-signé. C'est attendu pour HTTPS local. Utilisez l'option « Avancé » de votre navigateur pour continuer.

## Commandes

| Commande | Description |
| --- | --- |
| Antigravity Link: Start Server | Démarre le serveur bridge local. |
| Antigravity Link: Stop Server | Arrête le serveur. |
| Antigravity Link: Show QR Code | Affiche le QR code de connexion. |
| Antigravity Link: Select Network Interface | Choisit l'interface réseau annoncée dans l'URL du QR. |

## API

L'extension expose une API HTTP locale sur `https://localhost:3000`. Tous les points de terminaison sauf `/ping` nécessitent un en-tête `Authorization: Bearer <token>`.

| Méthode | Point de terminaison | Description |
| --- | --- | --- |
| GET | `/ping` | Vérification de l'état. Aucune authentification requise. |
| GET | `/snapshot` | Interface de chat actuelle : HTML, CSS, mode/modèle, isGenerating. |
| GET | `/instances` | Liste les fenêtres Antigravity actives. |
| POST | `/instance` | Change la fenêtre active. Corps : `{ "targetId": "..." }` |
| POST | `/send` | Envoie un message. Corps : `{ "message": "..." }` |
| POST | `/click` | Clique sur un élément d'interface. Corps : `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | Arrête la génération IA. |
| POST | `/upload` | Téléverse un fichier (multipart/form-data). |
| GET | `/task` | Lit le document de tâche en cours. |
| GET | `/walkthrough` | Lit le document de procédure en cours. |
| GET | `/plan` | Lit le plan d'implémentation en cours. |

Schéma complet : [`openapi.yaml`](openapi.yaml)

## Serveur MCP

Ajoutez à la configuration de votre client MCP :

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

Outils disponibles : `get_snapshot`, `send_message`, `stop_generation`, `get_instances`, `switch_instance`, `click_element`, `get_task`, `get_walkthrough`, `get_plan`

## Sécurité et confidentialité

- Le serveur s'exécute localement et est authentifié par token.
- HTTPS est activé par défaut pour permettre l'accès au microphone sur mobile.
- Cette extension n'envoie aucune donnée à des services tiers.

## Dépannage

- **Aucune instance trouvée** : Assurez-vous que chaque fenêtre Antigravity a été lancée avec `--remote-debugging-port`.
- **Impossible de se connecter depuis le mobile** : Vérifiez que votre téléphone et votre ordinateur sont sur le même réseau.
- **Bloqué sur « Initialisation… »** : Attendez quelques secondes le temps que la connexion CDP s'initialise.

## Internationalisation et accessibilité

L'interface mobile détecte automatiquement la langue de votre navigateur et s'affiche en :
English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

L'arabe est rendu de droite à gauche. La détection de langue utilise `navigator.language` sans aucune configuration requise.

## Contribuer

Nous acceptons les pull requests et recherchons activement des contributeurs.
Consultez `CONTRIBUTING.md` pour les instructions de configuration et les notes sur les PR.

## Licence

MIT. Voir `LICENSE`.
