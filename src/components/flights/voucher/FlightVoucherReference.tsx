function InfoBlock({
  label,
  value,
  align = "start",
  valueClassName,
}: {
  label: string;
  value: string;
  align?: "start" | "end";
  valueClassName?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${align === "end" ? "items-end" : "items-start"}`}>
      <p className="text-[12px] font-semibold text-[#111827]">{label}</p>
      <p className={valueClassName ?? "text-[13px] font-normal text-[#4e5255]"}>{value}</p>
    </div>
  );
}

export function FlightVoucherReference({
  referenceId,
  bookingDate,
  pnr,
}: {
  referenceId: string;
  bookingDate: string;
  pnr: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#e5e7eb] bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <InfoBlock label="Reference ID" value={referenceId} />
        <InfoBlock label="Booking Date" value={bookingDate} align="end" />
      </div>
      <div className="flex items-center justify-between gap-3">
        <InfoBlock
          label="Status"
          value="CONFIRMED"
          valueClassName="text-[13px] font-bold text-[#1a9e00]"
        />
        <InfoBlock
          label="PNR no"
          value={pnr}
          align="end"
          valueClassName="text-[16px] font-bold text-[#111827]"
        />
      </div>
    </div>
  );
}
