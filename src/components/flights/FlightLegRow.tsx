import Image from "next/image";
import { CABIN_BAGGAGE, compactLuggage, formatFlightDuration, stopsLabel } from "@/lib/flightsData";
import type { FlightLeg } from "@/types";

function CabinBagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M9.5 2H8.9495C8.717 0.8605 7.707 0 6.5 0H5.5C4.293 0 3.2825 0.8605 3.0505 2H2.5C1.1215 2 0 3.1215 0 4.5V9.5C0 10.8785 1.1215 12 2.5 12H9.5C10.8785 12 12 10.8785 12 9.5V4.5C12 3.1215 10.8785 2 9.5 2ZM5.5 1H6.5C7.152 1 7.7075 1.418 7.914 2H4.086C4.2925 1.418 4.848 1 5.5 1ZM11 9.5C11 10.327 10.327 11 9.5 11H9V4.5C9 4.2235 8.7765 4 8.5 4C8.2235 4 8 4.2235 8 4.5V11H4V4.5C4 4.2235 3.776 4 3.5 4C3.224 4 3 4.2235 3 4.5V11H2.5C1.673 11 1 10.327 1 9.5V4.5C1 3.673 1.673 3 2.5 3H9.5C10.327 3 11 3.673 11 4.5V9.5Z" />
    </svg>
  );
}

function CheckedBagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 9 12" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6.75 1.5H6V0.75C6.20709 0.75 6.375 0.582094 6.375 0.375C6.375 0.167906 6.20709 0 6 0C5.46492 0 2.78634 0 2.25 0C2.04291 0 1.875 0.167906 1.875 0.375C1.875 0.582094 2.04291 0.75 2.25 0.75V1.5H1.5C0.672891 1.5 0 2.17289 0 3V9.75C0 10.5771 0.672891 11.25 1.5 11.25H1.6875V11.625C1.6875 11.8321 1.85541 12 2.0625 12C2.26959 12 2.4375 11.8321 2.4375 11.625V11.25H5.8125V11.625C5.8125 11.8321 5.98041 12 6.1875 12C6.39459 12 6.5625 11.8321 6.5625 11.625V11.25H6.75C7.57711 11.25 8.25 10.5771 8.25 9.75V3C8.25 2.17289 7.57711 1.5 6.75 1.5ZM3 0.75H5.25V1.5H3V0.75ZM7.5 9.75C7.5 10.1636 7.16355 10.5 6.75 10.5H1.5C1.08645 10.5 0.75 10.1636 0.75 9.75V3C0.75 2.58645 1.08645 2.25 1.5 2.25H6.75C7.16355 2.25 7.5 2.58645 7.5 3V9.75Z" />
      <path d="M4.125 3.1875C3.91791 3.1875 3.75 3.35541 3.75 3.5625V9.1875C3.75 9.39459 3.91791 9.5625 4.125 9.5625C4.33209 9.5625 4.5 9.39459 4.5 9.1875V3.5625C4.5 3.35541 4.33209 3.1875 4.125 3.1875Z" />
      <path d="M6 3.1875C5.79291 3.1875 5.625 3.35541 5.625 3.5625V9.1875C5.625 9.39459 5.79291 9.5625 6 9.5625C6.20709 9.5625 6.375 9.39459 6.375 9.1875V3.5625C6.375 3.35541 6.20709 3.1875 6 3.1875Z" />
      <path d="M2.25 3.1875C2.04291 3.1875 1.875 3.35541 1.875 3.5625V9.1875C1.875 9.39459 2.04291 9.5625 2.25 9.5625C2.45709 9.5625 2.625 9.39459 2.625 9.1875V3.5625C2.625 3.35541 2.45709 3.1875 2.25 3.1875Z" />
    </svg>
  );
}

export function FlightLegRow({ leg, luggage }: { leg: FlightLeg; luggage?: string }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex flex-col items-center gap-1 text-center sm:w-[132px] sm:shrink-0">
        <Image
          src="/assets/icons/airline_logo.png"
          alt={leg.airline}
          width={112}
          height={38}
          className="h-[30px] w-auto shrink-0 object-contain"
        />
        <div>
          <p className="text-[13px] font-semibold text-neutral-800">{leg.airline}</p>
          <p className="text-[12px] text-neutral-400">{leg.flightNumber}</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-between gap-3">
        <div className="text-left">
          <p className="text-[20px] font-bold text-neutral-900">{leg.departureTime}</p>
          <p className="text-[13px] text-[#505C59]">{leg.departureDate}</p>
          <p className="text-[13px] font-semibold text-[#224BA0]">
            {leg.origin} ({leg.originCode})
          </p>
        </div>

        <div className="flex flex-[0.9] flex-col items-center gap-1.5">
          <span className="shrink-0 whitespace-nowrap text-[13px] text-neutral-500">
            {formatFlightDuration(leg.durationMinutes)}
          </span>
          <div className="flex w-full items-center gap-2">
            <span className="h-px flex-1 border-t border-dashed border-[#0000001A]" />
            <Image src="/assets/icons/flight_stops_icon.svg" alt="" width={18} height={18} className="shrink-0" />
            <span className="h-px flex-1 border-t border-dashed border-[#0000001A]" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="whitespace-nowrap rounded-full bg-[#EEF2FA] px-3 py-1 text-[12px] font-medium text-[#224BA0]">
              {stopsLabel(leg.stops)}
            </span>
            {luggage && (
              <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#EEF2FA] px-3 py-1 text-[12px] font-medium text-[#224BA0]">
                <CheckedBagIcon className="h-[13px] w-auto shrink-0" />
                {compactLuggage(luggage)}
                <CabinBagIcon className="size-[13px] shrink-0" />
                {CABIN_BAGGAGE}
              </span>
            )}
          </div>
        </div>

        <div className="text-right">
          <p className="text-[20px] font-bold text-neutral-900">{leg.arrivalTime}</p>
          <p className="text-[13px] text-[#505C59]">{leg.arrivalDate}</p>
          <p className="text-[13px] font-semibold text-[#224BA0]">
            {leg.destination} ({leg.destinationCode})
          </p>
        </div>
      </div>
    </div>
  );
}
