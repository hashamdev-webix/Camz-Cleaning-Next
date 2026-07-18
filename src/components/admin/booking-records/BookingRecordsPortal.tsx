"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarClock, Check, Clock3, ClipboardList, DollarSign, Download, MapPin, Plus, Search, Sparkles, UserRound, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export type CleanerUser = { id: string; name: string; email: string };
export type BookingImage = {
  id: string;
  booking_id: string;
  image_type: "before" | "after";
  url: string;
  storage_path: string | null;
  name: string | null;
  width: number | null;
  height: number | null;
  format: string | null;
  uploaded_at: string;
};
export type BookingRecord = {
  id: string;
  full_name: string;
  cleaning_type: string;
  area: string;
  focus_details: string | null;
  service_date: string;
  service_time: string;
  full_address: string;
  price: string | number;
  show_price_to_cleaner: boolean;
  email: string;
  phone: string;
  added_by: string | null;
  added_by_user: string | null;
  scope_of_work: string | null;
  parking_instructions: string | null;
  status: "pending" | "ongoing" | "completed";
  start_date: string | null;
  start_time: string | null;
  end_date: string | null;
  end_time: string | null;
  completion_remarks: string | null;
  completed_by: string | null;
  worked_hours: string | number;
  hours_approved: boolean;
  approved_hours: string | number;
  created_at: string;
  updated_at: string;
  assigned_cleaners: CleanerUser[];
  service_images: BookingImage[];
};

type CurrentUser = { id: string; name: string; role: string } | null;
type FormState = Omit<BookingRecord, "id" | "created_at" | "updated_at" | "assigned_cleaners" | "service_images" | "added_by_user"> & { id?: string; assigned_cleaner_ids: string[] };

const areas = ["NE Calgary", "SE Calgary", "NW Calgary", "SW Calgary", "Downtown", "Other area in Calgary"];
const emptyForm: FormState = {
  full_name: "", cleaning_type: "", area: "", focus_details: "", service_date: "", service_time: "", full_address: "", price: "", show_price_to_cleaner: false,
  email: "", phone: "", added_by: "", scope_of_work: "", parking_instructions: "", status: "pending", start_date: "", start_time: "", end_date: "", end_time: "",
  completion_remarks: "", completed_by: null, worked_hours: 0, hours_approved: false, approved_hours: 0, assigned_cleaner_ids: [],
};

