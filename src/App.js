import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Pengertian from "./components/Pengertian";
import AyatGrid from "./components/AyatGrid";
import DalilList from "./components/DalilList";
import HukumTabs from "./components/HukumTabs";
import TataCara from "./components/TataCara";
import BacaanDoa from "./components/BacaanDoa";
import Hikmah from "./components/Hikmah";
import AlurKeputusan from "./components/AlurKeputusan";
import Kesimpulan from "./components/Kesimpulan";
import useReducedMotion from "./hooks/useReducedMotion";
import { setLenis } from "./lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); setLenis(null); };
  }, [reduced]);

  return (
    <div className="relative">
      <a href="#pengertian" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-navy-900">Lewati ke konten</a>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Pengertian />
        <AyatGrid />
        <DalilList />
        <HukumTabs />
        <TataCara />
        <BacaanDoa />
        <Hikmah />
        <AlurKeputusan />
        <Kesimpulan />
      </main>
    </div>
  );
}
