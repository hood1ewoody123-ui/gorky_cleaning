"use client";

import { Tag } from "@/components/ui/tag";
import type { CleaningTypeId } from "@/constants/cleaning-calculator";
import { CLEANING_TYPE_OPTIONS } from "@/constants/cleaning-calculator";

type CleaningTypeSelectorProps = {
  value: CleaningTypeId;
  onChange: (value: CleaningTypeId) => void;
  compact?: boolean;
};

export function CleaningTypeSelector({
  value,
  onChange,
  compact = false,
}: CleaningTypeSelectorProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-medium text-foreground">
        Тип уборки
      </legend>
      <div className="flex flex-wrap gap-2">
        {CLEANING_TYPE_OPTIONS.map((option) => (
          <Tag
            key={option.id}
            type="button"
            size={compact ? "default" : "lg"}
            variant={value === option.id ? "active" : "outline"}
            onClick={() => onChange(option.id)}
          >
            {compact ? option.shortLabel : option.label}
          </Tag>
        ))}
      </div>
    </fieldset>
  );
}
