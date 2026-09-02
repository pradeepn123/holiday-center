export function FlightVoucherTerms() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#e5e7eb] bg-white p-4">
      <p className="text-[16px] font-bold text-[#111827]">Terms and Conditions</p>

      <div className="flex flex-col gap-3 text-[12px] font-normal leading-[1.5] text-[#4e5255]">
        <p>
          Please arrive at the airport at least 3 hours before departure for international
          flights. Check-in counters close 60 minutes prior to scheduled departure and boarding
          gates close 20 minutes prior to departure. A valid passport, visa (where applicable) and
          this e-ticket must be presented at check-in.
        </p>
        <p>
          Fare changes, cancellations and refunds are subject to the fare rules of the operating
          airline and may incur a change or cancellation fee. Baggage allowance shown is per
          passenger per sector; excess baggage will be charged directly by the airline at the
          airport. Holidays Center acts as a booking agent and is not liable for schedule changes,
          delays or cancellations made by the airline.
        </p>
      </div>
    </div>
  );
}
