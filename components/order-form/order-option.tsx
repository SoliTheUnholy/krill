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

export type OrderOptionVariant = "row" | "tile";

function OptionIcon({
  icon,
  active,
  large = false,
}: {
  icon: OrderIcon;
  active?: boolean;
  large?: boolean;
}) {
  const Icon = icons[icon];

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center border border-border bg-muted/55 text-muted-foreground transition-colors",
        large ? "size-10 rounded-xl" : "size-8 rounded-lg",
        active && "border-primary/25 bg-primary/10 text-primary",
      )}
    >
      <Icon className={large ? "size-5" : "size-4"} strokeWidth={1.55} />
    </span>
  );
}

/**
 * Radio choices have two deliberate visual weights. `tile` puts a larger,
 * quieter icon above the copy for major creative decisions; `row` keeps dense
 * business choices compact. Both always expose the explanatory text.
 */
export function OrderRadioOption<T extends string>({
  option,
  groupName,
  checked,
  invalid,
  onSelect,
  variant = "row",
}: {
  option: OrderOption<T>;
  groupName: string;
  checked: boolean;
  invalid?: boolean;
  onSelect: () => void;
  variant?: OrderOptionVariant;
}) {
  const id = `order-${groupName}-${option.id}`;
  const titleId = `${id}-title`;
  const detailId = `${id}-detail`;

  return (
    <div className="block h-full w-full cursor-pointer" onClick={onSelect}>
      <Field
        orientation="horizontal"
        data-invalid={invalid}
        data-selected={checked}
        className={cn(
          "relative h-full overflow-hidden rounded-2xl border border-border bg-card/45 p-3 transition hover:border-primary/45 hover:bg-card",
          variant === "tile"
            ? "min-h-[7.25rem] flex-col items-stretch gap-2.5"
            : "min-h-[5.5rem] items-start gap-2.5",
          checked &&
            "border-primary/70 bg-primary/10 shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--primary),transparent_30%),0_14px_34px_color-mix(in_oklch,var(--primary),transparent_88%)]",
        )}
      >
        {variant === "tile" ? (
          <>
            <div className="flex w-full items-start justify-between gap-3">
              <OptionIcon icon={option.icon} active={checked} large />
              <RadioGroupItem
                id={id}
                value={option.id}
                aria-invalid={invalid}
                aria-labelledby={titleId}
                aria-describedby={detailId}
                className="size-4 shrink-0 border-border bg-muted/70"
              />
            </div>
            <FieldContent className="min-w-0 gap-1 overflow-hidden">
              <FieldTitle
                id={titleId}
                className="line-clamp-1 w-full text-sm leading-tight text-card-foreground"
              >
                {option.label}
              </FieldTitle>
              <FieldDescription
                id={detailId}
                className="line-clamp-2 text-[10px] leading-snug sm:text-[11px]"
              >
                {option.detail}
              </FieldDescription>
            </FieldContent>
          </>
        ) : (
          <>
            <OptionIcon icon={option.icon} active={checked} />
            <FieldContent className="min-w-0 gap-1 overflow-hidden">
              <FieldTitle
                id={titleId}
                className="line-clamp-1 w-full text-xs leading-tight text-card-foreground sm:text-sm"
              >
                {option.label}
              </FieldTitle>
              <FieldDescription
                id={detailId}
                className="line-clamp-2 text-[10px] leading-snug sm:text-[11px]"
              >
                {option.detail}
              </FieldDescription>
            </FieldContent>
            <RadioGroupItem
              id={id}
              value={option.id}
              aria-invalid={invalid}
              aria-labelledby={titleId}
              aria-describedby={detailId}
              className="size-4 shrink-0 border-border bg-muted/70"
            />
          </>
        )}
      </Field>
    </div>
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
        "h-[5.5rem] justify-start gap-2.5 overflow-hidden rounded-2xl border-border bg-card/45 p-3 text-left whitespace-normal",
        "hover:border-primary/50 hover:bg-card",
        selected &&
          "border-primary bg-primary/10 text-card-foreground shadow-[inset_0_0_0_1px_var(--primary)]",
      )}
    >
      <OptionIcon icon={option.icon} active={selected} />
      <span className="min-w-0 overflow-hidden">
        <span className="line-clamp-1 text-xs font-medium leading-tight tracking-[-0.02em] sm:text-sm">
          {option.label}
        </span>
        <span className="mt-1 line-clamp-2 text-[10px] font-normal leading-snug text-muted-foreground sm:text-[11px]">
          {option.detail}
        </span>
      </span>
      <span
        className={cn(
          "ml-auto grid size-3.5 shrink-0 place-items-center rounded-full border lg:size-4",
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
