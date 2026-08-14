import type { Metadata } from "next";

import { SEO, getAbsoluteUrl, getOgImageUrl } from "@/constants/seo";
import { SITE } from "@/constants/site";

const defaultOpenGraph = {
  type: "website" as const,
  locale: SEO.locale,
  siteName: SITE.name,
  images: [
    {
      url: getOgImageUrl(),
      width: SEO.ogImage.width,
      height: SEO.ogImage.height,
      alt: SEO.ogImage.alt,
    },
  ],
};

const defaultTwitter = {
  card: "summary_large_image" as const,
  images: [getOgImageUrl()],
};

export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: SEO.defaultTitle,
      template: `%s | ${SITE.name}`,
    },
    description: SEO.description,
    keywords: [...SEO.keywords],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      ...defaultOpenGraph,
      url: SITE.url,
      title: SEO.defaultTitle,
      description: SEO.description,
    },
    twitter: {
      ...defaultTwitter,
      title: SEO.defaultTitle,
      description: SEO.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/manifest.webmanifest",
    other: {
      "theme-color": SEO.themeColor,
    },
  };
}

export function createHomeMetadata(): Metadata {
  const canonical = getAbsoluteUrl("/");

  return {
    title: SEO.homeTitle,
    description: SEO.description,
    keywords: [...SEO.keywords],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      ...defaultOpenGraph,
      url: canonical,
      title: SEO.homeTitle,
      description: SEO.description,
    },
    twitter: {
      ...defaultTwitter,
      title: SEO.homeTitle,
      description: SEO.description,
    },
  };
}

export function createLegalPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = getAbsoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      ...defaultOpenGraph,
      url: canonical,
      title: `${title} | ${SITE.name}`,
      description,
    },
    twitter: {
      ...defaultTwitter,
      title: `${title} | ${SITE.name}`,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
