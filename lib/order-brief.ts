import { z } from "zod";

/**
 * Canonical, serializable order vocabulary.
 *
 * This module must remain free of React imports. The same data is used by the
 * public estimator, a future order API, quote generation, and the internal
 * website-building prompt.
 */

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
  | "zap";

export type OrderOption<T extends string = string> = {
  id: T;
  label: string;
  detail: string;
  icon: OrderIcon;
};

export const projectTypeIds = ["launch", "brand", "commerce", "hospitality", "service", "product", "community", "platform"] as const;
export type ProjectType = (typeof projectTypeIds)[number];

export const projectTypes: Array<OrderOption<ProjectType> & { startingPrice: number; startingWeeks: number }> = [
  { id: "launch", label: "Signature launch", detail: "A sharp campaign, event, product, or one-idea experience.", icon: "rocket", startingPrice: 1600, startingWeeks: 2 },
  { id: "brand", label: "Brand home", detail: "A considered home for a studio, product, or emerging brand.", icon: "panels", startingPrice: 2400, startingWeeks: 3 },
  { id: "commerce", label: "Online shop", detail: "A product-led storefront with an elegant path to checkout.", icon: "store", startingPrice: 3400, startingWeeks: 4 },
  { id: "hospitality", label: "Hospitality", detail: "A restaurant, café, stay, or place worth making a visit for.", icon: "coffee", startingPrice: 2800, startingWeeks: 3 },
  { id: "service", label: "Service business", detail: "A high-trust site designed to turn attention into enquiries.", icon: "briefcase", startingPrice: 2600, startingWeeks: 3 },
  { id: "product", label: "Digital product", detail: "A product or SaaS presence that explains value with precision.", icon: "app", startingPrice: 4200, startingWeeks: 5 },
  { id: "community", label: "Culture or community", detail: "A publication, collective, member space, or cultural project.", icon: "users", startingPrice: 3000, startingWeeks: 4 },
  { id: "platform", label: "Custom platform", detail: "A richer digital service with custom journeys or workflows.", icon: "sparkles", startingPrice: 5600, startingWeeks: 6 },
];

export const goalIds = ["presence", "enquiries", "sales", "explanation", "community"] as const;
export type PrimaryGoal = (typeof goalIds)[number];

export const primaryGoals: Array<OrderOption<PrimaryGoal>> = [
  { id: "presence", label: "Make the brand unforgettable", detail: "Create a home with enough character to be remembered.", icon: "sparkles" },
  { id: "enquiries", label: "Turn visits into conversations", detail: "Make the service clear and the next step unmistakable.", icon: "target" },
  { id: "sales", label: "Sell a product or experience", detail: "Guide people from discovery to a confident purchase.", icon: "shopping-bag" },
  { id: "explanation", label: "Explain something complex", detail: "Make a product, process, or idea easy to believe in.", icon: "book-open" },
  { id: "community", label: "Give a community a place", detail: "Create a useful home for members, readers, or regulars.", icon: "users" },
];

export const featureIds = ["cms", "shop", "bookings", "accounts", "membership", "workflow"] as const;
export type Feature = (typeof featureIds)[number];

export const featureOptions: Array<OrderOption<Feature> & { price: number; weeks: number }> = [
  { id: "cms", label: "Content editor", detail: "Update stories, menus, collections, or pages after launch.", icon: "file-pen", price: 300, weeks: 0.25 },
  { id: "shop", label: "Online shop", detail: "Products, cart, checkout, orders, and purchase flows.", icon: "shopping-bag", price: 750, weeks: 0.75 },
  { id: "bookings", label: "Bookings", detail: "Appointments, tables, reservations, or ticketing.", icon: "calendar", price: 500, weeks: 0.5 },
  { id: "accounts", label: "Customer accounts", detail: "Log in, profiles, saved details, and private customer areas.", icon: "user-round", price: 850, weeks: 0.75 },
  { id: "membership", label: "Membership or payments", detail: "Subscriptions, gated material, or recurring access.", icon: "credit-card", price: 950, weeks: 1 },
  { id: "workflow", label: "Custom workflow", detail: "A bespoke calculator, configurator, dashboard, or intake process.", icon: "sliders", price: 1200, weeks: 1.25 },
];

export const scaleIds = ["focused", "standard", "expanded", "flagship"] as const;
export type ProjectScale = (typeof scaleIds)[number];

