export function hashString(input: string): number {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }
  return hash;
}

const REFERENCE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

/** Deterministic, stable-looking booking reference derived from a seed (e.g. a room/flight id). */
export function buildBookingReference(prefix: string, seed: string): string {
  let value = hashString(seed);
  let middle = "";
  for (let index = 0; index < 6; index += 1) {
    middle += REFERENCE_CHARS[value % REFERENCE_CHARS.length];
    value = Math.floor(value / REFERENCE_CHARS.length);
  }
  let suffix = "";
  for (let index = 0; index < 4; index += 1) {
    suffix += REFERENCE_CHARS[value % REFERENCE_CHARS.length];
    value = Math.floor(value / REFERENCE_CHARS.length);
  }
  return `${prefix}-${middle}-${suffix}`;
}
