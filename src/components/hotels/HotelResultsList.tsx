"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
}: {
  hotels: HotelSearchResult[];
  stayParams: StayParams;
  destination?: string;
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xl font-bold text-neutral-900">{hotels.length} hotels found</p>
          {location && <p className="mt-0.5 text-[14px] text-neutral-500">{location}</p>}
        </div>

        <div ref={sortRef} className="relative">
          <button
            type="button"
            onClick={() => setSortOpen((open) => !open)}
            aria-expanded={sortOpen}
            className="flex h-11 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-[14px] font-medium text-neutral-700"
          >
            Sort: {sortBy}
            <ChevronDown className={cn("size-4 transition-transform", sortOpen && "rotate-180")} />
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

      <div className="mt-6 flex flex-col gap-5">
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
