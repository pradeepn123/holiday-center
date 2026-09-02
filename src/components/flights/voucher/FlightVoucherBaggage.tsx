import type { FlightResult } from "@/types";

const CABIN_BAG_WEIGHT = "7 Kg";

export function FlightVoucherBaggage({ flight }: { flight: FlightResult }) {
  const sectors = [flight.outbound, ...(flight.return ? [flight.return] : [])];

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#e5e7eb] bg-white p-4">
      <p className="text-[16px] font-bold text-[#111827]">Baggage Details</p>

      <div className="overflow-hidden rounded-[10px] border border-[#e5e7eb]">
        <div className="flex items-center gap-3 border-b border-[#e5e7eb] bg-[#f9fafb] px-3 py-2.5">
          <p className="flex-1 text-[11px] font-bold uppercase text-[#4e5255]">Sector</p>
          <p className="w-[120px] shrink-0 text-right text-[11px] font-bold uppercase text-[#4e5255]">
            Checked-in
          </p>
          <p className="w-[120px] shrink-0 text-right text-[11px] font-bold uppercase text-[#4e5255]">
            Cabin-Bag
          </p>
        </div>
        {sectors.map((leg, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-3 ${
              index === sectors.length - 1 ? "" : "border-b border-[#e5e7eb]"
            }`}
          >
            <p className="flex-1 text-[12px] font-normal text-[#111827]">
              {leg.origin} - {leg.destination}
            </p>
            <p className="w-[120px] shrink-0 text-right text-[12px] font-normal text-[#111827]">
              {flight.luggage}
            </p>
            <p className="w-[120px] shrink-0 text-right text-[12px] font-normal text-[#111827]">
              {CABIN_BAG_WEIGHT}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
