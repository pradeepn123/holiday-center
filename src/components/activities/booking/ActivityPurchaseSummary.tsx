import { ShieldCheck } from "lucide-react";
import { formatDate } from "@/lib/dateUtils";
import type { ActivityResult } from "@/types";

export function ActivityPurchaseSummary({
  activity,
  selectedDateIso,
  adults,
  childrenCount,
  total,
}: {
  activity: ActivityResult;
  selectedDateIso: string;
  adults: number;
  childrenCount: number;
  total: number;
}) {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-[0_8px_24px_0_rgba(15,23,42,0.0314)] lg:sticky lg:top-24">
      <p className="text-[16px] font-bold text-neutral-900">Purchase Summary</p>
      <p className="mt-1 text-[14px] font-medium text-neutral-700">{activity.title}</p>

      <div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-4 text-[14px]">
        <div className="flex items-center justify-between gap-3">
          <span className="text-neutral-500">Selected Date</span>
          <span className="font-medium text-neutral-900">{formatDate(selectedDateIso)}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-neutral-500">Adults</span>
          <span className="font-medium text-neutral-900">{adults}</span>
        </div>
        {childrenCount > 0 && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-neutral-500">Children</span>
            <span className="font-medium text-neutral-900">{childrenCount}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
        <span className="text-[15px] font-bold text-neutral-900">Total Amount</span>
        <span className="text-[18px] font-bold text-brand-blue">USD {total.toFixed(2)}</span>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-[13px] font-medium text-green-700">
        <ShieldCheck className="size-4 shrink-0" />
        Secure payment guaranteed by Holidayscenter
      </div>
    </div>
  );
}
