"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SlidersHorizontal, X } from "lucide-react";
import {
  SportsFiltersSidebar,
  createDefaultSportsFilters,
  type SportsFilterState,
} from "@/components/sports/SportsFiltersSidebar";
import { SportsEventCard } from "@/components/sports/SportsEventCard";
import { sportsFixtures, sportsTicketListings } from "@/lib/data";

function fixtureMatches(
  fixture: (typeof sportsFixtures)[number],
  filters: SportsFilterState
): boolean {
  if (filters.selectedEvents.size > 0 && !filters.selectedEvents.has(fixture.label)) return false;
  if (
    filters.selectedTeams.size > 0 &&
    !filters.selectedTeams.has(fixture.homeCode) &&
    !filters.selectedTeams.has(fixture.awayCode)
  )
    return false;
  if (filters.selectedTournaments.size > 0 && !filters.selectedTournaments.has(fixture.tournament))
    return false;
  if (filters.selectedVenues.size > 0 && !filters.selectedVenues.has(fixture.venue)) return false;
  if (filters.selectedCities.size > 0 && !filters.selectedCities.has(fixture.city)) return false;
  if (filters.selectedCountries.size > 0 && !filters.selectedCountries.has(fixture.country))
    return false;
  return true;
}

function countActiveFilters(filters: SportsFilterState): number {
  return (
    filters.selectedEvents.size +
    filters.selectedTeams.size +
    filters.selectedTournaments.size +
    filters.selectedVenues.size +
    filters.selectedCities.size +
    filters.selectedCountries.size
  );
}

function FilterSheet({
  filters,
  onFiltersChange,
  resultCount,
  onClose,
}: {
  filters: SportsFilterState;
  onFiltersChange: (updater: (prev: SportsFilterState) => SportsFilterState) => void;
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
    <div
      className="fixed inset-0 z-[100] flex items-end bg-black/40 lg:hidden"
      onClick={onClose}
    >
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
          <SportsFiltersSidebar filters={filters} onFiltersChange={onFiltersChange} />
        </div>

        <div className="sticky bottom-0 border-t border-neutral-100 bg-white p-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center rounded-full bg-brand-blue text-[15px] font-semibold text-white"
          >
            Show {resultCount} Result{resultCount === 1 ? "" : "s"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function SportsResultsSection() {
  const [filters, setFilters] = useState<SportsFilterState>(createDefaultSportsFilters);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const fixtureById = new Map(sportsFixtures.map((fixture) => [fixture.id, fixture]));
  const listings = sportsTicketListings.filter((listing) => {
    const fixture = fixtureById.get(listing.fixtureId);
    return fixture ? fixtureMatches(fixture, filters) : false;
  });
  const activeFilterCount = countActiveFilters(filters);

  return (
    <>
      <div className="hidden lg:sticky lg:top-24 lg:block">
        <SportsFiltersSidebar filters={filters} onFiltersChange={setFilters} />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
          <p className="text-[14px] font-medium text-neutral-600">
            {listings.length} ticket{listings.length === 1 ? "" : "s"} found
          </p>
          <button
            type="button"
            onClick={() => setIsFilterSheetOpen(true)}
            className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-[14px] font-semibold text-neutral-900 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
          >
            <SlidersHorizontal className="size-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-brand-blue text-[11px] font-semibold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => {
            const fixture = fixtureById.get(listing.fixtureId);
            if (!fixture) return null;
            return <SportsEventCard key={listing.id} fixture={fixture} listing={listing} />;
          })}
        </div>

        {listings.length === 0 && (
          <p className="rounded-2xl border border-neutral-100 bg-white p-10 text-center text-[14px] text-neutral-500">
            No events match the selected filters.
          </p>
        )}
      </div>

      {isFilterSheetOpen && (
        <FilterSheet
          filters={filters}
          onFiltersChange={setFilters}
          resultCount={listings.length}
          onClose={() => setIsFilterSheetOpen(false)}
        />
      )}
    </>
  );
}
