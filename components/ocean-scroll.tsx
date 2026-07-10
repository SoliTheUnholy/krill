"use client";

import { useEffect, useRef } from "react";
import type LocomotiveScroll from "locomotive-scroll";

/**
 * Enables Locomotive Scroll only on devices that have not requested reduced
 * motion. Native scrolling stays available as the accessible fallback.
 */
export function OceanScroll({ children }: Readonly<{ children: React.ReactNode }>) {
  const instanceRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = true;

    async function initialiseScroll() {
      const { default: Locomotive } = await import("locomotive-scroll");
      if (!active) return;

      instanceRef.current = new Locomotive({
        lenisOptions: { lerp: 0.075, smoothWheel: true },
        scrollCallback: ({ progress }) => {
          document.documentElement.style.setProperty("--krill-scroll-progress", progress.toFixed(4));
          window.dispatchEvent(new CustomEvent("krill:scroll", { detail: progress }));
        },
      });
    }

    void initialiseScroll();

    return () => {
      active = false;
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, []);

  return <div data-scroll-container>{children}</div>;
}
