import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { PopularDestinations } from "@/components/sections/PopularDestinations";
import { TrendingHotels } from "@/components/sections/TrendingHotels";
import { WhyBookHighlight } from "@/components/sections/WhyBookHighlight";
import { Testimonials } from "@/components/sections/Testimonials";
import { DownloadApp } from "@/components/sections/DownloadApp";
import { Faq } from "@/components/sections/Faq";
import { Newsletter } from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col gap-[70px]">
        <Hero />
        <PopularDestinations />
        <TrendingHotels />
        <WhyBookHighlight />
        <Testimonials />
        <DownloadApp />
        <Faq />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
