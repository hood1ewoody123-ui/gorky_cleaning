import { TRUST_DASHBOARD_HEADING } from "@/constants/trust-dashboard";
import { ReviewsCarousel } from "@/features/home/trust-dashboard/ReviewsCarousel";
import { TrustGuaranteesPanel } from "@/features/home/trust-dashboard/TrustGuaranteesPanel";
import { TrustOverallRating } from "@/features/home/trust-dashboard/TrustOverallRating";
import { SectionIntro } from "@/shared/SectionIntro";

export function TrustDashboardSection() {
  return (
    <section
      id="reviews"
      aria-labelledby="trust-dashboard-heading"
      className="section-y"
    >
      <div className="container-app flex flex-col gap-8 md:gap-12">
        <SectionIntro
          id="trust-dashboard-heading"
          title={TRUST_DASHBOARD_HEADING}
        />

        <div className="flex flex-col gap-8 md:gap-10">
          <TrustOverallRating />
          <TrustGuaranteesPanel />
          <ReviewsCarousel />
        </div>
      </div>
    </section>
  );
}
