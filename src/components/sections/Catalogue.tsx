import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CatalogModal from "./CatalogModal";
import { ButtonLoader, SectionLoader } from "../ui/Loading";
import { useCatalog } from "../../hooks/useCatalog";
import { useFormattedName } from "../../hooks/useFormattedName";
import { CardSkeleton } from "../ui/Skeleton";
import Masonry from "react-masonry-css";

export default function Catalogue() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { catalog, loading } = useCatalog();
  const { formatName } = useFormattedName();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCompro = () => {
    setIsDownloading(true);
    
    // Simulate prep time for premium feel
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/COMPRO.pdf';
      link.download = 'Company-Profile-Sanita-Akses-Nusantara.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Keep loading for a bit after click
      setTimeout(() => setIsDownloading(false), 1000);
    }, 1500);
  };

  // Featured items (first 6)
  const featuredItems = catalog.slice(0, 6);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <section id="catalogue" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-4"
            >
              Our Catalogue
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold text-primary"
            >
              Professional Industrial <br /> 
              Equipment Solutions.
            </motion.h3>
          </div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center gap-3 text-primary font-bold text-sm uppercase tracking-widest hover:text-accent transition-colors"
          >
            Lihat Katalog Lengkap
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all">
              <ArrowRight size={18} />
            </div>
          </motion.button>
        </div>

        {/* Featured Grid - Masonry */}
        {loading ? (
          <div className="w-full flex items-center justify-center py-20">
            <SectionLoader />
          </div>
        ) : (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex -ml-8 w-auto"
              columnClassName="pl-8 bg-clip-padding"
            >
              {featuredItems.map((item) => {
                const displayName = formatName(item.file_name);
                return (
                  <motion.div
                    key={item.id_image}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    className="group relative overflow-hidden bg-slate-50 rounded-sm mb-8 border border-slate-100"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={item.webp_url || item.full_url} 
                        alt={displayName} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors duration-500" />
                      
                      {/* View Details Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          onClick={() => setIsModalOpen(true)}
                          className="bg-white text-primary px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-accent hover:text-white transition-colors"
                        >
                          Lihat Detail <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
  
                    <div className="p-6 bg-white">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1 block">
                            {item.category}
                          </span>
                          <h4 className="font-display font-bold text-xl text-primary leading-tight group-hover:text-accent transition-colors">
                            {displayName}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </Masonry>
          </motion.div>
        )}

        {/* CTA Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-slate-100 text-center"
        >
          <p className="text-slate-500 mb-8 max-w-xl mx-auto italic">
            "Menyediakan berbagai pilihan peralatan industrial dengan standar kualitas tinggi untuk efisiensi operasional bisnis Anda."
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-12 py-4 bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] rounded-sm hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Buka Katalog Lengkap
            </button>
            
            <button
              onClick={handleDownloadCompro}
              disabled={isDownloading}
              className="w-full sm:w-auto px-12 py-4 bg-white border-2 border-primary text-primary font-bold text-sm uppercase tracking-[0.2em] rounded-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-wait"
            >
              {isDownloading ? (
                <>
                  Processing...
                  <ButtonLoader className="text-accent" />
                </>
              ) : (
                <>
                  Company Profile
                  <ArrowUpRight size={18} className="text-accent" />
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Modal */}
        <CatalogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  );
}
