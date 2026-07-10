import { cn } from "@/lib/utils";

export function KrillLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)} aria-label="Krill home">
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-full bg-primary shadow-[inset_0_1px_1px_color-mix(in_oklch,var(--primary-foreground),transparent_35%),0_0_24px_color-mix(in_oklch,var(--primary),transparent_45%)]">
        <span className="absolute size-5 rounded-[46%_54%_55%_45%] border-2 border-primary-foreground/85" />
        <span className="absolute left-1.5 top-2.5 size-1.5 rounded-full bg-primary-foreground" />
        <span className="absolute right-1.5 top-2.5 size-1.5 rounded-full bg-primary-foreground" />
      </span>
      <span className="font-semibold tracking-[-0.07em]">krill</span>
    </div>
  );
}
