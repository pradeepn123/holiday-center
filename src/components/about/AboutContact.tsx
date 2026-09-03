import { Mail, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { contactEmail, contactPhones } from "@/lib/data";
import { SectionEyebrow } from "./SectionEyebrow";

const australiaPhone = contactPhones.find((phone) => phone.label === "Australia") ?? contactPhones[0];

export function AboutContact() {
  return (
    <section className="bg-[#0d1b3d] py-20">
      <Container>
        <div className="text-center">
          <SectionEyebrow variant="dark">Get In Touch</SectionEyebrow>
          <h2 className="mt-3 text-[28px] font-bold text-white sm:text-[32px]">
            Ready to plan your next escape?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-white/60">
            Our expert travel specialists are available 24/7. Connect with us through whichever
            channel suits you best.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#132a55] p-6">
            <div className="flex size-10 items-center justify-center rounded-full bg-brand-lime/20 text-brand-lime">
              <Phone className="size-[18px]" />
            </div>
            <p className="mt-4 text-[16px] font-bold text-white">Global Phones</p>
            <div className="mt-2 flex flex-col gap-1 text-[13px] text-white/60">
              {contactPhones.map((phone) => (
                <span key={phone.label}>
                  {phone.label}: {phone.value}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#132a55] p-6">
            <div className="flex size-10 items-center justify-center rounded-full bg-brand-lime/20 text-brand-lime">
              <MessageCircle className="size-[18px]" />
            </div>
            <p className="mt-4 text-[16px] font-bold text-white">WhatsApp Support</p>
            <div className="mt-2 flex flex-col gap-1 text-[13px] text-white/60">
              <span>Chat live with us directly</span>
              <span>Fast support &amp; quick booking</span>
              <span>WhatsApp Link Available ({australiaPhone?.value})</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#132a55] p-6">
            <div className="flex size-10 items-center justify-center rounded-full bg-brand-lime/20 text-brand-lime">
              <Mail className="size-[18px]" />
            </div>
            <p className="mt-4 text-[16px] font-bold text-white">Corporate Email</p>
            <div className="mt-2 flex flex-col gap-1 text-[13px] text-white/60">
              <span>General: {contactEmail}</span>
              <span>Reservations: booking@holidayscenter.com</span>
              <span>Support: help@holidayscenter.com</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
