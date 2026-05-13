import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface ImageLightboxProps {
  isOpen: boolean;
  imageUrl: string;
  imageAlt: string;
  onClose: () => void;
}

export default function ImageLightbox({ isOpen, imageUrl, imageAlt, onClose }: ImageLightboxProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
          onClick={onClose}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-[210] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X size={28} />
          </button>
          
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            src={imageUrl}
            alt={imageAlt}
            className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal if clicking on the image itself
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
