import Link from "next/link";
import {
  ArrowRight, Banknote, BookOpen, CalendarDays, CheckCircle2, ClipboardCheck,
  GalleryHorizontal, Headphones, Images, ShieldCheck, Umbrella, UserCheck, Users,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const consoleItems = [
  { label: "Users", href: "/admin-dashboard/manage/users", icon: Users, color: "text-blue-400" },
  { label: "Verify", href: "/admin-dashboard/manage/verification", icon: UserCheck, color: "text-emerald-400" },
  { label: "Support", href: "/admin-dashboard/manage/support", icon: ClipboardCheck, color: "text-cyan-400" },
  { label: "Leave", href: "/admin-dashboard/manage/leave", icon: Umbrella, color: "text-blue-400" },
  { label: "Financials", href: "/admin-dashboard/manage/payments", icon: Banknote, color: "text-emerald-400" },
  { label: "Gallery", href: "/admin-dashboard/manage/gallery", icon: GalleryHorizontal, color: "text-green-400" },
  { label: "Blog", href: "/admin-dashboard/manage/blogs", icon: BookOpen, color: "text-cyan-400" },
  { label: "Before/After", href: "/admin-dashboard/manage/before-after", icon: Images, color: "text-blue-400" },
];

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [{ data: users }, { data: jobs }, { data: availability }, { data: requests }] = await Promise.all([
    supabase.from("users").select("id, name, role, approval_status, is_blocked"),
    supabase.from("jobs").select("id, service_name, status, customer_id, created_at, date").order("created_at", { ascending: false }),
    supabase.from("cleaner_availability").select("*"),
    supabase.from("custom_cleaning_requests").select("id, status"),
  ]);

  const allUsers = users || [];
  const allJobs = jobs || [];
  const customers = allUsers.filter((user) => user.role?.toLowerCase() === "customer").length;
  const cleaners = allUsers.filter((user) => user.role?.toLowerCase() === "cleaner").length;
  const admins = allUsers.filter((user) => user.role?.toLowerCase() === "admin").length;
  const completed = allJobs.filter((job) => job.status?.toLowerCase() === "completed").length;
  const pending = allJobs.filter((job) => job.status?.toLowerCase() === "pending").length;
  const total = allJobs.length;
  const completedPercent = total ? Math.round((completed / total) * 100) : 0;
  const pendingPercent = total ? Math.round((pending / total) * 100) : 0;
  const working = (availability || []).filter((row) => ["working", "busy", "on_job"].includes(String(row.status || row.availability_status || "").toLowerCase())).length;
  const available = (availability || []).filter((row) => row.is_available === true || String(row.status || row.availability_status || "").toLowerCase() === "available").length;

  const dayKeys = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    return date;
  });
  const weekly = dayKeys.map((date) => allJobs.filter((job) => {
    const created = new Date(job.created_at);
    return created >= date && created < new Date(date.getTime() + 86400000);
  }).length);
  const maxWeekly = Math.max(...weekly, 1);

  const health = [
    { label: "Customers", value: customers, icon: Users, tone: "border-blue-500/25 bg-blue-950/30 text-blue-400" },
    { label: "Cleaners", value: cleaners, icon: UserCheck, tone: "border-emerald-500/25 bg-emerald-950/25 text-emerald-400" },
    { label: "Admins", value: admins, icon: ShieldCheck, tone: "border-cyan-500/25 bg-cyan-950/25 text-cyan-400" },
    { label: "Total Bookings", value: total, icon: CalendarDays, tone: "border-green-500/25 bg-green-950/25 text-green-400" },
  ];

  return <div className="min-h-screen bg-[#020817] px-4 py-8 text-white sm:px-7 lg:px-10">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-bold text-[#4A86F7]">Camz Cleaner</p><h1 className="mt-1 text-3xl font-bold">Admin overview</h1><p className="mt-2 text-sm text-slate-400">A live view of customers, bookings, staff, and requests.</p></div><Link href="/admin-dashboard/custom-requests" className="flex w-fit items-center gap-2 rounded-md bg-[#4A86F7] px-4 py-3 text-sm font-bold text-white">{requests?.length || 0} custom requests <ArrowRight size={17} /></Link></div>

      <section className="mt-9"><h2 className="text-2xl font-bold">Platform Health</h2><div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">{health.map((item) => { const Icon = item.icon; return <div key={item.label} className={`min-h-40 rounded-xl border p-5 ${item.tone}`}><span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5"><Icon size={23} /></span><p className="mt-5 text-4xl font-bold">{item.value}</p><p className="mt-2 text-xs font-semibold uppercase text-slate-300">{item.label}</p></div>; })}</div></section>

      <section className="mt-10 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <div><div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Analytics</h2><Link href="/admin-dashboard/manage/bookings" className="text-sm font-bold text-[#4A86F7]">View bookings</Link></div><div className="mt-5 rounded-xl border border-white/10 bg-[#0B162B] p-5 sm:p-7"><p className="text-sm font-semibold text-slate-400">Weekly Bookings Growth</p><div className="mt-8 flex h-48 items-end justify-between gap-2">{weekly.map((value, index) => <div key={dayKeys[index].toISOString()} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><span className="text-xs font-bold text-slate-300">{value}</span><span className="w-full max-w-12 rounded-t-md bg-[#4A86F7]" style={{ height: `${Math.max((value / maxWeekly) * 150, value ? 18 : 3)}px` }} /><span className="text-[10px] uppercase text-slate-500">{dayKeys[index].toLocaleDateString("en-CA", { weekday: "short" })}</span></div>)}</div><div className="mt-7 grid grid-cols-2 gap-3"><div className="rounded-lg bg-emerald-950/40 p-4"><p className="text-sm text-slate-400">Completed</p><p className="mt-2 text-3xl font-bold text-emerald-400">{completedPercent}%</p><div className="mt-3 h-1.5 rounded bg-emerald-950"><div className="h-full rounded bg-emerald-500" style={{ width: `${completedPercent}%` }} /></div></div><div className="rounded-lg bg-amber-950/30 p-4"><p className="text-sm text-slate-400">Pending</p><p className="mt-2 text-3xl font-bold text-amber-400">{pendingPercent}%</p><div className="mt-3 h-1.5 rounded bg-amber-950"><div className="h-full rounded bg-amber-400" style={{ width: `${pendingPercent}%` }} /></div></div></div></div></div>
        <div><h2 className="text-2xl font-bold">Live Cleaner Tracking</h2><div className="mt-5 grid grid-cols-2 gap-3"><div className="min-h-48 rounded-xl border border-blue-500/25 bg-blue-950/25 p-5"><span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-900/50 text-blue-400"><Headphones size={22} /></span><p className="mt-7 text-4xl font-bold text-blue-400">{working}</p><p className="mt-2 text-xs font-semibold uppercase text-slate-300">Working now</p></div><div className="min-h-48 rounded-xl border border-green-500/25 bg-green-950/25 p-5"><span className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-900/40 text-green-400"><CheckCircle2 size={22} /></span><p className="mt-7 text-4xl font-bold text-green-400">{available}</p><p className="mt-2 text-xs font-semibold uppercase text-slate-300">Available</p></div></div></div>
      </section>

      <section className="mt-10"><h2 className="text-2xl font-bold">Management Console</h2><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">{consoleItems.map((item) => { const Icon = item.icon; return <Link key={item.label} href={item.href} className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-white/10 bg-[#0B162B] p-3 text-center transition hover:border-[#4A86F7]/60 hover:bg-[#101D35]"><Icon className={item.color} size={28} /><span className="mt-4 text-sm font-semibold text-white">{item.label}</span></Link>; })}</div></section>

      <section className="mt-10"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Recent Timeline</h2><Link href="/admin-dashboard/manage/bookings" className="text-sm font-bold text-[#4A86F7]">View all</Link></div><div className="mt-5 space-y-3">{allJobs.slice(0, 5).map((job) => <div key={job.id} className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#0B162B] p-4"><span className="h-3 w-3 shrink-0 rounded-full bg-amber-400" /><div className="min-w-0 flex-1"><p className="truncate font-bold">{job.service_name || "Cleaning service"}</p><p className="mt-1 text-xs text-slate-500">{new Date(job.created_at).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" })}</p></div><span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase text-amber-400">{job.status}</span></div>)}{!allJobs.length && <p className="rounded-xl border border-white/10 bg-[#0B162B] px-5 py-10 text-center text-sm text-slate-500">No booking activity yet.</p>}</div></section>
    </div>
  </div>;
}
