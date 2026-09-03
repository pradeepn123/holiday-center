import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export default function ManageBookingPage() {
  return (
    <>
      <Header />
      <main className="bg-neutral-50">
        <section className="relative overflow-hidden bg-[#101b3d]">
          <Image
            src="/assets/images/manage_booking_bg_img.png"
            alt=""
            fill
            priority
            className="object-cover"
          />

          <Container className="relative flex flex-col items-center gap-6 pb-24 pt-14 text-center">
            <div className="mx-auto max-w-xl">
              <h1 className="text-[28px] font-bold text-white sm:text-[32px]">Access My Booking</h1>
              <p className="mt-3 text-[15px] text-white/80">
                You can also sign in to view or manage your booking!
              </p>
              <p className="text-[15px] text-white/80">
                Get access to more options and manage bookings with ease.
              </p>
            </div>

            <Image
              src="/assets/images/travel_lugagge.png"
              alt="Travel suitcase with boarding pass and paper plane"
              width={177}
              height={225}
              className="absolute right-6 top-1/2 hidden w-[150px] -translate-y-1/2 lg:block"
            />
          </Container>
        </section>

        <Container className="relative z-10 -mt-10 pb-16 lg:-mt-14">
          <form className="mx-auto flex w-full max-w-4xl flex-col gap-5 rounded-2xl bg-white p-6 shadow-[0_20px_45px_rgba(15,23,42,0.12)] sm:p-8 lg:flex-row lg:items-start lg:gap-6">
            <label className="flex flex-1 flex-col gap-2">
              <span className="text-[14px] font-medium text-neutral-800">Enter Reservation Code</span>
              <input
                type="text"
                name="reservationCode"
                required
                placeholder="holidayscenter Reservation Code"
                className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-[14px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-brand-blue"
              />
              <span className="text-[12px] leading-relaxed text-neutral-400">
                Your holidayscenter ID is the booking ID that was sent to your email address after
                you placed your booking.
              </span>
            </label>

            <label className="flex flex-1 flex-col gap-2">
              <span className="text-[14px] font-medium text-neutral-800">Enter Email Id</span>
              <input
                type="email"
                name="email"
                required
                placeholder="Passenger Email"
                className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-[14px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-brand-blue"
              />
              <span className="text-[12px] leading-relaxed text-neutral-400">
                The email address you used when you made your booking.
              </span>
            </label>

            <button
              type="submit"
              className="flex h-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue px-10 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-dark lg:mt-8"
            >
              Search
            </button>
          </form>
        </Container>
      </main>
      <Footer />
    </>
  );
}
