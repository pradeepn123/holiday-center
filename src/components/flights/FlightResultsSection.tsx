"use client";

import { useMemo, useState } from "react";
import { applyFlightFilters, createDefaultFlightFilters, type FlightFilterState } from "@/lib/flightFilters";
import type { FlightSearchParams } from "@/lib/flightParams";
import type { FlightResult } from "@/types";
import { FlightFiltersSidebar } from "./FlightFiltersSidebar";
import { FlightResultsList } from "./FlightResultsList";
import { FlightRouteSummary } from "./FlightRouteSummary";
import { SessionCountdown } from "./SessionCountdown";

export function FlightResultsSection({
  flights,
  from,
  to,
  tripType,
  passengers,
  travelClass,
  searchParams,
}: {
  flights: FlightResult[];
  from: string;
  to: string;
  tripType: string;
  passengers: number;
  travelClass: string;
  searchParams: FlightSearchParams;
}) {
  const [filters, setFilters] = useState<FlightFilterState>(createDefaultFlightFilters);

  const filteredFlights = useMemo(() => applyFlightFilters(flights, filters), [flights, filters]);

  return (
    <>
      <div className="flex flex-col gap-3 lg:sticky lg:top-24">
        <SessionCountdown />
        <FlightFiltersSidebar filters={filters} onFiltersChange={setFilters} />
      </div>

      <div>
        <FlightRouteSummary
          from={from}
          to={to}
          tripType={tripType}
          passengers={passengers}
          travelClass={travelClass}
        />
        <div className="mt-6">
          <FlightResultsList flights={filteredFlights} searchParams={searchParams} />
        </div>
      </div>
    </>
  );
}
