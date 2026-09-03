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
        className={cn("size-1.5 rounded-full", variant === "dark" ? "bg-[#f59e0b]" : "bg-[#224ba0]")}
      />
      <span
        className={cn(
          "text-[12px] font-bold uppercase tracking-wide",
          variant === "dark" ? "text-white" : "text-[#5a6a80]"
        )}
      >
        {children}
      </span>
    </div>
  );
}
