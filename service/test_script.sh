#!/bin/bash
cd /app
npm install
cp .env.ci .env
npm run test 
