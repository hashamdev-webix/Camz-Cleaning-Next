"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutSection = () => {
  // Animation variants for the container (staggering children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for individual items sliding up
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-[#EFFAFC] py-16 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Image Collage */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex gap-4 items-center"
        >
          {/* Main Large Image */}
          <div className="relative w-2/3 aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
            <Image 
              src="/about-img1.webp" 
              alt="Clean Kitchen" 
              fill
              className="object-cover"
            />
          </div>

          {/* Right Column of Collage */}
          <div className="w-1/3 flex flex-col gap-4">
            {/* Experience Circle with Pop Animation */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
              className="bg-[#00B7EB] aspect-square rounded-full flex flex-col justify-center items-center text-white text-center p-4 shadow-md z-10"
            >
              <span className="text-3xl md:text-5xl font-bold">6+</span>
              <span className="text-[10px] md:text-sm uppercase font-semibold leading-tight">
                Years of<br/>Experiences
              </span>
            </motion.div>
            
            {/* Smaller Secondary Image */}
            <div className="relative aspect-[3/5] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
              <Image 
                src="/about-img2.webp" 
                alt="Cleaning detail" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.span variants={itemVariants} className="inline-block bg-[#00B7EB] text-white px-4 py-1 rounded-full text-sm font-semibold">
            About Us
          </motion.span>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-[#004A8C] leading-tight">
            Reliable & Affordable  <br /> Cleaning Experts
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed">
           Focused on professional cleaning excellence, Camz Cleaning provides trusted services designed to keep your space spotless and well-maintained.
          </motion.p>

          {/* Feature List */}
          <div className="space-y-8">
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-20 h-20 bg-white rounded-full border-4 border-[#D1EEF4] flex items-center justify-center p-3 shadow-sm">
                <Image src="/home.png" alt="Home" width={40} height={40} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#004A8C]">Trusted Home Care</h4>
                <p className="text-gray-500 text-sm">
                 Camz Cleaning provides dependable residential cleaning that keeps your home fresh, hygienic, and comfortable using safe and effective methods.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-20 h-20 bg-white rounded-full border-4 border-[#D1EEF4] flex items-center justify-center p-3 shadow-sm">
                <Image src="/clean.png" alt="Office" width={40} height={40} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#004A8C]">Workplace Cleaning Experts</h4>
                <p className="text-gray-500 text-sm">
                  From small offices to large workplaces, Camz Cleaning ensures spotless, organized, and productive environments with reliable and affordable solutions.
                </p>
              </div>
            </motion.div>
          </div>

          
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;