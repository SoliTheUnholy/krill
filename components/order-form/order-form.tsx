"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { OrderEstimate } from "@/components/order-form/order-estimate";
import { orderSteps } from "@/components/order-form/order-steps";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { calculateEstimate } from "@/lib/order/pricing";
import {
  defaultOrderBrief,
  orderBriefSchema,
  type OrderBrief,
} from "@/lib/order/types";

function OrderAside() {
  return (
    <aside className="hidden lg:sticky lg:top-28 lg:block lg:h-fit">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-primary">
        <Sparkles className="size-3.5" /> Your order signal
      </p>
      <h2 className="mt-5 max-w-lg text-balance font-serif text-6xl leading-[.88] tracking-[-.075em] text-foreground">
        Tell us what needs to exist.
      </h2>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
        Eleven short chapters capture the brand, business, functional, and
        creative information needed for a useful estimate and a specific build.
      </p>
      <div className="mt-10 space-y-4 border-l border-border pl-5">
        {[
          ["1", "Describe", "Create a structured, reusable project brief."],
          ["2", "Confirm", "A producer checks the route before payment."],
          ["3", "Reserve", "A 20% deposit opens the project workspace."],
        ].map(([number, title, copy]) => (
          <div key={number} className="relative">
            <span className="absolute -left-[31px] top-1 grid size-3 place-items-center rounded-full bg-primary ring-4 ring-background">
              <span className="size-1 rounded-full bg-primary-foreground" />
            </span>
            <p className="font-medium text-foreground">
              {number}. {title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {copy}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}

/**
 * Mobile layout contract
 * ----------------------
 * The section and form card are exactly one small viewport high. Every chapter
 * has been sized to fit the remaining body area, so neither the form nor the
 * page creates a nested scroll region. When adding a question, add a chapter or
 * shorten an existing one; never restore `overflow-y-auto` here.
 */
export function OrderBriefEstimator() {
  const [step, setStep] = useState(0);
  const [submittedBrief, setSubmittedBrief] = useState<OrderBrief | null>(null);
  const form = useForm<OrderBrief>({
    resolver: zodResolver(orderBriefSchema),
    defaultValues: defaultOrderBrief,
    mode: "onTouched",
  });
  const watchedBrief = useWatch({ control: form.control }) as OrderBrief;
  const liveEstimate = useMemo(
    () => calculateEstimate({ ...defaultOrderBrief, ...watchedBrief }),
    [watchedBrief],
  );
  const submittedEstimate = useMemo(
    () => (submittedBrief ? calculateEstimate(submittedBrief) : null),
    [submittedBrief],
  );
  const definition = orderSteps[step];
  const StepComponent = definition.Component;
  const lastStep = step === orderSteps.length - 1;

  async function next() {
    const valid = await form.trigger(definition.fields, { shouldFocus: true });
    if (valid) setStep((current) => Math.min(current + 1, orderSteps.length - 1));
  }

  function restart() {
    form.reset(defaultOrderBrief);
    setStep(0);
    setSubmittedBrief(null);
  }

  return (
    <section
      id="order"
      className="relative z-10 h-[100svh] overflow-hidden border-y border-border px-2 py-2 sm:px-5 sm:py-5 lg:h-auto lg:overflow-visible lg:px-12 lg:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,color-mix(in_oklch,var(--primary),transparent_83%),transparent_47%),radial-gradient(ellipse_at_10%_85%,color-mix(in_oklch,var(--chart-2),transparent_88%),transparent_48%)]" />
      <div className="mx-auto h-full max-w-7xl lg:grid lg:h-auto lg:grid-cols-[.75fr_1.25fr] lg:gap-12">
        <OrderAside />
        <div className="h-full overflow-hidden rounded-[1.35rem] border border-border bg-card/80 p-3 shadow-[0_24px_80px_color-mix(in_oklch,var(--background),transparent_25%)] backdrop-blur-xl sm:rounded-[2rem] sm:p-6 lg:min-h-[680px] lg:p-8">
          <form
            onSubmit={form.handleSubmit(setSubmittedBrief)}
            className="flex h-full min-h-0 flex-col"
          >
            <AnimatePresence mode="wait">
              {submittedBrief && submittedEstimate ? (
                <motion.div
                  key="estimate"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28 }}
                  className="h-full"
                >
                  <OrderEstimate
                    brief={submittedBrief}
                    estimate={submittedEstimate}
                    onRestart={restart}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={definition.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                  className="flex h-full min-h-0 flex-col"
                >
                  <header className="shrink-0">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[9px] font-semibold uppercase tracking-[.16em] text-primary sm:text-xs">
                        Chapter {step + 1} / {orderSteps.length}
                      </span>
                      <span className="text-[11px] text-muted-foreground sm:text-sm">
                        {definition.label}
                      </span>
                    </div>
                    <Progress
                      value={((step + 1) / orderSteps.length) * 100}
                      className="mt-2 gap-0 sm:mt-4"
                    />
                  </header>

                  <div className="mt-3 min-h-0 flex-1 overflow-hidden sm:mt-6">
                    <StepComponent form={form} />
                  </div>

                  <footer className="mt-2 flex h-12 shrink-0 items-end justify-between gap-2 border-t border-border pt-2 sm:mt-5 sm:h-14 sm:pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep((current) => Math.max(0, current - 1))}
                      disabled={step === 0}
                      className="h-9 rounded-full px-2 text-muted-foreground disabled:opacity-0 sm:px-3"
                    >
                      <ArrowLeft /> <span className="hidden sm:inline">Back</span>
                    </Button>
                    <div className="text-center text-[10px] text-muted-foreground sm:text-xs">
                      ${liveEstimate.total.toLocaleString()} · {liveEstimate.weeks} wk
                    </div>
                    {lastStep ? (
                      <Button type="submit" className="h-9 rounded-full px-3 sm:px-5">
                        Estimate <Sparkles />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={next}
                        className="h-9 rounded-full px-3 sm:px-5"
                      >
                        Next <ArrowRight />
                      </Button>
                    )}
                  </footer>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
