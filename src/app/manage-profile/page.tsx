import { Mail, MapPin, User } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { ProfileInfoCard } from "@/components/profile/ProfileInfoCard";

export default function ManageProfilePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-80px)] w-full bg-[#f5f8ff]">
        <DashboardSidebar active="Manage Profile" />

        <div className="flex flex-1 justify-center p-6 sm:p-12">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white">
            <div className="h-1.5 w-full bg-[#224ba0]" />

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 border-b border-dashed border-neutral-200 pb-6">
                <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#15306b]">
                  <User className="size-7 text-white" />
                </span>
                <div>
                  <p className="text-[26px] font-bold text-[#0f172a]">User</p>
                  <p className="text-[14px] text-[#64748b]">Manage your profile and account details</p>
                </div>
              </div>

              <div className="mt-6">
                <ProfileTabs active="Contact Details" />
              </div>

              <div className="mt-6 flex flex-col gap-5">
                <ProfileInfoCard
                  icon={User}
                  title="Personal Info"
                  rows={[
                    { label: "Title" },
                    { label: "First Name", value: "User" },
                    { label: "Last Name" },
                    { label: "Gender" },
                    { label: "Date of Birth" },
                  ]}
                />

                <ProfileInfoCard
                  icon={Mail}
                  title="Contact"
                  rows={[
                    { label: "Email address", value: "srajpoot@valentistech.in" },
                    { label: "Mobile no", value: "778-507-0089" },
                  ]}
                />

                <ProfileInfoCard
                  icon={MapPin}
                  title="Address"
                  rows={[
                    { label: "Apartment / Suite" },
                    { label: "Street Address" },
                    { label: "Country", value: "Canada" },
                    { label: "State / Province" },
                    { label: "City" },
                    { label: "Postal Code" },
                  ]}
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="rounded-lg bg-[#224ba0] px-8 py-3 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#1b3a80]"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
