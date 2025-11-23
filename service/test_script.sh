#!/bin/bash
cd /app
npm install
cp .env.ci .env
npx prisma migrate dev
npm run test 
