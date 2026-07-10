export const MESSENGER_LINKS = {
  whatsapp: "https://wa.me/79101243165",
  telegram: "https://t.me/prtcreator",
  max: "https://max.ru/gorkycleaning",
} as const;

export type TrustMetric = {
  id: string;
  endValue: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  variant?: "default" | "accent";
};

export const TRUST_METRICS: TrustMetric[] = [
  {
    id: "orders",
    endValue: 2500,
    suffix: "+",
    label: "выполненных заказов",
  },
  {
    id: "rating",
    endValue: 4.9,
    decimals: 1,
    label: "средняя оценка",
  },
  {
    id: "years",
    endValue: 3,
    suffix: " года",
    label: "на рынке",
  },
  {
    id: "repeat",
    endValue: 97,
    suffix: "%",
    label: "клиентов обращаются повторно",
    variant: "accent",
  },
];

export type MessengerButtonVariant = "solid" | "soft" | "outline";

export const MESSENGER_BUTTONS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: MESSENGER_LINKS.whatsapp,
    variant: "solid" satisfies MessengerButtonVariant,
  },
  {
    id: "telegram",
    label: "Telegram",
    href: MESSENGER_LINKS.telegram,
    variant: "soft" satisfies MessengerButtonVariant,
  },
  {
    id: "max",
    label: "MAX",
    href: MESSENGER_LINKS.max,
    variant: "outline" satisfies MessengerButtonVariant,
  },
] as const;
