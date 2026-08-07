"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { TourPackage } from "@/types";

export function PackageInquiryModal({
  pkg,
  total,
  travelDate,
  onClose,
}: {
  pkg: TourPackage;
  total: number;
  travelDate: string;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-[480px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-neutral-100 px-6 py-4">
          <p className="text-[17px] font-bold text-neutral-900">
            {submitted ? "Inquiry Sent" : "Send Inquiry"}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-neutral-700"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {submitted ? (
            <p className="text-[14px] leading-relaxed text-neutral-600">
              Thanks for your interest in {pkg.title}. Our travel team will get back to you
              shortly with a tailored quote.
            </p>
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="rounded-xl bg-neutral-50 px-4 py-3 text-[13px] text-neutral-600">
                <p className="font-semibold text-neutral-900">{pkg.title}</p>
                <p className="mt-0.5">
                  {travelDate ? travelDate : "Travel date not selected"} · Total USD{" "}
                  {total.toFixed(2)}
                </p>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-neutral-600">Full Name</span>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  className="h-11 rounded-xl border border-neutral-200 px-3 text-[14px] text-neutral-900 outline-none focus:border-brand-blue"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-neutral-600">Email</span>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="h-11 rounded-xl border border-neutral-200 px-3 text-[14px] text-neutral-900 outline-none focus:border-brand-blue"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-neutral-600">Phone Number</span>
                <input
                  type="tel"
                  required
                  placeholder="+1 234 567 8900"
                  className="h-11 rounded-xl border border-neutral-200 px-3 text-[14px] text-neutral-900 outline-none focus:border-brand-blue"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-neutral-600">Message</span>
                <textarea
                  rows={3}
                  placeholder="Any specific requirements..."
                  className="resize-none rounded-xl border border-neutral-200 px-3 py-2.5 text-[14px] text-neutral-900 outline-none focus:border-brand-blue"
                />
              </label>

              <button
                type="submit"
                className="mt-1 flex h-12 w-full items-center justify-center rounded-xl bg-brand-blue text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
