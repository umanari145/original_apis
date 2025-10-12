# CSVインポートスクリプト

都道府県（prefectures）と市区町村（cities）のデータをCSVファイルからデータベースにインポートするためのスクリプト群です。

## 📁 ファイル構成

```
seed/
├── prefs.csv           # 都道府県データ（47件）
├── cities.csv          # 市区町村データ（~23MB）
├── importPrefs.ts      # 都道府県インポートスクリプト
├── importCities.ts     # 市区町村インポートスクリプト
├── seedAll.ts          # 全データ一括インポートスクリプト
└── README.md           # このファイル
```

## 🚀 セットアップ

### 1. 依存パッケージのインストール

```bash
# papaparse（CSVパーサー）のインストール
npm install papaparse
npm install -D @types/papaparse

# または yarn を使用している場合
yarn add papaparse
yarn add -D @types/papaparse
```

### 2. Prisma の準備

```bash
# Prisma Clientの生成
npx prisma generate

# マイグレーションの実行
npx prisma migrate dev
```

### 3. 環境変数の確認

`.env`ファイルに`DATABASE_URL`が正しく設定されていることを確認:

```env
DATABASE_URL="mysql://original_apis_user:original_apis_pass@o_apis_db:3306/original_apis"
```

## 📝 実行方法

### 方法1: 個別にインポート

#### 都道府県データのみインポート
```bash
npx ts-node seed/importPrefs.ts
```

#### 市区町村データのみインポート
```bash
npx ts-node seed/importCities.ts
```

### 方法2: 全データを一括インポート（推奨）
```bash
npx ts-node seed/seedAll.ts
```

### 方法3: package.jsonスクリプトを使用

`package.json`に以下を追加:

```json
{
  "scripts": {
    "seed:prefs": "ts-node seed/importPrefs.ts",
    "seed:cities": "ts-node seed/importCities.ts",
    "seed:all": "ts-node seed/seedAll.ts",
    "seed": "npm run seed:all"
  }
}
```

実行:
```bash
npm run seed              # 全データをインポート
npm run seed:prefs        # 都道府県のみ
npm run seed:cities       # 市区町村のみ
```

### 方法4: Docker環境で実行

```bash
# 全データをインポート
docker-compose exec app npm run seed

# 個別にインポート
docker-compose exec app npm run seed:prefs
docker-compose exec app npm run seed:cities
```

## ⚙️ スクリプトの機能

### importPrefs.ts（都道府県）
- ✅ 47都道府県のデータをインポート
- ✅ CSVファイルの自動読み込みとパース
- ✅ データのバリデーション
- ✅ 既存データの削除（オプション）
- ✅ 一括データ挿入
- ✅ 重複データのスキップ
- ✅ サンプルデータの表示

### importCities.ts（市区町村）
- ✅ 大量データ（数十万件）の効率的な処理
- ✅ バッチ処理（1000件ずつ挿入）
- ✅ リアルタイム進捗表示
- ✅ メモリ効率を考慮した実装
- ✅ 都道府県別統計の表示
- ✅ エラーハンドリング

### seedAll.ts（一括実行）
- ✅ 都道府県→市区町村の順に自動実行
- ✅ 各ステップの進捗表示
- ✅ 最終統計の表示
- ✅ データベース接続確認

## 📊 データ仕様

### prefs.csv
```csv
"pref_code","pref_name","pref_kana","pref_roma"
"01","北海道","ホッカイドウ","HOKKAIDO"
...
```

### cities.csv
```csv
"zip_code","pref_code","pref_kana","pref_roma","city_code","city_name","city_kana","city_roma","town_name","town_kana","town_roma"
"0600000","01","ホッカイドウ","HOKKAIDO","01101","札幌市中央区","サッポロシチュウオウク","SAPPORO SHI CHUO KU","","",""
...
```

## ⚠️ 注意事項

### パフォーマンス
- cities.csvは約23MBの大きなファイルです
- インポートには数分かかる場合があります
- バッチサイズは1000件に設定（調整可能）

### データの削除
既存データを削除したくない場合は、各スクリプトの以下の行をコメントアウト:

```typescript
// await prisma.pref.deleteMany({});
// await prisma.city.deleteMany({});
```

### エラー対応
```bash
# データベース接続エラーの場合
docker-compose ps  # コンテナの状態確認
docker-compose logs db  # DBログ確認

# Prisma Client エラーの場合
npx prisma generate  # Client再生成

# パーミッションエラーの場合（Linux/Mac）
chmod +x seed/*.ts
```

## 🔧 カスタマイズ

### バッチサイズの変更
`importCities.ts`の以下の値を変更:

```typescript
const batchSize = 1000; // お好みのサイズに変更
```

### 進捗表示のカスタマイズ
各スクリプトのconsole.log部分を編集してカスタマイズ可能です。

## 📈 実行例

```bash
$ npm run seed

🌱 Starting database seeding...

🔌 Checking database connection...
✅ Database connected successfully

============================================================
1️⃣  Importing Prefectures Data
============================================================
🚀 Starting prefectures data import...
📊 Found 47 prefectures to import
🗑️  Deleting existing data...
💾 Inserting prefecture data...
✅ Successfully imported 47 prefectures
📈 Total prefectures in database: 47

============================================================
2️⃣  Importing Cities Data
============================================================
🚀 Starting cities data import...
📁 File size: 23.45 MB
📖 Reading CSV file...
🔄 Parsing CSV data...
🔧 Transforming data...
📊 Found 124567 city records to import
🗑️  Deleting existing data...
💾 Inserting data in 125 batches...
📈 Progress: 100.0% (124567/124567 records)
✅ Successfully imported 124567 city records

============================================================
📊 Final Statistics
============================================================
✅ Prefectures: 47 records
✅ Cities: 124567 records
📈 Total: 124614 records

🎉 Database seeding completed successfully!
```

## 📚 参考情報

- [Prisma Documentation](https://www.prisma.io/docs)
- [PapaParse Documentation](https://www.papaparse.com/docs)
- [Node.js File System](https://nodejs.org/api/fs.html)
