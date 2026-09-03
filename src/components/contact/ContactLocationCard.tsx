import { MapPin } from "lucide-react";

const BUILDING_BLOCKS = [
  { top: "10%", left: "8%", width: "18%", height: "14%" },
  { top: "8%", left: "62%", width: "22%", height: "10%" },
  { top: "22%", left: "30%", width: "14%", height: "20%" },
  { top: "60%", left: "10%", width: "16%", height: "16%" },
  { top: "66%", left: "70%", width: "20%", height: "18%" },
  { top: "40%", left: "78%", width: "14%", height: "12%" },
  { top: "72%", left: "38%", width: "18%", height: "12%" },
  { top: "14%", left: "84%", width: "10%", height: "24%" },
];

export function ContactLocationCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0b0b0c]">
      <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-neutral-900">
        <span className="size-1.5 rounded-full bg-teal-500" />
        Our Location
      </span>

      <div className="relative h-56 w-full">
        {BUILDING_BLOCKS.map((block, index) => (
          <div
            key={index}
            className="absolute rounded-[3px] bg-white/10"
            style={{ top: block.top, left: block.left, width: block.width, height: block.height }}
          />
        ))}
        <div className="absolute left-0 top-1/3 h-px w-full -rotate-6 bg-white/15" />
        <div className="absolute left-0 top-2/3 h-px w-full rotate-3 bg-white/15" />
        <div className="absolute left-1/3 top-0 h-full w-px rotate-6 bg-white/15" />

        <MapPin className="absolute left-1/2 top-1/2 size-11 -translate-x-1/2 -translate-y-[85%] fill-teal-500 text-teal-500 drop-shadow-[0_6px_10px_rgba(0,0,0,0.4)]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-black/70 px-4 py-3 text-center text-[13px] font-medium text-white">
        1/451-459 Sydney Rd, Coburg, VIC 3058
      </div>
    </div>
  );
}
