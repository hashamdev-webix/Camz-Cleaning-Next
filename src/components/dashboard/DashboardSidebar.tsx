"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Heart,
  Settings,
} from "lucide-react";

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

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-[280px] bg-[#0B4E9B] text-white flex-col p-6">
      {/* Logo */}
      <Link href="/" className="mb-10">
        <img
          src="/logo.webp"
          alt="Camz Cleaning"
          className="h-14 w-auto brightness-0 invert"
        />
      </Link>

      {/* Navigation */}
      <nav className="space-y-3">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all ${
                active
                  ? "bg-white text-[#0B4E9B]"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={22} />
              <span className="font-semibold">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}