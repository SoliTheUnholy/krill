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
  const total = Math.round(
    ((project.startingPrice + addedPrice) *
      scale.multiplier *
      urgency.multiplier) /
      100,
  ) * 100;
  const weeks = Math.max(
    2,
    Math.ceil(
      (project.startingWeeks * scale.multiplier + addedWeeks) *
        urgency.multiplier +
        urgency.minimumWeeks,
    ),
  );

  return {
    total,
    deposit: Math.round((total * 0.2) / 50) * 50,
    weeks,
    project: project.label,
  };
}
