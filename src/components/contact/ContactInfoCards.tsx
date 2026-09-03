import { Mail, MapPin, Phone } from "lucide-react";
import { contactEmail, contactPhones, headquartersAddress } from "@/lib/data";

const SUPPORT_LINE_LABELS: Record<string, string> = {
  Australia: "Australia Support",
  USA: "United States",
  Canada: "Canada",
};

function InfoCard({
  icon: Icon,
  children,
}: {
  icon: typeof MapPin;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-neutral-100 bg-white p-6">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function ContactInfoCards() {
  return (
    <>
      <InfoCard icon={MapPin}>
        <p className="text-[16px] font-bold text-neutral-900">Our Headquarters</p>
        <p className="mt-1.5 text-[14px] leading-relaxed text-neutral-500">
          {headquartersAddress}
        </p>
        <span className="mt-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[12px] font-medium text-brand-blue">
          Melbourne, VIC
        </span>
      </InfoCard>

      <InfoCard icon={Mail}>
        <p className="text-[16px] font-bold text-neutral-900">Email Inquiries</p>
        <a
          href={`mailto:${contactEmail}`}
          className="mt-1.5 block text-[14px] font-semibold text-brand-blue hover:underline"
        >
          {contactEmail}
        </a>
        <p className="mt-1 text-[14px] leading-relaxed text-neutral-500">
          For general booking, partnerships, or corporate travel requests.
        </p>
      </InfoCard>

      <InfoCard icon={Phone}>
        <p className="text-[16px] font-bold text-neutral-900">Customer Support Lines</p>
        <div className="mt-3 flex flex-col">
          {contactPhones.map((phone, index) => (
            <div
              key={phone.label}
              className={`flex items-center justify-between gap-3 py-2.5 text-[14px] ${
                index === 0 ? "pt-0" : "border-t border-neutral-100"
              }`}
            >
              <span className="font-semibold text-neutral-800">
                {SUPPORT_LINE_LABELS[phone.label] ?? phone.label}
              </span>
              <a href={`tel:${phone.value.replace(/\s+/g, "")}`} className="font-bold text-brand-blue">
                {phone.value}
              </a>
            </div>
          ))}
        </div>
      </InfoCard>
    </>
  );
}
