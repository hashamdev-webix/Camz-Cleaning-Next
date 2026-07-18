import { NextRequest, NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

type UserPayload = {
  name?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  role?: string;
  source?: string;
  approval_status?: string;
  is_available?: boolean;
  offering_fixed?: boolean;
  offering_hourly?: boolean;
  hourly_rate?: string;
};

const allowedRoles = new Set(["admin", "customer", "cleaner", "data_entry"]);

async function authorizeAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  const { data: profile } = await supabase.from("users").select("role, is_blocked").eq("id", user.id).maybeSingle();
  return profile?.role?.toLowerCase() === "admin" && profile.is_blocked === false;
}

function getServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return null;
  return createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(request: NextRequest) {
  if (!(await authorizeAdmin())) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  const admin = getServiceClient();
  if (!admin) return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY is not configured on the server." }, { status: 503 });

  const body = (await request.json()) as UserPayload;
  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const password = body.password || "";
  const phone = body.phone_number?.trim();
  const role = body.role?.trim().toLowerCase() || "cleaner";

  if (!name || !email || !phone || !password) return NextResponse.json({ error: "Name, email, phone, and password are required." }, { status: 400 });
  if (password.length < 6) return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  if (!allowedRoles.has(role)) return NextResponse.json({ error: "Selected role is not allowed." }, { status: 400 });

  const { data: authData, error: authError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, role },
  });
  if (authError || !authData.user) return NextResponse.json({ error: authError?.message || "Unable to create login account." }, { status: 400 });

  const profile = {
    id: authData.user.id,
    name,
    email,
    role,
    phone_number: phone,
    approval_status: body.approval_status || "approved",
    is_blocked: false,
    source: body.source || "Web",
    verified: role === "cleaner" ? false : true,
    is_available: role === "cleaner" ? Boolean(body.is_available) : false,
    is_online: false,
    is_working: false,
    offering_fixed: role === "cleaner" ? body.offering_fixed ?? true : false,
    offering_hourly: role === "cleaner" ? Boolean(body.offering_hourly) : false,
    hourly_rate: role === "cleaner" ? body.hourly_rate || "0" : "0",
  };

  const { error: profileError } = await admin.from("users").upsert(profile, { onConflict: "id" });
  if (profileError) {
    await admin.auth.admin.deleteUser(authData.user.id);
    if (profileError.message.includes("invalid input value for enum user_role")) {
      return NextResponse.json({ error: "The data_entry role is missing from the Supabase user_role enum. Run: alter type public.user_role add value if not exists 'data_entry';" }, { status: 400 });
    }
    return NextResponse.json({ error: profileError.message }, { status: 400 });
  }

  return NextResponse.json({ id: authData.user.id });
}

export async function PATCH(request: NextRequest) {
  if (!(await authorizeAdmin())) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  const admin = getServiceClient();
  if (!admin) return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY is not configured on the server." }, { status: 503 });

  const body = (await request.json()) as UserPayload & { id?: string; is_blocked?: boolean };
  if (!body.id) return NextResponse.json({ error: "User id is required." }, { status: 400 });

  const updates: Record<string, string | boolean> = {};
  if (typeof body.is_blocked === "boolean") updates.is_blocked = body.is_blocked;
  if (body.approval_status) updates.approval_status = body.approval_status;
  if (!Object.keys(updates).length) return NextResponse.json({ error: "No user changes were provided." }, { status: 400 });

  const { error } = await admin.from("users").update(updates).eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
