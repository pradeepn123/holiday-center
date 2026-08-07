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
  region: string;
  country: string;
  activities: string[];
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

export type SportsFixture = {
  id: string;
  label: string;
  homeTeam: string;
  homeCode: string;
  homeFlag: string;
  awayTeam: string;
  awayCode: string;
  awayFlag: string;
  date: string;
  time: string;
  tournament: string;
  venue: string;
  venueAddress: string;
  city: string;
  country: string;
};

export type SportsTicketListing = {
  id: string;
  fixtureId: string;
  price: number;
  guaranteed: boolean;
};

export type SportsTicketCategory = {
  id: string;
  fixtureId: string;
  name: string;
  grouping: string;
  price: number;
  ticketsAvailable: number;
  offlineStock: boolean;
};

export type ActivityResult = {
  id: string;
  title: string;
  location: string;
  durationLabel: string;
  rating: number;
  price: number;
  originalPrice: number;
  freeCancellation: boolean;
  image: string;
  gallery: string[];
  activityType: string;
  durationType: string;
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
