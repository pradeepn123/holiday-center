import Image from "next/image";

const IMAGES = [
  {
    src: "/assets/images/moving_bg_img1.png",
    className: "right-10 top-0 h-28 w-24 rotate-6",
    delay: "0s",
  },
  {
    src: "/assets/images/moving_bg_img4.png",
    className: "right-32 top-6 h-32 w-28 -rotate-6",
    delay: "0.5s",
  },
  {
    src: "/assets/images/moving_bg_img7.png",
    className: "right-2 top-24 h-28 w-24 rotate-3",
    delay: "1s",
  },
  {
    src: "/assets/images/moving_bg_img2.png",
    className: "right-28 top-44 h-24 w-20 -rotate-3",
    delay: "1.5s",
  },
] as const;

export function MobileGalleryShowcase() {
  return (
    <div className="relative mt-8 h-[280px] w-full overflow-hidden lg:hidden" aria-hidden="true">
      {IMAGES.map((image, index) => (
        <div
          key={index}
          style={{ animationDelay: image.delay }}
          className={`animate-tile-rotate absolute overflow-hidden rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.18)] ${image.className}`}
        >
          <Image src={image.src} alt="" fill sizes="160px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
