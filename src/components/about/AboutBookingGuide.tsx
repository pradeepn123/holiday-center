import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { bookingGuides } from "@/lib/data";
import { SectionEyebrow } from "./SectionEyebrow";

export function AboutBookingGuide() {
  return (
    <section className="bg-[#eef4fd] py-20">
      <Container>
        <div className="text-center">
          <SectionEyebrow>Instant Reservation Guide</SectionEyebrow>
          <h2 className="mt-3 text-[28px] font-bold text-neutral-950 sm:text-[32px]">
            How to book with us
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-neutral-500">
            Select your preferred leisure track below to view step-by-step documentation on
            booking luxury hotels, cruises, flights, or rental vehicles.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {bookingGuides.map((guide, index) => (
            <Link
              key={guide.label}
              href={guide.href}
              className={
                index === 0
                  ? "flex h-11 items-center justify-center rounded-xl bg-brand-blue px-5 text-[14px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
                  : "flex h-11 items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 text-[14px] font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
              }
            >
              {guide.label}
            </Link>
          ))}
        </div>

        <p className="mt-14 text-center text-[13px] text-neutral-400">
          © 2026 Holidays Center. All Rights Reserved. A proud member of Al Ghandour Group.
        </p>
      </Container>
    </section>
  );
}
