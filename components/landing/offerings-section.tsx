"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Coffee,
  PanelsTopLeft,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";

const offerings = [
  {
    number: "01",
    title: "Brand worlds",
    copy: "Distinctive homes for studios, founders, portfolios, and cultural brands that need to be remembered.",
    note: "Identity · editorial · launch",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Commerce with character",
    copy: "Product stories, collections, and checkout journeys that preserve desire instead of feeling transactional.",
    note: "Catalogues · checkout · retention",
    icon: ShoppingBag,
  },
  {
    number: "03",
    title: "Places people can feel",
    copy: "Digital atmospheres for cafés, restaurants, hotels, wellness spaces, and destinations with a point of view.",
    note: "Menus · bookings · locations",
    icon: Coffee,
  },
  {
    number: "04",
    title: "Products and platforms",
    copy: "Clear, expressive systems for SaaS, tools, memberships, dashboards, and ideas that need explaining.",
    note: "Product · accounts · workflows",
    icon: PanelsTopLeft,
  },
];

export function OfferingsSection() {
  return (
    <section
      id="work"
      className="relative z-10 border-b border-border px-5 py-20 sm:px-8 lg:px-12 lg:py-32"
      data-scroll-section
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_15%,color-mix(in_oklch,var(--primary),transparent_90%),transparent_32%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <SectionHeading
            eyebrow="The studio"
            title="A different body for every ambition."
          />
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We do not sell a house style. We build the strategy, visual language,
            and technical system each brand needs to move through the world as
            itself.
          </p>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2">
          {offerings.map((offering, index) => {
            const Icon = offering.icon;
            return (
              <motion.article
                key={offering.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="group relative min-h-72 overflow-hidden rounded-[1.75rem] border border-border bg-card/55 p-6 shadow-[0_24px_70px_color-mix(in_oklch,var(--background),transparent_28%)] backdrop-blur sm:p-8"
              >
                <div className="absolute -right-14 -top-14 size-44 rounded-full bg-primary/8 blur-3xl transition duration-500 group-hover:bg-primary/15" />
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] text-primary">
                    {offering.number}
                  </span>
                  <span className="grid size-11 place-items-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                </div>
                <h3 className="mt-14 max-w-md text-3xl font-medium tracking-[-.055em] text-card-foreground">
                  {offering.title}
                </h3>
                <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
                  {offering.copy}
                </p>
                <div className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-4 text-[10px] font-semibold uppercase tracking-[.16em] text-muted-foreground">
                  <span>{offering.note}</span>
                  <ArrowUpRight className="size-4 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
