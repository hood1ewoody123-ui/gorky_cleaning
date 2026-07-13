import type { MetadataRoute } from "next";

import { SEO, SEO_ASSETS } from "@/constants/seo";
import { SITE } from "@/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F8FA",
    theme_color: SEO.themeColor,
    lang: "ru",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: SEO_ASSETS.favicon,
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: SEO_ASSETS.appleTouchIcon,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
