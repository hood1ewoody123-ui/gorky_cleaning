import { getEnv } from "@/lib/env";
import { formatTelegramLeadMessage } from "@/lib/leads/formatLeadMessage";
import { telegramFetch } from "@/lib/leads/telegramFetch";
import type { LeadPayload } from "@/types/lead";

export async function sendTelegramLead(payload: LeadPayload): Promise<boolean> {
  const {
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID,
    TELEGRAM_API_BASE,
    TELEGRAM_PROXY_URL,
    TELEGRAM_PROXY_SECRET,
  } = getEnv();

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error(
      "[lead] Telegram credentials are not configured. Check TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env.production and PM2 env.",
    );
    return false;
  }

  try {
    const response = await telegramFetch(
      `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: formatTelegramLeadMessage(payload),
          parse_mode: "HTML",
        }),
      },
      {
        apiBase: TELEGRAM_API_BASE,
        proxyUrl: TELEGRAM_PROXY_URL,
        proxySecret: TELEGRAM_PROXY_SECRET,
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
