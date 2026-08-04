export type SearchCategory = {
  label: string;
  value: string;
};

export type Destination = {
  id: string;
  title: string;
  place: string;
  image: string;
  price: number;
};

export type TourPackage = {
  id: string;
  title: string;
  place: string;
  days: number;
  nights: number;
  fromPrice: number;
  price: number;
  rating: number;
  reviews: number;
  image: string;
};

export type HotelSearchResult = {
  id: string;
  name: string;
  address: string;
  rating: number;
  price: number;
  image: string;
  amenities: string[];
  gallery: string[];
  stars?: number;
  reviews?: number;
  freeCancellation?: boolean;
};

export type HotelRoom = {
  id: string;
  name: string;
  boardType: string;
  guests: number;
  price: number;
  image: string;
  size: string;
  bedType: string;
  bathrooms: string;
};

export type FlightLeg = {
  airline: string;
  airlineCode: string;
  flightNumber: string;
  departureTime: string;
  departureDate: string;
  origin: string;
  originCode: string;
  arrivalTime: string;
  arrivalDate: string;
  destination: string;
  destinationCode: string;
  durationMinutes: number;
  stops: number;
};

export type FlightResult = {
  id: string;
  outbound: FlightLeg;
  return?: FlightLeg;
  price: number;
  originalPrice?: number;
  refundable: boolean;
  luggage: string;
};

export type WhyBookHighlight = {
  id: string;
  icon: "support" | "deals" | "booking" | "pricing";
  title: string;
  description: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  avatar: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FooterLinkGroup = {
  title: string;
  links: { label: string; href: string }[];
};
