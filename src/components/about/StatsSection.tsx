"use client";
import React, { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa6";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";

// --- Counter Sub-Component ---
const Counter = ({ value }: { value: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  // Extract the numeric part (e.g., "120" from "120+")
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, motionValue, numericValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        (ref.current as HTMLElement).textContent = Math.floor(latest).toString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const StatsSection = () => {
  const stats = [
    { label: "Completed Projects", value: "120+" },
    { label: "Years Experience", value: "6+" },
    { label: "Team Members", value: "8+" },
    { label: "Google Rating", value: "5", hasStar: true },
  ];

  return (
    <section className="bg-[#0B4E9B] py-12 px-6">
      <div className="container-custom mx-auto flex flex-wrap justify-between items-center">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            {/* Stat Item */}
            <div className="flex-1 min-w-[150px] text-center text-white py-3">
              <div className="text-5xl md:text-6xl font-semibold mb-3 flex items-center justify-center gap-1">
                <Counter value={stat.value} />
                {stat.hasStar && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    viewport={{ once: true }}
                  >
                    <FaStar className="text-white text-4xl md:text-5xl" />
                  </motion.div>
                )}
              </div>
              <p className="text-lg font-semibold opacity-95 tracking-wide">
                {stat.label}
              </p>
            </div>

            {/* Divider */}
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