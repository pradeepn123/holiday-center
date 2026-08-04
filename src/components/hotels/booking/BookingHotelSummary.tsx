import Image from "next/image";
import { StarRating } from "@/components/ui/Star";
import { describeStay, type StayParams } from "@/lib/stayParams";
import type { HotelSearchResult } from "@/types";

export function BookingHotelSummary({
  hotel,
  stayParams,
}: {
  hotel: HotelSearchResult;
  stayParams: StayParams;
}) {
  const stay = describeStay(stayParams);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white sm:flex-row">
      <div className="relative h-[150px] w-full shrink-0 sm:h-auto sm:w-[280px]">
        <Image src={hotel.image} alt={hotel.name} fill sizes="280px" className="object-cover" />
      </div>

      <div className="flex-1 p-4">
        <p className="text-lg font-semibold text-neutral-900">{hotel.name}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">{hotel.address}</p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="flex h-7 w-9 items-center justify-center rounded-md bg-green-50 text-[13px] font-semibold text-green-700">
            {hotel.rating.toFixed(1)}
          </span>
          <StarRating rating={hotel.rating} />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
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

      <div className="flex w-full shrink-0 flex-col justify-center gap-4 border-t border-neutral-100 p-4 sm:w-[240px] sm:border-l sm:border-t-0">
        <div>
          <p className="text-[13px] text-neutral-400">Check In</p>
          <p className="mt-0.5 text-[15px] font-semibold text-neutral-900">{stay.checkIn}</p>
        </div>
        <div>
          <p className="text-[13px] text-neutral-400">Check out</p>
          <p className="mt-0.5 text-[15px] font-semibold text-neutral-900">{stay.checkOut}</p>
        </div>
        <div>
          <p className="text-[13px] text-neutral-400">Rooms &amp; Guests</p>
          <p className="mt-0.5 text-[15px] font-semibold text-neutral-900">{stay.guestsLabel}</p>
        </div>
      </div>
    </div>
  );
}
