import { CompanyStatsNarrative } from "@/features/home/company-stats/CompanyStatsNarrative";

export function CompanyStatsSection() {
  return (
    <section
      aria-label="Показатели компании"
      className="section-y !py-12 md:!py-16 bg-[linear-gradient(180deg,transparent_0%,var(--surface-muted)_48%,transparent_100%)]"
    >
      <div className="container-app">
        <CompanyStatsNarrative />
      </div>
    </section>
  );
}
