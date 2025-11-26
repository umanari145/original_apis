#!/bin/bash

set -eux
cd /opt/bitnami/app
npx prisma migrate dev
pm2 restart dist/server.js
