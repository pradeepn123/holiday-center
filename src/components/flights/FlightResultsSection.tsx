"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { applyFlightFilters, createDefaultFlightFilters, type FlightFilterState } from "@/lib/flightFilters";
import type { FlightSearchParams } from "@/lib/flightParams";
import type { FlightResult } from "@/types";
import { FlightFiltersSidebar } from "./FlightFiltersSidebar";
import { FlightResultsList } from "./FlightResultsList";
import { FlightRouteSummary } from "./FlightRouteSummary";
import { SessionCountdown } from "./SessionCountdown";

function countActiveFilters(filters: FlightFilterState): number {
  return (
    filters.selectedStops.size +
    filters.selectedLuggage.size +
    filters.departureSlots.size +
    filters.arrivalSlots.size +
    filters.selectedRefundable.size +
    filters.selectedAirlines.size
  );
}

function FilterSheet({
  filters,
  onFiltersChange,
  resultCount,
  onClose,
}: {
  filters: FlightFilterState;
  onFiltersChange: (updater: (prev: FlightFilterState) => FlightFilterState) => void;
  resultCount: number;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end bg-black/40 lg:hidden" onClick={onClose}>
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[85vh] w-full flex-col rounded-t-3xl bg-neutral-50"
      >
        <div className="flex items-center justify-end p-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex size-8 items-center justify-center rounded-full bg-neutral-900 text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <FlightFiltersSidebar filters={filters} onFiltersChange={onFiltersChange} />
        </div>

        <div className="sticky bottom-0 border-t border-neutral-100 bg-white p-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center rounded-full bg-brand-blue text-[15px] font-semibold text-white"
          >
            Show {resultCount} Flight{resultCount === 1 ? "" : "s"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

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
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const activeFilterCount = countActiveFilters(filters);

  const filteredFlights = useMemo(() => applyFlightFilters(flights, filters), [flights, filters]);

  return (
    <>
      <div className="hidden flex-col gap-3 lg:sticky lg:top-24 lg:flex">
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
        <div className="mt-4 lg:hidden">
          <SessionCountdown />
        </div>
        <div className="mt-4 lg:mt-6">
          <FlightResultsList
            flights={filteredFlights}
            searchParams={searchParams}
            onOpenFilters={() => setIsFilterSheetOpen(true)}
            activeFilterCount={activeFilterCount}
          />
        </div>
      </div>

      {isFilterSheetOpen && (
        <FilterSheet
          filters={filters}
          onFiltersChange={setFilters}
          resultCount={filteredFlights.length}
          onClose={() => setIsFilterSheetOpen(false)}
        />
      )}
    </>
  );
}
