"use client";

import { Tag } from "@/components/ui/tag";
import type { ObjectTypeId } from "@/constants/cleaning-calculator";
import { OBJECT_TYPE_OPTIONS } from "@/constants/cleaning-calculator";

type ObjectSelectorProps = {
  value: ObjectTypeId;
  onChange: (value: ObjectTypeId) => void;
};

export function ObjectSelector({ value, onChange }: ObjectSelectorProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-medium text-foreground">
        Тип объекта
      </legend>
      <div className="flex flex-wrap gap-2">
        {OBJECT_TYPE_OPTIONS.map((option) => (
          <Tag
            key={option.id}
            type="button"
            size="lg"
            variant={value === option.id ? "active" : "outline"}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </Tag>
        ))}
      </div>
    </fieldset>
  );
}
