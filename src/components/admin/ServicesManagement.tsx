"use client";

import type { ReactNode } from "react";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Car,
  Check,
  ChefHat,
  ChevronDown,
  Droplets,
  Home,
  Plus,
  RefreshCw,
  Sparkles,
  Tag,
  Trash2,
  Wind,
  Wrench,
  X,
} from "lucide-react";

export type CategoryRecord = {
  id: string;
  name: string;
  icon_str: string | null;
  color_hex: string | null;
  created_at: string;
  type: string | null;
};

export type ServiceRecord = {
  id: string;
  category_id: string | null;
  title: string;
  description: string | null;
  price: string | number | null;
  icon_str: string | null;
  pricing_type: string | null;
  hourly_rate: string | number | null;
  service_type: string | null;
  bedroom_rate: string | number | null;
  washroom_rate: string | number | null;
  sqft_rate: string | number | null;
  vehicle_sedan_rate: string | number | null;
  vehicle_suv_rate: string | number | null;
  fridge_price: string | number | null;
  oven_price: string | number | null;
  window_price: string | number | null;
  is_active: boolean | null;
  has_addons: boolean | null;
  tax_rate: string | number | null;
};

type CategoryForm = {
  name: string;
  icon_str: string;
  color_hex: string;
};

type AddonDraft = {
  name: string;
  price: string;
};

type FieldDraft = {
  label: string;
  unit_price: string;
  type: string;
};

type ServiceForm = {
  title: string;
  description: string;
  pricing_type: string;
  price: string;
  hourly_rate: string;
  tax_rate: string;
  service_type: string;
  icon_str: string;
  bedroom_rate: string;
  washroom_rate: string;
  sqft_rate: string;
  vehicle_sedan_rate: string;
  vehicle_suv_rate: string;
  fridge_price: string;
  oven_price: string;
  window_price: string;
};

const iconOptions = [
  { value: "sparkles", icon: Sparkles },
  { value: "home", icon: Home },
  { value: "droplets", icon: Droplets },
  { value: "chef-hat", icon: ChefHat },
  { value: "car", icon: Car },
  { value: "wind", icon: Wind },
  { value: "building", icon: Building2 },
  { value: "wrench", icon: Wrench },
];

const colors = ["FF3B82F6", "FF8B5CF6", "FFF59E0B", "FF10B981", "FFEF4444"];
const emptyCategory: CategoryForm = { name: "", icon_str: "sparkles", color_hex: colors[0] };
const emptyService: ServiceForm = {
  title: "",
  description: "",
  pricing_type: "fixed",
  price: "",
  hourly_rate: "",
  tax_rate: "",
  service_type: "",
  icon_str: "sparkles",
  bedroom_rate: "",
  washroom_rate: "",
  sqft_rate: "",
  vehicle_sedan_rate: "",
  vehicle_suv_rate: "",
  fridge_price: "",
  oven_price: "",
  window_price: "",
};

function normalizeColor(color: string | null) {
  const value = (color || colors[0]).replace("#", "");
  return `#${value.length === 8 ? value.slice(2) : value}`;
}

function IconFor({ name, size = 28 }: { name: string | null; size?: number }) {
  const match = iconOptions.find((item) => item.value === name);
  const Icon = match?.icon || Sparkles;
  return <Icon size={size} />;
}

function pricingLabel(service: ServiceRecord) {
  const pricing = (service.pricing_type || "fixed").toLowerCase();
  if (pricing === "both") return "Fixed & Hourly Available";
  if (pricing === "hourly") return "Hourly Available";
  return "Fixed Price";
}

