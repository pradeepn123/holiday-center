import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SearchWidget } from "@/components/sections/SearchWidget";
import { ActivityResultsSection } from "@/components/activities/ActivityResultsSection";
import { activities } from "@/lib/data";

export default function ActivitiesPage() {
  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-24 lg:pb-20">
        <div className="bg-[#2C341D] py-4 sm:py-6">
          <Container>
            <SearchWidget showCategoryTabs={false} initialCategory="activities" compactOnMobile />
          </Container>
        </div>

        <Container className="mt-5 grid grid-cols-1 gap-5 sm:mt-8 lg:mt-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start lg:gap-8">
          <ActivityResultsSection activities={activities} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
