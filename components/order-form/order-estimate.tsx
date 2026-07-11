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
      <span className="grid size-11 place-items-center rounded-full border border-primary/35 bg-primary/15 text-primary lg:size-14">
        <Check className="size-5 lg:size-6" strokeWidth={2.5} />
      </span>
      <p className="mt-4 text-[9px] font-semibold uppercase tracking-[.18em] text-primary lg:mt-7 lg:text-xs">
        Your ballpark is ready
      </p>
      <div className="mt-2.5 grid w-full max-w-md grid-cols-[1.15fr_.85fr] items-center divide-x divide-border lg:mt-4">
        <div className="px-2 lg:px-5">
          <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-muted-foreground lg:text-[10px]">
            Estimated investment
          </p>
          <h3 className="mt-1 font-serif text-4xl tracking-[-.075em] text-card-foreground lg:text-6xl">
            ${estimate.total.toLocaleString()}+
          </h3>
        </div>
        <div className="px-2 lg:px-5">
          <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-muted-foreground lg:text-[10px]">
            Estimated delivery
          </p>
          <p className="mt-1 font-serif text-2xl tracking-[-.055em] text-card-foreground lg:text-4xl">
            {estimate.weeks} weeks
          </p>
        </div>
      </div>

      <div className="mt-4 w-full max-w-xl rounded-xl border border-border bg-muted/45 p-3 text-left lg:mt-7 lg:rounded-2xl lg:p-5">
        <p className="text-xs leading-relaxed text-muted-foreground lg:text-sm">
          A <b className="text-foreground">{estimate.project.toLowerCase()}</b>{" "}
          for <b className="text-foreground">{brief.brandName}</b>, shaped with a{" "}
          <b className="text-foreground">{style?.label.toLowerCase()}</b> direction
          and {brief.features.length} selected capabilities.
        </p>
      </div>

      <div className="mt-2.5 flex w-full max-w-xl items-center gap-2.5 rounded-xl border border-primary/25 bg-primary/10 p-3 text-left lg:mt-4 lg:rounded-2xl lg:p-4">
        <LockKeyhole className="size-4 shrink-0 text-primary lg:size-5" />
        <p className="text-[11px] leading-relaxed text-muted-foreground lg:text-sm">
          <b className="text-foreground">
            Expected deposit: ${estimate.deposit.toLocaleString()}
          </b>{" "}
          after scope confirmation. Contact details come from the signed-in profile.
        </p>
      </div>

      <div className="mt-4 flex w-full max-w-xl gap-2 sm:justify-center sm:gap-3 lg:mt-7">
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
