"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, LockKeyhole, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  calculateEstimate,
  contentReadiness,
  creativeCharacters,
  defaultOrderBrief,
  featureOptions,
  primaryGoals,
  projectTypes,
  scaleOptions,
  urgencyOptions,
  type OrderBrief,
} from "@/lib/order-brief";
import { cn } from "@/lib/utils";

const steps = ["The signal", "The job", "The system", "The character"];

function ChoiceCard({
  checked,
  label,
  detail,
  value,
}: {
  checked: boolean;
  label: string;
  detail: string;
  value: string;
}) {
  return (
    <label className={cn("group flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition", checked ? "border-primary bg-primary/10 shadow-[inset_0_0_0_1px_var(--primary)]" : "border-border bg-card/45 hover:border-primary/55 hover:bg-card") }>
      <RadioGroupItem value={value} className="mt-0.5 border-primary/40 bg-muted data-checked:bg-primary" />
      <span>
        <span className="block font-medium tracking-[-0.02em] text-card-foreground">{label}</span>
        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{detail}</span>
      </span>
    </label>
  );
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">{eyebrow}</p>
      <h3 className="mt-3 text-balance text-3xl font-semibold leading-[.98] tracking-[-.06em] text-card-foreground sm:text-4xl">{title}</h3>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{copy}</p>
    </div>
  );
}

