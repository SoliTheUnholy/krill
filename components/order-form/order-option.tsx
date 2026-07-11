"use client";

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  BriefcaseBusiness,
  CalendarCheck2,
  Coffee,
  CreditCard,
  FilePenLine,
  Images,
  Layers3,
  MessageSquareText,
  PanelsTopLeft,
  PlugZap,
  Rocket,
  Search,
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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroupItem } from "@/components/ui/radio-group";
import type { OrderIcon, OrderOption } from "@/lib/order/options";
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
  search: Search,
  image: Images,
  plug: PlugZap,
  message: MessageSquareText,
};

function OptionIcon({ icon }: { icon: OrderIcon }) {
  const Icon = icons[icon];

  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary sm:size-10 sm:rounded-xl">
      <Icon className="size-4 sm:size-[18px]" strokeWidth={1.8} />
    </span>
  );
}

/**
 * Compact by design: mobile shows icon + label while desktop reveals the
 * supporting description. This lets eight options fit inside a small viewport
 * without hiding choices behind an internal scrollbar.
 */
export function OrderRadioOption<T extends string>({
  option,
  checked,
  invalid,
}: {
  option: OrderOption<T>;
  checked: boolean;
  invalid?: boolean;
}) {
  const id = `order-option-${option.id}`;

  return (
    <FieldLabel htmlFor={id} className="w-full cursor-pointer">
      <Field
        orientation="horizontal"
        data-invalid={invalid}
        className={cn(
          "min-h-16 gap-2 rounded-xl border border-border bg-card/45 p-2.5 transition sm:min-h-[82px] sm:gap-3 sm:rounded-2xl sm:p-3",
          "hover:border-primary/50 hover:bg-card",
          checked &&
            "border-primary bg-primary/10 shadow-[inset_0_0_0_1px_var(--primary)]",
        )}
      >
        <OptionIcon icon={option.icon} />
        <FieldContent className="min-w-0">
          <FieldTitle className="w-full text-xs leading-tight text-card-foreground sm:text-sm">
            {option.label}
          </FieldTitle>
          <FieldDescription className="hidden line-clamp-2 text-xs leading-relaxed sm:block">
            {option.detail}
          </FieldDescription>
        </FieldContent>
        <RadioGroupItem
          id={id}
          value={option.id}
          aria-invalid={invalid}
          className="size-3.5 shrink-0 border-primary/40 bg-muted sm:size-4"
        />
      </Field>
    </FieldLabel>
  );
}

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
      className={cn(
        "h-auto min-h-16 justify-start gap-2 rounded-xl border-border bg-card/45 p-2.5 text-left whitespace-normal sm:min-h-[82px] sm:gap-3 sm:rounded-2xl sm:p-3",
        "hover:border-primary/50 hover:bg-card",
        selected &&
          "border-primary bg-primary/10 text-card-foreground shadow-[inset_0_0_0_1px_var(--primary)]",
      )}
    >
      <OptionIcon icon={option.icon} />
      <span className="min-w-0">
        <span className="block text-xs font-medium leading-tight tracking-[-0.02em] sm:text-sm">
          {option.label}
        </span>
        <span className="mt-1 hidden line-clamp-2 text-xs font-normal leading-relaxed text-muted-foreground sm:block">
          {option.detail}
        </span>
      </span>
      <span
        className={cn(
          "ml-auto grid size-3.5 shrink-0 place-items-center rounded-full border sm:size-4",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-muted",
        )}
      >
        {selected && <span className="size-1 rounded-full bg-current" />}
      </span>
    </Button>
  );
}
