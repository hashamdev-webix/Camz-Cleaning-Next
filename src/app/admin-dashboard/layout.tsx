import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { RefreshCw, ShieldCheck } from "lucide-react";
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
  if (!profile || profile.is_blocked || profile.role?.toLowerCase() !== "admin") redirect("/customer-dashboard");

  return <div className="min-h-screen bg-[#020817]">
    <AdminSidebar />
    <div className="lg:ml-[280px]">
      <header className="sticky top-0 z-30 hidden min-h-24 items-center justify-between border-b border-white/10 bg-[#020817] px-8 lg:flex">
        <div><h1 className="text-3xl font-bold text-white">Admin Dashboard</h1><p className="mt-1 text-sm text-gray-400">Manage customer requests and operations.</p></div>
        <div className="flex items-center gap-4"><a href="/admin-dashboard" aria-label="Refresh dashboard" className="text-gray-400 transition hover:text-white"><RefreshCw size={22} /></a><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4A86F7] text-white shadow-lg shadow-blue-500/30"><ShieldCheck size={21} /></div></div>
      </header>
      <main>{children}</main>
    </div>
  </div>;
}
