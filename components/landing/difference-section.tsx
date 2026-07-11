import { SectionHeading } from "@/components/landing/section-heading";

const differences = [
  [
    "A considered shape",
    "Every choice begins with category, audience, business model, and content—not a preset theme.",
  ],
  [
    "A working system",
    "We distinguish a focused brand site from commerce, bookings, accounts, integrations, and bespoke product logic.",
  ],
  [
    "A singular character",
    "Your story, visual direction, movement, and references give production a precise creative north star.",
  ],
  [
    "A visible route",
    "Approved scope, deposit, milestones, decisions, and delivery remain understandable from the first signal to launch.",
  ],
];

export function DifferenceSection() {
  return (
    <section
      id="why-krill"
      className="relative z-10 px-5 py-20 sm:px-8 lg:px-12 lg:py-32"
      data-scroll-section
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_50%,color-mix(in_oklch,var(--primary),transparent_90%),transparent_35%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Beyond decoration"
          title="A website that behaves like a brand."
          copy="The goal is not simply to look expensive. It is to make every interaction feel inevitable for this business and impossible to confuse with another."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {differences.map(([title, copy], index) => (
            <article
              key={title}
              className="rounded-[1.5rem] border border-border bg-card/45 p-6"
            >
              <span className="font-mono text-[10px] text-primary">
                0{index + 1}
              </span>
              <h3 className="mt-9 text-xl font-medium tracking-[-.04em] text-card-foreground">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
