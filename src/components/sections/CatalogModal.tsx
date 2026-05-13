import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";
import Masonry from "react-masonry-css";
import ImageLightbox from "../ui/ImageLightbox";
import { useCatalog } from "../../hooks/useCatalog";
import { useFormattedName } from "../../hooks/useFormattedName";
import { CardSkeleton } from "../ui/Skeleton";

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CatalogModal({ isOpen, onClose }: CatalogModalProps) {
  const { catalog, loading } = useCatalog();
  const { formatName } = useFormattedName();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [selectedImage, setSelectedImage] = useState<{url: string, alt: string} | null>(null);
  
  const categories = ["All"]; 
  
  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  const baseFilteredItems = catalog;
  const displayedItems = baseFilteredItems.slice(0, visibleCount);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Backdrop - Always present but animated */}
      <motion.div 
        animate={{ opacity: isOpen ? 1 : 0 }}
        className="absolute inset-0 bg-primary/40 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      <motion.div
        animate={{ 
          y: isOpen ? 0 : 50, 
          opacity: isOpen ? 1 : 0, 
          scale: isOpen ? 1 : 0.95 
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full h-full max-w-7xl bg-bg-soft md:rounded-sm shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-slate-200 flex items-center justify-between bg-white z-10">
              <div>
                <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-1">Product Catalog</h2>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-primary">Full Equipment List.</h3>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-sm bg-bg-soft flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-6 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all ${
                      activeFilter === cat 
                        ? "bg-primary text-white" 
                        : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product Grid - Masonry */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
                </div>
              ) : (
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="flex -ml-6 w-auto"
                  columnClassName="pl-6 bg-clip-padding"
                >
                  {displayedItems.map((item, index) => {
                    const displayName = formatName(item.file_name);
                    return (
                      <motion.div
                        key={`${item.id_image}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        onClick={() => setSelectedImage({ url: item.full_url, alt: displayName })}
                        className="group cursor-pointer relative overflow-hidden bg-white rounded-sm shadow-sm hover:shadow-lg transition-all mb-6 border border-slate-100"
                      >
                        <img 
                          src={item.webp_url || item.full_url} 
                          alt={displayName} 
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-90 transition-opacity duration-300" />
                        
                        <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0">
                          <div>
                            <span className="inline-block px-2 py-0.5 bg-accent text-primary text-[8px] uppercase tracking-widest font-bold rounded-sm mb-2">
                              {item.category}
                            </span>
                            <h4 className="text-lg font-display font-bold text-white leading-tight">
                              {displayName}
                            </h4>
                          </div>
                          <div className="w-8 h-8 rounded-sm bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
                            <ArrowUpRight size={16} />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </Masonry>
              )}

              {/* Pagination Controls */}
              {!loading && baseFilteredItems.length > visibleCount && (
                <div className="text-center py-12 border-t border-slate-200">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 10)}
                    className="px-12 py-4 bg-white border border-slate-200 text-primary font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-white hover:border-primary transition-all rounded-sm"
                  >
                    Lihat Lebih Banyak
                  </button>
                  <p className="mt-4 text-slate-400 text-[10px] uppercase tracking-widest">
                    Menampilkan {visibleCount} dari {baseFilteredItems.length} produk
                  </p>
                </div>
              )}
            </div>
          </motion.div>
          
          <ImageLightbox 
            isOpen={!!selectedImage}
            imageUrl={selectedImage?.url || ""}
            imageAlt={selectedImage?.alt || ""}
            onClose={() => setSelectedImage(null)} 
          />
    </div>
  );
}
