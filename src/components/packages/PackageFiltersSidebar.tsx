"use client";

import { useState } from "react";
import { FilterSection, toggleInSet } from "@/components/ui/FilterSection";
import { packageActivities, packageCountries, packageRegions } from "@/lib/data";

const PRICE_MIN = 500;
const PRICE_MAX = 1500;

export type PackageFilterState = {
  minPrice: number;
  maxPrice: number;
  selectedRegions: Set<string>;
  selectedCountries: Set<string>;
  selectedActivities: Set<string>;
};

export function createDefaultPackageFilters(): PackageFilterState {
  return {
    minPrice: PRICE_MIN,
    maxPrice: PRICE_MAX,
    selectedRegions: new Set(),
    selectedCountries: new Set(),
    selectedActivities: new Set(),
  };
}

function CheckboxList({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: Set<string>;
  onToggle: (option: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <label key={option} className="flex cursor-pointer items-center justify-between gap-3">
          <span className="text-[14px] text-neutral-700">{option}</span>
          <input
            type="checkbox"
            checked={selected.has(option)}
            onChange={() => onToggle(option)}
            className="size-[18px] shrink-0 rounded-md border-neutral-300 text-brand-blue focus:ring-brand-blue"
          />
        </label>
      ))}
    </div>
  );
}

export function PackageFiltersSidebar({
  filters,
  onFiltersChange,
}: {
  filters: PackageFilterState;
  onFiltersChange: (updater: (prev: PackageFilterState) => PackageFilterState) => void;
}) {
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);

  const minPercent = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPercent = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  function commitPrice(min: number, max: number) {
    setMinPrice(min);
    setMaxPrice(max);
    onFiltersChange((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  }

  function resetAll() {
    const defaults = createDefaultPackageFilters();
    setMinPrice(defaults.minPrice);
    setMaxPrice(defaults.maxPrice);
    onFiltersChange(createDefaultPackageFilters);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3 rounded-[8px] border border-[#0000001A] bg-white px-4 py-3.5">
        <span className="text-[16px] font-bold text-neutral-900">Filters</span>
        <button
          type="button"
          onClick={resetAll}
          className="rounded-lg border border-neutral-200 px-3 py-1.5 text-[13px] font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Reset All
        </button>
      </div>

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
            onChange={(event) => commitPrice(Math.min(Number(event.target.value), maxPrice - 10), maxPrice)}
            className="range-thumb pointer-events-none absolute inset-x-0 -top-2.5 h-6 w-full appearance-none bg-transparent"
          />
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={maxPrice}
            onChange={(event) => commitPrice(minPrice, Math.max(Number(event.target.value), minPrice + 10))}
            className="range-thumb pointer-events-none absolute inset-x-0 -top-2.5 h-6 w-full appearance-none bg-transparent"
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-[14px] font-medium text-neutral-700">
          <span>USD {minPrice}</span>
          <span>USD {maxPrice}</span>
        </div>
      </FilterSection>

      <FilterSection title="Regions">
        <CheckboxList
          options={packageRegions}
          selected={filters.selectedRegions}
          onToggle={(region) =>
            onFiltersChange((prev) => ({
              ...prev,
              selectedRegions: toggleInSet(prev.selectedRegions, region),
            }))
          }
        />
      </FilterSection>

      <FilterSection title="Country">
        <CheckboxList
          options={packageCountries}
          selected={filters.selectedCountries}
          onToggle={(country) =>
            onFiltersChange((prev) => ({
              ...prev,
              selectedCountries: toggleInSet(prev.selectedCountries, country),
            }))
          }
        />
      </FilterSection>

      <FilterSection title="Activity">
        <CheckboxList
          options={packageActivities}
          selected={filters.selectedActivities}
          onToggle={(activity) =>
            onFiltersChange((prev) => ({
              ...prev,
              selectedActivities: toggleInSet(prev.selectedActivities, activity),
            }))
          }
        />
      </FilterSection>
    </div>
  );
}
