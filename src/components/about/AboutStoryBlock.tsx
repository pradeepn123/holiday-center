import Image from "next/image";
import { cn } from "@/lib/utils";

export function AboutStoryBlock({
  title,
  paragraph,
  image,
  reverse = false,
  fixedImageWidth = true,
}: {
  title: string;
  paragraph: string;
  image: string;
  reverse?: boolean;
  fixedImageWidth?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-8 lg:gap-16",
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      )}
    >
      <div
        className={cn(
          "relative h-[280px] w-full overflow-hidden rounded-xl bg-[#224ba0] lg:h-[380px]",
          fixedImageWidth ? "lg:w-[515px] lg:shrink-0" : "lg:flex-1"
        )}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 515px, 100vw"
          className="object-cover"
        />
      </div>

      <div className={cn("w-full", !fixedImageWidth && "lg:w-[733px] lg:shrink-0")}>
        <h2 className="text-[28px] font-normal text-[#0d1b3e] lg:text-[32px]">{title}</h2>
        <p className="mt-6 text-[16px] leading-[1.6] text-[#5a6a80]">{paragraph}</p>
      </div>
    </div>
  );
}
