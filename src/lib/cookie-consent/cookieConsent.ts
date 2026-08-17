import { useSyncExternalStore } from "react";

import {
  COOKIE_CONSENT_STORAGE_KEY,
  type CookieConsentStatus,
} from "@/constants/cookie-consent";

export function readCookieConsent(): CookieConsentStatus | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

  if (value === "accepted" || value === "rejected") {
    return value;
  }

  return null;
}

export function saveCookieConsent(status: CookieConsentStatus) {
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, status);
  window.dispatchEvent(new Event(COOKIE_CONSENT_STORAGE_KEY));
}

function subscribeToCookieConsent(onStoreChange: () => void) {
  window.addEventListener(COOKIE_CONSENT_STORAGE_KEY, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(COOKIE_CONSENT_STORAGE_KEY, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function useCookieConsentState() {
  return useSyncExternalStore(
    subscribeToCookieConsent,
    readCookieConsent,
    () => null,
  );
}

export function hasAnalyticsConsent(status: CookieConsentStatus | null) {
  return status === "accepted";
}
