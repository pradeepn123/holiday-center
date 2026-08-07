import { Container } from "@/components/ui/Container";
import { Flag } from "@/components/sports/SportsFlag";
import type { SportsFixture } from "@/types";

export function SportsFixtureHeader({ fixture }: { fixture: SportsFixture }) {
  return (
    <div className="bg-[#2C341D] py-6">
      <Container className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[18px] font-bold text-white">
            {fixture.homeTeam} vs {fixture.awayTeam}
          </p>
          <p className="mt-1 text-[13px] text-neutral-300">
            {fixture.date} {fixture.time}
          </p>
          <p className="text-[13px] text-neutral-300">
            {fixture.venue} {fixture.venueAddress}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Flag code={fixture.homeCode} emoji={fixture.homeFlag} />
          <span className="text-[14px] font-bold text-white">{fixture.homeCode}</span>
          <span className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-neutral-900">
            vs
          </span>
          <span className="text-[14px] font-bold text-white">{fixture.awayCode}</span>
          <Flag code={fixture.awayCode} emoji={fixture.awayFlag} />
        </div>
      </Container>
    </div>
  );
}
