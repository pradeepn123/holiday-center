import Image from "next/image";

export function HotelGallery({ images, name }: { images: string[]; name: string }) {
  const [main, ...rest] = images;
  const thumbnails = rest.slice(0, 4);

  return (
    <div className="grid grid-cols-1 gap-2 lg:h-[420px] lg:grid-cols-[1.6fr_1fr]">
      <div className="relative h-[260px] overflow-hidden lg:h-full">
        <Image
          src={main}
          alt={name}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="grid h-[260px] grid-cols-2 grid-rows-2 gap-2 lg:h-full">
        {thumbnails.map((src, index) => (
          <div key={src + index} className="relative overflow-hidden">
            <Image
              src={src}
              alt={`${name} photo ${index + 2}`}
              fill
              sizes="(min-width: 1024px) 20vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
