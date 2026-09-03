import { Eye, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
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
    <section className="bg-[#0d1b3d] py-20">
      <Container>
        <div className="text-center">
          <SectionEyebrow variant="dark">Values &amp; Vision</SectionEyebrow>
          <h2 className="mt-3 text-[28px] font-bold text-white sm:text-[32px]">
            Experience the difference with Holidays Center
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {VALUES.map((value) => (
            <div
              key={value.id}
              className="rounded-2xl border border-white/10 bg-[#132a55] p-8"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-brand-lime/20 text-brand-lime">
                <value.icon className="size-5" />
              </div>
              <p className="mt-5 text-[19px] font-bold text-white">{value.title}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-white/60">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
