# 積読.tech

さぁ、今日も積読を消化しよう

- 積読の消化の進捗を可視化できる Web アプリ
- GitHub リポジトリと技術書を紐づけることで、技術書のページとコミットの対応関係を保存することができる
- Twitter と連携してアカウント登録でき、タイムラインで進捗を共有する機能が利用できる
- 本の情報は、Amazon の API を利用して取得する
- 背景には、窓のある書斎のイラストが表示され、季節を感じることができる

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

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
