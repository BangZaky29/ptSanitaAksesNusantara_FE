import React from "react";
import { motion } from "motion/react";
import type { ApiTeamMember } from "../../../types/types";
import { X, Quote as QuoteIcon, Phone, Mail, Globe, MapPin } from "lucide-react";

interface MemberDetailProps {
  member: ApiTeamMember;
  onClose: () => void;
  layoutIdPrefix: string;
}

export function MemberDetail({ member, onClose, layoutIdPrefix }: MemberDetailProps) {
  const isNavy = member.theme === "navy";
  const cardBg = isNavy 
    ? "bg-primary" 
    : "bg-slate-100";

  return (
    <div className="flex flex-col md:flex-row w-full h-[90vh] md:h-[650px] max-h-[95vh] bg-white md:rounded-2xl shadow-2xl overflow-hidden relative border border-slate-100">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-30 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md md:bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors shadow-sm"
      >
        <X size={20} className="text-primary" />
      </button>

      {/* Left side (Image / Card shape) */}
      <motion.div 
        layoutId={`${layoutIdPrefix}-${member.member_id}-container`}
        className={`w-full md:w-[45%] h-[48vh] md:h-full relative ${cardBg} flex-shrink-0 origin-left transform-gpu will-change-transform overflow-hidden`}
      >
        {/* Animated Image - Optimized for Mobile to prevent head clipping */}
        <motion.img 
          layoutId={`${layoutIdPrefix}-${member.member_id}-image`}
          src={member.image} 
          alt={member.name} 
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[90%] md:h-[105%] max-w-none ${
            member.image_type === 'transparant' 
              ? 'object-contain object-bottom scale-110 md:scale-100' 
              : 'object-cover object-center'
          } transform-gpu will-change-transform origin-bottom z-10`} 
        />
        
        {/* Gradient overlay for smoother transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent md:hidden pointer-events-none z-10" />

        <motion.div 
          layoutId={`${layoutIdPrefix}-${member.member_id}-vertical-name`}
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block z-0"
        >
          <span className={`writing-vertical-rl rotate-180 font-display font-bold text-5xl lg:text-7xl tracking-widest uppercase ${isNavy ? 'text-white/10' : 'text-primary/10'}`}>
            {member.shortName}
          </span>
        </motion.div>
        
        {/* Desktop Floating Badge */}
        <motion.div 
          layoutId={`${layoutIdPrefix}-${member.member_id}-role`}
          className={`absolute bottom-8 left-8 p-1 rounded-xl w-max hidden md:block z-20`}
        >
          <div className={`${
            isNavy ? 'bg-primary/80 border-white/20' : 'bg-white/80 border-slate-200'
          } backdrop-blur-md border shadow-2xl px-5 py-3 rounded-lg flex flex-col items-start gap-1`}>
            <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${isNavy ? 'text-white/60' : 'text-primary/60'}`}>
              Member Of
            </span>
            <span className={`text-xs font-bold uppercase tracking-wider ${isNavy ? 'text-white' : 'text-primary'}`}>
              PT SANITA AKSES
            </span>
          </div>
        </motion.div>

        {/* Mobile Mini Badge - Minimalist to not cover the photo too much */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden z-20">
          <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200 shadow-lg">
            <span className="text-[10px] font-black tracking-widest uppercase text-primary">{member.role}</span>
          </div>
        </div>
      </motion.div>

      {/* Right side (Content) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="p-6 md:p-12 lg:p-16 flex flex-col flex-1 overflow-y-auto scrollbar-hide"
      >
        <div className="mb-6 md:mb-8">
          <h3 className="font-display font-bold text-3xl md:text-5xl text-primary mb-2 leading-tight">{member.name}</h3>
          <p className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">{member.role}</p>
        </div>

        <div className="relative mb-6 md:mb-10">
          <QuoteIcon className="text-accent/10 absolute -top-6 -left-6 w-12 h-12 md:w-16 md:h-16 -z-10" />
          <p className="text-base md:text-xl text-slate-700 italic font-medium leading-relaxed">
            "{member.quote}"
          </p>
        </div>

        <div className="w-16 h-1.5 bg-accent/20 rounded-full mb-6 md:mb-8 shrink-0" />

        <p className="text-slate-500 leading-relaxed text-sm md:text-lg mb-10 font-normal">
          {member.bio}
        </p>

        {/* Contact Info Section - Premium Interaction Grid */}
        <div className="mt-auto pt-8 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {member.phone && member.phone !== "-" && (
              <a 
                href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Halo ${member.name}, saya tertarik untuk berdiskusi mengenai layanan PT Sanita Akses Nusantara.`)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-transparent hover:border-accent/30 hover:bg-white transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all shrink-0">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">WhatsApp</span>
                  <span className="text-sm text-slate-700 font-bold">{member.phone}</span>
                </div>
              </a>
            )}
            {member.email && (
              <a 
                href={`mailto:${member.email}`}
                className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-transparent hover:border-accent/30 hover:bg-white transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all shrink-0">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Email</span>
                  <span className="text-sm text-slate-700 font-bold truncate">{member.email}</span>
                </div>
              </a>
            )}
            {member.website && (
              <a 
                href={`https://${member.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-transparent hover:border-accent/30 hover:bg-white transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all shrink-0">
                  <Globe size={16} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Website</span>
                  <span className="text-sm text-slate-700 font-bold truncate">{member.website}</span>
                </div>
              </a>
            )}
            {member.address && (
              <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 border border-transparent col-span-full">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary shrink-0">
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Location</span>
                  <span className="text-[11px] text-slate-600 font-medium leading-relaxed">{member.address}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
