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
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue hover:shadow-[0_16px_32px_rgba(58,78,202,0.16)] lg:flex-row">
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden lg:h-auto lg:w-[280px]">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          sizes="(min-width: 1024px) 280px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-3 p-5">
        <div>
          <p className="text-lg font-semibold text-neutral-900">{hotel.name}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">{hotel.address}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
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

        <div className="flex flex-wrap gap-2">
          {hotel.amenities.map((amenity) => (
            <span
              key={amenity}
              className="rounded-full bg-neutral-100 px-3 py-1 text-[13px] text-neutral-600"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-start justify-between gap-4 border-t border-[#0000001A] p-5 lg:w-[220px] lg:items-end lg:border-l lg:border-t-0">
        <div className="flex flex-col items-start gap-1 lg:items-end">
          <p className="text-sm text-neutral-400 line-through">
            USD {(hotel.price + 5).toFixed(2)}
          </p>
          <p className="text-2xl font-bold text-neutral-900">USD {hotel.price.toFixed(2)}</p>
          <p className="text-[12px] text-neutral-400">Taxes &amp; Fees/PerNight</p>
          {hotel.freeCancellation !== false && (
            <span className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-green-600">
              <Check className="size-4" />
              Free cancellation
            </span>
          )}
        </div>

        <Link
          href={`/hotels/${hotel.id}${buildStayQueryString(stayParams)}`}
          className="flex h-11 items-center gap-2 rounded-[8px] bg-brand-blue px-6 text-[14px] font-semibold text-white transition-transform hover:scale-[1.02] hover:bg-brand-blue-dark"
        >
          Select Room
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
