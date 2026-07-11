import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  className,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-primary sm:text-xs">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance font-serif text-5xl leading-[.88] tracking-[-.075em] text-foreground sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {copy && (
        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {copy}
        </p>
      )}
    </div>
  );
}
