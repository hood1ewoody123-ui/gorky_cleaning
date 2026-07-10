"use client";

import type { WorkStage } from "@/constants/work-stages";
import { cn } from "@/lib/utils";

type WorkStageItemProps = {
  stage: WorkStage;
  index: number;
};

export function WorkStageItem({ stage, index }: WorkStageItemProps) {
  return (
    <li
      className={cn(
        "group flex flex-col gap-3 rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4 transition-all duration-300 md:p-5",
        "hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10",
      )}
    >
      <span className="text-xs font-semibold tracking-[0.14em] text-white/45 transition-colors duration-300 group-hover:text-white/70">
        {String(index).padStart(2, "0")}
      </span>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold tracking-tight text-white md:text-[1.0625rem]">
          {stage.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/75 transition-colors duration-300 group-hover:text-white/90">
          {stage.description}
        </p>
      </div>
    </li>
  );
}
