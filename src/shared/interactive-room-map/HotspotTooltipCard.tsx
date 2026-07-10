"use client";

import { motion, useReducedMotion } from "motion/react";

import type { RoomMapPoint } from "@/shared/interactive-room-map/types";
import { cn } from "@/lib/utils";

type HotspotTooltipCardProps = {
  point: RoomMapPoint;
  placement: "top" | "bottom";
  align: "start" | "center" | "end";
  isEditable?: boolean;
  onTitleChange?: (pointId: string, title: string) => void;
};

export function HotspotTooltipCard({
  point,
  placement,
  align,
  isEditable = false,
  onTitleChange,
}: HotspotTooltipCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const alignClass =
    align === "start"
      ? "-translate-x-[18%]"
      : align === "end"
        ? "-translate-x-[82%]"
        : "-translate-x-1/2";

  const verticalClass =
    placement === "top" ? "bottom-[calc(100%+12px)]" : "top-[calc(100%+12px)]";

  return (
    <motion.div
      role="tooltip"
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "absolute z-20 w-[min(260px,72vw)] min-w-[220px] max-w-[280px]",
        alignClass,
        verticalClass,
        isEditable ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div
        className={cn(
          "relative rounded-[var(--radius-lg)] bg-white px-5 py-4 text-center shadow-[var(--shadow-elevated)]",
          isEditable && "ring-2 ring-primary/20",
        )}
      >
        {isEditable ? (
          <textarea
            value={point.title}
            rows={2}
            aria-label={`Текст точки ${point.id}`}
            className="w-full resize-none bg-transparent text-center text-sm font-medium leading-snug text-foreground outline-none"
            onChange={(event) => onTitleChange?.(point.id, event.target.value)}
            onClick={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
          />
        ) : (
          <p className="text-sm font-medium leading-snug text-foreground">
            {point.title}
          </p>
        )}

        {point.description && !isEditable ? (
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            {point.description}
          </p>
        ) : null}

        <span
          aria-hidden
          className={cn(
            "absolute left-1/2 size-3 -translate-x-1/2 rotate-45 bg-white",
            placement === "top" ? "-bottom-1.5" : "-top-1.5",
          )}
        />
      </div>
    </motion.div>
  );
}
