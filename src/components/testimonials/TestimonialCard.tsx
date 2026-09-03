import Image from "next/image";
import { Quote } from "lucide-react";
import { StarRating } from "@/components/ui/Star";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-white p-6 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <StarRating rating={testimonial.rating} />
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
          <Quote className="size-4 fill-current" />
        </span>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-5 border-t border-neutral-100 pt-5">
        <div className="flex items-center gap-3">
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
            <p className="text-[15px] font-bold text-neutral-900">{testimonial.name}</p>
            <p className="text-[13px] text-neutral-500">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
