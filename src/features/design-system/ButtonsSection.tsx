"use client";

import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DesignSection } from "@/features/design-system/DesignSection";

export function ButtonsSection() {
  return (
    <DesignSection
      title="Кнопки"
      description="Pill-форма для CTA, мягкие secondary и ghost для вторичных действий."
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center gap-4">
          <Button size="pill">Запросить расчёт</Button>
          <Button size="pill-sm" variant="secondary">
            Бесплатная консультация
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="pill">
            Оставить заявку
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="pill" variant="secondary">
            <Sparkles data-icon="inline-start" />
            Узнать больше
          </Button>
        </div>
      </div>
    </DesignSection>
  );
}