export default function BookingRecordsPortal({ bookings, cleaners, currentUser }: { bookings: BookingRecord[]; cleaners: CleanerUser[]; currentUser: CurrentUser }) {
  const router = useRouter();
  const [records, setRecords] = useState(bookings);
  useEffect(() => {
    setRecords(bookings);
  }, [bookings]);
  const role = currentUser?.role?.toLowerCase() || "admin";
  const isCleaner = role === "cleaner";
  const isDataEntry = role === "data_entry";
  const canCreate = role === "admin" || isDataEntry;
  const canEdit = role === "admin" || isDataEntry;
  const canAssign = role === "admin";
  const canDelete = role === "admin";
  const ownBookings = useMemo(() => {
    if (isCleaner) return records.filter((booking) => booking.assigned_cleaners.some((cleaner) => cleaner.id === currentUser?.id));
    if (isDataEntry) return records.filter((booking) => booking.added_by_user === currentUser?.id);
    return records;
  }, [records, currentUser?.id, isCleaner, isDataEntry]);
  const scopedBookings = records;

  const [query, setQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState("all");
  const [quickFilter, setQuickFilter] = useState("all");
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => toDateInput(new Date()));
  const [formOpen, setFormOpen] = useState(false);
  const [details, setDetails] = useState<BookingRecord | null>(null);
  const [assigning, setAssigning] = useState<BookingRecord | null>(null);
  const [form, setForm] = useState<FormState>({ ...emptyForm, added_by: currentUser?.name || "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const filtered = useMemo(() => scopedBookings.filter((booking) => {
    const today = toDateInput(new Date());
    const textMatch = !query || `${booking.full_name} ${booking.cleaning_type} ${booking.email} ${booking.phone}`.toLowerCase().includes(query.toLowerCase());
    const areaMatch = areaFilter === "all" || booking.area === areaFilter;
    const dateMatch = quickFilter === "all" || (quickFilter === "my" && ownBookings.some((ownBooking) => ownBooking.id === booking.id)) || (quickFilter === "today" && booking.service_date === today) || (quickFilter === "past" && booking.service_date < today) || (quickFilter === "upcoming" && booking.service_date > today);
    return textMatch && areaMatch && dateMatch;
  }), [areaFilter, ownBookings, query, quickFilter, scopedBookings]);

  const stats = useMemo(() => {
    const today = toDateInput(new Date());
    const statsBookings = isCleaner || isDataEntry ? ownBookings : scopedBookings;
    return {
      total: statsBookings.length,
      allTotal: scopedBookings.length,
      pending: statsBookings.filter((booking) => booking.status === "pending").length,
      completed: statsBookings.filter((booking) => booking.status === "completed").length,
      upcoming: statsBookings.filter((booking) => booking.service_date > today).length,
      todayCount: statsBookings.filter((booking) => booking.service_date === today).length,
      todayHours: statsBookings.filter((booking) => booking.service_date === today).reduce((sum, booking) => sum + Number(booking.approved_hours || 0), 0),
      weekHours: statsBookings.reduce((sum, booking) => sum + (isDateInCurrentWeek(booking.service_date) ? Number(booking.approved_hours || 0) : 0), 0),
      monthHours: statsBookings.reduce((sum, booking) => sum + (isDateInCurrentMonth(booking.service_date) ? Number(booking.approved_hours || 0) : 0), 0),
    };
  }, [isCleaner, isDataEntry, ownBookings, scopedBookings]);

  const selectedDayBookings = scopedBookings.filter((booking) => booking.service_date === selectedDate);
  const quickFilters = [["today", "Today"], ["past", "Past"], ["upcoming", "Upcoming"], ["all", "All Bookings"], ...((isCleaner || isDataEntry) ? [["my", "My Bookings"]] : [])];
  const theme = isCleaner
    ? { page: "bg-[radial-gradient(circle_at_top_left,#d1fae5,transparent_32%),#ecfdf5]", hero: "from-emerald-800 via-teal-700 to-cyan-500", active: "bg-emerald-700", accent: "text-emerald-700", button: "bg-teal-700", soft: "bg-emerald-100 text-emerald-800", stat: "text-emerald-700" }
    : isDataEntry
      ? { page: "bg-[radial-gradient(circle_at_top_left,#ffedd5,transparent_32%),#fff7ed]", hero: "from-orange-700 via-orange-600 to-amber-400", active: "bg-orange-600", accent: "text-orange-600", button: "bg-orange-600", soft: "bg-orange-100 text-orange-800", stat: "text-orange-600" }
      : { page: "bg-slate-100", hero: "from-blue-800 via-blue-700 to-cyan-500", active: "bg-blue-700", accent: "text-blue-700", button: "bg-blue-700", soft: "bg-blue-100 text-blue-800", stat: "text-blue-700" };

  const openAdd = () => { setForm({ ...emptyForm, added_by: currentUser?.name || "" }); setError(""); setFormOpen(true); };
  const openEdit = (booking: BookingRecord) => { setForm({ ...booking, assigned_cleaner_ids: booking.assigned_cleaners.map((cleaner) => cleaner.id) }); setError(""); setFormOpen(true); };
  const saveBooking = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    const response = await fetch("/api/admin/booking-records", { method: form.id ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const result = await response.json();
    setSaving(false);
    if (!response.ok) { setError(result.error || "Unable to save booking."); return; }
    if (!form.id && result.booking) {
      const assigned_cleaners = cleaners.filter((cleaner) => form.assigned_cleaner_ids.includes(cleaner.id));
      setRecords((current) => [{ ...result.booking, assigned_cleaners, service_images: [] } as BookingRecord, ...current]);
      setQuickFilter("all");
    } else if (form.id) {
      const assigned_cleaners = cleaners.filter((cleaner) => form.assigned_cleaner_ids.includes(cleaner.id));
      setRecords((current) => current.map((booking) => booking.id === form.id ? { ...booking, ...form, assigned_cleaners } as BookingRecord : booking));
    }
    setFormOpen(false); router.refresh();
  };
  const deleteBooking = async (booking: BookingRecord) => {
    if (!window.confirm(`Delete booking for ${booking.full_name}?`)) return;
    const response = await fetch(`/api/admin/booking-records?id=${booking.id}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) window.alert(result.error || "Unable to delete booking."); else router.refresh();
  };

  return <div className={`min-h-screen ${theme.page} px-4 py-7 text-slate-900 sm:px-7 lg:px-10`}>
    <div className="mx-auto max-w-7xl">
      <section className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-r ${theme.hero} p-6 text-white shadow-2xl shadow-slate-900/15 sm:p-8`}>
        <div className="absolute right-6 top-6 hidden h-28 w-28 rounded-full border border-white/20 bg-white/10 lg:block" />
        <div className="absolute -bottom-16 right-20 hidden h-44 w-44 rounded-full border border-white/10 bg-white/5 lg:block" />
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl"><p className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold tracking-[0.28em]">{isCleaner ? "CLEANER DASHBOARD" : isDataEntry ? "DATA ENTRY DASHBOARD" : "ADMIN DASHBOARD"}</p><h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">{isCleaner ? "My Bookings" : "Booking Records"}</h1><p className="mt-3 text-base font-medium text-white/85 sm:text-lg">{isCleaner ? "Track assigned work, review schedules, update progress, and keep service images organized." : isDataEntry ? `Logged in as ${currentUser?.name || "Data Entry User"}. Add records quickly and keep booking details ready for operations.` : "Full access - manage, assign, approve, and track all bookings."}</p><div className="mt-5 flex flex-wrap gap-2 text-sm font-bold"><span className="rounded-full bg-white/15 px-4 py-2">{stats.allTotal} visible</span><span className="rounded-full bg-white/15 px-4 py-2">{stats.pending} pending</span><span className="rounded-full bg-white/15 px-4 py-2">{stats.upcoming} upcoming</span></div></div>
          {canCreate && <button type="button" onClick={openAdd} className={`flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white px-7 font-bold ${theme.accent} shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl`}><Plus size={18} /> Add Booking</button>}
        </div>
      </section>

      <section className={`mt-8 grid gap-4 ${isCleaner ? "md:grid-cols-4" : "md:grid-cols-4"}`}>
        {isCleaner ? <>
          <Stat label="Today's Hours" value={`${stats.todayHours.toFixed(1)} hrs`} sub="Approved hours worked today" />
          <Stat label="This Week" value={`${stats.weekHours.toFixed(1)} hrs`} sub="Approved hours this week" />
          <Stat label="This Month" value={`${stats.monthHours.toFixed(1)} hrs`} sub="Approved hours this month" />
          <Stat label="Upcoming Jobs" value={stats.upcoming} sub="Bookings assigned to you after today" />
        </> : <>
          <Stat label={isDataEntry ? "Total Added" : "Total Bookings"} value={stats.total} sub={isDataEntry ? `Created by you (${stats.allTotal} total bookings visible)` : undefined} />
          <Stat label="Today" value={stats.todayCount} sub="Bookings scheduled for today" />
          <Stat label="Upcoming" value={stats.upcoming} sub="Bookings scheduled after today" />
          <Stat label="Pending" value={stats.pending} sub={isDataEntry ? "Pending bookings (your records)" : undefined} />
        </>}
      </section>

      <section className="mt-8 rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-xl shadow-slate-900/5 backdrop-blur sm:p-5"><div className="grid gap-4 md:grid-cols-[1fr_220px_auto]"><FilterInput placeholder="Search customer, service, email, phone" value={query} onChange={setQuery} /><select value={areaFilter} onChange={(event) => setAreaFilter(event.target.value)} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-400"><option value="all">All Areas</option>{areas.map((area) => <option key={area}>{area}</option>)}</select><button type="button" onClick={() => { setQuery(""); setAreaFilter("all"); }} className="h-12 rounded-xl border border-slate-200 bg-white px-6 font-bold text-slate-700 transition hover:bg-slate-50">Reset</button></div></section>

      <section className="mt-8 rounded-3xl bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 p-6 lg:flex-row lg:items-center"><div><h2 className="text-2xl font-bold">{quickFilter === "my" ? "My Bookings" : isCleaner ? "All Bookings" : "Bookings"}</h2><p className="text-slate-500">{filtered.length} booking{filtered.length === 1 ? "" : "s"}</p></div><div className="flex flex-wrap gap-2">{quickFilters.map(([value, label]) => <button key={value} type="button" onClick={() => setQuickFilter(value)} className={`h-11 rounded-xl px-4 font-bold ${quickFilter === value ? `${theme.active} text-white` : "border border-slate-200 text-slate-600"}`}>{label}</button>)}</div></div>
        <div className="divide-y divide-slate-100 lg:hidden">{filtered.map((booking) => <article key={booking.id} className="p-5"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="truncate text-lg font-bold text-slate-950">{booking.full_name}</h3><p className="mt-1 line-clamp-2 text-sm text-slate-500">{booking.cleaning_type}</p></div><StatusPill status={booking.status} /></div><div className="mt-4 grid grid-cols-2 gap-3 text-sm"><InfoChip icon={MapPin} label={booking.area} /><InfoChip icon={CalendarClock} label={formatDate(booking.service_date)} /><InfoChip icon={Clock3} label={formatTime(booking.service_time)} /><InfoChip icon={DollarSign} label={isCleaner && !booking.show_price_to_cleaner ? "Hidden" : `$${Number(booking.price).toFixed(2)}`} /></div>{!isCleaner && <p className="mt-4 text-sm text-slate-500">Assigned: <span className="font-semibold text-slate-800">{booking.assigned_cleaners.map((cleaner) => cleaner.name).join(", ") || "Unassigned"}</span></p>}<div className="mt-4 flex flex-wrap gap-2"><Action onClick={() => setDetails(booking)} label="View" className={theme.button} />{canAssign && <Action onClick={() => setAssigning(booking)} label="Assign" className="bg-purple-700" />}{canEdit && <Action onClick={() => openEdit(booking)} label="Edit" className="bg-amber-500" />}{canDelete && <Action onClick={() => deleteBooking(booking)} label="Delete" className="bg-red-600" />}</div></article>)}{!filtered.length && <p className="p-8 text-center text-sm font-semibold text-slate-400">No bookings match these filters.</p>}</div><div className="hidden overflow-x-auto lg:block"><table className="w-full min-w-[900px] text-left"><thead className="bg-slate-950 text-sm text-white"><tr>{["Name", "Cleaning", "Area", "Date", "Time (Calgary)", "Price", "Status", ...(!isCleaner ? ["Added By", "Assigned To"] : []), "Actions"].map((head) => <th key={head} className="px-5 py-4">{head}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{filtered.map((booking) => <tr key={booking.id} className="align-top"><td className="px-5 py-5 font-bold">{booking.full_name}</td><td className="max-w-52 px-5 py-5 text-slate-600">{booking.cleaning_type}</td><td className="px-5 py-5"><span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700">{booking.area}</span></td><td className="px-5 py-5">{formatDate(booking.service_date)}</td><td className="px-5 py-5">{formatTime(booking.service_time)}</td><td className="px-5 py-5">{isCleaner && !booking.show_price_to_cleaner ? <span className="text-slate-400">Hidden</span> : <span className="rounded-full bg-emerald-100 px-3 py-1 font-bold text-emerald-700">${Number(booking.price).toFixed(2)}</span>}</td><td className="px-5 py-5"><StatusPill status={booking.status} /></td>{!isCleaner && <td className="px-5 py-5 text-slate-600">{booking.added_by || "-"}</td>}{!isCleaner && <td className="px-5 py-5"><div className="flex flex-wrap gap-1">{booking.assigned_cleaners.map((cleaner) => <span key={cleaner.id} className="rounded-full bg-purple-100 px-2 py-1 text-xs font-bold text-purple-700">{cleaner.name}</span>)}</div></td>}<td className="px-5 py-5"><div className="flex flex-wrap gap-2"><Action onClick={() => setDetails(booking)} label="View" className={theme.button} />{canAssign && <Action onClick={() => setAssigning(booking)} label="Assign" className="bg-purple-700" />}{canEdit && <Action onClick={() => openEdit(booking)} label="Edit" className="bg-amber-500" />}{canDelete && <Action onClick={() => deleteBooking(booking)} label="Delete" className="bg-red-600" />}</div></td></tr>)}</tbody></table></div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[2fr_1fr]"><BookingCalendar bookings={scopedBookings} month={calendarMonth} setMonth={setCalendarMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate} activeClass={theme.active} /><div className="rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">{formatDate(selectedDate)}</h2><p className="text-slate-500">{selectedDayBookings.length} booking{selectedDayBookings.length === 1 ? "" : "s"}</p><div className="mt-5 space-y-4">{selectedDayBookings.map((booking) => <div key={booking.id} className="rounded-2xl border border-slate-100 p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-bold">{booking.full_name}</p><p className="text-sm text-slate-500">{formatTime(booking.service_time)} - {booking.cleaning_type} - {booking.area}</p></div><StatusPill status={booking.status} /></div><button type="button" onClick={() => setDetails(booking)} className={`mt-3 h-9 w-full rounded-lg ${theme.button} text-sm font-bold text-white`}>View Details</button></div>)}</div></div></section>
    </div>

    {formOpen && canCreate && <BookingFormModal form={form} setForm={setForm} cleaners={cleaners} saving={saving} error={error} onClose={() => setFormOpen(false)} onSubmit={saveBooking} currentUser={currentUser} />}
    {assigning && canAssign && <AssignModal booking={assigning} cleaners={cleaners} onClose={() => setAssigning(null)} onSaved={() => { setAssigning(null); router.refresh(); }} />}
    {details && <DetailsModal booking={details} canDelete={canDelete} canEdit={canEdit} onClose={() => setDetails(null)} onEdit={() => { openEdit(details); setDetails(null); }} onDeleted={() => { setDetails(null); router.refresh(); }} />}
  </div>;
}

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) { return <div className="rounded-[1.4rem] border border-white/70 bg-white/90 p-5 shadow-xl shadow-slate-900/5 backdrop-blur"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label}</p><p className="mt-3 text-3xl font-bold text-slate-950">{value}</p></div><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white"><Sparkles size={18} /></span></div>{sub && <p className="mt-3 text-sm leading-5 text-slate-500">{sub}</p>}</div>; }
function FilterInput({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) { return <label className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-slate-400"><Search size={16} className="text-slate-400" /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400" /></label>; }
function StatusPill({ status }: { status: string }) { const tone = status === "completed" ? "bg-emerald-100 text-emerald-700" : status === "ongoing" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"; return <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${tone}`}>{status}</span>; }
function Action({ label, className, onClick }: { label: string; className: string; onClick: () => void }) { return <button type="button" onClick={onClick} className={`min-h-9 rounded-xl px-4 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 ${className}`}>{label}</button>; }
function InfoChip({ icon: Icon, label }: { icon: typeof CalendarClock; label: string }) { return <span className="flex min-h-10 items-center gap-2 rounded-xl bg-slate-50 px-3 text-xs font-bold text-slate-600"><Icon size={15} className="text-slate-400" />{label}</span>; }

function BookingCalendar({ bookings, month, setMonth, selectedDate, setSelectedDate, activeClass }: { bookings: BookingRecord[]; month: Date; setMonth: (date: Date) => void; selectedDate: string; setSelectedDate: (date: string) => void; activeClass: string }) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: Array<Date | null> = [...Array.from({ length: first.getDay() }, () => null), ...Array.from({ length: days }, (_, index) => new Date(month.getFullYear(), month.getMonth(), index + 1))];
  const counts = bookings.reduce<Record<string, number>>((acc, booking) => { acc[booking.service_date] = (acc[booking.service_date] || 0) + 1; return acc; }, {});
  return <div className="rounded-3xl bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold">Bookings Calendar</h2><p className="text-slate-500">{month.toLocaleDateString("en-CA", { month: "long", year: "numeric" })}</p></div><div className="flex gap-2"><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="h-10 rounded-xl border px-4 font-bold">Prev</button><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="h-10 rounded-xl border px-4 font-bold">Next</button></div></div><div className="mt-6 grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <p key={day}>{day}</p>)}</div><div className="mt-4 grid grid-cols-7 gap-1 sm:gap-2">{cells.map((date, index) => { const key = date ? toDateInput(date) : ""; const active = key === selectedDate; const count = counts[key] || 0; return <button key={date?.toISOString() || `blank-${index}`} disabled={!date} onClick={() => date && setSelectedDate(key)} className={`min-h-16 rounded-xl font-bold ${active ? `${activeClass} text-white` : count ? "bg-emerald-50 text-slate-700" : "text-slate-500"}`}>{date && <><span>{date.getDate()}</span>{count > 0 && <span className="mt-1 block text-xs text-blue-500">•<br />{count}</span>}</>}</button>; })}</div></div>;
}

function BookingFormModal({ form, setForm, cleaners, saving, error, onClose, onSubmit, currentUser }: { form: FormState; setForm: (form: FormState) => void; cleaners: CleanerUser[]; saving: boolean; error: string; onClose: () => void; onSubmit: (event: FormEvent) => void; currentUser: CurrentUser }) {
  const update = (key: keyof FormState, value: string | boolean | string[] | number | null) => setForm({ ...form, [key]: value });
  return <Modal title={form.id ? "Edit Booking" : "Add Booking"} subtitle={form.id ? form.full_name : "Create a clean, complete booking record"} onClose={onClose} wide><form onSubmit={onSubmit} className="space-y-6">{error && <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}<FormSection title="Customer Details" icon={UserRound}><div className="grid gap-4 md:grid-cols-3"><Field label="Full Name" value={form.full_name} onChange={(v) => update("full_name", v)} required /><Field label="Email Address" value={form.email} onChange={(v) => update("email", v)} type="email" required /><Field label="Phone Number" value={form.phone} onChange={(v) => update("phone", v)} required /></div><Field label="Full Address" value={form.full_address} onChange={(v) => update("full_address", v)} required /></FormSection><FormSection title="Booking Details" icon={CalendarClock}><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"><Field label="Cleaning Type" value={form.cleaning_type} onChange={(v) => update("cleaning_type", v)} required /><label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Calgary Area</span><select required value={form.area} onChange={(e) => update("area", e.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"><option value="">Select Calgary Area</option>{areas.map((area) => <option key={area}>{area}</option>)}</select></label><Field label="Service Date" value={form.service_date} onChange={(v) => update("service_date", v)} type="date" required /><Field label="Service Time" value={form.service_time} onChange={(v) => update("service_time", v)} type="time" required /><Field label="Price (CAD)" value={String(form.price)} onChange={(v) => update("price", v)} type="number" required /><Field label="Added By" value={form.added_by || currentUser?.name || ""} onChange={(v) => update("added_by", v)} /></div></FormSection><FormSection title="Instructions" icon={ClipboardList}><div className="grid gap-4 lg:grid-cols-3"><TextArea label="Scope Of Work" value={form.scope_of_work || ""} onChange={(v) => update("scope_of_work", v)} /><TextArea label="Focus Details" value={form.focus_details || ""} onChange={(v) => update("focus_details", v)} /><TextArea label="Parking Instructions" value={form.parking_instructions || ""} onChange={(v) => update("parking_instructions", v)} /></div></FormSection><FormSection title="Assignment & Visibility" icon={UserRound}><label className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"><span><b className="text-slate-900">Show price to cleaner</b><span className="block text-sm text-slate-500">Turn on when cleaner should see booking price.</span></span><span className={`relative h-8 w-14 rounded-full transition ${form.show_price_to_cleaner ? "bg-blue-700" : "bg-slate-300"}`}><input type="checkbox" checked={form.show_price_to_cleaner} onChange={(e) => update("show_price_to_cleaner", e.target.checked)} className="peer sr-only" /><span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${form.show_price_to_cleaner ? "left-7" : "left-1"}`} /></span></label><CleanerPicker cleaners={cleaners} selected={form.assigned_cleaner_ids} onChange={(ids) => update("assigned_cleaner_ids", ids)} /></FormSection><div className="sticky bottom-0 -mx-6 -mb-6 flex flex-col gap-3 border-t border-slate-100 bg-white/95 p-5 backdrop-blur sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="h-12 rounded-2xl border border-slate-200 px-7 font-bold text-slate-700 transition hover:bg-slate-50">Cancel</button><button disabled={saving} className="h-12 rounded-2xl bg-blue-700 px-9 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:opacity-60">{saving ? "Saving..." : "Save Booking"}</button></div></form></Modal>;
}

function AssignModal({ booking, cleaners, onClose, onSaved }: { booking: BookingRecord; cleaners: CleanerUser[]; onClose: () => void; onSaved: () => void }) { const [selected, setSelected] = useState(booking.assigned_cleaners.map((cleaner) => cleaner.id)); const [saving, setSaving] = useState(false); const save = async () => { setSaving(true); await fetch("/api/admin/booking-records", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: booking.id, assigned_cleaner_ids: selected }) }); setSaving(false); onSaved(); }; return <Modal title="Assign Cleaner" subtitle={booking.full_name} onClose={onClose}><CleanerPicker cleaners={cleaners} selected={selected} onChange={setSelected} /><div className="mt-6 flex gap-3"><button onClick={save} disabled={saving} className="h-12 flex-1 rounded-xl bg-purple-700 font-bold text-white">{saving ? "Saving..." : "Confirm"}</button><button onClick={onClose} className="h-12 rounded-xl border px-8 font-bold">Cancel</button></div></Modal>; }

function DetailsModal({ booking, canDelete, canEdit, onClose, onEdit, onDeleted }: { booking: BookingRecord; canDelete: boolean; canEdit: boolean; onClose: () => void; onEdit: () => void; onDeleted: () => void }) {
  const router = useRouter();
  const [status, setStatus] = useState(booking.status);
  const [uploading, setUploading] = useState(false);
  const beforeInput = useRef<HTMLInputElement>(null);
  const afterInput = useRef<HTMLInputElement>(null);
  const before = booking.service_images.filter((image) => image.image_type === "before");
  const after = booking.service_images.filter((image) => image.image_type === "after");
  const assignedNames = booking.assigned_cleaners.map((cleaner) => cleaner.name).join(", ") || "Unassigned";

  const uploadImage = async (file: File, type: "before" | "after") => {
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop() || "jpg";
    const path = `booking_records/${booking.id}/${type}_${Date.now()}_${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("job-images").upload(path, file, { contentType: file.type, upsert: false });
    if (!error) {
      const url = supabase.storage.from("job-images").getPublicUrl(path).data.publicUrl;
      await fetch("/api/admin/booking-records", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: { booking_id: booking.id, image_type: type, url, storage_path: path, name: file.name, format: ext } }) });
      router.refresh();
    } else window.alert(error.message);
    setUploading(false);
  };
  const saveStatus = async () => {
    await fetch("/api/admin/booking-records", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: booking.id, status }) });
    router.refresh();
  };

  return <Modal title="Booking Details" subtitle={booking.full_name} onClose={onClose} wide><div className="space-y-5">
    <section className="grid gap-3 md:grid-cols-3">
      <Detail label="Customer" value={booking.full_name} />
      <Detail label="Email" value={booking.email} />
      <Detail label="Phone" value={booking.phone} />
      <Detail label="Cleaning Type" value={booking.cleaning_type} />
      <Detail label="Area" value={booking.area} />
      <Detail label="Status" value={booking.status} />
      <Detail label="Service Date" value={formatDate(booking.service_date)} />
      <Detail label="Service Time (Calgary)" value={formatTime(booking.service_time)} />
      <Detail label="Price" value={`$${Number(booking.price || 0).toFixed(2)}`} />
      <Detail label="Show Price To Cleaner" value={booking.show_price_to_cleaner ? "Yes" : "No"} />
      <Detail label="Added By" value={booking.added_by || "Portal User"} />
      <Detail label="Assigned To" value={assignedNames} />
      <Detail label="Worked Hours" value={String(booking.worked_hours || 0)} />
      <Detail label="Approved Hours" value={String(booking.approved_hours || 0)} />
      <Detail label="Hours Approved" value={booking.hours_approved ? "Yes" : "No"} />
      <Detail label="Created" value={formatDateTime(booking.created_at)} />
      <Detail label="Updated" value={formatDateTime(booking.updated_at)} />
      <Detail label="Completed By" value={booking.completed_by || "-"} />
    </section>
    <Detail label="Full Address" value={booking.full_address} />
    <div className="grid gap-4 md:grid-cols-2">
      <Detail label="Start Date" value={booking.start_date ? formatDate(booking.start_date) : "-"} />
      <Detail label="Start Time (Calgary)" value={booking.start_time ? formatTime(booking.start_time) : "-"} />
      <Detail label="End Date" value={booking.end_date ? formatDate(booking.end_date) : "-"} />
      <Detail label="End Time (Calgary)" value={booking.end_time ? formatTime(booking.end_time) : "-"} />
    </div>
    <Detail label="Scope Of Work" value={booking.scope_of_work} />
    <Detail label="Parking Instructions" value={booking.parking_instructions} />
    <Detail label="Focus Details" value={booking.focus_details} />
    <Detail label="Completion Remarks" value={booking.completion_remarks} />
    <section className="rounded-2xl border p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-bold">Service Images</h3><p className="text-sm text-slate-500">Upload before and after images for this booking.</p></div><div className="flex flex-wrap gap-2"><button onClick={() => beforeInput.current?.click()} className="h-10 rounded-xl bg-blue-700 px-4 text-sm font-bold text-white">+ Before Image</button><button onClick={() => afterInput.current?.click()} className="h-10 rounded-xl bg-cyan-600 px-4 text-sm font-bold text-white">+ After Image</button></div></div><input ref={beforeInput} type="file" multiple accept="image/*" onChange={(e) => Array.from(e.target.files || []).forEach((file) => uploadImage(file, "before"))} className="hidden" /><input ref={afterInput} type="file" multiple accept="image/*" onChange={(e) => Array.from(e.target.files || []).forEach((file) => uploadImage(file, "after"))} className="hidden" />{uploading && <p className="mt-3 text-sm text-blue-700">Uploading...</p>}<div className="mt-4 grid gap-4 md:grid-cols-2"><ImageGroup title="Before" images={before} /><ImageGroup title="After" images={after} /></div></section>
    <section className="rounded-2xl border p-4"><h3 className="font-bold">Change Status</h3><div className="mt-3 flex flex-wrap gap-2">{["pending", "ongoing", "completed"].map((item) => <button key={item} onClick={() => setStatus(item as BookingRecord["status"])} className={`h-10 rounded-xl px-4 text-sm font-bold capitalize ${status === item ? "bg-blue-700 text-white" : "border"}`}>{item}</button>)}</div><button onClick={saveStatus} className="mt-3 h-11 rounded-xl bg-blue-700 px-6 font-bold text-white">Save Status</button></section>
    <div className="grid gap-3 sm:grid-cols-3">{canEdit && <button onClick={onEdit} className="h-12 rounded-xl bg-amber-500 font-bold text-white">Edit</button>}{canDelete && <button onClick={async () => { if (window.confirm("Delete this booking?")) { await fetch(`/api/admin/booking-records?id=${booking.id}`, { method: "DELETE" }); onDeleted(); } }} className="h-12 rounded-xl bg-red-600 font-bold text-white">Delete</button>}<button onClick={onClose} className="h-12 rounded-xl border font-bold">Close</button></div>
  </div></Modal>;
}

function Modal({ title, subtitle, wide, children, onClose }: { title: string; subtitle?: string; wide?: boolean; children: React.ReactNode; onClose: () => void }) { return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-sm sm:p-4"><div className={`max-h-[94vh] overflow-y-auto rounded-[1.75rem] bg-white shadow-2xl ${wide ? "w-full max-w-5xl" : "w-full max-w-xl"}`}><div className="sticky top-0 z-10 flex items-center justify-between bg-gradient-to-r from-blue-800 via-blue-700 to-cyan-500 p-6 text-white"><div><p className="text-xs font-bold uppercase tracking-[0.25em]">{title}</p>{subtitle && <h2 className="mt-1 text-2xl font-bold">{subtitle}</h2>}</div><button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/30"><X size={20} /></button></div><div className="p-6">{children}</div></div></div>; }
function FormSection({ title, icon: Icon, children }: { title: string; icon: typeof UserRound; children: React.ReactNode }) { return <section className="rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><div className="mb-4 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><Icon size={18} /></span><h3 className="text-lg font-bold text-slate-950">{title}</h3></div><div className="space-y-4">{children}</div></section>; }
function Field({ label, value, onChange, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) { return <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">{label}</span><input required={required} value={value} type={type} onChange={(e) => onChange(e.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label>; }
function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">{label}</span><textarea value={value} onChange={(e) => onChange(e.target.value)} rows={5} className="min-h-32 w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label>; }
function CleanerPicker({ cleaners, selected, onChange }: { cleaners: CleanerUser[]; selected: string[]; onChange: (ids: string[]) => void }) { return <div><p className="mb-3 font-bold">Select Cleaners <span className="text-sm font-normal text-slate-400">(one or more)</span></p><div className="flex flex-wrap gap-2">{cleaners.map((cleaner) => { const active = selected.includes(cleaner.id); return <button type="button" key={cleaner.id} onClick={() => onChange(active ? selected.filter((id) => id !== cleaner.id) : [...selected, cleaner.id])} className={`h-11 rounded-2xl px-4 font-bold ${active ? "bg-purple-700 text-white" : "border border-slate-200 text-slate-600"}`}>{active && <Check className="mr-1 inline" size={16} />}{cleaner.name}</button>; })}</div>{!!selected.length && <button type="button" onClick={() => onChange([])} className="mt-3 text-sm font-bold text-red-500">Clear all</button>}</div>; }
function Detail({ label, value }: { label: string; value: string | null }) { return <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase text-slate-400">{label}</p><p className="mt-2 font-semibold text-slate-800">{value || "-"}</p></div>; }
function ImageGroup({ title, images }: { title: string; images: BookingImage[] }) { return <div><h4 className="font-bold">{title}</h4><div className="mt-3 grid grid-cols-2 gap-3">{images.map((image) => <a key={image.id} href={image.url} download target="_blank" className="block"><span className="relative block aspect-square overflow-hidden rounded-xl border bg-slate-50"><img src={image.url} alt={image.name || title} className="h-full w-full object-contain" /></span><span className="mt-1 flex items-center gap-1 text-xs font-bold text-blue-700"><Download size={13} /> Download</span></a>)}{!images.length && <p className="col-span-2 rounded-xl border border-dashed p-8 text-center text-sm text-slate-400">No {title.toLowerCase()} images.</p>}</div></div>; }
function formatDate(date: string) { return new Date(`${date}T00:00:00`).toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric", year: "numeric" }); }
function formatTime(time: string) {
  const [hourValue = "0", minuteValue = "0"] = time.split(":");
  const hour24 = Number(hourValue);
  const minute = Number(minuteValue);
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}
function formatDateTime(value: string) { return new Date(value).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Edmonton" }); }
function toDateInput(date: Date) { return date.toISOString().slice(0, 10); }
function isDateInCurrentWeek(value: string) { const date = new Date(`${value}T00:00:00`); const now = new Date(); const start = new Date(now); start.setDate(now.getDate() - now.getDay()); start.setHours(0, 0, 0, 0); const end = new Date(start); end.setDate(start.getDate() + 7); return date >= start && date < end; }
function isDateInCurrentMonth(value: string) { const date = new Date(`${value}T00:00:00`); const now = new Date(); return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear(); }
