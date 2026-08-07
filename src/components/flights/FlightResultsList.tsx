"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Coins, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FlightSearchParams } from "@/lib/flightParams";
import type { FlightResult } from "@/types";
import { FlightResultCard } from "./FlightResultCard";

const SORT_OPTIONS = [
  { value: "airline", iconSrc: "/assets/icons/sortby_airline.svg", label: "Airline", hint: "A to Z" },
  { value: "depart", iconSrc: "/assets/icons/sortby_depart.svg", label: "Depart", hint: "low to high" },
  { value: "arrive", iconSrc: "/assets/icons/sortby_arrive.svg", label: "Arrive", hint: "low to high" },
  { value: "duration", iconSrc: "/assets/icons/sortby_duration.svg", label: "Duration", hint: "low to high" },
  { value: "price", iconSrc: null, label: "Price", hint: "low to high" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export function FlightResultsList({
  flights,
  searchParams,
  onOpenFilters,
  activeFilterCount = 0,
}: {
  flights: FlightResult[];
  searchParams: FlightSearchParams;
  onOpenFilters?: () => void;
  activeFilterCount?: number;
}) {
  const [sortBy, setSortBy] = useState<SortValue>("price");

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === "airline") return a.outbound.airline.localeCompare(b.outbound.airline);
    if (sortBy === "depart") return a.outbound.departureTime.localeCompare(b.outbound.departureTime);
    if (sortBy === "arrive") return a.outbound.arrivalTime.localeCompare(b.outbound.arrivalTime);
    if (sortBy === "duration") return a.outbound.durationMinutes - b.outbound.durationMinutes;
    return a.price - b.price;
  });

  return (
    <div>
      {onOpenFilters && (
        <button
          type="button"
          onClick={onOpenFilters}
          className="mb-3 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 text-[14px] font-semibold text-neutral-900 shadow-[0_2px_8px_rgba(0,0,0,0.06)] lg:hidden"
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

      <div className="flex w-full gap-3 overflow-x-auto rounded-[8px] border border-neutral-100 bg-white p-2 sm:flex-wrap sm:overflow-visible">
        {SORT_OPTIONS.map(({ value, iconSrc, label, hint }) => {
          const isActive = sortBy === value;
          return (
            <div key={value} className="w-[190px] shrink-0 sm:w-auto sm:min-w-[150px] sm:flex-1">
              <button
                type="button"
                onClick={() => setSortBy(value)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-[4px] border border-neutral-100 px-4 py-3 text-left transition-colors",
                  isActive
                    ? "border-b-[3px] border-b-brand-blue bg-[#6A6A6A1A]"
                    : "bg-white hover:bg-neutral-50"
                )}
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg",
                    isActive ? "bg-brand-blue text-white" : "bg-neutral-100 text-neutral-500"
                  )}
                >
                  {iconSrc ? (
                    <Image
                      src={iconSrc}
                      alt=""
                      width={16}
                      height={16}
                      className={cn(isActive && "brightness-0 invert")}
                    />
                  ) : (
                    <Coins className="size-4" />
                  )}
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[15px] font-semibold text-neutral-900">
                    {label}
                  </span>
                  <span className="block truncate text-[12px] text-neutral-400">{hint}</span>
                </span>
                <ChevronDown
                  className={cn("size-4 shrink-0", isActive ? "text-brand-blue" : "text-neutral-400")}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-5">
        {sortedFlights.length === 0 ? (
          <div className="rounded-2xl border border-neutral-100 bg-white p-10 text-center text-[14px] text-neutral-500">
            No flights found.
          </div>
        ) : (
          sortedFlights.map((flight) => (
            <FlightResultCard key={flight.id} result={flight} searchParams={searchParams} />
          ))
        )}
      </div>
    </div>
  );
}
