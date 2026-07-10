"use client";

import { motion, useReducedMotion } from "motion/react";

import type { RoomMapPoint } from "@/shared/interactive-room-map/types";
import { cn } from "@/lib/utils";

type HotspotDotProps = {
  point: RoomMapPoint;
  isActive: boolean;
  isPinned: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
};

export function HotspotDot({
  point,
  isActive,
  isPinned,
  onHoverStart,
  onHoverEnd,
  onClick,
}: HotspotDotProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <button
      type="button"
      aria-label={point.title}
      aria-pressed={isPinned}
      aria-expanded={isActive}
      className="relative flex size-5 items-center justify-center touch-manipulation"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      onClick={onClick}
    >
      <span className="relative flex size-5 items-center justify-center">
        {!prefersReducedMotion && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-primary/35"
            animate={{ scale: [1, 1.8, 1], opacity: [0.55, 0, 0.55] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        <motion.span
          aria-hidden
          className={cn(
            "relative block size-3 rounded-full bg-primary shadow-[0_0_12px_rgb(82_120_70/0.55)]",
            isActive && "ring-4 ring-primary/25",
          )}
          animate={
            prefersReducedMotion
              ? undefined
              : { scale: [1, 1.2, 1], opacity: [0.85, 1, 0.85] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </span>
    </button>
  );
}
