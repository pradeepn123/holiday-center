import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { HotelGallery } from "@/components/hotels/HotelGallery";
import { PackageDetailsTabs } from "@/components/packages/PackageDetailsTabs";
import { PackageDetailsContent } from "@/components/packages/PackageDetailsContent";
import { PackageBookingSidebar } from "@/components/packages/PackageBookingSidebar";
import { getPackageGallery, getTourPackageById } from "@/lib/data";

export default async function PackageDetailsPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;
  const pkg = getTourPackageById(packageId);

  if (!pkg) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-20">
        <HotelGallery images={getPackageGallery(pkg)} name={pkg.title} />

        <Container className="mt-6 flex flex-col gap-6">
          <PackageDetailsTabs />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <PackageDetailsContent pkg={pkg} />
            <PackageBookingSidebar pkg={pkg} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
