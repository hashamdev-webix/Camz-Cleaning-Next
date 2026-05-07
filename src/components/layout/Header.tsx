"use client";

import { useState } from "react";
import { Mail, Phone, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Dropdown Data
  const serviceLinks = [
    { name: "COMMERCIAL CLEANING", href: "/commercial-cleaning-services" },
    { name: "RESIDENTIAL CLEANING", href: "/residential-cleaning-services" },
    { name: "VEHICLE CLEANING", href: "/vehicle-cleaning-service" },
    { name: "SEASONAL CLEANING", href: "/seasonal-property-service" },
  ];

  const areaLinks = [
    { name: "CALGARY", href: "/calgary-cleaning-services" },
    { name: "AIRDRIE", href: "/airdrie-cleaning-services" },
    { name: "COCHRANE", href: "/cochrane-cleaning-services" },
    { name: "CHESTERMERE", href: "/chestermere-cleaning-services" },
  ];

  return (
    <header className="w-full shadow-sm relative z-50">
      {/* 🔵 TOP BAR */}
      <div className="bg-[#4276B2] text-white hidden md:block text-sm md:text-lg py-2 md:py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          {/* Left */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span className="flex items-center gap-2">
              <Mail size={14} />
              info@camzcleaning.com
            </span>
            <span className="flex items-center gap-2">
              <Phone size={14} />
              +1 587-837-1977
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <span className="hidden md:block">Follow Us:</span>
            <a href="https://www.instagram.com/camzcleaning">
              <FaInstagram size={16} />
            </a>
            <a href="https://x.com/camzcleaning">
              <FaTwitter size={16} />
            </a>
            <a href="https://web.facebook.com/Camzcleaning1?_rdc=1&_rdr#">
              <FaFacebookF size={16} />
            </a>
            <a href="https://www.linkedin.com/company/camzcleaning">
              <FaLinkedinIn size={16} />
            </a>
            <a href="https://www.youtube.com/@CamzCleaning">
              <FaYoutube size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* ⚪ NAVBAR */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <img
              src="/logo.webp"
              alt="Camz Cleaning"
              className="h-12 md:h-16 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-lg font-medium text-[#0B4E9B]">
            <Link href="/" className="hover:text-[#00B7EB] transition-colors">
              HOME
            </Link>
            <Link
              href="/about-us"
              className="hover:text-[#00B7EB] transition-colors"
            >
              ABOUT US
            </Link>

            {/* Services Dropdown */}
            <div className="relative group cursor-pointer py-2">
              <div className="flex items-center gap-1 group-hover:text-[#00B7EB] transition-colors">
                SERVICES <ChevronDown size={16} />
              </div>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-xl border-t-2 border-[#00B7EB] min-w-[250px] py-2">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-6 py-3 hover:bg-gray-50 hover:text-[#00B7EB] transition-all border-b border-gray-50 last:border-0"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Areas Dropdown */}
            <div className="relative group cursor-pointer py-2">
              <div className="flex items-center gap-1 group-hover:text-[#00B7EB] transition-colors">
                AREAS <ChevronDown size={16} />
              </div>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-xl border-t-2 border-[#00B7EB] min-w-[200px] py-2">
                {areaLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-6 py-3 hover:bg-gray-50 hover:text-[#00B7EB] transition-all border-b border-gray-50 last:border-0"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/booking"
              className="hover:text-[#00B7EB] transition-colors"
            >
              ONLINE BOOKING
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#00B7EB] transition-colors"
            >
              CONTACT US
            </Link>
          </nav>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <Link href="/login">
              <button className="bg-[#0B4E9B] text-white px-8 py-2.5 rounded-md font-bold hover:bg-[#00B7EB] transition-all">
                Login
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#0B4E9B]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* 📱 Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t px-6 py-6 flex flex-col gap-4 text-[#0B4E9B] font-bold max-h-[80vh] overflow-y-auto">
            <Link href="/" onClick={() => setIsOpen(false)}>
              HOME
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              ABOUT US
            </Link>

            {/* Mobile Services */}
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 text-xs uppercase tracking-widest">
                Services
              </p>
              {serviceLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="pl-4 py-1 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Areas */}
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 text-xs uppercase tracking-widest">
                Areas
              </p>
              {areaLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="pl-4 py-1 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Link href="/booking" onClick={() => setIsOpen(false)}>
              ONLINE BOOKING
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              CONTACT US
            </Link>

            <Link href="/login" onClick={() => setIsOpen(false)}>
              <button className="bg-[#0B4E9B] text-white w-full py-3 rounded-md mt-2">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
