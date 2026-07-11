"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Banknote, BookOpen, CalendarDays, ClipboardCheck, ClipboardList,
  GalleryHorizontal, Headphones, Images, LayoutDashboard, LogOut,
  BarChart3, Menu, ReceiptText, Settings2, ShieldCheck, UserCheck, Users, Wrench, X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const groups = [
  {
    label: "Workspace",
    links: [
      { label: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
      { label: "Custom Requests", href: "/admin-dashboard/custom-requests", icon: ClipboardList },
      { label: "Bookings", href: "/admin-dashboard/bookings", icon: CalendarDays },
      { label: "Customers", href: "/admin-dashboard/customers", icon: Users },
      { label: "Cleaners", href: "/admin-dashboard/manage/cleaners", icon: UserCheck },
      { label: "Payments", href: "/admin-dashboard/manage/payments", icon: Banknote },
      { label: "Reports", href: "/admin-dashboard/manage/reports", icon: BarChart3 },
    ],
  },
  {
    label: "Operations",
    links: [
      { label: "Services", href: "/admin-dashboard/services", icon: Wrench },
      { label: "All Users", href: "/admin-dashboard/manage/users", icon: UserCheck },
      { label: "Verification", href: "/admin-dashboard/manage/verification", icon: ShieldCheck },
      { label: "Support", href: "/admin-dashboard/manage/support", icon: Headphones },
      { label: "Leave Requests", href: "/admin-dashboard/manage/leave", icon: ClipboardCheck },
      { label: "Invoices", href: "/admin-dashboard/manage/invoices", icon: ReceiptText },
    ],
  },
  {
    label: "Content",
    links: [
      { label: "Gallery", href: "/admin-dashboard/manage/gallery", icon: GalleryHorizontal },
      { label: "Blog", href: "/admin-dashboard/manage/blogs", icon: BookOpen },
      { label: "Before / After", href: "/admin-dashboard/before-after", icon: Images },
      { label: "App Settings", href: "/admin-dashboard/manage/settings", icon: Settings2 },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const navigation = <>
    <div className="flex-1 overflow-y-auto pr-1">
      {groups.map((group) => <div key={group.label} className="mb-6">
        <p className="mb-2 px-3 text-[11px] font-bold uppercase text-white/35">{group.label}</p>
        <nav className="space-y-1">{group.links.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`flex min-h-11 items-center gap-3 rounded-xl px-4 text-sm font-semibold transition ${active ? "bg-[#4A86F7] text-white shadow-lg shadow-blue-500/20" : "text-white/65 hover:bg-white/5 hover:text-white"}`}><Icon size={18} /> {item.label}</Link>;
        })}</nav>
      </div>)}
    </div>
    <button type="button" onClick={() => signOut()} className="mt-3 flex min-h-12 items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 text-sm font-semibold text-red-400 hover:bg-red-500/20"><LogOut size={19} /> Log out</button>
  </>;

  return <>
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#020817] px-4 lg:hidden">
      <Link href="/admin-dashboard"><Image src="/logo.webp" alt="Camz Cleaning" width={150} height={56} className="h-10 w-auto brightness-0 invert" /></Link>
      <button type="button" aria-label="Open admin menu" onClick={() => setOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-white"><Menu size={23} /></button>
    </header>
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-[280px] flex-col border-r border-white/10 bg-[#020817] p-6 lg:flex">
      <Link href="/admin-dashboard" className="mb-8"><Image src="/logo.webp" alt="Camz Cleaning" width={180} height={67} className="h-14 w-auto brightness-0 invert" /></Link>
      {navigation}
    </aside>
    {open && <div className="fixed inset-0 z-50 lg:hidden"><button type="button" aria-label="Close admin menu" className="absolute inset-0 bg-slate-950/60" onClick={() => setOpen(false)} /><aside className="relative flex h-full w-[min(84vw,310px)] flex-col border-r border-white/10 bg-[#020817] p-5 text-white shadow-xl"><div className="mb-7 flex items-center justify-between"><Image src="/logo.webp" alt="Camz Cleaning" width={165} height={61} className="h-11 w-auto brightness-0 invert" /><button type="button" aria-label="Close admin menu" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10"><X size={20} /></button></div>{navigation}</aside></div>}
  </>;
}
