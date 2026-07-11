"use client";

import { ArrowRight, Check, LockKeyhole, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { websiteStyles } from "@/lib/order/options";
import type { Estimate, OrderBrief } from "@/lib/order/types";

export function OrderEstimate({
  brief,
  estimate,
  onRestart,
}: {
  brief: OrderBrief;
  estimate: Estimate;
  onRestart: () => void;
}) {
  const style = websiteStyles.find((option) => option.id === brief.websiteStyle);

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <span className="grid size-11 place-items-center rounded-full border border-primary/35 bg-primary/15 text-primary sm:size-14">
        <Check className="size-5 sm:size-6" strokeWidth={2.5} />
      </span>
      <p className="mt-4 text-[9px] font-semibold uppercase tracking-[.18em] text-primary sm:mt-7 sm:text-xs">
        Your starting range
      </p>
      <h3 className="mt-1.5 font-serif text-5xl tracking-[-.075em] text-card-foreground sm:mt-3 sm:text-7xl">
        ${estimate.total.toLocaleString()}+
      </h3>
      <p className="mt-1.5 text-xs text-muted-foreground sm:mt-4 sm:text-lg">
        about {estimate.weeks} weeks to launch
      </p>

      <div className="mt-4 w-full max-w-xl rounded-xl border border-border bg-muted/45 p-3 text-left sm:mt-7 sm:rounded-2xl sm:p-5">
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
          A <b className="text-foreground">{estimate.project.toLowerCase()}</b>{" "}
          for <b className="text-foreground">{brief.brandName}</b>, shaped with a{" "}
          <b className="text-foreground">{style?.label.toLowerCase()}</b> direction
          and {brief.features.length} selected capabilities.
        </p>
      </div>

      <div className="mt-2.5 flex w-full max-w-xl items-center gap-2.5 rounded-xl border border-primary/25 bg-primary/10 p-3 text-left sm:mt-4 sm:rounded-2xl sm:p-4">
        <LockKeyhole className="size-4 shrink-0 text-primary sm:size-5" />
        <p className="text-[11px] leading-relaxed text-muted-foreground sm:text-sm">
          <b className="text-foreground">
            Expected deposit: ${estimate.deposit.toLocaleString()}
          </b>{" "}
          after scope confirmation. Contact details come from the signed-in profile.
        </p>
      </div>

      <div className="mt-4 flex w-full max-w-xl gap-2 sm:mt-7 sm:justify-center sm:gap-3">
        <Button type="button" className="flex-1 rounded-full sm:flex-none sm:px-5">
          Sign in to save <ArrowRight />
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onRestart}
          className="rounded-full text-muted-foreground hover:text-foreground"
          aria-label="Start the order brief again"
        >
          <RotateCcw /> <span className="hidden sm:inline">Start again</span>
        </Button>
      </div>
    </div>
  );
}
