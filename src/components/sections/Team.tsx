import { TeamGrid } from "./team/TeamGrid";

export default function Team() {
  return (
    <section id="team" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 w-full overflow-hidden sm:overflow-visible">
        <div className="text-center max-w-2xl mx-auto mb-20 relative z-10">
          <h2 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-4">Management Team</h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Meet the Team.
          </h3>
          <p className="text-slate-500 leading-relaxed max-w-lg mx-auto">
            Didukung oleh profesional berpengalaman yang mendedikasikan diri untuk memastikan standar tertinggi pada setiap pengadaan.
          </p>
        </div>

        <TeamGrid />
      </div>
    </section>
  );
}

