"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    id: 1,
    question: "Q1: What are the Cochrane Cleaning Services offered by Camz Cleaning?",
    answer: "Camz Cleaning provides professional Cochrane cleaning services for homes and offices, including dusting, deep kitchen and bathroom cleaning, floor polishing, and surface sanitization.",
  },
  {
    id: 2,
    question: "Q2: Why should I choose Camz Cleaning for Cochrane Cleaning Services?",
    answer: "Clients trust our Cochrane cleaning services for attention to detail, safe cleaning methods, consistency, and exceptional customer satisfaction.",
  },
  {
    id: 3,
    question: "Q3: Are your Cochrane Cleaning Services suitable for residential and commercial spaces?",
    answer: "Yes! Our services are designed for both residential and commercial properties, ensuring every space is spotless, hygienic, and well-maintained.",
  },
 
  {
    id: 4,
    question: "Q4: Do your Cochrane Cleaning Services guarantee long-term cleanliness?",
    answer: "Absolutely! We focus on thorough and professional cleaning techniques that maintain hygiene and keep your home or office fresh for the long term.",
  },
];

const FAQSection = () => {
  const [activeId, setActiveId] = useState(1);

  const toggleAccordion = (id:any) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="bg-[#EFFAFC] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="bg-[#00B7EB] text-white px-5 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block">
            FAQs
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#004A8C] mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Find clear answers to common questions about our cleaning services, booking process, pricing, and service areas to help you decide confidently.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqData.map((faq) => {
            const isActive = activeId === faq.id;
            
            return (
              <div key={faq.id} className="overflow-hidden">
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className={`w-full flex items-center justify-between p-5 md:px-8 md:py-6 text-left transition-all duration-300 rounded-xl ${
                    isActive 
                      ? "bg-[#00B7EB] text-white shadow-lg" 
                      : "bg-[#004A8C] text-white hover:bg-[#003d75]"
                  }`}
                >
                  <span className="text-lg md:text-xl font-bold">
                    {faq.question}
                  </span>
                  {isActive ? (
                    <ChevronUp className="w-6 h-6 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 md:px-8 text-gray-700 text-lg leading-relaxed border-x border-b border-gray-100 rounded-b-xl -mt-2 pt-8">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;