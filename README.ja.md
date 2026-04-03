
# Antigravity Link (VS Code 拡張子)

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**これをあなたの言語で読んでください:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **v1.0.13 の新機能** — モバイルからの生成の停止、MCP サーバー + OpenAPI 仕様、15 言語の UI、ファイル アップロードの改善。 [CHANGELOG](CHANGELOG.md)を参照してください。

---

## コンテンツ

- [デモ](#デモ)
- [得られるもの](#得られるもの)
- [インストール](#インストール)
- [前提条件](#前提条件)
- [クイックスタート](#クイックスタート)
- [コマンド](#コマンド)
- [設定](#設定)
- [エージェントビルダー向け](#エージェントビルダー向け)
- [仕組み](#仕組み-ハイレベル)
- [アカウントの安全性](#アカウントの安全性)
- [トラブルシューティング](#トラブルシューティング)
- [よくある質問](#よくある質問)
- [国際化とアクセシビリティ](#国際化とアクセシビリティ)
- [貢献する](#貢献する)
- [APIリファレンス](#api)
- [MCP サーバーリファレンス](#mcpサーバー)

---

Antigravity セッションを実行しているため、デスクから離れる必要があります。 AIは中世代です。コンピューターに戻らずに、携帯電話からそれを監視したり、リダイレクトしたり、ファイルをアップロードしたり、単にその内容を読んだりしたいと考えています。

Antigravity Link はそれを可能にします。 QR コードをスキャンすると、携帯電話がアクティブなチャットのライブ ミラーになります。ストリーム中の応答の読み取り、メッセージの送信、生成の停止、ファイルのアップロード、音声によるディクテーション、複数の Antigravity ウィンドウの切り替えがすべて、モバイル ブラウザーからローカル ネットワーク上で実行できます。

自動化のために、この拡張機能はローカル HTTP API と MCP サーバーも公開するため、エージェントと外部ツールがプログラムで Antigravity セッションを駆動できるようになります。

## デモ

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

<details>
<summary>スクリーンショット</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

</details>

## 得られるもの

- アクティブな Antigravity チャットのライブ ミラー - 携帯電話から読み取り、対話します。
- アクティブな Antigravity チャットにファイルをアップロードします。
- モバイルからの音声からテキストへの入力 (マイクの許可には HTTPS が必要)。
- 専用の停止チップを使用して携帯電話からの生成を停止します。
- 複数の Antigravity ウィンドウのアクティブ インスタンスの切り替え。
- 自動化と統合のためのローカル HTTP API ([API](#api) を参照)。
- AI アシスタント統合用の MCP サーバー ([MCP server](#mcp-server) を参照)。
- トークン認証を備えたローカル専用サーバー。
- 自動検出および RTL サポートを備えたインターフェースは 16 言語で利用可能です。

## インストール

Antigravity 拡張機能マーケットプレイス (**Antigravity Link** を検索) または [install directly from Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension) からインストールします。

## 前提条件

- **Antigravity IDE** がインストールされ、実行されています。
- **同じ Wi-Fi ネットワーク上の電話とコンピュータ。**
- **Antigravity はリモート デバッグ フラグを使用して起動されました。** これは、拡張機能がセッションを検出して接続するために必要です。以下のクイック スタートの起動コマンドを参照してください。

## クイックスタート

1) リモート デバッグを有効にして Antigravity を起動します。これは必須です。このフラグなしで起動されたセッションは、拡張機能では検出できません。

**Windows** (スタート メニューのショートカット):
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

複数の Antigravity セッションがサポートされていますが、すべてのウィンドウをこのコマンドで起動する必要があります。

2) VS Code で、次を実行します。
`Antigravity Link: Start Server`

3) 次に、次を実行します。
`Antigravity Link: Show QR Code`

4) 携帯電話で QR コードをスキャンします。モバイル UI の準備が整いました。

5) 証明書が自己署名されているため、接続が安全ではないことが電話機から警告される場合があります。これはローカルの HTTPS で想定されています。ブラウザの「詳細」または同様のオプションを使用して続行します (表現は Safari/Chrome/Firefox で異なります)。

## コマンド

| 指示 | 説明 |
| --- | --- |
| Antigravity Link: Start Server | ローカルブリッジサーバーを起動します。 |
| Antigravity Link: Stop Server | サーバーを停止します。 |
| Antigravity Link: Show QR Code | 接続QRコードを表示します。 |
| Antigravity Link: Select Network Interface | QR URL がアドバタイズするネットワーク インターフェイスを選択します。 |

## 設定

| 設定 | デフォルト | 説明 |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | ローカルブリッジサーバーのポート。 |
| `antigravityLink.autoStart` | `false` | VS Code 起動時にサーバーを起動します。 |
| `antigravityLink.useHttps` | `true` | マイクにアクセスするには、HTTPS 経由で配信します。 |
| `antigravityLink.preferredHost` | `""` | QR URL でアドバタイズするオプションの LAN IPv4 (例: `192.168.1.101`)。 |
| `antigravityLink.strictWorkbenchOnly` | `true` | 安定性を確保するために、`workbench.html` CDP ターゲットにのみバインドします。 |
| `antigravityLink.includeFallbackTargets` | `false` | 厳密モードが無効な場合、ジェットスキー/ランチパッドのフォールバック ターゲットを許可します。 |

## エージェントビルダー向け

迅速に統合したい場合は、次のシーケンスを使用します。

1) 拡張機能サーバーを起動し、QR URL (`?token=...`) からトークンをコピーします。
2) MCP ツール (`mcp-server.mjs`) を使用するか、`https://localhost:3000` に対して直接 HTTP 呼び出しを使用します。
3) `/snapshot`、`/send`、および `/stop` を使用して制御フローを検証します。

OpenAPI の例:

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

MCP クライアント構成例:

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

`<extension-dir>` を、インストールされている拡張機能へのパスに置き換えます。
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

## 仕組み (ハイレベル)

- 拡張機能はローカル サーバー (HTTP または HTTPS) を起動します。
- Chrome DevTools プロトコル (CDP) 経由で Antigravity ターゲットを検出します。
- 電話機はモバイル UI に接続し、アップロード/コマンド リクエストを送信します。
- 拡張機能は選択したチャット ターゲットに挿入され、ファイルを `uploads/` に保存します。

## アカウントの安全性

Antigravity Link には知られた禁止事件はなく、その状態を維持するように設計されています。

この拡張機能は、Antigravity が自分のマシン上で公開するデバッグ ポートに接続することで機能します。これは、VS Code の組み込みデバッガーとブラウザの開発ツールで使用されるのと同じ Chrome DevTools プロトコルです。ローカル UI を読み取り、キーボードの前に座っているかのように、キーの押下とクリックをシミュレートします。

これが実際に何を意味するか:
- **Antigravity が既に送信しているものを超えるリクエストは Google のサーバーに対して行われません**。内線は LAN の外部にネットワークにアクセスできません。
- **Antigravity のネットワーク トラフィックには何も挿入されません。** 拡張機能は画面を読み取ってエディターに入力します。API 呼び出しをインターセプトしたり変更したりすることはありません。
- **Antigravity ファイルは変更されません。** パッチ、フック、バイナリの変更はありません。
- **サーバーは完全にユーザーのマシン上で実行されます。** サーバーを明示的に外部に公開しない限り、プロンプト、チャット履歴、およびファイルがローカル ネットワークから離れることはありません。
- **この拡張機能によってサードパーティのサービスにデータが送信されることはありません**。

ソース コードは MIT ライセンスがあり、完全に監査可能です: https://github.com/cafeTechne/antigravity-link-extension

## トラブルシューティング

- **インスタンスが見つかりません**: すべての Antigravity ウィンドウが上記の `--remote-debugging-port` コマンドで起動されていることを確認してください。
- **携帯電話から接続できない**: 携帯電話とコンピュータが同じネットワーク上にあることを確認してください。
- **アップロードは保存されますが、チャットには表示されません**: モバイル UI で正しいアクティブ インスタンスに切り替えます。
- **「初期化中…」でスタックする**: サーバーにはアクセスできますが、チャット サーフェスがまだキャプチャされていません。 CDP 接続が初期化されるまで数秒待ちます。

## よくある質問

**これは iOS と Android で動作しますか?**
はい。モバイル UI は、最新のモバイル ブラウザーで実行できます。iOS の Safari、Android の Chrome などはすべて機能します。

**これは携帯電話または VPN 経由でも機能しますか?**
デフォルトではありません。サーバーは LAN のみです。リモート アクセスの場合は、ngrok などのトンネルを通じて公開する必要があります。トークン認証と HTTPS は、関係なくそのまま残ります。

**自己署名証明書の警告は受け入れても安全ですか?**
はい。証明書はサーバーの起動時にマシン上でローカルに生成されます。この警告が表示されるのは、接続が安全でないためではなく、公的認証局によって発行されていないためです。

**これを自動化に使用できますか?**
はい。ローカル HTTP API と MCP サーバーは、まさにこれを目的として設計されています。 「[API](#api)」および「[MCP server](#mcp-server)」セクションを参照してください。

## 国際化とアクセシビリティ

モバイル インターフェイスはブラウザの言語を自動的に検出し、次のように表示します。

English · 日本語 · 中文（简体） · 中文（繁體） · 한국어 · ドイツ語 · フランス語 · スペイン語 · ポルトガル語 · Русский · イタリア語 · ポルスキー · テュルクチェ · ティアン・ヴィエット · インドネシア語 · العربية

アラビア語は自動的に右から左にレンダリングされます。言語検出では `navigator.language` を使用し、構成は必要ありません。

このインターフェイスは、セマンティック HTML、ARIA ロール、接続ステータス用の `aria-live` 領域、キーボード ナビゲーション、およびスクリーン リーダー互換ラベルを使用して構築されています。

## 貢献する

プルリクエストは大歓迎です。大規模な変更を開始する前に、コードベースの TODO を確認するか、GitHub のイシューを開いてアイデアを話し合ってください。
セットアップと PR の注意事項については、`CONTRIBUTING.md` を参照してください。

---

## API

この拡張機能は、`https://localhost:3000` (または構成されたポート) でローカル HTTP API を公開します。 `/ping` を除くすべてのエンドポイントには、`Authorization: Bearer <token>` ヘッダーが必要です。トークンは、QR コード URL の `?token=` の後の値です。

| 方法 | 終点 | 説明 |
| --- | --- | --- |
| 得る | `/ping` | ヘルスチェック — `pong` を返します。認証は必要ありません。 |
| 得る | `/snapshot` | 現在のチャット サーフェス: HTML、CSS、モード/モデル、`isGenerating`。 |
| 得る | `/instances` | アクティブな Antigravity ウィンドウをリストします。 |
| 役職 | `/instance` | アクティブなウィンドウを切り替えます。本体：`{ "targetId": "..." }` |
| 役職 | `/send` | メッセージを送信します。本体：`{ "message": "..." }` |
| 役職 | `/click` | UI 要素をクリックします。本体：`{ "selector"?, "text"?, "x"?, "y"? }` |
| 役職 | `/stop` | AIの生成を停止します。 |
| 役職 | `/upload` | ファイルをアップロードします (multipart/form-data、フィールド名 `file`)。 |
| 得る | `/task` | 現在のタスクのドキュメントを読みます。 |
| 得る | `/walkthrough` | 現在のウォークスルー ドキュメントを読んでください。 |
| 得る | `/plan` | 現在の実装計画を読んでください。 |

完全なスキーマ: [`openapi.yaml`](openapi.yaml)

## MCPサーバー

Antigravity Link には、AI アシスタントが Antigravity セッションを直接操作できるようにする MCP (モデル コンテキスト プロトコル) サーバーが同梱されています。

**設定**

MCP クライアント構成 (例: `claude_desktop_config.json`) に以下を追加します。

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

`<extension-dir>` を、インストールされている拡張機能へのパスに置き換えます。
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

トークンは、QR コード URL の `?token=` の後の値です。 MCP クライアントが接続する前に、拡張サーバーが実行されている必要があります。

**利用可能なツール**

| 道具 | 説明 |
| --- | --- |
| `get_snapshot` | 現在のチャットの状態、モード、モデル、および生成ステータスを取得します。 |
| `send_message` | アクティブなチャットにメッセージを送信します。 |
| `stop_generation` | アクティブな AI 生成をキャンセルします。 |
| `get_instances` | 利用可能な Antigravity ウィンドウをリストします。 |
| `switch_instance` | 別の Antigravity ウィンドウに切り替えます。 |
| `click_element` | セレクター、テキスト、または座標によって UI 要素をクリックします。 |
| `get_task` | 現在のタスクのドキュメントを読みます。 |
| `get_walkthrough` | 現在のウォークスルー ドキュメントを読んでください。 |
| `get_plan` | 現在の実装計画を読んでください。 |

## スタンドアロン資産とワークスペース資産

この拡張機能は自己完結型です。独自の `public/` アセットと `uploads/` フォルダーが同梱されており、親の `npm run dev` ビルドは必要ありません。

*ワークスペース* に `public/` または `uploads/` が含まれている場合、拡張機能は自動的にそれらのパスを優先します。これにより、モバイル UI をカスタマイズしたり、アップロードをプロジェクト ルートに保持したりすることが簡単になりますが、ワークスペース間で動作が異なる可能性があることも意味します。

---

## スターの歴史

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## 謝辞

以下を含む初期のコミュニティ プロジェクトからインスピレーションを受けています。
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat
