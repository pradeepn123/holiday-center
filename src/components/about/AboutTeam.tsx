import Image from "next/image";
import { AboutContainer } from "./AboutContainer";
import { teamMembers } from "@/lib/data";
import { SectionEyebrow } from "./SectionEyebrow";

export function AboutTeam() {
  return (
    <section className="bg-white py-16 lg:py-[120px]">
      <AboutContainer className="flex flex-col gap-10 lg:gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionEyebrow>Our Team</SectionEyebrow>
          <h2 className="text-[34px] font-normal text-[#0d1b3e] lg:text-[48px]">
            The people behind your smile
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="overflow-hidden rounded-xl border border-[#d6e4ff] bg-white"
            >
              <div className="relative h-[300px] w-full">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 p-6">
                <div className="flex flex-col gap-1">
                  <p className="text-[24px] font-normal text-[#0d1b3e]">{member.name}</p>
                  <p className="text-[13px] font-bold uppercase text-[#5a6a80]">{member.role}</p>
                </div>
                <p className="text-[14px] leading-[1.5] text-[#5a6a80]">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </AboutContainer>
    </section>
  );
}
