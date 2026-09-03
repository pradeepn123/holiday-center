import Image from "next/image";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { headquartersAddress } from "@/lib/data";
import { SectionEyebrow } from "./SectionEyebrow";

export function AboutOffices() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="text-center">
          <SectionEyebrow>Global Offices</SectionEyebrow>
          <h2 className="mt-3 text-[28px] font-bold text-neutral-950 sm:text-[32px]">
            Visit Us Worldwide
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-center gap-3 rounded-2xl bg-[#eef4fd] p-8">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-brand-blue" />
              <p className="text-[17px] font-bold text-neutral-950">Australia Office (HQ)</p>
            </div>
            <p className="text-[13px] font-semibold text-neutral-600">
              Address: {headquartersAddress}
            </p>
            <p className="mt-1 text-[14px] leading-relaxed text-neutral-500">
              Our central location guarantees easy access for clients. Holidays Center is a
              registered business in Australia, ensuring adherence to consumer-first leisure
              bookings.
            </p>
          </div>

          <div className="relative min-h-[240px] overflow-hidden rounded-2xl bg-[#dce6f4]">
            <Image
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop"
              alt="World map"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover opacity-70 grayscale mix-blend-luminosity"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
