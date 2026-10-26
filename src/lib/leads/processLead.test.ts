import { beforeEach, describe, expect, it, vi } from "vitest";

const insertLead = vi.fn();
const markTelegramSent = vi.fn();
const markTelegramFailed = vi.fn();
const assertLeadNotRateLimited = vi.fn();
const sendTelegramLead = vi.fn();
const hashClientIp = vi.fn(() => "ip-hash");

vi.mock("@/lib/leads/leadRepository", () => ({
  insertLead: (input: unknown) => insertLead(input),
  markTelegramSent: (id: unknown) => markTelegramSent(id),
  markTelegramFailed: (id: unknown, message: unknown) =>
    markTelegramFailed(id, message),
}));

vi.mock("@/lib/leads/rateLimit", () => ({
  assertLeadNotRateLimited: (input: unknown) => assertLeadNotRateLimited(input),
  LeadRateLimitError: class LeadRateLimitError extends Error {
    code = "LEAD_RATE_LIMIT" as const;
  },
}));

vi.mock("@/lib/leads/sendTelegramLead", () => ({
  sendTelegramLead: (payload: unknown) => sendTelegramLead(payload),
}));

vi.mock("@/lib/leads/hashIp", () => ({
  hashClientIp: (ip: string | null | undefined) => {
    void ip;
    return hashClientIp();
  },
}));
import { DatabaseUnavailableError } from "@/lib/db/pool";
import { processLead } from "@/lib/leads/processLead";
import type { LeadPayload } from "@/types/lead";

const payload: LeadPayload = {
  source: "hero-form",
  page: "/",
  name: "Анна",
  phone: "+7 (999) 111-22-33",
  service: "Генеральная — Квартира",
  area: "50 м²",
};

describe("processLead", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    assertLeadNotRateLimited.mockResolvedValue(undefined);
    insertLead.mockResolvedValue({ id: "lead-1" });
    markTelegramSent.mockResolvedValue(undefined);
    markTelegramFailed.mockResolvedValue(undefined);
  });

  it("inserts into PostgreSQL before sending Telegram", async () => {
    const order: string[] = [];
    insertLead.mockImplementation(async () => {
      order.push("insert");
      return { id: "lead-1" };
    });
    sendTelegramLead.mockImplementation(async () => {
      order.push("telegram");
      return true;
    });

    const result = await processLead(payload, {
      ip: "203.0.113.10",
      userAgent: "vitest",
    });

    expect(order).toEqual(["insert", "telegram"]);
    expect(result).toEqual({
      ok: true,
      telegramSent: true,
      leadId: "lead-1",
    });
    expect(markTelegramSent).toHaveBeenCalledWith("lead-1");
    expect(markTelegramFailed).not.toHaveBeenCalled();
  });

  it("keeps the lead when Telegram fails after INSERT", async () => {
    sendTelegramLead.mockResolvedValue(false);

    const result = await processLead(payload, {
      ip: "203.0.113.10",
      userAgent: "vitest",
    });

    expect(insertLead).toHaveBeenCalledOnce();
    expect(result.ok).toBe(true);
    expect(result.telegramSent).toBe(false);
    expect(markTelegramFailed).toHaveBeenCalledWith(
      "lead-1",
      "Telegram send returned false",
    );
    expect(markTelegramSent).not.toHaveBeenCalled();
  });

  it("surfaces database failures as DatabaseUnavailableError", async () => {
    insertLead.mockRejectedValue(
      new DatabaseUnavailableError("connection refused"),
    );

    await expect(
      processLead(payload, { ip: null, userAgent: null }),
    ).rejects.toBeInstanceOf(DatabaseUnavailableError);

    expect(sendTelegramLead).not.toHaveBeenCalled();
  });
});
