import Image from "next/image";
import Link from "next/link";
import { MapPin, Moon, Sun } from "lucide-react";
import { StarRating } from "@/components/ui/Star";
import { cn } from "@/lib/utils";
import type { TourPackage } from "@/types";

export function TourPackageCard({
  pkg,
  className,
  style,
}: {
  pkg: TourPackage;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Link
      href={`/packages/${pkg.id}`}
      style={style}
      className={cn(
        "group block overflow-hidden rounded-2xl border border-[#0000001A] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)]",
        className
      )}
    >
      <div className="relative h-[190px] w-full overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1.5">
          <StarRating rating={pkg.rating} />
          <span className="text-[13px] font-medium text-neutral-500">
            ({String(pkg.reviews).padStart(2, "0")} Reviews)
          </span>
        </div>

        <p className="mt-2 text-[17px] font-bold text-neutral-950">{pkg.title}</p>

        <div className="mt-1.5 flex items-center gap-1.5 text-[13px] text-neutral-500">
          <MapPin className="size-3.5 shrink-0" />
          {pkg.place}
        </div>

        <div className="mt-1.5 flex items-center gap-3 text-[13px] text-neutral-500">
          <span className="flex items-center gap-1.5">
            <Sun className="size-3.5 shrink-0" />
            {pkg.days} days
          </span>
          <span className="flex items-center gap-1.5">
            <Moon className="size-3.5 shrink-0" />
            {pkg.nights} nights
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between border-t border-[#0000001A] pt-3">
          <div>
            <p className="text-[12px] text-neutral-400">From: USD{pkg.fromPrice.toLocaleString()}</p>
            <p className="text-[15px] font-bold text-brand-blue">
              USD {pkg.price.toLocaleString()}{" "}
              <span className="text-[12px] font-medium text-neutral-500">/person</span>
            </p>
          </div>
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
          >
            <Image src="/assets/icons/right_arrow.svg" alt="" width={24} height={24} className="size-6" />
          </span>
        </div>
      </div>
    </Link>
  );
}
