"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFlightItinerary, stopsLabel } from "@/lib/flightsData";
import type { FlightLeg, FlightResult } from "@/types";

const TABS = ["Flight Details", "Fare Breakdown", "Fare Rules", "Baggage Info"] as const;
type Tab = (typeof TABS)[number];

export function FlightDetailsModal({
  result,
  bookingHref,
  onClose,
}: {
  result: FlightResult;
  bookingHref: string;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("Flight Details");
  const hasDiscount = typeof result.originalPrice === "number";

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[88vh] w-full max-w-[640px] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[85vh] sm:rounded-2xl"
      >
        <div className="flex items-center gap-3 border-b border-neutral-100 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
          <div className="scrollbar-hide flex flex-1 items-center gap-2 overflow-x-auto sm:flex-wrap">
            {TABS.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors sm:text-[14px]",
                    isActive
                      ? "border-brand-blue text-brand-blue"
                      : "border-transparent text-neutral-500 hover:text-neutral-700"
                  )}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-neutral-700"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          {activeTab === "Flight Details" && (
            <div className="flex flex-col gap-6">
              <FlightLegSection leg={result.outbound} label="Departure" />
              {result.return && (
                <>
                  <div className="border-t border-neutral-100" />
                  <FlightLegSection leg={result.return} label="Arrival" />
                </>
              )}
            </div>
          )}
          {activeTab === "Fare Breakdown" && <FareBreakdownPanel result={result} />}
          {activeTab === "Fare Rules" && <FareRulesPanel />}
          {activeTab === "Baggage Info" && <BaggageInfoPanel result={result} />}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-neutral-100 bg-[#F9FAFB] px-4 py-3 sm:px-6 sm:py-4">
          <div>
            <div className="flex items-baseline gap-2">
              <p className="text-lg font-bold text-brand-blue sm:text-xl">
                USD {result.price.toFixed(2)}
              </p>
              {hasDiscount && (
                <span className="text-[13px] text-neutral-400 line-through sm:text-[14px]">
                  USD {result.originalPrice!.toFixed(2)}
                </span>
              )}
            </div>
            <p
              className={cn(
                "text-[13px] font-medium",
                result.refundable ? "text-green-600" : "text-red-500"
              )}
            >
              {result.refundable ? "Refundable" : "Non Refundable"}
            </p>
          </div>

          <Link
            href={bookingHref}
            className="flex h-12 shrink-0 items-center justify-center rounded-[8px] bg-brand-blue px-6 text-[14px] font-semibold text-white transition-transform active:scale-[0.97] sm:h-11 sm:transition-colors sm:hover:bg-brand-blue-dark sm:active:scale-100"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}

