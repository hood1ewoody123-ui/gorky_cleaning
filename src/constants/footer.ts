import { CONTACT } from "@/constants/home";
import { LEGAL_DISCLAIMERS } from "@/constants/legal-disclaimers";
import { MESSENGER_LINKS } from "@/constants/trust-metrics";
import { SITE } from "@/constants/site";

export const FOOTER_COMPANY_LINKS = [
  { label: "О компании", href: "#about" },
  { label: "Примеры работ", href: "#cases" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "FAQ", href: "#faq" },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Пользовательское соглашение", href: "/terms" },
] as const;

export const FOOTER_CONTACT = {
  phone: CONTACT.phoneDisplay,
  phoneHref: CONTACT.phoneHref,
  email: CONTACT.email,
  emailHref: CONTACT.emailHref,
  region: CONTACT.region,
  schedule: "Ежедневно, 8:00–22:00",
} as const;

export const FOOTER_MESSENGERS = [
  { label: "ВКонтакте", href: MESSENGER_LINKS.vk },
  { label: "Telegram", href: MESSENGER_LINKS.telegram },
  { label: "MAX", href: MESSENGER_LINKS.max },
] as const;

export const FOOTER_TAGLINE =
  "Профессиональный клининг в Нижнем Новгороде — уборка квартир, домов, офисов и коммерческих помещений.";

export const FOOTER_LEGAL_DISCLAIMER = LEGAL_DISCLAIMERS.notPublicOffer;

export const FOOTER_COPYRIGHT = `© ${new Date().getFullYear()} ${SITE.name}. Все права защищены.`;
