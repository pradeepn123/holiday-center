import { Header } from "@/components/layout/Header";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { MyBookingsSearch } from "@/components/bookings/MyBookingsSearch";

export default function MyBookingsPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-80px)] w-full bg-[#f5f8ff]">
        <DashboardSidebar active="My Bookings" />

        <div className="flex flex-1 justify-center p-6 sm:p-12">
          <div className="w-full max-w-3xl">
            <MyBookingsSearch />
          </div>
        </div>
      </main>
    </>
  );
}
