import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, RotateCw } from "lucide-react";
import SectionShell from "./SectionShell";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { ayatNote, ayatSajadah } from "../data/content";

const FILTERS = [
  { id: "semua", label: "Semua", test: () => true },
  { id: "arab", label: "Dengan teks Arab", test: (a) => !!a.arab },
];

const AyatCard = ({ a, i, hoverSurah, setHoverSurah, onOpen }) => {
  const [pinned, setPinned] = useState(false);
  const [hover, setHover] = useState(false);
  const flipped = pinned || hover;
  const sibling = hoverSurah === a.surah && !hover;
  const toggle = () => {
    if (pinned) {
      // Release: drop the pin and clear hover so the card flips back to the
      // front even while the pointer is still resting on the card.
      setHover(false);
      setPinned(false);
    } else {
      setPinned(true);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: (i % 5) * 0.06 + Math.floor(i / 5) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="perspective"
    >
      <div
        role="button" tabIndex={0} aria-pressed={flipped}
        aria-label={`Ayat sajadah ${a.no}: QS. ${a.surah} ayat ${a.ayat}. Tekan untuk membalik kartu.`}
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}
        onPointerEnter={(e) => { if (e.pointerType === "mouse") { setHover(true); setHoverSurah(a.surah); } }}
        onPointerLeave={(e) => { if (e.pointerType === "mouse") { setHover(false); setHoverSurah(null); } }}
        data-testid={`ayat-card-${a.no}`}
        className={`preserve-3d relative h-48 w-full cursor-pointer rounded-2xl transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] sm:h-52 ${flipped ? "rotate-y-180" : ""}`}
      >
        <div className={`backface-hidden card-base absolute inset-0 flex flex-col justify-between p-5 transition-[box-shadow,border-color] duration-500 ${sibling ? "border-gold shadow-[0_0_0_3px_rgba(200,160,74,0.35),0_0_30px_rgba(200,160,74,0.45)]" : ""}`}>
          <div className="flex items-start justify-between">
            <span className="text-4xl font-black leading-none text-transparent [-webkit-text-stroke:1.5px_#C8A04A]">{String(a.no).padStart(2, "0")}</span>
            <span className="font-arab text-2xl leading-none text-gold" aria-hidden>۩</span>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-ink">QS.</p>
            <p className="text-base font-bold leading-tight text-navy sm:text-lg">{a.surah}</p>
            <p className="mt-1 text-sm text-sky-ink">Ayat {a.ayat}</p>
          </div>
          <RotateCw size={14} className="absolute bottom-4 right-4 text-slate-300" aria-hidden />
        </div>

        <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-gold/50 bg-navy p-5 text-white">
          <span className="pointer-events-none absolute -bottom-6 -right-2 font-arab text-[110px] leading-none text-gold/10" aria-hidden>۩</span>
          <p className="text-xs font-semibold text-gold-300">QS. {a.surah}: {a.ayat}</p>
          {a.ciri ? (
            <p className="text-sm font-semibold leading-snug">{a.ciri}</p>
          ) : (
            <p className="text-sm leading-snug text-white/75">Ayat sajadah ke-{a.no}</p>
          )}
          {a.arab ? (
            <button
              onClick={(e) => { e.stopPropagation(); onOpen(a); }}
              onKeyDown={(e) => e.stopPropagation()}
              tabIndex={flipped ? 0 : -1}
              data-testid={`ayat-card-${a.no}-lihat-arti`}
              className="relative flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-gold px-3 text-xs font-bold text-navy-900 transition-transform hover:scale-[1.03]"
            >
              <Eye size={14} /> Lihat arti
            </button>
          ) : <span className="h-px w-10 bg-gold/50" />}
        </div>
      </div>
    </motion.div>
  );
};

export default function AyatGrid() {
  const [filter, setFilter] = useState("semua");
  const [hoverSurah, setHoverSurah] = useState(null);
  const [open, setOpen] = useState(null);
  const test = FILTERS.find((f) => f.id === filter).test;
  const list = ayatSajadah.filter(test);

  useEffect(() => { setHoverSurah(null); }, [filter]);

  return (
    <SectionShell id="ayat" index="02" eyebrow="Daftar Lengkap" title="15 Ayat Sajadah">
      <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter ayat">
        {FILTERS.map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)} aria-pressed={filter === f.id} data-testid={`ayat-filter-${f.id}`}
            className={`min-h-[44px] rounded-full border px-5 text-sm font-semibold transition-colors duration-300 ${filter === f.id ? "border-navy bg-navy text-gold" : "border-slate-200 bg-white text-navy hover:border-gold"}`}>
            {f.label} <span className="ml-1 opacity-60">{ayatSajadah.filter(f.test).length}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5" data-testid="ayat-grid">
        {list.map((a, i) => (
          <AyatCard key={a.no} a={a} i={i} hoverSurah={hoverSurah} setHoverSurah={setHoverSurah} onOpen={setOpen} />
        ))}
      </motion.div>
      <p className="mt-4 text-center text-xs text-slate-ink">Arahkan kursor atau ketuk kartu untuk membalik.</p>

      <p className="note-box mt-8" data-testid="ayat-note">{ayatNote}</p>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-2xl border-gold/40 bg-navy-900 text-white sm:rounded-3xl" data-testid="ayat-dialog">
          {open && (
            <>
              <DialogHeader>
                <DialogTitle className="text-gold-300">QS. {open.surah}: {open.ayat}</DialogTitle>
                <DialogDescription className="text-white/75">{open.ciri}</DialogDescription>
              </DialogHeader>
              <p lang="ar" dir="rtl" className="arab py-4 text-center text-[30px] text-white sm:text-[40px]" data-testid="ayat-dialog-arab">{open.arab}</p>
              {open.arti && <p className="rounded-2xl bg-white/5 p-4 text-sm italic leading-relaxed text-white/85" data-testid="ayat-dialog-arti">{open.arti}</p>}
              <p className="text-[11px] text-white/60">Terjemahan mengikuti terjemahan Kemenag RI.</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </SectionShell>
  );
}
