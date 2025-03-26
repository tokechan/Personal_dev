# ベースイメージを指定（Node.js公式）
FROM node:18

# 作業ディレクトリを作成
WORKDIR /app

# package.jsonとlockファイルのみ先にコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリ全体をコピー
COPY . .

# ポート開放（Viteのデフォルト）
EXPOSE 3000

# アプリ起動コマンド（Viteの開発サーバー）
CMD ["npm", "run", "dev"]
