"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FlightResult } from "@/types";
import { FlightDetailsModal } from "../FlightDetailsModal";
import { FlightLegRow } from "../FlightLegRow";

export function FlightBookingSummary({ flight }: { flight: FlightResult }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-4">
      <div className="flex flex-col gap-4">
        <FlightLegRow leg={flight.outbound} />
        {flight.return && (
          <>
            <div className="border-t border-neutral-100" />
            <FlightLegRow leg={flight.return} />
          </>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
        <span
          className={cn(
            "text-[14px] font-medium",
            flight.refundable ? "text-green-600" : "text-red-500"
          )}
        >
          {flight.refundable ? "Refundable" : "Non Refundable"}
        </span>
        <button
          type="button"
          onClick={() => setIsDetailsOpen(true)}
          className="text-[13px] font-medium text-brand-blue underline-offset-2 hover:underline"
        >
          View Flight Details
        </button>
      </div>

      {isDetailsOpen && (
        <FlightDetailsModal
          result={flight}
          bookingHref="#"
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </div>
  );
}
