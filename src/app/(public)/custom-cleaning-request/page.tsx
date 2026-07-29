"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  ImagePlus,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Send,
  X,
} from "lucide-react";
import CommonHeroSection from "@/components/common/CommonHeroSection";
import { createClient } from "@/lib/supabase/client";
import { cleaningAreas, serviceTypes } from "@/data/customCleaning";

type ChecklistState = Record<string, string[]>;

const inputClass =
  "h-12 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-[#00B7EB] focus:ring-2 focus:ring-[#00B7EB]/20";

const propertySections = [
  { id: "bedrooms", label: "Bedrooms", areaId: "bedrooms", input: "number", defaultValue: "1" },
  { id: "bathrooms", label: "Bathrooms", areaId: "bathrooms", input: "number", defaultValue: "1", step: "0.5" },
  { id: "powder_rooms", label: "Powder room", areaId: "bathrooms", input: "number", defaultValue: "0" },
  { id: "kitchens", label: "Kitchen count", areaId: "kitchen", input: "number", defaultValue: "1" },
  { id: "basement", label: "Basement", areaId: "basement", input: "select", options: ["None", "Finished", "Unfinished"] },
  { id: "garage", label: "Garage", areaId: "garage", input: "select", options: ["None", "Single", "Double", "Other"] },
] as const;

