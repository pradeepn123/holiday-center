import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { FlightBookingSummary } from "@/components/flights/booking/FlightBookingSummary";
import { TravellerDetailsForm } from "@/components/flights/booking/TravellerDetailsForm";
import { FlightContactForm } from "@/components/flights/booking/FlightContactForm";
import { FlightPurchaseSummary } from "@/components/flights/booking/FlightPurchaseSummary";
import { generateFlightResults } from "@/lib/flightsData";

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function FlightBookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ flightId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { flightId } = await params;
  const query = await searchParams;

  const from = firstValue(query.from);
  const to = firstValue(query.to);
  const tripType = firstValue(query.tripType) || "oneway";
  const departureDate = firstValue(query.departureDate);
  const returnDate = firstValue(query.returnDate);
  const passengers = Number(firstValue(query.passengers) || "1");

  const flights = generateFlightResults({ from, to, tripType, departureDate, returnDate });
  const flight = flights.find((item) => item.id === flightId);

  if (!flight) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-20">
        <Container className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="flex flex-col gap-6">
            <FlightBookingSummary flight={flight} />
            <TravellerDetailsForm passengers={passengers} />
            <FlightContactForm />

            <div>
              <p className="max-w-2xl text-[13px] leading-relaxed text-neutral-500">
                By booking this item, you agree to pay the total amount shown which includes
                Service Fees and taxes. Review the{" "}
                <a href="#" className="text-brand-blue hover:underline">
                  Booking Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-brand-blue hover:underline">
                  Privacy Policy
                </a>{" "}
                for details.
              </p>

              <button
                type="button"
                className="mt-4 flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
              >
                Proceed to Payment
              </button>
            </div>
          </div>

          <FlightPurchaseSummary flight={flight} passengers={passengers} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
