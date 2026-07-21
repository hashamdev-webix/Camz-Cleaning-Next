"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { Download, ImagePlus, Trash2, Upload, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { optimizeImageForUpload, uploadImageToBucket } from "@/lib/images/upload";

export type BeforeAfterPair = {
  id: string;
  before_image_url: string;
  after_image_url: string | null;
  created_at: string;
  updated_at: string | null;
  created_by: string | null;
  created_by_role: string | null;
};

type LoadedImage = {
  data: Uint8Array;
  width: number;
  height: number;
};

type DraftImage = {
  file: File;
  preview: string;
};

const pageWidth = 842;
const pageHeight = 595;

export default function BeforeAfterManagement({ pairs }: { pairs: BeforeAfterPair[] }) {
  const router = useRouter();
  const beforeInput = useRef<HTMLInputElement>(null);
  const afterInput = useRef<HTMLInputElement>(null);
  const attachAfterInput = useRef<HTMLInputElement>(null);
  const [beforeFiles, setBeforeFiles] = useState<DraftImage[]>([]);
  const [afterFiles, setAfterFiles] = useState<DraftImage[]>([]);
  const [attachingPairId, setAttachingPairId] = useState("");
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [savingMessage, setSavingMessage] = useState("");

  const pickImage = (side: "before" | "after") => (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const drafts = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    if (side === "before") {
      setBeforeFiles((current) => [...current, ...drafts]);
    } else {
      setAfterFiles((current) => [...current, ...drafts]);
    }
    event.target.value = "";
  };

  const clearDraft = () => {
    beforeFiles.forEach((image) => URL.revokeObjectURL(image.preview));
    afterFiles.forEach((image) => URL.revokeObjectURL(image.preview));
    setBeforeFiles([]);
    setAfterFiles([]);
    setError("");
    if (beforeInput.current) beforeInput.current.value = "";
    if (afterInput.current) afterInput.current.value = "";
  };

  const removeDraft = (side: "before" | "after", index: number) => {
    const removeFrom = side === "before" ? beforeFiles : afterFiles;
    URL.revokeObjectURL(removeFrom[index].preview);
    if (side === "before") setBeforeFiles((current) => current.filter((_, itemIndex) => itemIndex !== index));
    else setAfterFiles((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const uploadImage = async (file: File, side: "before" | "after") => {
    const supabase = createClient();
    const optimized = await optimizeImageForUpload(file);
    const extension = optimized.name.split(".").pop() || "jpg";
    const path = `before_after_gallery/${side}_${Date.now()}_${crypto.randomUUID()}.${extension}`;
    return uploadImageToBucket(supabase, "job-images", path, optimized);
  };

  const saveImages = async () => {
    if (!beforeFiles.length) {
      setError("Please add at least one before image.");
      return;
    }
    if (afterFiles.length > 0 && beforeFiles.length !== afterFiles.length) {
      setError("Before and after counts must match when saving matched pairs. You can also clear after drafts and save before images only.");
      return;
    }
    setSaving(true);
    setError("");
    setSavingMessage("Preparing images...");
    try {
      const uploadedPairs = [];
      for (const [index, beforeImage] of beforeFiles.entries()) {
        setSavingMessage(`Uploading before image ${index + 1} of ${beforeFiles.length}...`);
        const beforeUrl = await uploadImage(beforeImage.file, "before");
        let afterUrl = null;
        if (afterFiles[index]) {
          setSavingMessage(`Uploading after image ${index + 1} of ${afterFiles.length}...`);
          afterUrl = await uploadImage(afterFiles[index].file, "after");
        }
        uploadedPairs.push({ before_image_url: beforeUrl, after_image_url: afterUrl });
      }
      for (const [index, pair] of uploadedPairs.entries()) {
        setSavingMessage(`Saving record ${index + 1} of ${uploadedPairs.length}...`);
        const response = await fetch("/api/admin/before-after", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pair),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Unable to save pair.");
      }
      clearDraft();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save pair.");
    } finally {
      setSaving(false);
      setSavingMessage("");
    }
  };

  const pickAfterForSavedPair = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !attachingPairId) return;
    setSaving(true);
    setError("");
    setSavingMessage("Uploading after image...");
    try {
      const afterUrl = await uploadImage(file, "after");
      const response = await fetch("/api/admin/before-after", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: attachingPairId, after_image_url: afterUrl }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to attach after image.");
      setAttachingPairId("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to attach after image.");
    } finally {
      setSaving(false);
      setSavingMessage("");
    }
  };

  const removePair = async (id: string) => {
    if (!window.confirm("Delete this before/after pair?")) return;
    const response = await fetch(`/api/admin/before-after?id=${id}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) {
      window.alert(result.error || "Unable to delete pair.");
      return;
    }
    router.refresh();
  };

  const clearAll = async () => {
    if (!pairs.length) return;
    if (!window.confirm("Delete all saved before/after pairs?")) return;
    const response = await fetch("/api/admin/before-after?all=true", { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) {
      window.alert(result.error || "Unable to clear pairs.");
      return;
    }
    router.refresh();
  };

  const downloadPdf = async () => {
    if (!pairs.length) return;
    setDownloading(true);
    setError("");
    try {
      const pdf = await createBeforeAfterPdf(pairs);
      const url = URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "camz-before-after-gallery.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to download PDF.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] px-4 py-7 text-white sm:px-7 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold text-[#4A86F7]">Compare Gallery</p>
            <h1 className="mt-2 text-4xl font-bold leading-tight">Before<br />After</h1>
            <p className="mt-3 max-w-xs text-lg font-semibold text-slate-400">Before and after images from all users.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={clearAll} disabled={!pairs.length} className="min-h-12 rounded-xl bg-red-500 px-5 font-bold text-white hover:bg-red-600 disabled:opacity-50">
              Clear All
            </button>
            <button type="button" onClick={downloadPdf} disabled={!pairs.length || downloading} className="flex min-h-12 items-center gap-2 rounded-xl bg-slate-500 px-5 font-bold text-white hover:bg-slate-600 disabled:opacity-50">
              <Download size={18} /> {downloading ? "Preparing..." : "Download PDF"}
            </button>
          </div>
        </header>

        {error && <p className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}

        <section className="mt-8 rounded-3xl border border-white/10 bg-[#0B162B] p-5 shadow-2xl shadow-black/20 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-xl font-bold">Upload New Images</h2>
              <p className="mt-1 text-sm text-slate-400">Save before images now, then attach after images later when the job is finished.</p>
            </div>
            <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => beforeInput.current?.click()} className="flex min-h-12 items-center gap-2 rounded-xl bg-[#2563EB] px-5 font-bold text-white hover:bg-blue-700">
              <ImagePlus size={18} /> Add Before ({beforeFiles.length})
            </button>
            <button type="button" onClick={() => afterInput.current?.click()} disabled={!beforeFiles.length} className="flex min-h-12 items-center gap-2 rounded-xl bg-slate-700 px-5 font-bold text-white hover:bg-slate-600 disabled:opacity-50">
              <ImagePlus size={18} /> Add After ({afterFiles.length})
            </button>
            <button type="button" onClick={saveImages} disabled={saving || !beforeFiles.length || (afterFiles.length > 0 && beforeFiles.length !== afterFiles.length)} className="flex min-h-12 items-center gap-2 rounded-xl bg-emerald-600 px-5 font-bold text-white hover:bg-emerald-700 disabled:opacity-50">
              <Upload size={18} /> {saving ? "Uploading..." : afterFiles.length ? `Save ${beforeFiles.length} Pair${beforeFiles.length === 1 ? "" : "s"}` : `Save ${beforeFiles.length} Before${beforeFiles.length === 1 ? "" : "s"}`}
            </button>
            {(beforeFiles.length > 0 || afterFiles.length > 0) && (
              <button type="button" onClick={clearDraft} className="flex min-h-12 items-center gap-2 rounded-xl bg-white/10 px-4 font-bold text-slate-300 hover:text-white">
                <X size={18} /> Clear Draft
              </button>
            )}
            </div>
          </div>
          <input ref={beforeInput} type="file" multiple accept="image/*" onChange={pickImage("before")} className="hidden" />
          <input ref={afterInput} type="file" multiple accept="image/*" onChange={pickImage("after")} className="hidden" />
          <input ref={attachAfterInput} type="file" accept="image/*" onChange={pickAfterForSavedPair} className="hidden" />
          {savingMessage && <p className="mt-4 rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold text-cyan-200">{savingMessage}</p>}
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <ImageDrop label="Before" images={beforeFiles} emptyText="Add before images" onClick={() => beforeInput.current?.click()} onRemove={(index) => removeDraft("before", index)} />
            <ImageDrop label="After" images={afterFiles} emptyText={beforeFiles.length ? "Add after images" : "Add before images first"} onClick={() => beforeFiles.length && afterInput.current?.click()} onRemove={(index) => removeDraft("after", index)} />
          </div>
          {afterFiles.length > 0 && beforeFiles.length !== afterFiles.length && <p className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm font-semibold text-amber-200">Before and after counts must match to save pairs. To save before images only, remove after drafts first.</p>}
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Saved Gallery Pairs</h2>
          <div className="mt-5 grid gap-5 xl:grid-cols-2">
            {pairs.map((pair, index) => (
              <article key={pair.id} className="rounded-3xl border border-white/10 bg-[#0B162B] p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Pair {pairs.length - index}</h3>
                  <div className="flex items-center gap-2">
                    {!pair.after_image_url && <button type="button" onClick={() => { setAttachingPairId(pair.id); attachAfterInput.current?.click(); }} className="min-h-10 rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50" disabled={saving}>Add After</button>}
                  <button type="button" aria-label={`Delete pair ${pairs.length - index}`} onClick={() => removePair(pair.id)} className="flex h-11 w-11 items-center justify-center rounded-full text-red-400 hover:bg-red-500/10">
                    <Trash2 size={22} />
                  </button>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <SavedImage label="Before" tone="text-red-400" src={pair.before_image_url} />
                  <SavedImage label="After" tone="text-green-400" src={pair.after_image_url} emptyText="After image pending" />
                </div>
                <p className="mt-4 text-xs text-slate-500">{new Date(pair.created_at).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" })}</p>
              </article>
            ))}
            {!pairs.length && <p className="rounded-3xl border border-white/10 bg-[#0B162B] p-12 text-center text-slate-500 xl:col-span-2">No saved before/after pairs yet.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}

function ImageDrop({ label, images, emptyText, onClick, onRemove }: { label: string; images: DraftImage[]; emptyText: string; onClick: () => void; onRemove: (index: number) => void }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-300">{images.length} selected</span>
      </div>
      <button type="button" onClick={onClick} className="flex min-h-36 w-full items-center justify-center rounded-2xl border border-dashed border-blue-400/40 bg-[#030712] px-4 py-6 text-slate-400 transition hover:border-blue-300 hover:bg-blue-500/5">
        <span className="flex flex-col items-center gap-2 text-sm font-bold"><ImagePlus size={34} /> {emptyText}</span>
      </button>
      {!!images.length && <div className="mt-4 grid max-h-[360px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
        {images.map((image, index) => (
          <div key={image.preview} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#020817]">
            <div className="flex h-44 items-center justify-center p-2">
              <img src={image.preview} alt={`${label} preview ${index + 1}`} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="border-t border-white/10 px-3 py-2">
              <p className="truncate text-xs font-semibold text-slate-300">{image.file.name}</p>
              <p className="mt-1 text-[11px] text-slate-500">{formatBytes(image.file.size)}</p>
            </div>
            <button type="button" aria-label={`Remove ${label} image ${index + 1}`} onClick={() => onRemove(index)} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white opacity-100 transition hover:bg-red-500 sm:opacity-0 sm:group-hover:opacity-100">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>}
    </div>
  );
}

function SavedImage({ label, tone, src, emptyText }: { label: string; tone: string; src: string | null; emptyText?: string }) {
  return (
    <div>
      <p className={`mb-3 font-bold ${tone}`}>{label}</p>
      {src ? <a href={src} target="_blank" className="flex h-80 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[#030712] p-2">
        {/* eslint-disable-next-line @next/next/no-img-element -- Public gallery images should display exactly as stored and never be cropped by an optimizer. */}
        <img src={src} alt={`${label} image`} className="max-h-full max-w-full object-contain" />
      </a> : <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#030712] p-6 text-center text-sm font-bold text-slate-500">{emptyText || "Image pending"}</div>}
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function loadImage(url: string): Promise<LoadedImage> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Unable to load image for PDF: ${url}`));
    img.src = url;
  });
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to prepare image for PDF.");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0);
  const binary = atob(canvas.toDataURL("image/jpeg", 0.95).split(",")[1]);
  const data = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) data[index] = binary.charCodeAt(index);
  return { data, width: image.naturalWidth, height: image.naturalHeight };
}

