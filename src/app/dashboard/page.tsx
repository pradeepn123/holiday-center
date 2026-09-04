import { Header } from "@/components/layout/Header";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardStatCards } from "@/components/dashboard/DashboardStatCards";
import { DashboardActivity } from "@/components/dashboard/DashboardActivity";
import { DashboardProfileCompleteness } from "@/components/dashboard/DashboardProfileCompleteness";

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-80px)] w-full bg-[#f5f8ff]">
        <DashboardSidebar active="Dashboard" />

        <div className="flex flex-1 flex-col gap-9 p-6 sm:p-12">
          <div className="flex flex-col gap-1.5">
            <p className="text-[26px] font-extrabold text-[#071516] sm:text-[28px]">
              Manage My Account
            </p>
            <p className="text-[14px] text-[#4a5568]">
              Welcome back to your travel planner. View your upcoming itineraries, loyalty stats,
              and saved preferences.
            </p>
          </div>

          <DashboardStatCards />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <DashboardActivity />
            <DashboardProfileCompleteness />
          </div>
        </div>
      </main>
    </>
  );
}
