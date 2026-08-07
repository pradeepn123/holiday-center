import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { HotelGallery } from "@/components/hotels/HotelGallery";
import { ActivityInfoBar } from "@/components/activities/ActivityInfoBar";
import { ActivityDetailsTabs } from "@/components/activities/ActivityDetailsTabs";
import { getActivityById } from "@/lib/data";

export default async function ActivityDetailsPage({
  params,
}: {
  params: Promise<{ activityId: string }>;
}) {
  const { activityId } = await params;
  const activity = getActivityById(activityId);

  if (!activity) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-20">
        <HotelGallery images={activity.gallery} name={activity.title} />

        <Container className="mt-4">
          <ActivityInfoBar activity={activity} />
        </Container>

        <Container className="mt-6">
          <ActivityDetailsTabs activity={activity} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
