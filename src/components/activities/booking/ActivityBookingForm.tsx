"use client";

import Image from "next/image";
import { AlertTriangle, Clock, MapPin } from "lucide-react";
import { StarRating } from "@/components/ui/Star";
import { formatDate } from "@/lib/dateUtils";
import type { ActivityBookingOption } from "@/lib/data";
import type { ActivityResult } from "@/types";

const inputClass =
  "h-11 w-full rounded-lg border border-neutral-200 px-3 text-[14px] outline-none placeholder:text-neutral-400 focus:border-brand-blue";
const readOnlyClass =
  "h-11 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-[14px] text-neutral-700 outline-none";
const labelClass = "text-[13px] font-medium text-neutral-700";
const selectClass =
  "h-11 w-full appearance-none rounded-lg border border-neutral-200 bg-white px-3 text-[14px] text-neutral-700 outline-none focus:border-brand-blue";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

function PassengerFields({ label, defaultTitle }: { label: string; defaultTitle: string }) {
  return (
    <div>
      <p className="text-[14px] font-bold text-neutral-900">{label}</p>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_2fr_2fr]">
        <Field label="Title">
          <select defaultValue={defaultTitle} className={selectClass}>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
        </Field>
        <Field label="First Name">
          <input type="text" placeholder="e.g. John" className={inputClass} />
        </Field>
        <Field label="Last Name">
          <input type="text" placeholder="e.g. Doe" className={inputClass} />
        </Field>
      </div>
    </div>
  );
}

function ChildFields({ label }: { label: string }) {
  return (
    <div>
      <p className="text-[14px] font-bold text-neutral-900">{label}</p>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-[2fr_2fr_1fr]">
        <Field label="First Name">
          <input type="text" placeholder="e.g. Emma" className={inputClass} />
        </Field>
        <Field label="Last Name">
          <input type="text" placeholder="e.g. Doe" className={inputClass} />
        </Field>
        <Field label="Age">
          <input type="number" min={0} max={17} placeholder="e.g. 8" className={inputClass} />
        </Field>
      </div>
    </div>
  );
}

function cancellationCutoffLabel(selectedDateIso: string): string {
  const [year, month, day] = selectedDateIso.split("-").map(Number);
  const cutoff = new Date(year, month - 1, day - 3);
  const y = cutoff.getFullYear();
  const m = String(cutoff.getMonth() + 1).padStart(2, "0");
  const d = String(cutoff.getDate()).padStart(2, "0");
  return `${d}-${m}-${y}`;
}

