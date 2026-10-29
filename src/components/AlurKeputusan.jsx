import { useState } from "react";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import SectionShell from "./SectionShell";
import { alur } from "../data/content";

const Line = ({ d, lit, vertical }) => (
  <>
    <path d={d} fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
    <path d={d} fill="none" stroke="#C8A04A" strokeWidth="3" strokeLinecap="round" pathLength="1" strokeDasharray="1"
      style={{ strokeDashoffset: lit ? 0 : 1, transition: "stroke-dashoffset 0.9s cubic-bezier(0.65,0,0.35,1)", filter: lit ? "drop-shadow(0 0 6px rgba(200,160,74,0.8))" : "none" }}
      vectorEffect={vertical ? undefined : "non-scaling-stroke"} />
  </>
);

const Result = ({ kind, choice, children }) => {
  const on = choice === kind;
  const dim = choice && !on;
  return (
    <div data-testid={`alur-result-${kind}`}
      className={`rounded-2xl border p-5 transition-[opacity,transform,box-shadow,border-color,background-color] duration-700 ${on ? "border-gold bg-navy text-white shadow-[0_0_0_4px_rgba(200,160,74,0.2),0_20px_40px_-20px_rgba(200,160,74,0.7)]" : "border-slate-200 bg-white text-navy"} ${dim ? "scale-95 opacity-35" : "opacity-100"}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${on ? "text-gold-300" : "text-slate-ink"}`}>{kind === "ya" ? "Jika Ya" : "Jika Tidak"}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default function AlurKeputusan() {
  const [choice, setChoice] = useState(null);
  const lit = !!choice;

  return (
    <SectionShell id="alur" index="08" eyebrow="Diagram" title="Alur Lengkap Sujud Tilawah">
      <div className="mx-auto flex max-w-5xl flex-col items-stretch md:flex-row md:items-center" data-testid="alur-diagram">
        <div className="rounded-2xl bg-navy p-6 text-center text-white shadow-lg md:w-48" data-testid="alur-start">
          <span className="font-arab text-4xl leading-none text-gold">۩</span>
          <p className="mt-2 font-bold">{alur.start}</p>
        </div>

        <svg className="mx-auto h-12 w-4 md:hidden" viewBox="0 0 4 48" preserveAspectRatio="none" aria-hidden><Line d="M2 0V48" lit={lit} vertical /></svg>
        <svg className="hidden h-4 w-14 md:block" viewBox="0 0 56 4" preserveAspectRatio="none" aria-hidden><Line d="M0 2H56" lit={lit} /></svg>

        <div className="rounded-2xl border-2 border-gold bg-gold/15 p-6 text-center md:w-56" data-testid="alur-question">
          <p className="text-lg font-extrabold text-navy">{alur.question}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button onClick={() => setChoice("ya")} aria-pressed={choice === "ya"} data-testid="alur-btn-ya"
              className={`flex min-h-[52px] items-center justify-center gap-1.5 rounded-xl text-base font-bold transition-[background-color,color,transform] duration-300 active:scale-95 ${choice === "ya" ? "bg-navy text-gold" : "bg-white text-navy hover:bg-navy hover:text-white"}`}>
              <Check size={18} /> Ya
            </button>
            <button onClick={() => setChoice("tidak")} aria-pressed={choice === "tidak"} data-testid="alur-btn-tidak"
              className={`flex min-h-[52px] items-center justify-center gap-1.5 rounded-xl text-base font-bold transition-[background-color,color,transform] duration-300 active:scale-95 ${choice === "tidak" ? "bg-navy text-gold" : "bg-white text-navy hover:bg-navy hover:text-white"}`}>
              <X size={18} /> Tidak
            </button>
          </div>
        </div>

        <svg className="mx-auto h-14 w-full md:hidden" viewBox="0 0 300 56" preserveAspectRatio="none" aria-hidden>
          <Line d="M150 0V20Q150 28 142 28H83Q75 28 75 36V56" lit={choice === "ya"} />
          <Line d="M150 0V20Q150 28 158 28H217Q225 28 225 36V56" lit={choice === "tidak"} />
        </svg>
        <svg className="hidden h-56 w-20 shrink-0 md:block" viewBox="0 0 80 224" preserveAspectRatio="none" aria-hidden>
          <Line d="M0 112H30Q40 112 40 102V60Q40 50 50 50H80" lit={choice === "ya"} />
          <Line d="M0 112H30Q40 112 40 122V164Q40 174 50 174H80" lit={choice === "tidak"} />
        </svg>

        <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-1 md:gap-6">
          <Result kind="ya" choice={choice}>
            <p className="text-lg font-bold">{alur.ya}</p>
          </Result>
          <Result kind="tidak" choice={choice}>
            <div className="flex flex-wrap items-center gap-1.5 text-sm font-bold sm:text-base">
              {alur.tidak.map((s, i) => (
                <span key={s} className="flex items-center gap-1.5">
                  {s}{i < alur.tidak.length - 1 && <ArrowRight size={14} className="text-gold" />}
                </span>
              ))}
            </div>
          </Result>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button onClick={() => setChoice(null)} disabled={!choice} data-testid="alur-reset-btn"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-navy/20 px-5 text-sm font-semibold text-navy transition-[opacity,border-color] hover:border-gold disabled:opacity-40">
          <RotateCcw size={16} /> Ulangi
        </button>
      </div>
      <p className="note-box mt-8" data-testid="alur-note">{alur.note}</p>
    </SectionShell>
  );
}
