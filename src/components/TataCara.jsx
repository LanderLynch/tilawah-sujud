import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import SectionShell from "./SectionShell";
import PrayerFigure, { KNEEL, SUJUD, ZERO } from "./PrayerFigure";
import useReducedMotion from "../hooks/useReducedMotion";
import { tataCara } from "../data/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEP_TARGET = { 1: ["takbir", 0.7], 2: ["sujud", 0.45], 3: ["doa", 1.4] };
const SPEEDS = [0.5, 1, 1.5];

export default function TataCara() {
  const reduced = useReducedMotion();
  const scope = useRef(null);
  const fig = useRef(null);
  const tl = useRef(null);
  const jump = useRef(null);
  const slider = useRef(null);
  const touched = useRef(false);
  const phaseRef = useRef("berdiri");
  const [phase, setPhase] = useState("berdiri");
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  useGSAP(() => {
    const st = { ...ZERO };
    const ov = fig.current.overlays();
    const t = gsap.timeline({
      paused: true,
      onUpdate: () => {
        fig.current?.apply(st);
        if (slider.current) slider.current.value = String(Math.round(t.progress() * 1000));
        const label = t.currentLabel() || "berdiri";
        if (label !== phaseRef.current) { phaseRef.current = label; setPhase(label); }
      },
      onComplete: () => setPlaying(false),
    });
    const pose = (from, to, d, pos) => t.fromTo(st, { ...from }, { ...to, duration: d, ease: "power2.inOut", immediateRender: false }, pos);

    t.addLabel("berdiri", 0)
      .fromTo(ov.icon, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.1)
      .to(ov.icon, { scale: 1.2, svgOrigin: "224 24", duration: 0.35, yoyo: true, repeat: 1, ease: "sine.inOut" })
      .addLabel("takbir", "+=0.2")
      .to(ov.icon, { autoAlpha: 0, duration: 0.3 }, "takbir")
      .fromTo(ov.bubble, { autoAlpha: 0, scale: 0.6, svgOrigin: "270 50" }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, "takbir")
      .fromTo(ov.ring, { autoAlpha: 0.9, scale: 0.25, svgOrigin: "224 170" }, { autoAlpha: 0, scale: 1.5, duration: 1.3, ease: "power2.out" }, "takbir+=0.1")
      .fromTo(ov.ring2, { autoAlpha: 0.7, scale: 0.25, svgOrigin: "224 170" }, { autoAlpha: 0, scale: 1.7, duration: 1.3, ease: "power2.out" }, "takbir+=0.45")
      .to(ov.bubble, { autoAlpha: 0, duration: 0.35 }, "takbir+=1.5")
      .addLabel("turun", "takbir+=1.8");
    pose(ZERO, KNEEL, 1.1, "turun");
    pose(KNEEL, SUJUD, 1.2);
    t.addLabel("sujud")
      .fromTo(ov.onex, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" }, "sujud")
      .to({}, { duration: 0.9 })
      .addLabel("doa")
      .to(ov.onex, { autoAlpha: 0, duration: 0.3 }, "doa")
      .fromTo(ov.doa, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }, "doa")
      .fromTo(ov.glow, { autoAlpha: 0, scale: 0.4, svgOrigin: "388 318" }, { autoAlpha: 1, scale: 1.2, duration: 1.2 }, "doa+=0.5")
      .to(ov.doa, { autoAlpha: 0, y: -30, scale: 0.94, duration: 1, ease: "power2.in" }, "doa+=2")
      .to(ov.glow, { autoAlpha: 0, scale: 1.7, duration: 0.8 }, "doa+=2.5")
      .addLabel("selesai", "doa+=3.1");
    pose(SUJUD, KNEEL, 1.1, "selesai");
    pose(KNEEL, ZERO, 1.1);
    t.fromTo(ov.check, { autoAlpha: 0, scale: 0.4, svgOrigin: "224 26" }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)" });

    t.progress(0);
    fig.current.apply(st);
    tl.current = t;

    if (reduced) { t.time(t.labels.sujud + 0.45); return; }
    ScrollTrigger.create({
      trigger: scope.current,
      start: "top 55%",
      once: true,
      onEnter: () => { if (!touched.current) { t.play(); setPlaying(true); } },
    });
  }, { scope, dependencies: [reduced], revertOnUpdate: true });

  const stopJump = () => { jump.current?.kill(); touched.current = true; };

  const goStep = (n) => {
    const t = tl.current; if (!t) return;
    stopJump(); t.pause(); setPlaying(false);
    const [label, off] = STEP_TARGET[n];
    const time = t.labels[label] + off;
    if (reduced) t.time(time);
    else jump.current = gsap.to(t, { time, duration: 0.9, ease: "power2.inOut" });
  };

  const togglePlay = () => {
    const t = tl.current; if (!t) return;
    stopJump();
    if (playing) { t.pause(); setPlaying(false); return; }
    if (t.progress() >= 1) t.restart(); else t.play();
    setPlaying(true);
  };

  const restart = () => { const t = tl.current; if (!t) return; stopJump(); t.restart(); setPlaying(true); };

  const onScrub = (e) => {
    const t = tl.current; if (!t) return;
    stopJump(); t.pause(); setPlaying(false);
    t.progress(Number(e.target.value) / 1000);
  };

  const changeSpeed = (s) => { setSpeed(s); tl.current?.timeScale(s); };

  const info = tataCara.phases[phase] || tataCara.phases.berdiri;
  const step = tataCara.steps[info.step - 1];

  return (
    <SectionShell id="tata-cara" index="05" eyebrow="Fokus Utama" title="Tata Cara Sujud Tilawah">
      <div ref={scope} className="grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:items-start">
        <div>
          <div className="grain relative overflow-hidden rounded-[28px] border border-gold/30 bg-navy-900 shadow-[0_40px_80px_-40px_rgba(14,34,67,0.8)]" data-testid="prayer-stage">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(200,160,74,0.18),transparent_60%)]" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-gold/30 bg-navy-900/70 px-3 py-1 text-xs font-medium text-gold-300 backdrop-blur" data-testid="prayer-phase-label">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />{info.label}
            </div>
            <div className="relative aspect-[440/380] w-full pt-6">
              <PrayerFigure ref={fig} />
            </div>
          </div>

          {!reduced && (
            <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3" data-testid="prayer-controls">
              <button onClick={togglePlay} aria-label={playing ? "Jeda" : "Putar"} data-testid="prayer-play-btn"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-gold transition-transform duration-300 hover:scale-105 active:scale-95">
                {playing ? <Pause size={18} /> : <Play size={18} className="translate-x-px" />}
              </button>
              <button onClick={restart} aria-label="Ulang" data-testid="prayer-restart-btn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-navy transition-colors hover:border-gold hover:text-gold-600">
                <RotateCcw size={17} />
              </button>
              <label className="flex min-w-[160px] flex-1 items-center gap-3">
                <span className="sr-only">Geser progres animasi</span>
                <input ref={slider} type="range" min="0" max="1000" defaultValue="0" onInput={onScrub} data-testid="prayer-scrub-slider"
                  className="h-11 w-full cursor-pointer accent-[#C8A04A]" aria-label="Progres animasi sujud" />
              </label>
              <div className="flex rounded-full bg-sky-note p-1" role="group" aria-label="Kecepatan">
                {SPEEDS.map((s) => (
                  <button key={s} onClick={() => changeSpeed(s)} aria-pressed={speed === s} data-testid={`prayer-speed-${s}`}
                    className={`h-9 min-w-[44px] rounded-full px-2 text-xs font-semibold transition-colors ${speed === s ? "bg-navy text-gold" : "text-navy/70 hover:text-navy"}`}>
                    {s}×
                  </button>
                ))}
              </div>
            </div>
          )}

          <ol className="mt-5 flex items-stretch gap-2 sm:gap-3" data-testid="prayer-stepper">
            {tataCara.steps.map((s, i) => {
              const active = info.step === s.no;
              return (
                <li key={s.no} className="flex flex-1 items-center gap-2 sm:gap-3">
                  <button onClick={() => goStep(s.no)} aria-current={active ? "step" : undefined} data-testid={`prayer-step-${s.no}`}
                    className={`flex min-h-[56px] w-full items-center gap-2 rounded-2xl border px-2 py-2 text-left transition-[background-color,border-color,box-shadow,transform] duration-500 sm:gap-3 sm:px-4 ${active ? "border-gold bg-navy text-white shadow-[0_0_0_4px_rgba(200,160,74,0.18)]" : "border-slate-200 bg-white text-navy hover:-translate-y-0.5 hover:border-gold/60"}`}>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${active ? "bg-gold text-navy-900" : "bg-sky-note text-navy"}`}>{s.no}</span>
                    <span className="text-xs font-semibold sm:text-sm">{s.title}</span>
                  </button>
                  {i < 2 && <ChevronRight className="hidden shrink-0 text-gold sm:block" size={20} aria-hidden />}
                </li>
              );
            })}
          </ol>
        </div>

        <aside className="lg:sticky lg:top-24" aria-live="polite">
          <div className="card-base relative overflow-hidden p-7 sm:p-9" data-testid="prayer-info-card">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-gold via-gold/60 to-navy" />
            <p className="eyebrow">Langkah {step.no} dari 3</p>
            <h3 key={step.no} className="mt-3 text-3xl font-extrabold text-navy animate-in fade-in slide-in-from-bottom-2 duration-500" data-testid="prayer-info-title">{step.title}</h3>
            <p key={`t${step.no}`} className="mt-3 text-base leading-relaxed text-slate-ink animate-in fade-in duration-700" data-testid="prayer-info-text">{step.text}</p>
            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-sky-ink">
              <span className="text-xl text-gold">۩</span>{info.label}
            </div>
            <div className="mt-7 grid grid-cols-3 gap-2">
              {tataCara.steps.map((s) => (
                <div key={s.no} className={`h-1.5 rounded-full transition-colors duration-500 ${s.no <= step.no ? "bg-gold" : "bg-slate-200"}`} />
              ))}
            </div>
          </div>
          <p className="note-box mt-5" data-testid="tatacara-note">{tataCara.note}</p>
        </aside>
      </div>
    </SectionShell>
  );
}
