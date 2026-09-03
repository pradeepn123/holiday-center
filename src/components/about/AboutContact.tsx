import { Mail, MessageCircle, Phone } from "lucide-react";
import { AboutContainer } from "./AboutContainer";
import { SectionEyebrow } from "./SectionEyebrow";

const GLOBAL_PHONES = [
  { label: "Australia", value: "+61 1800 313 051" },
  { label: "USA", value: "+1 725 565 0434" },
  { label: "Canada", value: "+1 778 819 8144" },
];

export function AboutContact() {
  return (
    <section className="bg-[#0b1f3a] py-16 lg:py-[100px]">
      <AboutContainer className="flex flex-col gap-10 lg:gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionEyebrow variant="dark">Get In Touch</SectionEyebrow>
          <h2 className="max-w-[843px] text-[32px] font-normal text-white lg:text-[44px]">
            Ready to plan your next escape?
          </h2>
          <p className="max-w-[843px] text-[16px] text-white">
            Our expert travel specialists are available 24/7. Connect with us through whichever
            channel suits you best.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-5 rounded-lg border border-[#224ba0] bg-[#0f2a5a] p-8">
            <div className="flex items-center gap-3">
              <Phone className="size-5 text-white" />
              <p className="text-[20px] font-normal text-white">Global Phones</p>
            </div>
            <div className="flex flex-col gap-2 text-[14px] text-white">
              {GLOBAL_PHONES.map((phone) => (
                <span key={phone.label}>
                  {phone.label}: {phone.value}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5 rounded-lg border border-[#224ba0] bg-[#0f2a5a] p-8">
            <div className="flex items-center gap-3">
              <MessageCircle className="size-5 text-white" />
              <p className="text-[20px] font-normal text-white">WhatsApp Support</p>
            </div>
            <div className="flex flex-col gap-2 text-[14px] text-white">
              <span>Chat live with us directly</span>
              <span>Fast support &amp; quick booking</span>
              <span>WhatsApp Link Available</span>
            </div>
          </div>

          <div className="flex flex-col gap-5 rounded-lg border border-[#224ba0] bg-[#0f2a5a] p-8">
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-white" />
              <p className="text-[20px] font-normal text-white">Corporate Email</p>
            </div>
            <div className="flex flex-col gap-2 text-[14px] text-white">
              <span>General: info@holidayscenter.com</span>
              <span>Reservations: booking@holidayscenter.com</span>
              <span>Support: help@holidayscenter.com</span>
            </div>
          </div>
        </div>
      </AboutContainer>
    </section>
  );
}
