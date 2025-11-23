#!/bin/bash
cd /app
npm install
npx prisma migrate dev
cp .env.ci .env
npm run test 
