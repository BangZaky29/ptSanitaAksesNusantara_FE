import { motion } from "motion/react";
import { useApproach } from "../../hooks/useApproach";

export default function Approach() {
  const { steps, loading } = useApproach();

  if (loading) return null;

  return (
    <section id="approach" className="py-24 bg-primary text-white relative">
      {/* Abstract Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-4xl">
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-4">Metodologi</h2>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Our Approach
            </h3>
            <p className="text-slate-300 leading-relaxed text-lg">
              PT. Sanita Akses Nusantara menerapkan pendekatan kerja yang terstruktur mulai dari analisis kebutuhan, perencanaan, pelaksanaan, hingga pengawasan kualitas untuk memastikan setiap solusi yang diberikan tepat sasaran, profesional, dan memberikan hasil terbaik bagi klien.
            </p>
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="flex flex-col items-start group"
            >
              {/* Number Node */}
              <div className="z-10 w-20 h-20 rounded-full border border-slate-700 bg-primary flex items-center justify-center relative mb-8 shadow-[0_0_15px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-2 rounded-full border border-accent/30 group-hover:border-accent transition-colors duration-500 bg-primary shadow-inner" />
                <span className="font-display font-bold text-2xl text-accent relative z-10 drop-shadow-md">0{step.step}</span>
              </div>
              
              {/* Content Card (Solid White) */}
              <div className="w-full h-full bg-white p-8 rounded-sm hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 relative overflow-hidden flex flex-col shadow-md border border-slate-100">
                <h4 className="font-display font-bold text-xl mb-4 text-primary">
                  {step.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
