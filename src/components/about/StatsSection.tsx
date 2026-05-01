import React from "react";
import { FaStar } from "react-icons/fa6";

const StatsSection = () => {
  const stats = [
    { label: "Completed Projects", value: "120+" },
    { label: "Years Experience", value: "6+" },
    { label: "Team Members", value: "8+" },
    { label: "Google Rating", value: "5", hasStar: true },
  ];

  return (
    <section className="bg-[#0E53A3] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            {/* Stat Item */}
            <div className="flex-1 min-w-[200px] text-center text-white py-6">
              <div className="text-5xl md:text-6xl font-semibold mb-3 flex items-center justify-center gap-1">
                {stat.value}
                {stat.hasStar && <FaStar className="text-white text-4xl md:text-5xl" />}
              </div>
              <p className="text-lg font-semibold opacity-95 tracking-wide">
                {stat.label}
              </p>
            </div>

            {/* Divider - Hidden on the last item and on small screens */}
            {index !== stats.length - 1 && (
              <div className="hidden lg:block w-[1px] h-24 bg-white/30 self-center" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;