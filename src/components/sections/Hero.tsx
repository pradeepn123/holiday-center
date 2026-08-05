import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SearchWidget } from "./SearchWidget";
import { HeroGallery } from "./HeroGallery";

export function Hero() {
  return (
    <section className="relative bg-[#EBEFEC] pb-2 lg:pb-4 overflow-hidden sm:overflow-visible">
      <div className="absolute inset-0 lg:hidden left-[75%] -top-[100px] w-full rotate-[345deg]" aria-hidden="true">
        <HeroGallery fill />
        <div className="absolute inset-0 bg-[#EBEFEC]/36" />
      </div>

      <Image
        src="/assets/icons/shape-4.svg"
        alt=""
        width={261}
        height={127}
        aria-hidden="true"
        className="pointer-events-none absolute left-[2%] top-6 z-10 hidden animate-swing lg:block"
      />
      <Image
        src="/assets/icons/shape-3.svg"
        alt=""
        width={68}
        height={54}
        aria-hidden="true"
        className="pointer-events-none absolute left-[40%] top-[180px] z-10 hidden animate-translate-x lg:block"
      />
      <Image
        src="/assets/icons/shape-2.svg"
        alt=""
        width={85}
        height={79}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-[30%] z-10 hidden animate-translate-x lg:block"
      />

      <Container className="relative grid items-start gap-1 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="relative z-10 pt-6 lg:pt-0 lg:-translate-y-10">
          <span className="-ml-2 -mb-2 relative inline-block -translate-y-1 -rotate-[16deg] rounded-full bg-brand-lime px-6 py-3 text-sm font-medium text-black">
            Let&apos;s Explore
          </span>

          <h1 className="relative z-10 mt-1 max-w-xl font-sans text-4xl font-extrabold leading-[0.98] tracking-tight text-neutral-950 sm:text-5xl lg:text-[58px]">
            Find Your Dream Destination
          </h1>

          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-neutral-600 sm:text-base">
            Discover curated holiday packages, flights, tours, cruises, and hotels
            &ndash; all in one modern travel experience.
          </p>
        </div>

        <div className="hidden lg:block">
          <HeroGallery />
        </div>
      </Container>

      <Container className="relative z-10 mt-6 lg:-mt-32 lg:-mb-16">
        <SearchWidget />
      </Container>
    </section>
  );
}
