"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ActivityResult } from "@/types";

const TABS = ["Activities", "Highlights", "Activity Details"] as const;
type Tab = (typeof TABS)[number];

const ACTIVITY_HIGHLIGHTS = [
  "Skip the ticket line and head straight to the entrance",
  "Enjoy sweeping panoramic views from one of the tallest attractions in the city",
  "Flexible ticket options with free cancellation available",
  "Perfect for families, couples and solo travellers alike",
  "Professional guides and staff on hand throughout your visit",
];

type ActivityOption = {
  id: string;
  image: string;
  type: string;
  price: number;
};

function buildOptions(activity: ActivityResult): ActivityOption[] {
  return activity.gallery.slice(0, 3).map((image, index) => ({
    id: `${activity.id}-option-${index + 1}`,
    image,
    type: "Shared tour without quad bike",
    price: 65,
  }));
}

function ChooseDateSelect() {
  return (
    <div className="relative">
      <select
        defaultValue=""
        aria-label="Choose date"
        className="h-11 w-full appearance-none rounded-lg border border-neutral-200 bg-white px-3 pr-8 text-[14px] text-neutral-500 outline-none"
      >
        <option value="" disabled>
          Choose Date
        </option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
    </div>
  );
}

function OptionPrice({ price }: { price: number }) {
  return (
    <div>
      <p className="text-[12px] text-neutral-400">Total Price</p>
      <p className="text-[16px] font-bold text-neutral-900">USD {price.toFixed(2)}</p>
    </div>
  );
}

export function ActivityDetailsTabs({ activity }: { activity: ActivityResult }) {
  const [activeTab, setActiveTab] = useState<Tab>("Activities");
  const options = buildOptions(activity);

  return (
    <div>
      <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto rounded-[12px] border border-neutral-100 bg-white px-4 py-3 sm:flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-[4px] px-5 py-2.5 text-[14px] font-semibold transition-colors",
              activeTab === tab ? "bg-brand-blue text-white" : "text-neutral-600 hover:bg-neutral-100"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "Activities" && (
          <>
            <div className="flex flex-col gap-4 lg:hidden">
              {options.map((option) => (
                <div
                  key={option.id}
                  className="overflow-hidden rounded-2xl border border-neutral-100 bg-white"
                >
                  <div className="relative h-[160px] w-full">
                    <Image
                      src={option.image}
                      alt={option.type}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[15px] font-bold text-brand-blue">{option.type}</p>
                    <div className="mt-3">
                      <ChooseDateSelect />
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-4 border-t border-neutral-100 pt-3">
                      <OptionPrice price={option.price} />
                      <button
                        type="button"
                        className="flex h-12 shrink-0 items-center justify-center rounded-[8px] bg-brand-blue px-6 text-[14px] font-semibold text-white transition-transform active:scale-[0.97]"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden overflow-hidden rounded-2xl border border-neutral-200 bg-white lg:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] table-fixed border-collapse text-left">
                  <colgroup>
                    <col className="w-[22.24%]" />
                    <col className="w-[26.76%]" />
                    <col className="w-[20.90%]" />
                    <col className="w-[30.10%]" />
                  </colgroup>
                  <thead>
                    <tr className="bg-[#2C341D] text-white">
                      <th className="border border-white/10 px-4 py-4 text-[13px] font-semibold">
                        Activities image
                      </th>
                      <th className="border border-white/10 px-5 py-4 text-[13px] font-semibold">
                        Activates Type
                      </th>
                      <th className="border border-white/10 px-5 py-4 text-[13px] font-semibold">
                        Choose date
                      </th>
                      <th className="border border-white/10 px-5 py-4 text-[13px] font-semibold">
                        Price Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {options.map((option) => (
                      <tr key={option.id}>
                        <td className="border border-neutral-200 p-2 align-top">
                          <div className="relative h-[140px] w-full overflow-hidden rounded-lg">
                            <Image
                              src={option.image}
                              alt={option.type}
                              fill
                              sizes="266px"
                              className="object-cover"
                            />
                          </div>
                        </td>
                        <td className="border border-neutral-200 p-5 align-top">
                          <p className="text-[15px] font-bold text-brand-blue">{option.type}</p>
                        </td>
                        <td className="border border-neutral-200 p-3 align-top">
                          <ChooseDateSelect />
                        </td>
                        <td className="border border-neutral-200 p-5 align-top">
                          <div className="flex w-full items-center justify-between gap-4">
                            <OptionPrice price={option.price} />
                            <button
                              type="button"
                              className="flex h-11 shrink-0 items-center justify-center rounded-[8px] bg-brand-blue px-6 text-[14px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
                            >
                              Book Now
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "Highlights" && (
          <div className="rounded-2xl border border-neutral-100 bg-white p-6">
            <p className="text-[18px] font-bold text-neutral-900">Highlights</p>
            <div className="mt-4 flex flex-col gap-3">
              {ACTIVITY_HIGHLIGHTS.map((highlight) => (
                <div key={highlight} className="flex items-start gap-2.5 text-[14px] text-neutral-700">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Activity Details" && (
          <div className="rounded-2xl border border-neutral-100 bg-white p-6">
            <p className="text-[18px] font-bold text-neutral-900">{activity.title}</p>

            <div className="mt-4">
              <p className="text-[15px] font-bold text-neutral-900">About this activity</p>
              <p className="mt-1 max-w-3xl text-[14px] leading-relaxed text-neutral-600">
                {activity.title} is one of {activity.location}&apos;s most popular attractions,
                offering an unforgettable experience for visitors of all ages. This{" "}
                {activity.durationType.toLowerCase()} experience typically runs for{" "}
                {activity.durationLabel.toLowerCase()}, giving you plenty of time to explore and
                enjoy every moment.
              </p>
            </div>

            <div className="mt-5">
              <p className="text-[15px] font-bold text-neutral-900">Know before you go</p>
              <p className="mt-1 max-w-3xl text-[14px] leading-relaxed text-neutral-600">
                Please arrive at least 15 minutes before your selected time slot. Comfortable
                footwear is recommended. Tickets are non-transferable and a valid photo ID may be
                required at entry.
              </p>
            </div>

            <div className="mt-5">
              <p className="text-[15px] font-bold text-neutral-900">Cancellation Policy</p>
              <p className="mt-1 max-w-3xl text-[14px] leading-relaxed text-neutral-600">
                {activity.freeCancellation
                  ? "Free cancellation is available up to 24 hours before the scheduled activity for a full refund."
                  : "This activity is non-refundable once booked."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
