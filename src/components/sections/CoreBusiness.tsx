import { motion } from "motion/react";
import { useBusiness } from "../../hooks/useBusiness";

export default function CoreBusiness() {
  const { business, loading } = useBusiness();

  if (loading) return null;

  return (
    <section id="services" className="py-24 bg-primary relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Area matching the image with a wide description */}
        <div className="flex flex-col mb-20">
          <div className="inline-block mb-8">
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white bg-white/10 px-4 py-2 inline-block mb-2 rounded-sm shadow-sm">
              Business
            </h2>
            <br />
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white bg-white/10 px-4 py-2 inline-block rounded-sm shadow-sm">
              Overview
            </h2>
          </div>
          <p className="text-slate-300 max-w-4xl text-lg leading-relaxed">
            Perusahaan hadir sebagai penyedia perlengkapan, peralatan, dan kebutuhan operasional untuk mendukung usaha restoran, café, catering, serta dapur MBG secara profesional, terpercaya, dan berkualitas.
          </p>
        </div>

        {/* 2x2 Grid Layout for Business Units */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 bg-white p-10 md:p-16 rounded-sm shadow-xl">
          {business.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              {/* Number Block */}
              <div className="shrink-0">
                <div className="w-16 h-16 bg-accent text-white flex items-center justify-center font-display font-bold text-3xl shadow-md rounded-sm">
                  0{index + 1}
                </div>
              </div>
              
              {/* Content block */}
              <div>
                <h3 className="font-display font-extrabold text-2xl text-accent mb-3 leading-snug pr-4">
                  {item.title}
                </h3>
                
                <p className="text-sm text-slate-700 leading-relaxed font-medium mb-6">
                  {item.description}
                </p>

                <div>
                  <h5 className="font-bold text-sm text-primary mb-2">Cakupan:</h5>
                  <ul className="space-y-1">
                    {item.items?.map((listItem, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-600">
                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                        {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
