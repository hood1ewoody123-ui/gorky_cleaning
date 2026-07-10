import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AppProviders } from "@/components/providers/AppProviders";
import { YandexMetrika } from "@/components/analytics/YandexMetrika";
import { YandexScrollTracker } from "@/components/analytics/YandexScrollTracker";
import { SiteChromeProvider } from "@/features/site-chrome/SiteChromeProvider";
import { createRootMetadata } from "@/lib/seo/site-metadata";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = createRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={cn("h-full", inter.variable)}>
      <body className="min-h-full flex flex-col font-sans">
        <AppProviders>
          <SiteChromeProvider>{children}</SiteChromeProvider>
        </AppProviders>
        <YandexMetrika />
        <YandexScrollTracker />
      </body>
    </html>
  );
}
