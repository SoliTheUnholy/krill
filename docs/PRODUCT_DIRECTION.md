# Krill product direction

## The idea

Krill is a luxury digital studio for brands that want a website with a distinct point of view. The brand story is a conscious krill leaving its swarm; the product experience should feel like a descent into a dark, almost-black ocean. Orange is the bioluminescent signal, not the whole surface.

The homepage should never become a generic agency template. Its job is to make the customer feel that Krill can find the individual character of their brand and turn it into a working digital presence.

## Current experience

- The visual system uses the dark token set in `app/globals.css`. Prefer semantic Tailwind classes such as `bg-background`, `text-foreground`, `bg-card`, `border-border`, and `text-primary`; do not introduce a competing colour system in components.
- `components/ocean-scroll.tsx` owns the Locomotive Scroll lifecycle. There is intentionally no visual scroll tracker.
- In-page calls to action use `data-scroll-to` with a hash target. Locomotive Scroll handles the animated route after initialization, while native CSS smooth scrolling covers the accessible/browser fallback.
- Framer Motion is used for reveal and ambient motion. Respect `prefers-reduced-motion`; Locomotive Scroll deliberately falls back to native scrolling when it is enabled.

## The order signal

The estimator is not a contact form. It collects enough structured context to support an initial estimate and, later, a detailed internal build prompt.

| Chapters | Captured information | Why it matters |
| --- | --- | --- |
| 1. Brand essence | Name, category, and brand premise | Gives strategy and an LLM the non-generic context that differentiates the site. |
| 2. People + purpose | Primary audience and one business outcome | Anchors voice, trust signals, hierarchy, and the main customer journey. |
| 3. Shape | Delivery type | Establishes the underlying architecture and closest product model. |
| 4. Launch scale | Initial content and journey scope | Estimates how much of the brand world must exist for release. |
| 5. Capabilities | Eight customer-readable feature bundles | Separates a simple presence from commerce, accounts, dashboards, integrations, or bespoke application logic. |
| 6. Visual character | Creative world | Gives the design system a distinctive aesthetic direction. |
| 7. Movement | Motion intensity | Defines animation, performance, accessibility, and production effort. |
| 8. Starting point | Brand and content readiness | Accounts for identity, writing, imagery, and direction still required. |
| 9. Departure | Urgency, deadline, and references | Prices the protected schedule and captures non-negotiable timing. |

Order logic is deliberately split by responsibility: `lib/order/types.ts` owns stable IDs and the Zod contract, `lib/order/options.ts` owns customer-facing choices and their cost metadata, and `lib/order/pricing.ts` owns the deterministic calculator. Keep stable option IDs when changing labels or editorial copy. A future order API should store this object exactly and use the same IDs in the implementation prompt.

## Mobile form constraint

Choice layouts never exceed two columns. Major creative dimensions such as scale, movement, and urgency use taller icon-above-copy tiles; denser business and readiness choices use compact icon-beside-copy cards. Descriptions remain visible at every breakpoint, and the final card in an odd three-choice group spans the row to create deliberate visual rhythm. The shadcn `Progress` header remains mounted while only the chapter body transitions. Order textareas retain shadcn's `field-sizing-content` behaviour, grow as the customer writes, and hide platform scrollbars at their safe viewport-aware maximum.

## Estimator policy

The public range is intentionally a starting range, not a quote. The calculator applies:

1. a lower base price for the project type;
2. fixed additions for functional modules;
3. a scale multiplier; and
4. separate priority multipliers for compressed deadlines: faster choices raise
   the price while reducing delivery time. Half-week resolution ensures the
   customer sees a real time reduction even on a small project.

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
- `components/landing/`: reusable studio offerings, process, differentiation, deliverables, FAQ, and section-heading modules.
- `components/order-brief.tsx`: stable public export consumed by the landing page.
- `components/order-form/order-form.tsx`: React Hook Form orchestration, validation, navigation, and viewport contract.
- `components/order-form/order-steps.tsx`: ordered question chapters and per-step validation fields.
- `components/order-form/order-fields.tsx`: reusable shadcn/RHF field bindings.
- `components/order-form/order-option.tsx`: equal-height icon-backed row and tile radio variants plus multi-select controls.
- `components/order-form/order-live-estimate.tsx`: persistent labelled budget and delivery feedback.
- `components/order-form/order-estimate.tsx`: estimate reveal and authentication handoff.
- `components/krill-logo.tsx`: reusable brand mark.
- `components/site-footer.tsx`: landing CTA, navigation, account context, and site close.
- `components/ocean-scroll.tsx`: smooth-scroll lifecycle.
- `components/ui/`: generated Base UI / shadcn primitives; prefer these over new one-off controls.

## Working conventions

- Keep server pages thin. Put interactive state in a narrowly scoped client component.
- Keep validation/types, options, and pricing in their respective `lib/order/` modules.
- Rebuild after changing tokens, animation dependencies, or component contracts: `pnpm build`.
- The full lint command currently includes inherited warnings/errors in unused generated components. Validate changed files directly as well as running the production build.
