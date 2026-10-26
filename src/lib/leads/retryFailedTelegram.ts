import {
  leadRowToPayload,
  listLeadsNeedingTelegramRetry,
  markTelegramFailed,
  markTelegramSent,
} from "@/lib/leads/leadRepository";
import { sendTelegramLead } from "@/lib/leads/sendTelegramLead";

export type RetryTelegramSummary = {
  scanned: number;
  sent: number;
  failed: number;
  skipped: number;
};

/**
 * Re-send Telegram for leads stuck in pending/failed.
 * Already-sent rows are never re-inserted or re-messaged (UPDATE is guarded).
 */
export async function retryFailedTelegramLeads(
  limit = 50,
): Promise<RetryTelegramSummary> {
  const rows = await listLeadsNeedingTelegramRetry(limit);
  const summary: RetryTelegramSummary = {
    scanned: rows.length,
    sent: 0,
    failed: 0,
    skipped: 0,
  };

  for (const row of rows) {
    if (row.telegram_status === "sent") {
      summary.skipped += 1;
      continue;
    }

    const payload = leadRowToPayload(row);
    const ok = await sendTelegramLead(payload);

    if (ok) {
      await markTelegramSent(row.id);
      summary.sent += 1;
    } else {
      await markTelegramFailed(row.id, "Retry: Telegram send returned false");
      summary.failed += 1;
    }
  }

  return summary;
}
