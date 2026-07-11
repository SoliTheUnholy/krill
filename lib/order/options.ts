import type {
  Feature,
  MotionLevel,
  PrimaryGoal,
  ProjectScale,
  ProjectType,
  Readiness,
  Urgency,
  WebsiteStyle,
} from "@/lib/order/types";

export type OrderIcon =
  | "rocket"
  | "panels"
  | "store"
  | "coffee"
  | "briefcase"
  | "app"
  | "users"
  | "sparkles"
  | "target"
  | "shopping-bag"
  | "calendar"
  | "file-pen"
  | "user-round"
  | "credit-card"
  | "sliders"
  | "layers"
  | "waves"
  | "book-open"
  | "clock"
  | "zap"
  | "search"
  | "image"
  | "plug"
  | "message";

export type OrderOption<T extends string = string> = {
  id: T;
  label: string;
  detail: string;
  icon: OrderIcon;
};

export type PricedOption<T extends string = string> = OrderOption<T> & {
  price: number;
  weeks: number;
};

/**
 * Product shapes are intentionally broad. The reference catalogue contains
 * hundreds of verticals; these eight shapes capture the delivery architecture
 * without forcing customers to understand our internal taxonomy.
 */
export const projectTypes: Array<
  OrderOption<ProjectType> & { startingPrice: number; startingWeeks: number }
> = [
  { id: "launch", label: "Launch", detail: "Campaign, event, or one focused idea.", icon: "rocket", startingPrice: 1500, startingWeeks: 2 },
  { id: "brand", label: "Brand home", detail: "A distinctive home for an emerging brand.", icon: "panels", startingPrice: 2300, startingWeeks: 3 },
  { id: "service", label: "Service", detail: "Trust, expertise, and a clear enquiry path.", icon: "briefcase", startingPrice: 2500, startingWeeks: 3 },
  { id: "hospitality", label: "Place", detail: "Restaurant, café, hotel, wellness, or venue.", icon: "coffee", startingPrice: 2700, startingWeeks: 3 },
  { id: "commerce", label: "Shop", detail: "Products and a confident path to checkout.", icon: "store", startingPrice: 3300, startingWeeks: 4 },
  { id: "editorial", label: "Editorial", detail: "Publication, portfolio, culture, or stories.", icon: "book-open", startingPrice: 2600, startingWeeks: 3 },
  { id: "product", label: "Digital product", detail: "SaaS, app, tool, or product presentation.", icon: "app", startingPrice: 3900, startingWeeks: 5 },
  { id: "platform", label: "Platform", detail: "Accounts, dashboards, or custom journeys.", icon: "sparkles", startingPrice: 5200, startingWeeks: 6 },
];

export const primaryGoals: Array<OrderOption<PrimaryGoal>> = [
  { id: "presence", label: "Be remembered", detail: "Make the brand unmistakable.", icon: "sparkles" },
  { id: "enquiries", label: "Win enquiries", detail: "Turn attention into conversations.", icon: "target" },
  { id: "sales", label: "Sell", detail: "Move people toward a purchase.", icon: "shopping-bag" },
  { id: "explanation", label: "Explain", detail: "Make a complex idea easy to trust.", icon: "book-open" },
  { id: "community", label: "Gather people", detail: "Serve members, readers, or regulars.", icon: "users" },
];

export const featureOptions: Array<PricedOption<Feature>> = [
  { id: "content", label: "Content system", detail: "Editable pages, stories, menus, or collections.", icon: "file-pen", price: 300, weeks: 0.25 },
  { id: "leads-bookings", label: "Leads & bookings", detail: "Enquiries, appointments, tables, stays, or tickets.", icon: "calendar", price: 450, weeks: 0.4 },
  { id: "commerce", label: "Commerce", detail: "Products, checkout, payments, and order flows.", icon: "shopping-bag", price: 800, weeks: 0.75 },
  { id: "accounts-membership", label: "Accounts & access", detail: "Profiles, membership, subscriptions, or gated areas.", icon: "user-round", price: 950, weeks: 0.9 },
  { id: "discovery", label: "Search & discovery", detail: "Search, filters, maps, categories, or recommendations.", icon: "search", price: 400, weeks: 0.35 },
  { id: "media", label: "Rich storytelling", detail: "Galleries, video, audio, portfolios, or case studies.", icon: "image", price: 350, weeks: 0.3 },
  { id: "portal", label: "Portal or dashboard", detail: "Private data, progress, reporting, or management views.", icon: "panels", price: 1200, weeks: 1.2 },
  { id: "custom-connected", label: "Custom & connected", detail: "Integrations, automation, AI, calculators, or workflows.", icon: "plug", price: 1300, weeks: 1.2 },
];

