"use client";

import { Button } from "@/components/ui/button";
import {
  FINAL_CTA_BUTTON,
  FINAL_CTA_DESCRIPTION,
  FINAL_CTA_HEADING,
} from "@/constants/final-cta";
import { useLeadDialog } from "@/features/leads/LeadDialogProvider";

export function FinalCtaSection() {
  const { openLeadDialog } = useLeadDialog();

  return (
    <section aria-labelledby="final-cta-heading" className="section-y">
      <div className="container-app">
        <div className="flex flex-col items-center gap-6 rounded-[var(--radius-xl)] bg-primary px-6 py-12 text-center md:gap-8 md:px-12 md:py-16 lg:px-16">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2
              id="final-cta-heading"
              className="text-h2 text-balance text-white"
            >
              {FINAL_CTA_HEADING}
            </h2>
            <p className="text-body text-pretty text-white/90">
              {FINAL_CTA_DESCRIPTION}
            </p>
          </div>

          <Button
            type="button"
            size="pill"
            variant="outline"
            className="w-full max-w-xs border-2 border-white bg-transparent text-white hover:bg-white/10 hover:text-white sm:min-w-[220px] sm:w-auto"
            onClick={() =>
              openLeadDialog({ variant: "main", source: "final-cta" })
            }
          >
            {FINAL_CTA_BUTTON}
          </Button>
        </div>
      </div>
    </section>
  );
}
