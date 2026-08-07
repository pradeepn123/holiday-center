"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "dates-prices", label: "Dates & Prices" },
  { id: "inclusions", label: "Inclusions" },
  { id: "trip-notes", label: "Trip Notes" },
  { id: "terms-conditions", label: "Terms & Conditions" },
];

export function PackageDetailsTabs() {
  const [activeId, setActiveId] = useState(TABS[0].id);

  return (
    <div className="sticky top-24 z-40 flex items-center gap-8 rounded-2xl border border-neutral-100 bg-white px-6">
      {TABS.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            onClick={() => setActiveId(tab.id)}
            className={cn(
              "relative shrink-0 py-4 text-[14px] font-semibold transition-colors",
              isActive ? "text-brand-blue" : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            {tab.label}
            {isActive && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-blue" />
            )}
          </a>
        );
      })}
    </div>
  );
}
