"use client";

import type { Control, FieldPath } from "react-hook-form";
import { Controller } from "react-hook-form";

import {
  OrderRadioOption,
  OrderToggleOption,
  type OrderOptionVariant,
} from "@/components/order-form/order-option";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { Feature, OrderBrief } from "@/lib/order/types";
import type { OrderOption } from "@/lib/order/options";
import { cn } from "@/lib/utils";

type TextFieldName = "brandName" | "category";
type TextareaFieldName = "brandIdea" | "audience" | "references";
type RadioFieldName =
  | "projectType"
  | "goal"
  | "scale"
  | "websiteStyle"
  | "motionLevel"
  | "brandReadiness"
  | "contentReadiness"
  | "urgency";

export function OrderTextField({
  control,
  name,
  label,
  placeholder,
  autoComplete,
}: {
  control: Control<OrderBrief>;
  name: TextFieldName;
  label: string;
  placeholder: string;
  autoComplete?: string;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={`order-${name}`} className="text-xs lg:text-sm">
            {label}
          </FieldLabel>
          <Input
            {...field}
            id={`order-${name}`}
            placeholder={placeholder}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
            className="h-10 text-base"
          />
          {fieldState.invalid && (
            <FieldError
              errors={[fieldState.error]}
              className="text-[10px] leading-tight lg:text-xs"
            />
          )}
        </Field>
      )}
    />
  );
}

export function OrderTextareaField({
  control,
  name,
  label,
  placeholder,
  description,
  rows = 3,
}: {
  control: Control<OrderBrief>;
  name: TextareaFieldName;
  label: string;
  placeholder: string;
  description?: string;
  rows?: number;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={`order-${name}`} className="text-xs lg:text-sm">
            {label}
          </FieldLabel>
          <Textarea
            {...field}
            id={`order-${name}`}
            placeholder={placeholder}
            rows={rows}
            data-lenis-prevent
            className={cn(
              "min-h-20 resize-none overflow-y-auto text-base [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              rows <= 2 ? "max-h-20" : "max-h-28",
            )}
            aria-invalid={fieldState.invalid}
          />
          {description && (
            <FieldDescription className="text-[10px] leading-snug sm:text-xs">
              {description}
            </FieldDescription>
          )}
          {fieldState.invalid && (
            <FieldError
              errors={[fieldState.error]}
              className="text-[10px] leading-tight lg:text-xs"
            />
          )}
        </Field>
      )}
    />
  );
}

export function OrderRadioGrid<T extends string>({
  control,
  name,
  legend,
  options,
  variant = "row",
  featureLast = false,
}: {
  control: Control<OrderBrief>;
  name: RadioFieldName;
  legend?: string;
  options: Array<OrderOption<T>>;
  variant?: OrderOptionVariant;
  featureLast?: boolean;
}) {
  return (
    <Controller
      name={name as FieldPath<OrderBrief>}
      control={control}
      render={({ field, fieldState }) => (
        <FieldSet className="gap-2 lg:gap-3">
          {legend && (
            <FieldLegend className="mb-1 text-xs lg:text-sm">
              {legend}
            </FieldLegend>
          )}
          <RadioGroup
            name={field.name}
            value={String(field.value)}
            onValueChange={field.onChange}
            className={cn(
              "grid auto-rows-fr items-stretch gap-2",
              variant === "tile"
                ? "grid-cols-2"
                : "grid-cols-1 gap-1.5 min-[480px]:grid-cols-2 min-[480px]:gap-2",
            )}
          >
            {options.map((option, index) => (
              <OrderRadioOption
                key={option.id}
                option={option}
                groupName={field.name}
                checked={field.value === option.id}
                invalid={fieldState.invalid}
                onSelect={() => field.onChange(option.id)}
                variant={variant}
                className={cn(
                  featureLast &&
                    index === options.length - 1 &&
                    options.length % 2 === 1 &&
                    (variant === "tile"
                      ? "col-span-2"
                      : "min-[480px]:col-span-2"),
                )}
              />
            ))}
          </RadioGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </FieldSet>
      )}
    />
  );
}

export function OrderFeatureGrid({
  control,
  legend,
  options,
}: {
  control: Control<OrderBrief>;
  legend?: string;
  options: Array<OrderOption<Feature>>;
}) {
  return (
    <Controller
      name="features"
      control={control}
      render={({ field, fieldState }) => (
        <FieldSet className="gap-2 lg:gap-3">
          {legend && (
            <FieldLegend className="mb-1 text-xs lg:text-sm">
              {legend}
            </FieldLegend>
          )}
          <div className="grid auto-rows-fr grid-cols-1 items-stretch gap-1.5 min-[480px]:grid-cols-2 min-[480px]:gap-2">
            {options.map((option) => {
              const selected = field.value.includes(option.id);
              return (
                <OrderToggleOption
                  key={option.id}
                  option={option}
                  selected={selected}
                  onToggle={() =>
                    field.onChange(
                      selected
                        ? field.value.filter((item) => item !== option.id)
                        : [...field.value, option.id],
                    )
                  }
                />
              );
            })}
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </FieldSet>
      )}
    />
  );
}
