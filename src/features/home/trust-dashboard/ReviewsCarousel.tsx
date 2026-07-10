"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CLIENT_REVIEWS } from "@/constants/trust-dashboard";
import { ReviewCard } from "@/features/home/trust-dashboard/ReviewCard";

const carouselNavClassName =
  "static inset-auto size-10 translate-x-0 translate-y-0 rounded-full";

export function ReviewsCarousel() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-h4 text-foreground">Отзывы клиентов</h3>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {CLIENT_REVIEWS.map((review) => (
            <CarouselItem
              key={review.id}
              className="basis-full pl-4 md:basis-1/2"
            >
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-4 flex justify-start gap-2 pr-20 sm:justify-end sm:pr-0">
          <CarouselPrevious className={carouselNavClassName} />
          <CarouselNext className={carouselNavClassName} />
        </div>
      </Carousel>
    </div>
  );
}
