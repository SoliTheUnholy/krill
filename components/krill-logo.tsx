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
        "group relative flex justify-center overflow-hidden font-serif text-black h-8 text-xl mr-auto w-fit bg-white font-semibold rounded-full pr-4 pl-3 items-center",
        className,
      )}
    >
      <Image src="/krill-logo.jpg" alt="Krill-Logo" width={30} height={30} />
      Krill
    </Link>
  );
}
