import { Container } from "@/components/ui/Container";
import { partnerAirlines, partnerCruiseLines } from "@/lib/data";
import { SectionEyebrow } from "./SectionEyebrow";

function PartnerBand({
  eyebrow,
  title,
  partners,
}: {
  eyebrow: string;
  title: string;
  partners: string[];
}) {
  return (
    <div className="bg-[#eef4fd] py-14">
      <Container>
        <div className="text-center">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="mt-3 text-[24px] font-bold text-neutral-950 sm:text-[26px]">{title}</h2>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {partners.map((partner) => (
            <span
              key={partner}
              className="rounded-xl border border-neutral-200 bg-white px-6 py-3 text-[14px] font-semibold text-neutral-700"
            >
              {partner}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}

export function AboutPartners() {
  return (
    <section>
      <PartnerBand eyebrow="Global Networks" title="Our Partner Airlines" partners={partnerAirlines} />
      <PartnerBand
        eyebrow="Oceanic Travel"
        title="Our Partner Cruise Lines"
        partners={partnerCruiseLines}
      />
    </section>
  );
}
