import { Calendar, MapPin, Ticket } from "lucide-react";
import type { SportsFixture, SportsTicketCategory } from "@/types";

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[15px]">
      <span className="text-neutral-500">{label}</span>
      <span className="font-bold text-neutral-900">{value}</span>
    </div>
  );
}

function DetailRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[15px] font-medium text-neutral-800">
      <span className="flex size-5 shrink-0 items-center justify-center text-neutral-900">{icon}</span>
      {children}
    </div>
  );
}

export function SportsOrderSummary({
  fixture,
  category,
  quantity,
  unitPrice,
  venueFee,
  bookingServiceFee,
  total,
}: {
  fixture: SportsFixture;
  category: SportsTicketCategory;
  quantity: number;
  unitPrice: number;
  venueFee: number;
  bookingServiceFee: number;
  total: number;
}) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] lg:sticky lg:top-24">
      <p className="text-xl font-bold leading-tight text-neutral-900">
        {fixture.homeTeam} vs {fixture.awayTeam}
      </p>
      <p className="mt-1 text-[15px] text-neutral-500">{fixture.tournament}</p>

      <div className="mt-5 flex flex-col gap-3.5">
        <DetailRow icon={<Ticket className="size-[18px]" />}>
          {category.name} {category.grouping}
        </DetailRow>
        <DetailRow icon={<MapPin className="size-[18px]" />}>
          {fixture.venue}, {fixture.venueAddress}
        </DetailRow>
        <DetailRow icon={<Calendar className="size-[18px]" />}>
          {fixture.date} · {fixture.time}
        </DetailRow>
      </div>

      <div className="mt-6 border-t border-neutral-100 pt-6">
        <p className="text-lg font-bold text-neutral-900">Order Summary</p>

        <div className="mt-4 flex flex-col gap-4">
          <SummaryRow label="Ticket price (per ticket)" value={`USD ${unitPrice.toFixed(0)}`} />
          <SummaryRow label="Ticket quantity" value={`x ${quantity}`} />
          <SummaryRow label="Venue & facility fee" value={`USD ${venueFee.toFixed(0)}`} />
          <SummaryRow
            label="Booking service fee"
            value={bookingServiceFee > 0 ? `USD ${bookingServiceFee.toFixed(0)}` : "USD 0"}
          />
          <SummaryRow label="Digital E-Ticket" value="FREE" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-6">
        <span className="text-lg font-bold text-neutral-900">Total Amount</span>
        <span className="text-2xl font-extrabold text-neutral-900">
          USD {total.toLocaleString()}
        </span>
      </div>

      <div className="mt-6 rounded-2xl bg-[#EEF2FB] p-6">
        <p className="text-[15px] font-bold text-neutral-900">Important Notes</p>
        <ul className="mt-3 flex flex-col gap-3 text-[14px] leading-relaxed text-neutral-600">
          <li className="flex gap-2.5">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-neutral-400" />
            <span>
              Gates open 2 hours before kickoff at {fixture.venue}. Please arrive at least 45
              minutes prior to the scheduled start time.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-neutral-400" />
            <span>This booking is subject to identity verification matching the details provided.</span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-neutral-400" />
            <span>Cancellations are permitted up to 7 days before the fixture for a full refund.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
