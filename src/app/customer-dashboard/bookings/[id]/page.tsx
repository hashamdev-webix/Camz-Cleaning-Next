import {
  Calendar,
  MapPin,
  User,
  CreditCard,
  BadgeDollarSign,
  Check,
} from "lucide-react";

const steps = [
  "Pending",
  "Accepted",
  "In Progress",
  "Completed",
  "Approved",
];

export default function BookingDetailsPage() {
  return (
    <div className="min-h-screen bg-[#020817] text-white px-4 md:px-8 py-6">

      {/* Booking Card */}
      <div className="rounded-[28px] border border-white/10 bg-[#071224] p-5 md:p-8 mb-6">

        {/* Top */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">

          <div>
            <p className="text-gray-500 mb-3 text-sm">
              #FED2D0F6
            </p>

            <h1 className="text-2xl md:text-4xl font-bold text-[#4A86F7] leading-tight">
              Vehicle Detailing
            </h1>
          </div>

          <div className="rounded-full bg-yellow-500/20 px-5 py-2 text-sm font-bold text-yellow-400 w-fit">
            PENDING
          </div>
        </div>

        {/* Details */}
        <div className="space-y-5">

          {/* Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

            <div className="flex items-center gap-3 text-gray-400 text-sm md:text-base">
              <Calendar size={18} />

              <span>Date & Time:</span>
            </div>

            <span className="font-semibold text-sm md:text-base break-words">
              May 13, 2026 - 08:51 PM
            </span>
          </div>

          {/* Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

            <div className="flex items-center gap-3 text-gray-400 text-sm md:text-base">
              <MapPin size={18} />

              <span>Location:</span>
            </div>

            <span className="font-semibold text-sm md:text-base break-words">
              Calgary, AB
            </span>
          </div>

          {/* Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

            <div className="flex items-center gap-3 text-gray-400 text-sm md:text-base">
              <User size={18} />

              <span>Cleaner:</span>
            </div>

            <span className="font-semibold text-sm md:text-base break-words">
              Finding cleaner...
            </span>
          </div>

          {/* Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

            <div className="flex items-center gap-3 text-gray-400 text-sm md:text-base">
              <CreditCard size={18} />

              <span>Billing:</span>
            </div>

            <span className="font-semibold text-sm md:text-base break-words">
              Fixed-Rate Billing
            </span>
          </div>

          {/* Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

            <div className="flex items-center gap-3 text-gray-400 text-sm md:text-base">
              <BadgeDollarSign size={18} />

              <span>Price:</span>
            </div>

            <span className="text-2xl md:text-3xl font-bold text-[#4A86F7] break-words">
              CAD $42.00
            </span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-[28px] border border-white/10 bg-[#071224] p-5 md:p-8 mb-6">

        <h3 className="text-2xl md:text-3xl font-bold mb-8">
          Job Progress
        </h3>

        {/* Mobile Scroll */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex items-start justify-between min-w-[650px] gap-6">

            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-1 relative"
              >

                {/* Line */}
                {index !== steps.length - 1 && (
                  <div className="absolute top-6 left-[60%] w-full h-[2px] bg-white/10" />
                )}

                {/* Circle */}
                <div
                  className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center border-2 ${
                    index === 0
                      ? "bg-[#4A86F7] border-[#4A86F7]"
                      : "bg-[#0B1B34] border-white/20"
                  }`}
                >
                  {index === 0 ? (
                    <Check size={22} />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-white/30" />
                  )}
                </div>

                {/* Label */}
                <p className="mt-4 text-sm text-center text-gray-400 leading-5">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Billing */}
      <div className="rounded-[28px] border border-green-500/20 bg-[#071224] p-5 md:p-8">

        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-green-400">
          Billing Summary
        </h3>

        <div className="space-y-5">

          {/* Service */}
          <div className="flex items-center justify-between gap-4">

            <span className="text-gray-400 text-sm md:text-base">
              Service Price
            </span>

            <span className="text-xl md:text-2xl font-bold break-words text-right">
              CAD $40.00
            </span>
          </div>

          {/* Tax */}
          <div className="flex items-center justify-between gap-4">

            <span className="text-gray-400 text-sm md:text-base">
              Tax (5%)
            </span>

            <span className="text-xl md:text-2xl font-bold break-words text-right">
              CAD $2.00
            </span>
          </div>

          {/* Total */}
          <div className="border-t border-white/10 pt-6 flex items-center justify-between gap-4">

            <span className="text-2xl md:text-3xl font-bold">
              Total
            </span>

            <span className="text-3xl md:text-5xl font-bold text-green-400 break-words text-right">
              CAD $42.00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}