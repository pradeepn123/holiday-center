"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Check, ChevronDown, Home, Ruler, User } from "lucide-react";
import { useClickOutside } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { hotelFullAmenities } from "@/lib/data";
import { buildStayQueryString, type StayParams } from "@/lib/stayParams";
import type { HotelRoom, HotelSearchResult } from "@/types";

const TABS = ["Rooms", "Hotels Deails", "Amenities"] as const;
type Tab = (typeof TABS)[number];

const ROOM_ONLY_OPTIONS = ["Room only", "All meal plans"];
const BROAD_TYPE_OPTIONS = ["Broad Type Filter", "Standard", "Deluxe", "Suite"];

function FilterDropdown({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-[14px] font-medium text-neutral-700"
      >
        {value}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-52 rounded-xl border border-neutral-100 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center rounded-lg px-3 py-2.5 text-left text-[14px] font-medium transition-colors hover:bg-neutral-100",
                value === option ? "text-brand-blue" : "text-neutral-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function HotelDetailsTabs({
  hotel,
  rooms,
  stayParams,
}: {
  hotel: HotelSearchResult;
  rooms: HotelRoom[];
  stayParams: StayParams;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("Rooms");
  const [roomOnly, setRoomOnly] = useState(ROOM_ONLY_OPTIONS[0]);
  const [broadType, setBroadType] = useState(BROAD_TYPE_OPTIONS[0]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[12px] border border-neutral-100 bg-white px-4 py-3">
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "shrink-0 rounded-[4px] px-5 py-2.5 text-[14px] font-semibold transition-colors",
                activeTab === tab
                  ? "bg-brand-blue text-white"
                  : "text-neutral-600 hover:bg-neutral-100"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <FilterDropdown options={ROOM_ONLY_OPTIONS} value={roomOnly} onChange={setRoomOnly} />
          <FilterDropdown options={BROAD_TYPE_OPTIONS} value={broadType} onChange={setBroadType} />
        </div>
      </div>

      <div className="mt-4">
        {activeTab === "Rooms" && (
          <>
            <div className="flex flex-col gap-4 lg:hidden">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="overflow-hidden rounded-2xl border border-neutral-100 bg-white"
                >
                  <div className="relative h-[180px] w-full">
                    <Image src={room.image} alt={room.name} fill sizes="100vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-[15px] font-bold text-brand-blue">{room.name}</p>
                    <div className="mt-2 flex flex-col gap-1.5 text-[13px] text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <Home className="size-3.5 shrink-0" />
                        {room.boardType}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Ruler className="size-3.5 shrink-0" />
                        {room.size}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BedDouble className="size-3.5 shrink-0" />
                        {room.bedType}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Bath className="size-3.5 shrink-0" />
                        {room.bathrooms}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-1">
                      {Array.from({ length: room.guests }).map((_, guestIndex) => (
                        <User key={guestIndex} className="size-4 text-neutral-400" />
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-4 border-t border-neutral-100 pt-3">
                      <div>
                        <p className="text-[12px] text-neutral-400">Room 1 Price</p>
                        <p className="text-[15px] font-bold text-neutral-900">
                          USD {room.price.toFixed(2)}
                        </p>
                      </div>
                      <Link
                        href={`/hotels/${hotel.id}/book/${room.id}${buildStayQueryString(stayParams)}`}
                        className="flex h-10 shrink-0 items-center justify-center rounded-[8px] bg-brand-blue px-5 text-[14px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden overflow-hidden rounded-2xl border border-neutral-100 bg-white lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#2C341D] text-white">
                    <th className="w-[260px] px-5 py-4 text-[13px] font-semibold">Room image</th>
                    <th className="w-[360px] px-5 py-4 text-[13px] font-semibold">Room type</th>
                    <th className="px-5 py-4 text-[13px] font-semibold">Number of guests</th>
                    <th className="px-5 py-4 text-[13px] font-semibold">Price &amp; Room Select</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, index) => (
                    <tr key={room.id} className={index !== 0 ? "border-t border-neutral-100" : undefined}>
                      <td className="border-r border-neutral-100 p-5 align-top">
                        <div className="relative h-[152px] w-[220px] shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={room.image}
                            alt={room.name}
                            fill
                            sizes="220px"
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="border-r border-neutral-100 p-5 align-top">
                        <p className="text-[15px] font-bold text-brand-blue">{room.name}</p>
                        <div className="mt-2 flex flex-col gap-1.5 text-[13px] text-neutral-500">
                          <span className="flex items-center gap-1.5">
                            <Home className="size-3.5 shrink-0" />
                            {room.boardType}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Ruler className="size-3.5 shrink-0" />
                            {room.size}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <BedDouble className="size-3.5 shrink-0" />
                            {room.bedType}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Bath className="size-3.5 shrink-0" />
                            {room.bathrooms}
                          </span>
                        </div>
                      </td>
                      <td className="border-r border-neutral-100 p-5 align-top">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: room.guests }).map((_, guestIndex) => (
                            <User key={guestIndex} className="size-4 text-neutral-400" />
                          ))}
                        </div>
                      </td>
                      <td className="p-5 align-top">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[12px] text-neutral-400">Room 1 Price</p>
                            <p className="text-[15px] font-bold text-neutral-900">
                              USD {room.price.toFixed(2)}
                            </p>
                          </div>
                          <Link
                            href={`/hotels/${hotel.id}/book/${room.id}${buildStayQueryString(stayParams)}`}
                            className="flex h-10 shrink-0 items-center justify-center rounded-[8px] bg-brand-blue px-5 text-[14px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
                          >
                            Book Now
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </>
        )}

        {activeTab === "Hotels Deails" && (
          <div className="rounded-2xl border border-neutral-100 bg-white p-6">
            <p className="text-[18px] font-bold text-neutral-900">{hotel.name}</p>

            <div className="mt-4">
              <p className="text-[15px] font-bold text-neutral-900">Location</p>
              <p className="mt-1 max-w-3xl text-[14px] leading-relaxed text-neutral-600">
                It&apos;s nice to come back to a place where you can have a rest after an eventful
                day in the city. {hotel.name} is located at {hotel.address}. You can take a walk
                and explore the neighbourhood around the hotel.
              </p>
            </div>

            <div className="mt-5">
              <p className="text-[15px] font-bold text-neutral-900">At the hotel</p>
              <p className="mt-1 max-w-3xl text-[14px] leading-relaxed text-neutral-600">
                You can stop by the restaurant. Free Wi-Fi on the territory will help you stay
                online. If you travel by car, you can park in a parking zone for free. The
                following services are also available for guests: a front desk, luggage storage
                and a concierge. The staff speaks English.
              </p>
            </div>

            <div className="mt-5">
              <p className="text-[15px] font-bold text-neutral-900">Room amenities</p>
              <p className="mt-1 max-w-3xl text-[14px] leading-relaxed text-neutral-600">
                Here&apos;s what you&apos;ll find in the room to help you rest after a long day:
                air conditioning, a work desk and a TV. Please note that the listed services may
                not be available in all the rooms.
              </p>
            </div>
          </div>
        )}

        {activeTab === "Amenities" && (
          <div className="rounded-2xl border border-neutral-100 bg-white p-6">
            <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
              {hotelFullAmenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2.5 text-[14px] text-neutral-700">
                  <Check className="size-4 shrink-0 text-brand-blue" />
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
