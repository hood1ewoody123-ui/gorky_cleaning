"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DEFAULT_CALCULATOR_STATE,
  type CleaningTypeId,
  type ObjectTypeId,
  type RoomCount,
} from "@/constants/cleaning-calculator";
import { CleaningTypeSelector } from "@/features/home/calculator/CleaningTypeSelector";
import { ExtraServicesList } from "@/features/home/calculator/ExtraServicesList";
import {
  formatCalculatorAreaLabel,
  formatCalculatorServiceSummary,
} from "@/features/home/calculator/formatCalculatorSummary";
import { LeadForm } from "@/features/home/calculator/LeadForm";
import { ObjectSelector } from "@/features/home/calculator/ObjectSelector";
import { PriceSummary } from "@/features/home/calculator/PriceSummary";
import { RoomCounter } from "@/features/home/calculator/RoomCounter";
import type { CalculatorLeadValues } from "@/features/home/calculator/calculatorLeadSchema";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { calculateCleaningPrice } from "@/lib/calculateCleaningPrice";
import { submitLead } from "@/lib/leads/submitLead";
import { normalizeLeadEmail } from "@/lib/leads/normalizeLeadEmail";
import { cn } from "@/lib/utils";

const MOBILE_STEPS = [
  { id: "object", label: "Объект" },
  { id: "rooms", label: "Комнаты" },
  { id: "cleaning", label: "Уборка" },
  { id: "extras", label: "Дополнительно" },
  { id: "summary", label: "Расчёт" },
] as const;

export function CleaningCalculator() {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [objectType, setObjectType] = useState<ObjectTypeId>(
    DEFAULT_CALCULATOR_STATE.objectType,
  );
  const [rooms, setRooms] = useState<RoomCount>(DEFAULT_CALCULATOR_STATE.rooms);
  const [cleaningType, setCleaningType] = useState<CleaningTypeId>(
    DEFAULT_CALCULATOR_STATE.cleaningType,
  );
  const [extras, setExtras] = useState<Record<string, number>>(
    DEFAULT_CALCULATOR_STATE.extras,
  );
  const [mobileStep, setMobileStep] = useState(0);

  const breakdown = useMemo(
    () =>
      calculateCleaningPrice({
        objectType,
        rooms,
        cleaningType,
        extras,
      }),
    [objectType, rooms, cleaningType, extras],
  );

  const handleExtraChange = useCallback(
    (serviceId: string, quantity: number) => {
      setExtras((current) => ({
        ...current,
        [serviceId]: quantity,
      }));
    },
    [],
  );

  const handleLeadSubmit = useCallback(
    async (values: CalculatorLeadValues) => {
      await submitLead({
        source: "calculator",
        page: pathname,
        name: values.name,
        phone: values.phone,
        email: normalizeLeadEmail(values.email),
        comment: values.comment,
        service: formatCalculatorServiceSummary({
          objectType,
          rooms,
          cleaningType,
          extras,
          total: breakdown.total,
        }),
        area: formatCalculatorAreaLabel(rooms, breakdown.estimatedArea),
        metadata: {
          objectType,
          rooms,
          cleaningType,
          extras,
          estimatedPrice: breakdown.total,
          estimatedArea: breakdown.estimatedArea,
        },
      });
    },
    [
      breakdown.estimatedArea,
      breakdown.total,
      cleaningType,
      extras,
      objectType,
      pathname,
      rooms,
    ],
  );

  const summaryPanel = (
    <div className="flex flex-col gap-5 lg:sticky lg:top-28">
      <PriceSummary
        total={breakdown.total}
        estimatedArea={breakdown.estimatedArea}
      />
      <div className="rounded-[var(--radius-lg)] border border-border/60 bg-white p-5 shadow-[var(--shadow-card)] md:p-6">
        <p className="mb-4 text-sm font-medium text-foreground">
          Оставьте заявку на точный расчёт
        </p>
        <LeadForm onSubmit={handleLeadSubmit} />
      </div>
    </div>
  );

  if (isMobile) {
    const step = MOBILE_STEPS[mobileStep];
    const isLastStep = mobileStep === MOBILE_STEPS.length - 1;

    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          {MOBILE_STEPS.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                index <= mobileStep ? "bg-primary" : "bg-muted",
              )}
              aria-hidden
            />
          ))}
        </div>

        <p className="text-sm font-medium text-muted-foreground">
          Шаг {mobileStep + 1} из {MOBILE_STEPS.length} · {step.label}
        </p>

        <div className="rounded-[var(--radius-lg)] border border-border/60 bg-white p-5 shadow-[var(--shadow-card)]">
          {mobileStep === 0 ? (
            <ObjectSelector value={objectType} onChange={setObjectType} />
          ) : null}
          {mobileStep === 1 ? (
            <RoomCounter value={rooms} onChange={setRooms} variant="stepper" />
          ) : null}
          {mobileStep === 2 ? (
            <CleaningTypeSelector
              value={cleaningType}
              onChange={setCleaningType}
            />
          ) : null}
          {mobileStep === 3 ? (
            <ExtraServicesList values={extras} onChange={handleExtraChange} />
          ) : null}
          {mobileStep === 4 ? (
            <div className="flex flex-col gap-5">
              <PriceSummary
                total={breakdown.total}
                estimatedArea={breakdown.estimatedArea}
                compact
              />
              <LeadForm onSubmit={handleLeadSubmit} />
            </div>
          ) : null}
        </div>

        <div className="flex gap-3">
          {mobileStep > 0 ? (
            <Button
              type="button"
              variant="outline"
              size="pill-sm"
              className="flex-1"
              onClick={() => setMobileStep((current) => current - 1)}
            >
              Назад
            </Button>
          ) : null}

          {!isLastStep ? (
            <Button
              type="button"
              size="pill-sm"
              className="flex-1"
              onClick={() => setMobileStep((current) => current + 1)}
            >
              Далее
            </Button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start lg:gap-10 xl:gap-12">
      <div className="flex flex-col gap-6 rounded-[var(--radius-lg)] border border-border/60 bg-white p-5 shadow-[var(--shadow-card)] md:p-6 lg:p-8">
        <ObjectSelector value={objectType} onChange={setObjectType} />
        <RoomCounter value={rooms} onChange={setRooms} />
        <CleaningTypeSelector value={cleaningType} onChange={setCleaningType} />
        <ExtraServicesList values={extras} onChange={handleExtraChange} />
      </div>

      {summaryPanel}
    </div>
  );
}
