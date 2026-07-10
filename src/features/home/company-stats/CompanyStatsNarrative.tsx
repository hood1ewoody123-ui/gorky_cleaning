"use client";

import { COMPANY_STATS_PARAGRAPHS } from "@/constants/company-stats";
import type { CompanyStatsSegment } from "@/constants/company-stats";
import { CountUpValue } from "@/features/home/trust-metrics/TrustMetricParts";

const statClassName =
  "inline font-bold tabular-nums tracking-tight text-primary [font-size:1.12em]";

function renderSegment(segment: CompanyStatsSegment, index: number) {
  if (segment.type === "text") {
    return <span key={`text-${index}`}>{segment.value}</span>;
  }

  return (
    <CountUpValue
      key={segment.id}
      endValue={segment.endValue}
      decimals={segment.decimals}
      prefix={segment.prefix}
      suffix={segment.suffix}
      className={statClassName}
    />
  );
}

export function CompanyStatsNarrative() {
  return (
    <div className="relative max-w-3xl">
      <span
        aria-hidden
        className="absolute -left-3 top-1 hidden h-[calc(100%-0.25rem)] w-0.5 rounded-full bg-primary/25 md:-left-5 md:block"
      />

      <div className="flex flex-col gap-5 md:gap-6">
        {COMPANY_STATS_PARAGRAPHS.map((paragraph, paragraphIndex) => (
          <p
            key={paragraphIndex}
            className="text-[clamp(0.9375rem,1.6vw,1.25rem)] leading-[1.65] text-foreground/82"
          >
            {paragraph.map((segment, segmentIndex) =>
              renderSegment(segment, segmentIndex),
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
