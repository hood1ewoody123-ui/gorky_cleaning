import { Pool, type PoolConfig } from "pg";

import { getEnv } from "@/lib/env";

let pool: Pool | null = null;

export class DatabaseUnavailableError extends Error {
  readonly code = "DATABASE_UNAVAILABLE" as const;

  constructor(
    message = "Database is unavailable",
    options?: { cause?: unknown },
  ) {
    super(message, options);
    this.name = "DatabaseUnavailableError";
  }
}

export class DatabaseConfigError extends Error {
  readonly code = "DATABASE_CONFIG" as const;

  constructor(message = "DATABASE_URL is not configured") {
    super(message);
    this.name = "DatabaseConfigError";
  }
}

function buildSslConfig(): PoolConfig["ssl"] {
  const { DATABASE_SSL, DATABASE_SSL_REJECT_UNAUTHORIZED } = getEnv();

  if (!DATABASE_SSL || DATABASE_SSL === "disable") {
    return undefined;
  }

  if (DATABASE_SSL === "require") {
    return {
      rejectUnauthorized: DATABASE_SSL_REJECT_UNAUTHORIZED !== "false",
    };
  }

  return undefined;
}

function buildPoolConfig(): PoolConfig {
  const { DATABASE_URL } = getEnv();

  if (!DATABASE_URL) {
    throw new DatabaseConfigError();
  }

  return {
    connectionString: DATABASE_URL,
    ssl: buildSslConfig(),
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  };
}

export function getPool(): Pool {
  if (pool) {
    return pool;
  }

  pool = new Pool(buildPoolConfig());

  pool.on("error", (error) => {
    console.error("[db] Unexpected pool error:", error);
  });

  return pool;
}

/** Test helper — resets the singleton between suites. */
export function resetPoolForTests(): void {
  pool = null;
}

export function isDatabaseError(error: unknown): boolean {
  if (error instanceof DatabaseUnavailableError) {
    return true;
  }

  if (error instanceof DatabaseConfigError) {
    return true;
  }

  if (!(error instanceof Error)) {
    return false;
  }

  const code =
    "code" in error && typeof (error as { code?: unknown }).code === "string"
      ? (error as { code: string }).code
      : undefined;

  return (
    code === "ECONNREFUSED" ||
    code === "ETIMEDOUT" ||
    code === "ENOTFOUND" ||
    code === "ECONNRESET" ||
    code === "57P01" ||
    code === "57P03" ||
    code === "53300" ||
    code === "08001" ||
    code === "08006" ||
    code === "28P01" ||
    code === "3D000"
  );
}

export function toDatabaseUnavailableError(
  error: unknown,
): DatabaseUnavailableError {
  if (error instanceof DatabaseUnavailableError) {
    return error;
  }

  if (error instanceof DatabaseConfigError) {
    return new DatabaseUnavailableError(error.message, { cause: error });
  }

  const message =
    error instanceof Error ? error.message : "Unknown database error";

  return new DatabaseUnavailableError(message, { cause: error });
}
