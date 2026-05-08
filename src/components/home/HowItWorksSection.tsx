"use client";
import { motion, Variants } from 'framer-motion';
import Image from "next/image";
import { ListChecks, CalendarDays, Sparkles } from "lucide-react";
import { LucideIcon } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  Icon: LucideIcon; // Use this type
}
const HowItWorksSection = () => {
  // --- Define the Steps ---
  const steps: Step[] = [
    {
      number: "01",
      Icon: ListChecks,
      title: "Select Service",
      description: "Choose the cleaning service that best fits your home or office needs.",
    },
    {
      number: "02",
      Icon: CalendarDays,
      title: "Set Schedule",
      description: "Choose a convenient date and time that best fits your schedule.",
    },
    {
      number: "03",
      Icon: Sparkles,
      title: "Cleaning Done",
      description: "Our team finishes the job carefully, leaving your space spotless and refreshed.",
    },
  ];

  // Fix: Assign icons to capitalized variables for JSX parsing
  const Icon1 = steps[0].Icon;
  const Icon2 = steps[1].Icon;
  const Icon3 = steps[2].Icon;

  // --- Animation Variants ---

  const centerCircleVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const leftCircleVariants: Variants = {
    hidden: { scale: 0.5, opacity: 0, x: "200%" },
    visible: {
      scale: 1,
      opacity: 1,
      x: "0%",
      transition: {
        delay: 0.7,
        duration: 0.8,
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    },
  };

  const rightCircleVariants: Variants = {
    hidden: { scale: 0.5, opacity: 0, x: "-200%" },
    visible: {
      scale: 1,
      opacity: 1,
      x: "0%",
      transition: {
        delay: 0.7,
        duration: 0.8,
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (customIndex) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.6 + customIndex * 0.2,
        duration: 0.5,
      },
    }),
  };

  const arrowVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: (customDelay) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.4 + customDelay,
        duration: 0.6,
      },
    }),
  };

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="container-custom mx-auto text-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 md:mb-24">
          <span className="bg-[#00B7EB] text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            How It Works
          </span>
          <h1 className=" font-extrabold text-[#004A8C] leading-tight mb-4">
            Schedule Your Cleaning Anytime
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Book your cleaning service in just minutes through a quick, simple, and flexible process tailored to fit your schedule, making it easy and convenient for you.
          </p>
        </div>

        {/* Process Flow Animation Container */}
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-8 md:gap-4 items-center">
          
          {/* STEP 01 - Fly from Center to Left */}
          <motion.div
            className="flex flex-col items-center text-center w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={leftCircleVariants}
          >
            <div className="relative flex-shrink-0 mb-8 w-44 h-44 border border-[#BDE8F2] rounded-full flex items-center justify-center p-3 shadow-sm bg-white">
              <div className="w-full h-full bg-[#00B7EB] rounded-full flex items-center justify-center relative">
                <Icon1 className="w-16 h-16 text-white stroke-[1.5]" />
                <div className="absolute -bottom-4 -right-4 bg-[#004A8C] text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                  {steps[0].number}
                </div>
              </div>
            </div>
            <motion.div variants={contentVariants} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h4 className="text-2xl font-extrabold text-[#004A8C] mb-2">{steps[0].title}</h4>
              <p className="text-gray-600 text-sm max-w-[280px] mx-auto">{steps[0].description}</p>
            </motion.div>
          </motion.div>

          {/* ARROW 1 */}
          <motion.div 
            className="hidden md:flex flex-col items-center justify-center self-start pt-20"
            variants={arrowVariants}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative w-28 h-6">
              <Image src="/arrow.png" alt="Process flow" fill className="object-contain" />
            </div>
          </motion.div>

          {/* STEP 02 - Appears first in the Center */}
          <motion.div
            className="flex flex-col items-center text-center w-full relative z-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={centerCircleVariants}
          >
            <div className="relative flex-shrink-0 mb-8 w-44 h-44 border border-[#BDE8F2] rounded-full flex items-center justify-center p-3 shadow-sm bg-white">
              <div className="w-full h-full bg-[#00B7EB] rounded-full flex items-center justify-center relative">
                <Icon2 className="w-16 h-16 text-white stroke-[1.5]" />
                <div className="absolute -bottom-4 -right-4 bg-[#004A8C] text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                  {steps[1].number}
                </div>
              </div>
            </div>
            <h4 className="text-2xl font-extrabold text-[#004A8C] mb-2">{steps[1].title}</h4>
            <p className="text-gray-600 text-sm max-w-[280px] mx-auto">{steps[1].description}</p>
          </motion.div>

          {/* ARROW 2 */}
          <motion.div 
            className="hidden md:flex flex-col items-center justify-center self-start pt-20"
            variants={arrowVariants}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative w-28 h-6">
              <Image src="/arrow.png" alt="Process flow" fill className="object-contain" />
            </div>
          </motion.div>

          {/* STEP 03 - Fly from Center to Right */}
          <motion.div
            className="flex flex-col items-center text-center w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={rightCircleVariants}
          >
            <div className="relative flex-shrink-0 mb-8 w-44 h-44 border border-[#BDE8F2] rounded-full flex items-center justify-center p-3 shadow-sm bg-white">
              <div className="w-full h-full bg-[#00B7EB] rounded-full flex items-center justify-center relative">
                <Icon3 className="w-16 h-16 text-white stroke-[1.5]" />
                <div className="absolute -bottom-4 -right-4 bg-[#004A8C] text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                  {steps[2].number}
                </div>
              </div>
            </div>
            <motion.div variants={contentVariants} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h4 className="text-2xl font-extrabold text-[#004A8C] mb-2">{steps[2].title}</h4>
              <p className="text-gray-600 text-sm max-w-[280px] mx-auto">{steps[2].description}</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;