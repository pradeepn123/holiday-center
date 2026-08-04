import { ChevronDown } from "lucide-react";

const inputClass =
  "h-11 w-full rounded-xl border border-neutral-200 px-3 text-[14px] outline-none focus:border-brand-blue";
const labelClass = "text-[13px] font-medium text-neutral-600";

export function ContactInfoForm() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6">
      <p className="border-b border-neutral-100 pb-4 text-[16px] font-bold text-neutral-900">
        Guest Details (Contact Information)
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_120px_1fr]">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Email Address</span>
          <input
            type="email"
            placeholder="alex.prokhorov@example.com"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Code</span>
          <input type="text" placeholder="+61" className={inputClass} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Mobile Number</span>
          <div className="flex h-11 items-center justify-between rounded-xl border border-neutral-200 px-3">
            <input
              type="tel"
              placeholder="123 456 7890"
              className="w-full min-w-0 bg-transparent text-[14px] outline-none"
            />
            <ChevronDown className="size-4 shrink-0 text-neutral-400" />
          </div>
        </label>
      </div>
    </div>
  );
}
