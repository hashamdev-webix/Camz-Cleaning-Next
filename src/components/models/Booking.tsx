"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, Calendar, Clock, MapPin, 
   Search, Check, ChevronLeft, ChevronRight as ChevronRightIcon, 
  Minus,
  Plus,
  ClipboardList
} from 'lucide-react';
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
}

const BookingModal = ({ isOpen, onClose, serviceTitle }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  
  // --- Form States ---
  const [bedrooms, setBedrooms] = useState("1");
  const [washrooms, setWashrooms] = useState("2");
  const [condition, setCondition] = useState("Medium (+$40)");
  const [status, setStatus] = useState("Furnished");
  const [pricingType, setPricingType] = useState("Hourly");
  const [hours, setHours] = useState(3);
// --- Form States ---
const [date, setDate] = useState<any>(null);
const [time, setTime] = useState<any>(null);
  const [activePicker, setActivePicker] = useState<'none' | 'date' | 'time'>('none');
const [location, setLocation] = useState("");
const [loadingLocation, setLoadingLocation] = useState(false);
  const totalSteps = 4;
  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  setLoadingLocation(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        // Free reverse geocoding (no API key)
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
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
    }
  );
};
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden relative border border-slate-100"
      >
        {/* Header Section */}
        <div className="px-8 pt-8">
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-blue-600' : 'bg-slate-100'}`} 
              />
            ))}
          </div>
          <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-slate-400">
            <span>Step {step} of 4</span>
            <span className="text-blue-600">{serviceTitle}</span>
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <h2 className="text-2xl font-black text-slate-800 mb-6">{serviceTitle} Details</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase text-slate-500 ml-1">Bedrooms</label>
                    <select 
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    >
                      <option value="1">1 Bedroom</option>
                      <option value="2">2 Bedrooms</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase text-slate-500 ml-1">Washrooms</label>
                    <select 
                      value={washrooms}
                      onChange={(e) => setWashrooms(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="1">1 Washroom</option>
                      <option value="2">2 Washrooms</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6 space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-500 ml-1">Property Condition</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Light (+$0)', 'Medium (+$40)', 'Heavy (+$80)'].map((opt) => (
                      <button 
                        key={opt}
                        onClick={() => setCondition(opt)}
                        className={`py-2.5 rounded-xl border text-[11px] font-bold transition-all ${condition === opt ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-500 ml-1">Property Status</label>
                  <div className="flex gap-2">
                    {['Empty', 'Furnished'].map((opt) => (
                      <button 
                        key={opt}
                        onClick={() => setStatus(opt)}
                        className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${status === opt ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300'}`}
                      >
                        {status === opt && <Check size={14} />} {opt}
                      </button>
                    ))}
                  </div>
                </div>
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
              
                className: "bg-slate-50 rounded-xl border border-slate-200",
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
                
                className: "bg-slate-50 rounded-xl border border-slate-200",
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
            {loadingLocation ? "Getting location..." : "Use Current Location"}
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
              <motion.div key="step3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-black text-slate-800 mb-1">Pricing Plan</h2>
                <p className="text-[11px] font-bold text-slate-400 mb-6 uppercase tracking-wider">Select your preferred billing method</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div 
                    onClick={() => setPricingType("Fixed")}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all text-center ${pricingType === "Fixed" ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 bg-slate-50 text-slate-400'}`}
                  >
                    <ClipboardList className={`mx-auto mb-2 ${pricingType === "Fixed" ? 'text-blue-600' : 'text-slate-300'}`} size={20} />
                    <div className="text-xs font-black">Fixed Price</div>
                  </div>
                  <div 
                    onClick={() => setPricingType("Hourly")}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all text-center ${pricingType === "Hourly" ? 'border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-100' : 'border-slate-100 bg-slate-50 text-slate-400'}`}
                  >
                    <Clock className={`mx-auto mb-2 ${pricingType === "Hourly" ? 'text-white' : 'text-slate-300'}`} size={20} />
                    <div className="text-xs font-black">Hourly Price</div>
                  </div>
                </div>

                <div className="text-center mb-8 bg-slate-50 py-6 rounded-2xl">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimated Duration</span>
                  <div className="flex items-center justify-center gap-6 mt-4">
                    <button onClick={() => setHours(h => Math.max(1, h - 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-blue-600 transition-all"><Minus size={14} /></button>
                    <div className="text-2xl font-black text-slate-800 w-12">{hours}<span className="text-[10px] ml-1">hrs</span></div>
                    <button onClick={() => setHours(h => h + 1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-blue-600 transition-all"><Plus size={14} /></button>
                  </div>
                </div>

                <div className="space-y-3 px-2">
                  <div className="flex justify-between text-[11px] font-bold text-slate-400">
                    <span>Base Service Price</span>
                    <span className="text-slate-800">$60.00</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-400">
                    <span>GST (5%)</span>
                    <span className="text-slate-800">$3.00</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                    <span className="text-sm font-black text-slate-800 uppercase tracking-tighter">Total Amount</span>
                    <span className="text-xl font-black text-blue-600">$63.00</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-3 mt-10">
            <button 
              onClick={step === 1 ? onClose : prevStep} 
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-black hover:bg-slate-50 transition-all"
            >
              Back
            </button>
            <button 
              onClick={nextStep}
              className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-xs font-black flex items-center justify-center gap-2 shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all"
            >
              {step === 3 ? 'Confirm Booking' : 'Continue'} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingModal;





