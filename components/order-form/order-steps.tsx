"use client";

import type { ComponentType } from "react";
import type { FieldPath, UseFormReturn } from "react-hook-form";

import {
  OrderFeatureGrid,
  OrderRadioGrid,
  OrderTextField,
  OrderTextareaField,
} from "@/components/order-form/order-fields";
import {
  brandReadinessOptions,
  contentReadinessOptions,
  featureOptions,
  motionLevels,
  primaryGoals,
  projectTypes,
  scaleOptions,
  urgencyOptions,
  websiteStyles,
} from "@/lib/order/options";
import type { OrderBrief } from "@/lib/order/types";

export type OrderStepProps = {
  form: UseFormReturn<OrderBrief>;
};

export type OrderStepDefinition = {
  id: string;
  label: string;
  fields: Array<FieldPath<OrderBrief>>;
  Component: ComponentType<OrderStepProps>;
};

/**
 * Mobile copy is intentionally terse. The supporting sentence appears from
 * `sm` upwards; on small phones the title and controls are sufficient context.
 */
function StepHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <header className="shrink-0">
      <p className="text-[9px] font-semibold uppercase tracking-[.18em] text-primary sm:text-xs">
        {eyebrow}
      </p>
      <h3 className="mt-1.5 text-balance text-xl font-semibold leading-[1] tracking-[-.05em] text-card-foreground sm:mt-2 sm:text-3xl">
        {title}
      </h3>
      <p className="mt-2 hidden max-w-2xl text-sm leading-relaxed text-muted-foreground sm:block">
        {copy}
      </p>
    </header>
  );
}

function SignalStep({ form }: OrderStepProps) {
  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="The signal"
        title="What should people remember?"
        copy="Give the build team the identity and premise that make this brand particular."
      />
      <div className="mt-3 grid gap-3 sm:mt-5 sm:gap-4">
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <OrderTextField
            control={form.control}
            name="brandName"
            label="Brand name"
            placeholder="Aster"
            autoComplete="organization"
          />
          <OrderTextField
            control={form.control}
            name="category"
            label="Category"
            placeholder="Coffee"
          />
        </div>
        <OrderTextareaField
          control={form.control}
          name="brandIdea"
          label="The idea behind the brand"
          placeholder="What do you make, why should it exist, and what makes it different?"
          description="Two or three honest sentences are enough."
          rows={3}
        />
      </div>
    </div>
  );
}

function AudienceStep({ form }: OrderStepProps) {
  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="The people"
        title="Who needs to feel understood?"
        copy="A useful audience description guides tone, information hierarchy, trust signals, and calls to action."
      />
      <div className="mt-4 sm:mt-7">
        <OrderTextareaField
          control={form.control}
          name="audience"
          label="Describe your most important visitor"
          placeholder="Who are they, what do they value, and what brings them to the website?"
          rows={6}
        />
      </div>
    </div>
  );
}

function GoalStep({ form }: OrderStepProps) {
  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="The outcome"
        title="What must the website achieve?"
        copy="The primary outcome anchors the homepage hierarchy and customer journey."
      />
      <div className="mt-3 sm:mt-6">
        <OrderRadioGrid
          control={form.control}
          name="goal"
          options={primaryGoals}
        />
      </div>
    </div>
  );
}

function ProjectTypeStep({ form }: OrderStepProps) {
  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="The shape"
        title="What are we making?"
        copy="Choose the closest delivery shape. Specific verticals are captured by your category and feature choices."
      />
      <div className="mt-3 sm:mt-5">
        <OrderRadioGrid
          control={form.control}
          name="projectType"
          options={projectTypes}
        />
      </div>
    </div>
  );
}

function ScaleStep({ form }: OrderStepProps) {
  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="The scale"
        title="How much needs to exist at launch?"
        copy="This estimates the content architecture, number of templates, and depth of navigation."
      />
      <div className="mt-3 sm:mt-6">
        <OrderRadioGrid
          control={form.control}
          name="scale"
          options={scaleOptions}
        />
      </div>
    </div>
  );
}

const foundationFeatures = featureOptions.filter(
  (feature) => feature.group === "foundation",
);
const advancedFeatures = featureOptions.filter(
  (feature) => feature.group === "advanced",
);

