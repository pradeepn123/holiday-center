import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { teamMembers } from "@/lib/data";
import { SectionEyebrow } from "./SectionEyebrow";

export function AboutTeam() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="text-center">
          <SectionEyebrow>Our Team</SectionEyebrow>
          <h2 className="mt-3 text-[28px] font-bold text-neutral-950 sm:text-[32px]">
            The people behind your smile
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-[0_10px_25px_rgba(15,23,42,0.05)]"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-[17px] font-bold text-neutral-950">{member.name}</p>
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-blue">
                  {member.role}
                </p>
                <p className="mt-2.5 text-[14px] leading-relaxed text-neutral-500">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
