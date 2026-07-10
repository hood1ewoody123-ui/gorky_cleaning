import { TRUST_METRICS } from "@/constants/trust-metrics";
import { MessengerButtons } from "@/features/home/trust-metrics/MessengerButtons";
import { TrustMetricCard } from "@/features/home/trust-metrics/TrustMetricCard";

export function TrustMetricsSection() {
  return (
    <section aria-label="Цифры доверия" className="section-y !pt-0">
      <div className="container-app flex flex-col gap-6 md:gap-8">
        <MessengerButtons />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {TRUST_METRICS.map((metric) => (
            <li key={metric.id}>
              <TrustMetricCard metric={metric} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
