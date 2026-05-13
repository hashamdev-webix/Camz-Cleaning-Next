"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Clock3,
  MapPin,
  ChevronRight,
  Plus,
} from "lucide-react";

const tabs = [
  "All",
  "Pending",
  "Active",
  "History",
  "Cancel",
];

const bookings = [
  {
    id: "1",
    service: "Vehicle Detailing",
    location: "Calgary, AB",
    status: "Pending",
    date: "MAY",
    day: "13",
    time: "08:51 PM",
    price: "CAD $42.00",
  },

  {
    id: "2",
    service: "Residential Cleaning",
    location: "Calgary, AB",
    status: "Active",
    date: "MAY",
    day: "20",
    time: "11:00 AM",
    price: "CAD $120.00",
  },
];

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredBookings = useMemo(() => {
    if (activeTab === "All") return bookings;

    return bookings.filter(
      (booking) =>
        booking.status.toLowerCase() ===
        activeTab.toLowerCase()
    );
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#020817] text-white px-4 md:px-8 py-6">

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold">
          My Bookings
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 overflow-x-auto pb-4 mb-10 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative whitespace-nowrap text-lg font-semibold transition pb-2 ${
              activeTab === tab
                ? "text-[#4A86F7]"
                : "text-white/60 hover:text-white"
            }`}
          >
            {tab}

            {activeTab === tab && (
              <span className="absolute left-0 bottom-0 h-[3px] w-full rounded-full bg-[#4A86F7]" />
            )}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredBookings.length === 0 ? (
        <div className="rounded-[32px] border border-white/10 bg-[#071224] p-10 text-center">

          <h3 className="text-3xl font-bold mb-4">
            No Bookings Found
          </h3>

          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            You currently have no {activeTab.toLowerCase()} bookings.
          </p>

          <Link
            href="/booking"
            className="inline-flex items-center justify-center rounded-2xl bg-[#4A86F7] px-8 py-4 font-bold hover:bg-[#2563EB] transition"
          >
            Book Now
          </Link>
        </div>
      ) : (

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">

          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-[#071224]"
            >

              {/* Card Body */}
              <div className="p-5 md:p-6">

                <div className="flex gap-4">

                  {/* Date */}
                  <div className="overflow-hidden rounded-2xl bg-[#0B1B34] w-[72px] flex-shrink-0 h-fit">
                    <div className="bg-[#4A86F7] py-2 text-center text-xs font-bold">
                      {booking.date}
                    </div>

                    <div className="py-4 text-center text-3xl font-bold">
                      {booking.day}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">

                    {/* Status */}
                    <span className="inline-flex rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-400 mb-3">
                      {booking.status}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl font-bold leading-tight mb-3">
                      {booking.service}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-5">
                      <MapPin size={16} />

                      <span>{booking.location}</span>
                    </div>

                    {/* Price */}
                    <h4 className="text-3xl md:text-4xl font-bold text-[#4A86F7]">
                      {booking.price}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 px-5 md:px-6 py-4 flex items-center justify-between">

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock3 size={16} />

                  <span>{booking.time}</span>
                </div>

                <Link
                  href={`/customer-dashboard/bookings/${booking.id}`}
                  className="inline-flex items-center gap-2 text-[#4A86F7] font-semibold hover:text-blue-300 transition"
                >
                  View Details

                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Button */}
      <Link
        href="/booking"
        className="fixed bottom-24 md:bottom-8 right-5 md:right-8 z-50 inline-flex items-center gap-3 rounded-2xl bg-[#4A86F7] px-6 py-4 font-bold shadow-xl shadow-blue-500/20 hover:bg-[#2563EB] transition"
      >
        <Plus size={20} />

        <span className="hidden sm:block">
          New Booking
        </span>
      </Link>
    </div>
  );
}