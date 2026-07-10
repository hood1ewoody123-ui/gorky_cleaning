import { NextResponse } from "next/server";

import { leadApiSchema } from "@/lib/leads/leadApiSchema";
import { normalizeLeadEmail } from "@/lib/leads/normalizeLeadEmail";
import { sendTelegramLead } from "@/lib/leads/sendTelegramLead";
import type { LeadPayload } from "@/types/lead";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = leadApiSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid data" },
        { status: 400 },
      );
    }

    const payload: LeadPayload = {
      ...parsed.data,
      email: normalizeLeadEmail(parsed.data.email),
    };

    const telegramSent = await sendTelegramLead(payload);

    if (!telegramSent) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Не удалось отправить заявку. Попробуйте позже или позвоните нам.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({
      ok: true,
      telegramSent,
    });
  } catch (error) {
    console.error("[lead] Unexpected error:", error);
    return NextResponse.json(
      { ok: false, error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
