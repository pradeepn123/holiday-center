import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/about/SectionEyebrow";
import { AboutStoryBlock } from "@/components/about/AboutStoryBlock";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutPartners } from "@/components/about/AboutPartners";
import { AboutOffices } from "@/components/about/AboutOffices";
import { AboutContact } from "@/components/about/AboutContact";
import { AboutBookingGuide } from "@/components/about/AboutBookingGuide";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-neutral-50">
        <section className="pb-20 pt-16">
          <Container>
            <div className="text-center">
              <SectionEyebrow>Who We Are</SectionEyebrow>
              <h1 className="mt-3 text-[28px] font-bold text-neutral-950 sm:text-[34px]">
                A legacy built on seamless discovery
              </h1>
            </div>

            <div className="mt-16 flex flex-col gap-20">
              <AboutStoryBlock
                title="Our Foundations"
                paragraph="Established in 2023, Holidays Center is the latest addition to the respected Al Ghandour Group, which pioneered its first travel agency in 2008. The Holidays Center aims to redefine the travel planning experience with a user-friendly and highly accessible platform built for modern wanderlust."
                image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=900&auto=format&fit=crop"
              />

              <AboutStoryBlock
                reverse
                title="Bridging the Global Gaps"
                paragraph="As part of the Al Ghandour group—which boasts active branches in Kuwait, Australia, and the Philippines—Holidays Center benefits from a wealth of deep global industry knowledge and professional expertise. Our Founder, Moustafa Ghandour, spent years in the travel and tourism sectors observing structural roadblocks faced by travelers daily."
                image="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=900&auto=format&fit=crop"
              />

              <AboutStoryBlock
                title="The Resolution"
                paragraph="He recognized that traditional travel agencies often fall short of providing transparent pricing, adequate customer support, and a seamless reservation system. Holidays Center resolves this by offering instant messaging support, zero hidden charges, and direct calls to dedicated leisure agents. We believe planning should be worry-free."
                image="https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=900&auto=format&fit=crop"
              />
            </div>
          </Container>
        </section>

        <AboutValues />
        <AboutTeam />
        <AboutPartners />
        <AboutOffices />
        <AboutContact />
        <AboutBookingGuide />
      </main>
      <Footer />
    </>
  );
}
