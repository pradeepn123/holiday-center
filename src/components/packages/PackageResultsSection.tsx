"use client";

import { useMemo, useState } from "react";
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

export function PackageResultsSection({ packages }: { packages: TourPackage[] }) {
  const [filters, setFilters] = useState<PackageFilterState>(createDefaultPackageFilters);
  const filteredPackages = useMemo(() => applyFilters(packages, filters), [packages, filters]);

  return (
    <>
      <div className="lg:sticky lg:top-24">
        <PackageFiltersSidebar filters={filters} onFiltersChange={setFilters} />
      </div>

      <div>
        <p className="text-[15px] text-neutral-500">{filteredPackages.length} packages found</p>

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
    </>
  );
}
