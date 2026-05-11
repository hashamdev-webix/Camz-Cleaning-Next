import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f7f7] flex">
      
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Area */}
      <div className="flex-1 lg:ml-[280px]">
        <DashboardHeader />

        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}