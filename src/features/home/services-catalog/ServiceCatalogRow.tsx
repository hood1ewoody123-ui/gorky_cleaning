"use client";

import { Button } from "@/components/ui/button";
import type { ServiceCatalogItem } from "@/constants/services-catalog";
import { formatServicePrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";

type ServiceCatalogRowProps = {
  service: ServiceCatalogItem;
  onOrder: (service: ServiceCatalogItem) => void;
  className?: string;
};

export function ServiceCatalogRow({
  service,
  onOrder,
  className,
}: ServiceCatalogRowProps) {
  return (
    <article
      className={cn(
        "grid grid-cols-1 gap-4 border-b border-border/70 px-4 py-5 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:gap-6 sm:px-6 md:px-8 md:py-6",
        className,
      )}
    >
      <div className="min-w-0">
        <h3 className="text-lg font-semibold tracking-tight text-primary md:text-xl">
          {service.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {service.unitLabel}
        </p>
      </div>

      <p className="text-base font-medium text-foreground sm:text-right md:text-lg">
        {formatServicePrice(service.priceFrom, service.priceSuffix)}
      </p>

      <Button
        type="button"
        size="pill-sm"
        className="w-full sm:w-auto"
        onClick={() => onOrder(service)}
      >
        Заказать
      </Button>
    </article>
  );
}
