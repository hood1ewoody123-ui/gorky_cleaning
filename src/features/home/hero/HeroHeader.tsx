"use client";

import { Menu, PhoneCall } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CONTACT, HERO_CONTENT, NAV_LINKS } from "@/constants/home";
import { useLeadDialog } from "@/features/leads/LeadDialogProvider";
import { SITE } from "@/constants/site";
import { BrandLogo } from "@/shared/brand/BrandLogo";
import { cn } from "@/lib/utils";

type HeroHeaderProps = {
  className?: string;
};

export function HeroHeader({ className }: HeroHeaderProps) {
  const [open, setOpen] = useState(false);
  const { openLeadDialog } = useLeadDialog();

  const openConsultation = () => {
    setOpen(false);
    openLeadDialog({ variant: "consultation", source: "hero-header" });
  };

  return (
    <header
      className={cn(
        "flex items-center justify-between gap-4 px-4 py-4 md:px-8 md:py-6 lg:px-10",
        className,
      )}
    >
      <Link
        href="/"
        className="flex shrink-0 items-center"
        aria-label={SITE.name}
      >
        <BrandLogo variant="light" className="h-7 sm:h-8 md:h-9" />
      </Link>

      <nav
        className="hidden items-center gap-8 lg:flex"
        aria-label="Основная навигация"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-6 xl:flex">
        <div className="flex flex-col items-end text-right text-white">
          <a
            href={CONTACT.phoneHref}
            className="text-sm font-semibold transition-opacity hover:opacity-80"
          >
            {CONTACT.phoneDisplay}
          </a>
          <span className="text-xs text-white/70">{CONTACT.region}</span>
        </div>
        <Button
          type="button"
          size="pill-sm"
          variant="secondary"
          className="bg-white/95"
          onClick={openConsultation}
        >
          {HERO_CONTENT.headerCta}
        </Button>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 lg:hidden"
              aria-label="Открыть меню"
            />
          }
        >
          <Menu />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{SITE.name}</DrawerTitle>
          </DrawerHeader>
          <nav
            className="flex flex-col gap-2 px-4 pb-[max(2rem,env(safe-area-inset-bottom))]"
            aria-label="Мобильная навигация"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[var(--radius-xs)] px-3 py-3 text-base font-medium hover:bg-muted"
              >
                {link.label}
              </a>
            ))}
            <a
              href={CONTACT.phoneHref}
              className="mt-4 inline-flex items-center gap-2 px-3 text-lg font-semibold text-primary"
            >
              <PhoneCall className="size-5" aria-hidden />
              {CONTACT.phoneDisplay}
            </a>
            <Button
              type="button"
              size="pill"
              className="mt-4 w-full"
              onClick={openConsultation}
            >
              {HERO_CONTENT.headerCta}
            </Button>
          </nav>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