async function createBeforeAfterPdf(pairs: BeforeAfterPair[]) {
  const loadedPairs = await Promise.all(pairs.map(async (pair) => ({
    before: await loadImage(pair.before_image_url),
    after: pair.after_image_url ? await loadImage(pair.after_image_url) : null,
  })));
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [0];
  let length = 0;
  let objectNumber = 1;
  const pageObjects: number[] = [];

  const push = (chunk: Uint8Array | string) => {
    const data = typeof chunk === "string" ? encoder.encode(chunk) : chunk;
    chunks.push(data);
    length += data.length;
  };
  const addObject = (body: (id: number) => void) => {
    const id = objectNumber;
    objectNumber += 1;
    offsets[id] = length;
    push(`${id} 0 obj\n`);
    body(id);
    push("\nendobj\n");
    return id;
  };

  push("%PDF-1.4\n");
  const catalogId = addObject(() => push("<< /Type /Catalog /Pages 2 0 R >>"));
  const pagesId = objectNumber;
  objectNumber += 1;

  loadedPairs.forEach((pair, index) => {
    const beforeId = addImageObject(addObject, push, pair.before);
    const afterId = pair.after ? addImageObject(addObject, push, pair.after) : null;
    const content = pageContent(index + 1, beforeId, afterId, pair.before, pair.after);
    const contentId = addObject(() => {
      const data = encoder.encode(content);
      push(`<< /Length ${data.length} >>\nstream\n`);
      push(data);
      push("\nendstream");
    });
    const xObjects = afterId ? `/Im${beforeId} ${beforeId} 0 R /Im${afterId} ${afterId} 0 R` : `/Im${beforeId} ${beforeId} 0 R`;
    const pageId = addObject(() => push(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << ${xObjects} >> /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> >> >> /Contents ${contentId} 0 R >>`));
    pageObjects.push(pageId);
  });

  offsets[pagesId] = length;
  push(`${pagesId} 0 obj\n<< /Type /Pages /Kids [${pageObjects.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageObjects.length} >>\nendobj\n`);
  const xrefAt = length;
  push(`xref\n0 ${objectNumber}\n0000000000 65535 f \n`);
  for (let id = 1; id < objectNumber; id += 1) push(`${String(offsets[id]).padStart(10, "0")} 00000 n \n`);
  push(`trailer\n<< /Size ${objectNumber} /Root ${catalogId} 0 R >>\nstartxref\n${xrefAt}\n%%EOF`);

  const output = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.length;
  }
  return output;
}

function addImageObject(addObject: (body: (id: number) => void) => number, push: (chunk: Uint8Array | string) => void, image: LoadedImage) {
  return addObject(() => {
    push(`<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.data.length} >>\nstream\n`);
    push(image.data);
    push("\nendstream");
  });
}

function pageContent(pairNumber: number, beforeId: number, afterId: number | null, before: LoadedImage, after: LoadedImage | null) {
  const beforeFit = fitImage(before, 54, 95, 350, 430);
  const afterFit = after ? fitImage(after, 438, 95, 350, 430) : null;
  const commands = [
    "0.07 0.10 0.18 rg 0 0 842 595 re f",
    "1 1 1 rg BT /F1 24 Tf 54 548 Td (Camz Before / After Gallery) Tj ET",
    `0.55 0.65 0.85 rg BT /F1 12 Tf 54 528 Td (Pair ${pairNumber}) Tj ET`,
    "0.95 0.25 0.25 rg BT /F1 18 Tf 54 500 Td (Before) Tj ET",
    "0.25 0.75 0.35 rg BT /F1 18 Tf 438 500 Td (After) Tj ET",
    "0.02 0.04 0.09 rg 54 95 350 390 re f",
    "0.02 0.04 0.09 rg 438 95 350 390 re f",
    `q ${beforeFit.width} 0 0 ${beforeFit.height} ${beforeFit.x} ${beforeFit.y} cm /Im${beforeId} Do Q`,
  ];
  if (afterFit && afterId) commands.push(`q ${afterFit.width} 0 0 ${afterFit.height} ${afterFit.x} ${afterFit.y} cm /Im${afterId} Do Q`);
  else commands.push("0.55 0.65 0.85 rg BT /F1 18 Tf 530 285 Td (After image pending) Tj ET");
  return commands.join("\n");
}

function fitImage(image: LoadedImage, boxX: number, boxY: number, boxWidth: number, boxHeight: number) {
  const scale = Math.min(boxWidth / image.width, boxHeight / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  return {
    width,
    height,
    x: boxX + (boxWidth - width) / 2,
    y: boxY + (boxHeight - height) / 2,
  };
}
