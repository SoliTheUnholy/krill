"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/landing/section-heading";

const process = [
  [
    "01",
    "Signal",
    "Your focused brief captures the brand, audience, capabilities, and character that must make this website particular.",
  ],
  [
    "02",
    "Current",
    "We translate that signal into an approved creative route, information architecture, and transparent production scope.",
  ],
  [
    "03",
    "Release",
    "A deposit reserves the build. You follow milestones in your account and launch with a system your team can own.",
  ],
];

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative z-10 border-b border-border px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      data-scroll-section
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <SectionHeading
            eyebrow="No black water"
            title="A clear path below the surface."
          />
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Luxury should not mean mystery. Every decision, payment, milestone,
            and delivery stays legible while the creative work remains singular.
          </p>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-3">
          {process.map(([number, title, copy], index) => (
            <motion.article
              key={number}
              className="min-h-72 bg-card/95 p-7 sm:p-9"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              data-scroll
              data-scroll-speed={index === 1 ? "0.12" : "0"}
            >
              <span className="font-mono text-xs text-primary">{number}</span>
              <h3 className="mt-16 text-3xl font-medium tracking-[-.055em] text-card-foreground">
                {title}
              </h3>
              <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
                {copy}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
