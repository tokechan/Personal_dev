
# React + Vite + Docker Frontend 構築トラブルシュートまとめ

## ✅ フロントエンド（React + Vite）Docker構築の復習まとめ

---

### 🔴 1. `package-lock.json` が存在しない問題

**問題**  
Dockerビルド時に `COPY package*.json ./` で `package-lock.json` を探すが、ファイルが見つからずビルドエラー。

**原因**  
ローカルで `npm install` を行っていなかったため、`package-lock.json` が生成されていなかった。

**解決策**
```bash
cd frontend
npm install
```

---

### 🔴 2. `vite` のポートが Docker 側と一致していなかった

**問題**  
ブラウザで `localhost:3000` にアクセスしても画面が出ない。

**原因**  
Vite のデフォルト起動ポートは `5173`。Docker 側では `3000` をマッピングしていた。

**解決策**

- `vite.config.js` に以下を追加：
```js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
});
```

---

### 🔴 3. `vite` アクセス不可（ホスト公開設定がない）

**問題**  
`localhost:3000` にアクセスしても接続できない。

**原因**  
Vite が `localhost` バインドで起動しており、Docker 内部からしか見えなかった。

**解決策**

- `package.json` に `--host` を指定：
```json
"scripts": {
  "dev": "vite --host"
}
```

---

### 🔴 4. MySQLのポート競合エラー

**問題**  
```
Bind for 0.0.0.0:3306 failed: port is already allocated
```

**原因**  
ホスト側で既に MySQL がポート3306を使用していた。

**解決策**

- ポートを使用しているプロセス確認：
```bash
lsof -i :3306
```

- プロセスを停止：
```bash
kill -9 <PID>
```

---

### 🔴 5. Dockerfile で `package.json` が見つからない

**問題**  
```
COPY package*.json ./
Error: no such file or directory
```

**原因**  
Dockerfileのビルド時の `context` とファイルの場所がズレていた。

**解決策**

- `docker-compose.yml` に正しい `context` を設定：
```yaml
build:
  context: ./frontend
  dockerfile: Dockerfile
```

---

## ✅ 最終構成（理想）

### vite.config.js
```js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
});
```

### Dockerfile（frontend）
```Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

### docker-compose.yml（frontend部分のみ）
```yaml
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
    working_dir: /app
    command: npm run dev
```

---

## ✅ まとめ表

| 問題 | 原因 | 解決策 |
|------|------|--------|
| `package-lock.json` missing | `npm install` 未実行 | ローカルで生成 |
| ポート不一致 | Vite のデフォルトポート `5173` | `vite.config.js` で `port: 3000` |
| 接続できない | `--host` 指定なし | `vite --host` または `vite.config.js` |
| MySQL ポート競合 | 3306使用中 | プロセス停止 or ポート変更 |
| COPY エラー | contextのズレ | 正しい `context` 指定 |
