function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-center justify-between gap-3 border-b border-[#e2e8f0] p-3">
      <span className="text-[13px] font-normal text-[#475569]">{label}</span>
      <span className="text-[13px] font-semibold text-[#1e293b]">{value}</span>
    </div>
  );
}

export function HotelVoucherPayment({
  baseFare,
  nights,
  taxesAndFees,
  total,
}: {
  baseFare: number;
  nights: number;
  taxesAndFees: number;
  total: number;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[14px] font-bold uppercase text-[#141823]">Payment Details</p>

      <div className="overflow-hidden rounded-lg border border-[#e2e8f0]">
        <Row label={`Base Fare (${nights} Night${nights === 1 ? "" : "s"})`} value={`USD ${baseFare.toFixed(2)}`} />
        <Row label="Local Taxes & Fees" value={`USD ${taxesAndFees.toFixed(2)}`} />
        <div className="flex items-center justify-between gap-3 bg-[#f8fafc] p-3">
          <span className="text-[13px] font-bold text-[#1e293b]">Total Cost (Paid)</span>
          <span className="text-[15px] font-bold text-[#224ba0]">USD {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
