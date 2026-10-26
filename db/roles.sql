-- One-time role bootstrap for gorky_db (database already exists).
-- Run as a PostgreSQL superuser (e.g. postgres) on the VPS.
-- Do NOT recreate gorky_db. Do NOT put real passwords in this file.
--
-- Role model:
--   gorky_owner   — existing NOLOGIN owner of the database (do not recreate)
--   gorky_migrate — LOGIN; owns objects it creates (DDL / migrations)
--   gorky_app     — LOGIN; SELECT/INSERT/UPDATE only (granted after migrations)
--
-- Never: GRANT gorky_owner TO gorky_migrate

-- ---------------------------------------------------------------------------
-- A. Create LOGIN roles only if missing (idempotent; skip if already on VPS)
-- ---------------------------------------------------------------------------

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'gorky_migrate') THEN
    CREATE ROLE gorky_migrate LOGIN
      NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'gorky_app') THEN
    CREATE ROLE gorky_app LOGIN
      NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT;
  END IF;
END
$$;

-- Set passwords interactively in psql (never store them in Git):
--   \password gorky_migrate
--   \password gorky_app

-- ---------------------------------------------------------------------------
-- B. CONNECT on database gorky_db
--    (safe from any database session as superuser)
-- ---------------------------------------------------------------------------

GRANT CONNECT ON DATABASE gorky_db TO gorky_migrate;
GRANT CONNECT ON DATABASE gorky_db TO gorky_app;

-- ---------------------------------------------------------------------------
-- C. Schema public — MUST run inside gorky_db
-- ---------------------------------------------------------------------------

\connect gorky_db

GRANT USAGE, CREATE ON SCHEMA public TO gorky_migrate;
GRANT USAGE ON SCHEMA public TO gorky_app;

-- After db/migrations/001_create_leads.sql + 002_grants_app_role.sql:
--   gorky_migrate owns `leads` (created under that login)
--   gorky_app has SELECT, INSERT, UPDATE on `leads` (no DELETE)
