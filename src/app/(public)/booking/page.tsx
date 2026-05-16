"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Building2,
  Home,
  Car,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sofa,
  Lock,
  X,
} from "lucide-react";
import CommonHeroSection from "@/components/common/CommonHeroSection";
import BookingModal from "@/components/models/Booking";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// --- Types ---
interface Category {
  id: string;
  name: string;
  icon_str: string;
  color_hex: string;
  type: string;
}

interface Service {
  id: string;
  category_id: string;
  title: string;
  description: string;
  price: string;
  icon_str: string;
  pricing_type: string;
  service_type: string;
  is_active: boolean;
  has_addons: boolean;
  tax_rate: number;
}

const BookingPage = () => {
  const serviceImageMap: Record<string, string> = {
    residential: "/residential.webp",
    move_in_out: "/seasonal.webp",
    commercial: "/commercial-cleaning.webp",
    vehicle: "/vehicle.webp",
    specialty: "/work.webp",
  };

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();

        // Fetch categories
        const { data: catData, error: catError } = await supabase
          .from("categories")
          .select("*")
          .order("created_at", { ascending: true });

        if (catError) throw catError;
        console.log("Categories:", catData);
        setCategories(catData || []);

        // Fetch active services
        const { data: svcData, error: svcError } = await supabase
          .from("services")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: true });

        if (svcError) throw svcError;
        console.log("Services:", svcData);
        setServices(svcData || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBookNow = (service: Service) => {
    // Wait for auth state to load
    if (authLoading) return;

    // If not logged in, show custom login prompt
    if (!user) {
      setSelectedService(service);
      setSelectedServiceTitle(service.title);
      setShowLoginPrompt(true);
      return;
    }

    // User is logged in - open the booking modal
    setSelectedService(service);
    setSelectedServiceTitle(service.title);
    setIsModalOpen(true);
  };

  const getIconForCategory = (iconStr: string) => {
    switch (iconStr) {
      case "home":
        return <Home className="w-8 h-8" />;
      case "building2":
        return <Building2 className="w-8 h-8" />;
      case "truck":
        return <Car className="w-8 h-8" />;
      case "sparkles":
        return <Sofa className="w-8 h-8" />;
      default:
        return <Home className="w-8 h-8" />;
    }
  };

  const getIconForService = (iconStr: string) => {
    switch (iconStr) {
      case "home":
        return <Home className="w-5 h-5 text-blue-600" />;
      case "building2":
        return <Building2 className="w-5 h-5 text-blue-600" />;
      case "truck":
        return <Car className="w-5 h-5 text-blue-600" />;
      case "sparkles":
        return <Sofa className="w-5 h-5 text-blue-600" />;
      default:
        return <Home className="w-5 h-5 text-blue-600" />;
    }
  };

  const getCategoryDescription = (name: string) => {
    const descriptions: Record<string, string> = {
      Residential: "Homes & apartments",
      Commercial: "Offices, retail & clinics",
      Vehicle: "Auto detailing & car cleaning",
      Specialty: "Carpet, sofa & move-in/out",
    };
    return descriptions[name] || name;
  };

  const getServiceDuration = (service: Service) => {
    if (service.pricing_type === "hourly") return "Flexible";
    return "2-3 hrs";
  };

  const getServiceFeatures = (serviceType: string): string[] => {
    const featureMap: Record<string, string[]> = {
      residential: [
        "Kitchen & bathrooms",
        "Dusting & vacuuming",
        "Floor mopping",
        "Trash removal",
      ],
      move_in_out: [
        "Inside cabinets",
        "Appliance deep clean",
        "Walls & baseboards",
        "Window tracks",
      ],
      commercial: [
        "Daily / weekly plans",
        "Restroom sanitation",
        "Glass & lobby",
        "After-hours service",
      ],
      vehicle: [
        "Interior vacuuming",
        "Dashboard cleaning",
        "Window cleaning",
        "Exterior wash",
      ],
      specialty: [
        "Deep carpet cleaning",
        "Sofa & upholstery",
        "Stain removal",
        "Deodorizing",
      ],
    };
    return (
      featureMap[serviceType] || ["Professional service", "Quality guaranteed"]
    );
  };

  const getActiveCategoryName = () => {
    if (activeCategory === "All") return "All";
    const cat = categories.find((c) => c.id === activeCategory);
    return cat?.name || "All";
  };

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category_id === activeCategory);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <CommonHeroSection
        backgroundImage="/p4.webp"
        title={<>Book Your Cleaning Service</>}
      />

      <main className="min-h-screen bg-[#F8FAFC] py-6 px-6 md:px-12 lg:px-24">
        <div className="container-custom mx-auto">
          {/* Header */}
          <div className="text-center">
            <span className="bg-[#00B7EB] text-white px-4 py-1 rounded-full text-sm font-bold uppercase">
              Our services
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#004A8C] mt-6 mb-4">
              Relax While We Handle Cleaning
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Relax and let the experts do the work. Camz Cleaning delivers
              meticulous cleaning, careful sanitization, and a sparkling space
              you'll love coming back to.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12 mt-8">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-cyan-500"></div>
                <p className="mt-4 text-gray-600">Loading services...</p>
              </div>
            </div>
          )}

          {/* Category Cards */}
          {!loading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;

                  return (
                    <div
                      key={cat.id}
                      onClick={() =>
                        setActiveCategory(isActive ? "All" : cat.id)
                      }
                      className={`relative overflow-hidden cursor-pointer rounded-[22px] p-6 transition-all duration-300 border min-h-[220px] ${
                        isActive
                          ? "border-white ring-2 ring-[#2F80FF]"
                          : "border-transparent"
                      } bg-[#0B4E9B]`}
                    >
                      {/* Check Icon */}
                      {isActive && (
                        <div className="absolute right-5 top-5">
                          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4 text-[#2F80FF] fill-current"
                            >
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          </div>
                        </div>
                      )}

                      {/* Icon */}
                      <div className="mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-white">
                          {getIconForCategory(cat.icon_str)}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl font-bold text-white mb-3 leading-tight">
                        {cat.name}
                      </h3>

                      {/* Description */}
                      <p className="text-white/80 leading-7 mb-8">
                        {getCategoryDescription(cat.name)}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Services Display Section */}
              <div className="text-center mt-8">
                <h2 className="text-4xl font-bold text-[#004A8C]">
                  {getActiveCategoryName()} Services
                </h2>
                <p className="text-gray-500 my-4">
                  From homes to offices, carpets to cars — professional cleaning
                  for every need.
                </p>
              </div>

              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredServices.map((service) => (
                  <motion.div
                    key={service.id}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="relative h-64 w-full">
                      <Image
                        src={
                          serviceImageMap[service.service_type] || "/p4.webp"
                        }
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                      {/* Badges */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm">
                        {service.price}
                      </div>
                      <div className="absolute top-4 right-4 bg-[#004A8C]/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-white flex items-center gap-1 shadow-sm">
                        <Clock size={14} /> {getServiceDuration(service)}
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="p-8 flex flex-col grow">
                      <div className="flex items-center gap-2 mb-4">
                        {getIconForService(service.icon_str)}
                        <h3 className="text-2xl font-extrabold text-[#004A8C]">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-gray-500 mb-6">
                        {service.description}
                      </p>

                      <ul className="space-y-3 mb-8">
                        {getServiceFeatures(service.service_type).map(
                          (feature, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-sm text-gray-600 font-medium"
                            >
                              <CheckCircle2
                                size={18}
                                className="text-[#00B7EB]"
                              />
                              {feature}
                            </li>
                          ),
                        )}
                      </ul>

                      <button
                        onClick={() => handleBookNow(service)}
                        className="mt-auto flex items-center gap-2 text-[#00B7EB] font-bold hover:text-[#004A8C] transition-colors group cursor-pointer"
                      >
                        Book now{" "}
                        <ArrowRight
                          size={20}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {filteredServices.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                  No services found in this category yet.
                </div>
              )}
            </>
          )}
        </div>
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          service={selectedService}
        />

        {/* Login Required Modal */}
        <AnimatePresence>
          {showLoginPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
              onClick={() => setShowLoginPrompt(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden relative p-8"
              >
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"
                  aria-label="Close"
                >
                  <X size={16} className="text-slate-600" />
                </button>

                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Lock className="w-10 h-10 text-blue-600" />
                  </motion.div>

                  <h2 className="text-2xl font-black text-slate-800 mb-2">
                    Login Required
                  </h2>
                  <p className="text-sm text-slate-500 mb-2">
                    Please log in to book{" "}
                    <span className="font-bold text-blue-600">
                      {selectedServiceTitle}
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 mb-8">
                    Your account helps us track your bookings and provide better
                    service.
                  </p>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        setShowLoginPrompt(false);
                        router.push("/login?redirect=/booking");
                      }}
                      className="w-full py-3.5 rounded-xl bg-blue-600 text-white text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2"
                    >
                      Continue to Login
                      <ArrowRight size={16} />
                    </button>
                    <button
                      onClick={() => setShowLoginPrompt(false)}
                      className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-all"
                    >
                      Maybe Later
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-6">
                    Don&apos;t have an account?{" "}
                    <button
                      onClick={() => {
                        setShowLoginPrompt(false);
                        router.push("/signup");
                      }}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default BookingPage;
