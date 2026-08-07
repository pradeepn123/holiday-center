"use client";

import { ChevronDown, Info, Ticket } from "lucide-react";
import type { SportsTicketCategory } from "@/types";

function QuantitySelect({ max }: { max: number }) {
  return (
    <div className="relative">
      <select
        defaultValue={1}
        aria-label="Quantity"
        className="h-11 w-[68px] appearance-none rounded-xl border border-neutral-200 px-3 pr-7 text-[14px] font-medium text-neutral-900 outline-none focus:border-brand-blue"
      >
        {Array.from({ length: max }, (_, index) => index + 1).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
    </div>
  );
}

function CategoryCard({ category }: { category: SportsTicketCategory }) {
  return (
    <div className="rounded-2xl border border-[#0000001A] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[16px] font-bold text-neutral-900">{category.name}</p>
          <p className="text-[13px] text-neutral-500">{category.grouping}</p>
        </div>
        <p className="text-[18px] font-bold text-brand-blue">USD {category.price}</p>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#2E7D32]">
            <Ticket className="size-4 shrink-0" />
            {category.ticketsAvailable} tickets available
          </div>
          {category.offlineStock && (
            <div className="mt-1.5 flex items-center gap-2 text-[13px] font-medium text-amber-600">
              <Info className="size-4 shrink-0" />
              Offline Stock
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <QuantitySelect max={category.ticketsAvailable} />
          <button
            type="button"
            className="flex h-11 items-center justify-center rounded-xl bg-brand-blue px-6 text-[14px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export function SportsTicketCategories({ categories }: { categories: SportsTicketCategory[] }) {
  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        className="flex items-center justify-between gap-3 rounded-2xl border border-[#0000001A] bg-white px-4 py-3.5"
      >
        <span className="text-[15px] font-bold text-neutral-900">Categories</span>
        <ChevronDown className="size-4 shrink-0 text-neutral-400" />
      </button>

      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
