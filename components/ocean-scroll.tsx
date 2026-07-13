"use client";

import { useEffect, useRef } from "react";
import type LocomotiveScroll from "locomotive-scroll";

import {
  OCEAN_SCROLL_TO_EVENT,
  type OceanScrollToDetail,
} from "@/lib/ocean-scroll-events";

/**
 * Enables Locomotive Scroll only on devices that have not requested reduced
 * motion. Native scrolling stays available as the accessible fallback.
 */
export function OceanScroll({ children }: Readonly<{ children: React.ReactNode }>) {
  const instanceRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function handleScrollRequest(event: Event) {
      const { target, duration = 0.72, offset = 0 } = (
        event as CustomEvent<OceanScrollToDetail>
      ).detail;
      const element = document.querySelector<HTMLElement>(target);

      if (!element) return;

      if (reducedMotion || !instanceRef.current) {
        element.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
        return;
      }

      instanceRef.current.scrollTo(element, {
        duration,
        offset,
        easing: (progress) => 1 - Math.pow(1 - progress, 3),
      });
    }

    window.addEventListener(OCEAN_SCROLL_TO_EVENT, handleScrollRequest);

    if (reducedMotion) {
      return () =>
        window.removeEventListener(OCEAN_SCROLL_TO_EVENT, handleScrollRequest);
    }

    let active = true;

    async function initialiseScroll() {
      const { default: Locomotive } = await import("locomotive-scroll");
      if (!active) return;

      instanceRef.current = new Locomotive({
        lenisOptions: { lerp: 0.075, smoothWheel: true },
      });
    }

    void initialiseScroll();

    return () => {
      active = false;
      window.removeEventListener(OCEAN_SCROLL_TO_EVENT, handleScrollRequest);
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, []);

  return <div data-scroll-container>{children}</div>;
}
