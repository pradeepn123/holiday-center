import { AlertCircle } from "lucide-react";
import { contactEmail } from "@/lib/data";

export function CancellationWarningBanner() {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-[#2C341D] p-4">
      <AlertCircle className="mt-0.5 size-5 shrink-0 text-white" />
      <div>
        <p className="text-[14px] font-semibold text-white">Cancellation Policy Warning</p>
        <p className="mt-0.5 text-[13px] leading-relaxed text-white/70">
          100 Percentage charge from 23-05-2026. Charge Applicable. For support, contact{" "}
          <a href={`mailto:${contactEmail}`} className="text-white underline hover:text-white/80">
            {contactEmail}
          </a>
        </p>
      </div>
    </div>
  );
}
