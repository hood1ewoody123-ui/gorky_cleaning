"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { LeadDialog } from "@/features/leads/LeadDialog";
import { LeadDialogProvider } from "@/features/leads/LeadDialogProvider";
import { FloatingContactWidget } from "@/features/site-chrome/FloatingContactWidget";
import { SiteHeader } from "@/features/site-chrome/SiteHeader";

const PromoLeadPopup = dynamic(
  () =>
    import("@/features/leads/PromoLeadPopup").then((mod) => mod.PromoLeadPopup),
  { ssr: false },
);

type SiteChromeProviderProps = {
  children: ReactNode;
};

export function SiteChromeProvider({ children }: SiteChromeProviderProps) {
  return (
    <LeadDialogProvider>
      <SiteHeader />
      <div className="relative flex min-h-full flex-1 flex-col">{children}</div>
      <FloatingContactWidget />
      <LeadDialog />
      <PromoLeadPopup />
    </LeadDialogProvider>
  );
}
