export type StayParams = {
  checkIn?: string;
  checkOut?: string;
  adults?: string;
  children?: string;
  rooms?: string;
};

export function buildStayQueryString(params: StayParams): string {
  const search = new URLSearchParams();
  if (params.checkIn) search.set("checkIn", params.checkIn);
  if (params.checkOut) search.set("checkOut", params.checkOut);
  if (params.adults) search.set("adults", params.adults);
  if (params.children) search.set("children", params.children);
  if (params.rooms) search.set("rooms", params.rooms);
  const query = search.toString();
  return query ? `?${query}` : "";
}

function formatDisplayDate(value?: string) {
  if (!value) return undefined;
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return undefined;
  return `${day}-${month}-${year}`;
}

export function describeStay(params: StayParams) {
  const adults = Number(params.adults ?? 2) || 2;
  const children = Number(params.children ?? 0) || 0;
  const roomCount = Number(params.rooms ?? 1) || 1;

  const guestsLabel = `${adults} Guest${adults === 1 ? "" : "s"}${
    children > 0 ? `, ${children} Child${children === 1 ? "" : "ren"}` : ""
  }, ${roomCount} Room${roomCount === 1 ? "" : "s"}`;

  return {
    checkIn: formatDisplayDate(params.checkIn) ?? "23-06-2026",
    checkOut: formatDisplayDate(params.checkOut) ?? "25-06-2026",
    guests: adults + children,
    guestsLabel,
  };
}
