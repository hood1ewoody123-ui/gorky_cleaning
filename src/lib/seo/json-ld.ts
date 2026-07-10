import { CONTACT } from "@/constants/home";
import { FAQ_ITEMS } from "@/constants/faq";
import { getAbsoluteUrl, getOgImageUrl } from "@/constants/seo";
import { SERVICE_CATALOG_ITEMS } from "@/constants/services-catalog";
import { SITE } from "@/constants/site";
import {
  CLIENT_REVIEWS,
  OVERALL_TRUST_RATING,
} from "@/constants/trust-dashboard";

const ORGANIZATION_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

const REVIEW_PUBLISHED_AT: Record<string, string> = {
  "review-01": "2026-03-01",
  "review-02": "2026-02-01",
  "review-03": "2026-01-15",
  "review-04": "2025-12-01",
  "review-05": "2025-11-01",
};

function buildLocalBusinessSchema() {
  return {
    "@type": "CleaningService",
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    alternateName: SITE.nameEn,
    url: SITE.url,
    telephone: CONTACT.phoneHref.replace("tel:", ""),
    email: CONTACT.email,
    image: getOgImageUrl(),
    logo: getAbsoluteUrl("/favicon.svg"),
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: "Нижегородская область",
      addressCountry: "RU",
    },
    areaServed: [
      {
        "@type": "City",
        name: SITE.city,
      },
      {
        "@type": "AdministrativeArea",
        name: "Нижегородская область",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "22:00",
      },
    ],
    priceRange: "₽₽",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(OVERALL_TRUST_RATING.rating),
      reviewCount: String(OVERALL_TRUST_RATING.reviewsCount),
      bestRating: "5",
      worstRating: "1",
    },
  };
}

function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    inLanguage: "ru-RU",
  };
}

function buildServiceSchemas() {
  const uniqueServices = new Map<
    string,
    (typeof SERVICE_CATALOG_ITEMS)[number]
  >();

  for (const item of SERVICE_CATALOG_ITEMS) {
    if (!uniqueServices.has(item.name)) {
      uniqueServices.set(item.name, item);
    }
  }

  return Array.from(uniqueServices.values())
    .slice(0, 12)
    .map((item) => ({
      "@type": "Service",
      "@id": `${SITE.url}/#service-${item.id}`,
      name: item.name,
      provider: {
        "@id": ORGANIZATION_ID,
      },
      areaServed: {
        "@type": "City",
        name: SITE.city,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "RUB",
        price: String(item.priceFrom),
        description: `от ${item.priceFrom} ${item.priceSuffix}`,
        availability: "https://schema.org/InStock",
      },
    }));
}

function buildFaqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function buildReviewSchemas() {
  return CLIENT_REVIEWS.map((review) => ({
    "@type": "Review",
    "@id": `${SITE.url}/#${review.id}`,
    author: {
      "@type": "Person",
      name: review.name,
    },
    datePublished: REVIEW_PUBLISHED_AT[review.id] ?? "2026-01-01",
    reviewBody: review.text,
    name: `${review.service} — ${review.context}`,
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(review.rating),
      bestRating: "5",
      worstRating: "1",
    },
    itemReviewed: {
      "@id": ORGANIZATION_ID,
    },
  }));
}

function buildBreadcrumbSchema() {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE.url}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: SITE.url,
      },
    ],
  };
}

export function buildHomePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebsiteSchema(),
      buildLocalBusinessSchema(),
      ...buildServiceSchemas(),
      buildFaqSchema(),
      ...buildReviewSchemas(),
      buildBreadcrumbSchema(),
    ],
  };
}

export function buildFaqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    ...buildFaqSchema(),
  };
}
