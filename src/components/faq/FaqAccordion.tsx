"use client";

import { useState } from "react";
import type { FaqItem } from "@/types";
import { cn } from "@/lib/utils";

function ToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 transition-colors duration-300">
      <span className="absolute h-[2px] w-4 rounded-full bg-current" />
      <span
        className={cn(
          "absolute h-4 w-[2px] rounded-full bg-current transition-transform duration-300 ease-in-out",
          isOpen ? "scale-y-0" : "scale-y-100"
        )}
      />
    </span>
  );
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="mx-auto mt-10 flex max-w-[960px] flex-col">
      {items.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className="border-b border-neutral-200 py-6">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 text-left"
            >
              <span className="text-[18px] font-medium text-neutral-900">{faq.question}</span>
              <ToggleIcon isOpen={isOpen} />
            </button>

            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl text-[15px] leading-relaxed text-neutral-500">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
