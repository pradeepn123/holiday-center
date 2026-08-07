"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useClickOutside } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import type { StayParams } from "@/lib/stayParams";
import type { HotelSearchResult } from "@/types";
import { HotelResultCard } from "./HotelResultCard";

const SORT_OPTIONS = ["Recommended", "Price: Low to High", "Price: High to Low", "Guest Rating"];

export function HotelResultsList({
  hotels,
  stayParams,
  destination,
  onOpenFilters,
  activeFilterCount = 0,
}: {
  hotels: HotelSearchResult[];
  stayParams: StayParams;
  destination?: string;
  onOpenFilters?: () => void;
  activeFilterCount?: number;
}) {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const sortRef = useClickOutside<HTMLDivElement>(() => setSortOpen(false));

  const sortedHotels = [...hotels].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Guest Rating") return b.rating - a.rating;
    return 0;
  });

  const location = destination || hotels[0]?.address.split(",").slice(-2).join(",").trim();

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <div>
          <p className="text-lg font-bold text-neutral-900 sm:text-xl">
            {hotels.length} hotels found
          </p>
          {location && <p className="mt-0.5 text-[13px] text-neutral-500 sm:text-[14px]">{location}</p>}
        </div>

        <div className="flex items-center gap-2">
          {onOpenFilters && (
            <button
              type="button"
              onClick={onOpenFilters}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 text-[14px] font-semibold text-neutral-900 shadow-[0_2px_8px_rgba(0,0,0,0.06)] sm:flex-none lg:hidden"
            >
              <SlidersHorizontal className="size-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-brand-blue text-[11px] font-semibold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          )}

          <div ref={sortRef} className="relative flex-1 sm:flex-none">
            <button
              type="button"
              onClick={() => setSortOpen((open) => !open)}
              aria-expanded={sortOpen}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-[14px] font-medium text-neutral-700 sm:w-auto sm:justify-start"
            >
              <span className="truncate">Sort: {sortBy}</span>
              <ChevronDown className={cn("size-4 shrink-0 transition-transform", sortOpen && "rotate-180")} />
            </button>

            {sortOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-56 rounded-xl border border-neutral-100 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSortBy(option);
                      setSortOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center rounded-lg px-3 py-2.5 text-left text-[14px] font-medium transition-colors hover:bg-neutral-100",
                      sortBy === option ? "text-brand-blue" : "text-neutral-700"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:mt-6 sm:gap-5">
        {sortedHotels.length === 0 ? (
          <div className="rounded-2xl border border-neutral-100 bg-white p-10 text-center text-[14px] text-neutral-500">
            No hotels found.
          </div>
        ) : (
          sortedHotels.map((hotel) => (
            <HotelResultCard key={hotel.id} hotel={hotel} stayParams={stayParams} />
          ))
        )}
      </div>
    </div>
  );
}
