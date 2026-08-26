import BookingClient, {
  type Category,
  type Service,
} from "@/components/booking/BookingClient";

import { createPublicServerClient } from "@/lib/supabase/public-server";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Book a Cleaning Service Online | Camz Cleaning",
  description:
    "Choose a Camz Cleaning service, enter the property or vehicle details and request your preferred appointment online.",
  path: "/booking/",
});

export const revalidate = 300;

export default async function BookingPage() {
  const supabase = createPublicServerClient();

  const [categoryResult, serviceResult] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, icon_str, color_hex, type")
      .order("created_at", { ascending: true }),

    supabase
      .from("services")
      .select(
        "id, category_id, title, description, price, icon_str, pricing_type, service_type, is_active, has_addons, tax_rate",
      )
      .eq("is_active", true)
      .order("created_at", { ascending: true }),
  ]);

  if (categoryResult.error) throw categoryResult.error;
  if (serviceResult.error) throw serviceResult.error;

  return (
    <BookingClient
      categories={(categoryResult.data ?? []) as Category[]}
      services={(serviceResult.data ?? []) as Service[]}
    />
  );
}