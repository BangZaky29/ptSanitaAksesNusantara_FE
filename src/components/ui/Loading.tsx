import React from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

/**
 * Premium Spinner for Section Loaders
 */
export function SectionLoader() {
  return (
    <div className="w-full py-20 flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-accent"
        />
        {/* Inner Pulsing Logo/Circle */}
        <motion.div
          animate={{ scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 m-auto w-6 h-6 bg-primary rounded-full shadow-lg"
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]"
      >
        Loading Excellence...
      </motion.p>
    </div>
  );
}

/**
 * Compact Spinner for inside Buttons
 */
export function ButtonLoader({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center justify-center ${className}`}
    >
      <Loader2 size={18} className="animate-spin text-inherit" />
    </motion.div>
  );
}

/**
 * Page-level Overlay Loader
 */
export function PageOverlayLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
    >
      <SectionLoader />
    </motion.div>
  );
}
