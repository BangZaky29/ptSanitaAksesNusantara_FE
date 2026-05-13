import React from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

/**
 * Premium Spinner for Section Loaders
 */
export function SectionLoader() {
  return (
    <div className="w-full py-20 flex flex-col items-center justify-center gap-6">
      <div className="relative w-20 h-20">
        {/* Outer Sprint Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-[3px] border-slate-100 border-t-accent border-r-accent/30"
        />
        {/* Inner Counter-Rotating Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-3 rounded-full border-2 border-slate-100 border-b-primary"
        />
        {/* Center Pulsing Dot */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 m-auto w-3 h-3 bg-accent rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]"
        />
      </div>
      <div className="flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-1"
        >
          Synchronizing
        </motion.p>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-1 h-1 bg-accent rounded-full"
            />
          ))}
        </div>
      </div>
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
