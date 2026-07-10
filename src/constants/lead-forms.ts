export type LeadDialogVariant = "main" | "consultation" | "promo" | "service";

export const LEAD_FORM_COPY = {
  main: {
    title: "Быстрый расчёт стоимости",
    description: "Заполните форму — перезвоним за 15 минут и уточним детали.",
    submit: "Рассчитать стоимость",
    successTitle: "Заявка принята",
    successDescription: "Перезвоним в ближайшее время и рассчитаем стоимость.",
  },
  consultation: {
    title: "Бесплатная консультация",
    description:
      "Оставьте контакты — менеджер перезвонит, ответит на вопросы и подберёт формат уборки.",
    submit: "Жду звонка",
    successTitle: "Заявка отправлена",
    successDescription: "Перезвоним в течение 15 минут в рабочее время.",
  },
  promo: {
    title: "Скидка 15% на первый заказ",
    description:
      "Оставьте заявку сейчас — закрепим скидку 15% на первую уборку и согласуем удобное время.",
    submit: "Получить скидку",
    successTitle: "Скидка закреплена",
    successDescription:
      "Мы свяжемся с вами и применим скидку 15% к первому заказу.",
    badge: "−15%",
  },
  service: {
    title: "Заказ услуги",
    description:
      "Оставьте заявку — рассчитаем стоимость и согласуем время выезда бригады.",
    submit: "Оставить заявку",
    successTitle: "Заявка отправлена",
    successDescription: "Перезвоним и уточним детали по выбранной услуге.",
  },
} as const;

export const PROMO_POPUP = {
  delayMs: 45_000,
  storageKey: "gorkycleaning:promo-popup:v1",
} as const;
