# 都道府県API仕様書

## ベースURL
```
http://localhost:3000/api
```

## エンドポイント一覧

### 1. 全都道府県取得

**エンドポイント:** `GET /prefs`

**説明:** 47都道府県の情報を全て取得します。

**リクエスト:**
```bash
curl -X GET http://localhost:3000/api/prefs
```

**レスポンス例（成功時）:**
```json
{
  "success": true,
  "count": 47,
  "data": [
    {
      "pref_code": "01",
      "pref_name": "北海道",
      "pref_kana": "ホッカイドウ",
      "pref_roma": "HOKKAIDO"
    },
    {
      "pref_code": "02",
      "pref_name": "青森県",
      "pref_kana": "アオモリケン",
      "pref_roma": "AOMORI KEN"
    },
    ...
  ]
}
```

**ステータスコード:**
- `200 OK`: 正常に取得
- `500 Internal Server Error`: サーバーエラー

---

### 2. 都道府県コードで取得

**エンドポイント:** `GET /prefs/:prefCode`

**説明:** 都道府県コードを指定して、特定の都道府県情報を取得します。

**パラメータ:**
| パラメータ名 | 型 | 必須 | 説明 |
|------------|-----|------|------|
| prefCode | string | ○ | 都道府県コード（01-47） |

**リクエスト例:**
```bash
# 東京都の情報を取得
curl -X GET http://localhost:3000/api/prefs/13

# 大阪府の情報を取得
curl -X GET http://localhost:3000/api/prefs/27
```

**レスポンス例（成功時）:**
```json
{
  "success": true,
  "data": {
    "pref_code": "13",
    "pref_name": "東京都",
    "pref_kana": "トウキョウト",
    "pref_roma": "TOKYO TO"
  }
}
```

**レスポンス例（エラー時）:**
```json
{
  "error": "Prefecture with code 99 not found",
  "message": "Prefecture with code 99 not found",
  "timestamp": "2025-10-12T10:30:00.000Z"
}
```

**ステータスコード:**
- `200 OK`: 正常に取得
- `404 Not Found`: 指定された都道府県コードが見つからない
- `500 Internal Server Error`: サーバーエラー

---

## データモデル

### Prefecture（都道府県）

| フィールド名 | 型 | 説明 |
|------------|-----|------|
| pref_code | string | 都道府県コード（01-47） |
| pref_name | string | 都道府県名 |
| pref_kana | string | 都道府県名（カナ） |
| pref_roma | string | 都道府県名（ローマ字） |

---

## エラーレスポンス

全てのエラーレスポンスは以下の形式で返されます：

```json
{
  "error": "エラーメッセージ",
  "message": "詳細なエラー説明",
  "timestamp": "2025-10-12T10:30:00.000Z"
}
```

---

## 実装ファイル構成

```
src/
├── controllers/
│   └── prefController.ts      # コントローラー
├── services/
│   └── prefService.ts         # ビジネスロジック
├── routes/
│   └── prefRoutes.ts          # ルーティング
├── middleware/
│   └── errorHandler.ts        # エラーハンドリング
└── app.ts                     # アプリケーション設定
```

---

## テスト方法

### 1. サーバーの起動
```bash
npm run dev
```

### 2. エンドポイントのテスト

#### 全都道府県取得
```bash
curl http://localhost:3000/api/prefs
```

#### 特定の都道府県取得（東京都）
```bash
curl http://localhost:3000/api/prefs/13
```

#### 存在しない都道府県コード（エラー確認）
```bash
curl http://localhost:3000/api/prefs/99
```

### 3. ブラウザでの確認
- 全都道府県: http://localhost:3000/api/prefs
- 東京都: http://localhost:3000/api/prefs/13
- 大阪府: http://localhost:3000/api/prefs/27

---

## 注意事項

1. **都道府県コード**: 必ず01-47の範囲で指定してください
2. **文字コード**: レスポンスはUTF-8エンコーディングです
3. **CORS**: 全てのオリジンからのアクセスが許可されています（開発環境）
4. **データベース**: Prismaを使用してMySQLに接続しています

---

## 今後の拡張予定

- [ ] ページネーション機能
- [ ] 都道府県名での検索機能
- [ ] カナ・ローマ字での検索機能
- [ ] キャッシュ機能の追加
