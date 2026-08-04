"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function HotelMapPreview({
  imageClassName = "h-[185px]",
  buttonClassName = "h-9 text-[16px]",
}: {
  imageClassName?: string;
  buttonClassName?: string;
}) {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      <div className="overflow-hidden rounded-2xl">
        <button
          type="button"
          onClick={() => setIsMapOpen(true)}
          className={cn("relative block w-full", imageClassName)}
        >
          <Image
            src="/assets/images/hotel_map.png"
            alt="Map preview"
            fill
            sizes="300px"
            className="object-cover"
          />
        </button>
        <button
          type="button"
          onClick={() => setIsMapOpen(true)}
          className={cn(
            "flex w-full items-center justify-center bg-[#2C341D] font-bold text-white transition-colors hover:bg-[#232a17]",
            buttonClassName
          )}
        >
          Explore on Map
        </button>
      </div>

      {isMapOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
            onClick={() => setIsMapOpen(false)}
          >
            <div
              onClick={(event) => event.stopPropagation()}
              className="relative h-[80vh] w-full max-w-[900px] overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setIsMapOpen(false)}
                aria-label="Close map"
                className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white text-neutral-600 shadow-lg ring-1 ring-black/5 hover:bg-neutral-100"
              >
                <X className="size-5" />
              </button>
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1450%2C51.4850%2C-0.0650%2C51.5250&layer=mapnik"
                title="Explore on map"
                className="h-full w-full border-0"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
