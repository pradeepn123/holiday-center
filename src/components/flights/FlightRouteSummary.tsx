import Image from "next/image";
import { cityToAirportCode } from "@/lib/flightsData";
import type { FlightLegParam } from "@/lib/flightParams";

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
  legs = [],
}: {
  from: string;
  to: string;
  tripType: string;
  passengers: number;
  travelClass: string;
  legs?: FlightLegParam[];
}) {
  const fromLabel = from || "Kuwait";
  const toLabel = to || "Dubai";
  const tripTypeLabel = TRIP_TYPE_LABELS[tripType] ?? "One Way";
  const isMultiCity = tripType === "multicity";

  const multiCityStops = isMultiCity
    ? (() => {
        const filled = legs.filter((leg) => leg.from.trim() || leg.to.trim());
        const source = filled.length >= 2 ? filled : [{ from: fromLabel, to: toLabel, date: "" }];
        const cities: string[] = [];
        source.forEach((leg, index) => {
          if (index === 0 && leg.from.trim()) cities.push(leg.from.trim());
          if (leg.to.trim()) cities.push(leg.to.trim());
        });
        return cities;
      })()
    : [];

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
        {isMultiCity && multiCityStops.length >= 2 ? (
          <span>
            {multiCityStops.map((city, index) => (
              <span key={index}>
                {index > 0 && <span className="text-neutral-400"> → </span>}
                {city} ({cityToAirportCode(city)})
              </span>
            ))}
          </span>
        ) : (
          <>
            {fromLabel} ({cityToAirportCode(fromLabel)}) to {toLabel} ({cityToAirportCode(toLabel)})
          </>
        )}
      </h1>
      <p className="mt-1 text-[13px] text-neutral-500 sm:text-[14px]">
        {tripTypeLabel} · {passengers} Passenger{passengers === 1 ? "" : "s"} · {travelClass}
      </p>
    </div>
  );
}
