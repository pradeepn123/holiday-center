import Image from "next/image";

const FLAG_IMAGES: Record<string, string> = {
  AUT: "/assets/icons/country_flag/flag-aut.svg",
  ISR: "/assets/icons/country_flag/flag-isr.svg",
};

export function Flag({ code, emoji }: { code: string; emoji: string }) {
  const src = FLAG_IMAGES[code];
  if (!src) return <span>{emoji}</span>;
  return <Image src={src} alt={code} width={20} height={14} className="rounded-[2px]" />;
}
