import type { FlightLeg, FlightResult } from "@/types";

export type AirlineInfo = { name: string; code: string };

export const flightAirlines: AirlineInfo[] = [
  { name: "Egypt Air", code: "MS" },
  { name: "Gulf Air", code: "GF" },
  { name: "Etihad Airways", code: "EY" },
  { name: "Fly Dubai", code: "FZ" },
  { name: "Oman Air", code: "WY" },
  { name: "Qatar Airways", code: "QR" },
  { name: "Emirates", code: "EK" },
];

export const flightLuggageOptions = ["0 Kilograms", "0 Piece", "1 Piece", "20 Kilograms", "30 Kilograms", "35 Kilograms"];

const cityCodes: Record<string, string> = {
  kuwait: "KWI",
  dubai: "DXB",
  "dubai internet city": "DXB",
  london: "LON",
  bangkok: "BKK",
  "bangkok, bangkok": "BKK",
  paris: "PAR",
  "new york": "NYC",
  singapore: "SIN",
  istanbul: "IST",
  rome: "ROM",
  cairo: "CAI",
  doha: "DOH",
  "kuala lumpur": "KUL",
  sydney: "SYD",
  barcelona: "BCN",
  "abu dhabi": "AUH",
  muscat: "MCT",
  manama: "BAH",
  riyadh: "RUH",
  jeddah: "JED",
};

export function cityToAirportCode(city: string) {
  const trimmed = city.trim();
  if (!trimmed) return "---";
  const lower = trimmed.toLowerCase();
  if (cityCodes[lower]) return cityCodes[lower];
  return trimmed.replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase().padEnd(3, "X");
}

