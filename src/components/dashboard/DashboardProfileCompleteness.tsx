import { PlusCircle, ShieldUser } from "lucide-react";

const QUICK_ACTIONS = [
  { icon: ShieldUser, label: "Update Password" },
  { icon: PlusCircle, label: "Add Companion Traveler" },
];

export function DashboardProfileCompleteness() {
  return (
    <div className="flex w-full flex-col gap-6 rounded-[24px] border border-[#e2e8f0] bg-white p-6 shadow-[0_4px_8px_rgba(15,23,42,0.03)] sm:p-8 lg:w-[400px] lg:shrink-0">
      <div className="flex flex-col gap-1">
        <p className="text-[18px] font-bold text-[#071516]">Profile Completeness</p>
        <p className="text-[12px] text-[#4a5568]">Keep your details updated for faster bookings.</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-2 w-full rounded-full bg-[#f5f8ff]">
          <div className="h-full w-[80%] rounded-full bg-[#224ba0]" />
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <p className="font-semibold text-[#224ba0]">80% Complete</p>
          <p className="text-[#94a3b8]">Add Payment Method (+20%)</p>
        </div>
      </div>

      <div className="h-px w-full bg-[#e2e8f0]" />

      <div className="flex flex-col gap-3">
        <p className="text-[14px] font-bold text-[#071516]">Quick Actions</p>
        <div className="flex flex-col gap-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              type="button"
              className="flex items-center gap-2.5 rounded-xl bg-[#f5f8ff] p-3 text-left transition-colors hover:bg-[#eaf0ff]"
            >
              <action.icon className="size-3.5 text-[#224ba0]" />
              <span className="text-[13px] font-semibold text-[#071516]">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
