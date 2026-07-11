"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

function browserProgress() {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  return height > 0 ? window.scrollY / height : 0;
}

function KrillTip() {
  return (
    <g>
      <path d="M25 5c-8 2-13 8-13 16 0 8 5 14 13 16 7-2 13-8 13-16S32 7 25 5Z" fill="currentColor" opacity=".9" />
      <path d="M12 15 3 8M12 27 3 34M38 15l9-7M38 27l9 7" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M18 12c4-3 10-3 14 0M18 30c4 3 10 3 14 0" fill="none" stroke="var(--background)" strokeLinecap="round" strokeWidth="1.8" opacity=".8" />
      <circle cx="19" cy="18" r="1.6" fill="var(--background)" /><circle cx="31" cy="18" r="1.6" fill="var(--background)" />
    </g>
  );
}

/**
 * The SVG is intentionally atmospheric rather than a conventional scrollbar.
 * It uses the same Locomotive Scroll event as the one-pixel accessible progress
 * indicator, so native scrolling remains a complete fallback.
 */
export function ScrollTracker() {
  const [progress, setProgress] = useState(0);
  const smoothProgress = useSpring(progress, { damping: 24, stiffness: 190, mass: 0.2 });

  useEffect(() => {
    const updateFromNativeScroll = () => setProgress(browserProgress());
    const updateFromLocomotive = (event: Event) => setProgress((event as CustomEvent<number>).detail);

    updateFromNativeScroll();
    window.addEventListener("scroll", updateFromNativeScroll, { passive: true });
    window.addEventListener("krill:scroll", updateFromLocomotive);
    return () => {
      window.removeEventListener("scroll", updateFromNativeScroll);
      window.removeEventListener("krill:scroll", updateFromLocomotive);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-px bg-border/60" aria-hidden="true"><motion.div className="h-full origin-left bg-primary shadow-[0_0_16px_var(--primary)]" style={{ scaleX: smoothProgress }} /></div>
      <svg viewBox="0 0 50 1000" preserveAspectRatio="none" className="pointer-events-none fixed bottom-[11vh] right-1 z-20 h-[70svh] w-10 text-primary/45 mix-blend-screen sm:right-4 sm:w-12 lg:right-[4vw] lg:h-[76svh] lg:w-14" aria-hidden="true">
        <path d="M25 18C7 150 43 260 25 398S7 660 25 982" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1" opacity=".24" />
        <motion.path d="M25 18C7 150 43 260 25 398S7 660 25 982" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" strokeDasharray="8 10" style={{ pathLength: smoothProgress }} opacity=".72" />
        <motion.g animate={{ y: 930 * progress }} transition={{ type: "spring", damping: 25, stiffness: 150, mass: 0.25 }} transform="translate(0 8)"><KrillTip /></motion.g>
      </svg>
    </>
  );
}
