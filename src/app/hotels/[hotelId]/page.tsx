import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { HotelGallery } from "@/components/hotels/HotelGallery";
import { HotelInfoBar } from "@/components/hotels/HotelInfoBar";
import { HotelDetailsTabs } from "@/components/hotels/HotelDetailsTabs";
import { getHotelRooms } from "@/lib/data";
import { fetchHotelById } from "@/lib/hotelsApi";

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function HotelDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ hotelId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { hotelId } = await params;
  const hotel = await fetchHotelById(hotelId);

  if (!hotel) {
    notFound();
  }

  const query = await searchParams;
  const stayParams = {
    checkIn: firstValue(query.checkIn) || undefined,
    checkOut: firstValue(query.checkOut) || undefined,
    adults: firstValue(query.adults) || undefined,
    children: firstValue(query.children) || undefined,
    rooms: firstValue(query.rooms) || undefined,
  };

  const rooms = getHotelRooms(hotel);

  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-20">
        <HotelGallery images={hotel.gallery} name={hotel.name} />

        <Container className="mt-4">
          <HotelInfoBar hotel={hotel} stayParams={stayParams} />
        </Container>

        <Container className="mt-6">
          <HotelDetailsTabs hotel={hotel} rooms={rooms} stayParams={stayParams} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
