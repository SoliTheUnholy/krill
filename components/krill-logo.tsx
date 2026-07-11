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
        "group relative flex justify-center mr-auto w-fit items-center text-lg font-bold text-primary",
        className,
      )}
    >
      <Image src="/krill.png" alt="Krill-Logo" width={50} height={50} />
      Krill
    </Link>
  );
}
