import React from "react";
import { motion } from "motion/react";
import type { ApiTeamMember } from "../../../types/types";

interface TeamCardProps {
  member: ApiTeamMember;
  onClick: () => void;
  layoutIdPrefix: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, onClick, layoutIdPrefix }) => {
  const isNavy = member.theme === "navy";
  
  const cardBg = isNavy 
    ? "bg-primary" 
    : "bg-slate-100";
    
  const buttonClass = isNavy
    ? "bg-primary text-white border-transparent"
    : "bg-white text-primary border-slate-200";

  return (
    <motion.div 
      layoutId={`${layoutIdPrefix}-${member.member_id}-container`}
      className="flex flex-col items-center gap-4 cursor-pointer group w-full transform-gpu will-change-transform"
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className={`relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl ${cardBg} shadow-sm overflow-hidden group-hover:shadow-md transition-all duration-300 transform-gpu`}>
        {/* Soft background glow removed for cleaner look */}
        
        {/* Image from BE */}
        <motion.img 
          layoutId={`${layoutIdPrefix}-${member.member_id}-image`}
          src={member.image} 
          alt={member.name} 
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[105%] max-w-none ${member.image_type === 'transparant' ? 'object-contain object-bottom' : 'object-cover object-center'} transform-gpu will-change-transform`} 
        />
        
        {/* Vertical Text */}
        <motion.div 
          layoutId={`${layoutIdPrefix}-${member.member_id}-vertical-name`}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10"
        >
          <span className={`writing-vertical-rl rotate-180 font-display font-bold text-3xl sm:text-4xl tracking-widest uppercase ${isNavy ? 'text-white/10' : 'text-primary/10'}`}>
            {member.shortName}
          </span>
        </motion.div>
      </div>

      {/* Role Button */}
      <motion.div 
        layoutId={`${layoutIdPrefix}-${member.member_id}-role`}
        className={`px-4 sm:px-6 py-2.5 rounded-lg w-full max-w-[85%] text-center ${buttonClass} shadow-sm border`}
      >
        <span className="text-xs sm:text-sm font-semibold tracking-wide truncate block">{member.role}</span>
      </motion.div>
    </motion.div>
  );
}
