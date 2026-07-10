"use client";

import { motion, useReducedMotion } from "motion/react";

import { formatRubles } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";

type PriceSummaryProps = {
  total: number;
  estimatedArea: number;
  className?: string;
  compact?: boolean;
};

export function PriceSummary({
  total,
  estimatedArea,
  className,
  compact = false,
}: PriceSummaryProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] bg-primary/5 px-5 py-5 ring-1 ring-primary/10 md:px-6 md:py-6",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">Ориентировочная стоимость</p>

      <motion.p
        key={total}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "mt-1 font-semibold tracking-tight text-primary",
          compact ? "text-3xl" : "text-4xl md:text-[2.75rem]",
        )}
      >
        ≈ {formatRubles(total)} ₽
      </motion.p>

      <p className="mt-2 text-xs text-muted-foreground md:text-sm">
        Расчёт для ~{estimatedArea} м² · финальная цена после уточнения деталей
      </p>
    </div>
  );
}
