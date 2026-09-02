import { ChevronDown } from "lucide-react";
import { distributeChildren } from "@/lib/roomGuests";
import { cn } from "@/lib/utils";

const inputClass =
  "h-11 w-full rounded-xl border border-neutral-200 px-3 text-[14px] outline-none focus:border-brand-blue";
const labelClass = "text-[13px] font-medium text-neutral-600";

function AdultFields({ label, defaultTitle }: { label: string; defaultTitle: string }) {
  return (
    <div>
      <p className="border-b border-neutral-100 pb-3 text-[14px] font-semibold text-neutral-900">
        {label}
      </p>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-[110px_1fr_1fr]">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Title</span>
          <div className="relative">
            <select
              defaultValue={defaultTitle}
              className={cn(inputClass, "appearance-none pr-8")}
            >
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>Ms.</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          </div>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>First Name</span>
          <input type="text" placeholder="e.g. John" className={inputClass} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Last Name</span>
          <input type="text" placeholder="e.g. Doe" className={inputClass} />
        </label>
      </div>
    </div>
  );
}

function ChildFields({ label }: { label: string }) {
  return (
    <div>
      <p className="border-b border-neutral-100 pb-3 text-[14px] font-semibold text-neutral-900">
        {label}
      </p>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-[2fr_2fr_1fr]">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>First Name</span>
          <input type="text" placeholder="e.g. Emma" className={inputClass} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Last Name</span>
          <input type="text" placeholder="e.g. Doe" className={inputClass} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Age</span>
          <input type="number" min={0} max={17} placeholder="e.g. 8" className={inputClass} />
        </label>
      </div>
    </div>
  );
}

function RoomGuestCard({
  roomNumber,
  roomType,
  childrenCount,
}: {
  roomNumber: number;
  roomType: string;
  childrenCount: number;
}) {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-3">
          <p className="text-[16px] font-bold text-neutral-900">Guest Details</p>
          <span className="rounded-full bg-neutral-900 px-3 py-1 text-[12px] font-semibold text-white">
            Room {roomNumber}
          </span>
        </div>
        <p className="text-[13px] text-neutral-500">
          Type: <span className="font-semibold text-neutral-700">{roomType}</span>
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-6">
        <AdultFields label="Adult 1 (Primary Guest)" defaultTitle="Mr." />
        <AdultFields label="Adult 2" defaultTitle="Mrs." />
        {Array.from({ length: childrenCount }).map((_, index) => (
          <ChildFields key={index} label={`Child ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

export function GuestDetailsForm({
  roomType,
  roomsCount,
  childrenCount,
}: {
  roomType: string;
  roomsCount: number;
  childrenCount: number;
}) {
  const childrenPerRoom = distributeChildren(childrenCount, roomsCount);

  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: roomsCount }).map((_, index) => (
        <RoomGuestCard
          key={index}
          roomNumber={index + 1}
          roomType={roomType}
          childrenCount={childrenPerRoom[index]}
        />
      ))}
    </div>
  );
}
