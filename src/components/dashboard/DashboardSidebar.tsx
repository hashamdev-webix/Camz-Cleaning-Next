"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const links = [
  {
    name: "Dashboard",
    href: "/customer-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Bookings",
    href: "/customer-dashboard/bookings",
    icon: CalendarCheck,
  },
  {
    name: "Favorites",
    href: "/customer-dashboard/favorites",
    icon: Heart,
  },
  {
    name: "Settings",
    href: "/customer-dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const { signOut } = useAuth();
  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed:", error);
      window.location.assign("/login");
    }
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-[280px] bg-[#020817] border-r border-white/10 text-white flex-col p-6">
      {/* Logo */}
      <Link href="/" className="mb-10">
        <img
          src="/logo.webp"
          alt="Camz Cleaning"
          className="h-14 w-auto brightness-0 invert"
        />
      </Link>

      {/* Navigation */}
      <nav className="space-y-3 flex-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all ${
                active
                  ? "bg-[#4A86F7] text-white shadow-lg shadow-blue-500/20"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={20} />

              <span className="font-semibold">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="mt-6 flex items-center gap-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-400 transition hover:bg-red-500/20 disabled:cursor-wait disabled:opacity-60"
      >
        <LogOut size={20} />

        <span className="font-semibold">{loggingOut ? "Logging out..." : "Logout"}</span>
      </button>
    </aside>
  );
}
