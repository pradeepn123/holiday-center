"use client";

import { useState } from "react";
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

export function HotelFiltersSidebar() {
  const [locationQuery, setLocationQuery] = useState("");
  const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [selectedStars, setSelectedStars] = useState<Set<number>>(new Set());
  const [selectedNeighbourhoods, setSelectedNeighbourhoods] = useState<Set<string>>(new Set());
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());

  const minPercent = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPercent = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  function resetAll() {
    setLocationQuery("");
    setMinPrice(DEFAULT_MIN_PRICE);
    setMaxPrice(DEFAULT_MAX_PRICE);
    setSelectedStars(new Set());
    setSelectedNeighbourhoods(new Set());
    setSelectedAmenities(new Set());
  }

  return (
    <div className="flex flex-col gap-2 lg:sticky lg:top-24">
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
              value={locationQuery}
              onChange={(event) => setLocationQuery(event.target.value)}
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
              value={minPrice}
              onChange={(event) => setMinPrice(Math.min(Number(event.target.value), maxPrice - 10))}
              className="range-thumb pointer-events-none absolute inset-x-0 -top-2.5 h-6 w-full appearance-none bg-transparent"
            />
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              value={maxPrice}
              onChange={(event) => setMaxPrice(Math.max(Number(event.target.value), minPrice + 10))}
              className="range-thumb pointer-events-none absolute inset-x-0 -top-2.5 h-6 w-full appearance-none bg-transparent"
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-[14px] font-medium text-neutral-700">
            <span>USD {minPrice.toFixed(2)}</span>
            <span>USD {maxPrice.toFixed(2)}</span>
          </div>
        </FilterSection>

        <FilterSection title="Star Rating">
          <div className="flex flex-col gap-4">
            {STAR_LEVELS.map((level) => (
              <label key={level} className="flex cursor-pointer items-center justify-between gap-3">
                <StarRating rating={level} />
                <input
                  type="checkbox"
                  checked={selectedStars.has(level)}
                  onChange={() => setSelectedStars((prev) => toggleInSet(prev, level))}
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
                  checked={selectedNeighbourhoods.has(neighbourhood)}
                  onChange={() =>
                    setSelectedNeighbourhoods((prev) => toggleInSet(prev, neighbourhood))
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
                  checked={selectedAmenities.has(amenity)}
                  onChange={() => setSelectedAmenities((prev) => toggleInSet(prev, amenity))}
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
