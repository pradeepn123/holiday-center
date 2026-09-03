import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { ContactLocationCard } from "@/components/contact/ContactLocationCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { generateVerificationCode } from "@/lib/verificationCode";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  const initialVerificationCode = generateVerificationCode();

  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-20">
        <Container className="pt-16">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-brand-blue">
              <span className="size-1.5 rounded-full bg-brand-blue" />
              Connect With Us
            </span>

            <h1 className="mt-3 text-[40px] font-extrabold leading-tight text-neutral-950 sm:text-[52px]">
              Get in Touch
            </h1>

            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-neutral-500">
              Have a destination in mind or need assistance with your existing booking? Our
              travel specialists are always here to design your perfect holiday.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            <div className="flex flex-col gap-6">
              <ContactInfoCards />
              <ContactLocationCard />
            </div>

            <div className="flex rounded-2xl border border-neutral-100 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:p-8">
              <ContactForm initialVerificationCode={initialVerificationCode} />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
