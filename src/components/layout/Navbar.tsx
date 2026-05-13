import React from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { COMPANY_INFO } from "../../constants/data";
import { useLogo } from "../../hooks/useLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logoUrl } = useLogo();

  // Throttled scroll handler for performance
  const ticking = useRef(false);
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Team", href: "#team" },
    { name: "Approach", href: "#approach" },
    { name: "Catalogue", href: "#catalogue" },
  ];

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="PT Sanita Akses Nusantara"
              className="h-9 w-auto object-contain transition-all duration-300"
            />
          ) : (
            <>
              <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center font-display font-bold text-primary">
                S
              </div>
              <span
                className="font-display font-bold text-xl tracking-tight text-primary"
              >
                Sanita<span className="text-accent text-black">.</span>
              </span>
            </>
          )}
          {/* Teks nama PT (hanya tampil di layar medium ke atas) */}
          <span className="hidden md:block font-display font-bold text-lg text-primary tracking-tight ml-2 pl-3 border-l-2 border-primary/20">
            PT. Sanita Akses Nusantara
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium hover:text-accent transition-colors ${scrolled ? "text-slate-600" : "text-black/90"
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <a
            href={COMPANY_INFO.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-sm border border-transparent hover:bg-transparent hover:border-primary hover:text-primary transition-all shadow-[0_4px_14px_0_rgba(0,33,71,0.39)] hover:shadow-[0_6px_20px_rgba(0,33,71,0.23)]"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="text-primary" size={24} />
          ) : (
            <Menu className="text-primary" size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "100vh" }}
          className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl flex flex-col items-center py-8 gap-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-lg font-medium text-primary hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href={COMPANY_INFO.whatsappLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="px-6 py-3 bg-primary text-white text-base font-medium rounded-sm w-[80%] text-center"
          >
            Contact Us via WhatsApp
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
