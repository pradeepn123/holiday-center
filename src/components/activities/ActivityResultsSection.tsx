"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SlidersHorizontal, X } from "lucide-react";
import {
  ActivityFiltersSidebar,
  createDefaultActivityFilters,
  type ActivityFilterState,
} from "@/components/activities/ActivityFiltersSidebar";
import { ActivityResultCard } from "@/components/activities/ActivityResultCard";
import type { ActivityResult } from "@/types";

function activityMatches(activity: ActivityResult, filters: ActivityFilterState): boolean {
  if (activity.price < filters.minPrice || activity.price > filters.maxPrice) return false;
  if (
    filters.selectedActivityNames.size > 0 &&
    !Array.from(filters.selectedActivityNames).some((key) => key.startsWith(activity.title))
  )
    return false;
  if (
    filters.selectedActivityTypes.size > 0 &&
    !Array.from(filters.selectedActivityTypes).some((key) => key.startsWith(activity.activityType))
  )
    return false;
  if (
    filters.selectedDurationTypes.size > 0 &&
    !Array.from(filters.selectedDurationTypes).some((key) => key.startsWith(activity.durationType))
  )
    return false;
  return true;
}

function countActiveFilters(filters: ActivityFilterState): number {
  return (
    filters.selectedActivityNames.size +
    filters.selectedActivityTypes.size +
    filters.selectedDurationTypes.size
  );
}

function FilterSheet({
  filters,
  onFiltersChange,
  resultCount,
  onClose,
}: {
  filters: ActivityFilterState;
  onFiltersChange: (updater: (prev: ActivityFilterState) => ActivityFilterState) => void;
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
          <ActivityFiltersSidebar filters={filters} onFiltersChange={onFiltersChange} />
        </div>

        <div className="sticky bottom-0 border-t border-neutral-100 bg-white p-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center rounded-full bg-brand-blue text-[15px] font-semibold text-white"
          >
            Show {resultCount} Activit{resultCount === 1 ? "y" : "ies"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function ActivityResultsSection({ activities }: { activities: ActivityResult[] }) {
  const [filters, setFilters] = useState<ActivityFilterState>(createDefaultActivityFilters);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const results = activities.filter((activity) => activityMatches(activity, filters));
  const activeFilterCount = countActiveFilters(filters);

  return (
    <>
      <div className="hidden lg:block">
        <ActivityFiltersSidebar filters={filters} onFiltersChange={setFilters} />
      </div>

      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex items-center justify-between gap-3 lg:hidden">
          <p className="text-[15px] font-bold text-neutral-900">
            {results.length} activit{results.length === 1 ? "y" : "ies"} found
          </p>
          <button
            type="button"
            onClick={() => setIsFilterSheetOpen(true)}
            className="flex h-11 shrink-0 items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 text-[14px] font-semibold text-neutral-900 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
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

        {results.map((activity) => (
          <ActivityResultCard key={activity.id} activity={activity} />
        ))}

        {results.length === 0 && (
          <p className="rounded-2xl border border-neutral-100 bg-white p-10 text-center text-[14px] text-neutral-500">
            No activities match the selected filters.
          </p>
        )}
      </div>

      {isFilterSheetOpen && (
        <FilterSheet
          filters={filters}
          onFiltersChange={setFilters}
          resultCount={results.length}
          onClose={() => setIsFilterSheetOpen(false)}
        />
      )}
    </>
  );
}
