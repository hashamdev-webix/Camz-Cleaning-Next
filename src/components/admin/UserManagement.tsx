"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Lock, Mail, Phone, Plus, Search, ShieldCheck, User, UserCheck, X } from "lucide-react";

export type AdminUserRecord = {
  id: string;
  name: string;
  email: string;
  phone_number: string | null;
  role: string;
  approval_status: string | null;
  source: string | null;
  is_blocked: boolean | null;
  verified: boolean | null;
  is_online: boolean | null;
  is_available: boolean | null;
  is_working: boolean | null;
  created_at: string;
};

type UserForm = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  role: string;
  source: string;
  approval_status: string;
  is_available: boolean;
  offering_fixed: boolean;
  offering_hourly: boolean;
  hourly_rate: string;
};

const roles = ["cleaner", "data_entry", "customer", "admin"];
const emptyForm: UserForm = {
  name: "",
  email: "",
  password: "",
  phone_number: "",
  role: "cleaner",
  source: "Web",
  approval_status: "approved",
  is_available: false,
  offering_fixed: true,
  offering_hourly: false,
  hourly_rate: "0",
};

export default function UserManagement({ users }: { users: AdminUserRecord[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const filtered = useMemo(() => users.filter((user) => {
    const text = `${user.name} ${user.email} ${user.phone_number || ""}`.toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (role === "all" || user.role === role);
  }), [users, query, role]);

  const counts = roles.map((item) => ({ role: item, total: users.filter((user) => user.role === item).length }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    setSaving(false);
    if (!response.ok) {
      setError(result.error || "Unable to create user.");
      return;
    }
    setModalOpen(false);
    setForm(emptyForm);
    setSuccess(`${labelRole(form.role)} user created successfully.`);
    router.refresh();
  };

  const toggleBlocked = async (user: AdminUserRecord) => {
    const response = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id, is_blocked: !user.is_blocked }),
    });
    const result = await response.json();
    if (!response.ok) window.alert(result.error || "Unable to update user.");
    else router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#020817] px-4 py-7 text-white sm:px-7 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-[#4A86F7]">Management</p>
            <h1 className="mt-2 text-3xl font-bold">User Management</h1>
            <p className="mt-2 text-sm text-slate-400">Create portal users and review important account details without exposing internal IDs.</p>
          </div>
          <button onClick={() => { setError(""); setSuccess(""); setModalOpen(true); }} className="flex min-h-12 w-fit items-center gap-2 rounded-xl bg-[#4A86F7] px-5 text-sm font-bold hover:bg-blue-600">
            <Plus size={19} /> Create User
          </button>
        </div>

        {success && <p className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm font-semibold text-emerald-300">{success}</p>}

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {counts.map((item) => <div key={item.role} className="rounded-2xl border border-white/10 bg-[#0B162B] p-5"><p className="text-xs font-bold uppercase text-slate-500">{labelRole(item.role)}</p><p className="mt-2 text-3xl font-bold">{item.total}</p></div>)}
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-[1fr_220px]">
          <label className="flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-[#0B162B] px-4">
            <Search size={17} className="text-slate-500" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search users" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-600" />
          </label>
          <select value={role} onChange={(event) => setRole(event.target.value)} className="h-12 rounded-xl border border-white/10 bg-[#0B162B] px-4 text-sm outline-none">
            <option value="all">All roles</option>
            {roles.map((item) => <option key={item} value={item}>{labelRole(item)}</option>)}
          </select>
        </div>

        <div className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-[#0B162B]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <p className="font-bold">{filtered.length} visible user{filtered.length === 1 ? "" : "s"}</p>
            <span className="text-xs text-slate-500">No internal IDs shown</span>
          </div>
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase text-slate-500">
                <tr>{["User", "Contact", "Role", "Approval", "Source", "Activity", "Joined", "Actions"].map((head) => <th key={head} className="px-4 py-3">{head}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((user) => <tr key={user.id} className="hover:bg-white/[.03]">
                  <td className="px-4 py-4"><p className="font-bold text-white">{user.name}</p><p className="mt-1 text-xs text-slate-500">{user.verified ? "Verified" : "Not verified"}</p></td>
                  <td className="px-4 py-4 text-slate-300"><a href={`mailto:${user.email}`} className="block hover:text-blue-400">{user.email}</a><a href={`tel:${user.phone_number || ""}`} className="mt-1 block text-xs text-slate-500 hover:text-blue-400">{user.phone_number || "-"}</a></td>
                  <td className="px-4 py-4"><RoleBadge role={user.role} /></td>
                  <td className="px-4 py-4"><StatusBadge blocked={user.is_blocked} status={user.approval_status} /></td>
                  <td className="px-4 py-4 text-slate-300">{user.source || "-"}</td>
                  <td className="px-4 py-4 text-slate-300">{activityText(user)}</td>
                  <td className="px-4 py-4 text-slate-300">{formatDate(user.created_at)}</td>
                  <td className="px-4 py-4"><button onClick={() => toggleBlocked(user)} className={`rounded-lg px-3 py-2 text-xs font-bold ${user.is_blocked ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>{user.is_blocked ? "Unblock" : "Block"}</button></td>
                </tr>)}
              </tbody>
            </table>
          </div>
          <div className="divide-y divide-white/5 lg:hidden">
            {filtered.map((user) => <article key={user.id} className="p-4">
              <div className="flex items-start justify-between gap-3"><div><h2 className="font-bold">{user.name}</h2><p className="mt-1 text-sm text-slate-400">{user.email}</p><p className="mt-1 text-sm text-slate-500">{user.phone_number || "-"}</p></div><RoleBadge role={user.role} /></div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300"><p><span className="block text-xs text-slate-500">Status</span>{user.is_blocked ? "Blocked" : user.approval_status || "approved"}</p><p><span className="block text-xs text-slate-500">Joined</span>{formatDate(user.created_at)}</p><p><span className="block text-xs text-slate-500">Source</span>{user.source || "-"}</p><p><span className="block text-xs text-slate-500">Activity</span>{activityText(user)}</p></div>
              <button onClick={() => toggleBlocked(user)} className={`mt-4 rounded-lg px-3 py-2 text-xs font-bold ${user.is_blocked ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>{user.is_blocked ? "Unblock" : "Block"}</button>
            </article>)}
          </div>
          {!filtered.length && <p className="px-5 py-14 text-center text-sm text-slate-500">No users match these filters.</p>}
        </div>
      </div>

      {modalOpen && <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 sm:items-center sm:p-5" onMouseDown={(event) => event.target === event.currentTarget && setModalOpen(false)}>
        <div className="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#0B162B] p-5 shadow-2xl sm:rounded-2xl sm:p-7">
          <div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Create User</h2><button onClick={() => setModalOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-slate-300"><X size={21} /></button></div>
          {error && <p className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
          <form onSubmit={submit} className="mt-7 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <ModalField label="Full Name" icon={User} value={form.name} onChange={(value) => setForm({ ...form, name: value })} required />
              <ModalField label="Email" icon={Mail} type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required />
              <ModalField label="Phone Number" icon={Phone} value={form.phone_number} onChange={(value) => setForm({ ...form, phone_number: value })} required />
              <ModalField label="Password" icon={Lock} type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} required />
              <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-300">Role</span><select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="h-14 w-full rounded-xl border border-white/10 bg-[#131E35] px-4 text-sm outline-none">{roles.map((item) => <option key={item} value={item}>{labelRole(item)}</option>)}</select></label>
              <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-300">Approval Status</span><select value={form.approval_status} onChange={(event) => setForm({ ...form, approval_status: event.target.value })} className="h-14 w-full rounded-xl border border-white/10 bg-[#131E35] px-4 text-sm outline-none"><option value="approved">Approved</option><option value="pending">Pending</option><option value="rejected">Rejected</option></select></label>
            </div>
            {form.role === "cleaner" && <div className="rounded-2xl border border-white/10 bg-[#101A30] p-4">
              <h3 className="font-bold">Cleaner Settings</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <Toggle label="Available" checked={form.is_available} onChange={(value) => setForm({ ...form, is_available: value })} />
                <Toggle label="Fixed Jobs" checked={form.offering_fixed} onChange={(value) => setForm({ ...form, offering_fixed: value })} />
                <Toggle label="Hourly Jobs" checked={form.offering_hourly} onChange={(value) => setForm({ ...form, offering_hourly: value })} />
              </div>
              <div className="mt-4"><ModalField label="Hourly Rate" icon={ShieldCheck} type="number" value={form.hourly_rate} onChange={(value) => setForm({ ...form, hourly_rate: value })} /></div>
            </div>}
            <button disabled={saving} className="flex h-14 w-full items-center justify-center rounded-xl bg-[#4A86F7] text-sm font-bold uppercase text-white hover:bg-blue-600 disabled:opacity-50">{saving ? "Creating..." : "Create User"}</button>
          </form>
        </div>
      </div>}
    </div>
  );
}

function labelRole(role: string) {
  return role === "data_entry" ? "Data Entry" : role.charAt(0).toUpperCase() + role.slice(1);
}

function RoleBadge({ role }: { role: string }) {
  const tone = role === "admin" ? "bg-purple-500/10 text-purple-300" : role === "cleaner" ? "bg-emerald-500/10 text-emerald-300" : role === "data_entry" ? "bg-cyan-500/10 text-cyan-300" : "bg-blue-500/10 text-blue-300";
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${tone}`}>{labelRole(role)}</span>;
}

function StatusBadge({ blocked, status }: { blocked: boolean | null; status: string | null }) {
  if (blocked) return <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400">Blocked</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold capitalize text-emerald-400"><CheckCircle2 size={13} /> {status || "approved"}</span>;
}

function activityText(user: AdminUserRecord) {
  if (user.role !== "cleaner") return user.is_online ? "Online" : "Offline";
  if (user.is_working) return "Working";
  if (user.is_available) return "Available";
  return user.is_online ? "Online" : "Offline";
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" });
}

function ModalField({ label, icon: Icon, value, onChange, type = "text", required = false }: { label: string; icon: typeof UserCheck; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-300">{label}</span><div className="relative"><Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} /><input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="h-14 w-full rounded-xl border border-white/10 bg-[#131E35] pl-12 pr-4 text-sm outline-none focus:border-[#4A86F7]" /></div></label>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#131E35] p-3 text-sm font-semibold"><span>{label}</span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5" /></label>;
}
