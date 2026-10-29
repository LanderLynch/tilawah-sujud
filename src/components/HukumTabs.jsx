import { useState } from "react";
import { motion } from "framer-motion";
import { BookMarked, UserCheck, Users } from "lucide-react";
import SectionShell from "./SectionShell";
import MosqueSilhouette from "./MosqueSilhouette";
import { hukum } from "../data/content";

const ICONS = { mayoritas: Users, hanafi: BookMarked, jamaah: UserCheck };

export default function HukumTabs() {
  const [tab, setTab] = useState(hukum.tabs[0].id);
  const current = hukum.tabs.find((t) => t.id === tab);
  const Icon = ICONS[tab];

  return (
    <SectionShell id="hukum" index="04" eyebrow="Fikih" title="Hukum Sujud Tilawah">
      <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-square w-64 sm:w-80" data-testid="hukum-circle">
          <div className="absolute inset-0 rounded-full border border-dashed border-gold/60 animate-spin-slow" />
          <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full border-2 border-gold bg-navy p-8 text-center shadow-[0_30px_60px_-30px_rgba(14,34,67,0.9)]">
            <MosqueSilhouette color="#FFFFFF" cut="#14305A" className="h-24 w-24 sm:h-28 sm:w-28" />
            <p className="mt-3 text-sm font-semibold leading-snug text-gold-300 sm:text-base">{hukum.circleLabel}</p>
          </div>
        </motion.div>

        <div>
          <div role="tablist" aria-label="Pendapat ulama" className="relative grid grid-cols-1 gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 sm:grid-cols-3">
            {hukum.tabs.map((t) => {
              const on = t.id === tab;
              return (
                <button key={t.id} role="tab" id={`tab-${t.id}`} aria-selected={on} aria-controls="hukum-panel" onClick={() => setTab(t.id)} data-testid={`hukum-tab-${t.id}`}
                  className={`relative min-h-[48px] rounded-xl px-3 text-sm font-semibold transition-colors duration-300 ${on ? "text-navy-900" : "text-navy/70 hover:text-navy"}`}>
                  {on && <motion.span layoutId="hukum-indicator" className="absolute inset-0 rounded-xl bg-gold shadow-[0_8px_20px_-8px_rgba(200,160,74,0.9)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative">{t.label}</span>
                </button>
              );
            })}
          </div>

          <div id="hukum-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="relative mt-6 min-h-[180px]">
            <motion.div key={tab} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="card-base flex gap-5 p-7 sm:p-9" data-testid="hukum-panel-content">
              <span className="icon-ring"><Icon size={22} /></span>
              <div>
                <h3 className="text-lg font-bold text-navy">{current.label}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-ink sm:text-lg">{current.text}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <p className="note-box mt-10" data-testid="hukum-note">{hukum.note}</p>
    </SectionShell>
  );
}
