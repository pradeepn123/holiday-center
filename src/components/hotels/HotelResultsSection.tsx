"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  HotelFiltersSidebar,
  createDefaultHotelFilters,
  type HotelFilterState,
} from "@/components/hotels/HotelFiltersSidebar";
import { HotelResultsList } from "@/components/hotels/HotelResultsList";
import type { StayParams } from "@/lib/stayParams";
import type { HotelSearchResult } from "@/types";

function countActiveFilters(filters: HotelFilterState): number {
  return (
    filters.selectedStars.size +
    filters.selectedNeighbourhoods.size +
    filters.selectedAmenities.size +
    (filters.locationQuery.trim() ? 1 : 0)
  );
}

function FilterSheet({
  filters,
  onFiltersChange,
  resultCount,
  onClose,
}: {
  filters: HotelFilterState;
  onFiltersChange: (updater: (prev: HotelFilterState) => HotelFilterState) => void;
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
          <HotelFiltersSidebar filters={filters} onFiltersChange={onFiltersChange} />
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

export function HotelResultsSection({
  hotels,
  stayParams,
  destination,
}: {
  hotels: HotelSearchResult[];
  stayParams: StayParams;
  destination?: string;
}) {
  const [filters, setFilters] = useState<HotelFilterState>(createDefaultHotelFilters);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const activeFilterCount = countActiveFilters(filters);

  return (
    <>
      <div className="hidden lg:sticky lg:top-24 lg:block">
        <HotelFiltersSidebar filters={filters} onFiltersChange={setFilters} />
      </div>

      <HotelResultsList
        hotels={hotels}
        stayParams={stayParams}
        destination={destination}
        onOpenFilters={() => setIsFilterSheetOpen(true)}
        activeFilterCount={activeFilterCount}
      />

      {isFilterSheetOpen && (
        <FilterSheet
          filters={filters}
          onFiltersChange={setFilters}
          resultCount={hotels.length}
          onClose={() => setIsFilterSheetOpen(false)}
        />
      )}
    </>
  );
}
