"use client";

import { Menu, Bell, RefreshCw } from "lucide-react";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";

export default function DashboardHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MobileSidebar open={open} setOpen={setOpen} />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#020817] px-4 md:px-8 py-5">
        <div className="flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center gap-4">

            {/* Mobile Menu */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-white"
            >
              <Menu size={30} />
            </button>

            <div>
              <h1 className="hidden md:block text-3xl font-bold text-white">
                Customer Dashboard
              </h1>

              <p className="hidden md:block text-gray-400 mt-1">
                Manage your bookings, favorites, and settings.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* Notification */}
            <button className="text-gray-400 hover:text-white transition">
              <Bell size={24} />
            </button>

            {/* Refresh */}
            <button className="text-gray-400 hover:text-white transition">
              <RefreshCw size={22} />
            </button>

            {/* User */}
            <div className="w-11 h-11 rounded-full bg-[#4A86F7] text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/30">
              C
            </div>
          </div>
        </div>
      </header>
    </>
  );
}