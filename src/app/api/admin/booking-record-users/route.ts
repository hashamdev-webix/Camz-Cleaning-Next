import { NextRequest, NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

type OperationalRole = "cleaner" | "data_entry";

type UserPayload = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  role?: string;
  source?: string;
  approval_status?: string;
  is_blocked?: boolean;
  is_available?: boolean;
  offering_fixed?: boolean;
  offering_hourly?: boolean;
  hourly_rate?: string;
};

const OPERATIONAL_ROLES = new Set<OperationalRole>(["cleaner", "data_entry"]);
const APPROVAL_STATUSES = new Set(["approved", "pending", "rejected"]);

async function getAdminActor(): Promise<{ id: string; role: string } | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("role, is_blocked")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.is_blocked === true) return null;

  const role = String(profile.role || "").toLowerCase();
  if (role !== "admin") return null;

  return { id: user.id, role };
}

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) return null;

  return createAdminClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function missingAdminKey() {
  return NextResponse.json(
    {
      error:
        "Supabase admin key is not configured. Add SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY) to Vercel server environment variables and redeploy.",
    },
    { status: 503 },
  );
}

function normalizeOperationalRole(value?: string): OperationalRole | null {
  const role = String(value || "cleaner").trim().toLowerCase();
  return OPERATIONAL_ROLES.has(role as OperationalRole)
    ? (role as OperationalRole)
    : null;
}

export async function POST(request: NextRequest) {
  const actor = await getAdminActor();
  if (!actor) {
    return NextResponse.json(
      { error: "Admin access required." },
      { status: 403 },
    );
  }

  const admin = getAdminClient();
  if (!admin) return missingAdminKey();

  const body = (await request.json()) as UserPayload;
  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const phone = body.phone_number?.trim();
  const password = body.password || "";
  const role = normalizeOperationalRole(body.role);
  const approvalStatus =
    body.approval_status?.trim().toLowerCase() || "approved";
  const source = body.source?.trim() || "Web";

  if (!name || !email || !phone || !password) {
    return NextResponse.json(
      { error: "Name, email, phone, and password are required." },
      { status: 400 },
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters." },
      { status: 400 },
    );
  }

  if (!role) {
    return NextResponse.json(
      { error: "Booking users can only be Cleaner or Data Entry." },
      { status: 400 },
    );
  }

  if (!APPROVAL_STATUSES.has(approvalStatus)) {
    return NextResponse.json(
      { error: "Invalid approval status." },
      { status: 400 },
    );
  }

  // Provide complete metadata so existing auth.users -> public.users triggers
  // receive the same fields that normal signup supplies.
  const metadata = {
    name,
    full_name: name,
    email,
    phone_number: phone,
    phone,
    role,
    source,
    approval_status: approvalStatus,
    is_available: role === "cleaner" ? Boolean(body.is_available) : false,
    offering_fixed:
      role === "cleaner" ? body.offering_fixed ?? true : false,
    offering_hourly:
      role === "cleaner" ? Boolean(body.offering_hourly) : false,
    hourly_rate: role === "cleaner" ? body.hourly_rate || "0" : "0",
  };

  const { data: authData, error: authError } =
    await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: metadata,
    });

  if (authError || !authData.user) {
    return NextResponse.json(
      { error: authError?.message || "Unable to create user." },
      { status: 400 },
    );
  }

  const profile = {
    id: authData.user.id,
    name,
    email,
    phone_number: phone,
    role,
    approval_status: approvalStatus,
    source,
    is_blocked: false,
    verified: role === "cleaner" ? false : true,
    is_online: false,
    is_available: role === "cleaner" ? Boolean(body.is_available) : false,
    is_working: false,
    offering_fixed:
      role === "cleaner" ? body.offering_fixed ?? true : false,
    offering_hourly:
      role === "cleaner" ? Boolean(body.offering_hourly) : false,
    hourly_rate: role === "cleaner" ? body.hourly_rate || "0" : "0",
  };

  const { error: profileError } = await admin
    .from("users")
    .upsert(profile, { onConflict: "id" });

  if (profileError) {
    await admin.auth.admin.deleteUser(authData.user.id);
    return NextResponse.json(
      { error: profileError.message },
      { status: 400 },
    );
  }

  return NextResponse.json({ id: authData.user.id, user: profile });
}

