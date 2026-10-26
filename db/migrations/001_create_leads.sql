-- Gorky Cleaning — leads persistence
-- Apply as role gorky_migrate against database gorky_db (already exists).
-- Do NOT recreate gorky_db.

BEGIN;

-- gen_random_uuid() is built-in since PostgreSQL 13 (no pgcrypto required).

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Mirrors LeadPayload from the Next.js app
  source TEXT NOT NULL,
  page TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  area TEXT NOT NULL,
  email TEXT,
  comment TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

  -- Request context for spam / ops (hashed IP only)
  ip_hash TEXT,
  user_agent TEXT,

  -- Telegram delivery (retry without duplicating the lead row)
  telegram_status TEXT NOT NULL DEFAULT 'pending'
    CONSTRAINT leads_telegram_status_check
      CHECK (telegram_status IN ('pending', 'sent', 'failed')),
  telegram_sent_at TIMESTAMPTZ,
  telegram_error TEXT,
  telegram_attempts INTEGER NOT NULL DEFAULT 0
    CONSTRAINT leads_telegram_attempts_nonneg CHECK (telegram_attempts >= 0)
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx
  ON leads (created_at DESC);

CREATE INDEX IF NOT EXISTS leads_telegram_status_idx
  ON leads (telegram_status)
  WHERE telegram_status <> 'sent';

CREATE INDEX IF NOT EXISTS leads_phone_created_at_idx
  ON leads (phone, created_at DESC);

CREATE INDEX IF NOT EXISTS leads_ip_hash_created_at_idx
  ON leads (ip_hash, created_at DESC)
  WHERE ip_hash IS NOT NULL;

CREATE OR REPLACE FUNCTION set_leads_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS leads_set_updated_at ON leads;

CREATE TRIGGER leads_set_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION set_leads_updated_at();

COMMIT;
