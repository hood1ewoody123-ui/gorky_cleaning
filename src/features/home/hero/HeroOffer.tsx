"use client";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HERO_CONTENT } from "@/constants/home";
import { useLeadDialog } from "@/features/leads/LeadDialogProvider";
import { cn } from "@/lib/utils";

type HeroOfferProps = {
  className?: string;
};

export function HeroOffer({ className }: HeroOfferProps) {
  const { openLeadDialog } = useLeadDialog();

  return (
    <div className={cn("flex max-w-3xl flex-col gap-5 md:gap-6", className)}>
      <div className="flex flex-col gap-3 md:max-w-2xl md:gap-4">
        <h1 className="text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-3xl md:text-[2rem] lg:text-[2.35rem]">
          {HERO_CONTENT.title}
        </h1>
        <p className="max-w-lg text-sm leading-relaxed text-white/80 md:text-[0.9375rem]">
          {HERO_CONTENT.subtitle}
        </p>
      </div>

      <div className="pt-0.5">
        <Button
          type="button"
          size="pill-sm"
          className="shadow-[var(--shadow-soft)]"
          onClick={() =>
            openLeadDialog({ variant: "main", source: "hero-offer-cta" })
          }
        >
          {HERO_CONTENT.cta}
        </Button>
      </div>

      <ul
        className="grid max-w-xl gap-x-6 gap-y-2 pt-1 sm:grid-cols-2"
        aria-label="Преимущества"
      >
        {HERO_CONTENT.utp.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-xs leading-snug text-white/85 sm:text-[0.8125rem]"
          >
            <Check
              className="mt-0.5 size-3.5 shrink-0 text-white/90"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
