import { MapPin } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { LegalBlockRenderer } from "@/components/legal/LegalBlockRenderer";
import { ContactLocationMap } from "@/components/contact/ContactLocationMap";
import { feeScheduleBlocks } from "@/lib/feeScheduleContent";

const OWNER_NAME = "Al Ghandour Pty Ltd";
const OWNER_ADDRESS = "1/451-459 Sydney Rd, Coburg, VIC 3058";

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-24">
        <Container className="pt-14">
          <div className="text-center">
            <h1 className="text-[34px] font-extrabold text-[#0d1b3e] sm:text-[40px]">
              Refund Policy
            </h1>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <div className="rounded-2xl border border-neutral-100 bg-white p-6 sm:p-10">
              <div className="flex flex-col gap-6">
                {feeScheduleBlocks.map((block, index) => (
                  <LegalBlockRenderer key={index} block={block} />
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
              <div className="flex flex-col justify-center gap-3 rounded-2xl bg-[#eff4ff] p-8">
                <p className="text-[12px] font-bold uppercase tracking-wide text-[#5a6a80]">
                  Owned By
                </p>
                <p className="text-[22px] font-bold text-[#0d1b3e]">{OWNER_NAME}</p>
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-[18px] shrink-0 text-[#5a6a80]" />
                  <p className="text-[15px] leading-[1.5] text-[#475467]">{OWNER_ADDRESS}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[12px] font-bold uppercase tracking-wide text-[#5a6a80]">
                  Map View
                </p>
                <ContactLocationMap />
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
