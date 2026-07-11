"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";

const deliverables = [
  "Creative direction and a distinctive digital personality",
  "Information architecture and the primary customer journey",
  "Responsive interface system built around your real content",
  "Production-ready Next.js implementation and integrations",
  "Performance, accessibility, responsive, and browser QA",
  "Launch support, documentation, and a maintainable handoff",
];

export function DeliverablesSection() {
  return (
    <section className="relative z-10 border-y border-border bg-card/25 px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
        <SectionHeading
          eyebrow="What arrives"
          title="Not a mockup. A living digital home."
          copy="The engagement joins brand thinking, experience design, implementation, and launch into one accountable current."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="overflow-hidden rounded-[2rem] border border-border bg-card/80 shadow-[0_28px_90px_color-mix(in_oklch,var(--background),transparent_20%)] backdrop-blur"
        >
          <div className="flex items-center gap-3 border-b border-border bg-primary/8 px-6 py-5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-card-foreground">
                The Krill release
              </p>
              <p className="text-xs text-muted-foreground">
                Strategy through production
              </p>
            </div>
          </div>
          <ul className="divide-y divide-border px-6">
            {deliverables.map((item) => (
              <li key={item} className="flex gap-3 py-4 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <Check className="size-3" strokeWidth={2.4} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-start gap-3 border-t border-border bg-muted/30 p-6">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Scope is confirmed before the reservation deposit. Material changes
              remain visible and require approval—no surprise invoices from the
              deep.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
