# Antigravity Link（VS Code 拡張機能）

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**他の言語で読む：**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

---

GitHub リポジトリ: https://github.com/cafeTechne/antigravity-link-extension

Open VSX: https://open-vsx.org/extension/cafetechne/antigravity-link-extension

Antigravity のセッションをスマートフォンで利用できます。ファイルのアップロード、プロンプトの音声入力、生成の停止、複数の Antigravity チャットの切り替えをモバイル対応インターフェースから行えます。また、MCP やローカル HTTP API を使って自動化することも可能です。

## こんな方に

- Google の Antigravity IDE 向けのシンプルで安全なモバイルコンパニオンを求めているチーム
- 外出先でファイルを素早くアップロードしたい、または音声入力を使いたいパワーユーザー
- API や MCP 経由で Antigravity セッションを自動化・統合したい開発者
- 実行中の Antigravity セッションをゼロ設定で操作したい初心者開発者

## 機能

- アクティブな Antigravity チャットのライブミラー — スマートフォンから閲覧・操作可能
- アクティブな Antigravity チャットへのファイルアップロード
- モバイルからの音声入力（マイク使用には HTTPS が必要）
- 専用のストップチップでスマートフォンから生成を停止
- 複数の Antigravity ウィンドウのアクティブインスタンス切り替え
- 自動化と統合のためのローカル HTTP API
- AI アシスタント統合のための MCP サーバー
- トークン認証付きのローカル専用サーバー
- 16 言語対応のインターフェース（自動検出・RTL サポート付き）

## クイックスタート

1) リモートデバッグを有効にして Antigravity を起動します。これは必須です。このフラグなしで起動したセッションは拡張機能から検出できません。

例（Windows）:
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

2) VS Code で次のコマンドを実行します: `Antigravity Link: Start Server`

3) 次に実行します: `Antigravity Link: Show QR Code`

4) スマートフォンで QR コードをスキャンします。モバイル UI が表示されます。

5) 証明書が自己署名のため、スマートフォンが「接続が安全でない」と警告する場合があります。これはローカル HTTPS では想定内の動作です。ブラウザの「詳細設定」オプションを使って続行してください。

## コマンド

| コマンド | 説明 |
| --- | --- |
| Antigravity Link: Start Server | ローカルブリッジサーバーを起動します。 |
| Antigravity Link: Stop Server | サーバーを停止します。 |
| Antigravity Link: Show QR Code | 接続用 QR コードを表示します。 |
| Antigravity Link: Select Network Interface | QR URL が通知するネットワークインターフェースを選択します。 |

## API

拡張機能は `https://localhost:3000` でローカル HTTP API を公開しています。`/ping` を除くすべてのエンドポイントには `Authorization: Bearer <token>` ヘッダーが必要です。

| メソッド | エンドポイント | 説明 |
| --- | --- | --- |
| GET | `/ping` | ヘルスチェック。認証不要。 |
| GET | `/snapshot` | 現在のチャット画面: HTML、CSS、モード/モデル、isGenerating。 |
| GET | `/instances` | アクティブな Antigravity ウィンドウの一覧。 |
| POST | `/instance` | アクティブウィンドウを切り替えます。ボディ: `{ "targetId": "..." }` |
| POST | `/send` | メッセージを送信します。ボディ: `{ "message": "..." }` |
| POST | `/click` | UI 要素をクリックします。ボディ: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | AI の生成を停止します。 |
| POST | `/upload` | ファイルをアップロードします（multipart/form-data）。 |
| GET | `/task` | 現在のタスクドキュメントを読み取ります。 |
| GET | `/walkthrough` | 現在のウォークスルードキュメントを読み取ります。 |
| GET | `/plan` | 現在の実装計画を読み取ります。 |

完全なスキーマ: [`openapi.yaml`](openapi.yaml)

## MCP サーバー

MCP クライアントの設定に追加してください:

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

利用可能なツール: `get_snapshot`, `send_message`, `stop_generation`, `get_instances`, `switch_instance`, `click_element`, `get_task`, `get_walkthrough`, `get_plan`

## セキュリティとプライバシー

- サーバーはローカルで実行され、トークンで認証されます。
- モバイルでのマイクアクセスを許可するために HTTPS がデフォルトで有効になっています。
- この拡張機能はサードパーティのサービスにデータを送信しません。

## トラブルシューティング

- **インスタンスが見つからない**: すべての Antigravity ウィンドウが `--remote-debugging-port` を付けて起動されていることを確認してください。
- **モバイルから接続できない**: スマートフォンとコンピューターが同じネットワーク上にあることを確認してください。
- **「初期化中…」のまま止まっている**: CDP 接続の初期化のために数秒お待ちください。

## 国際化とアクセシビリティ

モバイルインターフェースはブラウザの言語を自動検出し、以下の言語でレンダリングします:
English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

アラビア語は右から左へ表示されます。言語検出は設定不要で `navigator.language` を使用します。

## コントリビュート

プルリクエストを受け付けており、積極的にコントリビューターを募集しています。
セットアップと PR に関する注意事項は `CONTRIBUTING.md` をご覧ください。

## ライセンス

MIT。詳細は `LICENSE` を参照してください。
