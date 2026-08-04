"use client";

import { useState } from "react";
import Link from "next/link";
import { buildFlightQueryString, type FlightSearchParams } from "@/lib/flightParams";
import type { FlightResult } from "@/types";
import { FlightDetailsModal } from "./FlightDetailsModal";
import { FlightLegRow } from "./FlightLegRow";

export function FlightResultCard({
  result,
  searchParams,
}: {
  result: FlightResult;
  searchParams: FlightSearchParams;
}) {
  const hasDiscount = typeof result.originalPrice === "number";
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const bookingHref = `/flights/book/${result.id}${buildFlightQueryString(searchParams)}`;

  return (
    <div className="flex flex-col gap-3 rounded-[12px] bg-white p-3 shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] lg:flex-row">
      <div className="flex flex-1 flex-col gap-5 p-3 lg:p-4">
        <FlightLegRow leg={result.outbound} />
        {result.return && (
          <>
            <div className="border-t border-neutral-100" />
            <FlightLegRow leg={result.return} />
          </>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between gap-3 border-t border-[#0000001A] p-6 lg:w-[280px] lg:border-l lg:border-t-0">
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-baseline gap-2">
            {hasDiscount && (
              <span className="text-[14px] font-normal text-[#505C59] line-through">
                USD {result.originalPrice!.toFixed(2)}
              </span>
            )}
            <p className="text-[20px] font-extrabold text-brand-blue">
              USD {result.price.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium">
            <span className={result.refundable ? "text-green-600" : "text-red-500"}>
              {result.refundable ? "Refundable" : "Non Refundable"}
            </span>
            <span className="text-neutral-400">Per Adult</span>
          </div>
        </div>

        <Link
          href={bookingHref}
          className="flex h-11 shrink-0 items-center justify-center rounded-[8px] bg-brand-blue px-6 text-[14px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
        >
          Book Now
        </Link>

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
          result={result}
          bookingHref={bookingHref}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </div>
  );
}
