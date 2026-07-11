"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, LockKeyhole, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { OrderRadioOption, OrderToggleOption } from "@/components/order-options";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  calculateEstimate,
  contentReadiness,
  defaultOrderBrief,
  featureOptions,
  orderBriefSchema,
  primaryGoals,
  projectTypes,
  scaleOptions,
  urgencyOptions,
  websiteStyles,
  type OrderBrief,
} from "@/lib/order-brief";

const steps = ["The signal", "The job", "The system", "The character"];
const stepFields: Array<Array<keyof OrderBrief>> = [
  ["brandName", "category", "brandIdea", "audience"],
  ["projectType", "goal"],
  ["features", "scale"],
  ["websiteStyle", "contentReadiness", "urgency", "references"],
];

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="shrink-0">
      <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-primary sm:text-xs">{eyebrow}</p>
      <h3 className="mt-2 text-balance text-2xl font-semibold leading-[.98] tracking-[-.055em] text-card-foreground sm:mt-3 sm:text-4xl">{title}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">{copy}</p>
    </div>
  );
}

function OrderAside() {
  return (
    <aside className="hidden lg:sticky lg:top-28 lg:block lg:h-fit">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-primary"><Sparkles className="size-3.5" /> Your order signal</p>
      <h2 className="mt-5 max-w-lg text-balance font-serif text-5xl leading-[.88] tracking-[-.075em] text-foreground sm:text-6xl">Tell us what needs to exist.</h2>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">Four compact chapters map the practical, strategic, and creative information that makes a Krill build specific to your brand.</p>
      <div className="mt-10 space-y-4 border-l border-border pl-5">
        {[
          ["1", "Sign in", "Your account keeps the order attached to the right person."],
          ["2", "Confirm the scope", "We refine the estimate together before any payment."],
          ["3", "Reserve the build", "A 20% start deposit opens your private project space."],
        ].map(([number, title, copy]) => (
          <div key={number} className="relative">
            <span className="absolute -left-[31px] top-1 grid size-3 place-items-center rounded-full bg-primary ring-4 ring-background"><span className="size-1 rounded-full bg-primary-foreground" /></span>
            <p className="font-medium text-foreground">{number}. {title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{copy}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

/**
 * One viewport tall on mobile by design. Longer option collections scroll in
 * the form body (`data-lenis-prevent`) rather than stretching the page.
 */
export function OrderBriefEstimator() {
  const [step, setStep] = useState(0);
  const [submittedBrief, setSubmittedBrief] = useState<OrderBrief | null>(null);
  const form = useForm<OrderBrief>({
    resolver: zodResolver(orderBriefSchema),
    defaultValues: defaultOrderBrief,
    mode: "onTouched",
  });
  const liveBrief = useWatch({ control: form.control }) as OrderBrief;
  const liveEstimate = useMemo(() => calculateEstimate({ ...defaultOrderBrief, ...liveBrief }), [liveBrief]);
  const submittedEstimate = useMemo(() => submittedBrief ? calculateEstimate(submittedBrief) : null, [submittedBrief]);

  async function next() {
    const valid = await form.trigger(stepFields[step], { shouldFocus: true });
    if (valid) setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function restart() {
    form.reset(defaultOrderBrief);
    setStep(0);
    setSubmittedBrief(null);
  }

  return (
    <section id="order" className="relative z-10 h-[100svh] overflow-hidden border-y border-border px-3 py-3 sm:px-5 sm:py-5 lg:h-auto lg:overflow-visible lg:px-12 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,color-mix(in_oklch,var(--primary),transparent_83%),transparent_47%),radial-gradient(ellipse_at_10%_85%,color-mix(in_oklch,var(--chart-2),transparent_88%),transparent_48%)]" />
      <div className="mx-auto h-full max-w-7xl lg:grid lg:h-auto lg:grid-cols-[.75fr_1.25fr] lg:gap-12">
        <OrderAside />
        <div className="h-full min-h-0 overflow-hidden rounded-[1.65rem] border border-border bg-card/80 p-4 shadow-[0_24px_80px_color-mix(in_oklch,var(--background),transparent_25%)] backdrop-blur-xl sm:rounded-[2rem] sm:p-6 lg:min-h-[680px] lg:p-8">
          <form onSubmit={form.handleSubmit(setSubmittedBrief)} className="flex h-full min-h-0 flex-col">
            <AnimatePresence mode="wait">
              {submittedBrief && submittedEstimate ? (
                <motion.div key="estimate" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.32 }} className="flex h-full min-h-0 flex-col justify-center overflow-y-auto py-2 text-center" data-lenis-prevent>
                  <span className="mx-auto grid size-12 place-items-center rounded-full border border-primary/35 bg-primary/15 text-primary sm:size-14"><Check className="size-5 sm:size-6" strokeWidth={2.5} /></span>
                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[.18em] text-primary sm:mt-7 sm:text-xs">Your starting range</p>
                  <h3 className="mt-2 font-serif text-5xl tracking-[-.075em] text-card-foreground sm:mt-3 sm:text-7xl">${submittedEstimate.total.toLocaleString()}+</h3>
                  <p className="mt-2 text-sm text-muted-foreground sm:mt-4 sm:text-lg">roughly {submittedEstimate.weeks} weeks to a considered launch</p>
                  <div className="mx-auto mt-5 max-w-xl rounded-2xl border border-border bg-muted/45 p-4 text-left sm:mt-8 sm:p-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">A <b className="text-foreground">{submittedEstimate.project.toLowerCase()}</b> for <b className="text-foreground">{submittedBrief.brandName}</b>, shaped with a <b className="text-foreground">{websiteStyles.find((style) => style.id === submittedBrief.websiteStyle)?.label.toLowerCase()}</b> direction. A Krill producer confirms the exact route before you reserve the build.</p>
                  </div>
                  <div className="mx-auto mt-3 flex w-full max-w-xl items-center gap-3 rounded-2xl border border-primary/25 bg-primary/10 p-3 text-left sm:mt-5 sm:p-4"><LockKeyhole className="size-4 shrink-0 text-primary sm:size-5" /><p className="text-xs leading-relaxed text-muted-foreground sm:text-sm"><b className="text-foreground">Expected first payment: ${submittedEstimate.deposit.toLocaleString()}</b> (20%). Your authenticated profile provides contact details; payment comes only after scope confirmation.</p></div>
                  <div className="mt-5 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3"><Button type="button" size="lg" className="rounded-full px-5">Sign in to save this order <ArrowRight /></Button><Button type="button" variant="ghost" onClick={restart} className="rounded-full text-muted-foreground hover:text-foreground"><RotateCcw /> Start again</Button></div>
                </motion.div>
              ) : (
                <motion.div key={step} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.24 }} className="flex h-full min-h-0 flex-col">
                  <div className="shrink-0">
                    <div className="flex items-center justify-between gap-4"><span className="text-[10px] font-semibold uppercase tracking-[.16em] text-primary sm:text-xs">Chapter {step + 1} / {steps.length}</span><span className="text-xs text-muted-foreground sm:text-sm">{steps[step]}</span></div>
                    <Progress value={((step + 1) / steps.length) * 100} className="mt-3 gap-0 sm:mt-4" />
                  </div>

                  <div className="mt-5 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 sm:mt-7 sm:pr-2" data-lenis-prevent>
                    {step === 0 && <SignalStep form={form} />}
                    {step === 1 && <JobStep form={form} />}
                    {step === 2 && <SystemStep form={form} />}
                    {step === 3 && <CharacterStep form={form} />}
                  </div>

                  <div className="mt-4 flex shrink-0 items-center justify-between gap-3 border-t border-border pt-4 sm:mt-6 sm:pt-6"><Button type="button" variant="ghost" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="rounded-full text-muted-foreground disabled:opacity-0"><ArrowLeft /> <span className="hidden sm:inline">Back</span></Button><div className="hidden text-xs text-muted-foreground sm:block">from ${liveEstimate.total.toLocaleString()} · {liveEstimate.weeks} weeks</div>{step === steps.length - 1 ? <Button type="submit" className="rounded-full px-4 sm:px-5">Reveal range <Sparkles /></Button> : <Button type="button" onClick={next} className="rounded-full px-4 sm:px-5">Next <ArrowRight /></Button>}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}

function SignalStep({ form }: { form: ReturnType<typeof useForm<OrderBrief>> }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <SectionIntro eyebrow="The signal" title="Start with the thing only you can make." copy="These details make the future build specific to your category, story, and people—not a generic template." />
      <FieldGroup className="gap-4 sm:grid sm:grid-cols-2 sm:gap-4">
        <Controller name="brandName" control={form.control} render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid}><FieldLabel htmlFor="order-brand-name">Brand name</FieldLabel><Input {...field} id="order-brand-name" placeholder="Aster Coffee" autoComplete="organization" aria-invalid={fieldState.invalid} />{fieldState.invalid && <FieldError errors={[fieldState.error]} />}</Field>} />
        <Controller name="category" control={form.control} render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid}><FieldLabel htmlFor="order-category">Category or industry</FieldLabel><Input {...field} id="order-category" placeholder="Specialty coffee" aria-invalid={fieldState.invalid} />{fieldState.invalid && <FieldError errors={[fieldState.error]} />}</Field>} />
      </FieldGroup>
      <Controller name="brandIdea" control={form.control} render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid}><FieldLabel htmlFor="order-brand-idea">What is the idea behind the brand?</FieldLabel><Textarea {...field} id="order-brand-idea" placeholder="What do you make, why should it exist, and what makes it different?" className="min-h-24 resize-none" aria-invalid={fieldState.invalid} /><FieldDescription>Two or three honest sentences are enough to begin.</FieldDescription>{fieldState.invalid && <FieldError errors={[fieldState.error]} />}</Field>} />
      <Controller name="audience" control={form.control} render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid}><FieldLabel htmlFor="order-audience">Who is it for? <span className="font-normal text-muted-foreground">(optional)</span></FieldLabel><Textarea {...field} id="order-audience" placeholder="The people you want to attract or serve." className="min-h-20 resize-none" aria-invalid={fieldState.invalid} />{fieldState.invalid && <FieldError errors={[fieldState.error]} />}</Field>} />
    </div>
  );
}

