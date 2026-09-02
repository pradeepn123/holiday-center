import Image from "next/image";
import { Clock } from "lucide-react";
import { getFlightItinerary } from "@/lib/flightsData";
import type { FlightLeg } from "@/types";

const gridCols = "grid grid-cols-[110px_1fr_1fr_64px] gap-3";

function HeaderBar() {
  return (
    <div className={`${gridCols} items-center rounded-[10px] border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2.5`}>
      <p className="text-[11px] font-bold uppercase text-[#4e5255]">Airline</p>
      <p className="text-[11px] font-bold uppercase text-[#4e5255]">Departure</p>
      <p className="text-[11px] font-bold uppercase text-[#4e5255]">Arrival</p>
      <p className="text-right text-[11px] font-bold uppercase text-[#4e5255]">Duration</p>
    </div>
  );
}

function LayoverBar({ code, durationLabel }: { code: string; durationLabel: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-[10px] border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2.5">
      <Clock className="size-4 shrink-0 text-[#4e5255]" />
      <p className="text-[12px] font-normal text-[#4e5255]">
        Layover Duration ({code}) {durationLabel}
      </p>
    </div>
  );
}

export function FlightVoucherLegDetails({ label, leg }: { label: string; leg: FlightLeg }) {
  const { segments, layovers } = getFlightItinerary(leg);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#e5e7eb] bg-white p-4">
      <p className="text-[16px] font-bold text-[#111827]">{label}</p>

      <HeaderBar />

      {segments.map((segment, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div
            className={`${gridCols} items-center p-3 ${
              index === segments.length - 1 ? "" : "border-b border-[#e5e7eb]"
            }`}
          >
            <div className="flex flex-col gap-2.5">
              <Image
                src="/assets/icons/airline_logo.png"
                alt={segment.airline}
                width={44}
                height={16}
                className="h-4 w-auto object-contain object-left"
              />
              <div className="text-[12px] font-normal text-[#4e5255]">
                <p>{segment.airline}</p>
                <p>{segment.flightNumber}</p>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <p className="text-[12px] font-semibold text-[#111827]">
                {segment.departureTime} {segment.departureCode}
              </p>
              <p className="text-[11px] font-normal text-[#4e5255]">{segment.departureDate}</p>
              <p className="text-[11px] font-normal text-[#4e5255]">{segment.departureAirport}</p>
              <p className="text-[11px] font-normal text-[#4e5255]">
                Terminal {segment.departureTerminal}
              </p>
            </div>

            <div className="flex flex-col gap-0.5">
              <p className="text-[12px] font-semibold text-[#111827]">
                {segment.arrivalTime} {segment.arrivalCode}
              </p>
              <p className="text-[11px] font-normal text-[#4e5255]">{segment.arrivalDate}</p>
              <p className="text-[11px] font-normal text-[#4e5255]">{segment.arrivalAirport}</p>
              <p className="text-[11px] font-normal text-[#4e5255]">
                Terminal {segment.arrivalTerminal}
              </p>
            </div>

            <p className="text-right text-[12px] font-semibold text-[#111827]">
              {segment.durationLabel}
            </p>
          </div>

          {layovers[index] && (
            <LayoverBar code={layovers[index].code} durationLabel={layovers[index].durationLabel} />
          )}
        </div>
      ))}
    </div>
  );
}
