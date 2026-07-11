import { z } from "zod";

/**
 * Stable order identifiers.
 *
 * These values are persisted with an order and later become structured input
 * for estimation and AI-assisted production. Labels may change; IDs should not.
 */
export const projectTypeIds = [
  "launch",
  "brand",
  "service",
  "hospitality",
  "commerce",
  "editorial",
  "product",
  "platform",
] as const;

export const goalIds = [
  "presence",
  "enquiries",
  "sales",
  "explanation",
  "community",
] as const;

export const featureIds = [
  "content",
  "leads-bookings",
  "commerce",
  "accounts-membership",
  "discovery",
  "media",
  "portal",
  "custom-connected",
] as const;

export const scaleIds = ["focused", "standard", "expanded", "flagship"] as const;
export const websiteStyleIds = [
  "quiet",
  "editorial",
  "organic",
  "graphic",
  "product-led",
  "cinematic",
  "crafted",
  "playful",
] as const;
export const motionLevelIds = ["still", "subtle", "expressive", "immersive"] as const;
export const readinessIds = ["ready", "partial", "starting"] as const;
export const urgencyIds = ["studio", "priority", "expedition"] as const;

export type ProjectType = (typeof projectTypeIds)[number];
export type PrimaryGoal = (typeof goalIds)[number];
export type Feature = (typeof featureIds)[number];
export type ProjectScale = (typeof scaleIds)[number];
export type WebsiteStyle = (typeof websiteStyleIds)[number];
export type MotionLevel = (typeof motionLevelIds)[number];
export type Readiness = (typeof readinessIds)[number];
export type Urgency = (typeof urgencyIds)[number];

/**
 * Zod is the single validation contract for both the client form and a future
 * server endpoint. Keep server-side validation even though the client validates.
 */
export const orderBriefSchema = z.object({
  brandName: z
    .string()
    .trim()
    .min(2, "Tell us the name people should remember.")
    .max(80, "Keep the brand name under 80 characters."),
  category: z
    .string()
    .trim()
    .min(2, "Name the category or world your brand belongs to.")
    .max(120, "Keep the category under 120 characters."),
  brandIdea: z
    .string()
    .trim()
    .min(20, "Give us a little more: what do you make and why should it exist?")
    .max(700, "Keep this thought under 700 characters."),
  audience: z
    .string()
    .trim()
    .min(8, "Describe the people this website needs to reach.")
    .max(400, "Keep your audience note under 400 characters."),
  projectType: z.enum(projectTypeIds),
  goal: z.enum(goalIds),
  features: z.array(z.enum(featureIds)).max(featureIds.length),
  scale: z.enum(scaleIds),
  websiteStyle: z.enum(websiteStyleIds),
  motionLevel: z.enum(motionLevelIds),
  brandReadiness: z.enum(readinessIds),
  contentReadiness: z.enum(readinessIds),
  urgency: z.enum(urgencyIds),
  references: z
    .string()
    .trim()
    .max(500, "Keep references and notes under 500 characters."),
});

export type OrderBrief = z.infer<typeof orderBriefSchema>;

export const defaultOrderBrief: OrderBrief = {
  brandName: "",
  category: "",
  brandIdea: "",
  audience: "",
  projectType: "brand",
  goal: "presence",
  features: ["content", "leads-bookings"],
  scale: "standard",
  websiteStyle: "editorial",
  motionLevel: "subtle",
  brandReadiness: "partial",
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
