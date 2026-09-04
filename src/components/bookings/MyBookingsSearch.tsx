"use client";

import { useState } from "react";
import { Bed, CalendarX, Plane, RotateCcw, Search, Star, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { label: "Flight", icon: Plane },
  { label: "Hotel", icon: Bed },
  { label: "Activities", icon: Star },
] as const;

type Category = (typeof CATEGORIES)[number]["label"];

export function MyBookingsSearch() {
  const [activeCategory, setActiveCategory] = useState<Category>("Flight");
  const [reference, setReference] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleReset() {
    setReference("");
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white">
      <div className="h-1.5 w-full bg-[#224ba0]" />

      <div className="flex border-b border-[#e2e8f0] px-6 sm:px-8">
        {CATEGORIES.map((category) => {
          const isActive = category.label === activeCategory;
          return (
            <button
              key={category.label}
              type="button"
              onClick={() => setActiveCategory(category.label)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-4 text-[14px] font-semibold transition-colors",
                isActive
                  ? "border-[#224ba0] text-[#224ba0]"
                  : "border-transparent text-[#64748b] hover:text-[#334155]"
              )}
            >
              <category.icon className="size-4" />
              {category.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-6 sm:px-8">
        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-bold text-[#0f172a]">Application Reference</span>
          <div className="relative">
            <Ticket className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              placeholder="Enter Application Reference (e.g. TX-90210)"
              className="h-12 w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] pl-11 pr-4 text-[14px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#224ba0]"
            />
          </div>
        </label>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="submit"
            className="flex h-11 items-center gap-2 rounded-xl bg-[#224ba0] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1b3a80]"
          >
            <Search className="size-4" />
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex h-11 items-center gap-2 rounded-xl border border-[#e2e8f0] px-5 text-[14px] font-semibold text-[#334155] transition-colors hover:bg-neutral-50"
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>
      </form>

      <div className="border-t border-[#e2e8f0]" />

      <div className="flex flex-col items-center gap-4 px-6 py-16 text-center sm:px-8">
        <span className="flex size-16 items-center justify-center rounded-full bg-[#eef2ff]">
          <CalendarX className="size-7 text-[#224ba0]" />
        </span>
        <div className="flex flex-col gap-1.5">
          <p className="text-[16px] font-bold text-[#0f172a]">No Past or Current Bookings found.</p>
          <p className="max-w-md text-[14px] leading-relaxed text-[#64748b]">
            We couldn&apos;t find any reservation matching that reference. Please ensure the
            reference is spelled correctly, or search under a different category.
          </p>
        </div>
      </div>
    </div>
  );
}
