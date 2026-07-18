import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ClipboardCheck, RefreshCw, ShieldCheck, UserCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Dashboard | Camz Cleaning",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/admin-dashboard");

  const { data: profile } = await supabase.from("users").select("role, is_blocked").eq("id", user.id).maybeSingle();
  const role = profile?.role?.toLowerCase();
  if (!profile || profile.is_blocked || !["admin", "data_entry", "cleaner"].includes(role || "")) redirect("/customer-dashboard");
  const shell = role === "cleaner"
    ? { title: "Cleaner Dashboard", subtitle: "View bookings, schedules, service progress, and before/after images.", icon: UserCheck, iconClass: "bg-emerald-600 shadow-emerald-500/30" }
    : role === "data_entry"
      ? { title: "Data Entry Dashboard", subtitle: "Create booking records and manage submitted job details.", icon: ClipboardCheck, iconClass: "bg-orange-600 shadow-orange-500/30" }
      : { title: "Admin Dashboard", subtitle: "Manage customer requests and operations.", icon: ShieldCheck, iconClass: "bg-[#4A86F7] shadow-blue-500/30" };
  const ShellIcon = shell.icon;

  return <div className="min-h-screen bg-[#020817]">
    <AdminSidebar role={role || "admin"} />
    <div className="lg:ml-[280px]">
      <header className="sticky top-0 z-30 hidden min-h-24 items-center justify-between border-b border-white/10 bg-[#020817] px-8 lg:flex">
        <div><h1 className="text-3xl font-bold text-white">{shell.title}</h1><p className="mt-1 text-sm text-gray-400">{shell.subtitle}</p></div>
        <div className="flex items-center gap-4"><a href="/admin-dashboard/booking-records" aria-label="Refresh dashboard" className="text-gray-400 transition hover:text-white"><RefreshCw size={22} /></a><div className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg ${shell.iconClass}`}><ShellIcon size={21} /></div></div>
      </header>
      <main>{children}</main>
    </div>
  </div>;
}
