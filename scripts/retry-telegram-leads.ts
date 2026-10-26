/**
 * Re-send Telegram for leads with telegram_status pending|failed.
 * Does not insert new lead rows.
 *
 *   npm run retry:telegram
 *   npm run retry:telegram -- 20
 */

import { retryFailedTelegramLeads } from "../src/lib/leads/retryFailedTelegram";

async function main() {
  const limitArg = process.argv[2];
  const limit = limitArg ? Number(limitArg) : 50;

  if (!Number.isFinite(limit) || limit < 1) {
    console.error("Limit must be a positive number");
    process.exit(1);
  }

  const summary = await retryFailedTelegramLeads(limit);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
