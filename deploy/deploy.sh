#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/gorkycleaning"
PM2_NAME="gorkycleaning"
ENV_FILE="$APP_DIR/.env.production"

cd "$APP_DIR"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "✗ Нет $ENV_FILE — создайте файл с TELEGRAM_* и DATABASE_URL (см. .env.example / deploy/POSTGRES.md)"
  exit 1
fi

for key in TELEGRAM_BOT_TOKEN TELEGRAM_CHAT_ID NEXT_PUBLIC_SITE_URL DATABASE_URL; do
  if ! grep -q "^${key}=" "$ENV_FILE"; then
    echo "✗ В $ENV_FILE не найден ${key}=..."
    exit 1
  fi
done

echo "→ git pull"
git pull --ff-only

echo "→ npm ci (production: без husky, без engine-strict)"
export HUSKY=0
export NPM_CONFIG_ENGINE_STRICT=false
npm ci --no-audit --no-fund --prefer-offline

echo "→ build"
npm run build

echo "→ pm2 restart (with .env.production)"
if pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  pm2 restart deploy/ecosystem.config.cjs --update-env
else
  pm2 start deploy/ecosystem.config.cjs
fi

pm2 save

echo "✓ Deploy finished"
