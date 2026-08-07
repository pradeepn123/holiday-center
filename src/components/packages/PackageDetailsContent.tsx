"use client";

import { useState } from "react";
import { BedDouble } from "lucide-react";
import { StarRating } from "@/components/ui/Star";
import { cn } from "@/lib/utils";
import type { TourPackage } from "@/types";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-28 rounded-2xl border border-neutral-100 bg-white p-6">
      <p className="text-[17px] font-bold text-neutral-900">{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function PackageDetailsContent({ pkg }: { pkg: TourPackage }) {
  const [activeDay, setActiveDay] = useState(1);
  const days = Array.from({ length: pkg.days + pkg.nights - 1 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-4">
      <Section id="overview" title="Overview">
        <ul className="flex flex-col gap-2 text-[14px] leading-relaxed text-neutral-600 [&>li]:list-disc [&>li]:ml-4">
          <li>
            Get ready to explore {pkg.place} on this {pkg.days} days {pkg.nights} nights journey
            through {pkg.title}.
          </li>
          <li>
            On your first day, reach the pickup location and meet your guide before setting off on
            the trip.
          </li>
          <li>Enjoy curated activities including {pkg.activities.join(", ")} along the way.</li>
          <li>
            Explore the region&apos;s must-see landmarks and local experiences with a small group of
            fellow travellers.
          </li>
        </ul>
      </Section>

      <Section id="itinerary" title="Itinerary">
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setActiveDay(day)}
              className={cn(
                "rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors",
                activeDay === day
                  ? "bg-brand-blue text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              )}
            >
              Day {day}
            </button>
          ))}
        </div>

        <p className="mt-4 text-[15px] font-bold text-neutral-900">
          {activeDay === 1 ? "Arrival" : activeDay === days.length ? "Departure" : `Explore ${pkg.place}`}
        </p>
        <p className="mt-1 text-[14px] leading-relaxed text-neutral-600">
          {activeDay === 1
            ? `Transfer from the airport to your hotel in ${pkg.place} with a private car.`
            : activeDay === days.length
              ? `Enjoy a final morning at leisure before your transfer back to the airport.`
              : `Guided sightseeing and activities around ${pkg.place}, with free time to explore at your own pace.`}
        </p>

        <div className="mt-4 flex items-center gap-2 text-[13px] text-neutral-500">
          <BedDouble className="size-3.5 shrink-0" />
          <span className="font-medium text-neutral-900">{pkg.place} Boulevard Hotel</span>
          <StarRating rating={4} />
        </div>
      </Section>

      <Section id="dates-prices" title="Dates & Prices">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-[13px]">
            <thead>
              <tr className="text-neutral-500">
                <th className="pb-2 font-medium">From Date</th>
                <th className="pb-2 font-medium">To Date</th>
                <th className="pb-2 font-medium">Per Adult (USD)</th>
                <th className="pb-2 font-medium">Per Child (USD)</th>
              </tr>
            </thead>
            <tbody className="border-t border-neutral-100 text-neutral-900">
              <tr>
                <td className="py-2.5">2026-06-26</td>
                <td className="py-2.5">2026-07-{String(2 + pkg.nights).padStart(2, "0")}</td>
                <td className="py-2.5">{pkg.price.toFixed(2)}</td>
                <td className="py-2.5">{Math.round(pkg.price * 0.5).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="inclusions" title="Inclusions">
        <p className="text-[14px] leading-relaxed text-neutral-600">
          Accommodation for {pkg.nights} nights, daily breakfast, airport transfers, a dedicated
          local guide, and entry fees for all activities listed in the itinerary are included in
          this package.
        </p>
      </Section>

      <Section id="trip-notes" title="Trip Notes">
        <p className="text-[14px] leading-relaxed text-neutral-600">
          Please carry a valid photo ID and any required travel documents. Comfortable footwear is
          recommended for activity days, and itinerary timings may vary slightly due to weather or
          local conditions.
        </p>
      </Section>

      <Section id="terms-conditions" title="Terms &amp; Conditions">
        <p className="text-[14px] leading-relaxed text-neutral-600">
          Prices are per person based on double occupancy and are subject to availability at the
          time of booking. Cancellations made within 7 days of travel are non-refundable. Please
          contact our support team for full terms.
        </p>
      </Section>
    </div>
  );
}
