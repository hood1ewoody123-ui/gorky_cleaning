"use client";

import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  SERVICE_CATALOG_CATEGORIES,
  SERVICE_CATALOG_ITEMS,
  SERVICES_CATALOG_INITIAL_VISIBLE,
} from "@/constants/services-catalog";
import type { ServiceCatalogItem } from "@/constants/services-catalog";
import { useLeadDialog } from "@/features/leads/LeadDialogProvider";
import { ServiceCatalogFilters } from "@/features/home/services-catalog/ServiceCatalogFilters";
import { ServiceCatalogRow } from "@/features/home/services-catalog/ServiceCatalogRow";
import { formatServicePrice } from "@/lib/formatPrice";

const LOAD_MORE_STEP = 5;

export function ServicesCatalogInteractive() {
  const { openLeadDialog } = useLeadDialog();
  const [activeCategoryId, setActiveCategoryId] = useState(
    SERVICE_CATALOG_CATEGORIES[0].id,
  );
  const [visibleCount, setVisibleCount] = useState(
    SERVICES_CATALOG_INITIAL_VISIBLE,
  );

  const activeCategory = useMemo(
    () =>
      SERVICE_CATALOG_CATEGORIES.find(
        (category) => category.id === activeCategoryId,
      ) ?? SERVICE_CATALOG_CATEGORIES[0],
    [activeCategoryId],
  );

  const categoryServices = useMemo(
    () =>
      SERVICE_CATALOG_ITEMS.filter(
        (service) => service.categoryId === activeCategoryId,
      ),
    [activeCategoryId],
  );

  const visibleServices = categoryServices.slice(0, visibleCount);
  const hiddenCount = categoryServices.length - visibleServices.length;

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategoryId(categoryId);
    setVisibleCount(SERVICES_CATALOG_INITIAL_VISIBLE);
  }, []);

  const handleOrder = useCallback(
    (service: ServiceCatalogItem) => {
      const categoryLabel =
        SERVICE_CATALOG_CATEGORIES.find(
          (category) => category.id === service.categoryId,
        )?.label ?? service.categoryId;

      openLeadDialog({
        variant: "service",
        source: "services-catalog",
        service: `${service.name} · ${formatServicePrice(service.priceFrom, service.priceSuffix)}`,
        area: "не указана",
        metadata: {
          categoryLabel,
          unitLabel: service.unitLabel,
        },
      });
    },
    [openLeadDialog],
  );

  const handleShowMore = useCallback(() => {
    setVisibleCount((current) => current + LOAD_MORE_STEP);
  }, []);

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <ServiceCatalogFilters
        categories={SERVICE_CATALOG_CATEGORIES}
        activeCategoryId={activeCategory.id}
        onChange={handleCategoryChange}
      />

      <div
        role="tabpanel"
        id={`services-panel-${activeCategory.id}`}
        aria-labelledby={`services-tab-${activeCategory.id}`}
        className="overflow-hidden rounded-[var(--radius-lg)] border border-border/60 bg-white shadow-[var(--shadow-card)]"
      >
        {visibleServices.map((service) => (
          <ServiceCatalogRow
            key={service.id}
            service={service}
            onOrder={handleOrder}
          />
        ))}
      </div>

      {hiddenCount > 0 ? (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="pill-sm"
            className="border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
            onClick={handleShowMore}
          >
            Показать ещё {Math.min(hiddenCount, LOAD_MORE_STEP)} позиций
          </Button>
        </div>
      ) : null}
    </div>
  );
}
