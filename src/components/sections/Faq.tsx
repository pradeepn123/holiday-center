"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { faqItems } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section>
      <Container>
        <h2 className="text-center font-sans text-2xl font-extrabold text-neutral-950 sm:text-[28px]">
          Travel guides and FAQ
        </h2>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3">
          {faqItems.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="rounded-xl border border-neutral-200 bg-white">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] leading-snug text-neutral-800">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-neutral-400 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-[14px] leading-relaxed text-neutral-500">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