export const scaleOptions: Array<
  OrderOption<ProjectScale> & { multiplier: number }
> = [
  { id: "focused", label: "Focused", detail: "One page or up to three key moments.", icon: "target", multiplier: 0.9 },
  { id: "standard", label: "Standard", detail: "Four to seven pages.", icon: "layers", multiplier: 1 },
  { id: "expanded", label: "Expanded", detail: "Eight to fourteen pages or collections.", icon: "waves", multiplier: 1.25 },
  { id: "flagship", label: "Flagship", detail: "Multiple audiences or complex journeys.", icon: "sparkles", multiplier: 1.55 },
];

/** Human-readable directions distilled from the much larger style catalogue. */
export const websiteStyles: Array<OrderOption<WebsiteStyle>> = [
  { id: "quiet", label: "Quiet precision", detail: "Minimal, spacious, and restrained.", icon: "layers" },
  { id: "editorial", label: "Editorial", detail: "Strong typography and clear hierarchy.", icon: "book-open" },
  { id: "organic", label: "Warm & organic", detail: "Natural, tactile, and inviting.", icon: "waves" },
  { id: "graphic", label: "Bold & graphic", detail: "Confident contrast and strong shapes.", icon: "zap" },
  { id: "product-led", label: "Product clarity", detail: "Direct, structured, and functional.", icon: "app" },
  { id: "cinematic", label: "Cinematic luxury", detail: "Atmospheric, immersive, and premium.", icon: "sparkles" },
  { id: "crafted", label: "Raw & crafted", detail: "Human, textured, and intentionally imperfect.", icon: "file-pen" },
  { id: "playful", label: "Playful & tactile", detail: "Friendly, energetic, and interactive.", icon: "coffee" },
];

export const motionLevels: Array<PricedOption<MotionLevel>> = [
  { id: "still", label: "Still", detail: "Almost no decorative movement.", icon: "target", price: 0, weeks: 0 },
  { id: "subtle", label: "Subtle", detail: "Refined reveals and feedback.", icon: "layers", price: 150, weeks: 0.15 },
  { id: "expressive", label: "Expressive", detail: "Movement is part of the personality.", icon: "zap", price: 450, weeks: 0.4 },
  { id: "immersive", label: "Immersive", detail: "A cinematic, scroll-led experience.", icon: "sparkles", price: 900, weeks: 0.9 },
];

export const brandReadinessOptions: Array<
  PricedOption<Readiness>
> = [
  { id: "ready", label: "Established", detail: "Identity and guidelines are ready.", icon: "file-pen", price: 0, weeks: 0 },
  { id: "partial", label: "Some identity", detail: "Useful pieces exist but need direction.", icon: "layers", price: 250, weeks: 0.25 },
  { id: "starting", label: "Need identity", detail: "We need to shape the digital personality.", icon: "sparkles", price: 600, weeks: 0.6 },
];

export const contentReadinessOptions: Array<
  PricedOption<Readiness>
> = [
  { id: "ready", label: "Ready", detail: "Writing and imagery mostly exist.", icon: "file-pen", price: 0, weeks: 0 },
  { id: "partial", label: "In progress", detail: "We need to shape and complete it.", icon: "layers", price: 200, weeks: 0.2 },
  { id: "starting", label: "Need support", detail: "Structure, words, and imagery need direction.", icon: "sparkles", price: 500, weeks: 0.5 },
];

export const urgencyOptions: Array<
  OrderOption<Urgency> & { priceMultiplier: number; timeMultiplier: number }
> = [
  { id: "studio", label: "Studio", detail: "Enough time to make the right decisions.", icon: "clock", priceMultiplier: 1, timeMultiplier: 1 },
  { id: "priority", label: "Priority", detail: "A protected schedule for a firm date.", icon: "zap", priceMultiplier: 1.15, timeMultiplier: 0.8 },
  { id: "expedition", label: "Expedition", detail: "A compressed, highly responsive build.", icon: "rocket", priceMultiplier: 1.35, timeMultiplier: 0.6 },
];
