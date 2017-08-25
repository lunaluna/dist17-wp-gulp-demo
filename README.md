# タスクランナーでラクするWeb開発 WordPress編

#### DIST.17 「Webデザインの現場のための効率化術」 ライトニングトーク資料として

## 事前準備
- [node.js](https://nodejs.org/ja/)
	- [nodebrew](https://github.com/hokaccha/nodebrew) Mac用のnode.jsバージョン管理システム
	- [nodist](https://github.com/marcelklehr/nodist) Windows用のnode.jsバージョン管理システム
	- [anyenv](https://github.com/riywo/anyenv) node.jsに限らずいろいろバージョン管理
- [local by flywheel](https://local.getflywheel.com/)
	- WordPressのローカル開発環境

## 手順
1. node.jsをインストール
2. local by flywheelをインストール
3. WordPressをインストールし、任意のサイトを作成する
4. WordPressの公式ディレクトリから「[tsumugi](https://ja.wordpress.org/themes/tsumugi/)」をダウンロードしてインストール ← もちろん別のテーマでもOK!
5. 「子テーマ」を用意する (今回の場合「tsumugi-child」)
6. 各種設定ファイルを「app」ディレクトリにインストール (コピペで・一部要編集)
6. ターミナルを起動し、「app」ディレクトリに移動 (ドラッグアンドドロップで)
7. コマンド `$ npm i` でnpmパッケージをインストール
8. コマンド `$ npm start` でタスクが走る

## タスクについて
### sassのコンパイル関連
#### 1.sasslint
sass(scss)を記述する際の記述方法をチェックするプログラム。 良くない書き方があると警告される

#### 2.sassコンパイル
sassをcssへコンパイル

#### 3.autoprefixer
ブラウザによって必要なprefixを自動で付与する

#### 4.merge media query
ファイルのあちこちに記述されている media query をまとめる

#### 5.css optimize
- 任意の順序で記載されているプロパティを一定の順序に並べ替える
- ファイルを圧縮する

### Javascript関連
#### 1.lint

#### 2.minify
ファイルを圧縮する

### 画像関連
#### 1.optimize
画像を圧縮する

### PHP関連
#### 1.phplint

### Browsersync
- ローカルサーバーを起動する
- ファイルの変更を監視して、変更されたらブラウザをリロードする


## 構成
```
app
│
（この階層のファイル群は別途インストールが必要です）
│
├ .editorconfig (エディタの設定をするファイル)
├ .gitignore (gitで同期しないファイル群を設定するファイル)
├ .jshintrc (javascriptの記述の基準を設定するファイル)
├ .sass-lint.yaml (scssの記述の基準を設定するファイル)
│
├ gulpfile.js (gulpのタスクを記述する設定ファイル)
├ package.json (gulpのタスクに必要なパッケージを記述するファイル)
│
├ node_modules (node.jsのパッケージ用のディレクトリ（自動生成）)
│
└ public (公開領域・ここにWordPressがインストールされる)
   │
   │
（中略）
   │
   └ wp-content
      ├ index.php
      │
      ├ languages
      ├ plugins
      ├ uploads
      └ themes
           │
           ├ twenty*
           ├ tsumugi (https://ja.wordpress.org/themes/tsumugi/)
           └ tsumugi-child
               ├ functions.php
               ├ style.css
               │
               ├ (images - 自動で生成)
               │
               └ resources
                   ├ js (自分で記述するためのjsファイルを入れる)
                   │  └ setting.js
                   │
                   ├ raw-images (圧縮する前の画像を入れる)
                   │
                   ├ map (sourcemapを保存)
                   │
                   └ sass
                       ├ style.scss
                       ├ _mixin.scss
                       ├ _config.scss
                       ├ _common.scss
                       └ _pagestyle.scss
```
