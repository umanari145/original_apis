#!/bin/bash
cd /app
cp .env.ci .env
npm run test 