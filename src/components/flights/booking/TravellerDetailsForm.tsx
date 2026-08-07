import { ChevronDown } from "lucide-react";

const inputClass =
  "h-11 w-full rounded-xl border border-neutral-200 px-3 text-[14px] outline-none focus:border-brand-blue";
const selectClass =
  "h-11 w-full appearance-none rounded-xl border border-neutral-200 bg-white px-3 pr-8 text-[14px] text-neutral-500 outline-none focus:border-brand-blue";
const labelClass = "text-[13px] font-medium text-neutral-600";

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 20 }, (_, i) => String(CURRENT_YEAR + i));
const SHORT_YEARS = YEARS.map((year) => year.slice(2));

function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className={selectClass + (className ? ` ${className}` : "")}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
    </div>
  );
}

function TravellerFields({ label }: { label: string }) {
  return (
    <div>
      <p className="border-b border-neutral-100 pb-3 text-[14px] font-semibold text-brand-blue">
        {label}
      </p>

      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Title *</span>
          <Select defaultValue="Mr">
            <option>Mr</option>
            <option>Mrs</option>
            <option>Ms</option>
          </Select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>First Name *</span>
          <input type="text" placeholder="Use English Characters Only" className={inputClass} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Last Name *</span>
          <input type="text" placeholder="Use English Characters Only" className={inputClass} />
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <span className={labelClass}>Date of Expiry</span>
        <div className="grid grid-cols-3 gap-4">
          <Select defaultValue="">
            <option value="" disabled>
              DD
            </option>
            {DAYS.map((day) => (
              <option key={day}>{day}</option>
            ))}
          </Select>
          <Select defaultValue="">
            <option value="" disabled>
              MM
            </option>
            {MONTHS.map((month) => (
              <option key={month}>{month}</option>
            ))}
          </Select>
          <Select defaultValue="">
            <option value="" disabled>
              YYYY
            </option>
            {YEARS.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Passport Number</span>
          <input type="text" placeholder="Use English Characters Only" className={inputClass} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Issuing Country</span>
          <Select defaultValue="">
            <option value="" disabled>
              Select Country
            </option>
            <option>Australia</option>
            <option>United Kingdom</option>
            <option>United States</option>
            <option>India</option>
          </Select>
        </label>

        <div className="flex flex-col gap-1.5">
          <span className={labelClass}>Date of Expiry</span>
          <div className="grid grid-cols-3 gap-2">
            <Select defaultValue="">
              <option value="" disabled>
                DD
              </option>
              {DAYS.map((day) => (
                <option key={day}>{day}</option>
              ))}
            </Select>
            <Select defaultValue="">
              <option value="" disabled>
                MM
              </option>
              {MONTHS.map((month) => (
                <option key={month}>{month}</option>
              ))}
            </Select>
            <Select defaultValue="">
              <option value="" disabled>
                YY...
              </option>
              {SHORT_YEARS.map((year) => (
                <option key={year}>{year}</option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TravellerDetailsForm({ passengers }: { passengers: number }) {
  const count = Math.max(1, Math.min(passengers, 9));

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6">
      <p className="text-[16px] font-bold text-neutral-900">Enter Passenger Information</p>
      <p className="mt-1 text-[13px] text-neutral-500">
        Important: Please enter the name as per passport
      </p>

      <div className="mt-5 flex flex-col gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <TravellerFields key={index} label={index === 0 ? "Adult" : `Adult ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}
