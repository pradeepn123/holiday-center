import { Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export function CruiseSupportPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] sm:p-8",
        className
      )}
    >
      <span className="inline-block rounded-full bg-[#FDECEA] px-3.5 py-1.5 text-[12px] font-bold tracking-wide text-[#F2705C]">
        CRUISE BOOKING SUPPORT
      </span>

      <h2 className="mt-4 text-[28px] font-extrabold leading-tight text-neutral-950 sm:text-[40px]">
        Begin Your Journey with Expert Guidance
      </h2>

      <p className="mt-3 max-w-[720px] text-[15px] leading-relaxed text-neutral-500">
        Our dedicated cruise consultants are here to tailor your luxury voyage. Reach out via
        email, phone, or instant WhatsApp messaging to secure your cabin.
      </p>

      <div className="mt-4 h-[3px] w-16 rounded-full bg-[#0FA98C]" />

      <div className="mt-6 grid grid-cols-1 items-start gap-4 sm:grid-cols-3">
        <div className="flex items-start gap-3 rounded-[20px] border border-neutral-200 p-6">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#E3F7EF] text-[#0FA98C]">
            <Mail className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
              Email Reservations
            </p>
            <p className="truncate text-[15px] font-bold text-neutral-900">
              reservations@grandtourholidays.com
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-[20px] border border-neutral-200 p-6">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#FDECEA] text-[#F2705C]">
            <Phone className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
              Call Cruise Desk
            </p>
            <p className="truncate text-[15px] font-bold text-neutral-900">+965 22207666</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-[#0E1013] p-5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
              <FaWhatsapp className="size-4" />
            </span>
            <p className="text-[15px] font-semibold text-white">Connect on WhatsApp</p>
          </div>
          <p className="text-[13px] leading-relaxed text-neutral-400">
            Chat directly with booking agents for immediate availability and customized
            stateroom pricing.
          </p>
          <button
            type="button"
            className="mt-1 flex h-12 w-full items-center justify-center rounded-full bg-[#25D366] text-[14px] font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            WhatsApp Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}
