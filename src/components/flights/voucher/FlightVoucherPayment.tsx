import type { FlightResult } from "@/types";

function Row({ label, value, isLast }: { label: string; value: string; isLast?: boolean }) {
  return (
    <div className={`flex items-center gap-3 p-3 ${isLast ? "" : "border-b border-[#e5e7eb]"}`}>
      <p className="flex-1 text-[12px] font-normal text-[#111827]">{label}</p>
      <p className="w-[120px] shrink-0 text-right text-[12px] font-normal text-[#111827]">{value}</p>
    </div>
  );
}

export function FlightVoucherPayment({
  flight,
  passengers,
}: {
  flight: FlightResult;
  passengers: number;
}) {
  const tax = Math.round(flight.price * 0.13 * 100) / 100;
  const baseFare = flight.price - tax;
  const subTotal = flight.price * passengers;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#e5e7eb] bg-white p-4">
      <p className="text-[16px] font-bold text-[#111827]">Payment Details</p>

      <div className="overflow-hidden rounded-[10px] border border-[#e5e7eb]">
        <div className="flex items-center gap-3 border-b border-[#e5e7eb] bg-[#f9fafb] px-3 py-2.5">
          <p className="flex-1 text-[11px] font-bold uppercase text-[#4e5255]">Fare Description (USD)</p>
          <p className="w-[120px] shrink-0 text-right text-[11px] font-bold uppercase text-[#4e5255]">
            Adult
          </p>
        </div>
        <Row label="Base Fare" value={`USD ${baseFare.toFixed(2)}`} />
        <Row label="Tax" value={`USD ${tax.toFixed(2)}`} />
        <Row label="Total" value={`USD ${flight.price.toFixed(2)}`} />
        <Row label="No. of Passengers" value={`X${passengers}`} />
        <Row label="Sub Total" value={`USD ${subTotal.toFixed(2)}`} isLast />
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-[14px] font-bold text-[#111827]">Total Trip Cost</span>
        <span className="text-[14px] font-extrabold text-[#111827]">USD {subTotal.toFixed(2)}</span>
      </div>
    </div>
  );
}
