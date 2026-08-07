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
    <div className="flex flex-col gap-3 rounded-[12px] bg-white p-3 shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-shadow duration-300 lg:shadow-[0_6px_24px_rgba(0,0,0,0.06)] lg:hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] lg:flex-row">
      <div className="flex flex-1 flex-col gap-5 p-2 sm:p-3 lg:p-4">
        <FlightLegRow leg={result.outbound} />
        {result.return && (
          <>
            <div className="border-t border-neutral-100" />
            <FlightLegRow leg={result.return} />
          </>
        )}
      </div>

      <div className="flex shrink-0 flex-col gap-3 border-t border-[#0000001A] p-4 lg:w-[280px] lg:items-end lg:border-l lg:border-t-0 lg:p-6">
        <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-end">
          <div className="flex flex-col items-start gap-1 lg:items-end">
            <div className="flex items-baseline gap-2">
              {hasDiscount && (
                <span className="text-[13px] font-normal text-[#505C59] line-through">
                  USD {result.originalPrice!.toFixed(2)}
                </span>
              )}
              <p className="text-[19px] font-extrabold text-brand-blue lg:text-[20px]">
                USD {result.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-medium lg:text-[13px]">
              <span className={result.refundable ? "text-green-600" : "text-red-500"}>
                {result.refundable ? "Refundable" : "Non Refundable"}
              </span>
              <span className="text-neutral-400">Per Adult</span>
            </div>
          </div>

          <Link
            href={bookingHref}
            className="flex h-12 shrink-0 items-center justify-center rounded-[8px] bg-brand-blue px-6 text-[14px] font-semibold text-white transition-transform active:scale-[0.97] lg:h-11 lg:transition-colors lg:hover:bg-brand-blue-dark lg:active:scale-100"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsDetailsOpen(true)}
          className="border-t border-dashed border-neutral-100 pt-3 text-center text-[13px] font-medium text-brand-blue underline-offset-2 hover:underline lg:border-0 lg:pt-0 lg:text-right"
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
