import { MapPin } from "lucide-react";
import { StarRating } from "@/components/ui/Star";
import type { ActivityResult } from "@/types";

export function ActivityInfoBar({ activity }: { activity: ActivityResult }) {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5">
      <p className="text-lg font-bold text-neutral-900">{activity.title}</p>

      <div className="mt-2 flex items-center gap-1.5 text-[14px] text-neutral-500">
        <MapPin className="size-4 shrink-0" />
        {activity.location}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="flex h-7 items-center justify-center rounded-md bg-[#E8F5E9] px-2 text-[13px] font-bold text-[#2E7D32]">
          {activity.rating.toFixed(1)}
        </span>
        <StarRating rating={activity.rating} />
      </div>
    </div>
  );
}
