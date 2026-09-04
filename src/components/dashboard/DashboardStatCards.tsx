import { Building, Calendar, Heart, Plane } from "lucide-react";

const STATS = [
  { label: "Flights Booked", value: 12, icon: Plane, from: "#224ba0", to: "#15306b" },
  { label: "Hotels Booked", value: 8, icon: Building, from: "#224ba0", to: "#15306b" },
  { label: "Upcoming Trips", value: 2, icon: Calendar, from: "#f59e0b", to: "#d97706" },
  { label: "Saved Destinations", value: 14, icon: Heart, from: "#14b8a6", to: "#0f766e" },
];

export function DashboardStatCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex h-[160px] flex-col justify-between rounded-[20px] p-6 shadow-[0_8px_10px_rgba(34,75,160,0.18)]"
          style={{ background: `linear-gradient(to right, ${stat.from}, ${stat.to})` }}
        >
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-medium text-white/80">{stat.label}</p>
            <span className="flex items-center justify-center rounded-full bg-white/15 p-2">
              <stat.icon className="size-4 text-white" />
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[36px] font-bold leading-none text-white">{stat.value}</p>
            <p className="text-[12px] font-medium text-white/80">View details →</p>
          </div>
        </div>
      ))}
    </div>
  );
}
