"use client"
import React, { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqs = [
    {
      question: "1. What cleaning services do you offer?",
      answer: "We provide residential, commercial, vehicle, and seasonal property cleaning services tailored to your specific needs.",
    },
    {
      question: "2. Do you bring your own cleaning supplies?",
      answer: "Yes, our team arrives fully equipped with safe, professional-grade cleaning products and tools.",
    },
    {
      question: "3. How can I book a cleaning service?",
      answer: "You can contact us directly or use our booking form to schedule your preferred service and time.",
    },
    {
      question: "4. Do you offer flexible cleaning schedules?",
      answer: "Yes, we provide flexible scheduling options including weekly, bi-weekly, one-time, and after-hours cleaning services to suit your convenience.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: Image */}
        <div className="relative h-full min-h-[300px]">
          <div className="rounded-[2.5rem] overflow-hidden  shadow-lg">
            <img 
              src="/wp-admin/uploads/stairs cleaning.webp" 
              alt=" stairs cleaning" 
              className="w-full h-[700px] object-cover"
            />
          </div>
        </div>

        {/* Right Side: FAQs */}
        <div className="space-y-6">
          <div className="space-y-4">
            <span className="bg-[#00CFE8] text-white text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              FAQs
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B4E9B] leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-lg text-sm">
              Find clear answers to common questions about our cleaning services, 
              booking process, pricing, and service areas to help you decide confidently.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-4">
                {/* Question Header */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className={`w-full flex items-center justify-between p-5 rounded-xl font-bold transition-all duration-300 text-left ${
                    openIndex === index 
                    ? "bg-[#00CFE8] text-white" 
                    : "bg-[#0B4E9B] text-white hover:bg-[#094282]"
                  }`}
                >
                  <span className="text-sm md:text-base">{faq.question}</span>
                  {openIndex === index ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
                </button>

                {/* Answer Content */}
                {openIndex === index && (
                  <div className="px-5 pb-2 text-gray-600 text-sm md:text-base leading-relaxed animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;