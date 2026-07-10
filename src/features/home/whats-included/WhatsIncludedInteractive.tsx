"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  INCLUDED_ROOM_CATEGORIES,
  type IncludedRoomCategory,
} from "@/constants/whats-included";
import { CategoryTabs } from "@/features/home/whats-included/CategoryTabs";
import {
  clearIncludedDraft,
  formatAllIncludedForCopy,
  formatIncludedPointsForCopy,
  loadIncludedDraft,
  moveIncludedPoint,
  saveIncludedDraft,
  updateIncludedPoint,
} from "@/features/home/whats-included/includedEditorStorage";
import { InteractiveRoomMap } from "@/shared/interactive-room-map/InteractiveRoomMap";

function getInitialCategories(isEditorMode: boolean): IncludedRoomCategory[] {
  if (!isEditorMode) {
    return INCLUDED_ROOM_CATEGORIES;
  }

  return loadIncludedDraft() ?? INCLUDED_ROOM_CATEGORIES;
}

type WhatsIncludedInteractiveProps = {
  isEditorMode: boolean;
};

export function WhatsIncludedInteractive({
  isEditorMode,
}: WhatsIncludedInteractiveProps) {
  const [categories, setCategories] = useState(() =>
    getInitialCategories(isEditorMode),
  );
  const [activeCategoryId, setActiveCategoryId] = useState(
    INCLUDED_ROOM_CATEGORIES[0].id,
  );
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const activeCategory = useMemo(
    () =>
      categories.find((category) => category.id === activeCategoryId) ??
      categories[0],
    [activeCategoryId, categories],
  );

  const persistCategories = useCallback(
    (nextCategories: IncludedRoomCategory[]) => {
      setCategories(nextCategories);
      if (isEditorMode) {
        saveIncludedDraft(nextCategories);
      }
    },
    [isEditorMode],
  );

  const handlePointMove = useCallback(
    (categoryId: string, pointId: string, deltaX: number, deltaY: number) => {
      persistCategories(
        moveIncludedPoint(categories, categoryId, pointId, deltaX, deltaY),
      );
    },
    [categories, persistCategories],
  );

  const handlePointTitleChange = useCallback(
    (categoryId: string, pointId: string, title: string) => {
      persistCategories(
        updateIncludedPoint(categories, categoryId, pointId, { title }),
      );
    },
    [categories, persistCategories],
  );

  const handleCopyCategory = useCallback(async () => {
    await navigator.clipboard.writeText(
      formatIncludedPointsForCopy(activeCategory),
    );
    setCopyStatus(`Скопировано: ${activeCategory.label}`);
  }, [activeCategory]);

  const handleCopyAll = useCallback(async () => {
    await navigator.clipboard.writeText(formatAllIncludedForCopy(categories));
    setCopyStatus("Скопированы все категории");
  }, [categories]);

  const handleResetDraft = useCallback(() => {
    clearIncludedDraft();
    setCategories(INCLUDED_ROOM_CATEGORIES);
    setCopyStatus("Черновик сброшен");
  }, []);

  useEffect(() => {
    if (!copyStatus) {
      return;
    }

    const timer = window.setTimeout(() => setCopyStatus(null), 2400);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {isEditorMode ? (
        <div className="rounded-[var(--radius-md)] border border-primary/25 bg-primary/5 px-4 py-4 md:px-6">
          <p className="text-sm font-medium text-primary">
            Режим редактирования тултипов
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Стрелки сдвигают точку на 1%. Текст редактируется прямо в карточке.
            Черновик сохраняется в localStorage. Добавьте{" "}
            <code className="rounded bg-white px-1.5 py-0.5 text-xs">
              ?edit=included
            </code>{" "}
            к URL.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCopyCategory}
              className="rounded-[var(--radius-pill)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Копировать «{activeCategory.label}»
            </button>
            <button
              type="button"
              onClick={handleCopyAll}
              className="rounded-[var(--radius-pill)] bg-white px-4 py-2 text-sm font-medium text-foreground shadow-[var(--shadow-card)] transition-colors hover:bg-muted"
            >
              Копировать всё
            </button>
            <button
              type="button"
              onClick={handleResetDraft}
              className="rounded-[var(--radius-pill)] bg-white px-4 py-2 text-sm font-medium text-muted-foreground shadow-[var(--shadow-card)] transition-colors hover:bg-muted"
            >
              Сбросить черновик
            </button>
          </div>

          {copyStatus ? (
            <p className="mt-3 text-sm text-primary">{copyStatus}</p>
          ) : null}
        </div>
      ) : null}

      <CategoryTabs
        categories={categories.map(({ id, label }) => ({ id, label }))}
        activeId={activeCategory.id}
        onChange={setActiveCategoryId}
      />

      <div
        role="tabpanel"
        id={`included-panel-${activeCategory.id}`}
        aria-labelledby={`included-tab-${activeCategory.id}`}
      >
        <InteractiveRoomMap
          key={activeCategory.id}
          categoryId={activeCategory.id}
          image={activeCategory.image}
          imageAlt={activeCategory.imageAlt}
          imageWidth={activeCategory.imageWidth}
          imageHeight={activeCategory.imageHeight}
          title={activeCategory.title}
          points={activeCategory.points}
          onPointMove={handlePointMove}
          onPointTitleChange={handlePointTitleChange}
        />
      </div>
    </div>
  );
}
