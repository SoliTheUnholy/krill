export const OCEAN_SCROLL_TO_EVENT = "krill:ocean-scroll-to";

export type OceanScrollToDetail = {
  target: string;
  duration?: number;
  offset?: number;
};

/**
 * Routes programmatic navigation through the same smooth-scroll system used by
 * the landing page. Reduced-motion visitors always receive an immediate native
 * scroll instead.
 */
export function requestOceanScroll(detail: OceanScrollToDetail) {
  if (typeof window === "undefined") return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelector(detail.target)?.scrollIntoView({ block: "start" });
    return;
  }

  window.dispatchEvent(
    new CustomEvent<OceanScrollToDetail>(OCEAN_SCROLL_TO_EVENT, { detail }),
  );
}
