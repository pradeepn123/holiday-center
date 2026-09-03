import Image from "next/image";
import { MapPin } from "lucide-react";
import { AboutContainer } from "./AboutContainer";
import { headquartersAddress } from "@/lib/data";
import { SectionEyebrow } from "./SectionEyebrow";

export function AboutOffices() {
  return (
    <section className="bg-white py-16 lg:py-[120px]">
      <AboutContainer className="flex flex-col gap-10 lg:gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionEyebrow>Global Offices</SectionEyebrow>
          <h2 className="text-[34px] font-normal text-[#0d1b3e] lg:text-[48px]">Visit Us Worldwide</h2>
        </div>

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-16">
          <div className="w-full lg:w-[515px] lg:shrink-0">
            <div className="flex flex-col gap-4 rounded-xl bg-[#eff4ff] p-8">
              <p className="text-[22px] font-normal text-[#0d1b3e] lg:text-[24px]">
                Australia Office (HQ)
              </p>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-[18px] shrink-0 text-[#5a6a80]" />
                <p className="flex-1 text-[15px] leading-[1.5] text-[#5a6a80]">
                  Address: {headquartersAddress}
                </p>
              </div>
              <p className="text-[13px] leading-[1.6] text-[#5a6a80]">
                Our central location guarantees easy access for clients. Holidays Center is a
                registered business in Australia, ensuring adherence to consumer-first leisure
                bookings.
              </p>
            </div>
          </div>

          <div className="relative h-[280px] w-full overflow-hidden rounded-xl bg-[#224ba0] lg:h-[380px] lg:flex-1">
            <Image
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop"
              alt="World map"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover mix-blend-screen grayscale invert contrast-200 brightness-110"
            />
          </div>
        </div>
      </AboutContainer>
    </section>
  );
}
