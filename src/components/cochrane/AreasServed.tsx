"use client";
import Image from 'next/image';
import Link from 'next/link';
const AreasServed = () => {
 
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="container-custom mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/wp-admin/uploads/sink cleaning.webp" 
            alt="Clean kitchen cabinets"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#004A8C] mb-2">
            Areas We Serve
          </h2>

          <p className="text-gray-700 leading-relaxed font-medium">
            CamzCleaning proudly serves Calgary, Airdrie, Cochrane, and Chestermere. We provide professional seasonal property services, move-in/move-out cleaning, and home maintenance, ensuring your home and yard stay spotless, safe, and well-maintained throughout the year.
          </p>

         

          <div className="pt-4">
            <Link 
              href="/contact" 
              className="inline-block bg-gradient-to-r from-[#0091C1] to-[#004A8C] text-white px-10 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AreasServed;