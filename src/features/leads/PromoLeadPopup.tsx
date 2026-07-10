"use client";

import { useEffect, useState } from "react";

import { Dialog } from "@/components/ui/dialog";
import { LEAD_FORM_COPY, PROMO_POPUP } from "@/constants/lead-forms";
import { useLeadDialog } from "@/features/leads/LeadDialogProvider";
import { LeadDialogShell } from "@/features/leads/LeadDialogShell";
import { LeadPopupForm } from "@/features/leads/LeadPopupForm";

function hasSeenPromoPopup() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.localStorage.getItem(PROMO_POPUP.storageKey) === "1";
}

function markPromoPopupSeen() {
  window.localStorage.setItem(PROMO_POPUP.storageKey, "1");
}

export function PromoLeadPopup() {
  const { isOpen: isLeadDialogOpen } = useLeadDialog();
  const [open, setOpen] = useState(false);
  const copy = LEAD_FORM_COPY.promo;

  useEffect(() => {
    if (hasSeenPromoPopup()) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (!hasSeenPromoPopup() && !isLeadDialogOpen) {
        setOpen(true);
      }
    }, PROMO_POPUP.delayMs);

    return () => window.clearTimeout(timer);
  }, [isLeadDialogOpen]);

  const dialogOpen = open && !isLeadDialogOpen;

  useEffect(() => {
    if (!isLeadDialogOpen || !open) {
      return;
    }

    markPromoPopupSeen();
    setOpen(false);
  }, [isLeadDialogOpen, open]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      markPromoPopupSeen();
    }
  };

  const handleSuccess = () => {
    markPromoPopupSeen();
    setOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <LeadDialogShell
        badge={
          <span className="inline-flex w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {copy.badge}
          </span>
        }
        title={copy.title}
        description={copy.description}
      >
        <LeadPopupForm
          variant="promo"
          source="promo-popup"
          metadata={{ promoDiscount: "15%", trigger: "timed-popup" }}
          onSuccess={handleSuccess}
        />
      </LeadDialogShell>
    </Dialog>
  );
}
