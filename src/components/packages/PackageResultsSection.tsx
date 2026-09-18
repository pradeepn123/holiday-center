"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { TourPackageCard } from "./TourPackageCard";
import {
  createDefaultPackageFilters,
  PackageFiltersSidebar,
  type PackageFilterState,
} from "./PackageFiltersSidebar";
import type { TourPackage } from "@/types";

function applyFilters(packages: TourPackage[], filters: PackageFilterState): TourPackage[] {
  return packages.filter((pkg) => {
    if (pkg.price < filters.minPrice || pkg.price > filters.maxPrice) return false;
    if (filters.selectedRegions.size > 0 && !filters.selectedRegions.has(pkg.region)) return false;
    if (filters.selectedCountries.size > 0 && !filters.selectedCountries.has(pkg.country)) return false;
    if (
      filters.selectedActivities.size > 0 &&
      !pkg.activities.some((activity) => filters.selectedActivities.has(activity))
    ) {
      return false;
    }
    return true;
  });
}

function countActiveFilters(filters: PackageFilterState): number {
  return filters.selectedRegions.size + filters.selectedCountries.size + filters.selectedActivities.size;
}

function FilterSheet({
  filters,
  onFiltersChange,
  resultCount,
  onClose,
}: {
  filters: PackageFilterState;
  onFiltersChange: (updater: (prev: PackageFilterState) => PackageFilterState) => void;
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
          <PackageFiltersSidebar filters={filters} onFiltersChange={onFiltersChange} />
        </div>

        <div className="sticky bottom-0 border-t border-neutral-100 bg-white p-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center rounded-full bg-brand-blue text-[15px] font-semibold text-white"
          >
            Show {resultCount} Package{resultCount === 1 ? "" : "s"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function PackageResultsSection({ packages }: { packages: TourPackage[] }) {
  const [filters, setFilters] = useState<PackageFilterState>(createDefaultPackageFilters);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const activeFilterCount = countActiveFilters(filters);
  const filteredPackages = useMemo(() => applyFilters(packages, filters), [packages, filters]);

  return (
    <>
      <div className="hidden lg:sticky lg:top-24 lg:block">
        <PackageFiltersSidebar filters={filters} onFiltersChange={setFilters} />
      </div>

      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-[15px] text-neutral-500">{filteredPackages.length} packages found</p>
        </div>

        <button
          type="button"
          onClick={() => setIsFilterSheetOpen(true)}
          className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 text-[14px] font-semibold text-neutral-900 shadow-[0_2px_8px_rgba(0,0,0,0.06)] lg:hidden"
        >
          <SlidersHorizontal className="size-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-brand-blue text-[11px] font-semibold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-neutral-100 bg-white p-10 text-center text-[14px] text-neutral-500">
              No packages found.
            </div>
          ) : (
            filteredPackages.map((pkg) => <TourPackageCard key={pkg.id} pkg={pkg} />)
          )}
        </div>
      </div>

      {isFilterSheetOpen && (
        <FilterSheet
          filters={filters}
          onFiltersChange={setFilters}
          resultCount={filteredPackages.length}
          onClose={() => setIsFilterSheetOpen(false)}
        />
      )}
    </>
  );
}
