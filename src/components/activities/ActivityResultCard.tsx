import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock, MapPin } from "lucide-react";
import { StarRating } from "@/components/ui/Star";
import type { ActivityResult } from "@/types";

export function ActivityResultCard({
  activity,
  ctaLabel = "View Details",
}: {
  activity: ActivityResult;
  ctaLabel?: string;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-300 sm:shadow-[0_4px_16px_rgba(0,0,0,0.05)] sm:hover:-translate-y-1 sm:hover:border-brand-blue sm:hover:shadow-[0_16px_32px_rgba(58,78,202,0.16)] sm:flex-row">
      <div className="relative h-[160px] w-full shrink-0 overflow-hidden sm:h-auto sm:w-[280px]">
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          sizes="(min-width: 640px) 280px, 100vw"
          className="object-cover transition-transform duration-500 sm:group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col justify-start gap-2 p-4 sm:p-5">
        <p className="line-clamp-2 text-[16px] font-bold leading-snug text-neutral-900">
          {activity.title}
        </p>

        <div className="flex items-center gap-1.5 text-[13px] text-neutral-500">
          <MapPin className="size-3.5 shrink-0" />
          {activity.location}
        </div>
        <div className="flex items-center gap-1.5 text-[13px] text-neutral-500">
          <Clock className="size-3.5 shrink-0" />
          {activity.durationLabel}
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-6 items-center justify-center rounded-md bg-[#E8F5E9] px-1.5 text-[12px] font-bold text-[#2E7D32]">
            {activity.rating.toFixed(1)}
          </span>
          <StarRating rating={activity.rating} />
        </div>
      </div>

      <div className="flex shrink-0 flex-row items-center justify-between gap-3 border-t border-[#0000001A] p-4 sm:w-[200px] sm:flex-col sm:items-end sm:justify-between sm:border-l sm:border-t-0 sm:p-5">
        <div className="flex flex-col items-start gap-0.5 sm:items-end sm:gap-1">
          <p className="text-[13px] text-neutral-400 line-through sm:text-sm">
            USD {activity.originalPrice.toFixed(2)}
          </p>
          <p className="text-xl font-bold text-neutral-900 sm:text-2xl">
            USD {activity.price.toFixed(2)}
          </p>
          <p className="text-[11px] text-neutral-400 sm:text-[12px]">Taxes &amp; Fees/PerNight</p>
          {activity.freeCancellation && (
            <span className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-green-600">
              <Check className="size-4" />
              Free cancellation
            </span>
          )}
        </div>

        <Link
          href={`/activities/${activity.id}`}
          className="flex h-12 shrink-0 items-center gap-2 rounded-[8px] bg-brand-blue px-5 text-[14px] font-semibold text-white transition-transform active:scale-[0.97] sm:h-11 sm:px-6 sm:hover:scale-[1.02] sm:hover:bg-brand-blue-dark sm:active:scale-100"
        >
          {ctaLabel}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
