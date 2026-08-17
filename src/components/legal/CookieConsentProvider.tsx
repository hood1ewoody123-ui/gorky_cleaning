"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import type { CookieConsentStatus } from "@/constants/cookie-consent";
import {
  hasAnalyticsConsent,
  saveCookieConsent,
  useCookieConsentState,
} from "@/lib/cookie-consent/cookieConsent";

type CookieConsentContextValue = {
  consent: CookieConsentStatus | null;
  isReady: boolean;
  analyticsAllowed: boolean;
  acceptCookies: () => void;
  rejectCookies: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

function useIsClientReady() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const consent = useCookieConsentState();
  const isReady = useIsClientReady();

  const acceptCookies = useCallback(() => {
    saveCookieConsent("accepted");
  }, []);

  const rejectCookies = useCallback(() => {
    saveCookieConsent("rejected");
  }, []);

  const value = useMemo(
    () => ({
      consent,
      isReady,
      analyticsAllowed: hasAnalyticsConsent(consent),
      acceptCookies,
      rejectCookies,
    }),
    [acceptCookies, consent, isReady, rejectCookies],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider",
    );
  }

  return context;
}
