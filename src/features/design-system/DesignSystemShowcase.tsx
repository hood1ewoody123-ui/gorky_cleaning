"use client";

import { ButtonsSection } from "@/features/design-system/ButtonsSection";
import {
  ColorsSection,
  TypographySection,
} from "@/features/design-system/ColorsTypographySection";
import { FormsTagsSection } from "@/features/design-system/FormsTagsSection";
import { OverlaysSection } from "@/features/design-system/OverlaysSection";
import { Heading, Text } from "@/shared/typography/Typography";

export function DesignSystemShowcase() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="section-y border-b border-border/60 bg-surface">
        <div className="container-app flex flex-col gap-4">
          <Text variant="caption" muted>
            Этап 3 · Design System
          </Text>
          <Heading as="h1">Горький Клининг</Heading>
          <Text variant="lead" muted className="max-w-2xl">
            Воздушная система на базе референса: muted olive, много whitespace,
            мягкие карточки и pill-кнопки.
          </Text>
        </div>
      </header>

      <ColorsSection />
      <TypographySection />
      <ButtonsSection />
      <FormsTagsSection />
      <OverlaysSection />
    </div>
  );
}
