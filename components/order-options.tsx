"use client";

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  BriefcaseBusiness,
  CalendarCheck2,
  Coffee,
  CreditCard,
  FilePenLine,
  Layers3,
  PanelsTopLeft,
  Rocket,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Store,
  Target,
  UserRound,
  UsersRound,
  Waves,
  Workflow,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroupItem } from "@/components/ui/radio-group";
import type { OrderIcon, OrderOption } from "@/lib/order-brief";
import { cn } from "@/lib/utils";

const icons: Record<OrderIcon, LucideIcon> = {
  rocket: Rocket,
  panels: PanelsTopLeft,
  store: Store,
  coffee: Coffee,
  briefcase: BriefcaseBusiness,
  app: Workflow,
  users: UsersRound,
  sparkles: Sparkles,
  target: Target,
  "shopping-bag": ShoppingBag,
  calendar: CalendarCheck2,
  "file-pen": FilePenLine,
  "user-round": UserRound,
  "credit-card": CreditCard,
  sliders: SlidersHorizontal,
  layers: Layers3,
  waves: Waves,
  "book-open": BookOpen,
  clock: CalendarCheck2,
  zap: Zap,
};

function OptionIcon({ icon }: { icon: OrderIcon }) {
  const Icon = icons[icon];
  return <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-primary/25 bg-[radial-gradient(circle_at_28%_20%,color-mix(in_oklch,var(--primary-foreground),transparent_65%),transparent_34%),color-mix(in_oklch,var(--primary),transparent_83%)] text-primary shadow-[inset_0_1px_0_color-mix(in_oklch,var(--primary-foreground),transparent_75%)]"><Icon className="relative z-10 size-[18px]" strokeWidth={1.7} /></span>;
}

/** Accessible labelled radio card. The surrounding RadioGroup owns its value. */
export function OrderRadioOption<T extends string>({
  option,
  checked,
  invalid,
  compact = false,
}: {
  option: OrderOption<T>;
  checked: boolean;
  invalid?: boolean;
  compact?: boolean;
}) {
  const id = `order-option-${option.id}`;

  return (
    <FieldLabel htmlFor={id} className="w-full cursor-pointer">
      <Field orientation="horizontal" data-invalid={invalid} className={cn("min-h-[86px] rounded-2xl border border-border bg-card/45 p-3 transition hover:border-primary/50 hover:bg-card", checked && "border-primary bg-primary/10 shadow-[inset_0_0_0_1px_var(--primary)]", compact && "min-h-[72px]") }>
        <OptionIcon icon={option.icon} />
        <FieldContent className="min-w-0">
          <FieldTitle className="w-full text-card-foreground">{option.label}</FieldTitle>
          <FieldDescription className="line-clamp-2 text-xs leading-relaxed sm:text-sm">{option.detail}</FieldDescription>
        </FieldContent>
        <RadioGroupItem id={id} value={option.id} aria-invalid={invalid} className="mt-1 shrink-0 border-primary/40 bg-muted" />
      </Field>
    </FieldLabel>
  );
}

/** Multi-select counterpart used for optional capabilities. */
export function OrderToggleOption<T extends string>({
  option,
  selected,
  onToggle,
}: {
  option: OrderOption<T>;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn("h-auto min-h-[82px] items-center justify-start rounded-2xl border-border bg-card/45 p-3 text-left whitespace-normal hover:border-primary/50 hover:bg-card", selected && "border-primary bg-primary/10 text-card-foreground shadow-[inset_0_0_0_1px_var(--primary)]")}
    >
      <OptionIcon icon={option.icon} />
      <span className="min-w-0"><span className="block font-medium tracking-[-.02em]">{option.label}</span><span className="mt-1 line-clamp-2 block text-xs font-normal leading-relaxed text-muted-foreground sm:text-sm">{option.detail}</span></span>
      <span className={cn("ml-auto grid size-5 shrink-0 place-items-center rounded-full border", selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted")}>{selected && <span className="size-1.5 rounded-full bg-current" />}</span>
    </Button>
  );
}
