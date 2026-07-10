"use client";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import type { RoomCount } from "@/constants/cleaning-calculator";
import { ROOM_COUNT_OPTIONS } from "@/constants/cleaning-calculator";
import { cn } from "@/lib/utils";

type RoomCounterProps = {
  value: RoomCount;
  onChange: (value: RoomCount) => void;
  variant?: "chips" | "stepper";
};

export function RoomCounter({
  value,
  onChange,
  variant = "chips",
}: RoomCounterProps) {
  if (variant === "stepper") {
    const currentIndex = ROOM_COUNT_OPTIONS.findIndex(
      (option) => option.value === value,
    );

    const decrease = () => {
      const prev = ROOM_COUNT_OPTIONS[Math.max(0, currentIndex - 1)];
      if (prev) onChange(prev.value);
    };

    const increase = () => {
      const next =
        ROOM_COUNT_OPTIONS[
          Math.min(ROOM_COUNT_OPTIONS.length - 1, currentIndex + 1)
        ];
      if (next) onChange(next.value);
    };

    const label =
      ROOM_COUNT_OPTIONS.find((option) => option.value === value)?.label ??
      String(value);

    return (
      <fieldset className="flex flex-col gap-3">
        <legend className="text-sm font-medium text-foreground">
          Количество комнат
        </legend>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            aria-label="Уменьшить количество комнат"
            disabled={currentIndex === 0}
            onClick={decrease}
            className="rounded-full"
          >
            <Minus />
          </Button>

          <div
            className={cn(
              "flex min-w-24 flex-1 items-center justify-center rounded-[var(--radius-md)]",
              "bg-muted px-6 py-4 text-2xl font-semibold text-primary",
            )}
          >
            {label}
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            aria-label="Увеличить количество комнат"
            disabled={currentIndex === ROOM_COUNT_OPTIONS.length - 1}
            onClick={increase}
            className="rounded-full"
          >
            <Plus />
          </Button>
        </div>
      </fieldset>
    );
  }

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-medium text-foreground">
        Количество комнат
      </legend>
      <div className="flex flex-wrap gap-2">
        {ROOM_COUNT_OPTIONS.map((option) => (
          <Tag
            key={option.value}
            type="button"
            size="lg"
            variant={value === option.value ? "active" : "outline"}
            onClick={() => onChange(option.value)}
            className="min-w-12 justify-center"
          >
            {option.label}
          </Tag>
        ))}
      </div>
    </fieldset>
  );
}
