import type { Metadata } from "next";
import { Playfair_Display, Onest, Dancing_Script } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Holidays Center | Find Your Dream Destination",
  description:
    "Discover curated holiday packages, flights, tours, cruises, and hotels - all in one modern travel experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${onest.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-white font-sans text-neutral-900"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
