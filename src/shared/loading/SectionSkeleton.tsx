import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionSkeletonProps = {
  className?: string;
  children?: ReactNode;
};

export function SectionSkeleton({ className, children }: SectionSkeletonProps) {
  return (
    <div
      aria-hidden={children ? undefined : true}
      className={cn("section-y animate-pulse", className)}
    >
      <div className="container-app flex flex-col gap-6">
        <div className="flex max-w-3xl flex-col gap-3">
          <div className="h-10 w-2/3 rounded-[var(--radius-xs)] bg-muted" />
          <div className="h-4 w-full max-w-xl rounded-[var(--radius-xs)] bg-muted/80" />
        </div>
        {children ?? (
          <div className="min-h-[280px] rounded-[var(--radius-lg)] bg-muted/70" />
        )}
      </div>
    </div>
  );
}
