"use client";

import type { Control, FieldPath } from "react-hook-form";
import { Controller } from "react-hook-form";

import {
  OrderRadioOption,
  OrderToggleOption,
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
          <FieldLabel htmlFor={`order-${name}`} className="text-xs sm:text-sm">
            {label}
          </FieldLabel>
          <Input
            {...field}
            id={`order-${name}`}
            placeholder={placeholder}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
            className="h-10"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
          <FieldLabel htmlFor={`order-${name}`} className="text-xs sm:text-sm">
            {label}
          </FieldLabel>
          <Textarea
            {...field}
            id={`order-${name}`}
            placeholder={placeholder}
            rows={rows}
            className="min-h-0 resize-none text-sm"
            aria-invalid={fieldState.invalid}
          />
          {description && (
            <FieldDescription className="hidden sm:block">
              {description}
            </FieldDescription>
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
  columns = 2,
}: {
  control: Control<OrderBrief>;
  name: RadioFieldName;
  legend?: string;
  options: Array<OrderOption<T>>;
  columns?: 2 | 3;
}) {
  return (
    <Controller
      name={name as FieldPath<OrderBrief>}
      control={control}
      render={({ field, fieldState }) => (
        <FieldSet className="gap-2 sm:gap-3">
          {legend && (
            <FieldLegend className="mb-1 text-xs sm:text-sm">
              {legend}
            </FieldLegend>
          )}
          <RadioGroup
            name={field.name}
            value={String(field.value)}
            onValueChange={field.onChange}
            className={cn(
              "grid gap-2",
              columns === 3 ? "grid-cols-3" : "grid-cols-2",
            )}
          >
            {options.map((option) => (
              <OrderRadioOption
                key={option.id}
                option={option}
                checked={field.value === option.id}
                invalid={fieldState.invalid}
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
        <FieldSet className="gap-2 sm:gap-3">
          {legend && (
            <FieldLegend className="mb-1 text-xs sm:text-sm">
              {legend}
            </FieldLegend>
          )}
          <div className="grid grid-cols-2 gap-2">
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
