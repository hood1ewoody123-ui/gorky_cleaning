import { Star } from "lucide-react";

import { OVERALL_TRUST_RATING } from "@/constants/trust-dashboard";

export function TrustOverallRating() {
  const ratingLabel = OVERALL_TRUST_RATING.rating.toLocaleString("ru-RU", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <article className="inline-flex w-full max-w-sm flex-col gap-4 rounded-[var(--radius-lg)] bg-primary px-6 py-5 text-primary-foreground shadow-[var(--shadow-soft)] md:px-7 md:py-6">
      <p className="text-sm font-medium text-primary-foreground/85">
        {OVERALL_TRUST_RATING.label}
      </p>

      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-4xl font-semibold tracking-tight md:text-[2.75rem]">
            {ratingLabel}
          </p>
          <div
            className="flex items-center gap-0.5"
            aria-label={`Рейтинг ${ratingLabel} из 5`}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="size-4 fill-primary-foreground text-primary-foreground"
                aria-hidden
              />
            ))}
          </div>
        </div>

        <p className="text-right text-sm leading-snug text-primary-foreground/85">
          {OVERALL_TRUST_RATING.reviewsCount.toLocaleString("ru-RU")}
          <span className="block">отзывов</span>
        </p>
      </div>
    </article>
  );
}
