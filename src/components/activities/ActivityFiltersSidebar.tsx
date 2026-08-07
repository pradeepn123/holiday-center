"use client";

import { FilterSection, toggleInSet } from "@/components/ui/FilterSection";
import { activities, activityDurationTypes, activityTypeFilters } from "@/lib/data";

const activityNames = Array.from(new Set(activities.map((activity) => activity.title)));

const PRICE_MIN = 62;
const PRICE_MAX = 250;

export type ActivityFilterState = {
  minPrice: number;
  maxPrice: number;
  selectedActivityNames: Set<string>;
  selectedActivityTypes: Set<string>;
  selectedDurationTypes: Set<string>;
};

export function createDefaultActivityFilters(): ActivityFilterState {
  return {
    minPrice: PRICE_MIN,
    maxPrice: PRICE_MAX,
    selectedActivityNames: new Set(),
    selectedActivityTypes: new Set(),
    selectedDurationTypes: new Set(),
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
      {options.map((option, index) => (
        <label key={`${option}-${index}`} className="flex cursor-pointer items-center justify-between gap-3">
          <span className="text-[14px] text-neutral-700">{option}</span>
          <input
            type="checkbox"
            checked={selected.has(`${option}-${index}`)}
            onChange={() => onToggle(`${option}-${index}`)}
            className="size-[18px] shrink-0 rounded-md border-neutral-300 text-brand-blue focus:ring-brand-blue"
          />
        </label>
      ))}
    </div>
  );
}

export function ActivityFiltersSidebar({
  filters,
  onFiltersChange,
}: {
  filters: ActivityFilterState;
  onFiltersChange: (updater: (prev: ActivityFilterState) => ActivityFilterState) => void;
}) {
  const minPercent = ((filters.minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPercent = ((filters.maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  function resetAll() {
    onFiltersChange(createDefaultActivityFilters);
  }

  return (
    <div className="flex flex-col gap-2 lg:sticky lg:top-24">
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
            value={filters.minPrice}
            onChange={(event) =>
              onFiltersChange((prev) => ({
                ...prev,
                minPrice: Math.min(Number(event.target.value), prev.maxPrice - 5),
              }))
            }
            className="range-thumb pointer-events-none absolute inset-x-0 -top-2.5 h-6 w-full appearance-none bg-transparent"
          />
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={filters.maxPrice}
            onChange={(event) =>
              onFiltersChange((prev) => ({
                ...prev,
                maxPrice: Math.max(Number(event.target.value), prev.minPrice + 5),
              }))
            }
            className="range-thumb pointer-events-none absolute inset-x-0 -top-2.5 h-6 w-full appearance-none bg-transparent"
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-[14px] font-medium text-neutral-700">
          <span>USD {filters.minPrice}</span>
          <span>USD {filters.maxPrice}</span>
        </div>
      </FilterSection>

      <FilterSection title="Activities Names" defaultOpen={false}>
        <CheckboxList
          options={activityNames}
          selected={filters.selectedActivityNames}
          onToggle={(option) =>
            onFiltersChange((prev) => ({
              ...prev,
              selectedActivityNames: toggleInSet(prev.selectedActivityNames, option),
            }))
          }
        />
      </FilterSection>

      <FilterSection title="Activities Type">
        <CheckboxList
          options={activityTypeFilters}
          selected={filters.selectedActivityTypes}
          onToggle={(option) =>
            onFiltersChange((prev) => ({
              ...prev,
              selectedActivityTypes: toggleInSet(prev.selectedActivityTypes, option),
            }))
          }
        />
      </FilterSection>

      <FilterSection title="Duration type">
        <CheckboxList
          options={activityDurationTypes}
          selected={filters.selectedDurationTypes}
          onToggle={(option) =>
            onFiltersChange((prev) => ({
              ...prev,
              selectedDurationTypes: toggleInSet(prev.selectedDurationTypes, option),
            }))
          }
        />
      </FilterSection>
    </div>
  );
}
