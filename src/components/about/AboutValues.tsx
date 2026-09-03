import { Eye, Target } from "lucide-react";
import { AboutContainer } from "./AboutContainer";
import { SectionEyebrow } from "./SectionEyebrow";

const VALUES = [
  {
    id: "mission",
    icon: Target,
    title: "Our Mission",
    description:
      "Dedicated to providing user-friendly online booking platforms that meet everyone's travel needs. We ensure every trip is hassle-free, enjoyable, and comprehensively covered by personalized support that sets us apart from standard automated booking portals.",
  },
  {
    id: "vision",
    icon: Eye,
    title: "Our Vision",
    description:
      "To be the leading global provider of curated travel solutions, recognized for our commitment to making world travel accessible and premium affordable. We aim to enrich lives by simplifying the reservation process from end to end.",
  },
];

export function AboutValues() {
  return (
    <section className="bg-[#0b1f3a] py-16 lg:py-[100px]">
      <AboutContainer className="flex flex-col gap-10 lg:gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionEyebrow variant="dark">Values &amp; Vision</SectionEyebrow>
          <h2 className="max-w-[952px] text-[32px] font-normal text-white lg:text-[44px]">
            Experience the difference with Holidays Center
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {VALUES.map((value) => (
            <div
              key={value.id}
              className="flex flex-col gap-6 rounded-xl border border-[#224ba0] bg-[#0f2a5a] p-8 lg:p-10"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-[#224ba0]">
                <value.icon className="size-6 text-white" />
              </div>
              <p className="text-[28px] font-normal text-white">{value.title}</p>
              <p className="text-[15px] leading-[1.6] text-white">{value.description}</p>
            </div>
          ))}
        </div>
      </AboutContainer>
    </section>
  );
}
