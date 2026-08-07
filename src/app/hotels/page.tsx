import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SearchWidget } from "@/components/sections/SearchWidget";
import { HotelResultsSection } from "@/components/hotels/HotelResultsSection";
import { fetchHotels } from "@/lib/hotelsApi";

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function HotelsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const destination = firstValue(params.destination);
  const checkIn = firstValue(params.checkIn);
  const checkOut = firstValue(params.checkOut);
  const adults = firstValue(params.adults);
  const children = firstValue(params.children);
  const rooms = firstValue(params.rooms);

  const allHotels = await fetchHotels();
  const hotels = destination
    ? allHotels.filter((hotel) =>
        `${hotel.name} ${hotel.address}`.toLowerCase().includes(destination.toLowerCase())
      )
    : allHotels;

  const stayParams = {
    checkIn: checkIn || undefined,
    checkOut: checkOut || undefined,
    adults: adults || undefined,
    children: children || undefined,
    rooms: rooms || undefined,
  };

  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-24 lg:pb-20">
        <div className="bg-[#2C341D] py-4 sm:py-6">
          <Container>
            <SearchWidget
              showCategoryTabs={false}
              compactOnMobile
              initialValues={{
                destination,
                checkIn,
                checkOut,
                adults: adults ? Number(adults) : undefined,
                children: children ? Number(children) : undefined,
                rooms: rooms ? Number(rooms) : undefined,
              }}
            />
          </Container>
        </div>

        <Container className="mt-5 grid grid-cols-1 gap-5 sm:mt-8 lg:mt-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start lg:gap-8">
          <HotelResultsSection hotels={hotels} stayParams={stayParams} destination={destination} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
