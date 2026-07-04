import Link from "next/link";
import { CalendarDays, CheckSquare2, ChevronRight, FileImage, Mail, MapPin, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { serviceTypes } from "@/data/customCleaning";

type ChecklistSection = {
  tasks?: string[];
  notes?: string;
  photo_paths?: string[];
};

type RequestRow = {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  service_types: string[];
  property_details: Record<string, string>;
  checklist: Record<string, ChecklistSection | string[]>;
  if_time_allows: string | null;
  additional_notes: string | null;
  preferred_contact: string;
  preferred_date: string | null;
  status: string;
  created_at: string;
};

const sectionLabels: Record<string, string> = {
  bedrooms: "Bedrooms",
  bathrooms: "Bathrooms",
  powder_rooms: "Powder room",
  kitchens: "Kitchen",
  basement: "Basement",
  garage: "Garage",
};

function serviceLabel(id: string) {
  return serviceTypes.find((service) => service.id === id)?.name || id;
}

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "Not provided";
  return String(value).replaceAll("_", " ");
}

export default async function CustomRequestsPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const supabase = await createClient();
  const { data, error } = await supabase.from("custom_cleaning_requests").select("*").order("created_at", { ascending: false });
  const requests = (data || []) as RequestRow[];
  const selected = requests.find((request) => request.id === id) || requests[0];

  const photoUrls: Record<string, string> = {};
  if (selected) {
    const paths = Object.values(selected.checklist || {}).flatMap((section) =>
      Array.isArray(section) ? [] : section.photo_paths || [],
    );
    await Promise.all(paths.map(async (path) => {
      const { data: signed } = await supabase.storage.from("custom-cleaning-photos").createSignedUrl(path, 3600);
      if (signed?.signedUrl) photoUrls[path] = signed.signedUrl;
    }));
  }

  return <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-6"><p className="text-sm font-bold uppercase text-[#4276B2]">Customer enquiries</p><h1 className="mt-2 text-3xl font-bold text-slate-950">Custom cleaning requests</h1><p className="mt-2 text-slate-600">Review submitted checklists and contact customers to arrange a quote.</p></div>

      {error && <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">Requests could not be loaded. Confirm the admin read policy has been added in Supabase.</div>}
      {!error && !requests.length && <div className="border border-slate-200 bg-white px-6 py-16 text-center"><CheckSquare2 className="mx-auto text-slate-300" size={36} /><h2 className="mt-4 text-xl font-bold text-slate-900">No requests yet</h2><p className="mt-2 text-sm text-slate-500">New custom cleaning submissions will appear here.</p></div>}

      {!!requests.length && selected && <div className="grid min-h-[680px] overflow-hidden border border-slate-200 bg-white lg:grid-cols-[360px_1fr]">
        <aside className="border-b border-slate-200 lg:border-b-0 lg:border-r">
          <div className="border-b border-slate-200 px-4 py-4"><p className="text-sm font-bold text-slate-900">All requests</p><p className="mt-1 text-xs text-slate-500">{requests.length} submission{requests.length === 1 ? "" : "s"}</p></div>
          <div className="max-h-[420px] divide-y divide-slate-100 overflow-y-auto lg:max-h-[720px]">
            {requests.map((request) => {
              const active = request.id === selected.id;
              return <Link key={request.id} href={`/admin-dashboard/custom-requests?id=${request.id}`} className={`flex items-start gap-3 px-4 py-4 transition ${active ? "bg-[#EAF4FF]" : "hover:bg-slate-50"}`}>
                <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${request.status === "new" ? "bg-cyan-500" : "bg-slate-300"}`} />
                <span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-2"><span className="truncate font-bold text-slate-900">{request.customer_name}</span><span className="shrink-0 text-[11px] text-slate-400">{new Date(request.created_at).toLocaleDateString("en-CA", { month: "short", day: "numeric" })}</span></span><span className="mt-1 block truncate text-xs text-slate-500">{request.service_types.map(serviceLabel).join(", ")}</span><span className="mt-2 inline-block rounded-sm bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase text-slate-600">{request.status}</span></span>
                <ChevronRight className="mt-3 shrink-0 text-slate-400" size={17} />
              </Link>;
            })}
          </div>
        </aside>

        <article className="min-w-0">
          <header className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
              <div><div className="flex flex-wrap items-center gap-2"><h2 className="text-2xl font-bold text-slate-950">{selected.customer_name}</h2><span className="rounded-sm bg-cyan-50 px-2 py-1 text-xs font-bold uppercase text-cyan-800">{selected.status}</span></div><p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><CalendarDays size={16} /> Submitted {new Date(selected.created_at).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" })}</p></div>
              <div className="flex flex-wrap gap-2"><a href={`tel:${selected.phone}`} className="flex min-h-11 items-center gap-2 rounded-md bg-[#0B4E9B] px-4 text-sm font-bold text-white hover:bg-[#00A8D4]"><Phone size={17} /> Call customer</a><a href={`mailto:${selected.email}`} className="flex min-h-11 items-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 hover:border-[#0B4E9B] hover:text-[#0B4E9B]"><Mail size={17} /> Send email</a></div>
            </div>
            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-3"><a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-slate-700 hover:text-[#0B4E9B]"><Phone size={16} /> {selected.phone}</a><a href={`mailto:${selected.email}`} className="flex min-w-0 items-center gap-2 text-slate-700 hover:text-[#0B4E9B]"><Mail className="shrink-0" size={16} /><span className="truncate">{selected.email}</span></a><span className="flex items-start gap-2 text-slate-700"><MapPin className="mt-0.5 shrink-0" size={16} /> {selected.address}</span></div>
          </header>

          <div className="space-y-7 p-5 sm:p-6">
            <section><h3 className="text-base font-bold text-slate-950">Service types</h3><div className="mt-3 flex flex-wrap gap-2">{selected.service_types.map((service) => <span key={service} className="rounded-sm bg-[#EAF4FF] px-3 py-2 text-sm font-semibold text-[#0B4E9B]">{serviceLabel(service)}</span>)}</div></section>

            <section><h3 className="text-base font-bold text-slate-950">Property details</h3><div className="mt-3 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2 xl:grid-cols-3">{Object.entries(selected.property_details || {}).map(([key, value]) => <div key={key} className="bg-white p-3"><p className="text-xs font-semibold text-slate-400">{sectionLabels[key] || key.replaceAll("_", " ")}</p><p className="mt-1 text-sm font-bold capitalize text-slate-800">{formatValue(value)}</p></div>)}</div></section>

            <section><h3 className="text-base font-bold text-slate-950">Selected cleaning work</h3><div className="mt-3 space-y-4">{Object.entries(selected.checklist || {}).map(([areaId, rawSection]) => {
              const section: ChecklistSection = Array.isArray(rawSection) ? { tasks: rawSection } : rawSection;
              if (!section.tasks?.length && !section.notes && !section.photo_paths?.length) return null;
              return <div key={areaId} className="border border-slate-200 p-4"><h4 className="font-bold text-[#0B4E9B]">{sectionLabels[areaId] || areaId}</h4>{!!section.tasks?.length && <ul className="mt-3 grid gap-2 sm:grid-cols-2">{section.tasks.map((task) => <li key={task} className="flex items-start gap-2 text-sm text-slate-700"><CheckSquare2 className="mt-0.5 shrink-0 text-emerald-600" size={16} /> {task}</li>)}</ul>}{section.notes && <div className="mt-4 bg-slate-50 p-3"><p className="text-xs font-bold uppercase text-slate-400">Customer notes</p><p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{section.notes}</p></div>}{!!section.photo_paths?.length && <div className="mt-4"><p className="text-xs font-bold uppercase text-slate-400">Attachments</p><div className="mt-2 flex flex-wrap gap-2">{section.photo_paths.map((path, index) => photoUrls[path] ? <a key={path} href={photoUrls[path]} target="_blank" rel="noreferrer" className="flex min-h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-semibold text-[#0B4E9B] hover:border-[#0B4E9B]"><FileImage size={16} /> Photo {index + 1}</a> : null)}</div></div>}</div>;
            })}</div></section>

            {(selected.if_time_allows || selected.additional_notes) && <section className="grid gap-4 md:grid-cols-2">{selected.if_time_allows && <div className="border border-slate-200 p-4"><h3 className="text-sm font-bold text-slate-950">If time allows</h3><p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">{selected.if_time_allows}</p></div>}{selected.additional_notes && <div className="border border-slate-200 p-4"><h3 className="text-sm font-bold text-slate-950">Additional notes</h3><p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">{selected.additional_notes}</p></div>}</section>}
            <section className="border-t border-slate-200 pt-5 text-sm text-slate-600"><span className="font-semibold text-slate-900">Preferred contact:</span> {formatValue(selected.preferred_contact)}{selected.preferred_date && <><span className="mx-3 text-slate-300">|</span><span className="font-semibold text-slate-900">Preferred date:</span> {new Date(`${selected.preferred_date}T00:00:00`).toLocaleDateString("en-CA", { dateStyle: "long" })}</>}</section>
          </div>
        </article>
      </div>}
    </div>
  </div>;
}
