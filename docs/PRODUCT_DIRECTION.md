# Krill product direction

## The idea

Krill is a luxury digital studio for brands that want a website with a distinct point of view. The brand story is a conscious krill leaving its swarm; the product experience should feel like a descent into a dark, almost-black ocean. Orange is the bioluminescent signal, not the whole surface.

The homepage should never become a generic agency template. Its job is to make the customer feel that Krill can find the individual character of their brand and turn it into a working digital presence.

## Current experience

- The visual system uses the dark token set in `app/globals.css`. Prefer semantic Tailwind classes such as `bg-background`, `text-foreground`, `bg-card`, `border-border`, and `text-primary`; do not introduce a competing colour system in components.
- `components/ocean-scroll.tsx` owns the Locomotive Scroll lifecycle and publishes a `krill:scroll` browser event.
- `components/scroll-tracker.tsx` reads that event and renders the fixed progress indicator plus the low-contrast, krill-tipped SVG track with Framer Motion.
- Framer Motion is used for reveal and ambient motion. Respect `prefers-reduced-motion`; Locomotive Scroll deliberately falls back to native scrolling when it is enabled.

## The order signal

The estimator is not a contact form. It collects enough structured context to support an initial estimate and, later, a detailed internal build prompt.

| Chapter | Captured information | Why it matters |
| --- | --- | --- |
| The signal | Brand name, category, brand idea, audience | Gives strategy and an LLM the non-generic context that differentiates the site. |
| The job | Project type and primary outcome | Determines the main customer journey and conversion architecture. |
| The system | Required features and project scale | Separates a story site from commerce, bookings, accounts, memberships, or a bespoke product. |
| The character | Website style, content readiness, urgency, references | Defines the aesthetic route, production work, timing, and price pressure. |

`lib/order-brief.ts` is the canonical schema, option source, Zod validation contract, and deterministic ballpark calculator. `components/order-options.tsx` is the reusable, icon-led control layer. Keep stable option IDs when changing labels or editorial copy. A future order API should store this object exactly and use the same IDs in the implementation prompt.

## Mobile form constraint

The public order section is deliberately `100svh` on mobile. It must not grow the page into a long form. The active chapter scrolls **inside** the form body (`data-lenis-prevent`) while the progress header and next/back actions remain visible. Preserve this constraint when adding fields: either keep a step compact or add a new chapter rather than making the outer section taller.

## Estimator policy

The public range is intentionally a starting range, not a quote. The calculator applies:

1. a lower base price for the project type;
2. fixed additions for functional modules;
3. a scale multiplier; and
4. a priority multiplier for compressed deadlines.

The estimate reveal shows the expected **20% reservation deposit**. No payment must be collected until a Krill producer has confirmed scope. It is important that marketing copy does not imply that the range is a final contractual price.

## Required order pipeline (not connected yet)

The visual flow describes the intended product, but authentication and payments are deliberately not mocked in the frontend. Wire the following once the provider choices are made:

1. Authenticated user opens or resumes an order. Their profile, not the public brief, is the source of contact details.
2. Persist the `OrderBrief` payload along with the estimate version, authenticated user ID, and a `draft` order status.
3. A Krill producer confirms or adjusts scope and creates the approved quote.
4. Create a 20% payment request with the payment provider; on success move the order to `reserved` and create the customer project workspace.
5. Save all later milestones, remaining-balance payments, and delivery updates against that order.

Do not hard-code a login or payment route until the auth and payment providers are selected. The current "Sign in to save this order" button is a clear integration seam, rather than a fake checkout.

## Component map

- `components/krill-landing.tsx`: composition and editorial landing sections only.
- `components/order-brief.tsx`: React Hook Form + Zod multi-step brief UI and estimate reveal.
- `components/order-options.tsx`: icon-backed radio and multi-select option controls built from shadcn/Base UI primitives.
- `components/krill-logo.tsx`: reusable brand mark.
- `components/ocean-scroll.tsx`: smooth-scroll lifecycle and scroll event bridge.
- `components/scroll-tracker.tsx`: visual progress tracker.
- `components/ui/`: generated Base UI / shadcn primitives; prefer these over new one-off controls.

## Working conventions

- Keep server pages thin. Put interactive state in a narrowly scoped client component.
- Keep all pricing logic and order vocabulary in `lib/order-brief.ts`.
- Rebuild after changing tokens, animation dependencies, or component contracts: `pnpm build`.
- The full lint command currently includes inherited warnings/errors in unused generated components. Validate changed files directly as well as running the production build.
