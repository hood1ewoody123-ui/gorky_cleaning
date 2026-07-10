export const YANDEX_METRIKA_ID = Number(
  process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? "110396882",
);

/** Имена целей — создайте их в интерфейсе Яндекс Метрики с теми же идентификаторами */
export const YANDEX_METRIKA_GOALS = {
  leadSubmit: "lead_submit",
  ctaOpen: "cta_open",
  scroll25: "scroll_25",
  scroll50: "scroll_50",
  scroll75: "scroll_75",
  scroll90: "scroll_90",
} as const;

export const YANDEX_METRIKA_ENABLED =
  Number.isFinite(YANDEX_METRIKA_ID) && YANDEX_METRIKA_ID > 0;
