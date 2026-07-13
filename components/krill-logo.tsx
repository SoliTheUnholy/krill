import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Layered wordmark adapted from the supplied logo component. The repeated text
 * creates chromatic depth while the invisible grid cell preserves exact width.
 */
export function KrillLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Krill home"
      className={cn(
        "group relative drop-shadow-md drop-shadow-chart-5 flex justify-center overflow-hidden font-serif text-primary h-8 text-2xl mr-auto w-fit  font-semibold  items-center",
        className,
      )}
    >
      Krill
    </Link>
  );
}
