import React from "react";
import Link from "next/link";
import { 
  IoMailOutline, 
  IoCallOutline, 
  IoTimeOutline, 
  IoLocationOutline, 
  IoCheckmarkCircleOutline,
  IoLogoInstagram, 
  IoLogoFacebook, 
  IoLogoLinkedin, 
  IoLogoYoutube 
} from "react-icons/io5";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Our Services", href: "/services" },
    { name: "Our Gallery", href: "/gallery" },
    { name: "Our Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
  ];

  const services = [
  

      { name: "Commercial Cleaning", href: "/commercial-cleaning-services" },
    { name: "Residential Cleaning", href: "/residential-cleaning-services" },
    { name: "Vehicle Cleaning", href: "/vehicle-cleaning-service" },
    { name: "Seasonal Cleaning", href: "/seasonal-property-service" },
  ];
  return (
    <footer className="bg-gradient-to-r from-[#1E5D9E] to-[#16497D] text-white pt-16 pb-8 px-6 md:px-12 lg:px-24 border border-t border-l-0 border-r-0 border-b-0 border-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Column 1: Logo & Info */}
        <div className="space-y-6">
          <img src="/wp-admin/uploads/footer-logo.webp" alt="Camz Cleaning" className="h-16 w-auto " />
          <p className="text-white text-sm leading-relaxed">
           <span className="text-white text-sm"> Camz Cleaning delivers reliable, professional residential and commercial cleaning services 
            focused on quality, consistency, and complete customer satisfaction across communities.</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="font-bold text-sm">Follow Us On:</span>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/camzcleaning" className="hover:text-cyan-400 transition-colors"><IoLogoInstagram size={20} /></a>
              <a href="https://x.com/camzcleaning" className="hover:text-cyan-400 transition-colors"><FaXTwitter size={18} /></a>
              <a href="https://web.facebook.com/Camzcleaning1?_rdc=1&_rdr#" className="hover:text-cyan-400 transition-colors"><IoLogoFacebook size={20} /></a>
              <a href="https://www.linkedin.com/company/camzcleaning" className="hover:text-cyan-400 transition-colors"><IoLogoLinkedin size={20} /></a>
              <a href="https://www.youtube.com/@CamzCleaning" className="hover:text-cyan-400 transition-colors"><IoLogoYoutube size={20} /></a>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-extrabold mb-6">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="flex items-center gap-2 text-blue-50 hover:text-cyan-400 transition-colors text-sm">
                  <IoCheckmarkCircleOutline size={18} className="text-white" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Our Services */}
        <div>
          <h3 className="text-xl font-extrabold mb-6">Our Services</h3>
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.name}>
                <Link href={service.href} className="flex items-center gap-2 text-blue-50 hover:text-cyan-400 transition-colors text-sm">
                  <IoCheckmarkCircleOutline size={18} className="text-white" />
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h3 className="text-xl font-extrabold mb-6">Contact Info</h3>
          <ul className="space-y-5">
            <li className="flex items-center gap-3 text-sm">
              <div className="bg-white/10 p-2 rounded-md"><IoMailOutline size={20} /></div>
              info@camzcleaning.com
            </li>
            <li className="flex items-center gap-3 text-sm">
              <div className="bg-white/10 p-2 rounded-md"><IoCallOutline size={20} /></div>
              +1 587-837-1977
            </li>
            <li className="flex items-center gap-3 text-sm">
              <div className="bg-white/10 p-2 rounded-md"><IoTimeOutline size={20} /></div>
              9:00 AM – 5:00 PM
            </li>
            <li className="flex items-center gap-3 text-sm">
              <div className="bg-white/10 p-2 rounded-md"><IoLocationOutline size={20} /></div>
              Calgary, AB, Canada
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/70 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
        <p><span className="text-white">Copyright © {currentYear} Camz Cleaning All rights reserved</span> </p>
        <Link href="/privacy-policy" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
          <IoCheckmarkCircleOutline size={18} />
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;