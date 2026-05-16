"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Clock,
  Check,
  Minus,
  Plus,
  ClipboardList,
  Loader2,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";

// --- Types ---
interface Service {
  id: string;
  category_id: string;
  title: string;
  description: string;
  price: string;
  pricing_type: string;
  service_type: string;
  is_active: boolean;
  has_addons: boolean;
  tax_rate: number;
  base_rate?: number;
  bedroom_rate?: number;
  washroom_rate?: number;
  hourly_rate?: number;
  sqft_rate?: number;
  vehicle_sedan_rate?: number;
  vehicle_suv_rate?: number;
  fridge_price?: number;
  oven_price?: number;
  window_price?: number;
}

interface ServiceConfig {
  base_rate?: number;
  bedroom_rate?: number;
  washroom_rate?: number;
  furnished_fee?: number;
  heavy_condition_fee?: number;
  heavy_multiplier?: number;
  rates?: Record<string, any>;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

const BookingModal = ({ isOpen, onClose, service }: BookingModalProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<ServiceConfig>({});
  const [loadingConfig, setLoadingConfig] = useState(false);
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  // Coordinates from geolocation
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [pricingType, setPricingType] = useState("Fixed");
  const [hours, setHours] = useState(3);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const totalSteps = 4;
  const nextStep = () => {
    if (step === 2) {
      if (!date) {
        alert("Please select a date");
        return;
      }
      if (!time) {
        alert("Please select a time");
        return;
      }
      if (!location || location.trim().length < 3) {
        alert("Please enter a valid location");
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const isStepValid = () => {
    if (step === 2) {
      return !!date && !!time && !!location && location.trim().length >= 3;
    }
    return true;
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleConfirm = async () => {
    if (!user) {
      setSubmitError("Please log in to book a service");
      return;
    }

    if (!service || !date || !time) {
      setSubmitError("Missing required booking information");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const supabase = createClient();
      const { total, taxRate } = calculatePricing();

      // Combine date and time into a single timestamp
      const bookingDateTime = date
        .hour(time.hour())
        .minute(time.minute())
        .second(0)
        .toISOString();

      // Build the job record
      const jobRecord: Record<string, any> = {
        customer_id: user.id,
        service_id: service.id,
        service_name: service.title,
        service_type: service.service_type,
        date: bookingDateTime,
        address: location,
        billing_type: pricingType.toLowerCase(),
        total_price: total,
        tax_rate: taxRate,
        price: `$${total.toFixed(2)}`,
        status: "pending",
        service_data: formData,
      };

      // Add coordinates if available
      if (coordinates) {
        jobRecord.job_lat = coordinates.lat;
        jobRecord.job_lng = coordinates.lng;
      }

      // Add billing-specific fields
      if (pricingType === "Hourly") {
        jobRecord.estimated_hours = hours;
        if (service.hourly_rate) {
          jobRecord.hourly_rate = Number(service.hourly_rate);
        }
      }

      // Add bedrooms/washrooms if present in formData
      if (formData.bedrooms !== undefined) {
        jobRecord.bedrooms = Number(formData.bedrooms);
      }
      if (formData.washrooms !== undefined) {
        jobRecord.washrooms = Number(formData.washrooms);
      }

      console.log("Submitting booking:", jobRecord);

      const { data, error } = await supabase
        .from("jobs")
        .insert(jobRecord)
        .select()
        .single();

      if (error) {
        console.error("Booking insert error:", error);
        throw new Error(error.message || "Failed to create booking");
      }

      console.log("Booking created successfully:", data);
      setBookingId(data.id);
      setSubmitSuccess(true);
    } catch (err: any) {
      console.error("Booking submission failed:", err);
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const calculatePricing = () => {
    if (!service) return { lineItems: [], subtotal: 0, tax: 0, total: 0 };

    const lineItems: { label: string; amount: number }[] = [];
    let subtotal = 0;

    switch (service.service_type) {
      case "residential":
      case "move_in_out": {
        const baseRate = config.base_rate || 0;
        const bedroomRate = config.bedroom_rate || 0;
        const washroomRate = config.washroom_rate || 0;
        const beds = Number(formData.bedrooms) || 0;
        const washes = Number(formData.washrooms) || 0;

        if (baseRate > 0) {
          lineItems.push({ label: "Base Service", amount: baseRate });
          subtotal += baseRate;
        }

        if (beds > 0 && bedroomRate > 0) {
          const amt = beds * bedroomRate;
          lineItems.push({
            label: `Bedrooms (${beds} × $${bedroomRate})`,
            amount: amt,
          });
          subtotal += amt;
        }

        if (washes > 0 && washroomRate > 0) {
          const amt = washes * washroomRate;
          lineItems.push({
            label: `Washrooms (${washes} × $${washroomRate})`,
            amount: amt,
          });
          subtotal += amt;
        }

        if (formData.furnished && config.furnished_fee) {
          lineItems.push({
            label: "Furnished surcharge",
            amount: config.furnished_fee,
          });
          subtotal += config.furnished_fee;
        }

        if (formData.heavy_condition && config.heavy_condition_fee) {
          lineItems.push({
            label: "Heavy condition fee",
            amount: config.heavy_condition_fee,
          });
          subtotal += config.heavy_condition_fee;
        }
        break;
      }

      case "vehicle": {
        const rates =
          (config.rates as Record<string, Record<string, number>>) || {};
        const vt = formData.vehicle_type;
        const pkg = formData.package;
        const price = rates[vt]?.[pkg];
        if (price) {
          lineItems.push({
            label: `${vt.toUpperCase()} - ${pkg} package`,
            amount: price,
          });
          subtotal += price;
        }
        break;
      }

      case "specialty":
      case "carpet_sofa": {
        const rates = (config.rates as Record<string, number>) || {};
        const item = formData.item_type;
        const qty = Number(formData.quantity) || 1;
        const unitPrice = rates[item] || 0;
        const itemTotal = unitPrice * qty;

        if (itemTotal > 0) {
          lineItems.push({
            label: `${item} (${qty} × $${unitPrice})`,
            amount: itemTotal,
          });
          subtotal += itemTotal;
        }

        if (formData.heavy && config.heavy_multiplier) {
          const extra = itemTotal * (config.heavy_multiplier - 1);
          lineItems.push({
            label: `Heavy condition (×${config.heavy_multiplier})`,
            amount: extra,
          });
          subtotal += extra;
        }
        break;
      }

      case "commercial": {
        if (pricingType === "Hourly" && service.hourly_rate) {
          const amt = hours * Number(service.hourly_rate);
          lineItems.push({
            label: `${hours} hrs × $${service.hourly_rate}/hr`,
            amount: amt,
          });
          subtotal += amt;
        }
        break;
      }
    }

    if (
      pricingType === "Hourly" &&
      service.service_type !== "commercial" &&
      service.hourly_rate
    ) {
      const hourlyTotal = hours * Number(service.hourly_rate);
      lineItems.length = 0;
      lineItems.push({
        label: `${hours} hrs × $${service.hourly_rate}/hr`,
        amount: hourlyTotal,
      });
      subtotal = hourlyTotal;
    }

    const rawTaxRate = Number(service.tax_rate) || 0;
    // Auto-detect: if value > 1, assume it's stored as whole number (e.g., 5 = 5%)
    // If value <= 1, assume decimal (e.g., 0.05 = 5%)
    const taxRate = rawTaxRate > 1 ? rawTaxRate / 100 : rawTaxRate;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return { lineItems, subtotal, tax, total, taxRate };
  };

  const initializeFormData = (serviceType: string, cfg: ServiceConfig) => {
    switch (serviceType) {
      case "residential":
        setFormData({ bedrooms: 1, washrooms: 1 });
        break;
      case "move_in_out":
        setFormData({
          bedrooms: 1,
          washrooms: 1,
          furnished: false,
          heavy_condition: false,
        });
        break;
      case "vehicle": {
        const firstVehicle = cfg.rates ? Object.keys(cfg.rates)[0] : "";
        const firstPackage =
          firstVehicle && cfg.rates?.[firstVehicle]
            ? Object.keys(cfg.rates[firstVehicle])[0]
            : "";
        setFormData({ vehicle_type: firstVehicle, package: firstPackage });
        break;
      }
      case "specialty":
      case "carpet_sofa": {
        const firstItem = cfg.rates ? Object.keys(cfg.rates)[0] : "";
        setFormData({ item_type: firstItem, quantity: 1, heavy: false });
        break;
      }
      case "commercial":
        setFormData({ sub_type: "office", area: 1000 });
        break;
      default:
        setFormData({});
    }
  };

  // Fetch service config
  useEffect(() => {
    if (!isOpen || !service?.id) return;
    const fetchConfig = async () => {
      setLoadingConfig(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("service_configs")
          .select("config_json")
          .eq("service_id", service.id)
          .maybeSingle();
        const cfg: ServiceConfig = data?.config_json || {};
        setConfig(cfg);
        initializeFormData(service.service_type, cfg);
      } catch (err) {
        console.error("Error fetching service config:", err);
        setConfig({});
        initializeFormData(service.service_type, {});
      } finally {
        setLoadingConfig(false);
      }
    };
    fetchConfig();
  }, [isOpen, service?.id]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFormData({});
      setDate(null);
      setTime(null);
      setLocation("");
      setHours(3);
      setPricingType("Fixed");
      setIsSubmitting(false);
      setSubmitSuccess(false);
      setSubmitError(null);
      setBookingId(null);
      setCoordinates(null);
    }
  }, [isOpen]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const data = await res.json();
          setLocation(data.display_name || "Location found");
        } catch {
          setLocation(`${latitude}, ${longitude}`);
        }
        setLoadingLocation(false);
      },
      () => {
        alert("Permission denied");
        setLoadingLocation(false);
      },
    );
  };

  // --- Dynamic Step 1 Fields ---
  const renderServiceFields = () => {
    if (!service) return null;
    switch (service.service_type) {
      case "residential":
      case "move_in_out":
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-slate-500 ml-1">
                  Bedrooms
                </label>
                <select
                  value={formData.bedrooms ?? 1}
                  onChange={(e) =>
                    updateField("bedrooms", Number(e.target.value))
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} Bedroom{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-slate-500 ml-1">
                  Washrooms
                </label>
                <select
                  value={formData.washrooms ?? 1}
                  onChange={(e) =>
                    updateField("washrooms", Number(e.target.value))
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} Washroom{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {config.furnished_fee !== undefined && (
              <div className="mb-6 space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-500 ml-1">
                  Property Status
                </label>
                <div className="flex gap-2">
                  {[
                    { key: false, label: "Empty" },
                    {
                      key: true,
                      label: `Furnished (+$${config.furnished_fee})`,
                    },
                  ].map((opt) => (
                    <button
                      key={String(opt.key)}
                      onClick={() => updateField("furnished", opt.key)}
                      className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${formData.furnished === opt.key ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100" : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"}`}
                    >
                      {formData.furnished === opt.key && <Check size={14} />}{" "}
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {config.heavy_condition_fee !== undefined && (
              <div className="mb-4 space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-500 ml-1">
                  Property Condition
                </label>
                <div className="flex gap-2">
                  {[
                    { key: false, label: "Normal" },
                    {
                      key: true,
                      label: `Heavy (+$${config.heavy_condition_fee})`,
                    },
                  ].map((opt) => (
                    <button
                      key={String(opt.key)}
                      onClick={() => updateField("heavy_condition", opt.key)}
                      className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${formData.heavy_condition === opt.key ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100" : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"}`}
                    >
                      {formData.heavy_condition === opt.key && (
                        <Check size={14} />
                      )}{" "}
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        );

      case "vehicle": {
        const vehicleTypes = config.rates ? Object.keys(config.rates) : [];
        const selectedVehicle = formData.vehicle_type || vehicleTypes[0] || "";
        const packages =
          selectedVehicle && config.rates?.[selectedVehicle]
            ? Object.keys(config.rates[selectedVehicle])
            : [];
        return (
          <>
            <div className="mb-6 space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-500 ml-1">
                Vehicle Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {vehicleTypes.map((vt) => (
                  <button
                    key={vt}
                    onClick={() => {
                      updateField("vehicle_type", vt);
                      const firstPkg = config.rates?.[vt]
                        ? Object.keys(config.rates[vt])[0]
                        : "";
                      updateField("package", firstPkg);
                    }}
                    className={`py-2.5 rounded-xl border text-[11px] font-bold transition-all capitalize ${formData.vehicle_type === vt ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100" : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"}`}
                  >
                    {vt}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4 space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-500 ml-1">
                Package
              </label>
              <div className="grid grid-cols-3 gap-2">
                {packages.map((pkg) => (
                  <button
                    key={pkg}
                    onClick={() => updateField("package", pkg)}
                    className={`py-2.5 rounded-xl border text-[11px] font-bold transition-all capitalize ${formData.package === pkg ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100" : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"}`}
                  >
                    <div>{pkg}</div>
                    <div className="text-[10px] mt-0.5 opacity-80">
                      ${config.rates?.[selectedVehicle]?.[pkg]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        );
      }

      case "specialty":
      case "carpet_sofa": {
        const itemTypes = config.rates ? Object.keys(config.rates) : [];
        return (
          <>
            <div className="mb-6 space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-500 ml-1">
                Item Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {itemTypes.map((item) => (
                  <button
                    key={item}
                    onClick={() => updateField("item_type", item)}
                    className={`py-2.5 rounded-xl border text-[11px] font-bold transition-all capitalize ${formData.item_type === item ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100" : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"}`}
                  >
                    <div>{item}</div>
                    <div className="text-[10px] mt-0.5 opacity-80">
                      ${config.rates?.[item]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6 space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-500 ml-1">
                Quantity
              </label>
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() =>
                    updateField(
                      "quantity",
                      Math.max(1, (formData.quantity || 1) - 1),
                    )
                  }
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-blue-600 transition-all"
                >
                  <Minus size={14} />
                </button>
                <div className="text-2xl font-black text-slate-800 w-12 text-center">
                  {formData.quantity || 1}
                </div>
                <button
                  onClick={() =>
                    updateField("quantity", (formData.quantity || 1) + 1)
                  }
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-blue-600 transition-all"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            {config.heavy_multiplier !== undefined && (
              <div className="mb-4 space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-500 ml-1">
                  Condition
                </label>
                <div className="flex gap-2">
                  {[
                    { key: false, label: "Light" },
                    { key: true, label: `Heavy (×${config.heavy_multiplier})` },
                  ].map((opt) => (
                    <button
                      key={String(opt.key)}
                      onClick={() => updateField("heavy", opt.key)}
                      className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${formData.heavy === opt.key ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100" : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"}`}
                    >
                      {formData.heavy === opt.key && <Check size={14} />}{" "}
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        );
      }

      case "commercial":
        return (
          <>
            <div className="mb-6 space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-500 ml-1">
                Business Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["office", "retail", "clinic"].map((bt) => (
                  <button
                    key={bt}
                    onClick={() => updateField("sub_type", bt)}
                    className={`py-2.5 rounded-xl border text-[11px] font-bold transition-all capitalize ${formData.sub_type === bt ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100" : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"}`}
                  >
                    {bt}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4 space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-500 ml-1">
                Area (sq ft)
              </label>
              <input
                type="number"
                min={100}
                value={formData.area ?? 1000}
                onChange={(e) => updateField("area", Number(e.target.value))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <p className="text-[10px] text-slate-400 ml-1">
                We&apos;ll discuss exact pricing based on requirements
              </p>
            </div>
          </>
        );

      default:
        return (
          <div className="text-center py-8 text-slate-400 text-sm">
            Service configuration not available. Please contact support.
          </div>
        );
    }
  };

  if (!isOpen || !service) return null;

  // SUCCESS STATE — show success screen instead of form
  if (submitSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </motion.div>

          <h2 className="text-2xl font-black text-slate-800 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Your booking has been received. Our team will assign a cleaner and
            contact you shortly.
          </p>

          {bookingId && (
            <div className="bg-slate-50 rounded-2xl p-4 mb-6">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                Booking ID
              </p>
              <p className="text-sm font-bold text-slate-700 font-mono">
                {bookingId.slice(0, 8).toUpperCase()}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                onClose();
                window.location.href = "/customer-dashboard/bookings";
              }}
              className="w-full py-3 rounded-xl bg-blue-600 text-white text-xs font-black hover:bg-blue-700 transition-all"
            >
              View My Bookings
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-black hover:bg-slate-50 transition-all"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden relative border border-slate-100 max-h-[90vh] overflow-y-auto"
      >
        {/* Header Section */}
        <div className="px-8 pt-8">
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-blue-600" : "bg-slate-100"}`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-slate-400">
            <span>Step {step} of 4</span>
            <span className="text-blue-600">{service.title}</span>
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <h2 className="text-2xl font-black text-slate-800 mb-6">
                  {service.title} Details
                </h2>
                {loadingConfig ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  </div>
                ) : (
                  renderServiceFields()
                )}
              </motion.div>
            )}

            {step === 2 && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h2 className="text-2xl font-black text-slate-800 mb-6">
                    Schedule Appointment
                  </h2>

                  <div className="space-y-5">
                    {/* DATE PICKER */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-2 uppercase">
                        Select Date
                      </label>

                      <DatePicker
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        slotProps={{
                          textField: {
                            fullWidth: true,

                            className:
                              "bg-slate-50 rounded-xl border border-slate-200",
                          },
                        }}
                      />
                    </div>

                    {/* TIME PICKER */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-2 uppercase">
                        Select Time
                      </label>

                      <TimePicker
                        value={time}
                        onChange={(newValue) => setTime(newValue)}
                        slotProps={{
                          textField: {
                            fullWidth: true,

                            className:
                              "bg-slate-50 rounded-xl border border-slate-200",
                          },
                        }}
                      />
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                      <h4 className="text-[11px] font-bold text-blue-600 mb-3 flex items-center gap-2 uppercase">
                        📍 Work Location
                      </h4>

                      <button
                        onClick={getCurrentLocation}
                        className="w-full mb-3 p-3 rounded-xl border border-slate-200 bg-white text-blue-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition"
                      >
                        {loadingLocation
                          ? "Getting location..."
                          : "Use Current Location"}
                      </button>

                      <div className="relative">
                        <input
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Search Address"
                          className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {location && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600">
                            ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </LocalizationProvider>
            )}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-xl font-black text-slate-800 mb-1">
                  Pricing Plan
                </h2>
                <p className="text-[11px] font-bold text-slate-400 mb-6 uppercase tracking-wider">
                  Select your preferred billing method
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div
                    onClick={() => setPricingType("Fixed")}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all text-center ${pricingType === "Fixed" ? "border-blue-600 bg-blue-50/30" : "border-slate-100 bg-slate-50 text-slate-400"}`}
                  >
                    <ClipboardList
                      className={`mx-auto mb-2 ${pricingType === "Fixed" ? "text-blue-600" : "text-slate-300"}`}
                      size={20}
                    />
                    <div className="text-xs font-black">Fixed Price</div>
                  </div>
                  <div
                    onClick={() => setPricingType("Hourly")}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all text-center ${pricingType === "Hourly" ? "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-100" : "border-slate-100 bg-slate-50 text-slate-400"}`}
                  >
                    <Clock
                      className={`mx-auto mb-2 ${pricingType === "Hourly" ? "text-white" : "text-slate-300"}`}
                      size={20}
                    />
                    <div className="text-xs font-black">Hourly Price</div>
                  </div>
                </div>

                {pricingType === "Hourly" && (
                  <div className="text-center mb-8 bg-slate-50 py-6 rounded-2xl">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Estimated Duration
                    </span>
                    <div className="flex items-center justify-center gap-6 mt-4">
                      <button
                        onClick={() => setHours((h) => Math.max(1, h - 1))}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-blue-600 transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <div className="text-2xl font-black text-slate-800 w-12">
                        {hours}
                        <span className="text-[10px] ml-1">hrs</span>
                      </div>
                      <button
                        onClick={() => setHours((h) => h + 1)}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-blue-600 transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {(() => {
                  const {
                    lineItems,
                    subtotal,
                    tax,
                    total,
                    taxRate = 0,
                  } = calculatePricing();
                  return (
                    <div className="space-y-3 px-2">
                      {lineItems.length === 0 ? (
                        <div className="text-center py-4">
                          <p className="text-sm font-bold text-slate-400">
                            Pricing will be confirmed after consultation
                          </p>
                        </div>
                      ) : (
                        <>
                          {lineItems.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between text-[11px] font-bold text-slate-400"
                            >
                              <span>{item.label}</span>
                              <span className="text-slate-800">
                                ${item.amount.toFixed(2)}
                              </span>
                            </div>
                          ))}
                          <div className="flex justify-between text-[11px] font-bold text-slate-400 pt-2 border-t border-slate-100">
                            <span>Subtotal</span>
                            <span className="text-slate-800">
                              ${subtotal.toFixed(2)}
                            </span>
                          </div>
                          {taxRate > 0 && (
                            <div className="flex justify-between text-[11px] font-bold text-slate-400">
                              <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
                              <span className="text-slate-800">
                                ${tax.toFixed(2)}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                            <span className="text-sm font-black text-slate-800 uppercase tracking-tighter">
                              Total Amount
                            </span>
                            <span className="text-xl font-black text-blue-600">
                              ${total.toFixed(2)}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-black text-slate-800 mb-1">
                  Review Your Booking
                </h2>
                <p className="text-[11px] font-bold text-slate-400 mb-6 uppercase tracking-wider">
                  Please verify details before confirming
                </p>

                {submitError && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-black text-red-700 mb-1">
                        Booking Failed
                      </p>
                      <p className="text-xs text-red-600">{submitError}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-1">
                      Service
                    </p>
                    <p className="text-base font-black text-slate-800">
                      {service.title}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                      Schedule
                    </p>

                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-blue-600 shrink-0" />
                      <div className="flex-1">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">
                          Date
                        </p>
                        <p className="text-sm font-bold text-slate-800">
                          {date ? date.format("MMM DD, YYYY") : "Not set"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-blue-600 shrink-0" />
                      <div className="flex-1">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">
                          Time
                        </p>
                        <p className="text-sm font-bold text-slate-800">
                          {time ? time.format("hh:mm A") : "Not set"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin
                        size={16}
                        className="text-blue-600 shrink-0 mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">
                          Location
                        </p>
                        <p className="text-sm font-bold text-slate-800 break-words">
                          {location || "Not set"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {Object.keys(formData).length > 0 && (
                    <div className="bg-slate-50 rounded-2xl p-4">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3">
                        Service Details
                      </p>
                      <div className="space-y-2">
                        {Object.entries(formData).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center"
                          >
                            <span className="text-xs text-slate-500 capitalize">
                              {key.replace(/_/g, " ")}
                            </span>
                            <span className="text-sm font-bold text-slate-800 capitalize">
                              {typeof value === "boolean"
                                ? value
                                  ? "Yes"
                                  : "No"
                                : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(() => {
                    const { total } = calculatePricing();
                    return (
                      <div className="bg-slate-50 rounded-2xl p-4 space-y-2">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3">
                          Pricing
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-500">
                            Billing Type
                          </span>
                          <span className="text-sm font-bold text-slate-800">
                            {pricingType}
                          </span>
                        </div>
                        {pricingType === "Hourly" && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500">
                              Estimated Hours
                            </span>
                            <span className="text-sm font-bold text-slate-800">
                              {hours} hrs
                            </span>
                          </div>
                        )}
                        {total > 0 && (
                          <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                            <span className="text-xs font-black uppercase text-slate-700 tracking-wider">
                              Total Amount
                            </span>
                            <span className="text-xl font-black text-blue-600">
                              ${total.toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-3 mt-10">
            <button
              onClick={step === 1 ? onClose : prevStep}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-black hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 1 ? "Cancel" : "Back"}
            </button>
            <button
              onClick={step === totalSteps ? handleConfirm : nextStep}
              disabled={isSubmitting}
              className={`flex-1 py-3 rounded-xl text-white text-xs font-black flex items-center justify-center gap-2 shadow-xl shadow-blue-200 transition-all ${
                !isStepValid() || isSubmitting
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {step === 4
                    ? "Confirm Booking"
                    : step === 3
                      ? "Review"
                      : "Continue"}{" "}
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingModal;
