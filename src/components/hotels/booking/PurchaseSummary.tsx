import { ShieldCheck } from "lucide-react";
import { type StayParams } from "@/lib/stayParams";
import type { HotelRoom } from "@/types";

export function PurchaseSummary({
  room,
  convenienceFee,
  stayParams,
}: {
  room: HotelRoom;
  convenienceFee: number;
  stayParams: StayParams;
}) {
  const bedType = room.bedType;
  const adults = Number(stayParams.adults ?? room.guests) || room.guests;
  const children = Number(stayParams.children ?? 0) || 0;

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6 lg:sticky lg:top-24">
      <p className="text-[16px] font-bold text-neutral-900">Purchase Summary</p>

      <div className="mt-3 border-t border-neutral-100 pt-4">
        <p className="text-[14px] font-semibold text-neutral-900">{room.name}</p>
        <p className="mt-0.5 text-[13px] text-neutral-500">
          Room 1 / {room.boardType}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-4 text-[14px]">
        <div className="flex items-center justify-between gap-3">
          <span className="text-neutral-500">Bed type</span>
          <span className="text-right font-medium text-neutral-900">{bedType}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-neutral-500">Room</span>
          <span className="text-right font-medium text-neutral-900">
            Room 1 / {room.boardType}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-neutral-500">No. of Children</span>
          <span className="font-medium text-neutral-900">{children}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-neutral-500">No. of Guests</span>
          <span className="font-medium text-neutral-900">{adults}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-neutral-500">Convenience Fee</span>
          <span className="font-medium text-neutral-900">USD {convenienceFee.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
        <span className="text-[15px] font-bold text-neutral-900">Total Amount</span>
        <span className="text-[18px] font-bold text-brand-blue">
          USD {convenienceFee.toFixed(2)}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-[13px] font-medium text-green-700">
        <ShieldCheck className="size-4 shrink-0" />
        Secure payment guaranteed by Holidayscenter
      </div>
    </div>
  );
}