export function OrderBriefEstimator() {
  const [brief, setBrief] = useState<OrderBrief>(defaultOrderBrief);
  const [step, setStep] = useState(0);
  const [showEstimate, setShowEstimate] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const estimate = useMemo(() => calculateEstimate(brief), [brief]);

  function update<K extends keyof OrderBrief>(key: K, value: OrderBrief[K]) {
    setBrief((current) => ({ ...current, [key]: value }));
  }

  function toggleFeature(featureId: string) {
    update("features", brief.features.includes(featureId) ? brief.features.filter((item) => item !== featureId) : [...brief.features, featureId]);
  }

  function canAdvance() {
    return step !== 0 || Boolean(brief.brandName.trim() && brief.category.trim() && brief.brandIdea.trim());
  }

  function next() {
    if (!canAdvance()) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    if (step === steps.length - 1) setShowEstimate(true);
    else setStep((current) => current + 1);
  }

  function restart() {
    setBrief(defaultOrderBrief);
    setStep(0);
    setShowEstimate(false);
    setShowValidation(false);
  }

  return (
    <section id="order" className="relative border-y border-border bg-card/35 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,color-mix(in_oklch,var(--primary),transparent_83%),transparent_47%),radial-gradient(ellipse_at_10%_85%,color-mix(in_oklch,var(--chart-2),transparent_88%),transparent_48%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-primary"><Sparkles className="size-3.5" /> Your order signal</p>
          <h2 className="mt-5 max-w-lg text-balance font-serif text-5xl leading-[.88] tracking-[-.075em] text-foreground sm:text-6xl">Tell us what needs to exist.</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">These four chapters map the practical, strategic, and creative information we need to estimate—and eventually build—a site with a real identity.</p>
          <div className="mt-10 space-y-4 border-l border-border pl-5">
            {[
              ["1", "Sign in", "Your account keeps the order attached to the right person."],
              ["2", "Confirm the scope", "We refine the estimate together before any payment."],
              ["3", "Reserve the build", "A 20% start deposit opens your private project space."],
            ].map(([number, title, copy]) => (
              <div key={number} className="relative">
                <span className="absolute -left-[31px] top-1 grid size-3 place-items-center rounded-full bg-primary ring-4 ring-card"><span className="size-1 rounded-full bg-primary-foreground" /></span>
                <p className="font-medium text-foreground">{number}. {title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-[620px] overflow-hidden rounded-[2rem] border border-border bg-card/80 p-5 shadow-[0_24px_80px_color-mix(in_oklch,var(--background),transparent_25%)] backdrop-blur-xl sm:p-8">
          <AnimatePresence mode="wait">
            {showEstimate ? (
              <motion.div key="estimate" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.32 }} className="flex min-h-[540px] flex-col justify-center py-4 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full border border-primary/35 bg-primary/15 text-primary"><Check className="size-6" strokeWidth={2.5} /></span>
                <p className="mt-7 text-xs font-semibold uppercase tracking-[.18em] text-primary">Your starting range</p>
                <h3 className="mt-3 font-serif text-6xl tracking-[-.075em] text-card-foreground sm:text-7xl">${estimate.total.toLocaleString()}+</h3>
                <p className="mt-4 text-lg text-muted-foreground">roughly {estimate.weeks} weeks to a considered launch</p>
                <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-border bg-muted/45 p-5 text-left">
                  <p className="text-sm leading-relaxed text-muted-foreground">A <b className="text-foreground">{estimate.project.toLowerCase()}</b> for <b className="text-foreground">{brief.brandName || "your brand"}</b>, with {brief.features.length ? `${brief.features.length} selected system ${brief.features.length === 1 ? "piece" : "pieces"}` : "a focused core"}. This is a useful starting range; a Krill producer will confirm the exact route before you reserve the build.</p>
                </div>
                <div className="mx-auto mt-5 flex w-full max-w-xl items-center gap-3 rounded-2xl border border-primary/25 bg-primary/10 p-4 text-left">
                  <LockKeyhole className="size-5 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-muted-foreground"><b className="text-foreground">Expected first payment: ${estimate.deposit.toLocaleString()}</b> (20%). Your logged-in profile provides the contact details; payment should only be requested after scope confirmation.</p>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button size="lg" className="rounded-full px-5">Sign in to save this order <ArrowRight /></Button>
                  <Button variant="ghost" onClick={restart} className="rounded-full text-muted-foreground hover:text-foreground"><RotateCcw /> Start again</Button>
                </div>
              </motion.div>
            ) : (
              <motion.div key={step} initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -22 }} transition={{ duration: 0.25 }}>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[.16em] text-primary">Chapter {step + 1} / {steps.length}</span>
                  <span className="text-sm text-muted-foreground">{steps[step]}</span>
                </div>
                <Progress value={((step + 1) / steps.length) * 100} className="mt-4 gap-0" />

                {step === 0 && (
                  <div className="mt-9 space-y-6">
                    <SectionIntro eyebrow="The signal" title="Start with the thing only you can make." copy="This gives our future build team the context to create a distinct direction—not an interchangeable template." />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-2 text-sm font-medium text-card-foreground">Brand name<Input value={brief.brandName} onChange={(event) => update("brandName", event.target.value)} placeholder="e.g. Aster Coffee" /></label>
                      <label className="space-y-2 text-sm font-medium text-card-foreground">Category or industry<Input value={brief.category} onChange={(event) => update("category", event.target.value)} placeholder="e.g. Specialty coffee" /></label>
                    </div>
                    <label className="block space-y-2 text-sm font-medium text-card-foreground">What is the idea behind the brand?<Textarea value={brief.brandIdea} onChange={(event) => update("brandIdea", event.target.value)} placeholder="Tell us what you make, why it should exist, and what makes it different." className="min-h-28 resize-none" /></label>
                    <label className="block space-y-2 text-sm font-medium text-card-foreground">Who is it for? <span className="font-normal text-muted-foreground">(optional, but powerful)</span><Textarea value={brief.audience} onChange={(event) => update("audience", event.target.value)} placeholder="The people you want to attract or serve." className="min-h-20 resize-none" /></label>
                    {showValidation && <p className="text-sm text-destructive">Add your brand name, category, and brand idea before continuing.</p>}
                  </div>
                )}

                {step === 1 && (
                  <div className="mt-9 space-y-8">
                    <SectionIntro eyebrow="The job" title="How should the website work for the business?" copy="The business model and primary outcome determine the page structure, conversion flow, and voice of the final experience." />
                    <div>
                      <p className="mb-3 text-sm font-medium text-card-foreground">Choose the closest project shape</p>
                      <RadioGroup value={brief.projectType} onValueChange={(value) => update("projectType", value as OrderBrief["projectType"])} className="grid gap-3 sm:grid-cols-2">
                        {projectTypes.map((project) => <ChoiceCard key={project.id} value={project.id} checked={brief.projectType === project.id} label={project.label} detail={project.detail} />)}
                      </RadioGroup>
                    </div>
                    <div>
                      <p className="mb-3 text-sm font-medium text-card-foreground">What is the one action or outcome that matters most?</p>
                      <RadioGroup value={brief.goal} onValueChange={(value) => update("goal", value)} className="grid gap-2">
                        {primaryGoals.map((goal) => <ChoiceCard key={goal} value={goal} checked={brief.goal === goal} label={goal} detail="This anchors the homepage hierarchy and conversion path." />)}
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-9 space-y-8">
                    <SectionIntro eyebrow="The system" title="Name the parts that have to work." copy="Select only what is truly required for launch. We use this to separate an elegant website from a more complex product system." />
                    <div className="grid gap-3 sm:grid-cols-2">
                      {featureOptions.map((feature) => {
                        const selected = brief.features.includes(feature.id);
                        return (
                          <Button key={feature.id} variant="outline" onClick={() => toggleFeature(feature.id)} aria-pressed={selected} className={cn("h-auto min-h-24 items-start justify-between rounded-2xl p-4 text-left whitespace-normal", selected && "border-primary bg-primary/10 text-card-foreground") }>
                            <span><span className="block font-medium">{feature.label}</span><span className="mt-1 block text-sm font-normal leading-relaxed text-muted-foreground">{feature.detail}</span></span>
                            <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border", selected ? "border-primary bg-primary text-primary-foreground" : "border-border")}>{selected && <Check className="size-3.5" strokeWidth={3} />}</span>
                          </Button>
                        );
                      })}
                    </div>
                    <div>
                      <p className="mb-3 text-sm font-medium text-card-foreground">How much of the brand’s world needs to be present at launch?</p>
                      <RadioGroup value={brief.scale} onValueChange={(value) => update("scale", value as OrderBrief["scale"])} className="grid gap-3 sm:grid-cols-2">
                        {scaleOptions.map((scale) => <ChoiceCard key={scale.id} value={scale.id} checked={brief.scale === scale.id} label={scale.label} detail={scale.detail} />)}
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="mt-9 space-y-8">
                    <SectionIntro eyebrow="The character" title="Set the atmosphere, materials, and pace." copy="Creative direction, available content, and launch pressure help us assemble a realistic and differentiated production path." />
                    <div>
                      <p className="mb-3 text-sm font-medium text-card-foreground">Which creative character is closest?</p>
                      <RadioGroup value={brief.creativeCharacter} onValueChange={(value) => update("creativeCharacter", value as OrderBrief["creativeCharacter"])} className="grid gap-3 sm:grid-cols-2">
                        {creativeCharacters.map((character) => <ChoiceCard key={character.id} value={character.id} checked={brief.creativeCharacter === character.id} label={character.label} detail={character.detail} />)}
                      </RadioGroup>
                    </div>
                    <div className="grid gap-7 lg:grid-cols-2">
                      <div><p className="mb-3 text-sm font-medium text-card-foreground">How ready is the content?</p><RadioGroup value={brief.contentReadiness} onValueChange={(value) => update("contentReadiness", value as OrderBrief["contentReadiness"])}>{contentReadiness.map((item) => <ChoiceCard key={item.id} value={item.id} checked={brief.contentReadiness === item.id} label={item.label} detail={item.detail} />)}</RadioGroup></div>
                      <div><p className="mb-3 text-sm font-medium text-card-foreground">When does it need to be live?</p><RadioGroup value={brief.urgency} onValueChange={(value) => update("urgency", value as OrderBrief["urgency"])}>{urgencyOptions.map((item) => <ChoiceCard key={item.id} value={item.id} checked={brief.urgency === item.id} label={item.label} detail={item.detail} />)}</RadioGroup></div>
                    </div>
                    <label className="block space-y-2 text-sm font-medium text-card-foreground">Reference links or notes <span className="font-normal text-muted-foreground">(optional)</span><Textarea value={brief.references} onChange={(event) => update("references", event.target.value)} placeholder="What should this feel adjacent to? A link, a material, a mood, or a clear no." className="min-h-20 resize-none" /></label>
                  </div>
                )}

                <div className="mt-9 flex items-center justify-between gap-3 border-t border-border pt-6">
                  <Button variant="ghost" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="rounded-full text-muted-foreground disabled:opacity-0"><ArrowLeft /> Back</Button>
                  <Button onClick={next} className="rounded-full px-5">{step === steps.length - 1 ? "Reveal starting range" : "Next chapter"}<ArrowRight /></Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
