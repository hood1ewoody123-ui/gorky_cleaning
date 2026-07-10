"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { useIncludedEditorMode } from "@/hooks/useIncludedEditorMode";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { HotspotDot } from "@/shared/interactive-room-map/HotspotDot";
import { HotspotEditorControls } from "@/shared/interactive-room-map/HotspotEditorControls";
import { HotspotTooltipCard } from "@/shared/interactive-room-map/HotspotTooltipCard";
import { getHotspotPlacement } from "@/shared/interactive-room-map/getHotspotPlacement";
import type { InteractiveRoomMapProps } from "@/shared/interactive-room-map/types";

export function InteractiveRoomMap({
  image,
  imageAlt,
  title,
  points,
  categoryId,
  onPointMove,
  onPointTitleChange,
}: InteractiveRoomMapProps) {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const isEditorMode = useIncludedEditorMode();
  const prefersReducedMotion = useReducedMotion();

  const sceneTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="flex flex-col gap-6">
      <div
        className="relative aspect-video overflow-hidden rounded-[var(--radius-xl)] bg-muted shadow-[var(--shadow-soft)]"
        aria-label={title}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={image}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={
              prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }
            }
            transition={sceneTransition}
            className="absolute inset-0"
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority={false}
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {!isMobile || isEditorMode
          ? points.map((point) => {
              const { placement, align } = getHotspotPlacement(point);

              return (
                <div
                  key={point.id}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  <div className="relative">
                    <HotspotDot
                      point={point}
                      isActive
                      isPinned={false}
                      onHoverStart={() => undefined}
                      onHoverEnd={() => undefined}
                      onClick={() => undefined}
                    />

                    <HotspotTooltipCard
                      point={point}
                      placement={placement}
                      align={align}
                      isEditable={isEditorMode}
                      onTitleChange={(pointId, nextTitle) =>
                        onPointTitleChange?.(categoryId, pointId, nextTitle)
                      }
                    />

                    {isEditorMode ? (
                      <HotspotEditorControls
                        point={point}
                        onMove={(pointId, deltaX, deltaY) =>
                          onPointMove?.(categoryId, pointId, deltaX, deltaY)
                        }
                      />
                    ) : null}
                  </div>
                </div>
              );
            })
          : null}
      </div>

      {isMobile && !isEditorMode ? (
        <ul className="flex flex-col gap-3">
          {points.map((point) => (
            <li
              key={point.id}
              className="flex items-start gap-3 rounded-[var(--radius-md)] bg-white px-4 py-4 shadow-[var(--shadow-card)]"
            >
              <span
                aria-hidden
                className="mt-1.5 size-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgb(82_120_70/0.45)]"
              />
              <p className="text-sm leading-relaxed text-foreground">
                {point.title}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