function FoundationFeaturesStep({ form }: OrderStepProps) {
  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="The essentials"
        title="What should visitors be able to do?"
        copy="Select every foundation capability needed for the first launch."
      />
      <div className="mt-3 sm:mt-5">
        <OrderFeatureGrid
          control={form.control}
          options={foundationFeatures}
        />
      </div>
    </div>
  );
}

function AdvancedFeaturesStep({ form }: OrderStepProps) {
  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="The system"
        title="Does the website need a deeper product layer?"
        copy="These capabilities usually involve persistent data, integrations, or custom application logic."
      />
      <div className="mt-3 sm:mt-5">
        <OrderFeatureGrid
          control={form.control}
          options={advancedFeatures}
        />
      </div>
    </div>
  );
}

function StyleStep({ form }: OrderStepProps) {
  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="The visual language"
        title="Which world feels closest?"
        copy="These directions are broad enough to interpret around your brand rather than impose a trend."
      />
      <div className="mt-3 sm:mt-5">
        <OrderRadioGrid
          control={form.control}
          name="websiteStyle"
          options={websiteStyles}
        />
      </div>
    </div>
  );
}

function MotionStep({ form }: OrderStepProps) {
  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="The movement"
        title="How alive should it feel?"
        copy="Motion changes production effort, performance strategy, and accessibility requirements."
      />
      <div className="mt-3 sm:mt-6">
        <OrderRadioGrid
          control={form.control}
          name="motionLevel"
          options={motionLevels}
        />
      </div>
    </div>
  );
}

function ReadinessStep({ form }: OrderStepProps) {
  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="The starting point"
        title="What materials already exist?"
        copy="Brand and content readiness determine how much direction is needed before implementation."
      />
      <div className="mt-3 grid gap-3 sm:mt-5 sm:gap-5">
        <OrderRadioGrid
          control={form.control}
          name="brandReadiness"
          legend="Brand identity"
          options={brandReadinessOptions}
          columns={3}
        />
        <OrderRadioGrid
          control={form.control}
          name="contentReadiness"
          legend="Writing and imagery"
          options={contentReadinessOptions}
          columns={3}
        />
      </div>
    </div>
  );
}

function TimingStep({ form }: OrderStepProps) {
  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="The departure"
        title="When does it need to launch?"
        copy="Urgency affects scheduling and price. Add any non-negotiable date or useful reference below."
      />
      <div className="mt-3 grid gap-3 sm:mt-5 sm:gap-5">
        <OrderRadioGrid
          control={form.control}
          name="urgency"
          options={urgencyOptions}
          columns={3}
        />
        <OrderTextareaField
          control={form.control}
          name="references"
          label="Deadline, references, or useful notes (optional)"
          placeholder="Launch date, links, visual references, or anything we should avoid."
          rows={3}
        />
      </div>
    </div>
  );
}

/**
 * Ordered intentionally: identity before solution, business need before visual
 * taste, and scope before urgency. The `fields` list controls per-step Zod
 * validation in the form orchestrator.
 */
export const orderSteps: OrderStepDefinition[] = [
  { id: "signal", label: "Brand", fields: ["brandName", "category", "brandIdea"], Component: SignalStep },
  { id: "audience", label: "Audience", fields: ["audience"], Component: AudienceStep },
  { id: "goal", label: "Outcome", fields: ["goal"], Component: GoalStep },
  { id: "shape", label: "Shape", fields: ["projectType"], Component: ProjectTypeStep },
  { id: "scale", label: "Scale", fields: ["scale"], Component: ScaleStep },
  { id: "essentials", label: "Essentials", fields: ["features"], Component: FoundationFeaturesStep },
  { id: "system", label: "Systems", fields: ["features"], Component: AdvancedFeaturesStep },
  { id: "style", label: "Style", fields: ["websiteStyle"], Component: StyleStep },
  { id: "motion", label: "Motion", fields: ["motionLevel"], Component: MotionStep },
  { id: "readiness", label: "Readiness", fields: ["brandReadiness", "contentReadiness"], Component: ReadinessStep },
  { id: "timing", label: "Timing", fields: ["urgency", "references"], Component: TimingStep },
];
