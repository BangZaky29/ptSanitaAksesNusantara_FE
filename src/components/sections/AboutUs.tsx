import { motion } from "motion/react";
import { SITE_CONTENT } from "../../constants/siteContent";

export default function AboutUs() {
  const content = SITE_CONTENT.director;
  
  return (
    <section id="about" className="py-24 bg-accent relative overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column - Header & Short Quote */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-extrabold text-5xl md:text-7xl mb-2 text-white/90 leading-none">
                DIREKTUR
              </h2>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-wide uppercase leading-tight mb-16">
                MESSAGE FROM THE<br />DIRECTOR
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-auto"
            >
              <h4 className="font-display font-bold text-3xl mb-4">
                {content.name}
              </h4>
              <p className="text-white/80 leading-relaxed text-lg font-medium pr-8">
                {content.shortQuote}
              </p>
            </motion.div>
          </div>

          {/* Right Column - Image & Message */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Director Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] bg-primary/20 mb-10 overflow-hidden shadow-2xl relative"
            >
              <img 
                src="/people/(TRANSPARENT) Sandi_Irawan-DIREKTUR.webp"
                alt={`${content.name} - ${content.title}`} 
                className="w-full h-full object-contain object-bottom transition-all duration-700 bg-primary/30"
              />
            </motion.div>

            {/* Message Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6 text-white/90 text-[15px] leading-relaxed text-justify"
            >
              {content.message.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 text-center sm:text-left sm:ml-auto sm:w-1/2 flex flex-col items-center"
            >
              <h5 className="font-['Brush_Script_MT',cursive] italic text-5xl mb-2 text-white">
                {content.name}
              </h5>
              <p className="font-bold text-sm tracking-wide">
                {content.title}
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
