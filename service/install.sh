#!/bin/bash

set -eux
cd /opt/bitnami/app
npx prisma migrate dev
npm run start
