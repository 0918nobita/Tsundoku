# Tsundoku.tech

「さぁ、今日も積読を消化しよう」

- 積読の消化の進捗を可視化・共有できる PWA (Progressive Web App)
- GitHub リポジトリと技術書を紐づけることで、読書記録と GitHub 上のコミットの対応関係を保存することができる
- Twitter と連携可能
- 積読本棚に追加する本は、ISBN の直接入力または QR コード読み取りで検索する
- ユーザー認証/管理には Firebase Authentication を用いる
- 読書進捗は、連携している GitHub 垢の contributions に反映される
- 積読本棚に追加できる冊数には制限があり、申請をすることで段階的に上限を解放することができる  
  その代わり、上限を解放したことが強制的に連携 SNS で共有される

## 各画面の詳細

- ログイン画面
  - メールアドレス入力欄
  - パスワード入力欄
  - 「ログイン」ボタン
  - 「SNS連携ログイン」ボタン
- 新規登録画面
- 積読本棚
- 本のISBN検索結果
- タイムライン画面
- 新規投稿画面
- プロフィール画面
- プロフィール編集画面

___

## 環境構築

```bash
$ git clone https://github.com/0918nobita/Tsundoku.git
$ cd Tsundoku/client
$ npm i
```

### コンポーネント

- 本の詳細

## Webサーバーの起動

下のコマンドを実行すると ``localhost:4200`` でWebサーバーが起動します。  
ファイルの更新を検知して自動でページがリロードされます。

```bash
$ npm run start
```

## ビルド方法

- デバッグビルド

```bash
$ npm run build
```

- リリースビルド

```bash
$ npm run release
```

## ng generate コマンド

以下のコマンドを実行することで、component-name コンポーネントが生成されます。

```bash
$ ng generate component component-name
```

同様に、``ng generate directive|pipe|service|class|guard|interface|enum|module`` が使用可能です。

## DBについて

Cloud Firestore の NoSQL データベースを採用しています。

コレクションとドキュメントの構成は以下のようになります。

- bookshelf
  - deadline: timestamp
  - favorite: boolean
  - isbn: string
  - progress: string
  - user: string
- records
  - created: timestamp
  - desc: string
  - isbn: string
  - range: string
  - user: string
- resolvedBooks
  - desc: string
  - donor: string
  - image: string
  - isbn: string
  - title: string
- unresolvedBooks
  - client: string
  - desc: string
  - isbn: string
- users
  - uid: string
  - bio: string
  - image: string
  - name: string
