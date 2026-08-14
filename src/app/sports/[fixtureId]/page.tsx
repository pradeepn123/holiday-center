import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SportsFixtureHeader } from "@/components/sports/SportsFixtureHeader";
import { SportsSeatMap } from "@/components/sports/SportsSeatMap";
import { SportsTicketCategories } from "@/components/sports/SportsTicketCategories";
import { getSportsFixtureById, getSportsTicketCategories } from "@/lib/data";

export default async function SportsFixtureDetailsPage({
  params,
}: {
  params: Promise<{ fixtureId: string }>;
}) {
  const { fixtureId } = await params;
  const fixture = getSportsFixtureById(fixtureId);

  if (!fixture) {
    notFound();
  }

  const categories = getSportsTicketCategories(fixture.id);

  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-20">
        <SportsFixtureHeader fixture={fixture} />

        <Container className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-start">
          <SportsSeatMap />
          <SportsTicketCategories fixtureId={fixture.id} categories={categories} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