export default function ServicesManagement({
  categories,
  services,
}: {
  categories: CategoryRecord[];
  services: ServiceRecord[];
}) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || "");
  const [categoryModal, setCategoryModal] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState<CategoryForm>(emptyCategory);
  const [serviceForm, setServiceForm] = useState<ServiceForm>(emptyService);
  const [addons, setAddons] = useState<AddonDraft[]>([]);
  const [addonDraft, setAddonDraft] = useState<AddonDraft>({ name: "", price: "" });
  const [fields, setFields] = useState<FieldDraft[]>([]);
  const [fieldDraft, setFieldDraft] = useState<FieldDraft>({ label: "", unit_price: "", type: "counter" });
  const [openService, setOpenService] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const activeCategory = categories.find((category) => category.id === selectedCategory) || categories[0];
  const visibleServices = useMemo(
    () => services.filter((service) => service.category_id === activeCategory?.id),
    [services, activeCategory?.id],
  );

  const resetService = () => {
    setServiceForm({ ...emptyService, icon_str: activeCategory?.icon_str || "sparkles", service_type: activeCategory?.name?.toLowerCase() || "" });
    setAddons([]);
    setFields([]);
    setAddonDraft({ name: "", price: "" });
    setFieldDraft({ label: "", unit_price: "", type: "counter" });
    setError("");
    setServiceModal(true);
  };

  const postAction = async (body: Record<string, unknown>) => {
    setSaving(true);
    setError("");
    const response = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    setSaving(false);
    if (!response.ok) {
      setError(result.error || "Unable to save.");
      return null;
    }
    router.refresh();
    return result as { id?: string };
  };

  const createCategory = async (event: FormEvent) => {
    event.preventDefault();
    const result = await postAction({ resource: "category", ...categoryForm });
    if (result?.id) {
      setSelectedCategory(result.id);
      setCategoryModal(false);
      setCategoryForm(emptyCategory);
    }
  };

  const createService = async (event: FormEvent) => {
    event.preventDefault();
    if (!activeCategory) return;
    const result = await postAction({
      resource: "service",
      category_id: activeCategory.id,
      ...serviceForm,
      has_addons: addons.length > 0,
      addons,
      custom_fields: fields,
    });
    if (result) setServiceModal(false);
  };

  const remove = async (resource: "category" | "service", id: string, label: string) => {
    if (!window.confirm(`Delete ${label}?`)) return;
    setSaving(true);
    const response = await fetch(`/api/admin/services?resource=${resource}&id=${id}`, { method: "DELETE" });
    const result = await response.json();
    setSaving(false);
    if (!response.ok) {
      window.alert(result.error || "Unable to delete.");
      return;
    }
    if (resource === "category" && selectedCategory === id) setSelectedCategory("");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#020817] px-4 py-7 text-white sm:px-7 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold tracking-[0.35em] text-[#4A86F7]">Camz Cleaner</p>
          <h1 className="mt-2 text-3xl font-bold">Admin Panel</h1>
          <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 border-b border-white/10 text-lg font-bold">
            <span className="pb-4 text-slate-400">Overview</span>
            <span className="border-b-2 border-[#4A86F7] pb-4 text-[#4A86F7]">Services</span>
          </div>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">Platform Categories</h2>
            <div className="flex items-center gap-3">
              <button type="button" aria-label="Refresh services" onClick={() => router.refresh()} className="flex h-12 w-12 items-center justify-center rounded-xl text-slate-300 hover:bg-white/10">
                <RefreshCw size={22} />
              </button>
              <button type="button" onClick={() => setCategoryModal(true)} className="flex min-h-12 items-center gap-2 rounded-xl bg-[#4A86F7] px-5 text-sm font-bold uppercase text-white hover:bg-blue-600">
                <Plus size={18} /> Category
              </button>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => {
              const active = activeCategory?.id === category.id;
              const color = normalizeColor(category.color_hex);
              return (
                <article key={category.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`min-h-40 w-full rounded-3xl border p-5 text-left transition ${active ? "text-white" : "border-white/10 bg-[#0B162B] hover:border-white/25"}`}
                    style={active ? { background: color, borderColor: color } : undefined}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10" style={!active ? { color } : undefined}>
                      <IconFor name={category.icon_str} />
                    </span>
                    <span className="mt-5 block text-lg font-bold">{category.name}</span>
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${category.name}`}
                    onClick={() => remove("category", category.id, category.name)}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white shadow-lg"
                  >
                    <Trash2 size={17} />
                  </button>
                </article>
              );
            })}
            {!categories.length && <p className="col-span-full rounded-2xl border border-white/10 bg-[#0B162B] p-8 text-center text-slate-500">No categories yet.</p>}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">Category Services</h2>
            <button type="button" disabled={!activeCategory} onClick={resetService} className="flex min-h-12 items-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-bold uppercase text-white hover:bg-emerald-600 disabled:opacity-50">
              <Plus size={18} /> Service
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {visibleServices.map((service) => {
              const opened = openService === service.id;
              return (
                <article key={service.id} className="rounded-3xl border border-white/10 bg-[#0B162B] p-5">
                  <div className="flex items-center gap-4">
                    <span className={`h-5 w-5 rounded-full ${service.is_active === false ? "bg-red-500" : "bg-green-500"}`} />
                    <button type="button" onClick={() => setOpenService(opened ? "" : service.id)} className="min-w-0 flex-1 text-left">
                      <h3 className="truncate text-xl font-bold">{service.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-[#4A86F7]">
                        {pricingLabel(service)} <span className="ml-4 text-slate-400">{service.has_addons ? "Add-ons enabled" : "0 Add-ons"}</span>
                      </p>
                    </button>
                    <button type="button" aria-label={`Delete ${service.title}`} onClick={() => remove("service", service.id, service.title)} className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20">
                      <Trash2 size={18} />
                    </button>
                    <button type="button" aria-label="Toggle service details" onClick={() => setOpenService(opened ? "" : service.id)} className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400">
                      <ChevronDown className={opened ? "rotate-180" : ""} size={24} />
                    </button>
                  </div>
                  {opened && (
                    <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 text-sm text-slate-300 md:grid-cols-3">
                      <p><span className="block text-xs uppercase text-slate-500">Description</span>{service.description || "-"}</p>
                      <p><span className="block text-xs uppercase text-slate-500">Fixed Price</span>CAD {service.price || "0"}</p>
                      <p><span className="block text-xs uppercase text-slate-500">Tax Rate</span>{service.tax_rate || "0"}%</p>
                      <p><span className="block text-xs uppercase text-slate-500">Service Type</span>{service.service_type || "-"}</p>
                      <p><span className="block text-xs uppercase text-slate-500">Hourly Rate</span>{service.hourly_rate || "-"}</p>
                      <p><span className="block text-xs uppercase text-slate-500">Bedroom / Washroom</span>{service.bedroom_rate || "0"} / {service.washroom_rate || "0"}</p>
                    </div>
                  )}
                </article>
              );
            })}
            {!visibleServices.length && <p className="rounded-2xl border border-white/10 bg-[#0B162B] p-10 text-center text-slate-500">No services in this category yet.</p>}
          </div>
        </section>
      </div>

      {categoryModal && (
        <Modal title="New Category" onClose={() => setCategoryModal(false)}>
          <form onSubmit={createCategory} className="space-y-6">
            {error && <ErrorBox error={error} />}
            <Input label="Category Name" value={categoryForm.name} onChange={(value) => setCategoryForm({ ...categoryForm, name: value })} placeholder="e.g., Deep Cleaning" required />
            <div>
              <label className="mb-3 block text-sm font-bold text-slate-300">Platform Icon</label>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {iconOptions.map((item) => {
                  const Icon = item.icon;
                  const active = categoryForm.icon_str === item.value;
                  return (
                    <button key={item.value} type="button" onClick={() => setCategoryForm({ ...categoryForm, icon_str: item.value })} className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border ${active ? "border-[#4A86F7] bg-[#4A86F7] text-white" : "border-white/10 bg-[#19243A] text-slate-300"}`}>
                      <Icon size={30} />
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="mb-3 block text-sm font-bold text-slate-300">Branding Color</label>
              <div className="flex gap-4 overflow-x-auto pb-1">
                {colors.map((color) => {
                  const active = categoryForm.color_hex === color;
                  return (
                    <button key={color} type="button" onClick={() => setCategoryForm({ ...categoryForm, color_hex: color })} className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-transparent" style={{ background: normalizeColor(color), borderColor: active ? "white" : "transparent" }}>
                      {active && <Check size={28} />}
                    </button>
                  );
                })}
              </div>
            </div>
            <ModalActions saving={saving} submitLabel="Create Category" onCancel={() => setCategoryModal(false)} />
          </form>
        </Modal>
      )}

      {serviceModal && (
        <Modal title="Add Service" onClose={() => setServiceModal(false)}>
          <form onSubmit={createService} className="space-y-6">
            {error && <ErrorBox error={error} />}
            <Input label="Service Title" value={serviceForm.title} onChange={(value) => setServiceForm({ ...serviceForm, title: value })} placeholder="e.g. Full House Cleaning" required />
            <Textarea label="Description" value={serviceForm.description} onChange={(value) => setServiceForm({ ...serviceForm, description: value })} placeholder="What does this include?" />
            <div>
              <label className="mb-3 block text-sm font-bold text-slate-300">Pricing Type</label>
              <div className="grid grid-cols-3 gap-3">
                {["fixed", "hourly", "both"].map((item) => (
                  <button key={item} type="button" onClick={() => setServiceForm({ ...serviceForm, pricing_type: item })} className={`flex min-h-20 flex-col items-center justify-center rounded-2xl border text-sm font-bold capitalize ${serviceForm.pricing_type === item ? "border-[#4A86F7] bg-[#4A86F7] text-white" : "border-white/20 bg-transparent text-slate-300"}`}>
                    <Tag size={22} /> {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Fixed Price (CAD)" type="number" value={serviceForm.price} onChange={(value) => setServiceForm({ ...serviceForm, price: value })} placeholder="0.00" />
              <Input label="Hourly Rate (CAD)" type="number" value={serviceForm.hourly_rate} onChange={(value) => setServiceForm({ ...serviceForm, hourly_rate: value })} placeholder="0.00" />
              <Input label="Tax Rate (%)" type="number" value={serviceForm.tax_rate} onChange={(value) => setServiceForm({ ...serviceForm, tax_rate: value })} placeholder="e.g. 13 for 13%" />
              <Input label="Service Type" value={serviceForm.service_type} onChange={(value) => setServiceForm({ ...serviceForm, service_type: value })} placeholder="residential" />
            </div>
            <Panel title="Service Add-ons">
              <div className="grid grid-cols-[1fr_100px_72px] gap-3">
                <input value={addonDraft.name} onChange={(event) => setAddonDraft({ ...addonDraft, name: event.target.value })} placeholder="Add-on Name" className="h-14 min-w-0 rounded-xl border border-white/10 bg-[#111827] px-4 text-sm outline-none placeholder:text-slate-600" />
                <input value={addonDraft.price} onChange={(event) => setAddonDraft({ ...addonDraft, price: event.target.value })} placeholder="Price" type="number" className="h-14 min-w-0 rounded-xl border border-white/10 bg-[#111827] px-4 text-sm outline-none placeholder:text-slate-600" />
                <button type="button" onClick={() => { if (addonDraft.name.trim()) { setAddons([...addons, addonDraft]); setAddonDraft({ name: "", price: "" }); } }} className="flex h-14 items-center justify-center rounded-xl bg-[#4A86F7]"><Plus /></button>
              </div>
              {!!addons.length && <p className="mt-3 text-sm text-slate-400">{addons.length} add-on{addons.length === 1 ? "" : "s"} added for this service.</p>}
            </Panel>
            <Panel title="Custom Service Fields">
              <div className="grid gap-3 sm:grid-cols-[1fr_140px_120px]">
                <input value={fieldDraft.label} onChange={(event) => setFieldDraft({ ...fieldDraft, label: event.target.value })} placeholder="Field Label" className="h-14 min-w-0 rounded-xl border border-white/10 bg-[#111827] px-4 text-sm outline-none placeholder:text-slate-600" />
                <input value={fieldDraft.unit_price} onChange={(event) => setFieldDraft({ ...fieldDraft, unit_price: event.target.value })} placeholder="Unit Price" type="number" className="h-14 min-w-0 rounded-xl border border-white/10 bg-[#111827] px-4 text-sm outline-none placeholder:text-slate-600" />
                <select value={fieldDraft.type} onChange={(event) => setFieldDraft({ ...fieldDraft, type: event.target.value })} className="h-14 rounded-xl border border-white/10 bg-[#111827] px-4 text-sm outline-none">
                  <option value="counter">Counter</option>
                  <option value="toggle">Toggle</option>
                  <option value="text">Text</option>
                </select>
              </div>
              <button type="button" onClick={() => { if (fieldDraft.label.trim()) { setFields([...fields, fieldDraft]); setFieldDraft({ label: "", unit_price: "", type: "counter" }); } }} className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#4A86F7] font-bold"><Plus size={18} /> Add Field</button>
              {!!fields.length && <p className="mt-3 text-sm text-slate-400">{fields.length} custom field{fields.length === 1 ? "" : "s"} added locally.</p>}
            </Panel>
            <Panel title="Pricing Rules & Config">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Bedroom Rate" type="number" value={serviceForm.bedroom_rate} onChange={(value) => setServiceForm({ ...serviceForm, bedroom_rate: value })} placeholder="30.0" />
                <Input label="Washroom Rate" type="number" value={serviceForm.washroom_rate} onChange={(value) => setServiceForm({ ...serviceForm, washroom_rate: value })} placeholder="20.0" />
                <Input label="Sqft Rate" type="number" value={serviceForm.sqft_rate} onChange={(value) => setServiceForm({ ...serviceForm, sqft_rate: value })} placeholder="0.5" />
                <Input label="Sedan Rate" type="number" value={serviceForm.vehicle_sedan_rate} onChange={(value) => setServiceForm({ ...serviceForm, vehicle_sedan_rate: value })} placeholder="80.0" />
                <Input label="SUV Rate" type="number" value={serviceForm.vehicle_suv_rate} onChange={(value) => setServiceForm({ ...serviceForm, vehicle_suv_rate: value })} placeholder="120.0" />
                <Input label="Fridge Price" type="number" value={serviceForm.fridge_price} onChange={(value) => setServiceForm({ ...serviceForm, fridge_price: value })} placeholder="25.0" />
                <Input label="Oven Price" type="number" value={serviceForm.oven_price} onChange={(value) => setServiceForm({ ...serviceForm, oven_price: value })} placeholder="25.0" />
                <Input label="Window Price" type="number" value={serviceForm.window_price} onChange={(value) => setServiceForm({ ...serviceForm, window_price: value })} placeholder="30.0" />
              </div>
            </Panel>
            <ModalActions saving={saving} submitLabel="Add Service" onCancel={() => setServiceModal(false)} />
          </form>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0B162B] p-6 text-white shadow-2xl sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <button type="button" aria-label={`Close ${title}`} onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-slate-300">
            <X size={21} />
          </button>
        </div>
        <div className="mt-7">{children}</div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-3 block text-sm font-bold text-slate-300">{label}</span>
      <input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="h-16 w-full rounded-2xl border border-white/10 bg-[#19243A] px-5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-[#4A86F7]" />
    </label>
  );
}

function Textarea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-3 block text-sm font-bold text-slate-300">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={4} className="w-full resize-none rounded-2xl border border-white/10 bg-[#19243A] px-5 py-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-[#4A86F7]" />
    </label>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="mb-4 text-xl font-bold">{title}</h3>
      <div className="rounded-2xl border border-white/10 bg-[#050A16] p-4">{children}</div>
    </section>
  );
}

function ModalActions({ saving, submitLabel, onCancel }: { saving: boolean; submitLabel: string; onCancel: () => void }) {
  return (
    <div className="flex items-center justify-end gap-4 border-t border-white/15 pt-6">
      <button type="button" onClick={onCancel} className="h-14 px-5 font-bold text-[#4A86F7]">Cancel</button>
      <button type="submit" disabled={saving} className="h-14 rounded-2xl bg-[#4A86F7] px-8 font-bold text-white hover:bg-blue-600 disabled:opacity-50">{saving ? "Saving..." : submitLabel}</button>
    </div>
  );
}

function ErrorBox({ error }: { error: string }) {
  return <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>;
}
