#!/bin/bash

set -eux
aws s3 cp s3://original-apis/.env.production .env
npm install
npx prisma migrate dev
npm run build