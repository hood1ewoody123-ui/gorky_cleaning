export const COOKIE_CONSENT_STORAGE_KEY = "gorkycleaning:cookie-consent";

export type CookieConsentStatus = "accepted" | "rejected";

export const COOKIE_CONSENT_COPY = {
  title: "Мы используем cookie",
  description:
    "Сайт использует файлы cookie и сервис Яндекс.Метрика для анализа посещаемости. Технически необходимые cookie нужны для корректной работы сайта. Подробнее — в",
  privacyLinkLabel: "Политике конфиденциальности",
  acceptLabel: "Принять",
  rejectLabel: "Отклонить",
} as const;

export const COOKIE_TYPES = [
  {
    id: "necessary",
    label: "Технически необходимые",
    description:
      "Обеспечивают работу форм, безопасность и сохранение выбора пользователя (в том числе решения по cookie).",
    required: true,
  },
  {
    id: "analytics",
    label: "Аналитические",
    description:
      "Помогают понимать, как посетители используют сайт. Используется Яндекс.Метрика.",
    required: false,
  },
] as const;
