import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { startOfToday, toISODate } from "@/lib/dateUtils";
import { ActivityBookingForm } from "@/components/activities/booking/ActivityBookingForm";
import { ActivityPurchaseSummary } from "@/components/activities/booking/ActivityPurchaseSummary";
import { getActivityBookingOptions, getActivityById } from "@/lib/data";

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function ActivityBookingPage({
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
  const options = getActivityBookingOptions(activity);
  const optionId = firstValue(query.option);
  const option = options.find((item) => item.id === optionId) ?? options[0];

  if (!option) {
    notFound();
  }

  const requestedDate = firstValue(query.date);
  const selectedDateIso = requestedDate || toISODate(startOfToday());
  const adults = Math.max(1, Math.min(Number(firstValue(query.adults)) || 1, 6));
  const children = Math.max(0, Math.min(Number(firstValue(query.children)) || 0, 4));
  const total = option.price * (adults + children);

  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-20">
        <Container className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <ActivityBookingForm
            activity={activity}
            option={option}
            selectedDateIso={selectedDateIso}
            adults={adults}
            childrenCount={children}
            total={total}
          />
          <ActivityPurchaseSummary
            activity={activity}
            selectedDateIso={selectedDateIso}
            adults={adults}
            childrenCount={children}
            total={total}
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
