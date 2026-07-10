/**
 * The public order signal is intentionally structured for two audiences:
 * 1. Krill's estimator and delivery team.
 * 2. The internal implementation model that turns a confirmed order into a build plan.
 *
 * Keep machine-readable values stable. Copy can evolve without breaking a future
 * order API or prompt builder.
 */

export type ProjectType = "story" | "brand" | "commerce" | "platform";
export type ProjectScale = "focused" | "standard" | "expanded" | "flagship";
export type Urgency = "studio" | "priority" | "expedition";
export type ContentReadiness = "ready" | "partial" | "starting";
export type CreativeCharacter = "quiet" | "editorial" | "expressive" | "future";

export type OrderBrief = {
  brandName: string;
  category: string;
  brandIdea: string;
  audience: string;
  projectType: ProjectType;
  goal: string;
  features: string[];
  scale: ProjectScale;
  creativeCharacter: CreativeCharacter;
  contentReadiness: ContentReadiness;
  urgency: Urgency;
  references: string;
};

export const defaultOrderBrief: OrderBrief = {
  brandName: "",
  category: "",
  brandIdea: "",
  audience: "",
  projectType: "brand",
  goal: "Create a memorable home for the brand",
  features: ["cms"],
  scale: "standard",
  creativeCharacter: "editorial",
  contentReadiness: "partial",
  urgency: "studio",
  references: "",
};

export const projectTypes: Array<{
  id: ProjectType;
  label: string;
  detail: string;
  startingPrice: number;
  startingWeeks: number;
}> = [
  { id: "story", label: "Signature launch", detail: "One focused idea, event, product, or campaign.", startingPrice: 1800, startingWeeks: 2 },
  { id: "brand", label: "Brand website", detail: "A flexible home for a service, studio, hospitality, or product brand.", startingPrice: 2800, startingWeeks: 3 },
  { id: "commerce", label: "Commerce or bookings", detail: "A site designed to sell products, reservations, appointments, or tickets.", startingPrice: 3900, startingWeeks: 4 },
  { id: "platform", label: "Custom digital product", detail: "A richer service with accounts, member spaces, or custom workflows.", startingPrice: 6200, startingWeeks: 6 },
];

export const primaryGoals = [
  "Create a memorable home for the brand",
  "Convert visits into enquiries",
  "Sell products or experiences online",
  "Explain a complex product or idea",
  "Serve an existing customer community",
];

export const featureOptions = [
  { id: "cms", label: "Content editor", detail: "Update pages, stories, or menus after launch.", price: 350, weeks: 0.25 },
  { id: "shop", label: "Online shop", detail: "Products, cart, checkout, and order flow.", price: 850, weeks: 0.75 },
  { id: "bookings", label: "Bookings", detail: "Appointments, tables, reservations, or tickets.", price: 600, weeks: 0.5 },
  { id: "accounts", label: "Customer accounts", detail: "Log in, profiles, and a private customer area.", price: 950, weeks: 0.75 },
  { id: "membership", label: "Membership or payments", detail: "Subscriptions, gated content, or recurring access.", price: 1100, weeks: 1 },
  { id: "workflow", label: "Custom workflow", detail: "A bespoke calculator, configurator, dashboard, or intake flow.", price: 1400, weeks: 1.25 },
];

export const scaleOptions: Array<{ id: ProjectScale; label: string; detail: string; multiplier: number }> = [
  { id: "focused", label: "Focused", detail: "A sharp one-page experience or up to 3 key pages.", multiplier: 0.9 },
  { id: "standard", label: "Standard", detail: "A considered set of 4–7 pages and supporting moments.", multiplier: 1 },
  { id: "expanded", label: "Expanded", detail: "8–14 pages, collections, and a deeper content system.", multiplier: 1.25 },
  { id: "flagship", label: "Flagship", detail: "A broad ecosystem with multiple journeys or audiences.", multiplier: 1.55 },
];

export const creativeCharacters: Array<{ id: CreativeCharacter; label: string; detail: string }> = [
  { id: "quiet", label: "Quiet precision", detail: "Restrained, spacious, and materially considered." },
  { id: "editorial", label: "Editorial confidence", detail: "Clear hierarchy, strong type, and a point of view." },
  { id: "expressive", label: "Expressive energy", detail: "Bold movement, texture, and surprise where it counts." },
  { id: "future", label: "Future artifact", detail: "Digital, atmospheric, and slightly ahead of the room." },
];

export const contentReadiness: Array<{ id: ContentReadiness; label: string; detail: string }> = [
  { id: "ready", label: "Ready to shape", detail: "Copy, photography, and product information are mostly prepared." },
  { id: "partial", label: "In progress", detail: "We have a useful starting set, and need direction to complete it." },
  { id: "starting", label: "Starting from signal", detail: "We need help finding the words, image direction, and structure." },
];

export const urgencyOptions: Array<{ id: Urgency; label: string; detail: string; multiplier: number; minimumWeeks: number }> = [
  { id: "studio", label: "Studio pace", detail: "We can make the right decisions without rushing them.", multiplier: 1, minimumWeeks: 0 },
  { id: "priority", label: "Priority launch", detail: "A firm date is approaching; we can protect space for it.", multiplier: 1.15, minimumWeeks: 0 },
  { id: "expedition", label: "Expedition", detail: "A compressed build window that requires a tight, responsive team.", multiplier: 1.35, minimumWeeks: 2 },
];

export type Estimate = {
  total: number;
  deposit: number;
  weeks: number;
  project: string;
};

export function calculateEstimate(brief: OrderBrief): Estimate {
  const project = projectTypes.find((item) => item.id === brief.projectType) ?? projectTypes[1];
  const scale = scaleOptions.find((item) => item.id === brief.scale) ?? scaleOptions[1];
  const urgency = urgencyOptions.find((item) => item.id === brief.urgency) ?? urgencyOptions[0];
  const selectedFeatures = featureOptions.filter((feature) => brief.features.includes(feature.id));
  const featurePrice = selectedFeatures.reduce((total, feature) => total + feature.price, 0);
  const featureWeeks = selectedFeatures.reduce((total, feature) => total + feature.weeks, 0);
  const total = Math.round(((project.startingPrice + featurePrice) * scale.multiplier * urgency.multiplier) / 100) * 100;
  const weeks = Math.max(2, Math.ceil((project.startingWeeks * scale.multiplier + featureWeeks) * urgency.multiplier + urgency.minimumWeeks));

  return {
    total,
    deposit: Math.round((total * 0.2) / 50) * 50,
    weeks,
    project: project.label,
  };
}
