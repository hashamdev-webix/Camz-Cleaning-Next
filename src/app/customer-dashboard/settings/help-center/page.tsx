"use client";

import { useState } from "react";
import {
  MessageSquare,
  AlignLeft,
  History,
} from "lucide-react";

export default function HelpCenterPage() {

  const [activeTab, setActiveTab] = useState("support");

  return (
    <div className="min-h-screen bg-[#020817] text-white">

      {/* Tabs */}
      <div className="border-b border-white/10">

        <div className="flex">

          <button
            onClick={() => setActiveTab("support")}
            className={`relative flex-1 py-4 text-sm md:text-base font-semibold transition ${
              activeTab === "support"
                ? "text-[#4A86F7]"
                : "text-gray-500"
            }`}
          >
            Contact Support

            {activeTab === "support" && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#4A86F7]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`relative flex-1 py-4 text-sm md:text-base font-semibold transition ${
              activeTab === "history"
                ? "text-[#4A86F7]"
                : "text-gray-500"
            }`}
          >
            Ticket History

            {activeTab === "history" && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#4A86F7]" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-7 md:px-6">

        {/* SUPPORT */}
        {activeTab === "support" && (

          <div className="mx-auto max-w-2xl">

            {/* Heading */}
            <h2 className="mb-2 text-2xl md:text-3xl font-bold">
              How can we help you?
            </h2>

            <p className="mb-7 text-sm md:text-base leading-7 text-gray-400">
              Submit a ticket and our team will get back
              to you within 24 hours.
            </p>

            <div className="space-y-5">

              {/* Subject */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Subject
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#071224] px-4 py-3">

                  <MessageSquare size={18} className="text-gray-400" />

                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Detailed Description
                </label>

                <div className="rounded-2xl border border-white/10 bg-[#071224] p-4">

                  <div className="mb-3 text-gray-400">
                    <AlignLeft size={18} />
                  </div>

                  <textarea
                    rows={6}
                    placeholder="Detailed Description"
                    className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Button */}
              <button className="rounded-2xl bg-[#4A86F7] px-7 py-3 text-sm font-semibold transition hover:bg-[#2563EB]">

                Submit Ticket
              </button>
            </div>
          </div>
        )}

        {/* HISTORY */}
        {activeTab === "history" && (

          <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

            <div className="mb-5 text-gray-700">
              <History size={70} strokeWidth={1.3} />
            </div>

            <h3 className="text-xl font-semibold text-gray-400">
              No tickets yet.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}