import { Star } from "lucide-react";

import type { ClientReview } from "@/constants/trust-dashboard";

type ReviewCardProps = {
  review: ClientReview;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[var(--radius-lg)] bg-white p-5 shadow-[var(--shadow-card)] ring-1 ring-foreground/5 md:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-foreground">
            {review.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {review.context} · {review.service}
          </p>
        </div>
        <time
          dateTime={review.date}
          className="text-xs text-muted-foreground sm:shrink-0"
        >
          {review.date}
        </time>
      </div>

      <div
        className="mt-4 flex items-center gap-0.5"
        aria-label={`Оценка ${review.rating} из 5`}
      >
        {Array.from({ length: review.rating }).map((_, index) => (
          <Star
            key={index}
            className="size-4 fill-accent text-accent"
            aria-hidden
          />
        ))}
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
        {review.text}
      </p>
    </article>
  );
}
