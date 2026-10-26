# Leads pipeline

## Purpose

Accept website lead forms, persist them in PostgreSQL (`gorky_db.leads`), then notify managers via Telegram without changing the existing message format.

## Architecture

```
Forms → submitLead() → POST /api/leads
  → Zod (leadApiSchema) → honeypot / rate-limit
  → INSERT leads (telegram_status=pending)
  → sendTelegramLead(formatTelegramLeadMessage)
  → UPDATE telegram_status (sent|failed)
```

- DB unavailable → HTTP 503
- Telegram fail after INSERT → row kept; `npm run retry:telegram` re-sends without new INSERT

## Dependencies

- `pg` pool (`src/lib/db/pool.ts`)
- Zod validation (`leadApiSchema.ts`)
- Telegram Bot API (`sendTelegramLead.ts` + optional proxy)

## Notes

- Do not alter `formatTelegramLeadMessage` without updating golden tests.
- Runtime DB role: `gorky_app`. Migrations: `gorky_migrate`. See `deploy/POSTGRES.md`.
- No Resend/email channel in this project — Telegram only.
