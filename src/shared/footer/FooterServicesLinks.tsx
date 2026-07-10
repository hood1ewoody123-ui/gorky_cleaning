"use client";

import { SERVICE_LANDING_GROUPS } from "@/constants/service-pages";
import { useLeadDialog } from "@/features/leads/LeadDialogProvider";

export function FooterServicesLinks() {
  const { openLeadDialog } = useLeadDialog();

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {SERVICE_LANDING_GROUPS.map((group) => (
        <div key={group.id} className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">
            {group.title}
          </h3>
          <ul className="flex flex-col gap-2">
            {group.pages.map((page) => (
              <li key={page.slug}>
                <button
                  type="button"
                  onClick={() =>
                    openLeadDialog({
                      variant: "service",
                      source: "footer-services",
                      service: page.label,
                      metadata: {
                        serviceSlug: page.slug,
                        groupId: group.id,
                      },
                    })
                  }
                  className="text-left text-small text-muted-foreground transition-colors hover:text-primary"
                >
                  {page.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
