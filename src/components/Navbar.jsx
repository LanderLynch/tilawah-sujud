import { useEffect, useRef, useState } from "react";
import { sections } from "../data/content";
import { scrollToId } from "../lib/lenis";

export default function Navbar() {
  const bar = useRef(null);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-navy-900/20" aria-hidden>
        <div ref={bar} className="h-full origin-left bg-gradient-to-r from-gold-600 via-gold to-gold-300" style={{ transform: "scaleX(0)" }} data-testid="scroll-progress-bar" />
      </div>
      <nav aria-label="Navigasi section" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 md:block" data-testid="section-dot-nav">
        <ul className="flex flex-col gap-1">
          {sections.map((s) => {
            const on = active === s.id;
            return (
              <li key={s.id}>
                <button onClick={() => scrollToId(s.id)} aria-label={s.label} aria-current={on ? "true" : undefined} data-testid={`dot-nav-${s.id}`}
                  className="group relative flex h-7 w-7 items-center justify-center">
                  <span className={`block rotate-45 transition-[transform,background-color,box-shadow] duration-500 ${on ? "h-3 w-3 bg-gold shadow-[0_0_14px_3px_rgba(200,160,74,0.75)]" : "h-2 w-2 border border-gold/70 bg-navy/40 group-hover:scale-125 group-hover:bg-gold/70"}`} />
                  <span className="pointer-events-none absolute right-9 whitespace-nowrap rounded-full bg-navy-900 px-3 py-1 text-xs font-medium text-gold-300 opacity-0 shadow-lg transition-[opacity,transform] duration-300 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {s.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
