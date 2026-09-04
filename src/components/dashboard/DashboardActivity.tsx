import { Heart, PlaneTakeoff, Building } from "lucide-react";

const ACTIVITIES = [
  {
    icon: PlaneTakeoff,
    title: "Flight booked to Paris, France",
    description: "Flight LH-1044 confirmed departing on Oct 12, 2026.",
    time: "2 hours ago",
  },
  {
    icon: Building,
    title: "Hotel reservation updated",
    description: "Changed guest preferences at Grand Plaza Resort.",
    time: "1 day ago",
  },
  {
    icon: Heart,
    title: "Added Maldives Retreat to saved trips",
    description: "Saved custom luxury villa itinerary.",
    time: "3 days ago",
  },
];

export function DashboardActivity() {
  return (
    <div className="flex flex-1 flex-col gap-5 rounded-[24px] border border-[#e2e8f0] bg-white p-6 shadow-[0_4px_8px_rgba(15,23,42,0.03)] sm:p-8">
      <p className="text-[18px] font-bold text-[#071516]">Recent Activity</p>

      <div className="flex flex-col">
        {ACTIVITIES.map((activity, index) => (
          <div
            key={activity.title}
            className={`flex items-center gap-4 py-4 ${
              index === ACTIVITIES.length - 1 ? "" : "border-b border-[#e2e8f0]"
            }`}
          >
            <span className="flex shrink-0 items-center justify-center rounded-xl bg-[#f5f8ff] p-2.5">
              <activity.icon className="size-4 text-[#224ba0]" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="text-[14px] font-semibold text-[#071516]">{activity.title}</p>
              <p className="text-[12px] text-[#4a5568]">{activity.description}</p>
            </div>
            <p className="shrink-0 whitespace-nowrap text-right text-[12px] text-[#94a3b8]">
              {activity.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
