-- init.sql

CREATE DATABASE IF NOT EXISTS original_apis;

-- Docker内部ネットワークからのアクセス用ユーザー
CREATE USER IF NOT EXISTS 'original_apis_user'@'%' IDENTIFIED BY 'original_apis_pass';

-- original_apisデータベースに対する全権限
GRANT ALL PRIVILEGES ON original_apis.* TO 'original_apis_user'@'%';

-- Prismaマイグレーション用の追加権限
GRANT CREATE, ALTER, DROP, INDEX, REFERENCES ON *.* TO 'original_apis_user'@'%';

FLUSH PRIVILEGES;