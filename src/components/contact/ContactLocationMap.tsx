import Image from "next/image";

export function ContactLocationMap() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0b0b0c]">
      <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-neutral-900">
        <span className="size-1.5 rounded-full bg-teal-500" />
        Our Location
      </span>

      <div className="relative aspect-[1536/672] w-full">
        <Image
          src="/assets/images/location_map_img.png"
          alt="Map showing Holidays Center headquarters at 1/451-459 Sydney Rd, Coburg, VIC 3058"
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
