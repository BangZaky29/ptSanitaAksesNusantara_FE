import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { COMPANY_INFO, STATS } from "../../constants/data";
import { SITE_CONTENT } from "../../constants/siteContent";
import { useCatalog } from "../../hooks/useCatalog";
import { useFormattedName } from "../../hooks/useFormattedName";

export default function Hero() {
  const { catalog } = useCatalog();
  const { formatName } = useFormattedName();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const content = SITE_CONTENT.hero;

  // Slideshow logic
  useEffect(() => {
    if (catalog.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % catalog.length);
    }, 5000); // Ganti gambar setiap 5 detik

    return () => clearInterval(interval);
  }, [catalog]);

  return (
    <section id="home" className="relative min-h-[90vh] bg-bg-soft flex items-center overflow-hidden pt-24 pb-16">
      
      {/* Clean Background - No decorative blurs for minimalist look */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-slate-50/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* HACCP Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
                <ShieldCheck className="text-accent" size={18} />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">{content.badge}</span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] mb-6 tracking-tight">
                {content.title.part1} <br />
                {content.title.part2} <br />
                <span className="text-accent relative">
                  {content.title.accent}
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-accent/20 -z-10" />
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 max-w-lg mb-10 leading-relaxed">
                {content.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-14">
                <a
                  href="#catalogue"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
                >
                  {content.cta.primary}
                </a>
                <a
                  href={COMPANY_INFO.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary border border-slate-200 font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
                >
                  {content.cta.secondary} <ArrowRight size={16} />
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                {STATS.map((stat, i) => (
                  <div key={i}>
                    <div className="font-display font-bold text-2xl text-primary mb-1">{stat.value}</div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Media Frame with Slideshow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] w-full"
          >
            {/* Solid accent offset backing instead of glassmorphism */}
            <div className="absolute top-6 -left-6 w-full h-full border-2 border-slate-200 rounded-sm -z-10 hidden md:block" />
            
            <div className="relative w-full h-full rounded-sm overflow-hidden shadow-sm bg-slate-200">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={catalog.length > 0 ? catalog[currentImageIndex]?.id_image : 'placeholder'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="w-full h-full relative"
                >
                  <img 
                    src={catalog.length > 0 
                      ? catalog[currentImageIndex]?.full_url 
                      : "https://images.unsplash.com/photo-1588666579219-c0ae98df3ee1?q=80&w=1600&auto=format&fit=crop"
                    } 
                    alt="Industrial Catalog" 
                    className="w-full h-full object-cover"
                    loading="eager" // Priority for LCP
                  />
                  
                  {/* Dynamic Product Label */}
                  {catalog.length > 0 && (
                    <div className="absolute top-6 right-6">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="px-4 py-2 bg-primary/90 backdrop-blur-md border border-white/10 rounded-sm shadow-xl"
                      >
                        <span className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] block mb-0.5">Product Name</span>
                        <span className="text-sm font-display font-bold text-white uppercase tracking-wider">
                          {formatName(catalog[currentImageIndex]?.file_name)}
                        </span>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Floating badge over image */}
            <div className="absolute -bottom-6 -left-6 md:bottom-12 md:-left-12 bg-white p-6 rounded-sm shadow-sm border border-slate-100 hidden sm:flex items-center gap-4 z-20">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                <ShieldCheck size={24} />
              </div>
              <div>
                <div className="text-sm font-bold text-primary">Quality Control</div>
                <div className="text-xs text-slate-500">100% Inspected</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
