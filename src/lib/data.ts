import type {
  ActivityResult,
  Destination,
  FaqItem,
  FooterLinkGroup,
  HotelRoom,
  HotelSearchResult,
  SearchCategory,
  SportsFixture,
  SportsTicketCategory,
  SportsTicketListing,
  Testimonial,
  TourPackage,
  WhyBookHighlight,
} from "@/types";

export const searchCategories: SearchCategory[] = [
  { label: "Flight", value: "flight" },
  { label: "Hotel", value: "hotel" },
  { label: "Sports", value: "sports" },
  { label: "Cruise", value: "cruise" },
  { label: "Packages", value: "packages" },
  { label: "Car Rental", value: "car-rental" },
  { label: "Activities", value: "activities" },
  { label: "Transfers", value: "transfers" },
];

export const packageRegions = ["Asia", "Middle East", "Europe", "Oceania"];

export const packageCountries = [
  "Azerbaijan",
  "Georgia",
  "Kazakhstan",
  "Kuwait",
  "Kyrgyzstan",
  "Saudi Arabia",
  "Thailand",
];

export const packageActivities = [
  "Adventure",
  "Archaeology",
  "Beach",
  "Bird Watching",
  "Boat Tour",
  "Camping",
  "Cultural",
];

export const tourPackages: TourPackage[] = [
  {
    id: "gold-coast",
    title: "Australia – Gold Coast",
    place: "Gold Coast",
    region: "Oceania",
    country: "Australia",
    activities: ["Beach", "Adventure"],
    days: 2,
    nights: 3,
    fromPrice: 2850,
    price: 950,
    rating: 5,
    reviews: 5,
    image: "/assets/images/destination_image2.png",
  },
  {
    id: "dubai",
    title: "UAE – Dubai",
    place: "Dubai",
    region: "Middle East",
    country: "Saudi Arabia",
    activities: ["Cultural", "Adventure"],
    days: 2,
    nights: 3,
    fromPrice: 3200,
    price: 1180,
    rating: 5,
    reviews: 5,
    image: "/assets/images/destination_image4.png",
  },
  {
    id: "paris",
    title: "France – Paris",
    place: "Paris",
    region: "Europe",
    country: "Georgia",
    activities: ["Cultural"],
    days: 2,
    nights: 3,
    fromPrice: 2500,
    price: 870,
    rating: 5,
    reviews: 5,
    image: "/assets/images/destination_image1.png",
  },
  {
    id: "jordan",
    title: "Jordan – Amman & Petra",
    place: "Jordan",
    region: "Middle East",
    country: "Kuwait",
    activities: ["Archaeology", "Cultural"],
    days: 2,
    nights: 3,
    fromPrice: 1900,
    price: 650,
    rating: 5,
    reviews: 5,
    image: "/assets/images/destination_image3.png",
  },
  {
    id: "bali",
    title: "Indonesia – Bali",
    place: "Bali",
    region: "Asia",
    country: "Thailand",
    activities: ["Beach", "Cultural"],
    days: 3,
    nights: 4,
    fromPrice: 2100,
    price: 720,
    rating: 5,
    reviews: 5,
    image: "/assets/images/trending_img_2.png",
  },
  {
    id: "switzerland",
    title: "Switzerland – Alps",
    place: "Interlaken",
    region: "Europe",
    country: "Kazakhstan",
    activities: ["Adventure", "Camping"],
    days: 4,
    nights: 5,
    fromPrice: 3600,
    price: 1450,
    rating: 5,
    reviews: 5,
    image: "/assets/images/moving_bg_img2.png",
  },
  {
    id: "india-fort",
    title: "India – Gwalior Fort",
    place: "Gwalior",
    region: "Asia",
    country: "Kyrgyzstan",
    activities: ["Archaeology", "Cultural"],
    days: 2,
    nights: 3,
    fromPrice: 1600,
    price: 540,
    rating: 5,
    reviews: 5,
    image: "/assets/images/moving_bg_img4.png",
  },
  {
    id: "kerala",
    title: "India – Kerala Backwaters",
    place: "Kerala",
    region: "Asia",
    country: "Azerbaijan",
    activities: ["Boat Tour", "Bird Watching"],
    days: 3,
    nights: 4,
    fromPrice: 1800,
    price: 610,
    rating: 5,
    reviews: 5,
    image: "/assets/images/moving_bg_img9.png",
  },
  {
    id: "london",
    title: "United Kingdom – London",
    place: "London",
    region: "Europe",
    country: "Georgia",
    activities: ["Cultural"],
    days: 3,
    nights: 4,
    fromPrice: 2900,
    price: 990,
    rating: 5,
    reviews: 5,
    image: "/assets/images/trending_img_3.png",
  },
];

