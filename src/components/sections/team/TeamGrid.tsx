import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTeam } from "../../../hooks/useTeam";
import { TeamCard } from "./TeamCard";
import { MemberDetail } from "./MemberDetail";
import { CardSkeleton } from "../../ui/Skeleton";
import type { ApiTeamMember } from "../../../types/types";

export function TeamGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { members, loading, error } = useTeam();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const selectedMember: ApiTeamMember | undefined = members.find(m => m.member_id === selectedId);

  return (
    <div className="relative w-full overflow-hidden min-h-[500px]">
      <div className="relative">
        {/* Grid View - Always mounted to keep images in memory */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-sm border border-slate-100">
                <CardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: (selectedId && !isMobile) ? 0 : 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1]
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 transition-all duration-500 ${(selectedId && !isMobile) ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
          >
            {members.map((member) => (
               <motion.div
                 key={member.member_id}
                 variants={{
                   hidden: { opacity: 0, y: 20 },
                   show: { opacity: 1, y: 0 }
                 }}
               >
                 <TeamCard 
                   member={member} 
                   onClick={() => setSelectedId(member.member_id)} 
                   layoutIdPrefix="team"
                 />
               </motion.div>
            ))}
          </motion.div>
        )}

        {/* Desktop Detail View Overlay */}
        <AnimatePresence>
          {selectedId && !isMobile && (
            <motion.div 
              key="desktop-detail"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-0 left-0 w-full z-10"
            >
              <MemberDetail 
                member={selectedMember!} 
                onClose={() => setSelectedId(null)} 
                layoutIdPrefix="team"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Modal Overlay - Handled separately to keep flow smooth */}
      <AnimatePresence>
        {selectedId && isMobile && selectedMember && (
           <motion.div 
             className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none"
           >
             <motion.div 
               className="absolute inset-0 bg-primary/90 backdrop-blur-sm pointer-events-auto"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedId(null)}
             />
             
             <motion.div 
               className="w-full relative z-10 pointer-events-auto bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
               initial={{ opacity: 0, y: "100%" }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: "100%" }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
             >
               <MemberDetail 
                 member={selectedMember} 
                 onClose={() => setSelectedId(null)} 
                 layoutIdPrefix="mobile-team"
               />
             </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
