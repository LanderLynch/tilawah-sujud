import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Copy } from "lucide-react";
import SectionShell from "./SectionShell";
import { doa } from "../data/content";

const copyText = async (text) => {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
};

const CopyBtn = ({ id, text, copied, onCopy, dark }) => (
  <button onClick={() => onCopy(id, text)} data-testid={`copy-${id}-btn`} aria-live="polite"
    className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-xs font-semibold transition-colors duration-300 ${dark ? "border border-gold/50 text-gold-300 hover:bg-gold hover:text-navy-900" : "border border-slate-200 text-navy hover:border-gold hover:text-gold-600"}`}>
    {copied === id ? <><Check size={14} /> Tersalin ✓</> : <><Copy size={14} /> Salin</>}
  </button>
);

const ToggleCard = ({ id, title, titleClass, text, italic, copied, onCopy }) => {
  const [open, setOpen] = useState(true);
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="card-base p-6 sm:p-8" data-testid={`doa-card-${id}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className={`text-lg font-bold ${titleClass}`}>{title}</h3>
        <div className="flex gap-2">
          <CopyBtn id={id} text={text} copied={copied} onCopy={onCopy} />
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? `Sembunyikan ${title}` : `Tampilkan ${title}`} data-testid={`toggle-${id}-btn`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-note text-navy transition-colors hover:bg-gold">
            <ChevronDown size={18} className={`transition-transform duration-500 ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className={`pt-4 text-base leading-relaxed text-slate-ink ${italic ? "italic" : ""}`} data-testid={`doa-${id}-text`}>{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function BacaanDoa() {
  const [copied, setCopied] = useState(null);
  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(null), 1800);
    return () => clearTimeout(t);
  }, [copied]);
  const onCopy = async (id, text) => { if (await copyText(text)) setCopied(id); };

  return (
    <SectionShell id="bacaan" index="06" eyebrow="Doa" title="Bacaan Sujud Tilawah">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="grain group relative overflow-hidden rounded-[28px] border-2 border-gold/70 bg-navy px-6 py-12 text-white shadow-[0_40px_80px_-40px_rgba(14,34,67,0.8)] sm:px-14 sm:py-16" data-testid="doa-arab-card">
        <div className="pointer-events-none absolute inset-3 rounded-[22px] border border-gold/20" />
        <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:animate-shimmer group-hover:opacity-100" aria-hidden />
        <p lang="ar" dir="rtl" className="arab relative text-center text-[30px] !leading-[2.3] text-white sm:text-[38px] lg:text-[46px]" data-testid="doa-arab-text">{doa.arab}</p>
        <div className="relative mt-8 flex justify-center">
          <CopyBtn id="arab" text={doa.arab} copied={copied} onCopy={onCopy} dark />
        </div>
      </motion.div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <ToggleCard id="transliterasi" title="Transliterasi" titleClass="text-sky-ink" text={doa.transliterasi} italic copied={copied} onCopy={onCopy} />
        <ToggleCard id="arti" title="Artinya" titleClass="text-gold-600" text={doa.arti} copied={copied} onCopy={onCopy} />
      </div>
    </SectionShell>
  );
}
