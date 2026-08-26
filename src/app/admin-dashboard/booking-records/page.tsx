import BookingRecordsPortal, {
  type BookingImage,
  type BookingRecord,
  type CleanerUser,
  type PortalUser,
} from "@/components/admin/booking-records/BookingRecordsPortal";
import { createClient } from "@/lib/supabase/server";

export default async function BookingRecordsPage() {
  const supabase = await createClient();

  const [
    { data: records },
    { data: assignments },
    { data: images },
    { data: allUsers },
    { data: profileResult },
  ] = await Promise.all([
    supabase
      .from("booking_records")
      .select("*")
      .order("service_date", { ascending: false })
      .order("service_time", { ascending: false }),

    supabase
      .from("booking_record_assignments")
      .select("booking_id, cleaner_id"),

    supabase
      .from("booking_record_images")
      .select("*")
      .order("uploaded_at", { ascending: true }),

    supabase
      .from("users")
      .select(
        "id, name, email, phone_number, role, approval_status, source, is_blocked, verified, is_online, is_available, is_working, offering_fixed, offering_hourly, hourly_rate, created_at",
      )
      .order("name", { ascending: true }),

    supabase.auth.getUser(),
  ]);

  const portalUsers = (allUsers || []).map((user) => ({
    id: user.id,
    name: user.name || "Unnamed user",
    email: user.email || "",
    phone_number: user.phone_number || null,
    role: String(user.role || "customer").toLowerCase(),
    approval_status: user.approval_status || "approved",
    source: user.source || "Web",
    is_blocked: user.is_blocked ?? false,
    verified: user.verified ?? false,
    is_online: user.is_online ?? false,
    is_available: user.is_available ?? false,
    is_working: user.is_working ?? false,
    offering_fixed: user.offering_fixed ?? false,
    offering_hourly: user.offering_hourly ?? false,
    hourly_rate: user.hourly_rate ?? "0",
    created_at: user.created_at,
  })) as PortalUser[];

  /*
    Booking Records user management is ONLY for operational users.
    Admin and Customer accounts are intentionally excluded.
  */
  const operationalUsers = portalUsers.filter((user) =>
    ["cleaner", "data_entry"].includes(user.role),
  );

  /*
    Only users who actually have at least one row in
    booking_record_assignments are shown in "Assigned Users".
  */
  const assignedUserIds = new Set(
    (assignments || []).map((assignment) => assignment.cleaner_id),
  );

  const assignedUsers = operationalUsers.filter((user) =>
    assignedUserIds.has(user.id),
  );

  /*
    Users available in the booking assignment picker.
    Blocked users are not offered for NEW assignments.
  */
  const assignableUsers = operationalUsers.filter(
    (user) => !user.is_blocked,
  );

  /*
    Use ALL operational users for resolving existing assignments so an
    already-assigned blocked user can still be displayed on old bookings.
  */
  const operationalUserMap = new Map(
    operationalUsers.map((user) => [user.id, user]),
  );

  const assignmentsByBooking = new Map<string, CleanerUser[]>();

  for (const assignment of assignments || []) {
    const assignedUser = operationalUserMap.get(assignment.cleaner_id);

    // This also guarantees admin/customer assignments are not displayed.
    if (!assignedUser) continue;

    const list =
      assignmentsByBooking.get(assignment.booking_id) || [];

    list.push({
      id: assignedUser.id,
      name: assignedUser.name || "Assigned User",
      email: assignedUser.email || "",
      role: assignedUser.role,
    });

    assignmentsByBooking.set(assignment.booking_id, list);
  }

  const imagesByBooking = new Map<string, BookingImage[]>();

  for (const image of images || []) {
    const list = imagesByBooking.get(image.booking_id) || [];
    list.push(image as BookingImage);
    imagesByBooking.set(image.booking_id, list);
  }

  const currentUser = profileResult.user
    ? await supabase
        .from("users")
        .select("id, name, role")
        .eq("id", profileResult.user.id)
        .maybeSingle()
    : { data: null };

  const bookings = (records || []).map((record) => ({
    ...record,
    assigned_cleaners:
      assignmentsByBooking.get(record.id) || [],
    service_images:
      imagesByBooking.get(record.id) || [],
  })) as BookingRecord[];

  return (
    <BookingRecordsPortal
      bookings={bookings}
      cleaners={assignableUsers.map((user) => ({
        id: user.id,
        name: user.name || "Assigned User",
        email: user.email || "",
        role: user.role,
      }))}
      assignedUsers={assignedUsers}
      currentUser={
        currentUser.data
          ? {
              id: currentUser.data.id,
              name:
                currentUser.data.name || "Portal User",
              role: currentUser.data.role || "",
            }
          : null
      }
    />
  );
}
