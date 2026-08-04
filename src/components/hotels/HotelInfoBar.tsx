import { StarRating } from "@/components/ui/Star";
import { describeStay, type StayParams } from "@/lib/stayParams";
import type { HotelSearchResult } from "@/types";
import { HotelMapPreview } from "./HotelMapPreview";

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center px-5 py-5">
      <div>
        <p className="text-[13px] text-neutral-400">{label}</p>
        <p className="mt-0.5 text-[15px] font-semibold text-neutral-900">{value}</p>
      </div>
    </div>
  );
}

export function HotelInfoBar({
  hotel,
  stayParams,
}: {
  hotel: HotelSearchResult;
  stayParams: StayParams;
}) {
  const stay = describeStay(stayParams);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white lg:flex-row lg:items-center">
      <div className="min-w-0 p-5 lg:w-[340px] lg:shrink-0 lg:border-r lg:border-neutral-100">
        <p className="text-lg font-semibold text-neutral-900">{hotel.name}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">{hotel.address}</p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="flex h-7 w-9 items-center justify-center rounded-md bg-green-50 text-[13px] font-semibold text-green-700">
            {hotel.rating.toFixed(1)}
          </span>
          <StarRating rating={hotel.rating} />
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y divide-neutral-100 border-t border-neutral-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:flex lg:flex-1 lg:items-center lg:justify-center lg:border-t-0">
        <InfoBox label="Check In" value={stay.checkIn} />
        <InfoBox label="Check out" value={stay.checkOut} />
        <InfoBox label="Rooms & Guests" value={stay.guestsLabel} />
      </div>

      <div className="w-full border-t border-neutral-100 p-3 lg:w-[220px] lg:shrink-0 lg:border-l lg:border-t-0 lg:border-neutral-100">
        <HotelMapPreview imageClassName="h-[95px]" buttonClassName="h-9 text-[13px]" />
      </div>
    </div>
  );
}
