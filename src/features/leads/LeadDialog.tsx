"use client";

import { Dialog } from "@/components/ui/dialog";
import { LEAD_FORM_COPY } from "@/constants/lead-forms";
import { useLeadDialog } from "@/features/leads/LeadDialogProvider";
import { LeadDialogShell } from "@/features/leads/LeadDialogShell";
import { LeadPopupForm } from "@/features/leads/LeadPopupForm";

export function LeadDialog() {
  const { isOpen, variant, source, service, area, metadata, closeLeadDialog } =
    useLeadDialog();
  const copy = LEAD_FORM_COPY[variant];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeLeadDialog();
        }
      }}
    >
      <LeadDialogShell
        badge={
          variant === "promo" ? (
            <span className="inline-flex w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              {LEAD_FORM_COPY.promo.badge}
            </span>
          ) : undefined
        }
        title={copy.title}
        description={copy.description}
      >
        <LeadPopupForm
          key={`${variant}-${source}-${service ?? "default"}`}
          variant={variant}
          source={source}
          service={service}
          area={area}
          metadata={metadata}
          onSuccess={closeLeadDialog}
        />
      </LeadDialogShell>
    </Dialog>
  );
}