export async function PATCH(request: NextRequest) {
  const actor = await getAdminActor();
  if (!actor) {
    return NextResponse.json(
      { error: "Admin access required." },
      { status: 403 },
    );
  }

  const admin = getAdminClient();
  if (!admin) return missingAdminKey();

  const body = (await request.json()) as UserPayload;
  if (!body.id) {
    return NextResponse.json(
      { error: "User id is required." },
      { status: 400 },
    );
  }

  const { data: existing, error: existingError } = await admin
    .from("users")
    .select(
      "id, name, email, phone_number, role, approval_status, source, is_blocked, is_available, offering_fixed, offering_hourly, hourly_rate",
    )
    .eq("id", body.id)
    .maybeSingle();

  if (existingError) {
    return NextResponse.json(
      { error: existingError.message },
      { status: 400 },
    );
  }

  if (!existing) {
    return NextResponse.json(
      { error: "User not found." },
      { status: 404 },
    );
  }

  if (!OPERATIONAL_ROLES.has(String(existing.role).toLowerCase() as OperationalRole)) {
    return NextResponse.json(
      { error: "Only Cleaner and Data Entry users can be managed here." },
      { status: 400 },
    );
  }

  const role = body.role
    ? normalizeOperationalRole(body.role)
    : (String(existing.role).toLowerCase() as OperationalRole);

  if (!role) {
    return NextResponse.json(
      { error: "Booking users can only be Cleaner or Data Entry." },
      { status: 400 },
    );
  }

  const approvalStatus = body.approval_status
    ? body.approval_status.trim().toLowerCase()
    : String(existing.approval_status || "approved");

  if (!APPROVAL_STATUSES.has(approvalStatus)) {
    return NextResponse.json(
      { error: "Invalid approval status." },
      { status: 400 },
    );
  }

  const name = body.name?.trim() || String(existing.name || "");
  const email = body.email?.trim().toLowerCase() || String(existing.email || "");
  const phone =
    typeof body.phone_number === "string"
      ? body.phone_number.trim()
      : String(existing.phone_number || "");
  const source = body.source?.trim() || String(existing.source || "Web");

  const updates = {
    name,
    email,
    phone_number: phone,
    role,
    approval_status: approvalStatus,
    source,
    is_blocked:
      typeof body.is_blocked === "boolean"
        ? body.is_blocked
        : Boolean(existing.is_blocked),
    is_available:
      role === "cleaner"
        ? typeof body.is_available === "boolean"
          ? body.is_available
          : Boolean(existing.is_available)
        : false,
    offering_fixed:
      role === "cleaner"
        ? typeof body.offering_fixed === "boolean"
          ? body.offering_fixed
          : Boolean(existing.offering_fixed)
        : false,
    offering_hourly:
      role === "cleaner"
        ? typeof body.offering_hourly === "boolean"
          ? body.offering_hourly
          : Boolean(existing.offering_hourly)
        : false,
    hourly_rate:
      role === "cleaner"
        ? body.hourly_rate ?? String(existing.hourly_rate ?? "0")
        : "0",
  };

  const authChanges: {
    email?: string;
    password?: string;
    user_metadata: Record<string, unknown>;
  } = {
    user_metadata: {
      name,
      full_name: name,
      phone_number: phone,
      phone,
      role,
      approval_status: approvalStatus,
      source,
    },
  };

  if (email) authChanges.email = email;

  if (body.password) {
    if (body.password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 },
      );
    }
    authChanges.password = body.password;
  }

  const { error: authError } = await admin.auth.admin.updateUserById(
    body.id,
    authChanges,
  );

  if (authError) {
    return NextResponse.json(
      { error: authError.message },
      { status: 400 },
    );
  }

  const { error: profileError } = await admin
    .from("users")
    .update(updates)
    .eq("id", body.id);

  if (profileError) {
    return NextResponse.json(
      { error: profileError.message },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const actor = await getAdminActor();
  if (!actor) {
    return NextResponse.json(
      { error: "Admin access required." },
      { status: 403 },
    );
  }

  const admin = getAdminClient();
  if (!admin) return missingAdminKey();

  const id = request.nextUrl.searchParams.get("id")?.trim();
  if (!id) {
    return NextResponse.json(
      { error: "User id is required." },
      { status: 400 },
    );
  }

  if (id === actor.id) {
    return NextResponse.json(
      { error: "You cannot delete your own admin account." },
      { status: 400 },
    );
  }

  const { data: target, error: targetError } = await admin
    .from("users")
    .select("id, role")
    .eq("id", id)
    .maybeSingle();

  if (targetError) {
    return NextResponse.json(
      { error: targetError.message },
      { status: 400 },
    );
  }

  if (!target) {
    return NextResponse.json(
      { error: "User not found." },
      { status: 404 },
    );
  }

  if (!OPERATIONAL_ROLES.has(String(target.role).toLowerCase() as OperationalRole)) {
    return NextResponse.json(
      { error: "Only Cleaner and Data Entry users can be deleted here." },
      { status: 400 },
    );
  }

  const { error: assignmentError } = await admin
    .from("booking_record_assignments")
    .delete()
    .eq("cleaner_id", id);

  if (assignmentError) {
    return NextResponse.json(
      { error: assignmentError.message },
      { status: 400 },
    );
  }

  // Keep historical booking rows; only detach the deleted Data Entry user.
  const { error: bookingOwnerError } = await admin
    .from("booking_records")
    .update({ added_by_user: null })
    .eq("added_by_user", id);

  if (bookingOwnerError) {
    return NextResponse.json(
      { error: bookingOwnerError.message },
      { status: 400 },
    );
  }

  const { error: authError } = await admin.auth.admin.deleteUser(id);
  if (authError) {
    return NextResponse.json(
      { error: authError.message },
      { status: 400 },
    );
  }

  // If auth deletion did not cascade the public profile, remove it explicitly.
  const { error: profileError } = await admin
    .from("users")
    .delete()
    .eq("id", id);

  if (profileError) {
    return NextResponse.json(
      { error: profileError.message },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
