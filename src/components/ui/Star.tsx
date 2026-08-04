import { Star as StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StarProps = {
  filled?: boolean;
  className?: string;
};

export function Star({ filled = true, className }: StarProps) {
  return (
    <StarIcon
      className={cn(
        "size-3.5",
        filled ? "fill-[#ffcb45] text-[#ffcb45]" : "fill-neutral-200 text-neutral-200",
        className
      )}
    />
  );
}

export function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} filled={index < Math.round(rating)} />
      ))}
    </div>
  );
}