export function formatFlightDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins.toString().padStart(2, "0")}m`;
}

export function stopsLabel(stops: number) {
  if (stops === 0) return "Direct";
  return `${stops} Stop${stops === 1 ? "" : "s"}`;
}

export const flightTimeSlots = ["12AM - 6AM", "6AM - 12PM", "12PM - 6PM", "6PM - 12AM"] as const;

export function timeSlotFor(time: string): (typeof flightTimeSlots)[number] {
  const hour = Number(time.split(":")[0]);
  if (hour < 6) return flightTimeSlots[0];
  if (hour < 12) return flightTimeSlots[1];
  if (hour < 18) return flightTimeSlots[2];
  return flightTimeSlots[3];
}

export function estimateTransitMinutes(stops: number) {
  return Math.min(stops, LAYOVER_HUBS.length) * LAYOVER_MINUTES;
}

export type FlightSegmentDetail = {
  airline: string;
  flightNumber: string;
  departureTime: string;
  departureDate: string;
  departureCity: string;
  departureCode: string;
  departureAirport: string;
  departureTerminal: string;
  arrivalTime: string;
  arrivalDate: string;
  arrivalCity: string;
  arrivalCode: string;
  arrivalAirport: string;
  arrivalTerminal: string;
  durationLabel: string;
};

export type FlightLayoverDetail = {
  city: string;
  code: string;
  durationLabel: string;
};

export type FlightItinerary = {
  segments: FlightSegmentDetail[];
  layovers: FlightLayoverDetail[];
};

const LAYOVER_HUBS = ["Abu Dhabi", "Doha", "Muscat", "Manama", "Riyadh"];
const TERMINAL_LABELS = ["1", "2", "3", "A", "B", "C"];
const LAYOVER_MINUTES = 90;

function addMinutesToTime(time: string, minutesToAdd: number) {
  const [hours, minutes] = time.split(":").map(Number);
  const total = (hours * 60 + minutes + minutesToAdd + 1440) % 1440;
  const nextHours = Math.floor(total / 60).toString().padStart(2, "0");
  const nextMinutes = (total % 60).toString().padStart(2, "0");
  return `${nextHours}:${nextMinutes}`;
}

function terminalFor(code: string, index: number) {
  return TERMINAL_LABELS[(code.charCodeAt(0) + index) % TERMINAL_LABELS.length];
}

export function getFlightItinerary(leg: FlightLeg): FlightItinerary {
  const stopCount = Math.min(leg.stops, LAYOVER_HUBS.length);
  const hubs = LAYOVER_HUBS.filter(
    (hub) => hub.toLowerCase() !== leg.origin.toLowerCase() && hub.toLowerCase() !== leg.destination.toLowerCase()
  ).slice(0, stopCount);

  const cities = [leg.origin, ...hubs, leg.destination];
  const legCount = cities.length - 1;
  const layoverTotal = LAYOVER_MINUTES * hubs.length;
  const flightMinutes = Math.max(45, Math.round((leg.durationMinutes - layoverTotal) / legCount));

  const segments: FlightSegmentDetail[] = [];
  const layovers: FlightLayoverDetail[] = [];
  let currentTime = leg.departureTime;

  for (let index = 0; index < legCount; index += 1) {
    const departureCity = cities[index];
    const arrivalCity = cities[index + 1];
    const departureCode = cityToAirportCode(departureCity);
    const arrivalCode = cityToAirportCode(arrivalCity);
    const arrivalTime = addMinutesToTime(currentTime, flightMinutes);

    segments.push({
      airline: leg.airline,
      flightNumber: leg.flightNumber,
      departureTime: currentTime,
      departureDate: leg.departureDate,
      departureCity,
      departureCode,
      departureAirport: `${departureCity} International Airport`,
      departureTerminal: terminalFor(departureCode, index),
      arrivalTime,
      arrivalDate: leg.departureDate,
      arrivalCity,
      arrivalCode,
      arrivalAirport: `${arrivalCity} International Airport`,
      arrivalTerminal: terminalFor(arrivalCode, index + 1),
      durationLabel: formatFlightDuration(flightMinutes),
    });

    if (index < legCount - 1) {
      layovers.push({
        city: arrivalCity,
        code: arrivalCode,
        durationLabel: formatFlightDuration(LAYOVER_MINUTES),
      });
      currentTime = addMinutesToTime(arrivalTime, LAYOVER_MINUTES);
    }
  }

  return { segments, layovers };
}

function addDaysLabel(baseDate: string | undefined, offsetDays: number) {
  const base = baseDate ? new Date(`${baseDate}T00:00:00`) : new Date();
  if (Number.isNaN(base.getTime())) return formatDisplayDate(new Date());
  base.setDate(base.getDate() + offsetDays);
  return formatDisplayDate(base);
}

function formatDisplayDate(date: Date) {
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "-");
}

type FlightSearchQuery = {
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  tripType?: string;
};

const FLIGHT_TEMPLATES: Array<{
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  stops: number;
  basePrice: number;
  refundable: boolean;
}> = [
  { departureTime: "04:20", arrivalTime: "06:10", durationMinutes: 110, stops: 0, basePrice: 245, refundable: true },
  { departureTime: "07:45", arrivalTime: "11:05", durationMinutes: 200, stops: 1, basePrice: 189, refundable: false },
  { departureTime: "09:30", arrivalTime: "12:40", durationMinutes: 190, stops: 0, basePrice: 312, refundable: true },
  { departureTime: "12:15", arrivalTime: "17:50", durationMinutes: 335, stops: 1, basePrice: 168, refundable: false },
  { departureTime: "14:00", arrivalTime: "16:20", durationMinutes: 140, stops: 0, basePrice: 279, refundable: true },
  { departureTime: "16:40", arrivalTime: "22:10", durationMinutes: 330, stops: 2, basePrice: 152, refundable: false },
  { departureTime: "19:10", arrivalTime: "21:35", durationMinutes: 145, stops: 0, basePrice: 298, refundable: true },
  { departureTime: "22:30", arrivalTime: "05:45", durationMinutes: 435, stops: 1, basePrice: 176, refundable: false },
];

function buildLeg(
  template: (typeof FLIGHT_TEMPLATES)[number],
  airline: AirlineInfo,
  flightSuffix: number,
  originLabel: string,
  destinationLabel: string,
  date: string
): FlightLeg {
  return {
    airline: airline.name,
    airlineCode: airline.code,
    flightNumber: `${airline.code}-${300 + flightSuffix * 47}`,
    departureTime: template.departureTime,
    departureDate: date,
    origin: originLabel,
    originCode: cityToAirportCode(originLabel),
    arrivalTime: template.arrivalTime,
    arrivalDate: date,
    destination: destinationLabel,
    destinationCode: cityToAirportCode(destinationLabel),
    durationMinutes: template.durationMinutes,
    stops: template.stops,
  };
}

export function generateFlightResults(query: FlightSearchQuery): FlightResult[] {
  const from = query.from?.trim() || "Kuwait";
  const to = query.to?.trim() || "Dubai";
  const isRoundTrip = query.tripType === "roundtrip";
  const departureDateLabel = addDaysLabel(query.departureDate, 0);
  const returnDateLabel = addDaysLabel(query.returnDate ?? query.departureDate, isRoundTrip ? 0 : 5);

  return FLIGHT_TEMPLATES.map((template, index) => {
    const airline = flightAirlines[index % flightAirlines.length];
    const luggage = flightLuggageOptions[index % flightLuggageOptions.length];
    const outbound = buildLeg(template, airline, index, from, to, departureDateLabel);
    const returnLeg = isRoundTrip
      ? buildLeg(template, airline, index + 50, to, from, returnDateLabel)
      : undefined;

    const isLast = index === FLIGHT_TEMPLATES.length - 1;
    const price = template.basePrice + index * 6;

    return {
      id: `flight-${index + 1}`,
      outbound,
      return: returnLeg,
      price,
      originalPrice: isLast ? price + 84 : undefined,
      refundable: template.refundable,
      luggage,
    };
  });
}
