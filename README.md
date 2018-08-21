# Tsundoku.tech

さぁ、今日も積読を消化しよう

- 積読の消化の進捗を可視化・共有できる PWA (Progressive Web App)
- GitHub リポジトリと技術書を紐づけることで、技術書の読書記録とGitHub上のコミットの対応関係を保存することができる
- Twitter と連携でき、タイムラインで進捗を共有する機能が利用できる
- Google Books APIs を利用して、ISBN で本を検索できる機能を実装する
- ユーザー認証/管理には Firebase Authentication を用いる

## 環境構築

```bash
$ git clone https://github.com/0918nobita/Tsundoku.git
$ cd Tsundoku
$ npm i
```

## 各画面の詳細

- トップページ
- 積読本棚
  - 本のサムネイル ( 画像鯖から取得し、まだ画像鯖に存在しない画像なら Amazon の API で取得する )
- 本の詳細画面
  - 本のタイトル / 著者 / 全体のページ数 / 読んだページ数
- GitHub / Twitter 連携画面

## Webサーバーの起動

下のコマンドを実行すると ``localhost:4200`` でWebサーバーが起動する。  
ファイルの更新を検知して自動でページがリロードされる。

```bash
$ npm run start
```

## ビルド

```bash
$ npm run build
```

## ng generate コマンド

以下のコマンドを実行することで、component-name コンポーネントが生成される。

```bash
$ ng generate component component-name
```

同様に、``ng generate directive|pipe|service|class|guard|interface|enum|module`` を用いることができる

## 単体テストの実行方法

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## End-to-end テストを実行する

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
