"use client";

import {
  CalendarCheck,
  ClipboardCheck,
  MessagesSquare,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const StatsSection = () => {
  const items = [
    {
      title: "Clear Service Scope",
      description: "Cleaning requirements reviewed before the appointment.",
      icon: ClipboardCheck,
    },
    {
      title: "Flexible Booking",
      description: "Choose your preferred service and appointment online.",
      icon: CalendarCheck,
    },
    {
      title: "Service Communication",
      description: "Important booking and access details can be confirmed clearly.",
      icon: MessagesSquare,
    },
    {
      title: "Careful Cleaning",
      description: "Work focused on the agreed cleaning priorities and scope.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="bg-[#0B4E9B] px-6 py-14">
      <div className="container-custom mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="text-center text-white"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Icon size={30} strokeWidth={1.8} />
              </div>

              <h3 className="mb-2 text-xl font-bold">
                {item.title}
              </h3>

              <p className="text-sm leading-6 text-blue-100">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsSection;