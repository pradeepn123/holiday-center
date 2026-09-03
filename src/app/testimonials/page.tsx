import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { TestimonialsCarousel } from "@/components/testimonials/TestimonialsCarousel";
import { testimonials } from "@/lib/data";

export default function TestimonialsPage() {
  return (
    <>
      <Header />
      <main className="bg-neutral-50 pb-24">
        <Container className="pt-20">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-6 bg-emerald-700" />
              <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-neutral-600">
                Testimonial
              </span>
              <span className="h-px w-6 bg-emerald-700" />
            </div>

            <h1 className="mt-3 text-[32px] font-extrabold text-neutral-950 sm:text-[38px]">
              Real journeys. Real stories.
            </h1>
          </div>

          {testimonials.length > 3 ? (
            <div className="mt-12">
              <TestimonialsCarousel testimonials={testimonials} />
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
