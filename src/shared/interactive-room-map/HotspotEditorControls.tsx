"use client";

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

import type { RoomMapPoint } from "@/shared/interactive-room-map/types";

type HotspotEditorControlsProps = {
  point: RoomMapPoint;
  onMove: (pointId: string, deltaX: number, deltaY: number) => void;
};

const STEP = 1;

export function HotspotEditorControls({
  point,
  onMove,
}: HotspotEditorControlsProps) {
  return (
    <div
      className="absolute left-full top-1/2 z-30 ml-2 flex -translate-y-1/2 flex-col items-center gap-0.5 rounded-[var(--radius-xs)] border border-primary/20 bg-white/95 p-1 shadow-[var(--shadow-card)] backdrop-blur-sm"
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-label={`Сдвинуть «${point.title}» вверх`}
        className="flex size-7 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary/10"
        onClick={() => onMove(point.id, 0, -STEP)}
      >
        <ArrowUp className="size-3.5" />
      </button>

      <div className="flex gap-0.5">
        <button
          type="button"
          aria-label={`Сдвинуть «${point.title}» влево`}
          className="flex size-7 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary/10"
          onClick={() => onMove(point.id, -STEP, 0)}
        >
          <ArrowLeft className="size-3.5" />
        </button>

        <button
          type="button"
          aria-label={`Сдвинуть «${point.title}» вправо`}
          className="flex size-7 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary/10"
          onClick={() => onMove(point.id, STEP, 0)}
        >
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      <button
        type="button"
        aria-label={`Сдвинуть «${point.title}» вниз`}
        className="flex size-7 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary/10"
        onClick={() => onMove(point.id, 0, STEP)}
      >
        <ArrowDown className="size-3.5" />
      </button>

      <span className="px-1 pt-0.5 text-[10px] leading-none text-muted-foreground">
        {Math.round(point.x)}%, {Math.round(point.y)}%
      </span>
    </div>
  );
}
