import { motion } from "motion/react";
import { ShieldAlert, FileBadge, Cog } from "lucide-react";

export default function QualityControl() {
  return (
    <section className="py-20 bg-white border-y border-slate-100 relative overflow-hidden">
      {/* Decorative backdrop */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596484552993-9c849646b51c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-[0.02]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert className="text-accent" size={32} />
          </div>
          
          <h3 className="font-display text-3xl md:text-5xl font-bold text-primary mb-6">
            Standardized Quality Control
          </h3>
          <p className="text-slate-500 max-w-2xl mx-auto mb-12">
            Setiap produk dan material kami telah mematuhi standar keamanan pangan yang sangat ketat untuk memastikan tidak ada kontaminasi silang dan kerusakan pada fasilitas klien.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-sm border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <FileBadge className="text-accent mb-4" size={28} />
              <h4 className="text-primary font-bold mb-2">HACCP Compliant</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Jaminan mutu kemanan pangan level industri.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-sm border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <ShieldAlert className="text-accent mb-4" size={28} />
              <h4 className="text-primary font-bold mb-2">ISO Standard</h4>
              <p className="text-slate-500 text-xs leading-relaxed">SOP pengadaan & instalasi berstandar global.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-sm border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <Cog className="text-accent mb-4" size={28} />
              <h4 className="text-primary font-bold mb-2">Food Grade Material</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Material aman 100% bebas dari racun.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
