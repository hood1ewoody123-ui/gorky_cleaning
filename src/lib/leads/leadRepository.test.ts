import { beforeEach, describe, expect, it, vi } from "vitest";

const query = vi.fn();
const getPool = vi.fn(() => ({ query }));

vi.mock("@/lib/db/pool", async () => {
  const actual =
    await vi.importActual<typeof import("@/lib/db/pool")>("@/lib/db/pool");
  return {
    ...actual,
    getPool: () => getPool() as unknown as ReturnType<typeof actual.getPool>,
  };
});
import { DatabaseUnavailableError, resetPoolForTests } from "@/lib/db/pool";
import { insertLead } from "@/lib/leads/leadRepository";

describe("insertLead", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetPoolForTests();
  });

  it("persists all LeadPayload fields", async () => {
    const createdAt = new Date("2026-10-26T12:00:00.000Z");
    query.mockResolvedValue({
      rows: [
        {
          id: "11111111-1111-1111-1111-111111111111",
          created_at: createdAt,
          updated_at: createdAt,
          source: "calculator",
          page: "/",
          name: "Анна",
          phone: "+7 (999) 111-22-33",
          service: "Расчёт",
          area: "45 м²",
          email: "a@b.ru",
          comment: "вечер",
          metadata: { rooms: 2 },
          ip_hash: "abc",
          user_agent: "vitest",
          telegram_status: "pending",
          telegram_sent_at: null,
          telegram_error: null,
          telegram_attempts: 0,
        },
      ],
    });

    const row = await insertLead({
      payload: {
        source: "calculator",
        page: "/",
        name: "Анна",
        phone: "+7 (999) 111-22-33",
        service: "Расчёт",
        area: "45 м²",
        email: "a@b.ru",
        comment: "вечер",
        metadata: { rooms: 2 },
      },
      ipHash: "abc",
      userAgent: "vitest",
    });

    expect(query).toHaveBeenCalledOnce();
    const [, values] = query.mock.calls[0] as [string, unknown[]];
    expect(values).toEqual([
      "calculator",
      "/",
      "Анна",
      "+7 (999) 111-22-33",
      "Расчёт",
      "45 м²",
      "a@b.ru",
      "вечер",
      JSON.stringify({ rooms: 2 }),
      "abc",
      "vitest",
    ]);
    expect(row.id).toBe("11111111-1111-1111-1111-111111111111");
    expect(row.telegram_status).toBe("pending");
  });

  it("maps connection errors to DatabaseUnavailableError", async () => {
    const err = Object.assign(new Error("connect ECONNREFUSED"), {
      code: "ECONNREFUSED",
    });
    query.mockRejectedValue(err);

    await expect(
      insertLead({
        payload: {
          source: "hero-form",
          page: "/",
          name: "Анна",
          phone: "+7 (999) 111-22-33",
          service: "Уборка",
          area: "30 м²",
        },
        ipHash: null,
        userAgent: null,
      }),
    ).rejects.toBeInstanceOf(DatabaseUnavailableError);
  });
});
