import type { LucideIcon } from "lucide-react";
import { BadgeCheck, CalendarDays, CreditCard, Sparkles } from "lucide-react";

export const TRUST_DASHBOARD_HEADING =
  "Рейтинги, отзывы и условия работы — всё прозрачно, чтобы вы могли принять решение без сомнений.";

export const OVERALL_TRUST_RATING = {
  rating: 4.9,
  reviewsCount: 220,
  label: "Средняя оценка клиентов",
} as const;

export type TrustGuarantee = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export type ClientReview = {
  id: string;
  name: string;
  context: string;
  service: string;
  rating: number;
  text: string;
  date: string;
};

export const TRUST_GUARANTEES: TrustGuarantee[] = [
  {
    id: "fixed-price",
    label: "Фиксируем стоимость до начала работ",
    icon: BadgeCheck,
  },
  {
    id: "pay-after",
    label: "Оплата после приёмки результата",
    icon: CreditCard,
  },
  {
    id: "equipment",
    label: "Своё оборудование и профхимия",
    icon: Sparkles,
  },
  {
    id: "weekends",
    label: "Работаем без выходных",
    icon: CalendarDays,
  },
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: "review-01",
    name: "Анна С.",
    context: "Двухкомнатная квартира",
    service: "Генеральная уборка",
    rating: 5,
    text: "Приехали вовремя, всё по чек-листу. Особенно понравилась кухня и санузел — блестят, запаха химии нет. Цену озвучили заранее и не меняли.",
    date: "Март 2026",
  },
  {
    id: "review-02",
    name: "Дмитрий К.",
    context: "Офис IT-компании",
    service: "Уборка после ремонта",
    rating: 5,
    text: "Убрали open space после отделки за один день. Пыль со стекла и полов ушла полностью, можно было заезжать на следующий день.",
    date: "Февраль 2026",
  },
  {
    id: "review-03",
    name: "Елена М.",
    context: "Квартира перед заселением",
    service: "Уборка перед заселением",
    rating: 5,
    text: "Заказывали перед заселением в новостройку. Команда аккуратная, менеджер на связи, прислали фото результата. Рекомендую.",
    date: "Январь 2026",
  },
  {
    id: "review-04",
    name: "Игорь В.",
    context: "Частный дом",
    service: "Генеральная уборка",
    rating: 5,
    text: "Большой дом, много стекла и лестница — справились за два дня. Видно, что работают по системе, а не «на глазок».",
    date: "Декабрь 2025",
  },
  {
    id: "review-05",
    name: "Марина Л.",
    context: "Кабинет юриста",
    service: "Регулярная уборка",
    rating: 5,
    text: "Взяли на регулярное обслуживание офис. Всегда одни и те же стандарты, ключи и доступ организовали без лишней суеты.",
    date: "Ноябрь 2025",
  },
];