const PACKAGE_GALLERY_POOL = [
  "/assets/images/trending_img_1.png",
  "/assets/images/trending_img_2.png",
  "/assets/images/trending_img_3.png",
  "/assets/images/destination_image1.png",
  "/assets/images/destination_image2.png",
  "/assets/images/destination_image3.png",
  "/assets/images/destination_image4.png",
  "/assets/images/moving_bg_img3.png",
  "/assets/images/moving_bg_img7.png",
];

export function getPackageGallery(pkg: TourPackage): string[] {
  const others = PACKAGE_GALLERY_POOL.filter((src) => src !== pkg.image);
  const offset = pkg.id.length % others.length;
  const rotated = [...others.slice(offset), ...others.slice(0, offset)];
  return [pkg.image, ...rotated.slice(0, 4)];
}

export function getTourPackageById(id: string): TourPackage | undefined {
  return tourPackages.find((pkg) => pkg.id === id);
}

export const sportsFixtures: SportsFixture[] = [
  {
    id: "aut-isr",
    label: "Austria vs Israel",
    homeTeam: "Austria",
    homeCode: "AUT",
    homeFlag: "🇦🇹",
    awayTeam: "Israel",
    awayCode: "ISR",
    awayFlag: "🇮🇱",
    date: "Thu, 24 Sep 2026",
    time: "08:45 PM",
    tournament: "FIFA World Cup 2026 Qualifiers",
    venue: "Raiffeisen Arena ex Linzer Stadion (Auf der Gugl)",
    venueAddress: "Ziegeleistraße, 4020 Linz",
    city: "Linz",
    country: "Austria",
  },
  {
    id: "aut-kos",
    label: "Austria vs Kosovo",
    homeTeam: "Austria",
    homeCode: "AUT",
    homeFlag: "🇦🇹",
    awayTeam: "Kosovo",
    awayCode: "KOS",
    awayFlag: "🇽🇰",
    date: "Sun, 27 Sep 2026",
    time: "06:00 PM",
    tournament: "FIFA World Cup 2026 Qualifiers",
    venue: "Raiffeisen Arena ex Linzer Stadion (Auf der Gugl)",
    venueAddress: "Ziegeleistraße, 4020 Linz",
    city: "Linz",
    country: "Austria",
  },
  {
    id: "irl-aut",
    label: "Republic of Ireland vs Austria",
    homeTeam: "Republic of Ireland",
    homeCode: "IRL",
    homeFlag: "🇮🇪",
    awayTeam: "Austria",
    awayCode: "AUT",
    awayFlag: "🇦🇹",
    date: "Wed, 30 Sep 2026",
    time: "07:30 PM",
    tournament: "FIFA World Cup 2026 Qualifiers",
    venue: "Aviva Stadium",
    venueAddress: "Lansdowne Road, Dublin 4",
    city: "Dublin",
    country: "Ireland",
  },
  {
    id: "kos-aut",
    label: "Kosovo vs Austria",
    homeTeam: "Kosovo",
    homeCode: "KOS",
    homeFlag: "🇽🇰",
    awayTeam: "Austria",
    awayCode: "AUT",
    awayFlag: "🇦🇹",
    date: "Sat, 03 Oct 2026",
    time: "05:00 PM",
    tournament: "FIFA World Cup 2026 Qualifiers",
    venue: "Fadil Vokrri Stadium",
    venueAddress: "Rr. Nena Tereze, 10000 Pristina",
    city: "Pristina",
    country: "Kosovo",
  },
  {
    id: "isr-aut",
    label: "Israel vs Austria",
    homeTeam: "Israel",
    homeCode: "ISR",
    homeFlag: "🇮🇱",
    awayTeam: "Austria",
    awayCode: "AUT",
    awayFlag: "🇦🇹",
    date: "Tue, 06 Oct 2026",
    time: "08:00 PM",
    tournament: "FIFA World Cup 2026 Qualifiers",
    venue: "Bloomfield Stadium",
    venueAddress: "371 Levanon St, Tel Aviv",
    city: "Tel Aviv",
    country: "Israel",
  },
];

export const sportsTeams = [
  { code: "AUT", name: "Austria", flag: "🇦🇹" },
  { code: "ISR", name: "Israel", flag: "🇮🇱" },
  { code: "KOS", name: "Kosovo", flag: "🇽🇰" },
  { code: "IRL", name: "Ireland", flag: "🇮🇪" },
];

