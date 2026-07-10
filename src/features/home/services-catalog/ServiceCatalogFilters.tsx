"use client";

import { Tag } from "@/components/ui/tag";
import type { ServiceCatalogCategory } from "@/constants/services-catalog";
import { cn } from "@/lib/utils";

type ServiceCatalogFiltersProps = {
  categories: ServiceCatalogCategory[];
  activeCategoryId: string;
  onChange: (categoryId: string) => void;
  className?: string;
};

export function ServiceCatalogFilters({
  categories,
  activeCategoryId,
  onChange,
  className,
}: ServiceCatalogFiltersProps) {
  return (
    <div
      role="tablist"
      aria-label="Категории услуг"
      className={cn(
        "-mx-[var(--container-padding)] overflow-x-auto px-[var(--container-padding)] pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <div className="flex w-max min-w-full flex-wrap gap-2 md:gap-3">
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;

          return (
            <Tag
              key={category.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`services-panel-${category.id}`}
              id={`services-tab-${category.id}`}
              size="lg"
              variant={isActive ? "active" : "outline"}
              onClick={() => onChange(category.id)}
              className="shrink-0"
            >
              {category.label}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
