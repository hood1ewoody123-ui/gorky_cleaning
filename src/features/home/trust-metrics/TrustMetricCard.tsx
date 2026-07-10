"use client";

import { cn } from "@/lib/utils";

import type { TrustMetric } from "@/constants/trust-metrics";
import { CountUpValue } from "@/features/home/trust-metrics/TrustMetricParts";

type TrustMetricCardProps = {
  metric: TrustMetric;
};

export function TrustMetricCard({ metric }: TrustMetricCardProps) {
  const isAccent = metric.variant === "accent";

  return (
    <article
      className={cn(
        "flex min-h-[168px] flex-col justify-between rounded-[var(--radius-lg)] p-6 md:min-h-[184px] md:p-8",
        isAccent
          ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
          : "bg-surface text-foreground shadow-[var(--shadow-card)] ring-1 ring-foreground/5",
      )}
    >
      <CountUpValue
        endValue={metric.endValue}
        decimals={metric.decimals}
        prefix={metric.prefix}
        suffix={metric.suffix}
        className={cn(
          "text-4xl font-semibold tabular-nums tracking-tight md:text-5xl lg:text-[3.25rem]",
          isAccent ? "text-primary-foreground" : "text-foreground",
        )}
      />
      <p
        className={cn(
          "max-w-[14rem] text-sm leading-snug md:text-[0.9375rem]",
          isAccent ? "text-primary-foreground/80" : "text-muted-foreground",
        )}
      >
        {metric.label}
      </p>
    </article>
  );
}
