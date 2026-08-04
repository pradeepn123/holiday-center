"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function toggleInSet<T>(set: Set<T>, value: T) {
  const next = new Set(set);
  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }
  return next;
}

export function FilterSection({
  title,
  children,
  defaultOpen = true,
  action,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  action?: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-[8px] border border-[#0000001A] bg-white p-4">
      <div className="flex w-full items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex flex-1 items-center justify-between gap-3"
        >
          <span className="text-[15px] font-bold text-neutral-900">{title}</span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-neutral-400 transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </button>
        {action}
      </div>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
