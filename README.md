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

通常のスキーマ適用は
```
npx prisma migrate dev
```

参考リンク<br>
https://qiita.com/quesman011/items/4546093f636865bf42c2<br>
https://zenn.dev/manase/scraps/2377eb089cb695

## seeding
市区町村データをサンプルで入れる

```
npm run seed
```

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

特定ファイル

```
npm run test tests/controllers/city.test.ts 

PASS  tests/controllers/city.test.ts
  Prefecture City API Endpoints
    GET /api/cities/pref/:prefCode
      ✓ 都道府県の市区町村を取得（200 OK） (338 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.04 s
Ran all test suites matching tests/controllers/city.test.ts.
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

下記が１ケースだがdescribe.onlyで他をskipできる(describeの中に複数のitがある場合はit.only)
```
  describe.only('GET /api/town/city/:CityCode', () => {
    
    it('市区町村コードから字を取得（200 OK）', async () => {
      const response = await request(app)
        .get('/api/town/city/01102')
        //.expect('Content-Type', /json/)
        //.expect(200);
        const town = response.body.data[0]
        console.log(town)
        expect(town).toEqual({
          zip_code: '0010010',
          pref_code: '01',
          pref_name: '北海道',
          pref_kana: 'ホッカイドウ',
          pref_roma: 'HOKKAIDO',
          city_code: '01102',
          city_name: '札幌市北区',
          city_kana: 'サッポロシキタク',
          city_roma: 'SAPPORO SHI KITA KU',
          town_name: '北十条西（１～４丁目）',
          town_kana: 'キタ１０ジョウニシ（１－４チョウメ）',
          town_roma: 'KITA10-JONISHI(1-4-CHOME)'
        });

    });
  });


```
### jestの設定について
https://zenn.dev/eijijii/scraps/22a20bfe7f4da9


### jestの並列性
jestは効率アップのために複数のテストを並列に実行する。<br>
例えば、一括で`npm run test`をすると`service/tests/controllers/city.test.ts`と`service/tests/controllers/pref.test.ts`の実行を平行に行う。
<br><br>
そのためDBの状態がコンフリクトを起こしてテスト結果のたびに結果が異なる。<br>
(1ファイルごとであれば大丈夫。)<br>
そのため、直列に逐次実行させたい場合は以下のオプションを入れる(package.json参照)<br>
"jest --runInBand",


## GitHubActions

test・・docker-compose-ci.ymlを使ってjestを走らせ全てOKになることを確認
deploy・・AWSアカウントを使いCodePipelineを起動
### 環境変数
gh auth login
ブラウザで認証後
```
source aws_configure.txt
gh secret set AWS_ACCESS_KEY_ID --body "$AWS_ACCESS_KEY_ID" --repo umanari145/original_apis
gh secret set AWS_SECRET_ACCESS_KEY --body "$AWS_SECRET_ACCESS_KEY" --repo umanari145/original_apis
gh secret set AWS_REGION --body "$AWS_REGION" --repo umanari145/original_apis
```

## CodePipeline
IaCは`https://github.com/umanari145/original_apis_infra`に格納

具体的な設定は↑のサイトを。

Source・・GitHubとAWSの連動。成果物がS3に保存される。
Build・・build時にbuildspec.ymlが動いてbuildが働き成果物がS3に保存。(今回はinstall.shで実行されるためあまり仕事をしていない)
Deploy・・deploy時にservice/appspec.ymlが動いて、デプロイ先とデプロイ時のシェル(install.sh)を記載しておく

## 本番環境での作業
### debian系へのlastesのnodeのインストール
LAMP環境のlightsailに登録
```
sudo apt install -y nodejs npm

sudo npm install n -g

sudo n stable
```

### Apacheでのリバースプロキシ
http(80)、https(443)で受け付けているので、リバースプロキシを使って内部で3000に飛ばす
```
<VirtualHost _default_:443>
  DocumentRoot "/opt/bitnami/apache/htdocs"
  SSLEngine on
  SSLCertificateFile "/opt/bitnami/apache/conf/bitnami/certs/server.crt"
  SSLCertificateKeyFile "/opt/bitnami/apache/conf/bitnami/certs/server.key"

 +ProxyPreserveHost On
 +ProxyPass / http://localhost:3000/
 +ProxyPassReverse / http://localhost:3000/

  <Directory "/opt/bitnami/apache/htdocs">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
  </Directory>

  # Error Documents
  ErrorDocument 503 /503.html
</VirtualHost>

```
### VPSサーバーでの環境構築

```
1. プロセス・マネージャー: PM2
最も一般的で推奨されるのは、PM2 (Process Manager 2)のようなプロセス・マネージャーです。

PM2の主な機能と利点
自動再起動: アプリケーションがクラッシュしたり、予期せず終了したりした場合に、自動的に再起動します。

永続化: サーバーが再起動した後も、アプリケーションを自動で立ち上げ直す設定（startupコマンド）が可能です。

ロギング: ログの収集と管理を簡単に行えます。

クラスタリング: 複数のCPUコアを最大限に活用するために、アプリケーションをクラスタモードで実行し、負荷分散を行うことができます。

PM2の使用例
インストール: npm install -g pm2

起動: pm2 start your_app.js

状態確認: pm2 status

永続化設定: pm2 save の後、pm2 startup を実行し、表示されたコマンドを実行します。
```

実際のサーバーの起動
```
#　インストール
npm install pm2 -g

# 起動
pm2 start dist/server.js
```