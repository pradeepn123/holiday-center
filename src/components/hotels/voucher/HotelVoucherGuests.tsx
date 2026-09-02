import { distributeChildren } from "@/lib/roomGuests";

type VoucherGuest = { name: string; type: string; roomAllocation: string };

function buildGuestList(roomsCount: number, childrenCount: number, roomName: string): VoucherGuest[] {
  const childrenPerRoom = distributeChildren(childrenCount, roomsCount);
  const guests: VoucherGuest[] = [];
  let guestNumber = 0;

  for (let room = 0; room < roomsCount; room += 1) {
    const roomAllocation = roomsCount > 1 ? `${roomName} (Room ${room + 1})` : roomName;

    for (let adult = 0; adult < 2; adult += 1) {
      guestNumber += 1;
      guests.push({
        name: `Guest ${guestNumber}`,
        type: guestNumber === 1 ? "Primary Adult" : "Adult Guest",
        roomAllocation,
      });
    }

    for (let child = 0; child < childrenPerRoom[room]; child += 1) {
      guestNumber += 1;
      guests.push({ name: `Guest ${guestNumber}`, type: "Child Guest", roomAllocation });
    }
  }

  return guests;
}

export function HotelVoucherGuests({
  roomsCount,
  childrenCount,
  roomName,
}: {
  roomsCount: number;
  childrenCount: number;
  roomName: string;
}) {
  const guests = buildGuestList(roomsCount, childrenCount, roomName);

  return (
    <div className="overflow-hidden rounded-lg border border-[#e2e8f0]">
      <div className="flex items-center gap-3 border-b border-[#e2e8f0] bg-[#f8fafc] px-3 py-3">
        <p className="flex-1 text-[11px] font-semibold uppercase text-[#475569]">Guest Name</p>
        <p className="w-[100px] shrink-0 text-[11px] font-semibold uppercase text-[#475569]">Type</p>
        <p className="w-[160px] shrink-0 text-[11px] font-semibold uppercase text-[#475569]">
          Room Allocation
        </p>
      </div>
      {guests.map((guest, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 px-3 py-3 ${
            index === guests.length - 1 ? "" : "border-b border-[#e2e8f0]"
          }`}
        >
          <p className="flex-1 text-[12px] font-semibold text-[#1f2937]">{guest.name}</p>
          <p className="w-[100px] shrink-0 text-[12px] text-[#4b5563]">{guest.type}</p>
          <p className="w-[160px] shrink-0 truncate text-[12px] text-[#4b5563]">{guest.roomAllocation}</p>
        </div>
      ))}
    </div>
  );
}
