import { SITE } from "@/constants/site";

export const SEO = {
  defaultTitle: `${SITE.name} — клининг в ${SITE.city}`,
  homeTitle: `${SITE.name} — профессиональный клининг в ${SITE.city}`,
  description: SITE.description,
  keywords: [
    "клининг Нижний Новгород",
    "уборка квартир Нижний Новгород",
    "генеральная уборка",
    "уборка после ремонта",
    "уборка офисов",
    "клининговая компания",
    "профессиональная уборка",
    "Горький Клининг",
    "уборка домов",
    "коммерческий клининг",
  ],
  ogImage: {
    path: "/images/seo/og-banner.png",
    width: 1200,
    height: 630,
    alt: `${SITE.name} — профессиональный клининг в ${SITE.city}`,
  },
  themeColor: "#4A6B47",
  locale: SITE.locale,
  twitterHandle: undefined,
} as const;

export const SEO_ASSETS = {
  favicon: "/favicon.svg",
  appleTouchIcon: "/apple-touch-icon.png",
} as const;

export function getAbsoluteUrl(path = "/"): string {
  return new URL(path, SITE.url).toString();
}

export function getOgImageUrl(): string {
  return getAbsoluteUrl(SEO.ogImage.path);
}
