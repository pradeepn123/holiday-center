import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function FlightVoucherLoading() {
  return (
    <>
      <Header />
      <main className="bg-white pb-20">
        <div className="mx-auto flex w-full max-w-[640px] flex-col gap-5 px-6 py-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-[160px] w-full animate-pulse rounded-xl bg-neutral-200" />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
