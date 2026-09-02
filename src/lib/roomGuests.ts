/** Splits a total children count across rooms as evenly as possible, giving any remainder to the first rooms. */
export function distributeChildren(totalChildren: number, roomsCount: number): number[] {
  const base = Math.floor(totalChildren / roomsCount);
  const remainder = totalChildren % roomsCount;
  return Array.from({ length: roomsCount }, (_, index) => base + (index < remainder ? 1 : 0));
}
