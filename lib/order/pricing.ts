import {
  brandReadinessOptions,
  contentReadinessOptions,
  featureOptions,
  motionLevels,
  projectTypes,
  scaleOptions,
  urgencyOptions,
} from "@/lib/order/options";
import type { Estimate, OrderBrief } from "@/lib/order/types";

function selected<T extends { id: string }>(options: T[], id: string): T {
  return options.find((option) => option.id === id) ?? options[0];
}

function ceilToHalfWeek(value: number) {
  return Math.ceil(value * 2) / 2;
}

/**
 * Deterministic ballpark calculation.
 *
 * This is deliberately transparent and conservative. It is not a quote: the
 * authenticated order flow must save the calculator version and require human
 * scope confirmation before collecting a deposit.
 */
export function calculateEstimate(brief: OrderBrief): Estimate {
  const project = selected(projectTypes, brief.projectType);
  const scale = selected(scaleOptions, brief.scale);
  const urgency = selected(urgencyOptions, brief.urgency);
  const motion = selected(motionLevels, brief.motionLevel);
  const brand = selected(brandReadinessOptions, brief.brandReadiness);
  const content = selected(contentReadinessOptions, brief.contentReadiness);
  const features = featureOptions.filter((feature) =>
    brief.features.includes(feature.id),
  );

  const additions = [...features, motion, brand, content];
  const addedPrice = additions.reduce((total, item) => total + item.price, 0);
  const addedWeeks = additions.reduce((total, item) => total + item.weeks, 0);
  const workloadWeeks = project.startingWeeks * scale.multiplier + addedWeeks;
  const total = Math.round(
    ((project.startingPrice + addedPrice) *
      scale.multiplier *
      urgency.priceMultiplier) /
      100,
  ) * 100;
  const studioWeeks = Math.max(2, ceilToHalfWeek(workloadWeeks));
  const paceIndex = Math.max(
    0,
    urgencyOptions.findIndex((option) => option.id === urgency.id),
  );
  const paceFloor = urgency.id === "studio" ? 2 : urgency.id === "priority" ? 1.5 : 1;
  const weeks = Math.max(
    paceFloor,
    Math.min(
      ceilToHalfWeek(workloadWeeks * urgency.timeMultiplier),
      studioWeeks - paceIndex * 0.5,
    ),
  );

  return {
    total,
    deposit: Math.round((total * 0.2) / 50) * 50,
    weeks,
    project: project.label,
  };
}
