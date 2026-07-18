import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type BookingPayload = Record<string, unknown> & {
  id?: string;
  assigned_cleaner_ids?: string[];
  image?: {
    booking_id: string;
    image_type: "before" | "after";
    url: string;
    storage_path?: string;
    name?: string;
    width?: number;
    height?: number;
    format?: string;
  };
};

function getRole(profile: { role?: unknown } | null) {
  return String(profile?.role || "").toLowerCase();
}

function isStatusOnlyUpdate(body: BookingPayload) {
  return Object.keys(body).every((key) => ["id", "status"].includes(key)) && ["pending", "ongoing", "completed"].includes(String(body.status));
}

async function getPortalUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { allowed: false, supabase, user: null, profile: null };
  const { data: profile } = await supabase.from("users").select("id, name, role, is_blocked").eq("id", user.id).maybeSingle();
  const role = getRole(profile);
  return { allowed: !!profile && !profile.is_blocked && ["admin", "data_entry", "cleaner"].includes(role || ""), supabase, user, profile };
}

function cleanBookingPayload(body: BookingPayload) {
  return {
    full_name: String(body.full_name || "").trim(),
    cleaning_type: String(body.cleaning_type || "").trim(),
    area: String(body.area || "").trim(),
    focus_details: String(body.focus_details || "").trim() || null,
    service_date: String(body.service_date || ""),
    service_time: String(body.service_time || ""),
    full_address: String(body.full_address || "").trim(),
    price: Number(body.price || 0),
    show_price_to_cleaner: Boolean(body.show_price_to_cleaner),
    email: String(body.email || "").trim(),
    phone: String(body.phone || "").trim(),
    added_by: String(body.added_by || "").trim() || null,
    scope_of_work: String(body.scope_of_work || "").trim() || null,
    parking_instructions: String(body.parking_instructions || "").trim() || null,
    status: String(body.status || "pending"),
    start_date: String(body.start_date || "") || null,
    start_time: String(body.start_time || "") || null,
    end_date: String(body.end_date || "") || null,
    end_time: String(body.end_time || "") || null,
    completion_remarks: String(body.completion_remarks || "").trim() || null,
    worked_hours: Number(body.worked_hours || 0),
    hours_approved: Boolean(body.hours_approved),
    approved_hours: Number(body.approved_hours || 0),
  };
}

async function syncAssignments(supabase: Awaited<ReturnType<typeof createClient>>, bookingId: string, cleanerIds: string[], assignedBy: string) {
  await supabase.from("booking_record_assignments").delete().eq("booking_id", bookingId);
  if (!cleanerIds.length) return;
  await supabase.from("booking_record_assignments").insert(cleanerIds.map((cleaner_id) => ({ booking_id: bookingId, cleaner_id, assigned_by: assignedBy })));
}

export async function POST(request: NextRequest) {
  const { allowed, supabase, user, profile } = await getPortalUser();
  if (!allowed || !user) return NextResponse.json({ error: "Portal access required." }, { status: 403 });
  const body = (await request.json()) as BookingPayload;

  if (body.image) {
    const { error } = await supabase.from("booking_record_images").insert({ ...body.image, uploaded_by: user.id });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  if (getRole(profile) === "cleaner") {
    return NextResponse.json({ error: "Cleaners cannot create booking records." }, { status: 403 });
  }

  const payload = cleanBookingPayload(body);
  if (!payload.full_name || !payload.cleaning_type || !payload.area || !payload.service_date || !payload.service_time || !payload.full_address || !payload.email || !payload.phone) {
    return NextResponse.json({ error: "Please fill all required booking fields." }, { status: 400 });
  }

  const { data, error } = await supabase.from("booking_records").insert({ ...payload, added_by_user: user.id, added_by: payload.added_by || profile?.name || "Portal User" }).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  await syncAssignments(supabase, data.id, body.assigned_cleaner_ids || [], user.id);
  return NextResponse.json({ booking: data });
}

export async function PATCH(request: NextRequest) {
  const { allowed, supabase, user, profile } = await getPortalUser();
  if (!allowed || !user) return NextResponse.json({ error: "Portal access required." }, { status: 403 });
  const body = (await request.json()) as BookingPayload;
  if (!body.id) return NextResponse.json({ error: "Booking id is required." }, { status: 400 });
  const role = getRole(profile);

  if (Array.isArray(body.assigned_cleaner_ids) && Object.keys(body).length <= 2) {
    if (role !== "admin") return NextResponse.json({ error: "Only admin can assign cleaners." }, { status: 403 });
    await syncAssignments(supabase, body.id, body.assigned_cleaner_ids, user.id);
    return NextResponse.json({ ok: true });
  }

  if (role === "cleaner") {
    if (!isStatusOnlyUpdate(body)) {
      return NextResponse.json({ error: "Cleaners can only update booking status." }, { status: 403 });
    }
    const { error } = await supabase.from("booking_records").update({ status: body.status }).eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  const payload = cleanBookingPayload(body);
  const { error } = await supabase.from("booking_records").update(payload).eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (Array.isArray(body.assigned_cleaner_ids)) {
    if (role !== "admin") return NextResponse.json({ error: "Only admin can assign cleaners." }, { status: 403 });
    await syncAssignments(supabase, body.id, body.assigned_cleaner_ids, user.id);
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const { allowed, supabase, profile } = await getPortalUser();
  if (!allowed) return NextResponse.json({ error: "Portal access required." }, { status: 403 });
  const params = new URL(request.url).searchParams;
  const imageId = params.get("imageId");
  if (imageId) {
    const { error } = await supabase.from("booking_record_images").delete().eq("id", imageId);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }
  if (getRole(profile) !== "admin") return NextResponse.json({ error: "Only admin can delete booking records." }, { status: 403 });
  const id = params.get("id");
  if (!id) return NextResponse.json({ error: "Booking id is required." }, { status: 400 });
  const { error } = await supabase.from("booking_records").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
