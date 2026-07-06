import Link from "next/link";
import { notFound } from "next/navigation";
import { Search, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

type Config = { title: string; description: string; table: string; filter?: { column: string; value: string }; preferred: string[] };

const sections: Record<string, Config> = {
  bookings: { title: "Bookings", description: "Review all scheduled and submitted cleaning jobs.", table: "jobs", preferred: ["id", "service_name", "status", "customer_id", "cleaner_id", "date", "address", "total_price"] },
  customers: { title: "Customers", description: "Customer accounts registered across the platform.", table: "users", filter: { column: "role", value: "customer" }, preferred: ["id", "name", "email", "phone_number", "approval_status", "is_blocked", "created_at"] },
  cleaners: { title: "Cleaners", description: "Cleaner accounts, approval, and availability details.", table: "users", filter: { column: "role", value: "cleaner" }, preferred: ["id", "name", "email", "phone_number", "approval_status", "is_blocked", "created_at"] },
  payments: { title: "Payments", description: "Payment transactions and their current status.", table: "payments", preferred: ["id", "job_id", "customer_id", "amount", "currency", "status", "payment_method", "created_at"] },
  reports: { title: "Booking Reports", description: "Operational booking data for reporting and analysis.", table: "jobs", preferred: ["id", "service_name", "status", "billing_type", "total_price", "customer_id", "cleaner_id", "created_at"] },
  services: { title: "Services", description: "Cleaning services available to customers.", table: "services", preferred: ["id", "title", "service_type", "price", "pricing_type", "is_active", "created_at"] },
  users: { title: "All Users", description: "Customers, cleaners, and administrators.", table: "users", preferred: ["id", "name", "email", "phone_number", "role", "approval_status", "is_blocked"] },
  verification: { title: "User Verification", description: "Review account approval and verification status.", table: "users", preferred: ["id", "name", "email", "role", "approval_status", "is_blocked", "created_at"] },
  support: { title: "Support Tickets", description: "Customer issues submitted through the help centre.", table: "help_tickets", preferred: ["id", "subject", "category", "status", "user_id", "description", "created_at"] },
  leave: { title: "Leave Requests", description: "Cleaner leave and availability requests.", table: "leave_requests", preferred: ["id", "cleaner_id", "start_date", "end_date", "reason", "status", "created_at"] },
  invoices: { title: "Manual Invoices", description: "Invoices prepared outside automatic payment flows.", table: "manual_invoices", preferred: ["id", "customer_id", "job_id", "amount", "status", "due_date", "created_at"] },
  gallery: { title: "Gallery", description: "Images displayed in the public project gallery.", table: "gallery", preferred: ["id", "image_url", "title", "created_at"] },
  blogs: { title: "Blog", description: "Published and draft website articles.", table: "blogs", preferred: ["id", "title", "description", "image_url", "created_at"] },
  "before-after": { title: "Before / After", description: "Cleaning transformation image pairs.", table: "before_after_pairs", preferred: ["id", "before_image_url", "after_image_url", "title", "created_at"] },
  settings: { title: "App Settings", description: "Platform-wide application configuration.", table: "app_settings", preferred: ["id", "key", "value", "updated_at"] },
};

function display(value: unknown) {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  const text = String(value);
  return text.length > 90 ? `${text.slice(0, 87)}...` : text;
}

export default async function AdminManagementPage({ params, searchParams }: { params: Promise<{ section: string }>; searchParams: Promise<{ q?: string }> }) {
  const { section } = await params;
  const { q = "" } = await searchParams;
  const config = sections[section];
  if (!config) notFound();

  const supabase = await createClient();
  let query = supabase.from(config.table).select("*").limit(200);
  if (config.filter) query = query.eq(config.filter.column, config.filter.value);
  const { data, error } = await query;
  const records = ((data || []) as Record<string, unknown>[]).filter((record) => !q || Object.values(record).some((value) => display(value).toLowerCase().includes(q.toLowerCase())));
  const available = new Set(records.flatMap((record) => Object.keys(record)));
  const columns = [...config.preferred.filter((column) => available.has(column)), ...Array.from(available).filter((column) => !config.preferred.includes(column))].slice(0, 8);

  return <div className="min-h-screen bg-[#020817] px-4 py-7 text-white sm:px-7 lg:px-10"><div className="mx-auto max-w-[1500px]">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase text-[#4A86F7]">Management</p><h1 className="mt-2 text-3xl font-bold text-white">{config.title}</h1><p className="mt-2 text-slate-400">{config.description}</p></div><form className="flex h-11 w-full max-w-sm items-center gap-2 rounded-md border border-white/10 bg-[#0B162B] px-3"><Search size={17} className="text-slate-500" /><input name="q" defaultValue={q} placeholder="Search records" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500" /></form></div>
    <div className="mt-7 overflow-hidden rounded-lg border border-white/10 bg-[#0B162B]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><p className="font-bold text-white">{records.length} record{records.length === 1 ? "" : "s"}</p><span className="text-xs text-slate-500">Showing up to 200</span></div>
      {error ? <div className="m-5 border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"><p className="font-bold">Unable to read {config.table}.</p><p className="mt-1">Apply the admin dashboard RLS migration, then refresh.</p></div> : !records.length ? <p className="px-5 py-14 text-center text-sm text-slate-500">No visible records in this table.</p> : <><div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-white/5 text-xs uppercase text-slate-500"><tr>{columns.map((column) => <th key={column} className="whitespace-nowrap px-4 py-3">{column.replaceAll("_", " ")}</th>)}</tr></thead><tbody className="divide-y divide-white/5">{records.map((record, index) => <tr key={String(record.id || index)} className="hover:bg-white/[.03]">{columns.map((column) => <td key={column} className="max-w-72 px-4 py-3 text-slate-300"><span className="line-clamp-2 break-words">{display(record[column])}</span></td>)}</tr>)}</tbody></table></div><div className="divide-y divide-white/5 md:hidden">{records.map((record, index) => <div key={String(record.id || index)} className="p-4"><div className="space-y-2">{columns.slice(0, 5).map((column) => <div key={column} className="grid grid-cols-[110px_1fr] gap-3 text-sm"><span className="font-semibold capitalize text-slate-500">{column.replaceAll("_", " ")}</span><span className="min-w-0 break-words text-slate-200">{display(record[column])}</span></div>)}</div>{typeof record.image_url === "string" && <Link href={record.image_url} target="_blank" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#4A86F7]">Open image <ExternalLink size={14} /></Link>}</div>)}</div></>}
    </div>
  </div></div>;
}