function JobStep({ form }: { form: ReturnType<typeof useForm<OrderBrief>> }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <SectionIntro eyebrow="The job" title="How should the site work for the business?" copy="Your business model and desired outcome determine the customer journey and conversion architecture." />
      <Controller name="projectType" control={form.control} render={({ field, fieldState }) => <FieldSet><FieldLegend>Choose the closest project shape</FieldLegend><RadioGroup name={field.name} value={field.value} onValueChange={field.onChange} className="grid gap-2 sm:grid-cols-2 sm:gap-3">{projectTypes.map((project) => <OrderRadioOption key={project.id} option={project} checked={field.value === project.id} invalid={fieldState.invalid} compact />)}</RadioGroup>{fieldState.invalid && <FieldError errors={[fieldState.error]} />}</FieldSet>} />
      <Controller name="goal" control={form.control} render={({ field, fieldState }) => <FieldSet><FieldLegend>What is the one outcome that matters most?</FieldLegend><RadioGroup name={field.name} value={field.value} onValueChange={field.onChange} className="grid gap-2 sm:grid-cols-2 sm:gap-3">{primaryGoals.map((goal) => <OrderRadioOption key={goal.id} option={goal} checked={field.value === goal.id} invalid={fieldState.invalid} compact />)}</RadioGroup>{fieldState.invalid && <FieldError errors={[fieldState.error]} />}</FieldSet>} />
    </div>
  );
}

