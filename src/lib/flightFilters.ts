import { estimateTransitMinutes, timeSlotFor } from "@/lib/flightsData";
import type { FlightResult } from "@/types";

export const DURATION_MAX_HOURS = 26;

export type FlightFilterState = {
  selectedStops: Set<string>;
  selectedLuggage: Set<string>;
  durationRange: { min: number; max: number };
  transitRange: { min: number; max: number };
  departureSlots: Set<string>;
  arrivalSlots: Set<string>;
  selectedRefundable: Set<string>;
  selectedAirlines: Set<string>;
};

export function createDefaultFlightFilters(): FlightFilterState {
  return {
    selectedStops: new Set(),
    selectedLuggage: new Set(),
    durationRange: { min: 0, max: DURATION_MAX_HOURS },
    transitRange: { min: 0, max: DURATION_MAX_HOURS },
    departureSlots: new Set(),
    arrivalSlots: new Set(),
    selectedRefundable: new Set(),
    selectedAirlines: new Set(),
  };
}

const STOPS_PREDICATES: Record<string, (stops: number) => boolean> = {
  Direct: (stops) => stops === 0,
  "Up to 1 stop": (stops) => stops <= 1,
  "Up to 2 stop": (stops) => stops <= 2,
};

export function applyFlightFilters(flights: FlightResult[], filters: FlightFilterState): FlightResult[] {
  return flights.filter((flight) => {
    const leg = flight.outbound;

    if (filters.selectedStops.size > 0) {
      const matchesStops = Array.from(filters.selectedStops).some((option) =>
        STOPS_PREDICATES[option]?.(leg.stops)
      );
      if (!matchesStops) return false;
    }

    if (filters.selectedLuggage.size > 0 && !filters.selectedLuggage.has(flight.luggage)) {
      return false;
    }

    const durationHours = leg.durationMinutes / 60;
    if (durationHours < filters.durationRange.min || durationHours > filters.durationRange.max) {
      return false;
    }

    const transitHours = estimateTransitMinutes(leg.stops) / 60;
    if (transitHours < filters.transitRange.min || transitHours > filters.transitRange.max) {
      return false;
    }

    if (filters.departureSlots.size > 0 && !filters.departureSlots.has(timeSlotFor(leg.departureTime))) {
      return false;
    }

    if (filters.arrivalSlots.size > 0 && !filters.arrivalSlots.has(timeSlotFor(leg.arrivalTime))) {
      return false;
    }

    if (filters.selectedRefundable.size > 0) {
      const label = flight.refundable ? "Refundable" : "Non Refundable";
      if (!filters.selectedRefundable.has(label)) return false;
    }

    if (filters.selectedAirlines.size > 0 && !filters.selectedAirlines.has(leg.airline)) {
      return false;
    }

    return true;
  });
}
