"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

import { KrillLogo } from "@/components/krill-logo";
import { OceanScroll } from "@/components/ocean-scroll";
import { OrderBriefEstimator } from "@/components/order-brief";
import { ScrollTracker } from "@/components/scroll-tracker";
import { Button } from "@/components/ui/button";

function TideOrb() {
  return (
    <motion.div
      className="relative mx-auto h-[340px] w-[340px] sm:h-[460px] sm:w-[460px]"
      animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
      data-scroll
      data-scroll-speed="0.45"
    >
      <div className="absolute inset-[8%] rounded-full border border-primary/30 bg-[radial-gradient(circle_at_34%_27%,color-mix(in_oklch,var(--primary-foreground),transparent_12%)_0%,color-mix(in_oklch,var(--primary),white_20%)_9%,var(--primary)_34%,color-mix(in_oklch,var(--primary),black_45%)_67%,color-mix(in_oklch,var(--background),black_7%)_100%)] shadow-[inset_-35px_-35px_70px_color-mix(in_oklch,var(--background),transparent_10%),inset_13px_12px_34px_color-mix(in_oklch,var(--primary-foreground),transparent_65%),0_30px_80px_color-mix(in_oklch,var(--primary),transparent_66%)]" />
      <div className="absolute inset-[3%] rounded-full border border-dashed border-primary/35" />
      <motion.div className="absolute left-[15%] top-[19%] size-[16%] rounded-full bg-primary-foreground/30 blur-[5px]" animate={{ opacity: [0.24, 0.58, 0.24] }} transition={{ duration: 4, repeat: Infinity }} />
      <div className="absolute -right-2 bottom-[19%] grid size-20 rotate-12 place-items-center rounded-3xl border border-primary/30 bg-card/40 text-primary shadow-2xl backdrop-blur-xl"><Sparkles className="size-7" strokeWidth={1.5} /></div>
      <p className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2 rounded-full border border-border bg-card/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.18em] text-muted-foreground shadow-xl backdrop-blur">Surface is overrated.</p>
    </motion.div>
  );
}

const process = [
  ["01", "Signal", "Your precise brief tells us what must feel different about this particular brand."],
  ["02", "Current", "We turn the signal into a creative and technical route with no black-box ambiguity."],
  ["03", "Release", "You reserve the project, follow the build in your account, and launch with a living system."],
];

