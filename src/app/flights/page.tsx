import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SearchWidget } from "@/components/sections/SearchWidget";
import { FlightResultsSection } from "@/components/flights/FlightResultsSection";
import { generateFlightResults } from "@/lib/flightsData";

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function FlightsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const tripType = firstValue(params.tripType) || "oneway";
  const from = firstValue(params.from);
  const to = firstValue(params.to);
  const departureDate = firstValue(params.departureDate);
  const returnDate = firstValue(params.returnDate);
  const travelClass = firstValue(params.travelClass) || "Economy";
  const passengers = Number(firstValue(params.passengers) || "1");

  const flights = generateFlightResults({ from, to, tripType, departureDate, returnDate });

  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-24 lg:pb-20">
        <div className="bg-[#2C341D] py-4 sm:py-6">
          <Container>
            <SearchWidget
              showCategoryTabs={false}
              initialCategory="flight"
              compactOnMobile
              flightInitialValues={{
                tripType: tripType as "oneway" | "roundtrip" | "multicity",
                from,
                to,
                departureDate,
                returnDate,
                travelClass,
                passengers,
              }}
            />
          </Container>
        </div>

        <Container className="mt-5 grid grid-cols-1 gap-4 sm:mt-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
          <FlightResultsSection
            flights={flights}
            from={from}
            to={to}
            tripType={tripType}
            passengers={passengers}
            travelClass={travelClass}
            searchParams={{
              from,
              to,
              tripType,
              departureDate,
              returnDate,
              travelClass,
              passengers: String(passengers),
            }}
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
