"use client";

import Link from "next/link";
import {
  User,
  MapPin,
  ChevronRight,
  CalendarCheck2,
  CheckCircle2,
  Headphones,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#020817] text-white pb-10">

      {/* Top Gradient */}
      <div className="relative overflow-hidden rounded-b-[30px] bg-gradient-to-br from-[#4A86F7] to-[#071224] px-4 pt-10 pb-8">

        {/* Blur Circle */}
        <div className="absolute right-[-50px] top-[-50px] h-[160px] w-[160px] rounded-full bg-white/10" />

        {/* Avatar */}
        <div className="relative z-10 flex flex-col items-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-white/20 bg-white text-4xl font-bold text-[#4A86F7] shadow-xl">
            U
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            User
          </h2>

          <p className="mt-1 text-sm text-white/80">
            codeblessme@gmail.com
          </p>
        </div>
      </div>

      <div className="relative z-20 -mt-6 px-4 md:px-6">

        {/* Stats */}
        <div className="mb-7 grid grid-cols-2 gap-3">

          {/* Active */}
          <div className="rounded-[22px] border border-[#4A86F7]/20 bg-[#071224] p-4 text-center">

            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1B34] text-[#4A86F7]">
              <CalendarCheck2 size={22} />
            </div>

            <h3 className="text-3xl font-bold">
              1
            </h3>

            <p className="mt-1 text-xs uppercase tracking-[3px] text-gray-400">
              Active
            </p>
          </div>

          {/* Done */}
          <div className="rounded-[22px] border border-green-500/20 bg-[#071224] p-4 text-center">

            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
              <CheckCircle2 size={22} />
            </div>

            <h3 className="text-3xl font-bold">
              0
            </h3>

            <p className="mt-1 text-xs uppercase tracking-[3px] text-gray-400">
              Done
            </p>
          </div>
        </div>

        {/* ACCOUNT SETTINGS */}
        <div className="mb-8">

          <h4 className="mb-3 text-[11px] uppercase tracking-[4px] text-gray-500">
            Account Settings
          </h4>

          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#071224]">

            {/* Personal */}
            <Link
              href="/customer-dashboard/settings/personal-information"
              className="flex items-center justify-between border-b border-white/10 px-4 py-4 transition hover:bg-white/5"
            >
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1B34] text-[#4A86F7]">
                  <User size={18} />
                </div>

                <span className="text-sm font-medium">
                  Personal Information
                </span>
              </div>

              <ChevronRight size={18} className="text-gray-500" />
            </Link>

            {/* Addresses */}
            <Link
              href="/customer-dashboard/settings/saved-addresses"
              className="flex items-center justify-between border-b border-white/10 px-4 py-4 transition hover:bg-white/5"
            >
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1B34] text-[#4A86F7]">
                  <MapPin size={18} />
                </div>

                <span className="text-sm font-medium">
                  Saved Addresses
                </span>
              </div>

              <ChevronRight size={18} className="text-gray-500" />
            </Link>

            {/* Help */}
            <Link
              href="/customer-dashboard/settings/help-center"
              className="flex items-center justify-between px-4 py-4 transition hover:bg-white/5"
            >
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1B34] text-[#4A86F7]">
                  <Headphones size={18} />
                </div>

                <span className="text-sm font-medium">
                  Help Center
                </span>
              </div>

              <ChevronRight size={18} className="text-gray-500" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}