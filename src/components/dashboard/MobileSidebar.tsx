"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const links = [
  {
    name: "Dashboard",
    href: "/customer-dashboard",
  },
  {
    name: "Bookings",
    href: "/customer-dashboard/bookings",
  },
  {
    name: "Favorites",
    href: "/customer-dashboard/favorites",
  },
  {
    name: "Settings",
    href: "/customer-dashboard/settings",
  },
];

export default function MobileSidebar({
  open,
  setOpen,
}: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[280px] bg-[#0B4E9B] text-white p-6 transition-transform duration-300 ${
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
            className="text-white"
          >
            <X size={28} />
          </button>
        </div>

        {/* Links */}
        <nav className="space-y-3">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-5 py-4 font-semibold transition ${
                  active
                    ? "bg-white text-[#0B4E9B]"
                    : "hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}