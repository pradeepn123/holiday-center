import { cn } from "@/lib/utils";

export function SectionEyebrow({
  children,
  variant = "light",
  className,
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <span
        className={cn(
          "size-1.5 rounded-full",
          variant === "dark" ? "bg-brand-lime" : "bg-brand-blue"
        )}
      />
      <span
        className={cn(
          "text-[12px] font-bold uppercase tracking-[0.15em]",
          variant === "dark" ? "text-white/70" : "text-neutral-500"
        )}
      >
        {children}
      </span>
    </div>
  );
}
