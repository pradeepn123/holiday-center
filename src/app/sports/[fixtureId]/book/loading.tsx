import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export default function SportsBookingLoading() {
  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-20">
        <Container className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <div className="flex flex-col gap-6">
            <div className="h-[320px] w-full animate-pulse rounded-2xl bg-neutral-200" />
            <div className="h-[220px] w-full animate-pulse rounded-2xl bg-neutral-200" />
          </div>
          <div className="h-[420px] w-full animate-pulse rounded-2xl bg-neutral-200" />
        </Container>
      </main>
      <Footer />
    </>
  );
}