export const scaleOptions: Array<OrderOption<ProjectScale> & { multiplier: number }> = [
  { id: "focused", label: "Focused", detail: "One sharp page or up to three essential moments.", icon: "target", multiplier: 0.9 },
  { id: "standard", label: "Standard", detail: "Four to seven pages with a coherent content rhythm.", icon: "layers", multiplier: 1 },
  { id: "expanded", label: "Expanded", detail: "Eight to fourteen pages, collections, and richer navigation.", icon: "waves", multiplier: 1.25 },
  { id: "flagship", label: "Flagship", detail: "Multiple audiences, journeys, or a broad content ecosystem.", icon: "sparkles", multiplier: 1.55 },
];

export const websiteStyleIds = ["quiet", "editorial", "tactile", "expressive", "product-led", "atmospheric"] as const;
export type WebsiteStyle = (typeof websiteStyleIds)[number];

/** A short, purposeful style menu—not a catalogue of visual trends. */
export const websiteStyles: Array<OrderOption<WebsiteStyle>> = [
  { id: "quiet", label: "Quiet precision", detail: "Minimal, spacious, and materially considered.", icon: "layers" },
  { id: "editorial", label: "Editorial confidence", detail: "Strong type, clear hierarchy, and a sharp point of view.", icon: "book-open" },
  { id: "tactile", label: "Tactile warmth", detail: "Sensory, inviting, and suited to places or crafted goods.", icon: "coffee" },
  { id: "expressive", label: "Expressive energy", detail: "Movement, contrast, and surprise with a reason.", icon: "zap" },
  { id: "product-led", label: "Product clarity", detail: "Direct, confident, and designed to show how things work.", icon: "app" },
  { id: "atmospheric", label: "Atmospheric future", detail: "Immersive, cinematic, and slightly ahead of the room.", icon: "sparkles" },
];

export const contentReadinessIds = ["ready", "partial", "starting"] as const;
export type ContentReadiness = (typeof contentReadinessIds)[number];

export const contentReadiness: Array<OrderOption<ContentReadiness>> = [
  { id: "ready", label: "Ready to shape", detail: "The writing, photography, or product information mostly exists.", icon: "file-pen" },
  { id: "partial", label: "In progress", detail: "There is a useful starting set, but it needs direction.", icon: "layers" },
  { id: "starting", label: "Starting from signal", detail: "We need help finding the words, visual material, and structure.", icon: "sparkles" },
];

export const urgencyIds = ["studio", "priority", "expedition"] as const;
export type Urgency = (typeof urgencyIds)[number];

export const urgencyOptions: Array<OrderOption<Urgency> & { multiplier: number; minimumWeeks: number }> = [
  { id: "studio", label: "Studio pace", detail: "We can make the right decisions without rushing them.", icon: "clock", multiplier: 1, minimumWeeks: 0 },
  { id: "priority", label: "Priority launch", detail: "A firm date is approaching and we can protect space for it.", icon: "zap", multiplier: 1.15, minimumWeeks: 0 },
  { id: "expedition", label: "Expedition", detail: "A compressed build window with a tight, responsive team.", icon: "rocket", multiplier: 1.35, minimumWeeks: 2 },
];

export const orderBriefSchema = z.object({
  brandName: z.string().trim().min(2, "Tell us the name people should remember.").max(80, "Keep the brand name under 80 characters."),
  category: z.string().trim().min(2, "Name the category or world your brand belongs to.").max(120, "Keep the category under 120 characters."),
  brandIdea: z.string().trim().min(20, "Give us a little more: what do you make and why should it exist?").max(700, "Keep this thought under 700 characters."),
  audience: z.string().trim().max(400, "Keep your audience note under 400 characters."),
  projectType: z.enum(projectTypeIds),
  goal: z.enum(goalIds),
  features: z.array(z.enum(featureIds)).max(featureIds.length),
  scale: z.enum(scaleIds),
  websiteStyle: z.enum(websiteStyleIds),
  contentReadiness: z.enum(contentReadinessIds),
  urgency: z.enum(urgencyIds),
  references: z.string().trim().max(500, "Keep references and notes under 500 characters."),
});

export type OrderBrief = z.infer<typeof orderBriefSchema>;

export const defaultOrderBrief: OrderBrief = {
  brandName: "",
  category: "",
  brandIdea: "",
  audience: "",
  projectType: "brand",
  goal: "presence",
  features: ["cms"],
  scale: "standard",
  websiteStyle: "editorial",
  contentReadiness: "partial",
  urgency: "studio",
  references: "",
};

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
