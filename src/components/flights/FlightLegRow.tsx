import Image from "next/image";
import { formatFlightDuration, stopsLabel } from "@/lib/flightsData";
import type { FlightLeg } from "@/types";

export function FlightLegRow({ leg }: { leg: FlightLeg }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2.5 sm:w-[180px] sm:shrink-0">
        <Image
          src="/assets/icons/airline_logo.png"
          alt={leg.airline}
          width={64}
          height={22}
          className="h-[22px] w-auto shrink-0 object-contain object-left"
        />
        <div>
          <p className="text-[13px] font-medium text-neutral-700">{leg.airline}</p>
          <p className="text-[12px] text-neutral-400">{leg.flightNumber}</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-between gap-3">
        <div className="text-left">
          <p className="text-[20px] font-bold text-neutral-900">{leg.departureTime}</p>
          <p className="text-[14px] text-[#505C59]">{leg.departureDate}</p>
          <p className="text-[14px] font-medium text-[#224BA0]">{leg.originCode}</p>
        </div>

        <div className="flex flex-[0.7] flex-col items-center gap-1.5">
          <span className="shrink-0 whitespace-nowrap text-[13px] text-neutral-500">
            {formatFlightDuration(leg.durationMinutes)}
          </span>
          <div className="flex w-full items-center gap-2">
            <span className="h-px flex-1 border-t border-dashed border-neutral-300" />
            <Image src="/assets/icons/flight_stops_icon.svg" alt="" width={18} height={18} className="shrink-0" />
            <span className="h-px flex-1 border-t border-dashed border-neutral-300" />
          </div>
          <span className="shrink-0 whitespace-nowrap rounded-full bg-[#F6F7F9] px-3 py-1 text-[12px] font-medium text-[#224BA0]">
            {stopsLabel(leg.stops)}
          </span>
        </div>

        <div className="text-right">
          <p className="text-[20px] font-bold text-neutral-900">{leg.arrivalTime}</p>
          <p className="text-[14px] text-[#505C59]">{leg.arrivalDate}</p>
          <p className="text-[14px] font-medium text-[#224BA0]">{leg.destinationCode}</p>
        </div>
      </div>
    </div>
  );
}
