import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { faqItems } from "@/lib/data";

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="bg-white pb-24">
        <Container className="pt-20">
          <div className="text-center">
            <h1 className="text-[32px] font-extrabold text-[#101b3d] sm:text-[36px]">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-[16px] text-neutral-500">
              Have questions about your booking? We&apos;ve got answers.
            </p>
          </div>

          <FaqAccordion items={faqItems} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
