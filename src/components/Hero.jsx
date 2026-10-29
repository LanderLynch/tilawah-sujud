import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import StarField from "./StarField";
import MosqueSilhouette from "./MosqueSilhouette";
import useReducedMotion from "../hooks/useReducedMotion";
import { anggota, hero } from "../data/content";
import { scrollToId } from "../lib/lenis";

export const Logo = () => (
  <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden>
    <circle cx="32" cy="32" r="29" fill="none" stroke="#C8A04A" strokeWidth="2" />
    <path d="M18 46h28v-9c0-8-6-13-14-15-8 2-14 7-14 15z" fill="#C8A04A" />
    <rect x="31" y="13" width="2" height="9" fill="#C8A04A" />
    <path d="M35 10a4 4 0 1 0 0 6 3 3 0 1 1 0-6z" fill="#E0C27E" />
    <path d="M28 46v-6a4 4 0 0 1 8 0v6z" fill="#0E2243" />
  </svg>
);

const MosqueOrb = () => {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 80, damping: 18 });
  const onMove = (e) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <div className="perspective relative mx-auto w-[260px] sm:w-[340px] lg:w-[440px]" onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0); }} data-testid="hero-mosque-orb">
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="preserve-3d relative aspect-square">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(200,160,74,0.22),transparent_65%)] blur-2xl" />
        <div className="absolute inset-0 rounded-full border border-dashed border-gold/40 animate-spin-slow" />
        <div className="absolute inset-[7%] rounded-full border-2 border-gold/80 bg-navy/60 shadow-[inset_0_0_60px_rgba(200,160,74,0.18)]" style={{ transform: "translateZ(30px)" }} />
        <div className="absolute inset-[13%] rounded-full border border-gold/30" style={{ transform: "translateZ(40px)" }} />
        <div className="absolute inset-[22%]" style={{ transform: "translateZ(70px)" }}>
          <MosqueSilhouette animated className="h-full w-full" label="Siluet masjid emas" />
        </div>
        <span className="absolute left-[12%] top-[16%] h-2.5 w-2.5 rotate-45 bg-gold" style={{ transform: "translateZ(90px) rotate(45deg)" }} />
        <span className="absolute bottom-[18%] right-[10%] h-2 w-2 rotate-45 bg-sky-note/70" style={{ transform: "translateZ(90px) rotate(45deg)" }} />
      </motion.div>
    </div>
  );
};

export default function Hero() {
  const scope = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (reduced) return;
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from("[data-hero-label]", { autoAlpha: 0, y: 12, duration: 0.9 })
      .from("[data-hero-word]", { yPercent: 115, rotate: 4, duration: 1.4, stagger: 0.14 }, "-=0.5")
      .from("[data-hero-line]", { scaleX: 0, duration: 1 }, "-=0.9")
      .from("[data-hero-fade]", { autoAlpha: 0, y: 18, duration: 1, stagger: 0.08 }, "-=0.8")
      .from("[data-hero-orb]", { autoAlpha: 0, scale: 0.85, duration: 1.6 }, 0.2);
  }, { scope, dependencies: [reduced] });

  return (
    <section id="hero" ref={scope} aria-labelledby="hero-title" data-testid="section-hero" className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-navy-900 text-white">
      {!reduced && <StarField />}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-navy-700/50 blur-[120px]" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-7 sm:px-10">
        <div className="flex items-center gap-3" data-hero-fade>
          <Logo />
          <span className="text-sm font-semibold tracking-wide text-white">Sajadah<span className="text-gold">.</span></span>
        </div>
        <button onClick={() => scrollToId("tata-cara")} data-hero-fade data-testid="hero-cta-tatacara"
          className="rounded-full border border-gold/50 px-4 py-2.5 text-xs font-semibold text-gold-300 transition-colors duration-300 hover:bg-gold hover:text-navy-900">
          Lihat Tata Cara
        </button>
      </header>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[1.25fr_1fr] lg:py-10">
        <div>
          <p data-hero-label className="text-[11px] font-semibold uppercase tracking-[0.5em] text-gold sm:text-xs" data-testid="hero-label">{hero.label}</p>
          <h1 id="hero-title" className="mt-6 font-black leading-[0.86] tracking-[-0.03em]" data-testid="hero-title">
            {hero.title.map((w) => (
              <span key={w} className="block overflow-hidden pb-[0.06em]">
                <span data-hero-word className="block text-[clamp(3.6rem,15vw,9.5rem)]">{w === "SAJADAH" ? <span className="bg-gradient-to-r from-gold-300 via-gold to-gold-600 bg-clip-text text-transparent">{w}</span> : w}</span>
              </span>
            ))}
          </h1>
          <span data-hero-line className="mt-8 block h-[3px] w-24 origin-left rounded-full bg-gold" />
          <p data-hero-fade className="mt-6 max-w-lg text-base text-white/85 md:text-lg" data-testid="hero-subtitle">{hero.subtitle}</p>

          <div data-hero-fade className="mt-10 max-w-xl rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md" data-testid="hero-members">
            <p className="text-sm font-bold text-gold-300">{hero.kelompok}</p>
            <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm text-white/80 sm:grid-cols-2">
              {anggota.map((a) => (
                <li key={a.nim} className="flex justify-between gap-3 border-b border-white/5 pb-1.5">
                  <span>{a.nama}</span><span className="font-mono text-xs text-white/60">{a.nim}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div data-hero-orb className="order-first lg:order-none">
          <MosqueOrb />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 pb-8 sm:flex-row sm:px-10">
        <p className="text-[11px] font-medium tracking-[0.3em] text-white/60">{hero.footer}</p>
        <button onClick={() => scrollToId("pengertian")} aria-label="Gulir ke bawah" data-testid="hero-scroll-indicator" className="flex items-center gap-3 text-xs text-gold-300">
          <span className="flex h-10 w-6 justify-center rounded-full border border-gold/60 pt-2">
            <span className="h-2 w-1 rounded-full bg-gold animate-scroll-dot" />
          </span>
          scroll
        </button>
      </div>
    </section>
  );
}