function FlightLegSection({ leg, label }: { leg: FlightLeg; label: string }) {
  const itinerary = getFlightItinerary(leg);

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[16px] font-bold text-neutral-900">
            {leg.origin} ({leg.originCode}) to {leg.destination} ({leg.destinationCode})
          </p>
          <p className="mt-1 text-[13px] text-neutral-500">{stopsLabel(leg.stops)} · Economy</p>
        </div>
        <span className="shrink-0 text-[13px] text-neutral-400">{label}</span>
      </div>

      <div className="mt-4 flex flex-col gap-5">
        {itinerary.segments.map((segment, index) => {
          const isFinalSegment = index === itinerary.segments.length - 1;
          return (
            <div key={index}>
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/icons/airline_logo.png"
                  alt={segment.airline}
                  width={56}
                  height={20}
                  className="h-[18px] w-auto object-contain"
                />
                <span className="text-[13px] text-neutral-500">
                  {segment.airline} {segment.flightNumber}
                </span>
              </div>

              <div className="mt-3 flex flex-col">
                <div className="relative border-l-2 border-dotted border-brand-blue pb-6 pl-6">
                  <span className="absolute -left-[5px] top-0 size-2.5 rounded-full bg-brand-blue" />
                  <span
                    className={cn(
                      "absolute -left-[5px] bottom-0 size-2.5 rounded-full",
                      isFinalSegment ? "bg-green-500" : "bg-brand-blue"
                    )}
                  />

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[20px] font-bold leading-tight text-neutral-900">
                        {segment.departureTime}
                      </p>
                      <p className="mt-1 text-[15px] text-[#050B0C]">{segment.departureDate}</p>
                      <p className="text-[13px] text-neutral-500">
                        {segment.departureCity} ({segment.departureCode})
                      </p>
                      <p className="text-[13px] text-neutral-500">
                        {segment.departureAirport} |{" "}
                        <span className="text-brand-blue">Terminal: {segment.departureTerminal}</span>
                      </p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1.5 text-[12px] font-medium text-red-500">
                      <Clock className="size-3.5" />
                      {segment.durationLabel}
                    </span>
                  </div>
                </div>

                <div className="pl-6">
                  <p className="text-[20px] font-bold leading-tight text-neutral-900">
                    {segment.arrivalTime}
                  </p>
                  <p className="mt-1 text-[15px] text-[#050B0C]">{segment.arrivalDate}</p>
                  <p className="text-[13px] text-neutral-500">
                    {segment.arrivalCity} ({segment.arrivalCode})
                  </p>
                  <p className="text-[13px] text-neutral-500">
                    {segment.arrivalAirport} |{" "}
                    <span className="text-brand-blue">Terminal: {segment.arrivalTerminal}</span>
                  </p>
                </div>
              </div>

              {itinerary.layovers[index] && (
                <div className="mt-4 rounded-xl bg-neutral-50 px-4 py-3 text-[13px]">
                  <span className="font-semibold text-red-500">Layover Duration</span>{" "}
                  <span className="text-neutral-700">
                    {itinerary.layovers[index].city} ({itinerary.layovers[index].code}){" "}
                    {itinerary.layovers[index].durationLabel}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FareBreakdownPanel({ result }: { result: FlightResult }) {
  const passengers = 1;
  const tax = Math.round(result.price * 0.13 * 100) / 100;
  const basicFare = result.price - tax;

  return (
    <div>
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <p className="text-[15px] font-bold text-neutral-900">Fare Description (USD)</p>
        <p className="text-[15px] font-bold text-neutral-900">Adults</p>
      </div>

      <div className="flex flex-col gap-3 py-4 text-[14px]">
        <div className="flex items-center justify-between">
          <span className="text-neutral-600">Basic Fare</span>
          <span className="font-semibold text-neutral-900">{basicFare.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-neutral-600">Tax</span>
          <span className="font-semibold text-neutral-900">{tax.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-neutral-600">No. of Passengers</span>
          <span className="font-semibold text-neutral-900">X{passengers}</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
        <span className="text-[16px] font-bold text-neutral-900">Total</span>
        <span className="text-[16px] font-bold text-neutral-900">{result.price.toFixed(2)}</span>
      </div>
    </div>
  );
}

function FareRulesPanel() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[16px] font-bold text-neutral-900">Application and other conditions</p>
      <p className="text-[14px] leading-relaxed text-neutral-600">
        Fare changes are subject to airline approval and a change fee may apply. Cancellations
        made within 24 hours of departure are non-refundable, and name changes are not permitted
        once a booking is confirmed.
      </p>
      <p className="text-[14px] leading-relaxed text-neutral-600">
        Fare rules vary by airline and fare class, and are subject to change without prior
        notice. Please review the fare conditions carefully before completing your booking, as
        the same rules apply to all passengers travelling on this itinerary.
      </p>
    </div>
  );
}

function BaggageInfoPanel({ result }: { result: FlightResult }) {
  const routes = [{ leg: result.outbound }, ...(result.return ? [{ leg: result.return }] : [])];

  return (
    <div className="flex flex-col gap-6">
      {routes.map(({ leg }, index) => (
        <div key={index}>
          <p className="text-[15px] font-bold text-neutral-900">
            {leg.origin}({leg.originCode}) - {leg.destination}({leg.destinationCode})
          </p>
          <div className="mt-3 flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5 text-[14px]">
              <Image
                src="/assets/icons/baggage_icon.svg"
                alt=""
                width={16}
                height={16}
                className="size-4 shrink-0"
              />
              <span className="text-neutral-500">Carry-on</span>
              <span className="ml-auto font-semibold text-neutral-900">7 Kilograms</span>
            </div>
            <div className="flex items-center gap-2.5 text-[14px]">
              <Image
                src="/assets/icons/checked_baggage_icon.svg"
                alt=""
                width={16}
                height={16}
                className="size-4 shrink-0"
              />
              <span className="text-neutral-500">Checked -In</span>
              <span className="ml-auto font-semibold text-neutral-900">{result.luggage}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
