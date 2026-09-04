import { Header } from "@/components/layout/Header";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { TravelersDetailsCard } from "@/components/travelers/TravelersDetailsCard";

export default function TravelersInfoPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-80px)] w-full bg-[#f5f8ff]">
        <DashboardSidebar active="Traveler's Info" />

        <div className="flex flex-1 justify-center p-6 sm:p-12">
          <div className="w-full max-w-3xl">
            <TravelersDetailsCard />
          </div>
        </div>
      </main>
    </>
  );
}
