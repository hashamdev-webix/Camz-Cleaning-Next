import {
  Bell,
  RefreshCw,
  Search,
  Car,
  Sparkles,
  Home,
  Building2,
} from "lucide-react";

const categories = [
  {
    name: "Vehicle",
    icon: Car,
    color: "text-red-400",
  },
  {
    name: "Specialty",
    icon: Sparkles,
    color: "text-purple-400",
  },
  {
    name: "Residential",
    icon: Home,
    color: "text-blue-400",
  },
  {
    name: "Commercial",
    icon: Building2,
    color: "text-green-400",
  },
];

const services = [
  {
    title: "Vehicle Detailing",
    description:
      "Professional exterior and interior car detailing.",
    price: "CAD $40.00 or $10/hr",
    type: "Fixed & Hourly Available",
    icon: Car,
  },

  {
    title: "Residential Cleaning",
    description:
      "Standard cleaning for bedrooms, bathrooms and living areas.",
    price: "CAD $50.00 or $35/hr",
    type: "Fixed & Hourly Available",
    icon: Home,
  },

  {
    title: "Move-In / Move-Out",
    description:
      "Thorough cleaning for relocations and empty properties.",
    price: "CAD $120.00",
    type: "Fixed Price",
    icon: Sparkles,
  },

  {
    title: "Commercial Cleaning",
    description:
      "Custom cleaning plans for businesses and offices.",
    price: "CAD $100 or $40/hr",
    type: "Fixed & Hourly Available",
    icon: Building2,
  },
];

export default function DashboardHomePage() {
  return (
    <div className="min-h-screen bg-[#020817] text-white p-4 md:p-8">

      {/* Top Bar */}
      <div className="flex items-start justify-between mb-8">

        <div>
          <p className="text-gray-400 text-sm">
            Current Location
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Calgary, AB
          </h2>
        </div>

     
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400"
          size={24}
        />

        <input
          type="text"
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

          <p className="text-white/80 text-lg">
            Expert deep cleaning service
          </p>
        </div>

        <div className="absolute right-0 top-0 h-full w-[40%] bg-white/5 blur-3xl" />
      </div>

      {/* Categories */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-bold">
          Service Categories
        </h3>

        <button className="text-blue-400 font-semibold">
          See All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-12">
        {categories.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-[#071224] p-6 text-center hover:border-blue-500 transition"
            >
              <div className={`mx-auto mb-4 w-16 h-16 rounded-2xl bg-[#0B1B34] flex items-center justify-center ${item.color}`}>
                <Icon size={30} />
              </div>

              <p className="font-semibold">
                {item.name}
              </p>
            </div>
          );
        })}
      </div>

      {/* Services */}
      <h3 className="text-3xl font-bold mb-8">
        Recommended Services
      </h3>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <div
              key={index}
              className="rounded-[32px] border border-blue-500/20 bg-[#071224] p-7 shadow-[0_0_40px_rgba(37,99,235,0.08)]"
            >
              <div className="flex flex-col sm:flex-row gap-5">

                {/* Icon */}
                <div className="w-20 h-20 rounded-3xl bg-[#0B1B34] flex items-center justify-center text-blue-400 flex-shrink-0 mx-auto sm:mx-0">
                  <Icon size={34} />
                </div>

                {/* Content */}
                <div className="flex-1">

                  <span className="inline-block rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 mb-4">
                    VERIFIED
                  </span>

                  <h4 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                    {service.title}
                  </h4>

                  <p className="text-gray-400 leading-7 mb-6 text-sm md:text-base">
                    {service.description}
                  </p>

                  <div className="flex flex-col gap-5">

                    <div>
                      <h5 className="text-2xl md:text-3xl font-bold text-blue-400 break-words">
                        {service.price}
                      </h5>

                      <p className="text-sm text-gray-500 mt-1">
                        {service.type}
                      </p>
                    </div>

                    <button className="w-full sm:w-fit rounded-2xl bg-[#4A86F7] px-8 py-4 font-bold hover:bg-[#2563EB] transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}