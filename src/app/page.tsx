import type { Metadata } from "next";

import { CompanyStatsSection } from "@/features/home/company-stats/CompanyStatsSection";
import {
  DeferredCleaningCalculatorSection,
  DeferredCleaningProcessSection,
  DeferredServicesCatalogSection,
  DeferredTrustDashboardSection,
  DeferredWhatsIncludedSection,
  DeferredWorkCasesSection,
} from "@/features/home/deferred-sections";
import { FaqSection } from "@/features/home/faq/FaqSection";
import { FinalCtaSection } from "@/features/home/final-cta/FinalCtaSection";
import { FounderSection } from "@/features/home/founder/FounderSection";
import { HeroSection } from "@/features/home/hero/HeroSection";
import { TrustMetricsSection } from "@/features/home/trust-metrics/TrustMetricsSection";
import { WorkStagesSection } from "@/features/home/work-stages/WorkStagesSection";
import { HomePageJsonLd } from "@/lib/seo/HomePageJsonLd";
import { createHomeMetadata } from "@/lib/seo/site-metadata";
import { SiteFooter } from "@/shared/footer/SiteFooter";

export const metadata: Metadata = createHomeMetadata();

export default function HomePage() {
  return (
    <>
      <HomePageJsonLd />

      <main className="flex flex-1 flex-col pb-24 md:pb-0">
        <HeroSection />
        <DeferredServicesCatalogSection />
        <DeferredCleaningCalculatorSection />
        <DeferredWorkCasesSection />
        <TrustMetricsSection />
        <DeferredCleaningProcessSection />
        <DeferredWhatsIncludedSection />
        <CompanyStatsSection />
        <FounderSection />
        <WorkStagesSection />
        <DeferredTrustDashboardSection />
        <FaqSection />
        <FinalCtaSection />
        <SiteFooter />
      </main>
    </>
  );
}
