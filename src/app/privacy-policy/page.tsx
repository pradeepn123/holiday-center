import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { LegalTableOfContents } from "@/components/legal/LegalTableOfContents";
import { LegalMobileToc } from "@/components/legal/LegalMobileToc";
import { LegalSections } from "@/components/legal/LegalSections";
import { privacyPolicyIntro, privacyPolicySections } from "@/lib/privacyPolicyContent";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-24">
        <Container className="pt-14">
          <div className="text-center">
            <h1 className="text-[34px] font-extrabold text-[#0d1b3e] sm:text-[40px]">
              Privacy Policy
            </h1>
          </div>

          <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-10">
            <div className="lg:hidden">
              <LegalMobileToc sections={privacyPolicySections} />
            </div>
            <LegalTableOfContents sections={privacyPolicySections} />

            <div className="min-w-0 flex-1 rounded-2xl border border-neutral-100 bg-white p-6 sm:p-10">
              <LegalSections intro={privacyPolicyIntro} sections={privacyPolicySections} />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
