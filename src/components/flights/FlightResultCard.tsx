"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { stopsLabel } from "@/lib/flightsData";
import { buildFlightQueryString, type FlightSearchParams } from "@/lib/flightParams";
import type { FlightResult } from "@/types";
import { FlightDetailsModal, type FlightDetailsTab } from "./FlightDetailsModal";
import { FlightLegRow } from "./FlightLegRow";

const BOTTOM_TABS: FlightDetailsTab[] = [
  "Flight Itinerary",
  "Fare Breakdown",
  "Fare Rules",
  "Baggage Info",
];

export function FlightResultCard({
  result,
  searchParams,
  siblings = [],
}: {
  result: FlightResult;
  searchParams: FlightSearchParams;
  siblings?: FlightResult[];
}) {
  const hasDiscount = typeof result.originalPrice === "number";
  const [modalTab, setModalTab] = useState<FlightDetailsTab | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const bookingHref = `/flights/book/${result.id}${buildFlightQueryString(searchParams)}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#0000001A] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 lg:shadow-[0_6px_24px_rgba(0,0,0,0.06)] lg:hover:border-brand-blue lg:hover:shadow-[0_16px_32px_rgba(58,78,202,0.16)]">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5 lg:p-6">
          <FlightLegRow leg={result.outbound} luggage={result.luggage} />
          {result.return && (
            <>
              <div className="border-t border-[#0000001A]" />
              <FlightLegRow leg={result.return} luggage={result.luggage} />
            </>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-start gap-3 border-t border-[#0000001A] p-4 sm:p-5 lg:w-[250px] lg:items-end lg:justify-center lg:border-l lg:border-t-0 lg:p-6">
          <div className="flex flex-col items-start gap-0.5 lg:items-end">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 lg:justify-end">
              {hasDiscount && (
                <span className="text-[13px] text-neutral-400 line-through">
                  USD {result.originalPrice!.toFixed(2)}
                </span>
              )}
              <p className="text-[20px] font-extrabold text-brand-blue lg:text-[21px]">
                USD {result.price.toFixed(2)}
              </p>
            </div>
            <p className="text-[13px]">
              <span
                className={cn(
                  "font-medium",
                  result.refundable ? "text-green-600" : "text-red-500"
                )}
              >
                {result.refundable ? "Refundable" : "Non Refundable"}
              </span>{" "}
              <span className="text-neutral-400">Per Adult</span>
            </p>
          </div>

          <Link
            href={bookingHref}
            className="flex h-11 shrink-0 items-center justify-center rounded-[10px] bg-brand-blue px-8 text-[14px] font-semibold text-white transition-transform active:scale-[0.97] lg:transition-colors lg:hover:bg-brand-blue-dark lg:active:scale-100"
          >
            Book Now
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-[#0000001A] bg-[#F4F6FC] px-4 py-2.5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="scrollbar-hide -mx-1 flex items-center gap-4 overflow-x-auto px-1 sm:gap-6 lg:gap-8">
          {BOTTOM_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setModalTab(tab)}
              className="shrink-0 whitespace-nowrap text-[13px] font-medium text-neutral-800 transition-colors hover:text-brand-blue lg:text-[14px]"
            >
              {tab}
            </button>
          ))}
        </div>

        {siblings.length > 0 && (
          <button
            type="button"
            onClick={() => setIsExpanded((value) => !value)}
            aria-expanded={isExpanded}
            className="flex shrink-0 items-center gap-1 self-start whitespace-nowrap text-[13px] font-medium text-neutral-800 transition-colors hover:text-brand-blue lg:self-auto lg:text-[14px]"
          >
            More Flights at the Same Price {siblings.length}
            <ChevronDown
              className={cn("size-4 transition-transform", isExpanded && "rotate-180")}
            />
          </button>
        )}
      </div>

      {isExpanded && siblings.length > 0 && (
        <div className="max-h-[320px] divide-y divide-[#0000001A] overflow-y-auto border-t border-[#0000001A]">
          {siblings.map((sibling) => (
            <Link
              key={sibling.id}
              href={`/flights/book/${sibling.id}${buildFlightQueryString(searchParams)}`}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-neutral-50 sm:px-6"
            >
              <Image
                src="/assets/icons/airline_logo.png"
                alt=""
                width={48}
                height={16}
                className="h-[16px] w-auto shrink-0 object-contain object-left"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-neutral-800">
                  {sibling.outbound.airline} · {sibling.outbound.flightNumber}
                </p>
                <p className="truncate text-[12px] text-neutral-500">
                  {sibling.outbound.departureTime} – {sibling.outbound.arrivalTime} ·{" "}
                  {sibling.outbound.originCode}–{sibling.outbound.destinationCode} ·{" "}
                  {stopsLabel(sibling.outbound.stops)}
                </p>
              </div>
              <p className="shrink-0 text-[14px] font-bold text-brand-blue">
                USD {sibling.price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      )}

      {modalTab && (
        <FlightDetailsModal
          result={result}
          bookingHref={bookingHref}
          initialTab={modalTab}
          onClose={() => setModalTab(null)}
        />
      )}
    </div>
  );
}
