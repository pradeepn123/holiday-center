"use client";

import { Container } from "@/components/ui/Container";
import { TourPackageCard } from "@/components/packages/TourPackageCard";
import { useInView } from "@/lib/hooks";
import { tourPackages } from "@/lib/data";
import { cn } from "@/lib/utils";

export function PopularDestinations() {
  const [gridRef, isInView] = useInView<HTMLDivElement>();

  return (
    <section>
      <Container>
        <h2 className="font-sans text-2xl font-extrabold text-neutral-950 sm:text-[28px]">
          Explore Our Best Tour Packages
        </h2>

        <div ref={gridRef} className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tourPackages.slice(0, 4).map((pkg, index) => (
            <TourPackageCard
              key={pkg.id}
              pkg={pkg}
              style={{ transitionDelay: `${index * 120}ms` }}
              className={cn(isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
