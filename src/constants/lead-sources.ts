export const LEAD_SOURCE_LABELS: Record<string, string> = {
  "hero-form": "Форма в первом экране",
  "hero-header": "Кнопка в шапке hero",
  "hero-offer-cta": "CTA в hero",
  "final-cta": "Финальный блок на главной",
  "site-header": "Шапка сайта",
  "services-catalog": "Каталог услуг",
  calculator: "Калькулятор",
  "footer-services": "Услуги в подвале",
  "promo-popup": "Промо-попап",
};

export function getLeadSourceLabel(source: string): string {
  return LEAD_SOURCE_LABELS[source] ?? source;
}
