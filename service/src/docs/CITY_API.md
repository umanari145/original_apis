# 市区町村API仕様書

## ベースURL
```
http://localhost:3000/api
```

## エンドポイント一覧

### 1. 都道府県コードで市区町村取得（メイン機能）

**エンドポイント:** `GET /cities/pref/:prefCode`

**説明:** 都道府県コードに合致した全ての市区町村情報を取得します。

**パラメータ:**
| パラメータ名 | 型 | 必須 | 説明 |
|------------|-----|------|------|
| prefCode | string | ○ | 都道府県コード（01-47） |

**リクエスト例:**
```bash
# 東京都の市区町村を取得
curl -X GET http://localhost:3000/api/cities/pref/13

# 北海道の市区町村を取得
curl -X GET http://localhost:3000/api/cities/pref/01

# 大阪府の市区町村を取得
curl -X GET http://localhost:3000/api/cities/pref/27
```

**レスポンス例（成功時）:**
```json
{
  "success": true,
  "count": 2543,
  "prefCode": "13",
  "data": [
    {
      "zip_code": "1000001",
      "pref_code": "13",
      "pref_kana": "トウキョウト",
      "pref_roma": "TOKYO TO",
      "city_code": "13101",
      "city_name": "千代田区",
      "city_kana": "チヨダク",
      "city_roma": "CHIYODA KU",
      "town_name": "千代田",
      "town_kana": "チヨダ",
      "town_roma": "CHIYODA"
    },
    ...
  ]
}
```

**レスポンス例（エラー時）:**
```json
{
  "error": "No cities found for prefecture code 99",
  "message": "No cities found for prefecture code 99",
  "timestamp": "2025-10-12T10:30:00.000Z"
}
```

**ステータスコード:**
- `200 OK`: 正常に取得
- `400 Bad Request`: 無効な都道府県コード
- `404 Not Found`: 指定された都道府県コードに対応する市区町村が見つからない
- `500 Internal Server Error`: サーバーエラー

---

### 2. 郵便番号で市区町村取得

**エンドポイント:** `GET /cities/zip/:zipCode`

**説明:** 郵便番号に対応する市区町村情報を取得します。

**パラメータ:**
| パラメータ名 | 型 | 必須 | 説明 |
|------------|-----|------|------|
| zipCode | string | ○ | 郵便番号（7桁） |

**リクエスト例:**
```bash
# 郵便番号で検索
curl -X GET http://localhost:3000/api/cities/zip/1000001
```

**レスポンス例（成功時）:**
```json
{
  "success": true,
  "count": 1,
  "zipCode": "1000001",
  "data": [
    {
      "zip_code": "1000001",
      "pref_code": "13",
      "pref_kana": "トウキョウト",
      "pref_roma": "TOKYO TO",
      "city_code": "13101",
      "city_name": "千代田区",
      "city_kana": "チヨダク",
      "city_roma": "CHIYODA KU",
      "town_name": "千代田",
      "town_kana": "チヨダ",
      "town_roma": "CHIYODA"
    }
  ]
}
```

**ステータスコード:**
- `200 OK`: 正常に取得
- `404 Not Found`: 指定された郵便番号が見つからない
- `500 Internal Server Error`: サーバーエラー

---

### 3. 全市区町村取得（ページネーション対応）

**エンドポイント:** `GET /cities`

**説明:** 全ての市区町村情報を取得します（ページネーション対応）。

**クエリパラメータ:**
| パラメータ名 | 型 | 必須 | デフォルト | 説明 |
|------------|-----|------|-----------|------|
| page | number | × | 1 | ページ番号 |
| limit | number | × | 100 | 1ページあたりの件数（最大1000） |

**リクエスト例:**
```bash
# 最初の100件を取得
curl -X GET http://localhost:3000/api/cities

# 2ページ目を取得
curl -X GET http://localhost:3000/api/cities?page=2

# 1ページあたり500件で取得
curl -X GET http://localhost:3000/api/cities?page=1&limit=500
```

**レスポンス例（成功時）:**
```json
{
  "success": true,
  "pagination": {
    "page": 1,
    "limit": 100,
    "total": 124567,
    "totalPages": 1246,
    "hasNext": true,
    "hasPrev": false
  },
  "data": [
    {
      "zip_code": "0600000",
      "pref_code": "01",
      "pref_kana": "ホッカイドウ",
      "pref_roma": "HOKKAIDO",
      "city_code": "01101",
      "city_name": "札幌市中央区",
      "city_kana": "サッポロシチュウオウク",
      "city_roma": "SAPPORO SHI CHUO KU",
      "town_name": "",
      "town_kana": "",
      "town_roma": ""
    },
    ...
  ]
}
```

