"use client";

import {
  User,
  Phone,
  Mail,
} from "lucide-react";

export default function PersonalInformationPage() {
  return (
    <div className="min-h-screen bg-[#020817] text-white px-4 py-6 md:px-6">

      <div className="mx-auto max-w-2xl">

        {/* Avatar */}
        <div className="mb-8 flex flex-col items-center">

          <div className="flex h-28 w-28 items-center justify-center rounded-full border-[4px] border-[#1B2A45] bg-[#071224] text-5xl font-bold text-[#4A86F7] shadow-lg">
            U
          </div>

          <h2 className="mt-4 text-3xl font-bold">
            User
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Customer Account
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5 rounded-[28px] border border-white/10 bg-[#071224] p-5 md:p-6">

          {/* Full Name */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-300">
              Full Name
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1B34] px-4 py-3">

              <User size={18} className="text-gray-400" />

              <input
                type="text"
                defaultValue="User"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-300">
              Phone Number
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1B34] px-4 py-3">

              <Phone size={18} className="text-gray-400" />

              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-[#0B1B34] px-4 py-3">

              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                defaultValue="codeblessme@gmail.com"
                disabled
                className="w-full bg-transparent text-sm text-gray-500 outline-none"
              />
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Email address cannot be changed.
            </p>
          </div>

          {/* Button */}
          <button className="mt-2 w-full rounded-2xl bg-[#4A86F7] px-6 py-3 text-sm font-semibold transition hover:bg-[#2563EB]">

            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}