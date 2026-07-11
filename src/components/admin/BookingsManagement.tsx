"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Eye,
  MapPin,
  Phone,
  Search,
  User,
  UserPlus,
  X,
  XCircle,
} from "lucide-react";

export type BookingRecord = {
  id: string;
  customer_id: string | null;
  cleaner_id: string | null;
  service_name: string | null;
  service_type: string | null;
  date: string | null;
  address: string | null;
  price: string | number | null;
  final_price: string | number | null;
  total_price: string | number | null;
  status: string | null;
  created_at: string;
  payment_method: string | null;
  billing_type: string | null;
  booking_type: string | null;
  customer_name: string;
  customer_phone: string;
  cleaner_name: string;
};

export type CleanerOption = {
  id: string;
  name: string;
  email: string;
  phone_number: string | null;
  approval_status: string | null;
  verified: boolean | null;
  is_online: boolean | null;
  is_available: boolean | null;
  is_working: boolean | null;
  last_available_at: string | null;
  average_rating: string | number | null;
  total_reviews: number | null;
  jobs_completed: number | null;
  address: string;
};

const statusTabs = ["All", "Pending", "Assigned", "Completed", "Cancelled"];

function money(booking: BookingRecord) {
  const value = booking.total_price || booking.final_price || booking.price || 0;
  const numeric = Number(value);
  return `CAD $${Number.isFinite(numeric) ? numeric.toFixed(2) : value}`;
}

function shortOrder(id: string) {
  return id.replaceAll("-", "").slice(-8).toUpperCase();
}

function statusTone(status: string | null) {
  const normalized = (status || "pending").toLowerCase();
  if (["completed", "complete"].includes(normalized)) return "bg-emerald-500/10 text-emerald-400";
  if (["cancelled", "canceled"].includes(normalized)) return "bg-red-500/10 text-red-400";
  if (["assigned", "accepted", "in_progress"].includes(normalized)) return "bg-blue-500/10 text-blue-400";
  return "bg-amber-400/10 text-amber-300";
}

function cleanerStatus(cleaner: CleanerOption) {
  if (cleaner.is_working) return { label: "Working", className: "bg-blue-500/10 text-blue-300" };
  if (cleaner.is_online || cleaner.is_available) return { label: "Online", className: "bg-emerald-500/10 text-emerald-300" };
  return { label: "Offline", className: "bg-white/10 text-slate-300" };
}

