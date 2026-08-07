import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { StarRating } from "@/components/ui/Star";
import { buildStayQueryString, type StayParams } from "@/lib/stayParams";
import type { HotelSearchResult } from "@/types";

export function HotelResultCard({
  hotel,
  stayParams,
}: {
  hotel: HotelSearchResult;
  stayParams: StayParams;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-300 lg:shadow-[0_4px_16px_rgba(0,0,0,0.05)] lg:hover:-translate-y-1 lg:hover:border-brand-blue lg:hover:shadow-[0_16px_32px_rgba(58,78,202,0.16)] lg:flex-row">
      <div className="relative h-[180px] w-full shrink-0 overflow-hidden sm:h-[200px] lg:h-auto lg:w-[280px]">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          sizes="(min-width: 1024px) 280px, 100vw"
          className="object-cover transition-transform duration-500 lg:group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg bg-white/95 px-2 py-1 text-[12px] font-semibold text-neutral-900 shadow-sm backdrop-blur lg:hidden">
          {hotel.rating.toFixed(1)}
          <StarRating rating={hotel.stars ?? hotel.rating} />
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2.5 p-4 lg:gap-3 lg:p-5">
        <div>
          <p className="line-clamp-1 text-[16px] font-semibold text-neutral-900 lg:text-lg">
            {hotel.name}
          </p>
          <p className="mt-1 line-clamp-1 text-[13px] leading-relaxed text-neutral-500 lg:line-clamp-none">
            {hotel.address}
          </p>
        </div>

        <div className="hidden flex-wrap items-center gap-3 lg:flex">
          <span className="flex h-7 w-9 items-center justify-center rounded-md bg-neutral-100 text-[13px] font-semibold text-neutral-900">
            {hotel.rating.toFixed(1)}
          </span>
          <StarRating rating={hotel.stars ?? hotel.rating} />
          {typeof hotel.reviews === "number" && (
            <span className="text-[13px] text-neutral-400">
              ({hotel.reviews.toLocaleString()} reviews)
            </span>
          )}
        </div>

        {typeof hotel.reviews === "number" && (
          <span className="text-[12px] text-neutral-400 lg:hidden">
            {hotel.reviews.toLocaleString()} reviews
          </span>
        )}

        <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
          {hotel.amenities.map((amenity) => (
            <span
              key={amenity}
              className="shrink-0 whitespace-nowrap rounded-full bg-neutral-100 px-3 py-1 text-[13px] text-neutral-600"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 flex-row items-center justify-between gap-3 border-t border-[#0000001A] p-4 lg:w-[220px] lg:flex-col lg:items-end lg:justify-between lg:border-l lg:border-t-0 lg:p-5">
        <div className="flex flex-col items-start gap-0.5 lg:items-end lg:gap-1">
          <p className="text-[13px] text-neutral-400 line-through lg:text-sm">
            USD {(hotel.price + 5).toFixed(2)}
          </p>
          <p className="text-xl font-bold text-neutral-900 lg:text-2xl">
            USD {hotel.price.toFixed(2)}
          </p>
          <p className="text-[11px] text-neutral-400 lg:text-[12px]">Taxes &amp; Fees/PerNight</p>
          {hotel.freeCancellation !== false && (
            <span className="mt-1 hidden items-center gap-1.5 text-[13px] font-medium text-green-600 sm:flex">
              <Check className="size-4" />
              Free cancellation
            </span>
          )}
        </div>

        <Link
          href={`/hotels/${hotel.id}${buildStayQueryString(stayParams)}`}
          className="flex h-12 shrink-0 items-center gap-2 rounded-[8px] bg-brand-blue px-5 text-[14px] font-semibold text-white transition-transform active:scale-[0.97] lg:h-11 lg:px-6 lg:hover:scale-[1.02] lg:hover:bg-brand-blue-dark lg:active:scale-100"
        >
          Select Room
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
