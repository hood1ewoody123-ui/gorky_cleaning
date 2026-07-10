"use client";

import { useEffect, useRef } from "react";

import { YANDEX_METRIKA_GOALS } from "@/constants/analytics";
import { trackScrollDepth } from "@/lib/analytics/yandexMetrika";

const SCROLL_MILESTONES = [
  { threshold: 25, goal: YANDEX_METRIKA_GOALS.scroll25 },
  { threshold: 50, goal: YANDEX_METRIKA_GOALS.scroll50 },
  { threshold: 75, goal: YANDEX_METRIKA_GOALS.scroll75 },
  { threshold: 90, goal: YANDEX_METRIKA_GOALS.scroll90 },
] as const;

export function YandexScrollTracker() {
  const reachedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const updateScrollDepth = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight <= 0) {
        return;
      }

      const progress = (window.scrollY / scrollHeight) * 100;

      for (const milestone of SCROLL_MILESTONES) {
        if (
          progress >= milestone.threshold &&
          !reachedRef.current.has(milestone.threshold)
        ) {
          reachedRef.current.add(milestone.threshold);
          trackScrollDepth(milestone.threshold);
        }
      }
    };

    updateScrollDepth();
    window.addEventListener("scroll", updateScrollDepth, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollDepth);
    };
  }, []);

  return null;
}
