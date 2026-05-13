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
    <div className="flex flex-col md:flex-row w-full h-[85vh] md:h-[600px] bg-white md:rounded-2xl shadow-2xl overflow-hidden relative border border-slate-100">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
      >
        <X size={20} className="text-primary" />
      </button>

      {/* Left side (Card shape) */}
      <motion.div 
        layoutId={`${layoutIdPrefix}-${member.member_id}-container`}
        className={`w-full md:w-[35%] h-[40vh] md:h-full relative ${cardBg} flex-shrink-0 origin-left transform-gpu will-change-transform`}
      >
        {/* Soft background glow removed */}
        <motion.img 
          layoutId={`${layoutIdPrefix}-${member.member_id}-image`}
          src={member.image} 
          alt={member.name} 
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[110%] max-w-none ${member.image_type === 'transparant' ? 'object-contain object-bottom' : 'object-cover object-center'} transform-gpu will-change-transform`} 
        />
        <motion.div 
          layoutId={`${layoutIdPrefix}-${member.member_id}-vertical-name`}
          className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block"
        >
          <span className={`writing-vertical-rl rotate-180 font-display font-bold text-5xl tracking-widest uppercase ${isNavy ? 'text-white/10' : 'text-primary/10'}`}>
            {member.shortName}
          </span>
        </motion.div>
        
        {/* Animated Role Badge */}
        <motion.div 
          layoutId={`${layoutIdPrefix}-${member.member_id}-role`}
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 px-8 py-2.5 rounded-lg w-max text-center ${isNavy ? 'bg-primary text-white border-transparent' : 'bg-white text-primary border-slate-200'} shadow-sm border`}
        >
          <span className="text-sm font-bold tracking-widest uppercase">{member.role}</span>
        </motion.div>
      </motion.div>

      {/* Right side (Content) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="p-6 md:p-10 lg:p-14 flex flex-col justify-center flex-1 overflow-y-auto"
      >
        <h3 className="font-display font-bold text-3xl md:text-4xl text-primary mb-2">{member.name}</h3>
        <p className="text-accent font-bold uppercase tracking-widest text-sm mb-6 md:mb-10">{member.role}</p>

        <div className="relative mb-6">
          <QuoteIcon className="text-slate-100 absolute -top-4 -left-4 w-10 h-10 md:w-12 md:h-12 -z-10" />
          <p className="text-lg md:text-xl text-slate-700 italic font-medium leading-relaxed">
            "{member.quote}"
          </p>
        </div>

        <div className="w-12 h-1 bg-accent mb-6 shrink-0" />

        <p className="text-slate-500 leading-relaxed text-sm md:text-base mb-8">
          {member.bio}
        </p>

        {/* Contact Info Section */}
        <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pt-8 border-t border-slate-100">
          {member.phone && member.phone !== "-" && (
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                <Phone size={14} />
              </div>
              <span className="text-sm text-slate-600 font-semibold">{member.phone}</span>
            </div>
          )}
          {member.email && (
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                <Mail size={14} />
              </div>
              <span className="text-sm text-slate-600 font-semibold truncate">{member.email}</span>
            </div>
          )}
          {member.website && (
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                <Globe size={14} />
              </div>
              <span className="text-sm text-slate-600 font-semibold">{member.website}</span>
            </div>
          )}
          {member.address && (
            <div className="flex items-start gap-3 group col-span-full">
              <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mt-0.5 shrink-0">
                <MapPin size={14} />
              </div>
              <span className="text-[11px] text-slate-500 leading-relaxed max-w-sm font-medium">
                {member.address}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
