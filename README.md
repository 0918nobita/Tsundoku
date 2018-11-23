# Tsundoku.tech

![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg) [![Build Status](https://travis-ci.com/TsundokuApp/Tsundoku.svg?branch=develop)](https://travis-ci.com/TsundokuApp/Tsundoku) [![Maintainability](https://api.codeclimate.com/v1/badges/24df2547bd334d08558a/maintainability)](https://codeclimate.com/github/TsundokuApp/Tsundoku/maintainability) [![Total alerts](https://img.shields.io/lgtm/alerts/g/TsundokuApp/Tsundoku.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/TsundokuApp/Tsundoku/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/TsundokuApp/Tsundoku.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/TsundokuApp/Tsundoku/context:javascript)

「**効率的に技術書を読もう。賢く積読しよう。**」

- フロントエンドは Ionic 3 (Angular 6, RxJS v6, NgRx) / AngularFire を用いて実装する
- フロントエンドの静的ファイルは Netlify でホスティングする
- Cloud Functions / Cloud Firestore を用いてサーバーサイドを構築する
- Firebase Authentication を用いてアカウント管理を行う

## ローカル開発環境の構築

まず、 ``yarn`` をインストールして下さい。

その後、以下のコマンドを実行して Firebase CLI の初期設定を行って下さい。

```bash
$ yarn global add firebase-tools
$ firebase login
# Google アカウントでログインして下さい
```

最後に、以下のコマンドを実行して Tsundoku のソースコードの取得と依存パッケージのインストールを行って下さい。  
``client`` ディレクトリと ``functions`` ディレクトリは分離された npm プロジェクトです。  
``shared`` ディレクトリ内の ``.ts`` 形式のソースファイルは、この 2 つの npm プロジェクトで共有されます。

```bash
$ git clone https://github.com/TsundokuApp/Tsundoku
$ cd Tsundoku/client
$ yarn install
$ cd ../functions
$ yarn install
```

細かな仕様や DB の設計などについては、Reference リポジトリを参照して下さい。
