const inputClass =
  "h-11 w-full rounded-xl border border-neutral-200 px-3 text-[14px] outline-none focus:border-brand-blue";
const selectClass =
  "h-11 w-full rounded-xl border border-neutral-200 px-3 text-[14px] text-neutral-700 outline-none focus:border-brand-blue";
const labelClass = "text-[13px] font-medium text-neutral-600";

export function FlightContactForm() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6">
      <p className="text-[16px] font-bold text-neutral-900">Contact us</p>

      <div className="mt-5 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Email Address *</span>
          <input type="email" placeholder="you@example.com" className={inputClass} />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Mobile/Cell *</span>
            <input type="tel" placeholder="Enter mobile number" className={inputClass} />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Pan Number</span>
            <input type="text" placeholder="Enter Pan Number (Optional)" className={inputClass} />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Country *</span>
            <input type="text" placeholder="Enter country" className={inputClass} />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Country Code *</span>
            <select defaultValue="+61" className={selectClass}>
              <option value="+61">+61</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+971">+971</option>
              <option value="+965">+965</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
