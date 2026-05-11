import {
  CalendarCheck,
  Heart,
  Clock3,
  BadgeCheck,
} from "lucide-react";

const stats = [
  {
    title: "Total Bookings",
    value: "12",
    icon: CalendarCheck,
  },
  {
    title: "Favorites",
    value: "5",
    icon: Heart,
  },
  {
    title: "Pending Services",
    value: "2",
    icon: Clock3,
  },
  {
    title: "Completed",
    value: "10",
    icon: BadgeCheck,
  },
];

export default function DashboardHomePage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-3xl bg-[#0B4E9B] p-8 text-white">
        <h2 className="text-4xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="mt-3 text-white/80 max-w-2xl">
          Manage your cleaning services, upcoming bookings,
          and account preferences from your dashboard.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-3xl bg-white p-6 shadow-sm border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-4xl font-bold text-[#0B4E9B]">
                    {item.value}
                  </h3>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[#0B4E9B]/10 text-[#0B4E9B] flex items-center justify-center">
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}