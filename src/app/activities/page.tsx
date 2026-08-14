import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SearchWidget } from "@/components/sections/SearchWidget";
import { ActivityResultsSection } from "@/components/activities/ActivityResultsSection";
import { activities } from "@/lib/data";

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const adults = Math.max(1, Math.min(Number(firstValue(query.adults)) || 2, 9));
  const children = Math.max(0, Math.min(Number(firstValue(query.children)) || 0, 6));

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
          <ActivityResultsSection activities={activities} adults={adults} childrenCount={children} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