**ステータスコード:**
- `200 OK`: 正常に取得
- `400 Bad Request`: 無効なページ番号またはlimit値
- `500 Internal Server Error`: サーバーエラー

---

## データモデル

### City（市区町村）

| フィールド名 | 型 | 説明 |
|------------|-----|------|
| zip_code | string | 郵便番号（7桁） |
| pref_code | string | 都道府県コード（01-47） |
| pref_kana | string | 都道府県名（カナ） |
| pref_roma | string | 都道府県名（ローマ字） |
| city_code | string | 市区町村コード |
| city_name | string | 市区町村名 |
| city_kana | string | 市区町村名（カナ） |
| city_roma | string | 市区町村名（ローマ字） |
| town_name | string | 町域名 |
| town_kana | string | 町域名（カナ） |
| town_roma | string | 町域名（ローマ字） |

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
│   └── cityController.ts      # コントローラー
├── services/
│   └── cityService.ts         # ビジネスロジック
├── routes/
│   └── cityRoutes.ts          # ルーティング
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

#### 都道府県コードで市区町村取得（メイン機能）
```bash
# 東京都の市区町村
curl http://localhost:3000/api/cities/pref/13

# 北海道の市区町村
curl http://localhost:3000/api/cities/pref/01

# 大阪府の市区町村
curl http://localhost:3000/api/cities/pref/27
```

#### 郵便番号で検索
```bash
curl http://localhost:3000/api/cities/zip/1000001
```

#### 全市区町村取得（ページネーション）
```bash
# 1ページ目
curl http://localhost:3000/api/cities

# 2ページ目、1ページあたり200件
curl "http://localhost:3000/api/cities?page=2&limit=200"
```

#### エラーケースの確認
```bash
# 無効な都道府県コード
curl http://localhost:3000/api/cities/pref/99

# 存在しない郵便番号
curl http://localhost:3000/api/cities/zip/0000000
```

### 3. ブラウザでの確認
- 東京都の市区町村: http://localhost:3000/api/cities/pref/13
- 北海道の市区町村: http://localhost:3000/api/cities/pref/01
- 郵便番号検索: http://localhost:3000/api/cities/zip/1000001
- 全市区町村（1ページ目）: http://localhost:3000/api/cities

---

## 使用例

### ケース1: 都道府県選択後の市区町村リスト表示
```javascript
// フロントエンドでの使用例
const prefCode = '13'; // 東京都
const response = await fetch(`http://localhost:3000/api/cities/pref/${prefCode}`);
const data = await response.json();

console.log(`${data.prefCode}の市区町村: ${data.count}件`);
data.data.forEach(city => {
  console.log(`${city.city_name} - ${city.town_name}`);
});
```

### ケース2: 郵便番号から住所検索
```javascript
const zipCode = '1000001';
const response = await fetch(`http://localhost:3000/api/cities/zip/${zipCode}`);
const data = await response.json();

if (data.success) {
  const city = data.data[0];
  console.log(`住所: ${city.pref_name} ${city.city_name} ${city.town_name}`);
}
```

---

## 注意事項

1. **都道府県コード**: 01-47の範囲で指定してください（自動的に2桁にフォーマットされます）
2. **郵便番号**: 7桁の数字文字列で指定してください（ハイフンなし）
3. **ページネーション**: limitは最大1000件まで設定可能です
4. **データ量**: 市区町村データは大量（10万件以上）のため、全件取得時はページネーションの使用を推奨します
5. **CORS**: 全てのオリジンからのアクセスが許可されています（開発環境）

---

## パフォーマンス最適化

- データベースインデックスが`pref_code`と`zip_code`に設定されています
- 大量データの取得時はページネーションを活用してください
- 頻繁にアクセスされるエンドポイントにはキャッシュの実装を検討してください

---

## 今後の拡張予定

- [ ] 市区町村名での部分一致検索
- [ ] 都道府県と市区町村の結合データ取得
- [ ] キャッシュ機能の追加
- [ ] レスポンスの圧縮対応
- [ ] APIレート制限の実装
