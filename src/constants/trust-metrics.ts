export const MESSENGER_LINKS = {
  vk: "https://vk.com/prtkir4",
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
    endValue: 700,
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
    id: "vk",
    label: "ВКонтакте",
    href: MESSENGER_LINKS.vk,
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
