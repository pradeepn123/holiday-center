import { CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

export function VoucherHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Logo />
      <div className="flex items-center gap-1.5">
        <CheckCircle2 className="size-[18px] shrink-0 text-green-600" />
        <span className="text-[14px] font-semibold text-black">Booking confirmed</span>
      </div>
    </div>
  );
}
