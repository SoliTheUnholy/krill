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
      <p className="text-[9px] font-semibold uppercase tracking-[.18em] text-primary lg:text-xs">
        {eyebrow}
      </p>
      <h3 className="mt-1.5 text-balance text-xl font-semibold leading-[1] tracking-[-.05em] text-card-foreground lg:mt-2 lg:text-3xl">
        {title}
      </h3>
      <p className="mt-2 line-clamp-2 max-w-2xl text-[11px] leading-relaxed text-muted-foreground sm:text-xs lg:text-sm">
        {copy}
      </p>
    </header>
  );
}

function brandName(form: UseFormReturn<OrderBrief>) {
  return form.getValues("brandName").trim() || "your brand";
}

function BrandStep({ form }: OrderStepProps) {
  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="01 · Brand essence"
        title="Give us the signal only you can send."
        copy="A name, category, and clear premise are the foundation of a website that cannot belong to anyone else."
      />
      <div className="mt-3 grid gap-3 lg:mt-5 lg:gap-4">
        <div className="grid grid-cols-2 gap-2 lg:gap-4">
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
          label="What makes this brand worth choosing?"
          placeholder="What do you make, why should it exist, and what makes it particular?"
          description="Two or three honest sentences are enough."
          rows={3}
        />
      </div>
    </div>
  );
}

function AudienceAndGoalStep({ form }: OrderStepProps) {
  const brand = brandName(form);

  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="02 · People & purpose"
        title={`Who should ${brand} move?`}
        copy="The audience shapes tone and trust; the outcome determines the path we build for them."
      />
      <div className="mt-3 grid gap-3 lg:mt-5 lg:gap-5">
        <OrderTextareaField
          control={form.control}
          name="audience"
          label="Your most important visitor"
          placeholder="Who are they, what do they value, and why do they arrive?"
          rows={3}
        />
        <OrderRadioGrid
          control={form.control}
          name="goal"
          legend="The one outcome that matters most"
          options={primaryGoals}
          featureLast
        />
      </div>
    </div>
  );
}

function ShapeStep({ form }: OrderStepProps) {
  const brand = brandName(form);

  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="03 · The shape"
        title={`What form should ${brand} take?`}
        copy="Choose the closest kind of digital experience. This establishes the underlying architecture without forcing your brand into a generic industry template."
      />
      <div className="mt-3 lg:mt-5">
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
  const brand = brandName(form);

  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="04 · Launch scale"
        title={`How much of ${brand} needs to exist now?`}
        copy="Scale describes the number of meaningful pages, templates, collections, and audience journeys needed for the first release."
      />
      <div className="mt-3 lg:mt-5">
        <OrderRadioGrid
          control={form.control}
          name="scale"
          legend="Launch scale"
          options={scaleOptions}
          variant="tile"
        />
      </div>
    </div>
  );
}

function CapabilitiesStep({ form }: OrderStepProps) {
  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="05 · Capabilities"
        title="What must the experience actually do?"
        copy="Choose capability bundles rather than technical features. We will refine the exact integrations during scope confirmation."
      />
      <div className="mt-3 lg:mt-5">
        <OrderFeatureGrid
          control={form.control}
          options={featureOptions}
        />
      </div>
    </div>
  );
}

function StyleStep({ form }: OrderStepProps) {
  const brand = brandName(form);

  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="06 · Visual character"
        title={`How should ${brand} feel in the wild?`}
        copy="Choose the visual world that feels closest. It is a creative direction to interpret around your identity—not a theme we will copy."
      />
      <div className="mt-3 lg:mt-5">
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
  const brand = brandName(form);

  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="07 · Movement"
        title={`How alive should ${brand} feel?`}
        copy="Movement can be almost invisible or become part of the storytelling. Stronger motion adds creative production, performance, and accessibility work."
      />
      <div className="mt-3 lg:mt-5">
        <OrderRadioGrid
          control={form.control}
          name="motionLevel"
          legend="Movement"
          options={motionLevels}
          variant="tile"
        />
      </div>
    </div>
  );
}

function ReadinessStep({ form }: OrderStepProps) {
  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="08 · Starting point"
        title="What material can we begin with?"
        copy="Tell us how complete the identity, writing, and imagery are. Missing material is not a problem; it simply changes the production support included."
      />
      <div className="mt-3 grid gap-3 lg:mt-5 lg:gap-4">
        <OrderRadioGrid
          control={form.control}
          name="brandReadiness"
          legend="Brand identity"
          options={brandReadinessOptions}
          featureLast
        />
        <OrderRadioGrid
          control={form.control}
          name="contentReadiness"
          legend="Writing and imagery"
          options={contentReadinessOptions}
          featureLast
        />
      </div>
    </div>
  );
}

function TimingStep({ form }: OrderStepProps) {
  return (
    <div className="flex h-full flex-col">
      <StepHeading
        eyebrow="09 · The departure"
        title="How quickly do we need to release?"
        copy="A protected or compressed schedule shortens delivery and raises the cost. Add a fixed date or final reference if one matters."
      />
      <div className="mt-3 grid gap-3 lg:mt-5 lg:gap-4">
        <OrderRadioGrid
          control={form.control}
          name="urgency"
          legend="Delivery pace"
          options={urgencyOptions}
          variant="tile"
          featureLast
        />
        <OrderTextareaField
          control={form.control}
          name="references"
          label="Deadline, references, or notes (optional)"
          placeholder="A fixed date, links you admire, or anything we should avoid."
          rows={2}
        />
      </div>
    </div>
  );
}

/**
 * Nine short chapters preserve a no-scroll mobile form while keeping every
 * choice self-explanatory. Major creative decisions receive their own visual
 * chapter instead of being compressed into ambiguous segmented controls.
 */
export const orderSteps: OrderStepDefinition[] = [
  {
    id: "brand",
    label: "Brand",
    fields: ["brandName", "category", "brandIdea"],
    Component: BrandStep,
  },
  {
    id: "purpose",
    label: "Purpose",
    fields: ["audience", "goal"],
    Component: AudienceAndGoalStep,
  },
  {
    id: "shape",
    label: "Shape",
    fields: ["projectType"],
    Component: ShapeStep,
  },
  {
    id: "scale",
    label: "Scale",
    fields: ["scale"],
    Component: ScaleStep,
  },
  {
    id: "capabilities",
    label: "Capabilities",
    fields: ["features"],
    Component: CapabilitiesStep,
  },
  {
    id: "character",
    label: "Character",
    fields: ["websiteStyle"],
    Component: StyleStep,
  },
  {
    id: "movement",
    label: "Movement",
    fields: ["motionLevel"],
    Component: MotionStep,
  },
  {
    id: "readiness",
    label: "Readiness",
    fields: ["brandReadiness", "contentReadiness"],
    Component: ReadinessStep,
  },
  {
    id: "delivery",
    label: "Delivery",
    fields: ["urgency", "references"],
    Component: TimingStep,
  },
];
