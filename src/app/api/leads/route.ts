import { NextResponse } from "next/server";

import { DatabaseUnavailableError } from "@/lib/db/pool";
import { getClientIp } from "@/lib/leads/clientIp";
import { isHoneypotTriggered, leadApiSchema } from "@/lib/leads/leadApiSchema";
import { normalizeLeadEmail } from "@/lib/leads/normalizeLeadEmail";
import { processLead } from "@/lib/leads/processLead";
import { LeadRateLimitError } from "@/lib/leads/rateLimit";
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

    // Silent success for bots that fill the honeypot — no DB write, no Telegram.
    if (isHoneypotTriggered(parsed.data)) {
      return NextResponse.json({ ok: true, telegramSent: true });
    }

    const { website: _honeypot, ...leadFields } = parsed.data;
    void _honeypot;

    const payload: LeadPayload = {
      source: leadFields.source,
      page: leadFields.page,
      name: leadFields.name,
      phone: leadFields.phone,
      service: leadFields.service,
      area: leadFields.area,
      email: normalizeLeadEmail(leadFields.email),
      ...(leadFields.comment ? { comment: leadFields.comment } : {}),
      ...(leadFields.metadata ? { metadata: leadFields.metadata } : {}),
    };

    const result = await processLead(payload, {
      ip: getClientIp(request),
      userAgent: request.headers.get("user-agent"),
    });

    return NextResponse.json({
      ok: true,
      telegramSent: result.telegramSent,
    });
  } catch (error) {
    if (error instanceof LeadRateLimitError) {
      return NextResponse.json(
        {
          ok: false,
          error: "Слишком много заявок. Подождите немного или позвоните нам.",
        },
        { status: 429 },
      );
    }

    if (error instanceof DatabaseUnavailableError) {
      console.error("[lead] Database unavailable:", error.message);
      return NextResponse.json(
        {
          ok: false,
          error:
            "Не удалось отправить заявку. Попробуйте позже или позвоните нам.",
        },
        { status: 503 },
      );
    }

    console.error("[lead] Unexpected error:", error);
    return NextResponse.json(
      { ok: false, error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
