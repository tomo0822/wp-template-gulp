# 🚀 WordPress × Gulp × Docker (2026 最新安定版テンプレート)

どこにクローンしても1発で爆速開発環境が立ち上がる、DartSass / Autoprefixer / BrowserSync 対応のWordPressオリジナルテーマ開発用テンプレート（ブループリント）です。

## 📂 フォルダ構造の概要

wp-template-gulp/
├─ compose.yml                # Docker設定ファイル
├─ README.md                  # この説明書
└─ wp-content/
    └─ themes/
        └─ my-theme/          # オリジナルテーマフォルダ
            ├─ index.php      # テンプレートファイル（各種PHPはここへ）
            ├─ style.css      # テーマ認識用CSS
            ├─ assets/        # Gulpから自動出力されるフォルダ（触らない）
            ├─ gulp/          # Gulpの設定一式
            │   └─ gulpfile.js
            └─ src/           # 💻 ガシガシ編集する開発用フォルダ
                ├─ sass/      # FLOCSS構成のSass
                └─ js/        # JavaScript

# 🛠️ クローン後の初回起動手順（3ステップ）
この環境をGitHubからクローンしてきたら、以下の手順で一発起動します。

# 1. Dockerコンテナの起動
プロジェクトのルート階層（wp-template-gulp）のターミナルで実行します。

docker compose up -d
起動後、30秒ほど待ってブラウザで http://localhost:8080 を開き、WordPressの初期設定（言語選択・ログイン情報入力）を完了させてください。

# 2. WordPress管理画面でテーマを有効化
http://localhost:8080/wp-admin からダッシュボードにログインします。

「外観」 ＞ 「テーマ」 を開き、my-theme を有効化します。

# 3. Gulpのパッケージインストール ＆ 起動
ターミナルで gulp フォルダまで移動し、依存パッケージをインストールして起動します。

# Gulp階層へ移動
cd wp-content/themes/my-theme/gulp

# 初回のみ：パッケージのインストール
npm install

# Gulpの起動（監視 ＆ オートリロード開始）
npx gulp
起動すると、ブラウザで自動的に http://localhost:3000 が立ち上がります！

# 💻 開発時のルール
編集する場所： src/ フォルダの中のSassやJS、および my-theme/ 直下の各PHPファイルを編集してください。

自動生成（触らなくてOK）： assets/ フォルダの中身は、ファイルを保存した瞬間にGulpが自動でお掃除（clean）し、コンパイル・圧縮した最新ファイルを再生成してくれます。

ブラウザの同期： コードを保存すると、画面を一切手動リロードすることなく、一瞬でブラウザに変更が反映されます。

# 🧹 終了・リセットの方法
開発を終了するとき
Gulpのターミナルで Ctrl + C を押してGulpを止めた後、ルート階層で以下を実行します。

docker compose down

# データベースも含めて完全に初期化したいとき
環境が壊れたり、別の案件用に真っ新な状態に戻したいときは、ボリュームごと削除します。

docker compose down -v