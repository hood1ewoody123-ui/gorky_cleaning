import { beforeEach, describe, expect, it, vi } from "vitest";

const processLead = vi.fn();

vi.mock("@/lib/leads/processLead", () => ({
  processLead: (payload: unknown, context: unknown) =>
    processLead(payload, context),
}));

import { DatabaseUnavailableError } from "@/lib/db/pool";
import { POST } from "@/app/api/leads/route";
import { LeadRateLimitError } from "@/lib/leads/rateLimit";

function jsonRequest(body: unknown) {
  return new Request("http://localhost/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "203.0.113.9",
      "user-agent": "vitest",
    },
    body: JSON.stringify(body),
  });
}

const validBody = {
  source: "hero-form",
  page: "/",
  name: "Анна",
  phone: "+7 (999) 123-45-67",
  service: "Генеральная — Квартира",
  area: "50 м²",
};

describe("POST /api/leads", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 on invalid payload", async () => {
    const response = await POST(jsonRequest({ name: "A" }));
    expect(response.status).toBe(400);
    expect(processLead).not.toHaveBeenCalled();
  });

  it("silently accepts honeypot spam without DB", async () => {
    const response = await POST(
      jsonRequest({ ...validBody, website: "http://spam.example" }),
    );
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({ ok: true, telegramSent: true });
    expect(processLead).not.toHaveBeenCalled();
  });

  it("returns 503 when database is unavailable", async () => {
    processLead.mockRejectedValue(
      new DatabaseUnavailableError("connection refused"),
    );

    const response = await POST(jsonRequest(validBody));
    const json = await response.json();

    expect(response.status).toBe(503);
    expect(json.ok).toBe(false);
  });

  it("returns 429 when rate-limited", async () => {
    processLead.mockRejectedValue(new LeadRateLimitError());

    const response = await POST(jsonRequest(validBody));
    expect(response.status).toBe(429);
  });

  it("returns ok when lead is stored even if telegramSent is false", async () => {
    processLead.mockResolvedValue({
      ok: true,
      telegramSent: false,
      leadId: "lead-1",
    });

    const response = await POST(jsonRequest(validBody));
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({ ok: true, telegramSent: false });
  });
});
