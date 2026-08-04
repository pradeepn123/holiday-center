export type FlightSearchParams = {
  from?: string;
  to?: string;
  tripType?: string;
  departureDate?: string;
  returnDate?: string;
  travelClass?: string;
  passengers?: string;
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
  const query = search.toString();
  return query ? `?${query}` : "";
}
