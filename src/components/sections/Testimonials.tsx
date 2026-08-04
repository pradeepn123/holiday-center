"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Container } from "@/components/ui/Container";
import { StarRating } from "@/components/ui/Star";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col gap-3.5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_10px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-1.5">
        <StarRating rating={testimonial.rating} />
        <span className="text-[13px] font-bold text-neutral-500">
          ({String(testimonial.rating).padStart(2, "0")} Reviews)
        </span>
      </div>

      <p className="text-sm leading-relaxed text-neutral-700">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-1 flex items-center gap-3">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-full">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-bold text-neutral-900">{testimonial.name}</p>
          <p className="text-[13px] text-neutral-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("init", onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section>
      <Container>
        <h2 className="font-sans text-2xl font-extrabold text-neutral-950 sm:text-[28px]">
          Verified reviews and support proof
        </h2>

        <div className="mt-8 sm:hidden">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-0 flex-[0_0_100%]">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                aria-label={`Go to review ${index + 1}`}
                onClick={() => emblaApi?.scrollTo(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === selectedIndex ? "w-6 bg-brand-blue" : "w-1.5 bg-neutral-300"
                )}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
}
