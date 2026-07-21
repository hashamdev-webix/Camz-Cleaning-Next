"use client";

import { FormEvent, useMemo, useState } from "react";
import { BookOpen, Image as ImageIcon, Plus, Trash2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { optimizeImageForUpload, uploadImageToBucket } from "@/lib/images/upload";

export type AdminBlog = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  detail_images: string[] | null;
  steps: Array<{ title: string; description: string }> | null;
  faqs: Array<{ question: string; answer: string }> | null;
  created_at: string;
};

type BlogForm = {
  title: string;
  description: string;
  image_url: string;
  detail_images_text: string;
  steps: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

const emptyForm: BlogForm = {
  title: "",
  description: "",
  image_url: "",
  detail_images_text: "",
  steps: [{ title: "", description: "" }],
  faqs: [{ question: "", answer: "" }],
};

export default function BlogManagement({ blogs }: { blogs: AdminBlog[] }) {
  const [items, setItems] = useState(blogs);
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const sorted = useMemo(() => [...items].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()), [items]);

  const resetForm = () => {
    setForm(emptyForm);
    setMainImageFile(null);
    setMainImagePreview("");
    setError("");
  };

  const uploadMainImage = async () => {
    if (!mainImageFile) return "";
    const supabase = createClient();
    const optimized = await optimizeImageForUpload(mainImageFile);
    const ext = optimized.name.split(".").pop() || "jpg";
    const path = `blogs/main_${Date.now()}_${crypto.randomUUID()}.${ext}`;
    return uploadImageToBucket(supabase, "job-images", path, optimized);
  };

  const saveBlog = async (event: FormEvent) => {
    event.preventDefault();
    if (!mainImageFile) {
      setError("Please upload a main blog image.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const imageUrl = await uploadMainImage();
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          image_url: imageUrl,
          detail_images: form.detail_images_text.split(/\r?\n/).map((url) => url.trim()).filter(Boolean),
          steps: form.steps,
          faqs: form.faqs,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save blog.");
      setItems((current) => [result.blog as AdminBlog, ...current]);
      resetForm();
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save blog.");
    } finally {
      setSaving(false);
    }
  };

  const deleteBlog = async (blog: AdminBlog) => {
    if (!window.confirm(`Delete "${blog.title}"?`)) return;
    const response = await fetch(`/api/admin/blogs?id=${blog.id}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) {
      window.alert(result.error || "Unable to delete blog.");
      return;
    }
    setItems((current) => current.filter((item) => item.id !== blog.id));
  };

  return <div className="min-h-screen bg-slate-100 px-4 py-7 text-slate-950 sm:px-7 lg:px-10">
    <div className="mx-auto max-w-7xl">
      <section className="rounded-[2rem] bg-gradient-to-r from-blue-800 via-blue-700 to-cyan-500 p-6 text-white shadow-2xl shadow-slate-900/15 sm:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/75">Admin Dashboard</p>
            <h1 className="mt-3 text-4xl font-bold">Blogs</h1>
            <p className="mt-2 max-w-2xl text-white/85">Add website blog posts and review the content that appears on the public blog pages.</p>
          </div>
          <button type="button" onClick={() => { resetForm(); setOpen(true); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-6 font-bold text-blue-700 shadow-xl">
            <Plus size={18} /> Add Blog
          </button>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-2xl font-bold">Blog List</h2>
            <p className="text-slate-500">{items.length} blog{items.length === 1 ? "" : "s"}</p>
          </div>
        </div>
        {!sorted.length ? <p className="p-10 text-center text-sm font-semibold text-slate-400">No blogs added yet.</p> : <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((blog) => <article key={blog.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-slate-100">
              {blog.image_url ? <img src={blog.image_url} alt={blog.title} className="h-full w-full object-cover" /> : <ImageIcon className="text-slate-300" />}
            </div>
            <div className="space-y-4 p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">{formatDate(blog.created_at)}</p>
                <h3 className="mt-2 line-clamp-2 text-xl font-bold">{blog.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">{blog.description}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-500">
                <span className="rounded-xl bg-slate-50 px-2 py-2">{blog.detail_images?.length || 0} images</span>
                <span className="rounded-xl bg-slate-50 px-2 py-2">{blog.steps?.length || 0} steps</span>
                <span className="rounded-xl bg-slate-50 px-2 py-2">{blog.faqs?.length || 0} FAQs</span>
              </div>
              <div className="flex gap-2">
                <a href={`/blogs/${blog.id}`} target="_blank" className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 text-sm font-bold text-white"><BookOpen size={16} /> View</a>
                <button type="button" onClick={() => deleteBlog(blog)} className="flex min-h-10 items-center justify-center rounded-xl bg-red-50 px-4 text-red-600 hover:bg-red-100"><Trash2 size={17} /></button>
              </div>
            </div>
          </article>)}
        </div>}
      </section>
    </div>

    {open && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm">
      <div className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-[1.75rem] bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-gradient-to-r from-blue-800 to-cyan-500 p-6 text-white">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em]">Blog</p>
            <h2 className="mt-1 text-2xl font-bold">Add New Blog</h2>
          </div>
          <button type="button" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20"><X size={20} /></button>
        </div>
        <form onSubmit={saveBlog} className="space-y-5 p-6">
          {error && <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Blog Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} placeholder="How to prepare for deep cleaning" required />
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">Main Blog Image</span>
              <input
                required={!mainImageFile}
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  setMainImageFile(file);
                  setMainImagePreview(file ? URL.createObjectURL(file) : "");
                }}
                className="block h-12 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold file:mr-4 file:rounded-xl file:border-0 file:bg-blue-700 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
              />
            </label>
          </div>
          {mainImagePreview && <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="mb-3 text-sm font-bold text-slate-700">Image Preview</p>
            <img src={mainImagePreview} alt="Blog preview" className="max-h-80 w-full rounded-xl object-contain" />
          </div>}
          <TextArea label="Description" value={form.description} onChange={(value) => setForm({ ...form, description: value })} placeholder="Write the main blog content..." required />
          <TextArea label="Detail Image URLs" value={form.detail_images_text} onChange={(value) => setForm({ ...form, detail_images_text: value })} placeholder="One image URL per line" />

          <DynamicPairs title="Steps" firstLabel="Step Title" secondLabel="Step Description" items={form.steps} onChange={(steps) => setForm({ ...form, steps })} />
          <DynamicPairs title="FAQs" firstLabel="Question" secondLabel="Answer" items={form.faqs.map((faq) => ({ title: faq.question, description: faq.answer }))} onChange={(items) => setForm({ ...form, faqs: items.map((item) => ({ question: item.title, answer: item.description })) })} />

          <div className="sticky bottom-0 -mx-6 -mb-6 flex flex-col gap-3 border-t border-slate-100 bg-white/95 p-5 backdrop-blur sm:flex-row sm:justify-end">
            <button type="button" onClick={() => setOpen(false)} className="h-12 rounded-2xl border border-slate-200 px-7 font-bold text-slate-700">Cancel</button>
            <button disabled={saving} className="h-12 rounded-2xl bg-blue-700 px-9 font-bold text-white shadow-lg shadow-blue-700/20 disabled:opacity-60">{saving ? "Saving..." : "Save Blog"}</button>
          </div>
        </form>
      </div>
    </div>}
  </div>;
}

function Field({ label, value, onChange, placeholder, required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">{label}</span><input required={required} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label>;
}

function TextArea({ label, value, onChange, placeholder, required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">{label}</span><textarea required={required} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={5} className="w-full resize-y rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label>;
}

function DynamicPairs({ title, firstLabel, secondLabel, items, onChange }: { title: string; firstLabel: string; secondLabel: string; items: Array<{ title: string; description: string }>; onChange: (items: Array<{ title: string; description: string }>) => void }) {
  const update = (index: number, key: "title" | "description", value: string) => onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item));
  return <section className="rounded-2xl border border-slate-200 p-4">
    <div className="flex items-center justify-between gap-3">
      <h3 className="font-bold">{title}</h3>
      <button type="button" onClick={() => onChange([...items, { title: "", description: "" }])} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white">Add</button>
    </div>
    <div className="mt-4 space-y-3">
      {items.map((item, index) => <div key={index} className="grid gap-3 rounded-2xl bg-slate-50 p-3 md:grid-cols-[1fr_1.4fr_auto]">
        <Field label={firstLabel} value={item.title} onChange={(value) => update(index, "title", value)} />
        <Field label={secondLabel} value={item.description} onChange={(value) => update(index, "description", value)} />
        <button type="button" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))} className="mt-7 flex h-12 items-center justify-center rounded-xl bg-red-50 px-4 text-red-600"><Trash2 size={17} /></button>
      </div>)}
    </div>
  </section>;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" });
}
