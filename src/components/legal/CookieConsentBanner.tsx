"use client";

import Link from "next/link";

import { useCookieConsent } from "@/components/legal/CookieConsentProvider";
import { Button } from "@/components/ui/button";
import { COOKIE_CONSENT_COPY } from "@/constants/cookie-consent";
import { LEGAL_ROUTES } from "@/constants/legal";

export function CookieConsentBanner() {
  const { consent, isReady, acceptCookies, rejectCookies } = useCookieConsent();

  if (!isReady || consent !== null) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 p-4 shadow-[var(--shadow-elevated)] backdrop-blur-md md:p-6"
    >
      <div className="container-app flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="flex max-w-3xl flex-col gap-2">
          <p
            id="cookie-consent-title"
            className="text-sm font-medium text-foreground"
          >
            {COOKIE_CONSENT_COPY.title}
          </p>
          <p
            id="cookie-consent-description"
            className="text-small leading-relaxed text-muted-foreground"
          >
            {COOKIE_CONSENT_COPY.description}{" "}
            <Link
              href={LEGAL_ROUTES.privacy}
              className="text-primary underline-offset-4 hover:underline"
            >
              {COOKIE_CONSENT_COPY.privacyLinkLabel}
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            size="pill-sm"
            className="w-full sm:w-auto"
            onClick={rejectCookies}
          >
            {COOKIE_CONSENT_COPY.rejectLabel}
          </Button>
          <Button
            type="button"
            size="pill-sm"
            className="w-full sm:w-auto"
            onClick={acceptCookies}
          >
            {COOKIE_CONSENT_COPY.acceptLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
