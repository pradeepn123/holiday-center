import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function DownloadApp() {
  return (
    <section>
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-[#6E8567] px-6 pt-8 sm:px-10 lg:px-14 lg:pt-10">
          <Image
            src="/assets/icons/shape-4.svg"
            alt=""
            width={261}
            height={127}
            aria-hidden="true"
            className="pointer-events-none absolute right-[20%] top-45 z-10 hidden animate-swing opacity-100 lg:block"
          />

          <div className="relative grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px_440px]">
            <div>
              <p className="font-sans text-3xl font-extrabold text-white sm:text-4xl">
                Download the App
              </p>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80">
                Access mobile-only tickets and get real-time alerts for HolidaysCenter.
                Stay updated with services, schedules, and exclusive app features anytime,
                anywhere.
              </p>

              <div className="mt-8 flex flex-nowrap items-center gap-3">
                <a href="#" className="shrink-0 transition-opacity hover:opacity-90">
                  <Image
                    src="/assets/icons/apple_store.svg"
                    alt="Download on the App Store"
                    width={181}
                    height={54}
                    className="h-11 w-auto"
                  />
                </a>
                <a href="#" className="shrink-0 transition-opacity hover:opacity-90">
                  <Image
                    src="/assets/icons/android_store.svg"
                    alt="Get it on Google Play"
                    width={154}
                    height={46}
                    className="h-11 w-auto"
                  />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center justify-self-center sm:justify-self-start">
              <Image
                src="/assets/icons/app_qr_code.svg"
                alt="QR code to download the Holidays Center app"
                width={150}
                height={153}
                className="size-[100px] sm:size-[150px] shrink-0 rounded-2xl bg-white p-3"
              />
              <p className="mt-4 text-center text-[15px] leading-relaxed text-white/90">
                Scan the QR code
                <br />
                To download the app
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[200px] sm:max-w-[250px] self-end justify-self-center">
              <Image
                src="/assets/images/app-image.svg"
                alt="Holidays Center app preview"
                width={508}
                height={718}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
