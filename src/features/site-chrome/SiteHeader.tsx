"use client";

import { Menu, PhoneCall } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { GlassPanel } from "@/components/ui/glass-panel";
import { CONTACT, HERO_CONTENT, NAV_LINKS } from "@/constants/home";
import { useLeadDialog } from "@/features/leads/LeadDialogProvider";
import { SITE } from "@/constants/site";
import { BrandLogo } from "@/shared/brand/BrandLogo";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { openLeadDialog } = useLeadDialog();

  useEffect(() => {
    const updateVisibility = () => {
      const heroShell = document.querySelector("[data-hero-shell]");

      if (!heroShell) {
        setIsVisible(window.scrollY > 12);
        return;
      }

      const rect = heroShell.getBoundingClientRect();
      setIsVisible(rect.bottom <= 8);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const openConsultation = () => {
    setMenuOpen(false);
    openLeadDialog({ variant: "consultation", source: "site-header" });
  };

  return (
    <header
      aria-hidden={!isVisible}
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-3 transition-all duration-300 md:pt-4",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0",
      )}
    >
      <div className="container-app">
        <GlassPanel
          variant="default"
          className="flex items-center justify-between gap-4 px-4 py-3 shadow-[var(--shadow-soft)] md:px-6 md:py-3.5"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label={SITE.name}
          >
            <BrandLogo variant="dark" className="h-7 sm:h-8 md:h-9" />
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Основная навигация"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 xl:flex">
            <div className="flex flex-col items-end text-right text-foreground">
              <a
                href={CONTACT.phoneHref}
                className="text-sm font-semibold transition-opacity hover:opacity-80"
              >
                {CONTACT.phoneDisplay}
              </a>
              <span className="text-xs text-muted-foreground">
                {CONTACT.region}
              </span>
            </div>
            <Button type="button" size="pill-sm" onClick={openConsultation}>
              {HERO_CONTENT.headerCta}
            </Button>
          </div>

          <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
            <DrawerTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-muted lg:hidden"
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
                    onClick={() => setMenuOpen(false)}
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
        </GlassPanel>
      </div>
    </header>
  );
}