export const sportsTicketListings: SportsTicketListing[] = sportsFixtures.flatMap((fixture) =>
  Array.from({ length: 6 }, (_, index) => ({
    id: `${fixture.id}-${index + 1}`,
    fixtureId: fixture.id,
    price: 157,
    guaranteed: true,
  }))
);

export function getSportsFixtureById(id: string): SportsFixture | undefined {
  return sportsFixtures.find((fixture) => fixture.id === id);
}

export function getSportsTicketCategories(fixtureId: string): SportsTicketCategory[] {
  return [
    {
      id: `${fixtureId}-short-1`,
      fixtureId,
      name: "Short Side",
      grouping: "(All Together)",
      price: 157,
      ticketsAvailable: 4,
      offlineStock: true,
    },
    {
      id: `${fixtureId}-short-2`,
      fixtureId,
      name: "Short Side",
      grouping: "(All Together)",
      price: 157,
      ticketsAvailable: 4,
      offlineStock: true,
    },
    {
      id: `${fixtureId}-long-1`,
      fixtureId,
      name: "Long Side",
      grouping: "(All Together)",
      price: 205,
      ticketsAvailable: 2,
      offlineStock: true,
    },
  ];
}

export const popularDestinations: Destination[] = [
  {
    id: "ritz-bali",
    title: "The Ritz-Carlton Bali",
    place: "Bali, Indonesia",
    price: 580,
    image: "/assets/images/trending_img_1.png",
  },
  {
    id: "hyatt-tokyo",
    title: "Grand Hyatt Tokyo",
    place: "Tokyo, Japan",
    price: 390,
    image: "/assets/images/trending_img_2.png",
  },
  {
    id: "aman-venice",
    title: "Aman Venice",
    place: "Venice, Italy",
    price: 720,
    image: "/assets/images/trending_img_3.png",
  },
];

const HOTEL_AMENITIES = ["WiFi", "Pool", "Breakfast"];

const GALLERY_POOL = [
  "/assets/images/trending_img_1.png",
  "/assets/images/trending_img_2.png",
  "/assets/images/trending_img_3.png",
  "/assets/images/destination_image1.png",
  "/assets/images/destination_image2.png",
  "/assets/images/destination_image3.png",
  "/assets/images/destination_image4.png",
];

function buildGallery(mainImage: string, seedIndex: number): string[] {
  const others = GALLERY_POOL.filter((src) => src !== mainImage);
  const offset = seedIndex % others.length;
  const rotated = [...others.slice(offset), ...others.slice(0, offset)];
  return [mainImage, ...rotated.slice(0, 4)];
}

export const hotelSearchResults: HotelSearchResult[] = [
  {
    id: "westin-london-city",
    name: "The Westin London City",
    address: "60 Upper Thames Street, City of London, London, EC4V 3AD, United Kingdom",
    rating: 4.0,
    price: 230,
    image: "/assets/images/trending_img_1.png",
    amenities: HOTEL_AMENITIES,
    gallery: buildGallery("/assets/images/trending_img_1.png", 0),
  },
  {
    id: "ibis-budget-singapore",
    name: "ibis budget Singapore Pearl",
    address: "10 Pearl Bank, Outram, Singapore, 169037, Singapore",
    rating: 4.0,
    price: 180,
    image: "/assets/images/trending_img_2.png",
    amenities: HOTEL_AMENITIES,
    gallery: buildGallery("/assets/images/trending_img_2.png", 1),
  },
  {
    id: "burj-views-dubai",
    name: "Burj Views Downtown Hotel",
    address: "Sheikh Mohammed Bin Rashid Blvd, Downtown Dubai, Dubai, United Arab Emirates",
    rating: 4.5,
    price: 320,
    image: "/assets/images/trending_img_3.png",
    amenities: HOTEL_AMENITIES,
    gallery: buildGallery("/assets/images/trending_img_3.png", 2),
  },
  {
    id: "paris-centrale",
    name: "Hotel Paris Centrale",
    address: "12 Rue de Rivoli, 1st Arrondissement, 75001 Paris, France",
    rating: 4.2,
    price: 260,
    image: "/assets/images/destination_image1.png",
    amenities: HOTEL_AMENITIES,
    gallery: buildGallery("/assets/images/destination_image1.png", 3),
  },
  {
    id: "gold-coast-beachfront",
    name: "Gold Coast Beachfront Resort",
    address: "3 Hamilton Avenue, Surfers Paradise, Gold Coast, QLD 4217, Australia",
    rating: 4.3,
    price: 210,
    image: "/assets/images/destination_image2.png",
    amenities: HOTEL_AMENITIES,
    gallery: buildGallery("/assets/images/destination_image2.png", 4),
  },
  {
    id: "antwerp-old-town",
    name: "Antwerp Old Town Suites",
    address: "Grote Markt 15, Antwerp, 2000, Belgium",
    rating: 3.9,
    price: 195,
    image: "/assets/images/destination_image3.png",
    amenities: HOTEL_AMENITIES,
    gallery: buildGallery("/assets/images/destination_image3.png", 5),
  },
  {
    id: "dubai-marina-grand",
    name: "Dubai Marina Grand Hotel",
    address: "Marina Walk, Dubai Marina, Dubai, United Arab Emirates",
    rating: 4.6,
    price: 340,
    image: "/assets/images/destination_image4.png",
    amenities: HOTEL_AMENITIES,
    gallery: buildGallery("/assets/images/destination_image4.png", 6),
  },
  {
    id: "kensington-garden-hotel",
    name: "Kensington Garden Hotel",
    address: "24 Kensington High Street, London, W8 4PT, United Kingdom",
    rating: 4.1,
    price: 245,
    image: "/assets/images/trending_img_1.png",
    amenities: HOTEL_AMENITIES,
    gallery: buildGallery("/assets/images/trending_img_1.png", 7),
  },
];

