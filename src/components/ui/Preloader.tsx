import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Duration: 5 seconds
    const duration = 5000;
    const intervalTime = 50; // Update every 50ms
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Small delay before hiding to show 100%
          setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = 'unset';
          }, 200);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    // Initial disable scroll
    document.body.style.overflow = 'hidden';

    return () => {
      clearInterval(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center p-6"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Logo Container */}
          <div className="relative mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 w-48 h-48 md:w-56 md:h-56 bg-white p-8 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden"
            >
              <motion.img
                src="/(TRANSPARENT) LOGO GAMBAR PT. SANITA AKSES NUSANTARA.png"
                alt="Logo PT Sanita Akses Nusantara"
                className="w-full h-full object-contain"
                animate={{ 
                  filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Shine Effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full"
                animate={{ translateX: ["100%", "-100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
              />
            </motion.div>
            
            {/* Pulsing ring around logo */}
            <motion.div 
              className="absolute inset-[-10px] border-2 border-accent/20 rounded-2xl"
              animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Company Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-display font-bold text-2xl md:text-3xl text-white tracking-[0.3em] uppercase mb-2">
              PT. SANITA AKSES <span className="text-accent">NUSANTARA</span>
            </h1>
            <p className="text-accent/60 text-xs font-bold uppercase tracking-[0.4em]">
              Authorized Industrial Consultant
            </p>
          </motion.div>

          {/* Progress Bar Container */}
          <div className="w-64 md:w-80 h-1 bg-white/10 rounded-full overflow-hidden relative mb-4">
            <motion.div 
              className="h-full bg-accent shadow-[0_0_10px_#D4AF37]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          
          <motion.span 
            className="text-[10px] font-bold text-accent/80 uppercase tracking-widest"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Loading Resources... {Math.round(progress)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
