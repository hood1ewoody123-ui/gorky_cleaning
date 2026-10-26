# PostgreSQL — Gorky Cleaning

База `gorky_db` уже создана на VPS. Этот каталог содержит роли, миграции и заметки для администратора.

## Роли

| Роль            | Назначение                                                 |
| --------------- | ---------------------------------------------------------- |
| `gorky_owner`   | Владелец БД, `NOLOGIN` (уже есть)                          |
| `gorky_migrate` | DDL: миграции                                              |
| `gorky_app`     | Runtime Next.js: `SELECT` / `INSERT` / `UPDATE` по `leads` |

Полная инструкция: `deploy/POSTGRES.md`.

## Миграции

1. `roles.sql` — один раз от суперпользователя
2. `migrations/001_create_leads.sql` — от `gorky_migrate`
3. `migrations/002_grants_app_role.sql` — от `gorky_migrate`

## Откат

См. раздел «Откат» в `deploy/POSTGRES.md`. Таблицу `leads` не удаляйте в проде без бэкапа.
