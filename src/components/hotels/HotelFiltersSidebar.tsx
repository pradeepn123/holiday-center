"use client";

import { Search } from "lucide-react";
import { StarRating } from "@/components/ui/Star";
import { FilterSection, toggleInSet } from "@/components/ui/FilterSection";
import { hotelAmenityFilters, hotelNeighbourhoods } from "@/lib/data";
import { HotelMapPreview } from "./HotelMapPreview";

const PRICE_MIN = 0;
const PRICE_MAX = 1000;
const STAR_LEVELS = [5, 4, 3, 2, 1];

const DEFAULT_MIN_PRICE = 23;
const DEFAULT_MAX_PRICE = 400;

export type HotelFilterState = {
  locationQuery: string;
  minPrice: number;
  maxPrice: number;
  selectedStars: Set<number>;
  selectedNeighbourhoods: Set<string>;
  selectedAmenities: Set<string>;
};

export function createDefaultHotelFilters(): HotelFilterState {
  return {
    locationQuery: "",
    minPrice: DEFAULT_MIN_PRICE,
    maxPrice: DEFAULT_MAX_PRICE,
    selectedStars: new Set(),
    selectedNeighbourhoods: new Set(),
    selectedAmenities: new Set(),
  };
}

export function HotelFiltersSidebar({
  filters,
  onFiltersChange,
}: {
  filters: HotelFilterState;
  onFiltersChange: (updater: (prev: HotelFilterState) => HotelFilterState) => void;
}) {
  const minPercent = ((filters.minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPercent = ((filters.maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  function resetAll() {
    onFiltersChange(createDefaultHotelFilters);
  }

  return (
    <div className="flex flex-col gap-2">
      <HotelMapPreview />

      <div className="flex flex-col gap-2 lg:max-h-[calc(100vh-23rem)] lg:overflow-y-auto lg:pr-1">
        <FilterSection
          title="Filters"
          action={
            <button
              type="button"
              onClick={resetAll}
              className="text-[13px] font-semibold text-brand-blue hover:underline"
            >
              Reset all
            </button>
          }
        >
          <p className="text-[14px] font-semibold text-neutral-700">Search</p>
          <div className="mt-2 flex h-12 items-center gap-2 rounded-xl border border-neutral-200 px-3">
            <Search className="size-4 shrink-0 text-neutral-400" />
            <input
              type="text"
              value={filters.locationQuery}
              onChange={(event) => {
                const value = event.target.value;
                onFiltersChange((prev) => ({ ...prev, locationQuery: value }));
              }}
              placeholder="Enter area, locality or hotel"
              className="w-full min-w-0 bg-transparent text-[14px] outline-none placeholder:text-neutral-400"
            />
          </div>
        </FilterSection>

        <FilterSection title="Price">
          <div className="relative mt-2 h-1.5 rounded-full bg-neutral-200">
            <div
              className="absolute h-1.5 rounded-full bg-brand-blue"
              style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
            />
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              value={filters.minPrice}
              onChange={(event) => {
                const value = Math.min(Number(event.target.value), filters.maxPrice - 10);
                onFiltersChange((prev) => ({ ...prev, minPrice: value }));
              }}
              className="range-thumb pointer-events-none absolute inset-x-0 -top-2.5 h-6 w-full appearance-none bg-transparent"
            />
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              value={filters.maxPrice}
              onChange={(event) => {
                const value = Math.max(Number(event.target.value), filters.minPrice + 10);
                onFiltersChange((prev) => ({ ...prev, maxPrice: value }));
              }}
              className="range-thumb pointer-events-none absolute inset-x-0 -top-2.5 h-6 w-full appearance-none bg-transparent"
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-[14px] font-medium text-neutral-700">
            <span>USD {filters.minPrice.toFixed(2)}</span>
            <span>USD {filters.maxPrice.toFixed(2)}</span>
          </div>
        </FilterSection>

        <FilterSection title="Star Rating">
          <div className="flex flex-col gap-4">
            {STAR_LEVELS.map((level) => (
              <label key={level} className="flex cursor-pointer items-center justify-between gap-3">
                <StarRating rating={level} />
                <input
                  type="checkbox"
                  checked={filters.selectedStars.has(level)}
                  onChange={() =>
                    onFiltersChange((prev) => ({
                      ...prev,
                      selectedStars: toggleInSet(prev.selectedStars, level),
                    }))
                  }
                  className="size-[18px] shrink-0 rounded-md border-neutral-300 text-brand-blue focus:ring-brand-blue"
                />
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Neighbourhood">
          <div className="flex flex-col gap-3.5">
            {hotelNeighbourhoods.map((neighbourhood) => (
              <label
                key={neighbourhood}
                className="flex cursor-pointer items-center justify-between gap-3"
              >
                <span className="truncate text-[14px] text-neutral-700">{neighbourhood}</span>
                <input
                  type="checkbox"
                  checked={filters.selectedNeighbourhoods.has(neighbourhood)}
                  onChange={() =>
                    onFiltersChange((prev) => ({
                      ...prev,
                      selectedNeighbourhoods: toggleInSet(prev.selectedNeighbourhoods, neighbourhood),
                    }))
                  }
                  className="size-[18px] shrink-0 rounded-md border-neutral-300 text-brand-blue focus:ring-brand-blue"
                />
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Amenities">
          <div className="flex flex-col gap-3.5">
            {hotelAmenityFilters.map((amenity) => (
              <label key={amenity} className="flex cursor-pointer items-center justify-between gap-3">
                <span className="text-[14px] text-neutral-700">{amenity}</span>
                <input
                  type="checkbox"
                  checked={filters.selectedAmenities.has(amenity)}
                  onChange={() =>
                    onFiltersChange((prev) => ({
                      ...prev,
                      selectedAmenities: toggleInSet(prev.selectedAmenities, amenity),
                    }))
                  }
                  className="size-[18px] shrink-0 rounded-md border-neutral-300 text-brand-blue focus:ring-brand-blue"
                />
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
}