export default function BookingsManagement({
  bookings,
  cleaners,
}: {
  bookings: BookingRecord[];
  cleaners: CleanerOption[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [assigning, setAssigning] = useState<BookingRecord | null>(null);
  const [selectedCleaner, setSelectedCleaner] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    return bookings.filter((booking) => {
      const normalizedStatus = (booking.status || "pending").toLowerCase();
      const statusMatch =
        status === "All" ||
        normalizedStatus === status.toLowerCase() ||
        (status === "Cancelled" && normalizedStatus === "canceled");
      const textMatch =
        !query ||
        `${booking.service_name || ""} ${booking.customer_name} ${booking.address || ""} ${booking.id}`
          .toLowerCase()
          .includes(query.toLowerCase());
      return statusMatch && textMatch;
    });
  }, [bookings, query, status]);

  const openAssign = (booking: BookingRecord) => {
    setAssigning(booking);
    setSelectedCleaner(booking.cleaner_id || "");
    setError("");
  };

  const updateBooking = async (bookingId: string, payload: Record<string, string | null>) => {
    setSaving(true);
    setError("");
    const response = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: bookingId, ...payload }),
    });
    const result = await response.json();
    setSaving(false);
    if (!response.ok) {
      setError(result.error || "Unable to update booking.");
      return false;
    }
    router.refresh();
    return true;
  };

  const confirmAssignment = async () => {
    if (!assigning || !selectedCleaner) return;
    const ok = await updateBooking(assigning.id, { cleaner_id: selectedCleaner });
    if (ok) setAssigning(null);
  };

  const cancelBooking = async (booking: BookingRecord) => {
    if (!window.confirm(`Cancel ${booking.service_name || "this booking"}?`)) return;
    await updateBooking(booking.id, { status: "cancelled" });
  };

  return (
    <div className="min-h-screen bg-[#020817] px-4 py-7 text-white sm:px-7 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold text-[#4A86F7]">Management</p>
          <h1 className="mt-2 text-3xl font-bold">All Bookings</h1>
          <p className="mt-2 text-sm text-slate-400">
            Review customer bookings, assign cleaners, and cancel requests when needed.
          </p>
        </div>

        <div className="mt-8 grid gap-3 lg:grid-cols-[1fr_auto]">
          <label className="flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-[#0B162B] px-4">
            <Search size={17} className="text-slate-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search bookings"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-600"
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {statusTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatus(tab)}
                className={`h-12 whitespace-nowrap rounded-xl px-4 text-sm font-bold transition ${
                  status === tab ? "bg-[#4A86F7] text-white" : "border border-white/10 bg-[#0B162B] text-slate-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-2">
          {filtered.map((booking) => {
            const cancelled = ["cancelled", "canceled"].includes((booking.status || "").toLowerCase());
            return (
              <article key={booking.id} className="rounded-2xl border border-white/10 bg-[#0B162B] p-5 shadow-lg shadow-black/10">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-[#4A86F7]">
                    <ClipboardList size={22} />
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase ${statusTone(booking.status)}`}>
                    {booking.status || "Pending"}
                  </span>
                </div>
                <h2 className="mt-5 text-2xl font-bold">{booking.service_name || booking.service_type || "Cleaning Service"}</h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                  <User size={15} /> {booking.customer_name}
                </p>
                <div className="my-5 border-t border-white/15" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">Order ID: {shortOrder(booking.id)}</p>
                    {booking.date && (
                      <p className="mt-2 flex items-center gap-2 text-sm text-slate-300">
                        <CalendarDays size={15} /> {new Date(booking.date).toLocaleString("en-CA", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    )}
                    {booking.address && (
                      <p className="mt-2 flex items-start gap-2 text-sm text-slate-400">
                        <MapPin className="mt-0.5 shrink-0" size={15} /> {booking.address}
                      </p>
                    )}
                    {booking.cleaner_name && (
                      <p className="mt-2 flex items-center gap-2 text-sm text-emerald-300">
                        <CheckCircle2 size={15} /> Assigned to {booking.cleaner_name}
                      </p>
                    )}
                  </div>
                  <p className="shrink-0 text-right text-xl font-bold">{money(booking)}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {booking.customer_phone && (
                    <a href={`tel:${booking.customer_phone}`} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-blue-500/30 px-4 text-sm font-semibold text-blue-400 hover:bg-blue-500/10">
                      <Phone size={16} /> Call Customer
                    </a>
                  )}
                  {!cancelled && (
                    <button
                      type="button"
                      onClick={() => openAssign(booking)}
                      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#4A86F7] px-5 text-sm font-bold text-white hover:bg-blue-600"
                    >
                      <UserPlus size={18} /> {booking.cleaner_id ? "Change Cleaner" : "Assign Cleaner"}
                    </button>
                  )}
                  {!cancelled && (
                    <button
                      type="button"
                      onClick={() => cancelBooking(booking)}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-red-400 hover:bg-red-500/10"
                    >
                      <XCircle size={18} /> Cancel Booking
                    </button>
                  )}
                </div>
              </article>
            );
          })}
          {!filtered.length && (
            <div className="col-span-full rounded-2xl border border-white/10 bg-[#0B162B] px-5 py-16 text-center text-slate-500">
              No bookings match these filters.
            </div>
          )}
        </div>
      </div>

      {assigning && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 sm:items-center sm:p-5"
          onMouseDown={(event) => event.target === event.currentTarget && setAssigning(null)}
        >
          <div className="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#0B162B] p-5 shadow-2xl sm:rounded-2xl sm:p-7">
            <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-slate-600 sm:hidden" />
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Select Cleaner</h2>
              <button type="button" aria-label="Close assign cleaner" onClick={() => setAssigning(null)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-slate-300">
                <X size={21} />
              </button>
            </div>
            {assigning.date && (
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-[#131E35] p-4">
                <CalendarDays className="text-[#4A86F7]" size={21} />
                <div>
                  <p className="text-xs font-semibold text-slate-400">Booking Date & Time</p>
                  <p className="font-bold">{new Date(assigning.date).toLocaleString("en-CA", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                </div>
              </div>
            )}
            {error && <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
            <div className="mt-6 space-y-4">
              {cleaners.map((cleaner) => {
                const state = cleanerStatus(cleaner);
                const selected = selectedCleaner === cleaner.id;
                return (
                  <button
                    key={cleaner.id}
                    type="button"
                    onClick={() => setSelectedCleaner(cleaner.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${selected ? "border-[#4A86F7] bg-blue-500/10" : "border-white/10 bg-[#101A30] hover:border-white/25"}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-950/70 text-lg font-bold text-[#4A86F7]">
                        {cleaner.name.charAt(0).toUpperCase() || "C"}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-bold">{cleaner.name}</p>
                          <span className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase ${state.className}`}>{state.label}</span>
                          {!cleaner.verified && <span className="rounded-md bg-red-500/10 px-2 py-1 text-[10px] font-bold uppercase text-red-300">Not Verified</span>}
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{cleaner.total_reviews ? `${cleaner.average_rating || 0} rating` : "No reviews yet"}</p>
                        <p className="mt-1 truncate text-sm text-slate-400">{cleaner.email}</p>
                        {cleaner.address && <p className="mt-1 truncate text-sm text-slate-400">{cleaner.address}</p>}
                      </div>
                      <span className={`h-6 w-6 rounded-full border-2 ${selected ? "border-[#4A86F7] bg-[#4A86F7]" : "border-white"}`} />
                    </div>
                    <div className="mt-4 border-t border-white/15 pt-4">
                      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                        <span className="text-slate-300">{cleaner.is_online || cleaner.is_available ? `Available since ${cleaner.last_available_at ? new Date(cleaner.last_available_at).toLocaleDateString("en-CA", { month: "short", day: "numeric" }) : "today"}` : "Offline"}</span>
                        <span className="inline-flex items-center gap-2 font-bold text-[#4A86F7]"><Eye size={16} /> View Profile</span>
                      </div>
                    </div>
                  </button>
                );
              })}
              {!cleaners.length && <p className="rounded-xl border border-white/10 bg-[#101A30] p-5 text-center text-sm text-slate-500">No cleaner accounts are visible yet.</p>}
            </div>
            <button
              type="button"
              disabled={!selectedCleaner || saving}
              onClick={confirmAssignment}
              className="mt-6 flex h-14 w-full items-center justify-center rounded-xl bg-[#4A86F7] text-sm font-bold text-white hover:bg-blue-600 disabled:opacity-45"
            >
              {saving ? "Assigning..." : "Confirm Assignment"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
