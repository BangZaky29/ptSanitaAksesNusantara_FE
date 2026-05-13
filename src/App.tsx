/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import LogoStrip from "./components/sections/LogoStrip";
import CoreBusiness from "./components/sections/CoreBusiness";
import AboutUs from "./components/sections/AboutUs";
import QualityControl from "./components/sections/QualityControl";
import Team from "./components/sections/Team";
import Approach from "./components/sections/Approach";
import Catalogue from "./components/sections/Catalogue";
import FloatingWhatsApp from "./components/ui/FloatingWhatsApp";
import Preloader from "./components/ui/Preloader";
import { useLogo } from "./hooks/useLogo";

export default function App() {
  const { logoUrl } = useLogo();

  useEffect(() => {
    if (logoUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = logoUrl;
    }
  }, [logoUrl]);

  return (
    <div className="font-sans text-slate-800 antialiased selection:bg-accent selection:text-primary bg-bg-soft">
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <AboutUs />
        <CoreBusiness />
        <QualityControl />
        <Team />
        <Approach />
        <Catalogue />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

