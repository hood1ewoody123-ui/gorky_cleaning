import Image from "next/image";

import type { CleaningProcessStep } from "@/constants/cleaning-process";
import { cn } from "@/lib/utils";

type ProcessImageProps = {
  step: CleaningProcessStep;
  className?: string;
};

const DEFAULT_IMAGE_SCALE = 1.14;

export function ProcessImage({ step, className }: ProcessImageProps) {
  const isPortrait = step.orientation === "portrait";
  const zoom = step.imageScale ?? DEFAULT_IMAGE_SCALE;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-xs)] shadow-[var(--shadow-card)]",
        isPortrait ? "mx-auto w-[240px] sm:w-[260px]" : "w-[340px] max-w-full",
        className,
      )}
      style={{ aspectRatio: `${step.imageWidth} / ${step.imageHeight}` }}
    >
      <Image
        src={step.image}
        alt={step.imageAlt}
        fill
        className="origin-center object-cover object-center"
        style={{ transform: `scale(${zoom})` }}
        sizes={
          isPortrait
            ? "(min-width: 1024px) 260px, 240px"
            : "(min-width: 1024px) 340px, 100vw"
        }
      />
    </div>
  );
}
