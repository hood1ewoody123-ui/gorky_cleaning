import {
  YANDEX_METRIKA_ENABLED,
  YANDEX_METRIKA_ID,
} from "@/constants/analytics";
import {
  hasAnalyticsConsent,
  readCookieConsent,
} from "@/lib/cookie-consent/cookieConsent";

type MetrikaParams = Record<string, string | number | boolean | undefined>;

function canTrackAnalytics() {
  return (
    YANDEX_METRIKA_ENABLED &&
    typeof window !== "undefined" &&
    hasAnalyticsConsent(readCookieConsent())
  );
}

function callYm(method: "reachGoal" | "params", ...args: unknown[]) {
  if (!canTrackAnalytics()) {
    return;
  }

  window.ym?.(YANDEX_METRIKA_ID, method, ...args);
}

export function trackMetrikaGoal(goal: string, params?: MetrikaParams) {
  if (params && Object.keys(params).length > 0) {
    callYm("reachGoal", goal, params);
    return;
  }

  callYm("reachGoal", goal);
}

export function trackMetrikaParams(params: MetrikaParams) {
  callYm("params", params);
}

export function trackLeadSubmit(source: string, page: string) {
  trackMetrikaGoal("lead_submit", { source, page });
}

export function trackCtaOpen(source: string, variant?: string) {
  trackMetrikaGoal("cta_open", { source, variant });
}

export function trackScrollDepth(depth: 25 | 50 | 75 | 90) {
  trackMetrikaGoal(`scroll_${depth}`);
}
