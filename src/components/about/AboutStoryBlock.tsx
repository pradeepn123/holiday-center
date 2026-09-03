import Image from "next/image";
import { cn } from "@/lib/utils";

export function AboutStoryBlock({
  title,
  paragraph,
  image,
  reverse = false,
}: {
  title: string;
  paragraph: string;
  image: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16",
        reverse && "lg:[&>*:first-child]:order-2"
      )}
    >
      <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 420px, 100vw"
          className="object-cover"
        />
      </div>

      <div>
        <h2 className="text-[26px] font-bold text-neutral-950 sm:text-[28px]">{title}</h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-500">{paragraph}</p>
      </div>
    </div>
  );
}
