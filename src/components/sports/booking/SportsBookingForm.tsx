"use client";

import { useState } from "react";
import { ArrowRight, Calendar, ChevronDown } from "lucide-react";
import { SingleDateField } from "@/components/ui/DatePicker";
import { startOfToday, toISODate } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";

const inputClass =
  "h-11 w-full rounded-lg border border-neutral-200 px-3 text-[14px] outline-none placeholder:text-neutral-400 focus:border-brand-blue";
const selectClass =
  "h-11 w-full appearance-none rounded-lg border border-neutral-200 bg-white px-3 pr-8 text-[14px] text-neutral-500 outline-none focus:border-brand-blue";
const labelClass = "text-[13px] font-medium text-neutral-700";
const cardShadowClass =
  "shadow-[0_9px_20px_0_rgba(0,0,0,0.05),0_16px_32px_0_rgba(0,0,0,0.04)]";

const NATIONALITIES = ["Australia", "United Kingdom", "United States", "United Arab Emirates", "India"];
const COUNTRIES = ["Australia", "United Kingdom", "United States", "United Arab Emirates", "India"];

const today = startOfToday();
const MAX_BIRTH_DATE_ISO = toISODate(today);
const MIN_BIRTH_DATE_ISO = toISODate(new Date(today.getFullYear() - 120, today.getMonth(), today.getDate()));

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

function Select({ defaultValue, options }: { defaultValue: string; options: string[] }) {
  return (
    <div className="relative">
      <select defaultValue="" aria-label={defaultValue} className={selectClass}>
        <option value="" disabled>
          {defaultValue}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
    </div>
  );
}

export function SportsBookingForm() {
  const [agreed, setAgreed] = useState(true);

  return (
    <div className="flex flex-col gap-6">
      <div className={cn("rounded-2xl bg-white p-6", cardShadowClass)}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[16px] font-bold text-neutral-900">Lead Passenger Details</p>
          <span className="rounded-full bg-brand-lime/40 px-3 py-1 text-[12px] font-semibold text-brand-dark">
            Primary Traveler
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="First Name *">
            <input type="text" placeholder="e.g. Sarah" className={inputClass} />
          </Field>
          <Field label="Last Name *">
            <input type="text" placeholder="e.g. Jenkins" className={inputClass} />
          </Field>
          <Field label="Passport No. *">
            <input type="text" placeholder="e.g. NY908311B" className={inputClass} />
          </Field>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Date of Birth *">
            <SingleDateField
              icon={<Calendar className="size-4" />}
              placeholder="DD-MM-YYYY"
              minDateIso={MIN_BIRTH_DATE_ISO}
              maxDateIso={MAX_BIRTH_DATE_ISO}
              enableYearMonthJump
              iconPosition="right"
              triggerClassName={cn(inputClass, "pr-9")}
            />
          </Field>
          <Field label="Nationality *">
            <Select defaultValue="Select Nationality" options={NATIONALITIES} />
          </Field>
          <Field label="City of Birth *">
            <input type="text" placeholder="e.g. New York" className={inputClass} />
          </Field>
        </div>
      </div>

      <div className={cn("rounded-2xl bg-white p-6", cardShadowClass)}>
        <p className="text-[16px] font-bold text-neutral-900">Billing Details</p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full Name *">
            <input type="text" placeholder="As shown on card" className={inputClass} />
          </Field>
          <Field label="Email *">
            <input type="email" placeholder="e.g. sarah.j@outlook.com" className={inputClass} />
          </Field>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Phone number *">
            <input type="tel" placeholder="e.g. +1 (555) 019-2834" className={inputClass} />
          </Field>
          <Field label="Country *">
            <Select defaultValue="Select Country" options={COUNTRIES} />
          </Field>
        </div>
      </div>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          className="mt-0.5 size-[18px] shrink-0 rounded-md border-neutral-300 text-brand-dark focus:ring-brand-dark"
        />
        <span className="text-[13px] leading-relaxed text-neutral-600">
          By selecting to complete this booking I agree to pay the total amount shown, which
          includes all applicable fees and taxes, booking processing fees, and I acknowledge that
          I have read and accept the Holiday Booking Terms and Conditions and Privacy Policy.
        </span>
      </label>

      <button
        type="button"
        disabled={!agreed}
        className="flex h-12 w-fit items-center gap-2 rounded-xl bg-brand-dark px-6 text-[14px] font-semibold text-brand-lime transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
        <ArrowRight className="size-4" />
      </button>
    </div>
  );
}
