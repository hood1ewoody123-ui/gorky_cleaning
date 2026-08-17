import { CONTACT } from "@/constants/home";
import { SITE } from "@/constants/site";

export const LEGAL_ENTITY = {
  ownerFullName: "Клыгин Кирилл Михайлович",
  ownerShortName: "Клыгин К.М.",
  legalName: "ИП Клыгин К.М. (Горький Клининг)",
  brandName: SITE.name,
  status: "Индивидуальный предприниматель",
  inn: "525629129950",
  ogrnip: "325527500107171",
  region: "Нижний Новгород и Нижегородская область",
  legalAddress: "Нижегородская область, Российская Федерация",
  phone: CONTACT.phoneDisplay,
  phoneHref: CONTACT.phoneHref,
  email: CONTACT.email,
  emailHref: CONTACT.emailHref,
  siteUrl: SITE.url,
  siteDomain: SITE.domain,
  dataRetentionYears: 3,
  hostingProvider: "Timeweb Cloud (Российская Федерация)",
  analyticsProvider: "Яндекс.Метрика",
  analyticsId: "110396882",
  leadDelivery: "Telegram",
  telegramProxyProvider: "Cloudflare Workers",
  documentsUpdatedAt: "17 августа 2026 г.",
} as const;

export const LEGAL_ROUTES = {
  privacy: "/privacy",
  terms: "/terms",
} as const;

export type LegalDocumentSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};
