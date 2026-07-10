"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

function browserProgress() {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  return height > 0 ? window.scrollY / height : 0;
}

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
    <div className="fixed inset-x-0 top-0 z-50 h-px bg-border/60" aria-hidden="true">
      <motion.div className="h-full origin-left bg-primary shadow-[0_0_16px_var(--primary)]" style={{ scaleX: smoothProgress }} />
    </div>
  );
}
