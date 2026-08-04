"use client";

import { Headphones, Tag, Wallet, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { contactPhones, whyBookHighlights } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import type { WhyBookHighlight as WhyBookHighlightType } from "@/types";

const ICONS: Record<
  WhyBookHighlightType["icon"],
  { Icon: React.ComponentType<{ className?: string }>; className: string }
> = {
  support: { Icon: Headphones, className: "text-neutral-700" },
  deals: { Icon: Tag, className: "text-neutral-700" },
  booking: { Icon: Zap, className: "text-neutral-700" },
  pricing: { Icon: Wallet, className: "text-neutral-700" },
};

const supportPhone = contactPhones.find((phone) => phone.label === "Australia") ?? contactPhones[0];

export function WhyBookHighlight() {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <section>
      <Container>
        <div
          ref={ref}
          className="grid gap-10 rounded-[32px] bg-[#E7ECDF] p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14 lg:p-14"
        >
          <div
            className={cn(
              "transition-all duration-700 ease-out",
              isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            <p className="text-sm font-medium text-neutral-600">Why book with Holidays Center</p>
            <h2 className="mt-2 font-sans text-2xl font-extrabold leading-tight text-neutral-950 sm:text-[32px]">
              Structure as a competitive advantage.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-600">
              We optimize for reassurance, not scale. Every booking is backed by real
              advisors, transparent pricing, and 15+ years of travel operations through Al
              Ghandour Group.
            </p>

            <div className="animate-shake-periodic mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-3 shadow-[0_6px_16px_rgba(0,0,0,0.06)]">
              <Headphones className="size-4 text-neutral-700" />
              <span className="text-[14px] font-semibold text-neutral-900">
                {supportPhone?.value} 24/7 Customer support
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyBookHighlights.map((item, index) => {
              const { Icon, className } = ICONS[item.icon];
              return (
                <div
                  key={item.id}
                  style={{ transitionDelay: `${index * 120}ms` }}
                  className={cn(
                    "rounded-2xl bg-white p-5 transition-all duration-700 ease-out",
                    isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  )}
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-neutral-100">
                    <Icon className={cn("size-[18px]", className)} />
                  </div>
                  <p className="mt-3 text-[15px] font-bold text-neutral-950">{item.title}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
