import dynamic from "next/dynamic";

import { SectionSkeleton } from "@/shared/loading/SectionSkeleton";

export const DeferredCleaningProcessSection = dynamic(
  () =>
    import("@/features/home/cleaning-process/CleaningProcessSection").then(
      (mod) => mod.CleaningProcessSection,
    ),
  {
    loading: () => <SectionSkeleton />,
  },
);

export const DeferredWhatsIncludedSection = dynamic(
  () =>
    import("@/features/home/whats-included/WhatsIncludedSection").then(
      (mod) => mod.WhatsIncludedSection,
    ),
  {
    loading: () => <SectionSkeleton className="min-h-[520px]" />,
  },
);

export const DeferredServicesCatalogSection = dynamic(
  () =>
    import("@/features/home/services-catalog/ServicesCatalogSection").then(
      (mod) => mod.ServicesCatalogSection,
    ),
  {
    loading: () => <SectionSkeleton />,
  },
);

export const DeferredCleaningCalculatorSection = dynamic(
  () =>
    import("@/features/home/calculator/CleaningCalculatorSection").then(
      (mod) => mod.CleaningCalculatorSection,
    ),
  {
    loading: () => <SectionSkeleton className="min-h-[640px]" />,
  },
);

export const DeferredTrustDashboardSection = dynamic(
  () =>
    import("@/features/home/trust-dashboard/TrustDashboardSection").then(
      (mod) => mod.TrustDashboardSection,
    ),
  {
    loading: () => <SectionSkeleton />,
  },
);

export const DeferredWorkCasesSection = dynamic(
  () =>
    import("@/features/home/work-cases/WorkCasesSection").then(
      (mod) => mod.WorkCasesSection,
    ),
  {
    loading: () => <SectionSkeleton />,
  },
);