function SystemStep({ form }: { form: ReturnType<typeof useForm<OrderBrief>> }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <SectionIntro eyebrow="The system" title="Name the parts that have to work." copy="Select what is truly required at launch. This separates an elegant site from a more involved product system." />
      <Controller name="features" control={form.control} render={({ field, fieldState }) => <FieldSet><FieldLegend>Useful capabilities <span className="font-normal text-muted-foreground">(choose any)</span></FieldLegend><div className="grid gap-2 sm:grid-cols-2 sm:gap-3">{featureOptions.map((feature) => <OrderToggleOption key={feature.id} option={feature} selected={field.value.includes(feature.id)} onToggle={() => field.onChange(field.value.includes(feature.id) ? field.value.filter((item) => item !== feature.id) : [...field.value, feature.id])} />)}</div>{fieldState.invalid && <FieldError errors={[fieldState.error]} />}</FieldSet>} />
      <Controller name="scale" control={form.control} render={({ field, fieldState }) => <FieldSet><FieldLegend>How much of the brand’s world needs to be live?</FieldLegend><RadioGroup name={field.name} value={field.value} onValueChange={field.onChange} className="grid gap-2 sm:grid-cols-2 sm:gap-3">{scaleOptions.map((scale) => <OrderRadioOption key={scale.id} option={scale} checked={field.value === scale.id} invalid={fieldState.invalid} compact />)}</RadioGroup>{fieldState.invalid && <FieldError errors={[fieldState.error]} />}</FieldSet>} />
    </div>
  );
}

