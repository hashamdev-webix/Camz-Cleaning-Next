
import Image from 'next/image';
import Link from 'next/link';

const AirdrieCleaningServices = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-block bg-[#00CEE6] text-white px-5 py-1.5 rounded-full text-sm font-semibold tracking-wide">
           Airdrie
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#004A8C] leading-[1.1]">
           Professional Residential and Commercial Cleaning Services in Airdrie
          </h2>

          {/* Description Paragraphs */}
          <div className="space-y-5 text-gray-700 leading-relaxed font-medium">
            <p>
            Life in Airdrie can be busy, making it hard to keep your home or business spotless. Camz Cleaning provides trusted local services from residential and commercial cleaning to vehicle care and seasonal maintenance all handled by our certified team, ensuring convenience, quality, and a fresh, worry-free space every time.
            </p>
            <p>
             We proudly serve the entire Airdrie area with reliable and affordable services. Whether you are comparing Airdrie house cleaning prices or checking general cleaning services For Calgary prices, we offer transparent quotes and consistent quality.
            </p>
          </div>

        

          {/* Subtitle / Promise */}
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#004A8C] pt-4">
            100% Satisfaction Assured
          </h3>

          {/* Call to Action Button */}
          <div className="pt-2">
            <Link 
              href="/contact" 
              className="inline-block bg-gradient-to-r from-[#0091C1] to-[#004A8C] text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg transition-shadow duration-300 active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right Side: Image with premium styling */}
        <div className="relative group">
          {/* Decorative Background Element */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#00CEE6]/10 to-[#004A8C]/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500" />
          
          {/* Image Container with Border and Radius */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-[10px] border-white z-10">
            <Image
              src="/wp-admin/uploads/vehicle.webp" 
              alt="Professional Cleaning in Calgary"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority 
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AirdrieCleaningServices;