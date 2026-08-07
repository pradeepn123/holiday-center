"use client";

import { useRef, useState } from "react";
import { Calendar, Clock, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { PackageInquiryModal } from "@/components/packages/PackageInquiryModal";
import type { TourPackage } from "@/types";

const INCLUSION_TABS = ["Hotel", "Flight", "Transfers", "Meals"];

function Counter({
  value,
  onDecrease,
  onIncrease,
}: {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onDecrease}
        disabled={value <= 0}
        className="flex size-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="w-4 text-center text-[14px] font-semibold text-neutral-900">{value}</span>
      <button
        type="button"
        onClick={onIncrease}
        className="flex size-8 items-center justify-center rounded-full bg-brand-blue text-white transition-colors hover:bg-brand-blue-dark"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}

export function PackageBookingSidebar({ pkg }: { pkg: TourPackage }) {
  const [inclusion, setInclusion] = useState(INCLUSION_TABS[0]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [travelDate, setTravelDate] = useState("");
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const total = pkg.price * adults + Math.round(pkg.price * 0.5) * children;

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6 lg:sticky lg:top-24">
      <p className="text-[18px] font-bold text-neutral-900">{pkg.title}</p>
      <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-neutral-500">
        <Clock className="size-3.5 shrink-0" />
        {pkg.days} days &amp; {pkg.nights} nights
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {INCLUSION_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setInclusion(tab)}
            className={cn(
              "rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors",
              inclusion === tab
                ? "bg-brand-blue text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <p className="mt-5 text-[14px] font-semibold text-neutral-900">Add Travellers</p>
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[14px] text-neutral-600">Adult (12+)</span>
          <Counter value={adults} onDecrease={() => setAdults((v) => Math.max(1, v - 1))} onIncrease={() => setAdults((v) => v + 1)} />
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[14px] text-neutral-600">Child (2-11)</span>
          <Counter value={children} onDecrease={() => setChildren((v) => Math.max(0, v - 1))} onIncrease={() => setChildren((v) => v + 1)} />
        </div>
      </div>

      <p className="mt-5 text-[14px] font-semibold text-neutral-900">Date Of Travel</p>
      <div
        onClick={() => {
          try {
            dateInputRef.current?.showPicker?.();
          } catch {
            dateInputRef.current?.focus();
          }
        }}
        className="relative mt-3 flex h-11 cursor-pointer items-center rounded-xl border border-neutral-200 px-3"
      >
        <input
          ref={dateInputRef}
          type="date"
          value={travelDate}
          onChange={(event) => setTravelDate(event.target.value)}
          aria-label="Date of travel"
          className="w-full min-w-0 flex-1 cursor-pointer bg-transparent text-[14px] text-neutral-900 outline-none [color-scheme:light] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
        />
        <Calendar className="size-4 shrink-0 text-neutral-400" />
      </div>

      <div className="mt-5 border-t border-neutral-100 pt-4">
        <p className="text-[13px] text-neutral-500">Total Amount</p>
        <p className="mt-0.5 text-[20px] font-bold text-neutral-900">USD {total.toFixed(2)}</p>
      </div>

      <button
        type="button"
        onClick={() => setIsInquiryOpen(true)}
        className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-brand-blue text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
      >
        Send Inquiry
      </button>

      {isInquiryOpen && (
        <PackageInquiryModal
          pkg={pkg}
          total={total}
          travelDate={travelDate}
          onClose={() => setIsInquiryOpen(false)}
        />
      )}
    </div>
  );
}
