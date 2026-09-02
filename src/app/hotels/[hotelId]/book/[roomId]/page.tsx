import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { BookingHotelSummary } from "@/components/hotels/booking/BookingHotelSummary";
import { CancellationWarningBanner } from "@/components/hotels/booking/CancellationWarningBanner";
import { GuestDetailsForm } from "@/components/hotels/booking/GuestDetailsForm";
import { GuestPreferencesForm } from "@/components/hotels/booking/GuestPreferencesForm";
import { ContactInfoForm } from "@/components/hotels/booking/ContactInfoForm";
import { PurchaseSummary } from "@/components/hotels/booking/PurchaseSummary";
import { BOOKING_CONVENIENCE_FEE, getHotelRooms } from "@/lib/data";
import { fetchHotelById } from "@/lib/hotelsApi";

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function HotelBookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ hotelId: string; roomId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { hotelId, roomId } = await params;
  const hotel = await fetchHotelById(hotelId);

  if (!hotel) {
    notFound();
  }

  const room = getHotelRooms(hotel).find((item) => item.id === roomId);

  if (!room) {
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
  const roomsCount = Math.max(1, Number(stayParams.rooms) || 1);
  const childrenCount = Math.max(0, Number(stayParams.children) || 0);

  const confirmationParams = new URLSearchParams();
  if (stayParams.checkIn) confirmationParams.set("checkIn", stayParams.checkIn);
  if (stayParams.checkOut) confirmationParams.set("checkOut", stayParams.checkOut);
  if (stayParams.adults) confirmationParams.set("adults", stayParams.adults);
  if (stayParams.children) confirmationParams.set("children", stayParams.children);
  if (stayParams.rooms) confirmationParams.set("rooms", stayParams.rooms);

  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-20">
        <Container className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="flex flex-col gap-6">
            <BookingHotelSummary hotel={hotel} stayParams={stayParams} />
            <CancellationWarningBanner />
            <GuestDetailsForm
              roomType={`Apartment / ${room.boardType}`}
              roomsCount={roomsCount}
              childrenCount={childrenCount}
            />
            <GuestPreferencesForm />
            <ContactInfoForm />

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

              <Link
                href={`/hotels/${hotel.id}/book/${room.id}/confirmation?${confirmationParams.toString()}`}
                className="mt-4 flex h-12 w-fit items-center justify-center rounded-xl bg-brand-blue px-8 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
              >
                Proceed to Payment
              </Link>
            </div>
          </div>

          <PurchaseSummary room={room} convenienceFee={BOOKING_CONVENIENCE_FEE} stayParams={stayParams} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
