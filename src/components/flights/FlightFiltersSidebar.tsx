"use client";

import Image from "next/image";
import { Moon, RotateCcw, Sun, Sunrise, Sunset } from "lucide-react";
import { FilterSection, toggleInSet } from "@/components/ui/FilterSection";
import { flightAirlines, flightLuggageOptions, flightTimeSlots } from "@/lib/flightsData";
import { createDefaultFlightFilters, DURATION_MAX_HOURS, type FlightFilterState } from "@/lib/flightFilters";
import { cn } from "@/lib/utils";

const STOP_OPTIONS = ["Direct", "Up to 1 stop", "Up to 2 stop"];
const REFUNDABLE_OPTIONS = ["Refundable", "Non Refundable"];

const TIME_SLOT_ICONS = {
  "12AM - 6AM": Moon,
  "6AM - 12PM": Sunrise,
  "12PM - 6PM": Sun,
  "6PM - 12AM": Sunset,
} as const;

export function FlightFiltersSidebar({
  filters,
  onFiltersChange,
}: {
  filters: FlightFilterState;
  onFiltersChange: (updater: (prev: FlightFilterState) => FlightFilterState) => void;
}) {
  function resetFilters() {
    onFiltersChange(createDefaultFlightFilters);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between rounded-[8px] border border-[#0000001A] bg-white px-4 py-3.5">
        <span className="flex items-center gap-2 text-[16px] font-bold text-neutral-900">
          <Image src="/assets/icons/filter_icon.svg" alt="" width={18} height={18} />
          Flitter
        </span>
        <button
          type="button"
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-brand-blue transition-colors hover:text-brand-blue/80"
        >
          <RotateCcw className="size-3.5" />
          Reset
        </button>
      </div>

      <div className="flex flex-col gap-2 lg:max-h-[calc(100vh-17rem)] lg:overflow-y-auto lg:pr-1">
        <FilterSection title="No. of Stops">
          <div className="flex flex-col gap-2">
            {STOP_OPTIONS.map((option) => (
              <label key={option} className="flex cursor-pointer items-center justify-between gap-3">
                <span className="text-[14px] text-neutral-700">{option}</span>
                <input
                  type="checkbox"
                  checked={filters.selectedStops.has(option)}
                  onChange={() =>
                    onFiltersChange((prev) => ({
                      ...prev,
                      selectedStops: toggleInSet(prev.selectedStops, option),
                    }))
                  }
                  className="size-[18px] shrink-0 rounded-md border-neutral-300 text-brand-blue focus:ring-brand-blue"
                />
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Luggage">
          <div className="grid grid-cols-1 gap-x-3 gap-y-2">
            {flightLuggageOptions.map((option) => (
              <label key={option} className="flex cursor-pointer items-center justify-between gap-2">
                <span className="text-[14px] text-neutral-700">{option}</span>
                <input
                  type="checkbox"
                  checked={filters.selectedLuggage.has(option)}
                  onChange={() =>
                    onFiltersChange((prev) => ({
                      ...prev,
                      selectedLuggage: toggleInSet(prev.selectedLuggage, option),
                    }))
                  }
                  className="size-[18px] shrink-0 rounded-md border-neutral-300 text-brand-blue focus:ring-brand-blue"
                />
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Duration Time">
          <div className="flex flex-col gap-6">
            <DurationSlider
              label="Duration Time"
              min={filters.durationRange.min}
              max={filters.durationRange.max}
              onChange={(durationRange) => onFiltersChange((prev) => ({ ...prev, durationRange }))}
            />
            <DurationSlider
              label="Transit Time"
              min={filters.transitRange.min}
              max={filters.transitRange.max}
              onChange={(transitRange) => onFiltersChange((prev) => ({ ...prev, transitRange }))}
            />
          </div>
        </FilterSection>

        <FilterSection title="Time">
          <div className="flex flex-col gap-5">
            <TimeSlotGroup
              label="Departure"
              selected={filters.departureSlots}
              onToggle={(slot) =>
                onFiltersChange((prev) => ({
                  ...prev,
                  departureSlots: toggleInSet(prev.departureSlots, slot),
                }))
              }
            />
            <TimeSlotGroup
              label="Arrival"
              selected={filters.arrivalSlots}
              onToggle={(slot) =>
                onFiltersChange((prev) => ({
                  ...prev,
                  arrivalSlots: toggleInSet(prev.arrivalSlots, slot),
                }))
              }
            />
          </div>
        </FilterSection>

        <FilterSection title="Refundable Type">
          <div className="flex flex-col gap-2">
            {REFUNDABLE_OPTIONS.map((option) => (
              <label key={option} className="flex cursor-pointer items-center justify-between gap-3">
                <span className="text-[14px] text-neutral-700">{option}</span>
                <input
                  type="checkbox"
                  checked={filters.selectedRefundable.has(option)}
                  onChange={() =>
                    onFiltersChange((prev) => ({
                      ...prev,
                      selectedRefundable: toggleInSet(prev.selectedRefundable, option),
                    }))
                  }
                  className="size-[18px] shrink-0 rounded-md border-neutral-300 text-brand-blue focus:ring-brand-blue"
                />
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Airlines">
          <div className="flex flex-col gap-2">
            {flightAirlines.map((airline) => (
              <label key={airline.code} className="flex cursor-pointer items-center justify-between gap-3">
                <span className="text-[14px] text-neutral-700">{airline.name}</span>
                <input
                  type="checkbox"
                  checked={filters.selectedAirlines.has(airline.name)}
                  onChange={() =>
                    onFiltersChange((prev) => ({
                      ...prev,
                      selectedAirlines: toggleInSet(prev.selectedAirlines, airline.name),
                    }))
                  }
                  className="size-[18px] shrink-0 rounded-md border-neutral-300 text-brand-blue focus:ring-brand-blue"
                />
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Connecting Flights" defaultOpen={false}>
          <p className="text-[13px] text-neutral-500">
            No connecting flight preferences set for this route.
          </p>
        </FilterSection>

        <FilterSection title="Connecting Airports" defaultOpen={false}>
          <p className="text-[13px] text-neutral-500">
            No connecting airport preferences set for this route.
          </p>
        </FilterSection>
      </div>
    </div>
  );
}

function DurationSlider({
  label,
  min,
  max,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  onChange: (range: { min: number; max: number }) => void;
}) {
  const minPercent = (min / DURATION_MAX_HOURS) * 100;
  const maxPercent = (max / DURATION_MAX_HOURS) * 100;

  return (
    <div>
      <p className="text-[14px] font-semibold text-neutral-700">{label}</p>
      <div className="relative mt-4 h-1.5 rounded-full bg-neutral-200">
        <div
          className="absolute h-1.5 rounded-full bg-brand-blue"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        <input
          type="range"
          min={0}
          max={DURATION_MAX_HOURS}
          value={min}
          onChange={(event) => onChange({ min: Math.min(Number(event.target.value), max - 1), max })}
          aria-label={`${label} minimum`}
          className="range-thumb pointer-events-none absolute inset-x-0 -top-2.5 h-6 w-full appearance-none bg-transparent"
        />
        <input
          type="range"
          min={0}
          max={DURATION_MAX_HOURS}
          value={max}
          onChange={(event) => onChange({ min, max: Math.max(Number(event.target.value), min + 1) })}
          aria-label={`${label} maximum`}
          className="range-thumb pointer-events-none absolute inset-x-0 -top-2.5 h-6 w-full appearance-none bg-transparent"
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-[13px] font-medium text-neutral-500">
        <span>{min}hr</span>
        <span>{max}hr</span>
      </div>
    </div>
  );
}

function TimeSlotGroup({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: Set<string>;
  onToggle: (slot: string) => void;
}) {
  return (
    <div>
      <p className="text-[14px] font-semibold text-neutral-700">{label}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {flightTimeSlots.map((slot) => {
          const isActive = selected.has(slot);
          const Icon = TIME_SLOT_ICONS[slot];
          return (
            <button
              key={slot}
              type="button"
              onClick={() => onToggle(slot)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-[13px] font-medium transition-colors",
                isActive
                  ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
                  : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}
