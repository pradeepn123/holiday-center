import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Flag } from "@/components/sports/SportsFlag";
import type { SportsFixture, SportsTicketListing } from "@/types";

export function SportsEventCard({
  fixture,
  listing,
}: {
  fixture: SportsFixture;
  listing: SportsTicketListing;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#0000001A] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between gap-3 p-4 pb-3">
        <div>
          <p className="text-[12px] text-neutral-500">Starting From</p>
          <p className="text-[20px] font-bold text-neutral-950">USD {listing.price}</p>
        </div>
        {listing.guaranteed && (
          <span className="flex items-center gap-1.5 rounded-full border border-[#EBF86C] bg-[#EBF86C33] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-dark">
            <span className="size-1.5 rounded-full bg-brand-dark" />
            Guaranteed
          </span>
        )}
      </div>

      <div className="relative mx-4 flex h-[140px] items-center justify-center rounded-xl border border-[#0000001A] bg-neutral-100">
        <Image
          src="/assets/images/seating-ring-outer.png"
          alt=""
          width={180}
          height={130}
          className="h-[120px] w-auto object-contain"
        />
        <span className="absolute bottom-2.5 left-3 text-[9px] font-semibold uppercase tracking-wide text-neutral-400">
          West Stand
        </span>
        <span className="absolute bottom-2.5 right-3 text-[9px] font-semibold uppercase tracking-wide text-neutral-400">
          East Stand
        </span>
      </div>

      <div className="p-4 pt-3">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <span className="flex items-center gap-1.5 text-[16px] font-bold text-neutral-900">
            <Flag code={fixture.homeCode} emoji={fixture.homeFlag} />
            {fixture.homeCode}
          </span>
          <span className="rounded-full bg-[#EFF3F8] px-3 py-0.5 text-[13px] font-medium text-[#505C59]">
            vs
          </span>
          <span className="flex items-center gap-1.5 text-[16px] font-bold text-neutral-900">
            {fixture.awayCode}
            <Flag code={fixture.awayCode} emoji={fixture.awayFlag} />
          </span>
        </div>

        <p className="mt-2.5 text-left text-[16px] font-bold text-neutral-950">
          {fixture.homeTeam} vs {fixture.awayTeam}
        </p>

        <div className="mt-2.5 flex items-center gap-2 text-[13px] text-[#505C59]">
          <Calendar className="size-3.5 shrink-0" />
          {fixture.date} • {fixture.time}
        </div>
        <div className="mt-1.5 flex items-start gap-2 text-[13px] text-[#505C59]">
          <MapPin className="mt-0.5 size-3.5 shrink-0" />
          {fixture.venue}
        </div>

        <Link
          href={`/sports/${fixture.id}`}
          className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-[#224BA0] text-[14px] font-semibold text-white transition-colors hover:opacity-90"
        >
          View Tickets
        </Link>
      </div>
    </div>
  );
}