const ROOM_TYPES = [
  {
    name: "Standard Double room",
    boardType: "Room Only",
    size: "145 sq.ft (13 sq.mt)",
    bedType: "1 Queen Bed",
    bathrooms: "1 Bathroom",
    guests: 2,
    priceMultiplier: 1,
  },
  {
    name: "Deluxe Double Room",
    boardType: "Room Only",
    size: "180 sq.ft (17 sq.mt)",
    bedType: "1 King Bed",
    bathrooms: "1 Bathroom",
    guests: 2,
    priceMultiplier: 1.3,
  },
  {
    name: "Executive Suite",
    boardType: "Room Only",
    size: "260 sq.ft (24 sq.mt)",
    bedType: "1 King Bed",
    bathrooms: "1 Bathroom",
    guests: 3,
    priceMultiplier: 1.8,
  },
];

export function getHotelRooms(hotel: HotelSearchResult): HotelRoom[] {
  return ROOM_TYPES.map((type, index) => ({
    id: `${hotel.id}-room-${index + 1}`,
    name: type.name,
    boardType: type.boardType,
    guests: type.guests,
    price: Math.round(hotel.price * type.priceMultiplier),
    image: hotel.gallery[index % hotel.gallery.length] ?? hotel.image,
    size: type.size,
    bedType: type.bedType,
    bathrooms: type.bathrooms,
  }));
}

export const hotelFullAmenities = [
  "Number Of Floors (Main Building)",
  "Hairdryer",
  "Bar",
  "Transfer Service",
  "Room Service",
  "Bathroom",
  "Wi-Fi",
  "Laundry Service",
  "Currency Exchange Facilities",
  "Business Centre",
  "Wheelchair-Accessible",
  "Internet Access",
  "Air Conditioning In Restaurant",
  "Carpeted Floors",
  "Nightclub",
  "Non-Smoking Area",
  "Washing Machine",
  "Make-Up Mirror",
  "Ironing Set",
  "Car Park",
  "Air Conditioning In Public Areas",
  "Multilingual Staff",
];

export const hotelNeighbourhoods = [
  "Kensington Gardens",
  "Kensington High Street",
  "Kensington Palace",
  "Westfield London Shopping Centre",
  "Imperial College London",
  "Science Museum",
  "Natural History Museum",
];

export const hotelAmenityFilters = ["Wifi", "Non smoking", "Parking", "Pool"];

export const BOOKING_CONVENIENCE_FEE = 23;

