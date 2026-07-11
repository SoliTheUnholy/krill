import type { Estimate } from "@/lib/order/types";

/**
 * Persistent, compact feedback for the questionnaire footer. Keeping these
 * values visible makes the cost and scheduling effect of every choice legible.
 */
export function OrderLiveEstimate({ estimate }: { estimate: Estimate }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="flex min-w-[7.5rem] items-center justify-center gap-2 text-center lg:min-w-40 lg:gap-3"
    >
      <span className="min-w-0">
        <span className="block text-[7px] font-semibold uppercase leading-none tracking-[.13em] text-muted-foreground lg:text-[9px]">
          Est. budget
        </span>
        <span className="mt-1 block text-[10px] font-semibold leading-none text-foreground lg:text-xs">
          ${estimate.total.toLocaleString()}+
        </span>
      </span>
      <span aria-hidden className="h-6 w-px shrink-0 bg-border" />
      <span className="min-w-0">
        <span className="block text-[7px] font-semibold uppercase leading-none tracking-[.13em] text-muted-foreground lg:text-[9px]">
          Delivery
        </span>
        <span className="mt-1 block text-[10px] font-semibold leading-none text-foreground lg:text-xs">
          {estimate.weeks} wk
        </span>
      </span>
    </div>
  );
}
