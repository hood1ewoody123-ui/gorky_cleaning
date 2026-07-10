"use client";

import type { IncludedRoomCategory } from "@/constants/whats-included";
import type { RoomMapPoint } from "@/shared/interactive-room-map/types";

const STORAGE_KEY = "included-hotspots-draft";

export function loadIncludedDraft(): IncludedRoomCategory[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as IncludedRoomCategory[];
  } catch {
    return null;
  }
}

export function saveIncludedDraft(categories: IncludedRoomCategory[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(categories, null, 2));
}

export function clearIncludedDraft(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function updateIncludedPoint(
  categories: IncludedRoomCategory[],
  categoryId: string,
  pointId: string,
  patch: Partial<Pick<RoomMapPoint, "x" | "y" | "title">>,
): IncludedRoomCategory[] {
  return categories.map((category) => {
    if (category.id !== categoryId) {
      return category;
    }

    return {
      ...category,
      points: category.points.map((point) =>
        point.id === pointId ? { ...point, ...patch } : point,
      ),
    };
  });
}

export function moveIncludedPoint(
  categories: IncludedRoomCategory[],
  categoryId: string,
  pointId: string,
  deltaX: number,
  deltaY: number,
): IncludedRoomCategory[] {
  return categories.map((category) => {
    if (category.id !== categoryId) {
      return category;
    }

    return {
      ...category,
      points: category.points.map((point) => {
        if (point.id !== pointId) {
          return point;
        }

        return {
          ...point,
          x: clampPercent(point.x + deltaX),
          y: clampPercent(point.y + deltaY),
        };
      }),
    };
  });
}

function clampPercent(value: number): number {
  return Math.min(98, Math.max(2, Math.round(value * 10) / 10));
}

export function formatIncludedPointsForCopy(
  category: IncludedRoomCategory,
): string {
  const points = category.points.map((point) => ({
    id: point.id,
    x: point.x,
    y: point.y,
    title: point.title,
  }));

  return JSON.stringify(points, null, 2);
}

export function formatAllIncludedForCopy(
  categories: IncludedRoomCategory[],
): string {
  const payload = categories.map((category) => ({
    id: category.id,
    label: category.label,
    points: category.points.map(({ id, x, y, title }) => ({
      id,
      x,
      y,
      title,
    })),
  }));

  return JSON.stringify(payload, null, 2);
}
