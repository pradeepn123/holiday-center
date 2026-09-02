function StayColumn({ label, value, subValue }: { label: string; value: string; subValue: string }) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <p className="text-[11px] font-semibold uppercase text-[#64748b]">{label}</p>
      <p className="text-[13px] font-semibold text-[#141823]">{value}</p>
      <p className="text-[11px] text-[#64748b]">{subValue}</p>
    </div>
  );
}

export function HotelVoucherStayCard({
  hotelName,
  address,
  checkIn,
  checkOut,
  roomsGuestsLabel,
  roomName,
}: {
  hotelName: string;
  address: string;
  checkIn: string;
  checkOut: string;
  roomsGuestsLabel: string;
  roomName: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-[#e2e8f0] bg-white p-5">
      <div className="flex flex-col gap-1.5">
        <p className="text-[16px] font-bold text-[#141823]">{hotelName}</p>
        <p className="text-[12px] leading-[1.4] text-[#64748b]">{address}</p>
      </div>

      <div className="h-px w-full bg-[#e2e8f0]" />

      <div className="flex flex-col items-start gap-3 sm:flex-row">
        <StayColumn label="Check-In" value={checkIn} subValue="From 3:00 PM" />
        <StayColumn label="Check-Out" value={checkOut} subValue="Before 11:00 AM" />
        <StayColumn label="Rooms & Guests" value={roomsGuestsLabel} subValue={roomName} />
      </div>
    </div>
  );
}
