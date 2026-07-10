import { buildHomePageJsonLd } from "@/lib/seo/json-ld";

export function HomePageJsonLd() {
  const jsonLd = buildHomePageJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
