# PostgreSQL на VPS — Горький Клининг

База **`gorky_db` уже создана**. Не создавайте её повторно.

PostgreSQL слушает только `127.0.0.1:5432`. Next.js на PM2 — **`127.0.0.1:3002`** (`-H 127.0.0.1`; не меняйте bind-адрес на `0.0.0.0`).

## Цепочка заявки

1. Валидация Zod (`leadApiSchema`)
2. Honeypot / rate-limit
3. `INSERT` в `leads` (DB-first)
4. Telegram (`formatTelegramLeadMessage` — формат зафиксирован тестами)
5. Обновление `telegram_status` (`sent` | `failed`)

Если БД недоступна → HTTP **503**.

Если Telegram упал после INSERT → заявка **остаётся** в БД (`failed`/`pending`), клиент получает `ok: true`. Повторная отправка: `npm run retry:telegram` (без дублей строк).

## 1. Роли (один раз, суперпользователь)

| Роль            | Логин   | Назначение                                       |
| --------------- | ------- | ------------------------------------------------ |
| `gorky_owner`   | NOLOGIN | владелец БД (**уже есть** — не пересоздавать)    |
| `gorky_migrate` | LOGIN   | DDL; владелец создаваемых таблиц                 |
| `gorky_app`     | LOGIN   | runtime: `SELECT`, `INSERT`, `UPDATE` на `leads` |

**Не** выдавайте `gorky_migrate` членство в `gorky_owner`.

### Проверка: не запускайте `CREATE ROLE` повторно

```bash
sudo -u postgres psql -c '\du gorky_*'
```

- Если `gorky_migrate` / `gorky_app` уже есть — **не** выполняйте `CREATE ROLE` вручную.
- `db/roles.sql` идемпотентен: создаёт роли только при отсутствии (`IF NOT EXISTS`).

### Bootstrap + пароли (интерактивно)

```bash
cd /var/www/gorkycleaning
sudo -u postgres psql -v ON_ERROR_STOP=1 -f db/roles.sql
```

Файл сам делает `\connect gorky_db` для прав на схему `public` (CONNECT на БД и права на схему разделены).

Пароли **только** через `\password` внутри psql — не в файлах и не в `export`:

```bash
sudo -u postgres psql
```

```text
\password gorky_migrate
\password gorky_app
\q
```

## 2. Миграции (от `gorky_migrate`)

Интерактивный пароль (`-W`). **Не** используйте `export PGPASSWORD=...`.

```bash
cd /var/www/gorkycleaning

psql -h 127.0.0.1 -U gorky_migrate -d gorky_db -W -v ON_ERROR_STOP=1 \
  -f db/migrations/001_create_leads.sql

psql -h 127.0.0.1 -U gorky_migrate -d gorky_db -W -v ON_ERROR_STOP=1 \
  -f db/migrations/002_grants_app_role.sql
```

Проверка:

```bash
psql -h 127.0.0.1 -U gorky_app -d gorky_db -W -c '\d leads'
psql -h 127.0.0.1 -U gorky_app -d gorky_db -W -c 'SELECT COUNT(*) FROM leads;'
```

## 3. Env + PM2

В `/var/www/gorkycleaning/.env.production` **добавьте** переменные БД.

**Не перезаписывайте** существующие `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `TELEGRAM_API_BASE`, `TELEGRAM_PROXY_*` и прочие уже работающие ключи.

```env
DATABASE_URL=postgresql://gorky_app:APP_PASSWORD@127.0.0.1:5432/gorky_db
DATABASE_SSL=disable
LEAD_IP_HASH_PEPPER=длинная_случайная_строка
```

Права на файл: `chmod 600 .env.production`.

Перезапуск **без** смены hostname (сохраните `-H 127.0.0.1` / bind на loopback):

```bash
cd /var/www/gorkycleaning
# после git pull + npm ci + npm run build
pm2 restart deploy/ecosystem.config.cjs --update-env
pm2 save
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3002/
```

`deploy/ecosystem.config.cjs` подхватывает `.env.production` через `load-env-file.cjs`.

Не меняйте args PM2 на `-H 0.0.0.0`. Не убирайте ограничение `127.0.0.1`.

## 4. Тест заявки

```bash
curl -sS -X POST http://127.0.0.1:3002/api/leads \
  -H 'Content-Type: application/json' \
  -H 'Host: gorkycleaning.ru' \
  -d '{
    "source":"site-header",
    "page":"/",
    "name":"Тест БД",
    "phone":"+7 (999) 000-00-01",
    "service":"Проверка PostgreSQL",
    "area":"—"
  }'
```

Ожидание: `{"ok":true,"telegramSent":true}` (или `telegramSent":false` при сбое Telegram — строка всё равно в БД).

```bash
psql -h 127.0.0.1 -U gorky_app -d gorky_db -W \
  -c "SELECT id, name, telegram_status, created_at FROM leads ORDER BY created_at DESC LIMIT 5;"
```

Повтор Telegram без дублей:

```bash
cd /var/www/gorkycleaning
# нужны DATABASE_URL и уже настроенные TELEGRAM_* в окружении
set -a && source .env.production && set +a
npm run retry:telegram
```

## 5. Откат

**Код (без потери данных в БД):**

1. `git checkout` предыдущего релиза / `git revert`
2. Убрать `DATABASE_URL` из `.env.production` **нельзя** на версии с DB-first — сайт начнёт отдавать 503 на заявках. Откатывайте **код** на коммит до PostgreSQL, затем `npm ci && npm run build && pm2 restart … --update-env` (с сохранением `-H 127.0.0.1`).

**Схема (только если нужно откатить DDL; сделайте бэкап):**

```bash
pg_dump -h 127.0.0.1 -U gorky_migrate -d gorky_db -W -t leads > /root/leads-backup.sql

psql -h 127.0.0.1 -U gorky_migrate -d gorky_db -W -v ON_ERROR_STOP=1 <<'SQL'
DROP TRIGGER IF EXISTS leads_set_updated_at ON leads;
DROP FUNCTION IF EXISTS set_leads_updated_at();
DROP TABLE IF EXISTS leads;
SQL
```

Роли `gorky_app` / `gorky_migrate` можно оставить.

## Риски

- Пока миграция не применена, а новый код уже задеплоен — все заявки → **503**.
- Слабый `LEAD_IP_HASH_PEPPER` упрощает радужные таблицы по IP-хешам.
- Rate-limit считает уже сохранённые строки; при атаке таблица растёт — мониторьте `COUNT(*)`.
- Скрипт `retry:telegram` может повторно отправить сообщение, если статус не успел стать `sent` (гонка); INSERT дублей не создаёт.
