import { ShieldCheck } from "lucide-react";
import type { FlightResult } from "@/types";

export function FlightPurchaseSummary({
  flight,
  passengers,
}: {
  flight: FlightResult;
  passengers: number;
}) {
  const fareTotal = flight.price * passengers;
  const convenienceFee = Math.round(flight.price * 0.13 * 100) / 100;
  const subTotal = fareTotal + convenienceFee;

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6 lg:sticky lg:top-24">
      <p className="text-[16px] font-bold text-neutral-900">Purchase Summary</p>

      <div className="mt-4 border-t border-neutral-100 pt-4">
        <p className="text-[14px] font-bold text-neutral-900">Fare Details</p>

        <div className="mt-3 flex flex-col gap-3 text-[14px]">
          <div className="flex items-center justify-between gap-3">
            <span className="text-neutral-500">Traveller X{passengers} (Adult)</span>
            <span className="font-medium text-neutral-900">USD {fareTotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-neutral-500">Convenience Free</span>
            <span className="font-medium text-neutral-900">USD {convenienceFee.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-neutral-500">Sub Total</span>
            <span className="font-medium text-neutral-900">USD {subTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
        <span className="text-[15px] font-bold text-neutral-900">Total Amount</span>
        <span className="text-[18px] font-bold text-brand-blue">USD {subTotal.toFixed(2)}</span>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-[13px] font-medium text-green-700">
        <ShieldCheck className="size-4 shrink-0" />
        Secure payment guaranteed by Holidayscenter
      </div>
    </div>
  );
}
