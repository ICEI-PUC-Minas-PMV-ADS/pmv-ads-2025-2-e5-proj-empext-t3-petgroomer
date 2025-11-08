#!/usr/bin/env sh
set -e
echo "Applying Prisma migrations..."
npx prisma migrate deploy
echo "Starting Nest app..."
node dist/main.js
