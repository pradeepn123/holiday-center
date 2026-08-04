import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/assets/logo/holiday_center_logo.svg"
        alt="Holidays Center"
        width={172}
        height={57}
        className={cn("h-10 w-auto", className)}
        priority
      />
    </Link>
  );
}