export function ActivityBookingForm({
  activity,
  option,
  selectedDateIso,
  adults,
  childrenCount,
  total,
}: {
  activity: ActivityResult;
  option: ActivityBookingOption;
  selectedDateIso: string;
  adults: number;
  childrenCount: number;
  total: number;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white sm:flex-row">
        <div className="relative h-[160px] w-full shrink-0 overflow-hidden sm:h-auto sm:w-[220px]">
          <Image src={activity.image} alt={activity.title} fill sizes="220px" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-2 p-4 sm:p-5">
          <p className="text-[18px] font-bold leading-snug text-neutral-900">{activity.title}</p>
          <div className="flex items-center gap-1.5 text-[13px] text-neutral-500">
            <MapPin className="size-3.5 shrink-0" />
            {activity.location}
          </div>
          <div className="flex items-center gap-1.5 text-[13px] text-neutral-500">
            <Clock className="size-3.5 shrink-0" />
            {activity.durationLabel}
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 items-center justify-center rounded-md bg-[#E8F5E9] px-1.5 text-[12px] font-bold text-[#2E7D32]">
              {activity.rating.toFixed(1)}
            </span>
            <StarRating rating={activity.rating} />
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl bg-[#2C341D] p-4 text-white">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-400" />
        <div>
          <p className="text-[14px] font-bold">Cancellation Policy Warning</p>
          <p className="mt-1 text-[13px] leading-relaxed text-neutral-300">
            Cancellation from {cancellationCutoffLabel(selectedDateIso)} will charge USD{" "}
            {total.toFixed(2)}. For support, contact info@holidayscenter.com
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-100 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
          <p className="text-[16px] font-bold text-neutral-900">Enter Passenger Information</p>
          <span className="text-[13px] font-medium text-neutral-500">Type: {option.type}</span>
        </div>

        <div className="mt-5 flex flex-col gap-6">
          {Array.from({ length: adults }).map((_, index) => (
            <PassengerFields
              key={`adult-${index}`}
              label={index === 0 ? "Adult 1 (Primary Guest)" : `Adult ${index + 1}`}
              defaultTitle={index === 0 ? "Mr." : "Mrs."}
            />
          ))}
          {Array.from({ length: childrenCount }).map((_, index) => (
            <ChildFields key={`child-${index}`} label={`Child ${index + 1}`} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-100 bg-white p-6">
        <p className="text-[16px] font-bold text-neutral-900">Pick Up Location</p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Selected Date">
            <input type="text" readOnly value={formatDate(selectedDateIso)} className={readOnlyClass} />
          </Field>
          <Field label="Please Provide the name of your hotel*">
            <input type="text" placeholder="e.g. Marina Bay Sands" className={inputClass} />
          </Field>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Please provide the address of the hotel">
            <input type="text" placeholder="e.g. 10 Bayfront Avenue" className={inputClass} />
          </Field>
          <Field label="Guests telephone with international code required">
            <input type="tel" placeholder="e.g. +65 9123 4567" className={inputClass} />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-100 bg-white p-6">
        <p className="text-[16px] font-bold text-neutral-900">Guest Details (Contact Information)</p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_100px_minmax(0,1fr)]">
          <Field label="Email Address">
            <input type="email" placeholder="e.g. alex.prokhorov@example.com" className={inputClass} />
          </Field>
          <Field label="Code">
            <input type="text" defaultValue="+61" className={inputClass} />
          </Field>
          <Field label="Mobile Number">
            <input type="tel" placeholder="e.g. 123 456 7890" className={inputClass} />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-100 bg-white p-6">
        <p className="text-[16px] font-bold text-neutral-900">Contract Remark</p>

        <div className="mt-4 flex flex-col gap-3 text-[14px] leading-relaxed text-neutral-600">
          <p>
            <span className="font-semibold text-neutral-900">Meeting point:</span> {activity.location}{" "}
            attraction entrance, at the main ticket counter.
          </p>
          <p>
            <span className="font-semibold text-neutral-900">Meeting point instructions:</span> Please
            arrive at least 15 minutes before your selected time slot. Show your e-voucher and a valid
            photo ID at the counter to collect your tickets.
          </p>
          <p>
            <span className="font-semibold text-neutral-900">Duration:</span> {activity.durationLabel}.
          </p>
          <p>
            <span className="font-semibold text-neutral-900">Included:</span> Entry tickets, access to
            all included attractions, and any activities listed in the package.
          </p>
          <p>
            <span className="font-semibold text-neutral-900">Not included:</span> Food and beverages,
            hotel transfers, and any optional add-on experiences.
          </p>
          <p>
            <span className="font-semibold text-neutral-900">Mandatory instructions:</span> Please ensure
            you have answered any mandatory questions during the booking process. This activity may not
            be suitable for pregnant women or those with heart or back problems.
          </p>
          <p>
            <span className="font-semibold text-neutral-900">Recommendations:</span>{" "}
            Comfortable footwear is recommended. Don&apos;t forget sun protection and a camera.
          </p>
          <p>
            <span className="font-semibold text-neutral-900">Voucher type:</span> E-voucher. Show the
            voucher on your mobile device to enjoy the activity.
          </p>
          <p>
            <span className="font-semibold text-neutral-900">Supplier emergency phone:</span> +65 6123
            4567.
          </p>
        </div>
      </div>

      <div>
        <p className="max-w-2xl text-[13px] leading-relaxed text-neutral-500">
          By booking this item, you agree to pay the total amount shown which includes Service Fees and
          taxes. Review the{" "}
          <a href="#" className="text-brand-blue hover:underline">
            Booking Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-brand-blue hover:underline">
            Privacy Policy
          </a>{" "}
          for details.
        </p>

        <button
          type="button"
          className="mt-4 flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
