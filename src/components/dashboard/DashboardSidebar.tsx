import Image from "next/image";
import Link from "next/link";
import { FolderGit2, LayoutGrid, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
  { label: "Manage Profile", icon: User, href: "/manage-profile" },
  { label: "My Bookings", icon: FolderGit2, href: "/my-bookings" },
  { label: "Traveler's Info", icon: FolderGit2, href: "/travelers-info" },
];

export function DashboardSidebar({ active }: { active: string }) {
  return (
    <aside className="hidden w-[280px] shrink-0 flex-col gap-8 border-r border-[#e2e8f0] bg-white py-10 pl-8 pr-6 lg:flex">
      <div className="flex flex-col items-start gap-3">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
          <Image
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
            alt="Dinakar satya"
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[16px] font-bold text-[#071516]">Dinakar satya</p>
          <p className="text-[12px] text-[#94a3b8]">Dinakar@gmail.com</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item.label === active;
          const className = cn(
            "flex items-center gap-3 rounded-xl px-4 py-3 text-[14px]",
            isActive
              ? "bg-[#224ba0] font-semibold text-white"
              : "font-medium text-[#4a5568] transition-colors hover:bg-neutral-50"
          );

          if (item.href) {
            return (
              <Link key={item.label} href={item.href} className={className}>
                <item.icon className="size-[18px]" />
                {item.label}
              </Link>
            );
          }

          return (
            <div key={item.label} className={className}>
              <item.icon className="size-[18px]" />
              {item.label}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
