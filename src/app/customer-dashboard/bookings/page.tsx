"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock3, MapPin, ChevronRight, Plus, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const tabs = ["All", "Pending", "Active", "History", "Cancel"];

interface Job {
  id: string;
  customer_id: string;
  cleaner_id: string | null;
  service_name: string;
  service_type: string;
  date: string;
  address: string;
  price: string;
  total_price: number | null;
  status: string;
  billing_type: string;
  created_at: string;
}

// Map UI tab name to DB status values
const tabToStatus: Record<string, string[]> = {
  All: [],
  Pending: ["pending"],
  Active: ["assigned", "in_progress", "accepted"],
  History: ["completed"],
  Cancel: ["cancelled", "canceled"],
};

// Get color class based on status
const getStatusStyle = (status: string): string => {
  const s = status.toLowerCase();
  if (s === "pending") return "bg-yellow-500/20 text-yellow-400";
  if (s === "assigned" || s === "in_progress" || s === "accepted")
    return "bg-blue-500/20 text-blue-400";
  if (s === "completed") return "bg-green-500/20 text-green-400";
  if (s === "cancelled" || s === "canceled")
    return "bg-red-500/20 text-red-400";
  return "bg-gray-500/20 text-gray-400";
};

// Format status text for display
const formatStatus = (status: string): string => {
  return status
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [bookings, setBookings] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/customer-dashboard/bookings");
    }
  }, [authLoading, user, router]);

  // Fetch bookings from Supabase
  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("jobs")
          .select("*")
          .eq("customer_id", user.id)
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;
        setBookings((data as Job[]) || []);
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const filteredBookings = useMemo(() => {
    if (activeTab === "All") return bookings;
    const allowedStatuses = tabToStatus[activeTab] || [];
    return bookings.filter((b) =>
      allowedStatuses.includes(b.status.toLowerCase()),
    );
  }, [activeTab, bookings]);

  // Counts per tab for badges (optional)
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { All: bookings.length };
    for (const tab of tabs.slice(1)) {
      const allowed = tabToStatus[tab] || [];
      counts[tab] = bookings.filter((b) =>
        allowed.includes(b.status.toLowerCase()),
      ).length;
    }
    return counts;
  }, [bookings]);

  // Format date helper: "MAY" / "13"
  const formatDateParts = (dateStr: string) => {
    const d = new Date(dateStr);
    return {
      month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      day: d.getDate().toString(),
      time: d.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  // Get display price
  const getPrice = (job: Job) => {
    if (job.total_price !== null && job.total_price !== undefined) {
      return `CAD $${Number(job.total_price).toFixed(2)}`;
    }
    return job.price || "CAD $0.00";
  };

  // Loading state for auth or initial fetch
  if (authLoading || (loading && bookings.length === 0)) {
    return (
      <div className="min-h-screen bg-[#020817] text-white px-4 md:px-8 py-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#4A86F7] mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white px-4 md:px-8 py-6">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold">My Bookings</h1>
        <p className="text-gray-400 text-sm mt-2">
          {bookings.length} total booking{bookings.length === 1 ? "" : "s"}
        </p>
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
            {tabCounts[tab] > 0 && (
              <span className="ml-2 text-xs bg-white/10 px-2 py-0.5 rounded-full">
                {tabCounts[tab]}
              </span>
            )}
            {activeTab === tab && (
              <span className="absolute left-0 bottom-0 h-[3px] w-full rounded-full bg-[#4A86F7]" />
            )}
          </button>
        ))}
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-[22px] border border-red-500/30 bg-red-500/10 p-6 text-center mb-6">
          <p className="text-red-400 font-bold mb-2">Failed to load bookings</p>
          <p className="text-gray-400 text-sm">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!error && filteredBookings.length === 0 ? (
        <div className="rounded-[32px] border border-white/10 bg-[#071224] p-10 text-center">
          <h3 className="text-3xl font-bold mb-4">No Bookings Found</h3>
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
          {filteredBookings.map((booking) => {
            const { month, day, time } = formatDateParts(booking.date);
            return (
              <div
                key={booking.id}
                className="overflow-hidden rounded-[22px] border border-white/10 bg-[#071224]"
              >
                {/* Card Body */}
                <div className="p-4">
                  <div className="flex gap-3">
                    {/* Date Box */}
                    <div className="overflow-hidden rounded-xl bg-[#0B1B34] w-[60px] flex-shrink-0 h-fit">
                      <div className="bg-[#4A86F7] py-1.5 text-center text-[10px] font-bold">
                        {month}
                      </div>
                      <div className="py-3 text-center text-2xl font-bold">
                        {day}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Status Badge */}
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold mb-2 ${getStatusStyle(
                          booking.status,
                        )}`}
                      >
                        {formatStatus(booking.status)}
                      </span>

                      {/* Service Title */}
                      <h3 className="text-lg md:text-xl font-bold leading-tight mb-2">
                        {booking.service_name}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
                        <MapPin size={14} className="shrink-0" />
                        <span className="truncate">{booking.address}</span>
                      </div>

                      {/* Price */}
                      <h4 className="text-2xl md:text-3xl font-bold text-[#4A86F7]">
                        {getPrice(booking)}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Clock3 size={14} />
                    <span>{time}</span>
                  </div>
                  <Link
                    href={`/customer-dashboard/bookings/${booking.id}`}
                    className="inline-flex items-center gap-1.5 text-[#4A86F7] text-sm font-medium hover:text-blue-300 transition"
                  >
                    View Details
                    <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Button */}
      <Link
        href="/booking"
        className="fixed bottom-24 md:bottom-8 right-5 md:right-8 z-50 inline-flex items-center gap-3 rounded-2xl bg-[#4A86F7] px-6 py-4 font-bold shadow-xl shadow-blue-500/20 hover:bg-[#2563EB] transition"
      >
        <Plus size={20} />
        <span className="hidden sm:block">New Booking</span>
      </Link>
    </div>
  );
}
