import { describe, expect, it } from "vitest";

import { formatTelegramLeadMessage } from "@/lib/leads/formatLeadMessage";
import type { LeadPayload } from "@/types/lead";

/**
 * Golden tests: Telegram message format must stay byte-stable.
 * Do not change wording, emoji, field order, or HTML without an explicit product decision.
 */
describe("formatTelegramLeadMessage (golden)", () => {
  it("formats a minimal consultation-style lead", () => {
    const payload: LeadPayload = {
      source: "site-header",
      page: "/",
      name: "Анна",
      phone: "+7 (999) 123-45-67",
      service: "Бесплатная консультация",
      area: "—",
    };

    expect(formatTelegramLeadMessage(payload)).toBe(
      [
        "🧹 <b>Новая заявка — Горький Клининг</b>",
        "",
        "<b>Источник:</b> Шапка сайта",
        "<b>Страница:</b> /",
        "<b>Имя:</b> Анна",
        "<b>Телефон:</b> +7 (999) 123-45-67",
        "<b>Услуга:</b> Бесплатная консультация",
      ].join("\n"),
    );
  });

  it("includes area, email, comment when present", () => {
    const payload: LeadPayload = {
      source: "hero-form",
      page: "/",
      name: "Иван & Ко",
      phone: "+7 (900) 111-22-33",
      service: "Генеральная — Квартира",
      area: "65 м²",
      email: "ivan@example.com",
      comment: "Нужен выезд <завтра>",
    };

    expect(formatTelegramLeadMessage(payload)).toBe(
      [
        "🧹 <b>Новая заявка — Горький Клининг</b>",
        "",
        "<b>Источник:</b> Форма в первом экране",
        "<b>Страница:</b> /",
        "<b>Имя:</b> Иван &amp; Ко",
        "<b>Телефон:</b> +7 (900) 111-22-33",
        "<b>Услуга:</b> Генеральная — Квартира",
        "<b>Площадь / объект:</b> 65 м²",
        "<b>Email:</b> ivan@example.com",
        "<b>Комментарий:</b> Нужен выезд &lt;завтра&gt;",
      ].join("\n"),
    );
  });

  it("hides placeholder area values", () => {
    for (const area of ["—", "-", "м²", "за объект", "не указана", ""]) {
      const message = formatTelegramLeadMessage({
        source: "final-cta",
        page: "/uslugi",
        name: "Оля",
        phone: "+7 (901) 000-00-00",
        service: "Консультация",
        area,
      });

      expect(message).not.toContain("<b>Площадь / объект:</b>");
    }
  });

  it("formats service-landing metadata but skips calculator metadata", () => {
    const withMeta = formatTelegramLeadMessage({
      source: "services-catalog",
      page: "/uslugi/generalnaya-uborka-kvartiry",
      name: "Пётр",
      phone: "+7 (902) 222-33-44",
      service: "Генеральная уборка квартиры",
      area: "80 м²",
      metadata: {
        categoryLabel: "Квартиры",
        unitLabel: "м²",
        groupId: "apartments",
        promoDiscount: "15%",
      },
    });

    expect(withMeta).toBe(
      [
        "🧹 <b>Новая заявка — Горький Клининг</b>",
        "",
        "<b>Источник:</b> Каталог услуг",
        "<b>Страница:</b> /uslugi/generalnaya-uborka-kvartiry",
        "<b>Имя:</b> Пётр",
        "<b>Телефон:</b> +7 (902) 222-33-44",
        "<b>Услуга:</b> Генеральная уборка квартиры",
        "<b>Площадь / объект:</b> 80 м²",
        "",
        "<b>Категория:</b> Квартиры",
        "<b>Тарификация:</b> за м²",
        "<b>Скидка:</b> 15%",
        "<b>Раздел:</b> Квартиры",
      ].join("\n"),
    );

    const calculator = formatTelegramLeadMessage({
      source: "calculator",
      page: "/",
      name: "Пётр",
      phone: "+7 (902) 222-33-44",
      service: "Расчёт калькулятора",
      area: "2 комн. ≈ 45 м²",
      metadata: {
        estimatedPrice: 4500,
        rooms: 2,
      },
    });

    expect(calculator).not.toContain("<b>Категория:</b>");
    expect(calculator).not.toContain("estimatedPrice");
  });

  it("falls back to raw source when label is unknown", () => {
    const message = formatTelegramLeadMessage({
      source: "custom-campaign",
      page: "/promo",
      name: "Тест",
      phone: "+7 (903) 333-44-55",
      service: "Акция",
      area: "—",
    });

    expect(message).toContain("<b>Источник:</b> custom-campaign");
  });
});
