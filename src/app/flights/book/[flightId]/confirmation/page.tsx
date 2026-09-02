import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VoucherHeader } from "@/components/vouchers/VoucherHeader";
import { FlightVoucherReference } from "@/components/flights/voucher/FlightVoucherReference";
import { FlightVoucherLegDetails } from "@/components/flights/voucher/FlightVoucherLegDetails";
import { FlightVoucherBaggage } from "@/components/flights/voucher/FlightVoucherBaggage";
import { FlightVoucherPayment } from "@/components/flights/voucher/FlightVoucherPayment";
import { FlightVoucherTerms } from "@/components/flights/voucher/FlightVoucherTerms";
import { buildPnr, buildReferenceId } from "@/components/flights/voucher/voucherUtils";
import { generateFlightResults } from "@/lib/flightsData";
import { formatDate, startOfToday, toISODate } from "@/lib/dateUtils";

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function FlightVoucherPage({
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

  const referenceId = buildReferenceId(flight.id, flight.outbound.originCode, flight.outbound.destinationCode);
  const pnr = buildPnr(flight.id);
  const bookingDate = formatDate(toISODate(startOfToday()));

  return (
    <>
      <Header />
      <main className="bg-white pb-20">
        <div className="mx-auto w-full max-w-[640px] px-6 py-6">
          <div className="flex flex-col gap-5">
            <VoucherHeader />
            <FlightVoucherReference referenceId={referenceId} bookingDate={bookingDate} pnr={pnr} />

            <FlightVoucherLegDetails label="Departure Flight Details" leg={flight.outbound} />
            {flight.return && (
              <FlightVoucherLegDetails label="Return Flight Details" leg={flight.return} />
            )}

            <FlightVoucherBaggage flight={flight} />
            <FlightVoucherPayment flight={flight} passengers={passengers} />
            <FlightVoucherTerms />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