export default function CustomCleaningRequestPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [expandedProperty, setExpandedProperty] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<ChecklistState>({});
  const [areaNotes, setAreaNotes] = useState<Record<string, string>>({});
  const [areaPhotos, setAreaPhotos] = useState<Record<string, File[]>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedTaskCount = useMemo(
    () => Object.values(checklist).reduce((total, tasks) => total + tasks.length, 0),
    [checklist],
  );

  const toggleService = (serviceId: string) => {
    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId],
    );
  };

  const toggleTask = (sectionId: string, task: string) => {
    setChecklist((current) => {
      const sectionTasks = current[sectionId] || [];
      return {
        ...current,
        [sectionId]: sectionTasks.includes(task)
          ? sectionTasks.filter((item) => item !== task)
          : [...sectionTasks, task],
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    const form = new FormData(event.currentTarget);
    const supabase = createClient();
    const requestId = crypto.randomUUID();
    const photoPaths: Record<string, string[]> = {};

    for (const [areaId, files] of Object.entries(areaPhotos)) {
      photoPaths[areaId] = [];
      for (const file of files) {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
        const path = `${requestId}/${areaId}/${crypto.randomUUID()}-${safeName}`;
        const { error: uploadError } = await supabase.storage
          .from("custom-cleaning-photos")
          .upload(path, file, { contentType: file.type, upsert: false });
        if (uploadError) {
          setStatus("error");
          setErrorMessage("We could not attach your photos. Please check the file size and try again.");
          return;
        }
        photoPaths[areaId].push(path);
      }
    }

    const checklistDetails = Object.fromEntries(
      propertySections.map((section) => [
        section.id,
        {
          tasks: checklist[section.id] || [],
          notes: areaNotes[section.id] || "",
          photo_paths: photoPaths[section.id] || [],
        },
      ]),
    );

    const payload = {
      id: requestId,
      customer_name: form.get("customer_name"),
      email: form.get("email"),
      phone: form.get("phone"),
      address: form.get("address"),
      service_types: selectedServices,
      property_details: {
        bedrooms: form.get("bedrooms"),
        bathrooms: form.get("bathrooms"),
        powder_rooms: form.get("powder_rooms"),
        kitchens: form.get("kitchens"),
        basement: form.get("basement"),
        garage: form.get("garage"),
      },
      checklist: checklistDetails,
      if_time_allows: form.get("if_time_allows"),
      additional_notes: form.get("additional_notes"),
      preferred_contact: form.get("preferred_contact"),
      preferred_date: form.get("preferred_date") || null,
      status: "new",
    };

    const { error } = await supabase.from("custom_cleaning_requests").insert(payload);
    if (error) {
      setStatus("error");
      setErrorMessage("We could not submit your request. Please call 587-837-1977 or try again shortly.");
      return;
    }
    setStatus("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (status === "success") {
    return (
      <main className="flex min-h-[70vh] items-center bg-[#F4F8FC] px-4 py-20">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 size={34} />
          </div>
          <p className="mb-3 text-sm font-bold uppercase text-[#4276B2]">Request received</p>
          <h2 className="text-3xl font-bold text-[#0B4E9B] sm:text-4xl">Thank you. We will be in touch.</h2>
          <p className="mx-auto mt-4 max-w-md text-slate-600">Our team will review your checklist and contact you with a manual quote.</p>
          <button type="button" onClick={() => window.location.reload()} className="mt-8 rounded-md bg-[#0B4E9B] px-6 py-3 font-semibold text-white hover:bg-[#00A8D4]">Start another request</button>
        </div>
      </main>
    );
  }

  return (
    <>
      <CommonHeroSection backgroundImage="/p4.webp" title="Build Your Cleaning Checklist" />
      <main className="bg-[#F4F8FC] pb-20">
        <form onSubmit={handleSubmit}>
          <section className="border-b border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <p className="text-sm font-bold uppercase text-[#4276B2]">Step 1 of 3</p>
              <h2 className="mt-2 text-2xl font-bold text-[#0B4E9B] sm:text-3xl">Select service types</h2>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {serviceTypes.map((service) => {
                  const selected = selectedServices.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleService(service.id)}
                      className={`relative flex min-h-16 items-center justify-center border px-3 py-4 text-center text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-[#00B7EB] sm:text-base ${
                        selected
                          ? "border-[#0B4E9B] bg-[#0B4E9B] text-white"
                          : "border-slate-200 bg-white text-slate-800 hover:border-[#00B7EB]"
                      }`}
                    >
                      {service.name}
                      {selected && <Check className="absolute right-2 top-2" size={15} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {selectedServices.length > 0 && (
            <>
              <section className="px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                      <p className="text-sm font-bold uppercase text-[#4276B2]">Step 2 of 3</p>
                      <h2 className="mt-2 text-2xl font-bold text-[#0B4E9B] sm:text-3xl">Property information</h2>
                      <p className="mt-2 text-slate-600">Tap a room to enter its details and select the cleaning work needed.</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#0B4E9B]"><ClipboardCheck size={19} /> {selectedTaskCount} tasks selected</div>
                  </div>

                  <div className="mt-7 space-y-3">
                    {propertySections.map((section) => {
                      const expanded = expandedProperty === section.id;
                      const area = cleaningAreas.find((item) => item.id === section.areaId);
                      const selected = checklist[section.id]?.length || 0;
                      return (
                        <div key={section.id} className="border border-slate-200 bg-white shadow-sm">
                          <div className="flex items-center gap-3 p-4 sm:p-5">
                            <button
                              type="button"
                              aria-expanded={expanded}
                              onClick={() => setExpandedProperty(expanded ? null : section.id)}
                              className="flex min-h-12 min-w-0 flex-1 items-center justify-between gap-3 text-left"
                            >
                              <span>
                                <span className="block font-bold text-slate-900">{section.label}</span>
                                <span className="mt-1 block text-xs text-slate-500">{selected ? `${selected} tasks selected` : "Tap to choose cleaning tasks"}</span>
                              </span>
                              <ChevronDown className={`shrink-0 text-[#4276B2] transition-transform ${expanded ? "rotate-180" : ""}`} size={22} />
                            </button>
                            <div className="w-28 shrink-0 sm:w-44">
                              {section.input === "number" ? (
                                <input
                                  aria-label={`${section.label} count`}
                                  name={section.id}
                                  type="number"
                                  min="0"
                                  step={"step" in section ? section.step : "1"}
                                  defaultValue={section.defaultValue}
                                  className={inputClass}
                                />
                              ) : (
                                <select aria-label={section.label} name={section.id} defaultValue="" className={inputClass}>
                                  <option value="" disabled>Select</option>
                                  {section.options.map((option) => <option key={option} value={option.toLowerCase()}>{option}</option>)}
                                </select>
                              )}
                            </div>
                          </div>
                          {expanded && area && (
                            <div className="border-t border-slate-200 bg-slate-50 px-4 py-5 sm:px-7">
                              <h3 className="text-base font-bold text-slate-900">{section.label}</h3>
                              <div className="mt-4 grid gap-x-10 gap-y-3 md:grid-cols-2">
                                {area.tasks.map((task) => {
                                  const checked = checklist[section.id]?.includes(task) || false;
                                  return (
                                    <label key={task} className="flex min-h-8 cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-800 sm:text-base">
                                      <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleTask(section.id, task)}
                                        className="mt-1 h-5 w-5 shrink-0 accent-[#0B4E9B]"
                                      />
                                      <span>{task}</span>
                                    </label>
                                  );
                                })}
                              </div>
                              <div className="mt-6 grid gap-5 border-t border-slate-200 pt-5 md:grid-cols-2">
                                <div>
                                  <label htmlFor={`${section.id}-notes`} className="mb-2 block text-sm font-bold text-slate-900">Optional notes</label>
                                  <textarea
                                    id={`${section.id}-notes`}
                                    rows={4}
                                    value={areaNotes[section.id] || ""}
                                    onChange={(event) => setAreaNotes((current) => ({ ...current, [section.id]: event.target.value }))}
                                    className="w-full rounded-md border border-slate-300 bg-white p-3 text-sm outline-none focus:border-[#00B7EB] focus:ring-2 focus:ring-[#00B7EB]/20"
                                    placeholder={`Add notes for ${section.label.toLowerCase()}...`}
                                  />
                                </div>
                                <div>
                                  <label htmlFor={`${section.id}-photos`} className="mb-2 block text-sm font-bold text-slate-900">Optional photo attachment</label>
                                  <label htmlFor={`${section.id}-photos`} className="flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-white px-4 py-3 text-center text-sm text-slate-600 hover:border-[#00B7EB]">
                                    <ImagePlus className="mb-2 text-[#4276B2]" size={23} />
                                    Add up to 5 photos
                                    <span className="mt-1 text-xs text-slate-400">JPG, PNG or WebP - maximum 10 MB each</span>
                                  </label>
                                  <input
                                    id={`${section.id}-photos`}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    multiple
                                    className="sr-only"
                                    onChange={(event) => {
                                      const files = Array.from(event.target.files || []).filter((file) => file.size <= 10 * 1024 * 1024).slice(0, 5);
                                      setAreaPhotos((current) => ({ ...current, [section.id]: files }));
                                    }}
                                  />
                                  {!!areaPhotos[section.id]?.length && (
                                    <div className="mt-3 space-y-2">
                                      {areaPhotos[section.id].map((file) => (
                                        <div key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2 text-xs text-slate-700">
                                          <span className="min-w-0 truncate">{file.name}</span>
                                          <button type="button" aria-label={`Remove ${file.name}`} onClick={() => setAreaPhotos((current) => ({ ...current, [section.id]: current[section.id].filter((item) => item !== file) }))} className="flex h-8 w-8 shrink-0 items-center justify-center text-slate-500 hover:text-red-600"><X size={16} /></button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6">
                    <label htmlFor="if_time_allows" className="mb-2 block text-sm font-bold text-slate-800">If time allows <span className="font-normal text-slate-500">(optional)</span></label>
                    <textarea id="if_time_allows" name="if_time_allows" rows={3} className="w-full rounded-md border border-slate-300 bg-white p-3 text-sm outline-none focus:border-[#00B7EB] focus:ring-2 focus:ring-[#00B7EB]/20" placeholder="What else would you like us to do if there is time?" />
                  </div>
                </div>
              </section>

              <section className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_340px]">
                  <div>
                    <p className="text-sm font-bold uppercase text-[#4276B2]">Step 3 of 3</p>
                    <h2 className="mt-2 text-2xl font-bold text-[#0B4E9B] sm:text-3xl">Contact information</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <Field label="Full name" name="customer_name" required />
                      <Field label="Email address" name="email" type="email" required />
                      <Field label="Phone number" name="phone" type="tel" required />
                      <Field label="Property address" name="address" required />
                      <SelectField label="Preferred contact" name="preferred_contact" options={["Phone", "Email", "Text message"]} required />
                      <Field label="Preferred service date" name="preferred_date" type="date" />
                      <div className="sm:col-span-2">
                        <label htmlFor="additional_notes" className="mb-2 block text-sm font-semibold text-slate-800">Additional notes <span className="font-normal text-slate-500">(optional)</span></label>
                        <textarea id="additional_notes" name="additional_notes" rows={4} className="w-full rounded-md border border-slate-300 p-3 text-sm outline-none focus:border-[#00B7EB] focus:ring-2 focus:ring-[#00B7EB]/20" placeholder="Access details, allergies, special requests, or anything else we should know..." />
                      </div>
                    </div>
                  </div>
                  <aside className="h-fit bg-[#0B4E9B] p-6 text-white lg:sticky lg:top-6">
                    <h3 className="text-xl font-bold">Request summary</h3>
                    <div className="mt-5 space-y-4 text-sm">
                      <SummaryRow label="Service types" value={String(selectedServices.length)} />
                      <SummaryRow label="Tasks selected" value={String(selectedTaskCount)} />
                    </div>
                    <div className="my-6 border-t border-white/20" />
                    <p className="text-sm leading-relaxed text-blue-100">We will review your selections and contact you with a manual quote.</p>
                    {status === "error" && <p role="alert" className="mt-4 bg-red-50 p-3 text-sm text-red-700">{errorMessage}</p>}
                    <button type="submit" disabled={status === "submitting" || selectedTaskCount === 0} className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-md bg-[#00B7EB] px-5 font-bold text-white transition hover:bg-[#00A8D4] disabled:cursor-not-allowed disabled:opacity-50">
                      {status === "submitting" ? <><LoaderCircle className="animate-spin" size={19} /> Submitting...</> : <>Submit request <Send size={18} /></>}
                    </button>
                    {selectedTaskCount === 0 && <p className="mt-2 text-center text-xs text-blue-100">Select at least one cleaning task.</p>}
                    <div className="mt-6 space-y-3 border-t border-white/20 pt-5 text-sm text-blue-50">
                      <a href="tel:+15878371977" className="flex items-center gap-2"><Phone size={16} /> 587-837-1977</a>
                      <a href="mailto:info@camzcleaning.com" className="flex items-center gap-2"><Mail size={16} /> info@camzcleaning.com</a>
                      <span className="flex items-center gap-2"><MapPin size={16} /> Calgary, Alberta</span>
                    </div>
                  </aside>
                </div>
              </section>
            </>
          )}
        </form>
      </main>
    </>
  );
}

function Field({ label, name, ...props }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <div><label htmlFor={name} className="mb-2 block text-sm font-semibold text-slate-800">{label}{props.required && <span className="text-red-600"> *</span>}</label><input id={name} name={name} className={inputClass} {...props} /></div>;
}

function SelectField({ label, name, options, required = false }: { label: string; name: string; options: string[]; required?: boolean }) {
  return <div><label htmlFor={name} className="mb-2 block text-sm font-semibold text-slate-800">{label}{required && <span className="text-red-600"> *</span>}</label><select id={name} name={name} required={required} defaultValue="" className={inputClass}><option value="" disabled>Select an option</option>{options.map((option) => <option key={option} value={option.toLowerCase().replaceAll(" ", "_")}>{option}</option>)}</select></div>;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between"><span className="text-blue-100">{label}</span><span className="font-bold">{value}</span></div>;
}
