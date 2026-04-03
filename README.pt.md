
# Antigravity Link (extensão VS Code)

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Leia isto em seu idioma:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **O que há de novo na v1.0.13** — Pare a geração a partir de dispositivos móveis, servidor MCP + especificação OpenAPI, interface de usuário de 15 idiomas, melhorias no upload de arquivos. Consulte [CHANGELOG](CHANGELOG.md).

---

## Conteúdo

- [Demonstração](#demonstração)
- [O que você ganha](#o-que-você-ganha)
- [Instalação](#instalação)
- [Pré-requisitos](#pré-requisitos)
- [Início rápido](#início-rápido)
- [Comandos](#comandos)
- [Configurações](#configurações)
- [Para construtores de agentes](#para-construtores-de-agentes)
- [Como funciona](#como-funciona-alto-nível)
- [Segurança da conta](#segurança-da-conta)
- [Solução de problemas](#solução-de-problemas)
- [Perguntas frequentes](#perguntas-frequentes)
- [Internacionalização e acessibilidade](#internacionalização-e-acessibilidade)
- [Contribuindo](#contribuindo)
- [Referência da API](#api)
- [Referência do servidor MCP](#servidor-mcp)

---

Você está executando uma sessão Antigravity e precisa se afastar de sua mesa. A IA está no meio da geração. Você deseja monitorá-lo, redirecioná-lo, fazer upload de um arquivo ou apenas ler o que ele escreveu – do seu telefone, sem precisar voltar ao seu computador.

Antigravity Link torna isso possível. Digitalize um código QR e seu telefone se tornará um espelho ao vivo do bate-papo ativo: leia as respostas enquanto elas são transmitidas, envie mensagens, interrompa a geração, carregue arquivos, dite por voz e alterne entre várias janelas Antigravity - tudo a partir de um navegador móvel, em sua rede local.

Para automação, a extensão também expõe uma API HTTP local e um servidor MCP para que agentes e ferramentas externas possam conduzir sessões Antigravity programaticamente.

## Demonstração

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

<details>
<summary>Capturas de tela</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

</details>

## O que você ganha

- Espelho ao vivo do bate-papo ativo do Antigravity - leia e interaja no seu telefone.
- Upload de arquivo no chat Antigravity ativo.
- Entrada de voz para texto do celular (é necessário HTTPS para permissões de microfone).
- Pare a geração do seu telefone com um chip de parada dedicado.
- Troca de instância ativa para múltiplas janelas Antigravity.
- API HTTP local para automação e integrações (consulte [API](#api)).
- Servidor MCP para integração do assistente de IA (consulte [MCP server](#mcp-server)).
- Servidor somente local com autenticação de token.
- Interface disponível em 16 idiomas com detecção automática e suporte RTL.

## Instalação

Instale a partir do mercado de extensões Antigravity – pesquise **Antigravity Link** – ou [install directly from Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension).

## Pré-requisitos

- **IDE Antigravity** instalado e em execução.
- **Um telefone e um computador na mesma rede Wi-Fi.**
- **Antigravity iniciado com o sinalizador de depuração remota.** Isso é necessário para que a extensão descubra e se conecte à sua sessão. Veja o comando de inicialização no Início rápido abaixo.

## Início rápido

1) Inicie Antigravity com depuração remota habilitada. Isso é obrigatório; sessões iniciadas sem esse sinalizador não podem ser descobertas pela extensão.

**Windows** (atalho do menu Iniciar):
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

Várias sessões Antigravity são suportadas, mas cada janela deve ser iniciada com este comando.

2) Em VS Code, execute:
`Antigravity Link: Start Server`

3) Então execute:
`Antigravity Link: Show QR Code`

4) Digitalize o código QR com seu telefone. Sua IU móvel está pronta.

5) Seu telefone pode avisar que a conexão não é segura porque o certificado é autoassinado. Isso é esperado para HTTPS local. Use a opção "Avançado" ou semelhante do seu navegador para continuar (o texto difere entre Safari/Chrome/Firefox).

## Comandos

| Comando | Descrição |
| --- | --- |
| Antigravity Link: Start Server | Inicia o servidor bridge local. |
| Antigravity Link: Stop Server | Para o servidor. |
| Antigravity Link: Show QR Code | Exibe o código de conexão QR. |
| Antigravity Link: Select Network Interface | Escolha qual interface de rede o URL QR anuncia. |

## Configurações

| Contexto | Padrão | Descrição |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | Porta para o servidor bridge local. |
| `antigravityLink.autoStart` | `false` | Inicie o servidor na inicialização do VS Code. |
| `antigravityLink.useHttps` | `true` | Servir em HTTPS para acesso ao microfone. |
| `antigravityLink.preferredHost` | `""` | LAN IPv4 opcional para anunciar na URL QR (exemplo: `192.168.1.101`). |
| `antigravityLink.strictWorkbenchOnly` | `true` | Vincule-se apenas aos alvos `workbench.html` CDP para estabilidade. |
| `antigravityLink.includeFallbackTargets` | `false` | Permitir alvos substitutos do jetski/launchpad quando o modo estrito estiver desativado. |

## Para construtores de agentes

Se você deseja integrar rapidamente, use esta sequência:

1) Inicie o servidor de extensão e copie o token da URL QR (`?token=...`).
2) Use ferramentas MCP (`mcp-server.mjs`) ou chamadas HTTP diretas contra `https://localhost:3000`.
3) Valide o fluxo de controle com `/snapshot`, `/send` e `/stop`.

Exemplo de OpenAPI:

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

Exemplo de configuração do cliente MCP:

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

Substitua `<extension-dir>` pelo caminho para a extensão instalada:
- **Janelas:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

## Como funciona (alto nível)

- A extensão inicia um servidor local (HTTP ou HTTPS).
- Ele descobre alvos Antigravity por meio do protocolo Chrome DevTools (CDP).
- Seu telefone se conecta à interface móvel e envia solicitações de upload/comando.
- A extensão é injetada no alvo de bate-papo selecionado e salva os arquivos em `uploads/`.

## Segurança da conta

Antigravity Link não tem casos de banimento conhecidos e foi projetado para permanecer assim.

A extensão funciona conectando-se a uma porta de depuração que Antigravity expõe em sua própria máquina - o mesmo protocolo Chrome DevTools usado pelo depurador integrado do VS Code e pelas ferramentas de desenvolvimento do navegador. Ele lê sua UI local e simula pressionamentos de teclas e cliques, exatamente como se você estivesse sentado em frente ao teclado.

O que isso significa na prática:
- **Nenhuma solicitação é feita aos servidores do Google** além do que Antigravity já envia. A extensão não tem acesso à rede fora da sua LAN.
- **Nada é injetado no tráfego de rede do Antigravity.** A extensão lê sua tela e digita em seu editor — ela não intercepta ou modifica chamadas de API.
- **Nenhum arquivo Antigravity é modificado.** Não há patches, ganchos ou modificações binárias.
- **O servidor é executado inteiramente em sua máquina.** Seus prompts, histórico de bate-papo e arquivos nunca saem de sua rede local, a menos que você exponha explicitamente o servidor externamente.
- **Nenhum dado é enviado a serviços de terceiros** por esta extensão.

O código-fonte é licenciado pela MIT e totalmente auditável: https://github.com/cafeTechne/antigravity-link-extension

## Solução de problemas

- **Nenhuma instância encontrada**: certifique-se de que cada janela Antigravity foi iniciada com o comando `--remote-debugging-port` mostrado acima.
- **Não é possível conectar-se pelo celular**: verifique se o telefone e o computador estão na mesma rede.
- **Os uploads são salvos, mas não aparecem no bate-papo**: alterne para a instância ativa correta na interface móvel.
- **Travado em "Inicializando…"**: O servidor está acessível, mas a superfície de bate-papo ainda não foi capturada. Aguarde alguns segundos para que a conexão CDP seja inicializada.

## Perguntas frequentes

**Isso funciona em iOS e Android?**
Sim. A IU móvel é executada em qualquer navegador móvel moderno – Safari no iOS, Chrome no Android e outros funcionam.

**Isso funciona por celular ou VPN?**
Não por padrão — o servidor é somente LAN. Para acesso remoto, você precisaria expô-lo através de um túnel como o ngrok. A autenticação de token e HTTPS permanecem em vigor independentemente.

**É seguro aceitar o aviso de certificado autoassinado?**
Sim. O certificado é gerado localmente na sua máquina na inicialização do servidor. O aviso aparece porque não foi emitido por uma autoridade de certificação pública e não porque a conexão seja insegura.

**Posso usar isso para automação?**
Sim. A API HTTP local e o servidor MCP foram projetados exatamente para isso. Consulte as seções [API](#api) e [MCP server](#mcp-server).

## Internacionalização e acessibilidade

A interface móvel detecta automaticamente o idioma do seu navegador e é renderizada em:

Inglês · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

O árabe é renderizado automaticamente da direita para a esquerda. A detecção de idioma usa `navigator.language` sem necessidade de configuração.

A interface é construída com HTML semântico, funções ARIA, regiões `aria-live` para status de conexão, navegação por teclado e rótulos compatíveis com leitor de tela.

## Contribuindo

Solicitações pull são bem-vindas. Verifique os TODOs na base de código ou abra um problema no GitHub para discutir ideias antes de iniciar grandes mudanças.
Consulte `CONTRIBUTING.md` para configuração e notas de relações públicas.

---

## API

A extensão expõe uma API HTTP local em `https://localhost:3000` (ou na porta configurada). Todos os terminais, exceto `/ping`, requerem um cabeçalho `Authorization: Bearer <token>`. O token é o valor após `?token=` no URL do código QR.

| Método | Ponto final | Descrição |
| --- | --- | --- |
| PEGAR | `/ping` | Verificação de integridade — retorna `pong`. Não é necessária autenticação. |
| PEGAR | `/snapshot` | Superfície de bate-papo atual: HTML, CSS, modo/modelo, `isGenerating`. |
| PEGAR | `/instances` | Listar janelas Antigravity ativas. |
| PUBLICAR | `/instance` | Alternar janela ativa. Corpo: `{ "targetId": "..." }` |
| PUBLICAR | `/send` | Envie uma mensagem. Corpo: `{ "message": "..." }` |
| PUBLICAR | `/click` | Clique em um elemento da IU. Corpo: `{ "selector"?, "text"?, "x"?, "y"? }` |
| PUBLICAR | `/stop` | Pare a geração de IA. |
| PUBLICAR | `/upload` | Carregue um arquivo (multipart/form-data, nome de campo `file`). |
| PEGAR | `/task` | Leia o documento da tarefa atual. |
| PEGAR | `/walkthrough` | Leia o documento passo a passo atual. |
| PEGAR | `/plan` | Leia o plano de implementação atual. |

Esquema completo: [`openapi.yaml`](openapi.yaml)

## Servidor MCP

Antigravity Link fornece um servidor MCP (Model Context Protocol) que permite que assistentes de IA conduzam sua sessão Antigravity diretamente.

**Configurar**

Adicione o seguinte à configuração do cliente MCP (por exemplo, `claude_desktop_config.json`):

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

Substitua `<extension-dir>` pelo caminho para a extensão instalada:
- **Janelas:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

O token é o valor após `?token=` no URL do código QR. O servidor de extensão deve estar em execução antes que o cliente MCP se conecte.

**Ferramentas disponíveis**

| Ferramenta | Descrição |
| --- | --- |
| `get_snapshot` | Obtenha o estado atual do chat, modo, modelo e status de geração. |
| `send_message` | Envie uma mensagem para o chat ativo. |
| `stop_generation` | Cancele a geração de IA ativa. |
| `get_instances` | Liste as janelas Antigravity disponíveis. |
| `switch_instance` | Mude para uma janela Antigravity diferente. |
| `click_element` | Clique em um elemento da UI por seletor, texto ou coordenadas. |
| `get_task` | Leia o documento da tarefa atual. |
| `get_walkthrough` | Leia o documento passo a passo atual. |
| `get_plan` | Leia o plano de implementação atual. |

## Ativos autônomos versus ativos de espaço de trabalho

Esta extensão é independente. Ele envia seus próprios ativos `public/` e pasta `uploads/` e não requer a construção `npm run dev` pai.

Se o seu *espaço de trabalho* contiver `public/` ou `uploads/`, a extensão preferirá esses caminhos automaticamente. Isso facilita a personalização da interface móvel ou a manutenção de uploads na raiz do projeto, mas também significa que o comportamento pode diferir entre os espaços de trabalho.

---

## História da estrela

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## Agradecimentos

Inspirado nos primeiros projetos comunitários, incluindo:
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat
