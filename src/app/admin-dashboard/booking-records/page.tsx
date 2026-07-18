import BookingRecordsPortal, { type BookingImage, type BookingRecord, type CleanerUser } from "@/components/admin/booking-records/BookingRecordsPortal";
import { createClient } from "@/lib/supabase/server";

export default async function BookingRecordsPage() {
  const supabase = await createClient();
  const [{ data: records }, { data: assignments }, { data: images }, { data: cleaners }, { data: profileResult }] = await Promise.all([
    supabase.from("booking_records").select("*").order("service_date", { ascending: false }).order("service_time", { ascending: false }),
    supabase.from("booking_record_assignments").select("booking_id, cleaner_id"),
    supabase.from("booking_record_images").select("*").order("uploaded_at", { ascending: true }),
    supabase.from("users").select("id, name, email, role").eq("role", "cleaner").order("name", { ascending: true }),
    supabase.auth.getUser(),
  ]);

  const cleanerMap = new Map((cleaners || []).map((cleaner) => [cleaner.id, cleaner]));
  const assignmentsByBooking = new Map<string, CleanerUser[]>();
  for (const assignment of assignments || []) {
    const cleaner = cleanerMap.get(assignment.cleaner_id);
    if (!cleaner) continue;
    const list = assignmentsByBooking.get(assignment.booking_id) || [];
    list.push({ id: cleaner.id, name: cleaner.name || "Cleaner", email: cleaner.email || "" });
    assignmentsByBooking.set(assignment.booking_id, list);
  }

  const imagesByBooking = new Map<string, BookingImage[]>();
  for (const image of images || []) {
    const list = imagesByBooking.get(image.booking_id) || [];
    list.push(image as BookingImage);
    imagesByBooking.set(image.booking_id, list);
  }

  const currentUser = profileResult.user
    ? await supabase.from("users").select("id, name, role").eq("id", profileResult.user.id).maybeSingle()
    : { data: null };

  const bookings = (records || []).map((record) => ({
    ...record,
    assigned_cleaners: assignmentsByBooking.get(record.id) || [],
    service_images: imagesByBooking.get(record.id) || [],
  })) as BookingRecord[];

  return <BookingRecordsPortal bookings={bookings} cleaners={(cleaners || []).map((cleaner) => ({ id: cleaner.id, name: cleaner.name || "Cleaner", email: cleaner.email || "" }))} currentUser={currentUser.data ? { id: currentUser.data.id, name: currentUser.data.name || "Portal User", role: currentUser.data.role || "" } : null} />;
}
