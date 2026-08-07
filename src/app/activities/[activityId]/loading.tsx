import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export default function ActivityDetailsLoading() {
  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-20">
        <Container className="pt-6">
          <div className="grid grid-cols-1 gap-2 lg:h-[420px] lg:grid-cols-[1.6fr_1fr]">
            <div className="h-[260px] animate-pulse rounded-2xl bg-neutral-200 lg:h-full" />
            <div className="grid h-[260px] grid-cols-2 grid-rows-2 gap-2 lg:h-full">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-2xl bg-neutral-200" />
              ))}
            </div>
          </div>
        </Container>

        <Container className="mt-4">
          <div className="h-[120px] w-full animate-pulse rounded-2xl bg-neutral-200" />
        </Container>

        <Container className="mt-6">
          <div className="h-14 w-full animate-pulse rounded-2xl bg-neutral-200" />
          <div className="mt-4 flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-[140px] w-full animate-pulse rounded-2xl bg-neutral-200" />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
