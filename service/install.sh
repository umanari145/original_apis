#!/bin/bash
set -eux
cd /opt/bitnami/app
aws s3 cp s3://original-apis/.env.production .env --profile for_awslightsail
npm install >> /opt/bitnami/deploy.log
npx prisma migrate dev >> /opt/bitnami/deploy.log
npm run build >> /opt/bitnami/deploy.log
