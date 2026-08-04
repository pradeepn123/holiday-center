"use client";

import { useState } from "react";

const PREFERENCES = [
  "Please note early arrival",
  "Please note late arrival",
  "Please note king-size bed",
  "If possible please provide adjoining rooms",
  "Please request non-smoking rooms",
  "Please note passenger are honeymooners",
];

const DEFAULT_CHECKED = ["Please note early arrival", "Please note king-size bed"];

export function GuestPreferencesForm() {
  const [checked, setChecked] = useState<Set<string>>(new Set(DEFAULT_CHECKED));

  function toggle(preference: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(preference)) {
        next.delete(preference);
      } else {
        next.add(preference);
      }
      return next;
    });
  }

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6">
      <p className="border-b border-neutral-100 pb-4 text-[16px] font-bold text-neutral-900">
        User Specifications &amp; Preferences
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PREFERENCES.map((preference) => (
          <label
            key={preference}
            className="flex cursor-pointer items-center gap-2.5 text-[14px] text-neutral-700"
          >
            <input
              type="checkbox"
              checked={checked.has(preference)}
              onChange={() => toggle(preference)}
              className="size-4 shrink-0 rounded border-neutral-300 text-brand-blue focus:ring-brand-blue"
            />
            {preference}
          </label>
        ))}
      </div>

      <label className="mt-5 flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-neutral-600">
          Any other special requests? (Optional)
        </span>
        <textarea
          rows={3}
          placeholder="e.g. request high floor, twin beds preference, dietary requirements..."
          className="rounded-xl border border-neutral-200 px-3 py-2.5 text-[14px] outline-none focus:border-brand-blue"
        />
      </label>
    </div>
  );
}
