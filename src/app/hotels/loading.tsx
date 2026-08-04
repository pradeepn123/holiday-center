import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export default function HotelsLoading() {
  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-20">
        <Container className="pt-8">
          <div className="h-[65px] w-full animate-pulse rounded-2xl bg-neutral-200" />
        </Container>

        <Container className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
          <div className="flex flex-col gap-2">
            <div className="h-[241px] w-full animate-pulse rounded-2xl bg-neutral-200" />
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-16 w-full animate-pulse rounded-2xl bg-neutral-200" />
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between gap-4">
              <div className="h-7 w-40 animate-pulse rounded-lg bg-neutral-200" />
              <div className="h-11 w-40 animate-pulse rounded-xl bg-neutral-200" />
            </div>
            <div className="mt-6 flex flex-col gap-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-[220px] w-full animate-pulse rounded-2xl bg-neutral-200" />
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
