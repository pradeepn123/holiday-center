import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { HotelGallery } from "@/components/hotels/HotelGallery";
import { ActivityInfoBar } from "@/components/activities/ActivityInfoBar";
import { ActivityDetailsTabs } from "@/components/activities/ActivityDetailsTabs";
import { getActivityById } from "@/lib/data";

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function ActivityDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ activityId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { activityId } = await params;
  const activity = getActivityById(activityId);

  if (!activity) {
    notFound();
  }

  const query = await searchParams;
  const adults = Math.max(1, Math.min(Number(firstValue(query.adults)) || 2, 9));
  const children = Math.max(0, Math.min(Number(firstValue(query.children)) || 0, 6));

  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-20">
        <HotelGallery images={activity.gallery} name={activity.title} />

        <Container className="mt-4">
          <ActivityInfoBar activity={activity} />
        </Container>

        <Container className="mt-6">
          <ActivityDetailsTabs activity={activity} adults={adults} childrenCount={children} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
