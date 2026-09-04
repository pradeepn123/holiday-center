import { cn } from "@/lib/utils";

const TABS = ["Contact Details", "Passport Information", "Preferences"];

export function ProfileTabs({ active }: { active: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      {TABS.map((tab) => (
        <span
          key={tab}
          className={cn(
            "rounded-lg px-4 py-2.5 text-[14px] font-bold",
            tab === active ? "bg-[#224ba0] text-white" : "bg-[#eef1f6] text-[#1e293b]"
          )}
        >
          {tab}
        </span>
      ))}
    </div>
  );
}