export const whyBookHighlights: WhyBookHighlight[] = [
  {
    id: "support",
    icon: "support",
    title: "Customer Support",
    description:
      "Unlike other travel booking websites, we provide real, human customer service available via WhatsApp.",
  },
  {
    id: "deals",
    icon: "deals",
    title: "Exclusive, Budget-Friendly",
    description:
      "As part of the Al Ghandour Group, we offer exclusive partnerships that result in discounted flights.",
  },
  {
    id: "seamless",
    icon: "booking",
    title: "Seamless Booking",
    description:
      "Our user-friendly website ensures a smooth and straightforward booking process, allowing you to complete your transactions in just a few clicks.",
  },
  {
    id: "pricing",
    icon: "pricing",
    title: "Transparent Pricing",
    description:
      "At Holidays Center, we pride ourselves on transparent pricing with no hidden fees. What you see on your screen is exactly what you will be charged.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "sarah-1",
    name: "Sarah M.",
    role: "Customer review",
    rating: 5,
    quote:
      "The booking process was incredibly smooth. The team helped with every detail and the package was exactly as promised.",
    avatar: "/assets/images/customer_img_3.png",
  },
  {
    id: "sarah-2",
    name: "Sarah M.",
    role: "Customer review",
    rating: 5,
    quote:
      "The booking process was incredibly smooth. The team helped with every detail and the package was exactly as promised.",
    avatar: "/assets/images/customer_img_1.png",
  },
  {
    id: "sarah-3",
    name: "Sarah M.",
    role: "Customer review",
    rating: 5,
    quote:
      "The booking process was incredibly smooth. The team helped with every detail and the package was exactly as promised.",
    avatar: "/assets/images/customer_img_2.png",
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "How do I reset my password?",
    answer:
      "Go to the login page and select \"Forgot password\". We'll send a reset link to your registered email so you can set a new password.",
  },
  {
    id: "faq-2",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, as well as popular digital wallets. All payments are processed securely at checkout.",
  },
  {
    id: "faq-3",
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel at any time from your account settings. Check your booking confirmation for any fare-specific cancellation rules.",
  },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Booking",
    links: [
      { label: "Flight", href: "#" },
      { label: "Hotel", href: "#" },
      { label: "Sports", href: "#" },
      { label: "Cruise", href: "#" },
      { label: "Holidays", href: "#" },
      { label: "Car Rental", href: "#" },
      { label: "Activities", href: "#" },
      { label: "Transfers", href: "#" },
    ],
  },
  {
    title: "Traveller Tools",
    links: [
      { label: "Check My Booking", href: "#" },
      { label: "Customer Support", href: "#" },
      { label: "Client Testimonial", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "About Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms and Conditions", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "Feedback Handling Policy", href: "#" },
      { label: "Contact us", href: "#" },
    ],
  },
];

export const contactPhones = [
  { label: "Australia", value: "+61 1800 300 661" },
  { label: "USA", value: "+1 725 666 8484" },
  { label: "Canada", value: "+1 778 654 6544" },
];

export const activityTypeFilters = [
  "Red dunes safari- private tour",
  "Private safari",
  "Shared tour",
  "Private tour",
  "Private tour",
  "Saudi Arabia",
  "3 Days pass",
];

export const activityDurationTypes = ["Full day", "Half-day afternoon", "Half-day morning", "Evening"];

const ACTIVITY_IMAGE_POOL = [
  "/assets/images/trending_img_1.png",
  "/assets/images/trending_img_2.png",
  "/assets/images/trending_img_3.png",
  "/assets/images/destination_image1.png",
  "/assets/images/destination_image2.png",
  "/assets/images/destination_image3.png",
  "/assets/images/destination_image4.png",
  "/assets/images/moving_bg_img3.png",
  "/assets/images/moving_bg_img7.png",
  "/assets/images/moving_bg_img5.png",
];

export const activities: ActivityResult[] = ACTIVITY_IMAGE_POOL.map((image, index) => ({
  id: `activity-${index + 1}`,
  title: "Skyline Luge Sentosa Tickets With Skyrise Singapore",
  location: "Singapore",
  durationLabel: "6 hours - 10 hours",
  rating: 5,
  price: 89,
  originalPrice: 112,
  freeCancellation: true,
  image,
  gallery: buildGallery(image, index),
  activityType: activityTypeFilters[index % activityTypeFilters.length],
  durationType: activityDurationTypes[index % activityDurationTypes.length],
}));

export function getActivityById(id: string): ActivityResult | undefined {
  return activities.find((activity) => activity.id === id);
}

export type ActivityBookingOption = {
  id: string;
  image: string;
  type: string;
  price: number;
};

export function getActivityBookingOptions(activity: ActivityResult): ActivityBookingOption[] {
  return activity.gallery.slice(0, 3).map((image, index) => ({
    id: `${activity.id}-option-${index + 1}`,
    image,
    type: "Shared tour without quad bike",
    price: 65,
  }));
}

export function getActivityBookingOptionById(
  activity: ActivityResult,
  optionId: string
): ActivityBookingOption | undefined {
  return getActivityBookingOptions(activity).find((option) => option.id === optionId);
}

export const contactEmail = "info@holidayscenter.com";
