"use client";

import { Container } from "@/components/ui/Container";

export function Newsletter() {
  return (
    <section className="bg-[#2C341D] py-12 text-white">
      <Container className="flex flex-wrap items-center justify-between gap-8">
        <div className="max-w-xl">
          <p className="font-sans text-2xl font-extrabold sm:text-3xl">
            We have some good news
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-white/60">
            Sign up newsletter to receive all the offers and discounts From us.
            discounts are only valid for our newsletter subscribers
          </p>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="flex w-full max-w-[520px] items-center gap-3"
        >
          <input
            type="email"
            required
            placeholder="Enter email address"
            className="h-14 w-full flex-1 rounded-xl bg-white px-5 text-[15px] text-neutral-800 placeholder:text-neutral-500 focus:outline-none"
          />
          <button
            type="submit"
            className="h-14 shrink-0 rounded-xl bg-brand-lime px-7 text-[15px] font-semibold text-brand-dark transition-opacity hover:opacity-90"
          >
            Subscribe
          </button>
        </form>
      </Container>
    </section>
  );
}
