"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  LogOut,
  LayoutDashboard,
  CalendarCheck,
  Heart,
  Settings,
} from "lucide-react";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

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

export default function MobileSidebar({
  open,
  setOpen,
}: Props) {

  const pathname = usePathname();

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout");
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[280px] bg-[#020817] border-r border-white/10 text-white p-6 transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* Top */}
        <div className="flex items-center justify-between mb-10">

          <img
            src="/logo.webp"
            alt="Logo"
            className="h-12 brightness-0 invert"
          />

          <button
            onClick={() => setOpen(false)}
            className="text-white/80 hover:text-white transition"
          >
            <X size={28} />
          </button>
        </div>

        {/* Links */}
        <nav className="space-y-3 flex-1">

          {links.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 font-semibold transition ${
                  active
                    ? "bg-[#4A86F7] text-white shadow-lg shadow-blue-500/20"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={20} />

                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-400 transition hover:bg-red-500/20"
        >
          <LogOut size={20} />

          <span className="font-semibold">
            Logout
          </span>
        </button>
      </aside>
    </>
  );
}