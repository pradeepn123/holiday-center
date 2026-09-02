function InfoBlock({ label, value, align = "start" }: { label: string; value: string; align?: "start" | "end" }) {
  return (
    <div className={`flex flex-1 flex-col gap-1 ${align === "end" ? "items-end" : "items-start"}`}>
      <p className="text-[11px] font-semibold uppercase text-[#64748b]">{label}</p>
      <p className="text-[14px] font-semibold text-[#141823]">{value}</p>
    </div>
  );
}

export function HotelVoucherReference({
  bookingReference,
  dateIssued,
}: {
  bookingReference: string;
  dateIssued: string;
}) {
  return (
    <div className="flex w-full items-start gap-4">
      <InfoBlock label="Booking Reference" value={bookingReference} />
      <InfoBlock label="Date Issued" value={dateIssued} align="end" />
    </div>
  );
}
