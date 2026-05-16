"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Car,
  Sparkles,
  Home,
  Building2,
  CalendarCheck,
  Clock3,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const iconMap: Record<string, any> = {
  home: Home,
  building2: Building2,
  truck: Car,
  sparkles: Sparkles,
};

const colorMap: Record<string, string> = {
  home: "text-blue-400",
  building2: "text-green-400",
  truck: "text-red-400",
  sparkles: "text-purple-400",
};

interface Category {
  id: string;
  name: string;
  icon_str: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  pricing_type: string;
  icon_str: string;
  is_active: boolean;
}

interface Stats {
  total: number;
  pending: number;
  completed: number;
  cancelled: number;
}

export default function DashboardHomePage() {
  const { user, userData, loading: authLoading } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/customer-dashboard");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;

    const fetchAll = async () => {
      setLoading(true);
      try {
        const supabase = createClient();

        // Fetch categories
        const { data: catData } = await supabase
          .from("categories")
          .select("id, name, icon_str")
          .order("created_at", { ascending: true });

        // Fetch services
        const { data: svcData } = await supabase
          .from("services")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: true });

        // Fetch user's job stats
        const { data: jobsData } = await supabase
          .from("jobs")
          .select("status")
          .eq("customer_id", user.id);

        setCategories(catData || []);
        setServices(svcData || []);

        if (jobsData) {
          setStats({
            total: jobsData.length,
            pending: jobsData.filter((j) => j.status === "pending").length,
            completed: jobsData.filter((j) => j.status === "completed").length,
            cancelled: jobsData.filter(
              (j) => j.status === "cancelled" || j.status === "canceled",
            ).length,
          });
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [user]);

  const displayName = userData?.name || user?.email?.split("@")[0] || "User";

  const filteredServices = searchQuery.trim()
    ? services.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : services;

  if (loading && user) {
    return (
      <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#4A86F7]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white p-4 md:p-8">
      {/* Greeting */}
      <div className="mb-8">
        <p className="text-gray-400 text-sm">Welcome back,</p>
        <h2 className="text-2xl font-bold mt-1">{displayName} 👋</h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          {
            label: "Total Bookings",
            value: stats.total,
            icon: CalendarCheck,
            color: "text-blue-400 bg-blue-500/20",
          },
          {
            label: "Pending",
            value: stats.pending,
            icon: Clock3,
            color: "text-yellow-400 bg-yellow-500/20",
          },
          {
            label: "Completed",
            value: stats.completed,
            icon: CheckCircle2,
            color: "text-green-400 bg-green-500/20",
          },
          {
            label: "Cancelled",
            value: stats.cancelled,
            icon: XCircle,
            color: "text-red-400 bg-red-500/20",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-[#071224] p-5"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}
              >
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400"
          size={24}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search for "Deep Cleaning"'
          className="w-full rounded-3xl border border-white/10 bg-[#071224] py-5 pl-16 pr-5 text-white outline-none focus:border-blue-500"
        />
      </div>

      {/* Banner */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#8B3DFF] to-[#4B5DFF] p-8 mb-10">
        <div className="relative z-10 max-w-md">
          <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold mb-4">
            LIMITED OFFER
          </span>
          <h2 className="text-4xl font-bold leading-tight mb-3">
            Kitchen Sanitization Starts at $49
          </h2>
          <p className="text-white/80 text-lg">Expert deep cleaning service</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-[40%] bg-white/5 blur-3xl" />
      </div>

      {/* Categories */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-bold">Service Categories</h3>
        <Link href="/booking" className="text-blue-400 font-semibold">
          See All
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-12">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon_str] || Home;
          const color = colorMap[cat.icon_str] || "text-blue-400";
          return (
            <div
              key={cat.id}
              className="rounded-3xl border border-white/10 bg-[#071224] p-6 text-center hover:border-blue-500 transition cursor-pointer"
              onClick={() => router.push(`/booking?category=${cat.id}`)}
            >
              <div
                className={`mx-auto mb-4 w-16 h-16 rounded-2xl bg-[#0B1B34] flex items-center justify-center ${color}`}
              >
                <Icon size={30} />
              </div>
              <p className="font-semibold">{cat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Services */}
      <h3 className="text-3xl font-bold mb-8">
        {searchQuery ? "Search Results" : "Recommended Services"}
      </h3>

      {filteredServices.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#071224] p-10 text-center">
          <p className="text-gray-400">
            No services found for &quot;{searchQuery}&quot;
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {filteredServices.map((service) => {
            const Icon = iconMap[service.icon_str] || Home;
            return (
              <div
                key={service.id}
                className="rounded-[24px] border border-blue-500/10 bg-[#071224] p-5 shadow-[0_0_20px_rgba(37,99,235,0.05)]"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0B1B34] flex items-center justify-center text-blue-400 flex-shrink-0 mx-auto sm:mx-0">
                    <Icon size={24} />
                  </div>

                  <div className="flex-1">
                    <span className="inline-block rounded-full bg-blue-500/20 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-blue-400 mb-3">
                      {service.pricing_type === "both"
                        ? "FIXED & HOURLY"
                        : service.pricing_type?.toUpperCase()}
                    </span>

                    <h4 className="text-lg md:text-xl font-bold mb-2 leading-tight">
                      {service.title}
                    </h4>

                    <p className="text-gray-400 leading-6 mb-5 text-sm">
                      {service.description}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                      <div>
                        <h5 className="text-xl md:text-2xl font-bold text-blue-400">
                          CAD ${service.price}
                        </h5>
                      </div>

                      <Link
                        href="/booking"
                        className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold hover:bg-blue-700 transition"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