function CharacterStep({ form }: { form: ReturnType<typeof useForm<OrderBrief>> }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <SectionIntro eyebrow="The character" title="Set the atmosphere, materials, and pace." copy="Creative direction, available content, and launch pressure help us create a believable, individual production route." />
      <Controller name="websiteStyle" control={form.control} render={({ field, fieldState }) => <FieldSet><FieldLegend>Which visual direction feels most like you?</FieldLegend><RadioGroup name={field.name} value={field.value} onValueChange={field.onChange} className="grid gap-2 sm:grid-cols-2 sm:gap-3">{websiteStyles.map((style) => <OrderRadioOption key={style.id} option={style} checked={field.value === style.id} invalid={fieldState.invalid} compact />)}</RadioGroup>{fieldState.invalid && <FieldError errors={[fieldState.error]} />}</FieldSet>} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Controller name="contentReadiness" control={form.control} render={({ field, fieldState }) => <FieldSet><FieldLegend>How ready is the content?</FieldLegend><RadioGroup name={field.name} value={field.value} onValueChange={field.onChange} className="grid gap-2">{contentReadiness.map((item) => <OrderRadioOption key={item.id} option={item} checked={field.value === item.id} invalid={fieldState.invalid} compact />)}</RadioGroup>{fieldState.invalid && <FieldError errors={[fieldState.error]} />}</FieldSet>} />
        <Controller name="urgency" control={form.control} render={({ field, fieldState }) => <FieldSet><FieldLegend>When does it need to be live?</FieldLegend><RadioGroup name={field.name} value={field.value} onValueChange={field.onChange} className="grid gap-2">{urgencyOptions.map((item) => <OrderRadioOption key={item.id} option={item} checked={field.value === item.id} invalid={fieldState.invalid} compact />)}</RadioGroup>{fieldState.invalid && <FieldError errors={[fieldState.error]} />}</FieldSet>} />
      </div>
      <Controller name="references" control={form.control} render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid}><FieldLabel htmlFor="order-references">Reference links or notes <span className="font-normal text-muted-foreground">(optional)</span></FieldLabel><Textarea {...field} id="order-references" placeholder="A reference, a material, a mood, or a clear no." className="min-h-20 resize-none" aria-invalid={fieldState.invalid} />{fieldState.invalid && <FieldError errors={[fieldState.error]} />}</Field>} />
    </div>
  );
}
