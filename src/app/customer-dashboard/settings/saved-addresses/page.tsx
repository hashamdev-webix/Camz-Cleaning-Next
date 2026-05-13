"use client";

import { useState } from "react";
import {
  Home,
  Briefcase,
  MapPin,
  Navigation,
} from "lucide-react";

const tabs = [
  {
    id: "home",
    label: "Home",
    icon: Home,
  },
  {
    id: "work",
    label: "Work",
    icon: Briefcase,
  },
  {
    id: "other",
    label: "Other",
    icon: MapPin,
  },
];

export default function SavedAddressesPage() {

  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-[#020817] text-white">

      {/* Top Area */}
      <div className="relative h-[170px]">

        {/* Circle */}
        <div className="absolute bottom-[-28px] left-1/2 -translate-x-1/2">

          <div className="flex h-20 w-20 items-center justify-center rounded-full border-[7px] border-white/5 bg-[#071224]">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0B1B34] text-[#4A86F7]">
              <MapPin size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-t-[32px] bg-[#071224] px-4 py-7">

        <div className="mx-auto max-w-2xl">

          {/* Heading */}
          <h1 className="mb-7 text-center  md:text-3xl font-bold">
            Add New Address
          </h1>

          {/* Tabs */}
          <div className="mb-8 grid grid-cols-3 gap-3">

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-[#4A86F7] text-white"
                      : "border border-[#1B2A45] bg-[#0B1B34] text-[#4A86F7]"
                  }`}
                >
                  <Icon size={18} />

                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Form */}
          <div className="space-y-5">

            {/* Address */}
            <div>

              <label className="mb-2 block text-sm font-medium text-gray-300">
                Address Line
              </label>

              <div className="flex items-center gap-3 rounded-2xl bg-[#131E35] px-4 py-3">

                <MapPin size={18} className="text-gray-400" />

                <input
                  type="text"
                  placeholder={`${activeTab} address line`}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500 capitalize"
                />
              </div>
            </div>

            {/* City */}
            <div>

              <label className="mb-2 block text-sm font-medium text-gray-300">
                City
              </label>

              <div className="flex items-center gap-3 rounded-2xl bg-[#131E35] px-4 py-3">

                <Navigation size={18} className="text-gray-400" />

                <input
                  type="text"
                  placeholder="City"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Save Button */}
            <button className="mt-3 w-full rounded-2xl bg-[#4A86F7] px-6 py-3 text-sm font-semibold transition hover:bg-[#2563EB]">

              Save Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}