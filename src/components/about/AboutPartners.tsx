import { AboutContainer } from "./AboutContainer";
import { partnerAirlines, partnerCruiseLines } from "@/lib/data";

function PartnerBand({
  eyebrow,
  title,
  partners,
  bordered = false,
}: {
  eyebrow: string;
  title: string;
  partners: string[];
  bordered?: boolean;
}) {
  return (
    <div className={bordered ? "border-y border-[#d6e4ff] bg-[#eaf2ff] py-14 lg:py-[80px]" : "bg-[#eaf2ff] py-14 lg:py-[80px]"}>
      <AboutContainer className="flex flex-col gap-8 lg:gap-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-[11px] font-bold uppercase text-[#5a6a80]">{eyebrow}</p>
          <p className="text-[26px] font-normal text-[#0d1b3e] lg:text-[32px]">{title}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-between">
          {partners.map((partner) => (
            <span
              key={partner}
              className="rounded-[4px] border border-[#d6e4ff] bg-white px-4 py-2 text-[14px] font-bold text-[#5a6a80]"
            >
              {partner}
            </span>
          ))}
        </div>
      </AboutContainer>
    </div>
  );
}

export function AboutPartners() {
  return (
    <section>
      <PartnerBand
        eyebrow="Global Networks"
        title="Our Partner Airlines"
        partners={partnerAirlines}
        bordered
      />
      <PartnerBand eyebrow="Oceanic Travel" title="Our Partner Cruise Lines" partners={partnerCruiseLines} />
    </section>
  );
}
