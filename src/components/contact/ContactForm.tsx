"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Globe, Mail, Phone, User } from "lucide-react";
import { generateVerificationCode } from "@/lib/verificationCode";

const COUNTRY_CODES = [
  { label: "Australia (+61)", value: "+61" },
  { label: "United States (+1)", value: "+1" },
  { label: "Canada (+1)", value: "+1" },
  { label: "United Kingdom (+44)", value: "+44" },
];

const inputClass =
  "h-12 w-full rounded-xl border border-neutral-200 pl-10 pr-3 text-[14px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-brand-blue";
const labelClass = "text-[13px] font-semibold text-neutral-800";

function IconField({
  icon: Icon,
  children,
}: {
  icon: typeof User;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
      {children}
    </div>
  );
}

export function ContactForm({ initialVerificationCode }: { initialVerificationCode: string }) {
  const [verificationCode, setVerificationCode] = useState(initialVerificationCode);
  const [enteredCode, setEnteredCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (enteredCode.trim().toLowerCase() !== verificationCode.toLowerCase()) {
      setError("The verification code doesn't match. Please try again.");
      setVerificationCode(generateVerificationCode());
      setEnteredCode("");
      return;
    }

    setError(null);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
        <CheckCircle2 className="size-12 text-green-600" />
        <p className="text-[18px] font-bold text-neutral-900">Message sent successfully</p>
        <p className="max-w-sm text-[14px] text-neutral-500">
          Thanks for reaching out — one of our travel specialists will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-blue">
          Help Desk
        </span>
        <span className="text-[13px] text-neutral-500">Typically responds in &lt;15 mins</span>
      </div>

      <h2 className="mt-3 text-[22px] font-bold text-neutral-900">Send a Message</h2>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>
              Name <span className="text-red-500">*</span>
            </span>
            <IconField icon={User}>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                className={inputClass}
              />
            </IconField>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>
              Email Address <span className="text-red-500">*</span>
            </span>
            <IconField icon={Mail}>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </IconField>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>
              Country Code <span className="text-red-500">*</span>
            </span>
            <IconField icon={Globe}>
              <select
                required
                defaultValue={COUNTRY_CODES[0].label}
                className={`${inputClass} appearance-none pr-8`}
              >
                {COUNTRY_CODES.map((country) => (
                  <option key={country.label} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            </IconField>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>
              Phone Number <span className="text-red-500">*</span>
            </span>
            <IconField icon={Phone}>
              <input
                type="tel"
                required
                placeholder="0400 000 000"
                className={inputClass}
              />
            </IconField>
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>
            Message <span className="text-red-500">*</span>
          </span>
          <textarea
            required
            rows={5}
            placeholder="Please enter your message here..."
            className="w-full resize-none rounded-xl border border-neutral-200 p-3 text-[14px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-brand-blue"
          />
        </label>

        <div className="flex flex-col gap-1.5">
          <span className={labelClass}>
            Verification <span className="text-red-500">*</span>
          </span>
          <div className="flex items-stretch gap-3">
            <div className="flex h-12 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 px-5 font-mono text-[16px] font-bold tracking-wide text-brand-blue select-none">
              {verificationCode}
            </div>
            <input
              type="text"
              required
              value={enteredCode}
              onChange={(event) => setEnteredCode(event.target.value)}
              placeholder="Enter code"
              className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-[14px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-brand-blue"
            />
          </div>
          {error && <span className="text-[13px] font-medium text-red-500">{error}</span>}
        </div>

        <button
          type="submit"
          className="mt-1 flex h-14 w-full items-center justify-center rounded-xl bg-brand-blue text-[16px] font-bold text-white transition-colors hover:bg-brand-blue-dark"
        >
          Submit Message
        </button>
      </form>
    </div>
  );
}
