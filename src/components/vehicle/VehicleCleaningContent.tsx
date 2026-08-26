"use client";

import Link from "next/link";

const VehicleCleaningContent = () => {
  const services = [
    {
      title: "Exterior Vehicle Cleaning",
      description:
        "Exterior cleaning may include washing the vehicle body, wheels and tires based on the selected package and vehicle condition.",
    },
    {
      title: "Interior Vacuuming and Surface Cleaning",
      description:
        "Interior service may include vacuuming seats, carpets and mats, along with cleaning accessible dashboard, console and interior surfaces.",
    },
    {
      title: "Windows and Mirrors",
      description:
        "Accessible interior and exterior glass, windows and mirrors can be cleaned as part of the selected vehicle cleaning package.",
    },
    {
      title: "Seats, Mats and Carpets",
      description:
        "Seats, floor mats and carpets can receive additional attention depending on their material, condition and the selected service.",
    },
    {
      title: "Wheels and Tires",
      description:
        "Wheel and tire cleaning may be included to remove ordinary road dirt and surface buildup according to the selected package.",
    },
  ];

  const coverageItems = [
    "Vehicle Exterior",
    "Wheels and Tires",
    "Interior Vacuuming",
    "Dashboard and Console",
    "Windows and Mirrors",
    "Seats, Mats and Carpets",
  ];

  const carouselData = [
    {
      src: "/wp-admin/uploads/vehicle.webp",
      alt: "Mobile vehicle cleaning service",
    },
    {
      src: "/wp-admin/uploads/vehicle-cleaning-1.webp",
      alt: "Vehicle interior cleaning",
    },
    {
      src: "/wp-admin/uploads/vehicle-cleaning2.webp",
      alt: "Exterior vehicle cleaning",
    },
    {
      src: "/wp-admin/uploads/vehicle-cleaning3.webp",
      alt: "Dashboard and interior vehicle cleaning",
    },
  ];

  return (
    <div className="space-y-12 text-gray-700">
      {/* Introduction */}
      <section className="space-y-6">
        <h2 className="text-3xl font-extrabold leading-tight text-[#0B4E9B] md:text-4xl">
          Interior and Exterior Detailing at Your Location
        </h2>

        <div className="overflow-hidden rounded-[2rem] shadow-md">
          <img
            src="/wp-admin/uploads/vehicle.webp"
            alt="Mobile vehicle cleaning and detailing"
            width={1200}
            height={800}
            className="h-[300px] w-full object-cover md:h-[450px]"
          />
        </div>

        <p className="font-medium leading-relaxed">
          Camz Cleaning provides mobile vehicle cleaning in Calgary, with
          service also available in Airdrie, Cochrane and Chestermere.
          Appointment availability depends on the location, weather, safe
          parking and the selected cleaning package.
        </p>
      </section>

      {/* Services */}
      <section className="space-y-8">
        <h2 className="text-2xl font-extrabold text-[#0B4E9B] md:text-4xl">
          Vehicle Cleaning Services
        </h2>

        <p className="leading-relaxed">
          Choose the level of interior and exterior cleaning that matches your
          vehicle, its current condition and the work you want completed.
        </p>

        <div className="space-y-7">
          {services.map((service) => (
            <div key={service.title} className="space-y-2">
              <h3 className="text-xl font-bold text-[#0B4E9B]">
                {service.title}
              </h3>

              <p className="leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coverage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-extrabold text-[#0B4E9B] md:text-4xl">
          Areas We Clean in Your Vehicle
        </h2>

        <div className="grid grid-cols-1 items-center gap-8 overflow-hidden md:grid-cols-2">
          <ul className="space-y-3">
            {coverageItems.map((item, index) => (
              <li
                key={item}
                className="flex items-center gap-3 font-semibold text-[#0B4E9B]"
              >
                <span>{index + 1}.</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          <div className="relative h-[250px] w-full overflow-hidden rounded-2xl">
            <div className="flex h-full w-[400%] animate-slide gap-4">
              {[...carouselData, ...carouselData].map((img, index) => (
                <div
                  key={`${img.src}-${index}`}
                  className="h-full w-1/2 flex-shrink-0 px-2"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={1200}
            height={800}
            className="h-full w-full rounded-2xl object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        .animate-slide {
          animation: slide 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default VehicleCleaningContent;