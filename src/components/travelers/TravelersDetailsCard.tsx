import { UserPlus } from "lucide-react";

export function TravelersDetailsCard() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white">
      <div className="h-1.5 w-full bg-[#224ba0]" />

      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between border-b border-dashed border-neutral-200 pb-6">
          <div className="flex items-center gap-3">
            <span className="h-5 w-1 rounded-full bg-[#224ba0]" />
            <p className="text-[20px] font-bold text-[#0f172a]">Traveler&apos;s Details</p>
          </div>
          <button
            type="button"
            className="rounded-lg bg-[#224ba0] px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#1b3a80]"
          >
            Add Traveler
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-[#eef2ff]">
            <UserPlus className="size-7 text-[#224ba0]" />
          </span>
          <p className="text-[15px] text-[#334155]">No traveler&apos;s added</p>
        </div>
      </div>
    </div>
  );
}
