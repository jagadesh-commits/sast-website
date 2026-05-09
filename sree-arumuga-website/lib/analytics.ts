/** Optional GA4 helper. Safe no-op if gtag isn't present. */

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, params?: AnalyticsParams): void {
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  gtag("event", eventName, params ?? {});
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

