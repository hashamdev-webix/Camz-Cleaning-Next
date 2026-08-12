"use client";

import { FormEvent, useState } from "react";
import { Lock, Mail, Phone, ShieldCheck, User, UserCheck, X } from "lucide-react";
import { labelRole } from "@/components/admin/users/userUiHelpers";

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

type CreateUserModalProps = {
  open: boolean;
  onClose: () => void;
  allowedRoles: string[];
  onCreated: (message: string) => void;
};

export default function CreateUserModal({ open, onClose, allowedRoles, onCreated }: CreateUserModalProps) {
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const closeModal = () => {
    setError("");
    onClose();
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
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
    const message = `${labelRole(form.role)} user created successfully.`;
    setForm(emptyForm);
    onCreated(message);
    closeModal();
  };

  if (!open) return null;

  return <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 sm:items-center sm:p-5" onMouseDown={(event) => event.target === event.currentTarget && closeModal()}>
    <div className="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#0B162B] p-5 text-white shadow-2xl sm:rounded-2xl sm:p-7">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Create User</h2><button type="button" onClick={closeModal} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-slate-300"><X size={21} /></button></div>
      {error && <p className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
      <form onSubmit={submit} className="mt-7 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <ModalField label="Full Name" icon={User} value={form.name} onChange={(value) => setForm({ ...form, name: value })} required />
          <ModalField label="Email" icon={Mail} type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required />
          <ModalField label="Phone Number" icon={Phone} value={form.phone_number} onChange={(value) => setForm({ ...form, phone_number: value })} required />
          <ModalField label="Password" icon={Lock} type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} required />
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-300">Role</span><select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="h-14 w-full rounded-xl border border-white/10 bg-[#131E35] px-4 text-sm outline-none">{allowedRoles.map((item) => <option key={item} value={item}>{labelRole(item)}</option>)}</select></label>
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
  </div>;
}

function ModalField({ label, icon: Icon, value, onChange, type = "text", required = false }: { label: string; icon: typeof UserCheck; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-300">{label}</span><div className="relative"><Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} /><input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="h-14 w-full rounded-xl border border-white/10 bg-[#131E35] pl-12 pr-4 text-sm outline-none focus:border-[#4A86F7]" /></div></label>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#131E35] p-3 text-sm font-semibold"><span>{label}</span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5" /></label>;
}