export default function KrillLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <OceanScroll>
      <main className="relative overflow-hidden bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <ScrollTracker />
        <section className="relative z-10 isolate min-h-screen overflow-hidden border-b border-border px-5 pb-20 pt-5 sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_80%_18%,color-mix(in_oklch,var(--primary),transparent_80%),transparent_44%),radial-gradient(ellipse_at_10%_100%,color-mix(in_oklch,var(--chart-2),transparent_94%),transparent_45%)]" />
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(color-mix(in_oklch,var(--primary-foreground),transparent_75%)_0.7px,transparent_0.7px)] [background-size:14px_14px]" />
          <div className="mx-auto max-w-7xl">
            <nav className="relative flex items-center justify-between rounded-full border border-border bg-card/45 px-4 py-3 shadow-[0_10px_36px_color-mix(in_oklch,var(--background),transparent_10%)] backdrop-blur-xl sm:px-5">
              <KrillLogo />
              <div className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
                <a href="#process" className="transition hover:text-foreground">How it works</a>
                <a href="#why-krill" className="transition hover:text-foreground">The difference</a>
                <a href="#order" className="inline-flex h-8 items-center gap-1 rounded-full bg-primary px-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/80">Start an order <ArrowUpRight className="size-4" /></a>
              </div>
              <Button variant="outline" size="icon-sm" onClick={() => setMenuOpen((open) => !open)} className="rounded-full md:hidden" aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</Button>
              {menuOpen && (
                <div className="absolute right-0 top-[4.3rem] z-30 flex w-56 flex-col gap-1 rounded-3xl border border-border bg-card p-3 shadow-2xl md:hidden">
                  <a href="#process" onClick={closeMenu} className="rounded-2xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">How it works</a>
                  <a href="#why-krill" onClick={closeMenu} className="rounded-2xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">The difference</a>
                  <a href="#order" onClick={closeMenu} className="rounded-2xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">Start an order</a>
                </div>
              )}
            </nav>

            <div className="grid items-center gap-10 pb-14 pt-20 lg:grid-cols-[1.08fr_.92fr] lg:pb-24 lg:pt-28">
              <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, ease: [0.2, 0.75, 0.25, 1] }}>
                <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.16em] text-primary"><span className="size-1.5 rounded-full bg-primary shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary),transparent_75%)]" /> An independent digital studio</p>
                <h1 className="mt-8 max-w-3xl text-balance font-serif text-[clamp(4rem,8vw,8rem)] leading-[.78] tracking-[-.085em] text-foreground">A new current for brands with <em className="font-normal text-primary">depth.</em></h1>
                <p className="mt-9 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">Krill makes luxurious, living websites for brands ready to leave the swarm—where strategy, character, and a remarkable digital body move as one.</p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href="#order" className="group inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-[0_12px_34px_color-mix(in_oklch,var(--primary),transparent_60%)] transition hover:bg-primary/80">Give us the signal <ArrowDownRight className="size-4 transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" /></a>
                  <a href="#process" className="inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">Follow the current <ArrowDownRight className="size-4" /></a>
                </div>
                <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-6 text-sm text-muted-foreground"><span><b className="mr-1 font-medium text-foreground">2–10 weeks</b> to launch</span><span><b className="mr-1 font-medium text-foreground">20% deposit</b> after scope confirmation</span></div>
              </motion.div>
              <TideOrb />
            </div>
          </div>
        </section>

        <section id="process" className="relative z-10 border-b border-border px-5 py-20 sm:px-8 lg:px-12 lg:py-28" data-scroll-section>
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">No black water</p><h2 className="mt-4 max-w-md font-serif text-5xl leading-[.88] tracking-[-.075em] sm:text-6xl">A clear path below the surface.</h2></div>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">The point is not to make every Krill site look the same. It is to bring enough clarity to the beginning that we can make each one unmistakably itself.</p>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-3">
              {process.map(([number, title, copy], index) => (
                <motion.article key={number} className="min-h-72 bg-card/95 p-7 sm:p-9" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: index * 0.08, duration: 0.5 }} data-scroll data-scroll-speed={index === 1 ? "0.12" : "0"}>
                  <span className="font-mono text-xs text-primary">{number}</span>
                  <h3 className="mt-16 text-3xl font-medium tracking-[-.055em] text-card-foreground">{title}</h3>
                  <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">{copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="why-krill" className="relative z-10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28" data-scroll-section>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_50%,color-mix(in_oklch,var(--primary),transparent_90%),transparent_35%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
            <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">Beyond decoration</p><h2 className="mt-4 max-w-lg font-serif text-5xl leading-[.88] tracking-[-.075em] sm:text-6xl">A website that behaves like a brand, not a brochure.</h2></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["A considered shape", "Every choice starts with your category, audience, and business model—not a preset theme."],
                ["A working system", "We distinguish between simple sites and builds that need commerce, bookings, accounts, or a custom workflow."],
                ["A singular character", "Your visual character, references, and story give the implementation model meaningful creative direction."],
                ["A visible route", "Your account, approved scope, deposit, and project space make the progress legible from day one."],
              ].map(([title, copy]) => <div key={title} className="rounded-[1.5rem] border border-border bg-card/45 p-6"><h3 className="text-xl font-medium tracking-[-.04em] text-card-foreground">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p></div>)}
            </div>
          </div>
        </section>

        <OrderBriefEstimator />

        <footer className="relative z-10 border-t border-border px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center"><KrillLogo /><p className="text-sm text-muted-foreground">For brands ready to find their own current.</p><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-sm font-medium text-primary hover:text-foreground">Return to the surface ↑</button></div>
        </footer>
      </main>
    </OceanScroll>
  );
}
