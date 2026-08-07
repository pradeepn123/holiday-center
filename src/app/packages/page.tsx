import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SearchWidget } from "@/components/sections/SearchWidget";
import { PackageResultsSection } from "@/components/packages/PackageResultsSection";
import { tourPackages } from "@/lib/data";

export default function PackagesPage() {
  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-20">
        <div className="bg-[#2C341D] py-6">
          <Container>
            <SearchWidget showCategoryTabs={false} initialCategory="packages" />
          </Container>
        </div>

        <Container className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
          <PackageResultsSection packages={tourPackages} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
