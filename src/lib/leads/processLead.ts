import {
  DatabaseUnavailableError,
  isDatabaseError,
  toDatabaseUnavailableError,
} from "@/lib/db/pool";
import { hashClientIp } from "@/lib/leads/hashIp";
import {
  insertLead,
  markTelegramFailed,
  markTelegramSent,
} from "@/lib/leads/leadRepository";
import {
  assertLeadNotRateLimited,
  LeadRateLimitError,
} from "@/lib/leads/rateLimit";
import { sendTelegramLead } from "@/lib/leads/sendTelegramLead";
import type { LeadPayload, LeadSubmitResult } from "@/types/lead";

export type ProcessLeadRequestContext = {
  ip: string | null;
  userAgent: string | null;
};

export type ProcessLeadResult = LeadSubmitResult & {
  leadId?: string;
};

/**
 * DB-first lead pipeline:
 * validate (caller) → rate-limit check → INSERT → Telegram → status update.
 *
 * - DB down → throws DatabaseUnavailableError (API maps to 503)
 * - Telegram fail after INSERT → lead kept, telegram_status=failed, ok:true
 */
export async function processLead(
  payload: LeadPayload,
  context: ProcessLeadRequestContext,
): Promise<ProcessLeadResult> {
  const ipHash = hashClientIp(context.ip);

  try {
    await assertLeadNotRateLimited({ ipHash, phone: payload.phone });
  } catch (error) {
    if (error instanceof LeadRateLimitError) {
      throw error;
    }
    if (isDatabaseError(error)) {
      throw toDatabaseUnavailableError(error);
    }
    throw error;
  }

  let leadId: string;

  try {
    const row = await insertLead({
      payload,
      ipHash,
      userAgent: context.userAgent,
    });
    leadId = row.id;
  } catch (error) {
    if (isDatabaseError(error) || error instanceof DatabaseUnavailableError) {
      throw toDatabaseUnavailableError(error);
    }
    throw error;
  }

  const telegramSent = await sendTelegramLead(payload);

  try {
    if (telegramSent) {
      await markTelegramSent(leadId);
    } else {
      await markTelegramFailed(leadId, "Telegram send returned false");
      console.error(
        `[lead] Telegram delivery failed after INSERT (leadId=${leadId})`,
      );
    }
  } catch (error) {
    // Lead is already persisted; do not fail the client for status-update issues.
    console.error(
      `[lead] Failed to update telegram status (leadId=${leadId}):`,
      error,
    );
  }

  return {
    ok: true,
    telegramSent,
    leadId,
  };
}
