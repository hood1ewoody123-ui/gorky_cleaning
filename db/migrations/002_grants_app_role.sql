-- Grant minimal DML to the runtime app role.
-- Prerequisite: role gorky_app already exists (see db/roles.sql).
-- Apply as gorky_migrate (or gorky_owner) against gorky_db.

BEGIN;

GRANT USAGE ON SCHEMA public TO gorky_app;

GRANT SELECT, INSERT, UPDATE ON TABLE leads TO gorky_app;

-- No DELETE for the app role (audit retention).
REVOKE DELETE ON TABLE leads FROM gorky_app;

COMMIT;
