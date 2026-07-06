"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronRight,
  FileText,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";

export type CustomerRecord = {
  id: string;
  name: string;
  email: string;
  phone_number: string | null;
  source: string | null;
  created_at: string;
  is_blocked: boolean;
  address: string;
};

type FormState = {
  id?: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  source: string;
};
const emptyForm: FormState = {
  name: "",
  email: "",
  phone_number: "",
  address: "",
  source: "Manual",
};
const sources = ["Manual", "Google", "Facebook", "Referral", "Other"];
const fieldClass =
  "h-14 w-full rounded-xl border border-white/10 bg-[#131E35] pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-[#4A86F7]";

export default function CustomerManagement({
  customers,
}: {
  customers: CustomerRecord[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("All");
  const [date, setDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const filtered = useMemo(
    () =>
      customers.filter((customer) => {
        const textMatch =
          !query ||
          `${customer.name} ${customer.email} ${customer.phone_number || ""}`
            .toLowerCase()
            .includes(query.toLowerCase());
        const sourceMatch =
          source === "All" ||
          (customer.source || "Unknown").toLowerCase() === source.toLowerCase();
        const dateMatch = !date || customer.created_at.slice(0, 10) === date;
        return textMatch && sourceMatch && dateMatch;
      }),
    [customers, query, source, date],
  );

  const openAdd = () => {
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  };
  const openEdit = (customer: CustomerRecord) => {
    setForm({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone_number: customer.phone_number || "",
      address: customer.address,
      source: customer.source || "Manual",
    });
    setError("");
    setModalOpen(true);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    const response = await fetch("/api/admin/customers", {
      method: form.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    if (!response.ok && response.status !== 207) {
      setError(result.error || "Unable to save customer.");
      setSaving(false);
      return;
    }
    setModalOpen(false);
    setSaving(false);
    router.refresh();
  };

  const remove = async (customer: CustomerRecord) => {
    if (
      !window.confirm(
        `Delete ${customer.name}? This also removes their login account.`,
      )
    )
      return;
    const response = await fetch(`/api/admin/customers?id=${customer.id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      window.alert(result.error || "Unable to delete customer.");
      return;
    }
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#020817] px-4 py-7 text-white sm:px-7 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold text-[#4A86F7]">Management</p>
            <h1 className="mt-2 text-3xl font-bold">Customer Management</h1>
            <p className="mt-2 text-sm text-slate-400">
              View customer accounts, create manual customers, and prepare
              invoices.
            </p>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="flex min-h-12 w-fit items-center gap-2 rounded-xl bg-[#4A86F7] px-5 text-sm font-bold hover:bg-blue-600"
          >
            <Plus size={19} /> Add Customer
          </button>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-[1fr_190px_180px_auto]">
          <label className="flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-[#0B162B] px-4">
            <Search size={17} className="text-slate-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search customers"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-600"
            />
          </label>
          <select
            value={source}
            onChange={(event) => setSource(event.target.value)}
            className="h-12 rounded-xl border border-white/10 bg-[#0B162B] px-4 text-sm outline-none"
          >
            <option>All</option>
            {sources.map((item) => (
              <option key={item}>{item}</option>
            ))}
            <option>App</option>
            <option>Web</option>
          </select>
          <label className="flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-[#0B162B] px-4">
            <CalendarDays size={17} className="text-slate-500" />
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none [color-scheme:dark]"
            />
          </label>
          <button
            type="button"
            aria-label="Reset filters"
            onClick={() => {
              setQuery("");
              setSource("All");
              setDate("");
            }}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#0B162B] text-slate-400 hover:text-white"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        <p className="mt-7 text-lg text-slate-300">
          Total Customers:{" "}
          <span className="font-bold text-white">{filtered.length}</span>
        </p>
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {filtered.map((customer) => (
            <article
              key={customer.id}
              className="rounded-2xl border border-white/10 bg-[#0B162B] p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-950/70 text-lg font-bold text-[#4A86F7]">
                  {customer.name?.charAt(0).toUpperCase() || "C"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate text-lg font-bold">
                      {customer.name}
                    </h2>
                    <span className="rounded-md border border-blue-500/25 bg-blue-500/10 px-2 py-1 text-[10px] font-bold uppercase text-blue-400">
                      {customer.source || "Unknown"}
                    </span>
                    {customer.is_blocked && (
                      <span className="rounded-md bg-red-500/10 px-2 py-1 text-[10px] font-bold uppercase text-red-400">
                        Blocked
                      </span>
                    )}
                  </div>
                  <a
                    href={`mailto:${customer.email}`}
                    className="mt-1 block truncate text-sm text-slate-400 hover:text-blue-400"
                  >
                    {customer.email}
                  </a>
                </div>
              </div>
              <div className="my-5 border-t border-white/10" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[10px] font-bold uppercase text-[#4A86F7]">
                    Platform
                  </p>
                  <p className="mt-1 font-semibold uppercase">
                    {customer.source || "Unknown"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase text-[#4A86F7]">
                    Joined
                  </p>
                  <p className="mt-1 font-semibold">
                    {new Date(customer.created_at).toLocaleDateString("en-CA", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              {customer.phone_number && (
                <a
                  href={`tel:${customer.phone_number}`}
                  className="mt-4 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
                >
                  <Phone size={15} /> {customer.phone_number}
                </a>
              )}
              {customer.address && (
                <p className="mt-2 flex items-start gap-2 text-sm text-slate-400">
                  <MapPin className="mt-0.5 shrink-0" size={15} />{" "}
                  {customer.address}
                </p>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <a
                  href={`/admin-dashboard/manage/invoices?customer=${customer.id}`}
                  className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-blue-400 px-4 text-sm font-semibold text-blue-400 hover:bg-blue-500/10"
                >
                  <FileText size={17} /> Create Invoice
                </a>
                <button
                  type="button"
                  aria-label={`Edit ${customer.name}`}
                  onClick={() => openEdit(customer)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                >
                  <Pencil size={18} />
                </button>
                <button
                  type="button"
                  aria-label={`Delete ${customer.name}`}
                  onClick={() => remove(customer)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 size={18} />
                </button>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <ChevronRight size={21} />
                </span>
              </div>
            </article>
          ))}
          {!filtered.length && (
            <div className="col-span-full rounded-2xl border border-white/10 bg-[#0B162B] px-5 py-16 text-center text-slate-500">
              No customers match these filters.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 sm:items-center sm:p-5"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setModalOpen(false)
          }
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-modal-title"
            className="max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#0B162B] p-5 shadow-2xl sm:rounded-2xl sm:p-7"
          >
            <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-slate-600 sm:hidden" />
            <div className="flex items-center justify-between">
              <h2 id="customer-modal-title" className="text-2xl font-bold">
                {form.id ? "Edit Customer" : "Add New Customer"}
              </h2>
              <button
                type="button"
                aria-label="Close customer form"
                onClick={() => setModalOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-slate-300"
              >
                <X size={21} />
              </button>
            </div>
            {error && (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
              >
                {error}
              </p>
            )}
            <form onSubmit={submit} className="mt-7 space-y-5">
              <ModalField
                label="Full Name"
                icon={User}
                value={form.name}
                onChange={(value) => setForm({ ...form, name: value })}
                placeholder="John Doe"
              />
              <ModalField
                label="Email Address"
                icon={Mail}
                value={form.email}
                onChange={(value) => setForm({ ...form, email: value })}
                placeholder="john@example.com"
                type="email"
              />
              <ModalField
                label="Phone Number"
                icon={Phone}
                value={form.phone_number}
                onChange={(value) => setForm({ ...form, phone_number: value })}
                placeholder="+1 234 567 890"
                type="tel"
              />
              <ModalField
                label="Address"
                icon={MapPin}
                value={form.address}
                onChange={(value) => setForm({ ...form, address: value })}
                placeholder="123 Main St, Calgary"
              />
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Acquisition Source
                </label>
                <select
                  value={form.source}
                  onChange={(event) =>
                    setForm({ ...form, source: event.target.value })
                  }
                  className="h-14 w-full rounded-xl border border-white/10 bg-[#131E35] px-4 text-sm text-white outline-none focus:border-[#4A86F7]"
                >
                  {sources.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="flex h-14 w-full items-center justify-center rounded-xl bg-[#4A86F7] text-sm font-bold uppercase text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : form.id
                    ? "Update Customer"
                    : "Save Customer"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ModalField({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  icon: typeof User;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
      </label>
      <div className="relative">
        <Icon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />
        <input
          required
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={fieldClass}
        />
      </div>
    </div>
  );
}
