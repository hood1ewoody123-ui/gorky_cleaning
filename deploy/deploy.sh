#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/gorkycleaning"
PM2_NAME="gorkycleaning"

cd "$APP_DIR"

echo "→ git pull"
git pull --ff-only

echo "→ npm ci"
npm ci

echo "→ build (нужен .env.production до этой команды)"
npm run build

echo "→ pm2 restart"
if pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  pm2 restart "$PM2_NAME"
else
  pm2 start deploy/ecosystem.config.cjs
fi

pm2 save

echo "✓ Deploy finished"
