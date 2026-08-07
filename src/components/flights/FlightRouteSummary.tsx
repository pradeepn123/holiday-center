import Image from "next/image";
import { cityToAirportCode } from "@/lib/flightsData";

const TRIP_TYPE_LABELS: Record<string, string> = {
  oneway: "One Way",
  roundtrip: "Round Trip",
  multicity: "Multi City",
};

export function FlightRouteSummary({
  from,
  to,
  tripType,
  passengers,
  travelClass,
}: {
  from: string;
  to: string;
  tripType: string;
  passengers: number;
  travelClass: string;
}) {
  const fromLabel = from || "Kuwait";
  const toLabel = to || "Dubai";
  const tripTypeLabel = TRIP_TYPE_LABELS[tripType] ?? "One Way";

  return (
    <div>
      <h1 className="flex items-start gap-2 text-lg font-bold leading-tight text-neutral-900 sm:items-center sm:text-2xl">
        <Image
          src="/assets/icons/fl_icon.svg"
          alt=""
          width={24}
          height={24}
          className="mt-0.5 size-5 shrink-0 sm:mt-0 sm:size-6"
        />
        {fromLabel} ({cityToAirportCode(fromLabel)}) to {toLabel} ({cityToAirportCode(toLabel)})
      </h1>
      <p className="mt-1 text-[13px] text-neutral-500 sm:text-[14px]">
        {tripTypeLabel} · {passengers} Passenger{passengers === 1 ? "" : "s"} · {travelClass}
      </p>
    </div>
  );
}
