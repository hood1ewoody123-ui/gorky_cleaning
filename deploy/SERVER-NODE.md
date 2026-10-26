# Node.js на VPS (Timeweb)

Для сборки Next.js нужны **devDependencies** (TypeScript, Tailwind). Husky и lint-staged на сервере не нужны.

## Рекомендуемая версия

**Node.js 22 LTS** (локально и на VPS).

```bash
node -v   # ожидаем v22.x
```

## Установка Node 22 (Ubuntu, если сейчас v20)

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

## Если `npm ci` «висит»

1. Прервите: `Ctrl+C`
2. Запустите вручную:

```bash
cd /var/www/gorkycleaning
export HUSKY=0
export NPM_CONFIG_ENGINE_STRICT=false
npm ci --no-audit --no-fund
npm run build
pm2 restart deploy/ecosystem.config.cjs --update-env
pm2 save
```

Предупреждения `EBADENGINE` на Node 20 — из dev-пакетов (lint-staged, commitlint). На Node 22 их не будет.
