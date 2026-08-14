import { getEnv } from "@/lib/env";
import { formatTelegramLeadMessage } from "@/lib/leads/formatLeadMessage";
import type { LeadPayload } from "@/types/lead";

export async function sendTelegramLead(payload: LeadPayload): Promise<boolean> {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = getEnv();

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error(
      "[lead] Telegram credentials are not configured. Check TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env.production and PM2 env.",
    );
    return false;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: formatTelegramLeadMessage(payload),
          parse_mode: "HTML",
        }),
        signal: AbortSignal.timeout(15_000),
      },
    );

    if (!response.ok) {
      console.error("[lead] Telegram API error:", await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("[lead] Telegram network error:", error);
    return false;
  }
}
