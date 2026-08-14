import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SportsBookingForm } from "@/components/sports/booking/SportsBookingForm";
import { SportsOrderSummary } from "@/components/sports/booking/SportsOrderSummary";
import { getSportsFixtureById, getSportsTicketCategories } from "@/lib/data";

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function SportsBookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ fixtureId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { fixtureId } = await params;
  const fixture = getSportsFixtureById(fixtureId);

  if (!fixture) {
    notFound();
  }

  const query = await searchParams;
  const categories = getSportsTicketCategories(fixture.id);
  const categoryId = firstValue(query.category);
  const category = categories.find((item) => item.id === categoryId) ?? categories[0];

  if (!category) {
    notFound();
  }

  const quantity = Math.max(1, Math.min(Number(firstValue(query.qty)) || 1, category.ticketsAvailable));
  const unitPrice = category.price;
  const subtotal = unitPrice * quantity;
  const venueFee = Math.round(subtotal * 0.08);
  const bookingServiceFee = 0;
  const total = subtotal + venueFee + bookingServiceFee;

  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-20">
        <Container className="pt-6">
          <p className="text-[13px] font-medium text-neutral-300">
            {fixture.homeTeam} vs {fixture.awayTeam}
          </p>
        </Container>

        <Container className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <SportsBookingForm />
          <SportsOrderSummary
            fixture={fixture}
            category={category}
            quantity={quantity}
            unitPrice={unitPrice}
            venueFee={venueFee}
            bookingServiceFee={bookingServiceFee}
            total={total}
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
