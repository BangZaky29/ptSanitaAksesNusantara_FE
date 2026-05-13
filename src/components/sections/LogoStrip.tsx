import React from "react";
import { motion } from "motion/react";
import { useClients } from "../../hooks/useClients";

export default function LogoStrip() {
  const { clients, loading } = useClients();

  if (loading || clients.length === 0) return null;

  // Duplikat array agar animasi looping terlihat mulus
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-12 border-y border-slate-100 bg-white overflow-hidden flex items-center justify-center relative">
      {/* Efek gradient di pinggir agar terlihat menghilang (fade) */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="flex w-full items-center">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap shrink-0 px-6 z-20 bg-white hidden md:block">
          Dipercaya Oleh Industri
        </div>
        
        {/* Container untuk animasi marquee */}
        <div className="flex-1 overflow-hidden">
          <motion.div 
            className="flex w-max items-center gap-12 md:gap-20 opacity-60 grayscale"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {duplicatedClients.map((client, idx) => (
              <div 
                key={`${client.id_client}-${idx}`} 
                className="font-display font-bold text-xl sm:text-2xl text-slate-500/80 whitespace-nowrap hover:text-primary hover:grayscale-0 transition-all duration-300 cursor-default"
              >
                {client.name}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
