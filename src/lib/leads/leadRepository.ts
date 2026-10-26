import type { QueryResultRow } from "pg";

import {
  getPool,
  isDatabaseError,
  toDatabaseUnavailableError,
} from "@/lib/db/pool";
import type { LeadPayload } from "@/types/lead";

export type TelegramDeliveryStatus = "pending" | "sent" | "failed";

export type LeadRow = {
  id: string;
  created_at: Date;
  updated_at: Date;
  source: string;
  page: string;
  name: string;
  phone: string;
  service: string;
  area: string;
  email: string | null;
  comment: string | null;
  metadata: Record<string, unknown>;
  ip_hash: string | null;
  user_agent: string | null;
  telegram_status: TelegramDeliveryStatus;
  telegram_sent_at: Date | null;
  telegram_error: string | null;
  telegram_attempts: number;
};

export type InsertLeadInput = {
  payload: LeadPayload;
  ipHash: string | null;
  userAgent: string | null;
};

function mapLeadRow(row: QueryResultRow): LeadRow {
  return {
    id: String(row.id),
    created_at: row.created_at as Date,
    updated_at: row.updated_at as Date,
    source: String(row.source),
    page: String(row.page),
    name: String(row.name),
    phone: String(row.phone),
    service: String(row.service),
    area: String(row.area),
    email: row.email == null ? null : String(row.email),
    comment: row.comment == null ? null : String(row.comment),
    metadata:
      row.metadata && typeof row.metadata === "object"
        ? (row.metadata as Record<string, unknown>)
        : {},
    ip_hash: row.ip_hash == null ? null : String(row.ip_hash),
    user_agent: row.user_agent == null ? null : String(row.user_agent),
    telegram_status: row.telegram_status as TelegramDeliveryStatus,
    telegram_sent_at: (row.telegram_sent_at as Date | null) ?? null,
    telegram_error:
      row.telegram_error == null ? null : String(row.telegram_error),
    telegram_attempts: Number(row.telegram_attempts),
  };
}

export function leadRowToPayload(row: LeadRow): LeadPayload {
  return {
    source: row.source,
    page: row.page,
    name: row.name,
    phone: row.phone,
    service: row.service,
    area: row.area,
    ...(row.email ? { email: row.email } : {}),
    ...(row.comment ? { comment: row.comment } : {}),
    ...(Object.keys(row.metadata).length > 0 ? { metadata: row.metadata } : {}),
  };
}

async function runQuery<T extends QueryResultRow>(
  text: string,
  values?: unknown[],
) {
  try {
    const pool = getPool();
    return await pool.query<T>(text, values);
  } catch (error) {
    if (isDatabaseError(error)) {
      throw toDatabaseUnavailableError(error);
    }
    throw error;
  }
}

export async function insertLead(input: InsertLeadInput): Promise<LeadRow> {
  const { payload, ipHash, userAgent } = input;

  const result = await runQuery(
    `
      INSERT INTO leads (
        source,
        page,
        name,
        phone,
        service,
        area,
        email,
        comment,
        metadata,
        ip_hash,
        user_agent,
        telegram_status
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10, $11, 'pending'
      )
      RETURNING *
    `,
    [
      payload.source,
      payload.page,
      payload.name,
      payload.phone,
      payload.service,
      payload.area,
      payload.email ?? null,
      payload.comment ?? null,
      JSON.stringify(payload.metadata ?? {}),
      ipHash,
      userAgent,
    ],
  );

  const row = result.rows[0];
  if (!row) {
    throw toDatabaseUnavailableError(new Error("INSERT returned no row"));
  }

  return mapLeadRow(row);
}

export async function markTelegramSent(leadId: string): Promise<void> {
  await runQuery(
    `
      UPDATE leads
      SET
        telegram_status = 'sent',
        telegram_sent_at = now(),
        telegram_error = NULL,
        telegram_attempts = telegram_attempts + 1
      WHERE id = $1::uuid
        AND telegram_status <> 'sent'
    `,
    [leadId],
  );
}

export async function markTelegramFailed(
  leadId: string,
  errorMessage: string,
): Promise<void> {
  const truncated =
    errorMessage.length > 2000 ? errorMessage.slice(0, 2000) : errorMessage;

  await runQuery(
    `
      UPDATE leads
      SET
        telegram_status = 'failed',
        telegram_error = $2,
        telegram_attempts = telegram_attempts + 1
      WHERE id = $1::uuid
        AND telegram_status <> 'sent'
    `,
    [leadId, truncated],
  );
}

export async function countRecentLeadsByIpHash(
  ipHash: string,
  windowMs: number,
): Promise<number> {
  const result = await runQuery<{ count: string }>(
    `
      SELECT COUNT(*)::text AS count
      FROM leads
      WHERE ip_hash = $1
        AND created_at > now() - ($2::bigint * interval '1 millisecond')
    `,
    [ipHash, windowMs],
  );

  return Number(result.rows[0]?.count ?? 0);
}

export async function countRecentLeadsByPhone(
  phone: string,
  windowMs: number,
): Promise<number> {
  const result = await runQuery<{ count: string }>(
    `
      SELECT COUNT(*)::text AS count
      FROM leads
      WHERE phone = $1
        AND created_at > now() - ($2::bigint * interval '1 millisecond')
    `,
    [phone, windowMs],
  );

  return Number(result.rows[0]?.count ?? 0);
}

export async function listLeadsNeedingTelegramRetry(
  limit = 50,
): Promise<LeadRow[]> {
  const result = await runQuery(
    `
      SELECT *
      FROM leads
      WHERE telegram_status IN ('pending', 'failed')
      ORDER BY created_at ASC
      LIMIT $1
    `,
    [limit],
  );

  return result.rows.map(mapLeadRow);
}
