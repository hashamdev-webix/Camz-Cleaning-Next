import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

import "./customer.css";

export const metadata: Metadata = {
  title: "Customer Dashboard | Camz Cleaning",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="customer-dashboard-scope min-h-screen bg-[#F4F7FB]">
        <DashboardSidebar />

        <div className="lg:ml-[236px]">
          <DashboardHeader />

          <main className="min-h-[calc(100vh-68px)] bg-[#F4F7FB]">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
