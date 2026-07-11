import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type PairPayload = {
  before_image_url?: string;
  after_image_url?: string;
};

async function authorizeAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { allowed: false, supabase, userId: "" };
  const { data: profile } = await supabase.from("users").select("role, is_blocked").eq("id", user.id).maybeSingle();
  return { allowed: profile?.role?.toLowerCase() === "admin" && profile.is_blocked === false, supabase, userId: user.id };
}

export async function POST(request: NextRequest) {
  const { allowed, supabase, userId } = await authorizeAdmin();
  if (!allowed) return NextResponse.json({ error: "Admin access required." }, { status: 403 });

  const body = (await request.json()) as PairPayload;
  if (!body.before_image_url || !body.after_image_url) {
    return NextResponse.json({ error: "Both before and after image URLs are required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("before_after_pairs")
    .insert({
      before_image_url: body.before_image_url,
      after_image_url: body.after_image_url,
      created_by: userId,
      created_by_role: "admin",
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ id: data.id });
}

export async function DELETE(request: NextRequest) {
  const { allowed, supabase } = await authorizeAdmin();
  if (!allowed) return NextResponse.json({ error: "Admin access required." }, { status: 403 });

  const params = new URL(request.url).searchParams;
  if (params.get("all") === "true") {
    const { error } = await supabase.from("before_after_pairs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  const id = params.get("id");
  if (!id) return NextResponse.json({ error: "Pair id is required." }, { status: 400 });
  const { error } = await supabase.from("before_after_pairs").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
