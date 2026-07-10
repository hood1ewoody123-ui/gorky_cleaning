"use client";

import { Minus, Plus } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { ExtraServiceDefinition } from "@/constants/cleaning-calculator";
import { EXTRA_SERVICES } from "@/constants/cleaning-calculator";
import { formatRubles } from "@/lib/formatPrice";

type ExtraServicesListProps = {
  values: Record<string, number>;
  onChange: (serviceId: string, quantity: number) => void;
  defaultOpen?: boolean;
};

function ExtraServiceRow({
  service,
  quantity,
  onChange,
}: {
  service: ExtraServiceDefinition;
  quantity: number;
  onChange: (quantity: number) => void;
}) {
  return (
    <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{service.name}</p>
        <p className="text-xs text-muted-foreground">
          {formatRubles(service.price)} ₽ / {service.unit}
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label={`Уменьшить: ${service.name}`}
          disabled={quantity === 0}
          onClick={() => onChange(Math.max(0, quantity - 1))}
          className="rounded-full"
        >
          <Minus />
        </Button>

        <span className="min-w-8 text-center text-sm font-semibold tabular-nums">
          {quantity}
        </span>

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label={`Увеличить: ${service.name}`}
          disabled={quantity >= service.max}
          onClick={() => onChange(Math.min(service.max, quantity + 1))}
          className="rounded-full"
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}

export function ExtraServicesList({
  values,
  onChange,
  defaultOpen = false,
}: ExtraServicesListProps) {
  const selectedCount = Object.values(values).filter((qty) => qty > 0).length;

  return (
    <Accordion defaultValue={defaultOpen ? ["extras"] : []}>
      <AccordionItem value="extras" className="border-none">
        <AccordionTrigger className="rounded-[var(--radius-md)] bg-muted/60 px-4 py-3 hover:no-underline">
          <span className="text-sm font-medium text-foreground">
            Дополнительные услуги
            {selectedCount > 0 ? (
              <span className="ml-2 text-primary">· {selectedCount}</span>
            ) : null}
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-1 pt-3">
          <div className="flex flex-col divide-y divide-border/60">
            {EXTRA_SERVICES.map((service) => (
              <ExtraServiceRow
                key={service.id}
                service={service}
                quantity={values[service.id] ?? 0}
                onChange={(quantity) => onChange(service.id, quantity)}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
