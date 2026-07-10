"use client";

import { cn } from "@/lib/utils";

type CategoryTabsProps = {
  categories: Array<{ id: string; label: string }>;
  activeId: string;
  onChange: (id: string) => void;
};

export function CategoryTabs({
  categories,
  activeId,
  onChange,
}: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Тип помещения"
      className="-mx-[var(--container-padding)] overflow-x-auto px-[var(--container-padding)] pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex w-max min-w-full gap-2 md:gap-3">
        {categories.map((category) => {
          const isActive = category.id === activeId;

          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`included-panel-${category.id}`}
              id={`included-tab-${category.id}`}
              onClick={() => onChange(category.id)}
              className={cn(
                "shrink-0 rounded-[var(--radius-pill)] px-4 py-2.5 text-sm font-medium transition-all duration-300 md:px-8 md:py-4 md:text-base",
                isActive
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                  : "bg-white text-muted-foreground shadow-[var(--shadow-card)] hover:bg-muted/70 hover:text-foreground",
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
