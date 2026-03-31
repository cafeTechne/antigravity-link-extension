# Antigravity Link (Extensão para VS Code)

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Leia no seu idioma:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

---

Repositório no GitHub: https://github.com/cafeTechne/antigravity-link-extension

Open VSX: https://open-vsx.org/extension/cafetechne/antigravity-link-extension

Leve suas sessões do Antigravity para o celular. Envie arquivos, dite prompts, pare a geração e controle múltiplos chats ativos do Antigravity por uma interface amigável para dispositivos móveis — ou automatize tudo via MCP ou pela API HTTP local.

## Para quem é isso

- Times que querem um companheiro mobile simples e seguro para o IDE Antigravity do Google.
- Usuários avançados que querem uploads rápidos e ditado de voz em qualquer lugar.
- Desenvolvedores que querem automatizar ou integrar sessões do Antigravity via API ou MCP.
- Desenvolvedores iniciantes que querem interagir com uma sessão do Antigravity sem nenhuma configuração.

## O que você ganha

- Espelho ao vivo do chat ativo do Antigravity — leia e interaja pelo celular.
- Upload de arquivos para o chat ativo do Antigravity.
- Entrada de voz para texto pelo celular (HTTPS obrigatório para permissão do microfone).
- Parar a geração pelo celular com um botão dedicado.
- Alternância entre instâncias ativas com múltiplas janelas do Antigravity.
- API HTTP local para automação e integrações.
- Servidor MCP para integração com assistentes de IA.
- Servidor local com autenticação por token.
- Interface disponível em 16 idiomas com detecção automática e suporte a RTL.

## Início rápido

1) Inicie o Antigravity com a depuração remota ativada. Isso é obrigatório; sessões iniciadas sem esse parâmetro não são detectáveis pela extensão.

Exemplo (Windows):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

2) No VS Code, execute: `Antigravity Link: Start Server`

3) Em seguida, execute: `Antigravity Link: Show QR Code`

4) Escaneie o QR code com o seu celular. A interface mobile está pronta.

5) Seu celular pode alertar que a conexão não é segura, pois o certificado é autoassinado. Isso é esperado para HTTPS local. Use a opção «Avançado» do navegador para continuar.

## Comandos

| Comando | Descrição |
| --- | --- |
| Antigravity Link: Start Server | Inicia o servidor bridge local. |
| Antigravity Link: Stop Server | Para o servidor. |
| Antigravity Link: Show QR Code | Exibe o QR code de conexão. |
| Antigravity Link: Select Network Interface | Escolhe qual interface de rede é anunciada na URL do QR. |

## API

A extensão expõe uma API HTTP local em `https://localhost:3000`. Todos os endpoints, exceto `/ping`, exigem o cabeçalho `Authorization: Bearer <token>`.

| Método | Endpoint | Descrição |
| --- | --- | --- |
| GET | `/ping` | Verificação de saúde. Sem autenticação. |
| GET | `/snapshot` | Interface de chat atual: HTML, CSS, modo/modelo, isGenerating. |
| GET | `/instances` | Lista as janelas ativas do Antigravity. |
| POST | `/instance` | Alterna a janela ativa. Corpo: `{ "targetId": "..." }` |
| POST | `/send` | Envia uma mensagem. Corpo: `{ "message": "..." }` |
| POST | `/click` | Clica em um elemento da interface. Corpo: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | Para a geração de IA. |
| POST | `/upload` | Envia um arquivo (multipart/form-data). |
| GET | `/task` | Lê o documento de tarefa atual. |
| GET | `/walkthrough` | Lê o documento de passo a passo atual. |
| GET | `/plan` | Lê o plano de implementação atual. |

Schema completo: [`openapi.yaml`](openapi.yaml)

## Servidor MCP

Adicione à configuração do seu cliente MCP:

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

Ferramentas disponíveis: `get_snapshot`, `send_message`, `stop_generation`, `get_instances`, `switch_instance`, `click_element`, `get_task`, `get_walkthrough`, `get_plan`

## Segurança e privacidade

- O servidor roda localmente e é autenticado por token.
- HTTPS está habilitado por padrão para permitir o acesso ao microfone no celular.
- Esta extensão não envia nenhum dado para serviços de terceiros.

## Solução de problemas

- **Nenhuma instância encontrada**: Certifique-se de que todas as janelas do Antigravity foram iniciadas com `--remote-debugging-port`.
- **Não consigo conectar pelo celular**: Verifique se o celular e o computador estão na mesma rede.
- **Travado em "Inicializando…"**: Aguarde alguns segundos para a conexão CDP ser inicializada.

## Internacionalização e acessibilidade

A interface mobile detecta automaticamente o idioma do navegador e exibe em:
English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

O árabe é exibido da direita para a esquerda. A detecção de idioma usa `navigator.language` sem nenhuma configuração necessária.

## Contribuindo

Aceitamos pull requests e estamos ativamente buscando colaboradores.
Veja `CONTRIBUTING.md` para instruções de configuração e notas sobre PRs.

## Licença

MIT. Veja `LICENSE`.
