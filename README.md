# original_apis

## 都道府県API
![API仕様](service/src/docs/PREFECTURE_API.md)

### prisma
install
```
root@911d8808608a:/app# npm install @prisma/client

added 1 package in 26s
npm notice
npm notice New patch version of npm available! 11.6.0 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice


npm install prisma --save-dev

added 33 packages, and audited 35 packages in 1m

5 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```
初期ファイル作成
```
root@911d8808608a:/app# npx prisma init
Fetching latest updates for this subcommand...

✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

Next steps:
1. Run prisma dev to start a local Prisma Postgres server.
2. Define models in the schema.prisma file.
3. Run prisma migrate dev to migrate your local Prisma Postgres database.
4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and a managed serverless Postgres database. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started
    
```

npx client作成
```
npx prisma generate
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (v6.17.1) to ./generated/prisma in 599ms

Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)

Tip: Need your database queries to be 1000x faster? Accelerate offers you that and more: https://pris.ly/tip-2-accelerate
```


migrationファイル作成+スキーマ作成<br>
Laravelのmigrationなどと違いファイル作成とスキーマを同時に行う
```
npx prisma migrate dev --name Pref

root@c55a6cced828:/app# npx prisma migrate dev --name Pref
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": MySQL database "original_apis" at "o_apis_db:3306"

Applying migration `20251012001633_pref`

The following migration(s) have been created and applied from new schema changes:

prisma/migrations/
  └─ 20251012001633_pref/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (v6.17.1) to ./generated/prisma in 685ms


npm notice
npm notice New patch version of npm available! 11.6.0 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice

```
＊ ２回目以降は前回との差分のmigrationファイルが作られる<br>
--name ****がない場合、適用のみが走る


参考リンク<br>
https://qiita.com/quesman011/items/4546093f636865bf42c2<br>
https://zenn.dev/manase/scraps/2377eb089cb695

## seeding
市区町村データをサンプルで入れる
```
npm run seed:cities            

> seed:cities
> ts-node seed/importCities.ts

🚀 Starting cities data import...
📁 File size: 22.42 MB
📖 Reading CSV file...
🔄 Parsing CSV data...
🔧 Transforming data...
📊 Found 126340 city records to import
🗑️  Deleting existing data...
💾 Inserting data in 127 batches...
📈 Progress: 100.0% (119418/126340 records)

✅ Successfully imported 119418 city records
📈 Total city records in database: 119418
```

## jest

install
```
# Jest本体とTypeScript対応
npm install -D jest @types/jest ts-jest

# supertest（HTTPリクエストテスト用）
npm install -D supertest @types/supertest
```

test実行
```
 npm run test 

> test
> jest

Determining test suites to run...テスト開始: DBマイグレーション実行
・・・・・・・・・・・・
GET /api/prefs/99 404 25.075 ms - 130
 PASS  tests/pref.test.ts
  Prefecture API Endpoints
    GET /api/prefs
      ✓ 全都道府県を取得できること（200 OK） (225 ms)
      ✓ 有効な都道府県コードで都道府県を取得できること（200 OK） (129 ms)
      ✓ 存在しない都道府県コードで404エラーが返ること (146 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        3.316 s
Ran all test suites.
テスト終了: DB接続をクローズします
```

ファイル構成
```
├── helpers
│   └── db.ts helper 削除処理
├── jest.setup.ts 関数ごとの処理
├── pref.test.ts 実際のテスト
├── setup.ts 全処理開始時
└── teardown.ts　全処理終了時
```