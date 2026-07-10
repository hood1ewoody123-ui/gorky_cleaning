"use client";

import type { ReactNode } from "react";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type LeadDialogShellProps = {
  badge?: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

export function LeadDialogShell({
  badge,
  title,
  description,
  children,
  className,
}: LeadDialogShellProps) {
  return (
    <DialogContent
      className={cn(
        "max-h-[calc(100dvh-2rem)] gap-0 overflow-hidden rounded-[var(--radius-lg)] p-0 sm:max-w-[440px]",
        className,
      )}
    >
      <div className="flex max-h-[inherit] flex-col gap-6 overflow-y-auto px-6 py-6">
        <DialogHeader className="gap-3 space-y-0 pr-10 text-left">
          {badge}
          <DialogTitle className="text-h4 font-semibold text-foreground">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        {children}
      </div>
    </DialogContent>
  );
}
