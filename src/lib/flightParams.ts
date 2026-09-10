export type FlightLegParam = { from: string; to: string; date: string };

export type FlightSearchParams = {
  from?: string;
  to?: string;
  tripType?: string;
  departureDate?: string;
  returnDate?: string;
  travelClass?: string;
  passengers?: string;
  legs?: string;
};

export function buildFlightQueryString(params: FlightSearchParams): string {
  const search = new URLSearchParams();
  if (params.from) search.set("from", params.from);
  if (params.to) search.set("to", params.to);
  if (params.tripType) search.set("tripType", params.tripType);
  if (params.departureDate) search.set("departureDate", params.departureDate);
  if (params.returnDate) search.set("returnDate", params.returnDate);
  if (params.travelClass) search.set("travelClass", params.travelClass);
  if (params.passengers) search.set("passengers", params.passengers);
  if (params.legs) search.set("legs", params.legs);
  const query = search.toString();
  return query ? `?${query}` : "";
}

/** Encode multi-city legs into a single query-string-safe value. */
export function encodeFlightLegs(legs: FlightLegParam[]): string {
  return legs
    .filter((leg) => leg.from.trim() || leg.to.trim() || leg.date)
    .map((leg) => [leg.from.trim(), leg.to.trim(), leg.date].join("~"))
    .join(";");
}

/** Decode the `legs` query param back into structured legs. */
export function decodeFlightLegs(value: string | string[] | undefined | null): FlightLegParam[] {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return [];
  return raw
    .split(";")
    .filter(Boolean)
    .map((part) => {
      const [from = "", to = "", date = ""] = part.split("~");
      return { from, to, date };
    });
}
