import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VoucherHeader } from "@/components/vouchers/VoucherHeader";
import { HotelVoucherReference } from "@/components/hotels/voucher/HotelVoucherReference";
import { HotelVoucherStayCard } from "@/components/hotels/voucher/HotelVoucherStayCard";
import { HotelVoucherGuests } from "@/components/hotels/voucher/HotelVoucherGuests";
import { HotelVoucherPayment } from "@/components/hotels/voucher/HotelVoucherPayment";
import { HotelVoucherTerms } from "@/components/hotels/voucher/HotelVoucherTerms";
import { buildBookingReference } from "@/lib/voucherUtils";
import { BOOKING_CONVENIENCE_FEE, getHotelRooms } from "@/lib/data";
import { fetchHotelById } from "@/lib/hotelsApi";
import { formatDate, parseISODate } from "@/lib/dateUtils";

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function HotelVoucherPage({
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
  const checkInIso = firstValue(query.checkIn);
  const checkOutIso = firstValue(query.checkOut);
  const adults = Math.max(1, Number(firstValue(query.adults)) || 2);
  const childrenCount = Math.max(0, Number(firstValue(query.children)) || 0);
  const roomsCount = Math.max(1, Number(firstValue(query.rooms)) || 1);

  const nights = checkInIso && checkOutIso
    ? Math.max(
        1,
        Math.round(
          (parseISODate(checkOutIso).getTime() - parseISODate(checkInIso).getTime()) / (1000 * 60 * 60 * 24)
        )
      )
    : 1;

  const baseFare = room.price * nights * roomsCount;
  const total = baseFare + BOOKING_CONVENIENCE_FEE;

  const bookingReference = buildBookingReference("HO", `${hotel.id}-${room.id}`);
  const now = new Date();
  const dateIssued = `${formatDate(now.toISOString().slice(0, 10))} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const totalGuests = adults + childrenCount;
  const roomsGuestsLabel = `${roomsCount} Room${roomsCount === 1 ? "" : "s"}, ${totalGuests} Guest${totalGuests === 1 ? "" : "s"}`;

  return (
    <>
      <Header />
      <main className="bg-white pb-20">
        <div className="mx-auto w-full max-w-[640px] px-8 py-8">
          <div className="flex flex-col gap-5">
            <VoucherHeader />
            <div className="h-px w-full bg-[#e2e8f0]" />
            <HotelVoucherReference bookingReference={bookingReference} dateIssued={dateIssued} />

            <HotelVoucherStayCard
              hotelName={hotel.name}
              address={hotel.address}
              checkIn={checkInIso ? formatDate(checkInIso) : "-"}
              checkOut={checkOutIso ? formatDate(checkOutIso) : "-"}
              roomsGuestsLabel={roomsGuestsLabel}
              roomName={room.name}
            />

            <HotelVoucherGuests roomsCount={roomsCount} childrenCount={childrenCount} roomName={room.name} />

            <HotelVoucherPayment
              baseFare={baseFare}
              nights={nights * roomsCount}
              taxesAndFees={BOOKING_CONVENIENCE_FEE}
              total={total}
            />

            <HotelVoucherTerms />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
