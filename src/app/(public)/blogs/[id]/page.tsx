import { notFound } from "next/navigation";
import BlogDetailsClient, {
  type Blog,
} from "@/components/blog/BlogDetailsClient";
import { createPublicServerClient } from "@/lib/supabase/public-server";

export const revalidate = 300;

export async function generateStaticParams() {
  const supabase = createPublicServerClient();
  const { data } = await supabase.from("blogs").select("id");
  return (data ?? []).map(({ id }) => ({ id }));
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createPublicServerClient();
  const [blogResult, recentResult] = await Promise.all([
    supabase
      .from("blogs")
      .select(
        "id, title, description, image_url, created_at, faqs, steps, detail_images",
      )
      .eq("id", id)
      .maybeSingle(),
    supabase
      .from("blogs")
      .select(
        "id, title, description, image_url, created_at, faqs, steps, detail_images",
      )
      .neq("id", id)
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  if (blogResult.error) throw blogResult.error;
  if (recentResult.error) throw recentResult.error;
  if (!blogResult.data) notFound();

  return (
    <BlogDetailsClient
      blog={blogResult.data as Blog}
      recentPosts={(recentResult.data ?? []) as Blog[]}
    />
  );
}
