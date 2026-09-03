import Link from "next/link";
import { AboutContainer } from "./AboutContainer";
import { bookingGuides } from "@/lib/data";
import { SectionEyebrow } from "./SectionEyebrow";

export function AboutBookingGuide() {
  return (
    <section className="bg-[#eaf2ff] py-16 lg:py-[120px]">
      <AboutContainer className="flex flex-col items-center gap-10 lg:gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionEyebrow>Instant Reservation Guide</SectionEyebrow>
          <h2 className="text-[34px] font-normal text-[#0d1b3e] lg:text-[48px]">
            How to book with us
          </h2>
          <p className="max-w-[733px] text-[16px] text-[#5a6a80]">
            Select your preferred leisure track below to view step-by-step documentation on
            booking luxury hotels, cruises, flights, or rental vehicles.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {bookingGuides.map((guide, index) => (
            <Link
              key={guide.label}
              href={guide.href}
              className={
                index === 0
                  ? "flex items-center justify-center rounded-[4px] bg-[#224ba0] px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1b3a80]"
                  : "flex items-center justify-center rounded-[4px] border border-[#224ba0] px-7 py-3.5 text-[14px] font-semibold text-[#5a6a80] transition-colors hover:bg-white"
              }
            >
              {guide.label}
            </Link>
          ))}
        </div>

        <p className="pt-6 text-[13px] text-[#5a6a80]">
          © 2026 Holidays Center. All Rights Reserved. A proud member of Al Ghandour Group.
        </p>
      </AboutContainer>
    </section>
  );
}
