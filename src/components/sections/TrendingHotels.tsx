"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useInView } from "@/lib/hooks";
import { popularDestinations } from "@/lib/data";
import { cn } from "@/lib/utils";

export function TrendingHotels() {
  const [gridRef, isInView] = useInView<HTMLDivElement>();

  return (
    <section>
      <Container>
        <h2 className="font-sans text-2xl font-extrabold text-neutral-950 sm:text-[28px]">
          Popular destinations
        </h2>

        <div ref={gridRef} className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularDestinations.map((destination, index) => (
            <div
              key={destination.id}
              style={{ transitionDelay: `${index * 120}ms` }}
              className={cn(
                "group overflow-hidden rounded-2xl border border-[#0000001A] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)]",
                isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              )}
            >
              <div className="relative h-[220px] w-full overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <p className="text-[17px] font-bold text-neutral-950">{destination.title}</p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[13px] text-neutral-500">
                  <MapPin className="size-3.5 shrink-0" />
                  {destination.place}
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-[12px] text-neutral-400">From</p>
                    <p className="text-[15px] font-bold text-brand-blue">
                      USD {destination.price.toLocaleString()}
                    </p>
                  </div>
                  <a
                    href="#"
                    aria-label={`View ${destination.title}`}
                    className="flex size-9 shrink-0 items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <Image
                      src="/assets/icons/right_arrow.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="size-6"
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
