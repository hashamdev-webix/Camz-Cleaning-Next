import React from "react";
import { 
  IoCallOutline, 
  IoMailOutline, 
  IoLocationOutline, 
  IoChevronDown 
} from "react-icons/io5";

const ContactSection = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#EFFAFC]">
      <div className="container-custom mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: Contact Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="bg-[#00CFE8] text-white text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B4E9B] leading-tight">
              Contact Camz Cleaning <br /> Today
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-lg">
              Contact Camz Cleaning today to schedule reliable, professional 
              cleaning services tailored to your home, business, vehicle, or 
              seasonal property needs.
            </p>
          </div>

          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-center gap-5">
              <div className="bg-[#0B4E9B] p-4 rounded-full text-white shadow-lg shadow-blue-200">
                <IoCallOutline size={24} />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-[#0B4E9B]">Phone Number:</h4>
                <p className="text-gray-600 font-medium">+1 587-837-1977</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-5">
              <div className="bg-[#0B4E9B] p-4 rounded-full text-white shadow-lg shadow-blue-200">
                <IoMailOutline size={24} />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-[#0B4E9B]">Email:</h4>
                <p className="text-gray-600 font-medium">info@camzcleaning.com</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-5">
              <div className="bg-[#0B4E9B] p-4 rounded-full text-white shadow-lg shadow-blue-200">
                <IoLocationOutline size={24} />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-[#0B4E9B]">Location:</h4>
                <p className="text-gray-600 font-medium">Calgary, AB, Canada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quote Form */}
        <div className="bg-[#0B4E9B] p-8 md:p-12 rounded-[2rem] shadow-2xl text-white">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 leading-snug">
            Complete the form below to receive your free cleaning quote.
          </h3>
          
          <form className="space-y-5 text-left">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Name</label>
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full p-3 bg-white rounded-xl border-none outline-none text-gray-700 placeholder:text-gray-500"
              />
            </div>

            {/* Email & Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Email</label>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full p-3 bg-white rounded-xl border-none outline-none text-gray-700 placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Telephone/Mobile</label>
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full p-3 bg-white rounded-xl border-none outline-none text-gray-700 placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Dropdown Select */}
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Select</label>
              <div className="relative">
                <select 
                  className="w-full p-3 rounded-xl border-none outline-none text-gray-700 appearance-none bg-white cursor-pointer"
                  defaultValue="Seasonal Property"
                >
                  <option value="" disabled>Select</option>
                  <option value="Residential Cleaning">Residential Cleaning</option>
                  <option value="Commercial Cleaning">Commercial Cleaning</option>
                  <option value="Vehicle Cleaning">Vehicle Cleaning</option>
                  <option value="Seasonal Property">Seasonal Property</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-700">
                  <IoChevronDown size={20} />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Message</label>
              <textarea 
           
                placeholder="Message" 
                className="w-full p-3 bg-white rounded-xl border-none outline-none text-gray-700 placeholder:text-gray-500 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button 
                type="submit" 
                className="border-2 border-white/60 hover:bg-[#02C0E6] hover:text-white cursor-pointer transition-all px-8 py-3 rounded-xl font-bold tracking-wide"
              >
                Request a Quote
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;