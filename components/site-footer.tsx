import { ArrowUp, ArrowUpRight } from "lucide-react";

import { KrillLogo } from "@/components/krill-logo";

const footerLinks = [
  { label: "What we build", href: "#work" },
  { label: "How it works", href: "#process" },
  { label: "Why Krill", href: "#why-krill" },
  { label: "Questions", href: "#faq" },
  { label: "Start an order", href: "#order" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border bg-card/35 px-5 pb-7 pt-14 sm:px-8 lg:px-12 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-border pb-12 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">
              A place to begin
            </p>
            <h2 className="mt-4 max-w-3xl text-balance font-serif text-5xl leading-[.88] tracking-[-.07em] text-foreground sm:text-6xl lg:text-7xl">
              Ready to leave the swarm?
            </h2>
          </div>
          <a
            href="#order"
            data-scroll-to
            className="group inline-flex h-12 w-fit items-center gap-3 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-[0_12px_34px_color-mix(in_oklch,var(--primary),transparent_65%)] transition hover:-translate-y-0.5 hover:bg-primary/85 motion-reduce:transform-none"
          >
            Shape your website
            <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
          </a>
        </div>

        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_.6fr_.6fr]">
          <div>
            <KrillLogo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Extraordinary digital homes for brands with something particular
              to say. Small swarm energy, singular outcomes.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-primary">
              Explore
            </p>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-scroll-to
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-primary">
              Project access
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Orders, payments, and delivery updates will live in your private
              account.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Krill. Made below the surface.</p>
          <a
            href="#top"
            data-scroll-to
            className="inline-flex items-center gap-2 text-left font-medium text-foreground transition hover:text-primary"
          >
            Return to the surface <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
