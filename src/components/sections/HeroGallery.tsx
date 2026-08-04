import Image from "next/image";
import { cn } from "@/lib/utils";

const columns: { images: string[]; direction: "up" | "down" }[] = [
  {
    direction: "up",
    images: [
      "/assets/images/moving_bg_img1.png",
      "/assets/images/moving_bg_img2.png",
      "/assets/images/moving_bg_img3.png",
      "/assets/images/moving_bg_img4.png",
      "/assets/images/moving_bg_img5.png",
    ],
  },
  {
    direction: "down",
    images: [
      "/assets/images/moving_bg_img6.png",
      "/assets/images/moving_bg_img7.png",
      "/assets/images/moving_bg_img8.png",
      "/assets/images/moving_bg_img9.png",
      "/assets/images/moving_bg_img1.png",
    ],
  },
  {
    direction: "up",
    images: [
      "/assets/images/moving_bg_img2.png",
      "/assets/images/moving_bg_img3.png",
      "/assets/images/moving_bg_img4.png",
      "/assets/images/moving_bg_img5.png",
      "/assets/images/moving_bg_img9.png",
    ],
  },
];

export function HeroGallery() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden lg:h-[620px]">
      <div className="grid h-full grid-cols-3 gap-4 lg:gap-5">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="relative overflow-hidden">
            <div
              className={cn(
                "flex flex-col gap-4 lg:gap-5",
                column.direction === "up" ? "animate-marquee-up" : "animate-marquee-down"
              )}
            >
              {[...column.images, ...column.images].map((src, index) => (
                <div key={`${columnIndex}-${index}`} className="h-[150px] w-full shrink-0 lg:h-[220px]">
                  <div
                    className="animate-tile-rotate relative size-full overflow-hidden rounded-[16px] lg:rounded-[48px]"
                    style={{
                      animationDelay: `${(columnIndex + index) * 0.3}s`,
                      animationDirection: index % 2 === 0 ? "normal" : "reverse",
                    }}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 20vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
