import type { LeadPayload, LeadSubmitResult } from "@/types/lead";
import { trackLeadSubmit } from "@/lib/analytics/yandexMetrika";

export async function submitLead(
  payload: LeadPayload,
): Promise<LeadSubmitResult> {
  const { website, ...lead } = payload;

  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...lead,
      // Always include honeypot key so filled bots are detectable
      website: website ?? "",
    }),
  });

  const result = (await response.json()) as LeadSubmitResult;

  if (!response.ok || !result.ok) {
    throw new Error(result.error ?? "Не удалось отправить заявку");
  }

  trackLeadSubmit(payload.source, payload.page);

  return result;
}
