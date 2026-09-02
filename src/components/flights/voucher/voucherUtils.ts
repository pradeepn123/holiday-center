import { hashString } from "@/lib/voucherUtils";

export function buildReferenceId(flightId: string, originCode: string, destinationCode: string): string {
  const hash = hashString(`ref-${flightId}`).toString().padStart(12, "0").slice(0, 12);
  return `ROM-F-${originCode}${destinationCode}-${hash}`;
}

const PNR_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function buildPnr(flightId: string): string {
  let value = hashString(`pnr-${flightId}`);
  let pnr = "";
  for (let index = 0; index < 6; index += 1) {
    pnr += PNR_CHARS[value % PNR_CHARS.length];
    value = Math.floor(value / PNR_CHARS.length);
  }
  return pnr;
}
