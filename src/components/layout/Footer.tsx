import { COMPANY_INFO } from "../../constants/data";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLogo } from "../../hooks/useLogo";

export default function Footer() {
  const { logoUrl } = useLogo();

  return (
    <footer className="bg-primary text-white py-16 border-t border-accent/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="PT Sanita Akses Nusantara"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            ) : (
              <>
                <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center font-display font-bold text-primary">
                  S
                </div>
                <span className="font-display font-bold text-2xl tracking-tight">
                  Sanita<span className="text-accent">.</span>
                </span>
              </>
            )}
          </div>
          <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
            Solusi Profesional dengan Komitmen, Kualitas, dan Kepercayaan. Mitra terbaik Anda untuk pengadaan peralatan dan perlengkapan industrial.
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-6 text-accent">Contact Information</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <MapPin className="text-accent shrink-0" size={18} />
              <span>{COMPANY_INFO.address}</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <Phone className="text-accent shrink-0" size={18} />
              <a href={COMPANY_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                {COMPANY_INFO.whatsapp}
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <Mail className="text-accent shrink-0 mt-1" size={18} />
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-accent/60 font-bold">Sales & Marketing</span>
                  <a href={`mailto:${COMPANY_INFO.emails.sales}`} className="hover:text-accent transition-colors">
                    {COMPANY_INFO.emails.sales}
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-accent/60 font-bold">Customer Service</span>
                  <a href={`mailto:${COMPANY_INFO.emails.cs}`} className="hover:text-accent transition-colors">
                    {COMPANY_INFO.emails.cs}
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-accent/60 font-bold">Direct Inquiry</span>
                  <a href={`mailto:${COMPANY_INFO.emails.director}`} className="hover:text-accent transition-colors">
                    {COMPANY_INFO.emails.director}
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-6 text-accent">Business Hours</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex justify-between">
              <span>Senin - Jumat</span>
              <span>08:00 - 17:00</span>
            </li>
            <li className="flex justify-between">
              <span>Sabtu</span>
              <span>08:00 - 14:00</span>
            </li>
            <li className="flex justify-between">
              <span>Minggu</span>
              <span>Tutup</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
