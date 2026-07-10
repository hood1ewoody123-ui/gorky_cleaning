import type { LeadPayload, LeadSubmitResult } from "@/types/lead";
import { trackLeadSubmit } from "@/lib/analytics/yandexMetrika";

export async function submitLead(
  payload: LeadPayload,
): Promise<LeadSubmitResult> {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as LeadSubmitResult;

  if (!response.ok || !result.ok) {
    throw new Error(result.error ?? "Не удалось отправить заявку");
  }

  trackLeadSubmit(payload.source, payload.page);

  return result;
}
