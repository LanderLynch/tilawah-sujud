import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionShell from "./SectionShell";
import { dalil } from "../data/content";

const DalilRow = ({ d, i }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="card-base group relative overflow-hidden"
      data-testid={`dalil-card-${i}`}
    >
      <span className="absolute left-0 top-1/2 h-1/3 w-1 -translate-y-1/2 origin-center rounded-r-full bg-gold transition-transform duration-500 group-hover:scale-y-[3]" aria-hidden />
      <div className="grid items-center gap-4 p-6 sm:p-8 md:grid-cols-[1fr_1.4fr] md:gap-10">
        <div>
          <p className="eyebrow">QS. {d.surah}: {d.ayat}</p>
          <h3 className="mt-2 text-xl font-bold text-navy sm:text-2xl">{d.ciri}</h3>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} data-testid={`dalil-toggle-${i}`}
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-navy/15 px-4 text-sm font-semibold text-navy transition-colors hover:border-gold hover:text-gold-600">
            {open ? "Sembunyikan arti" : "Tampilkan arti"}
            <ChevronDown size={16} className={`transition-transform duration-500 ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
        <motion.p
          lang="ar" dir="rtl"
          variants={{ hidden: { clipPath: "inset(0 0 0 100%)" }, show: { clipPath: "inset(0 0 0 0%)" } }}
          transition={{ duration: 1.3, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="arab text-right text-[28px] text-navy md:text-[38px] lg:text-[42px]"
          data-testid={`dalil-arab-${i}`}
        >
          {d.arab}
        </motion.p>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className="mx-6 mb-6 rounded-xl bg-sky-note px-5 py-4 text-sm italic text-sky-ink sm:mx-8 sm:mb-8" data-testid={`dalil-arti-${i}`}>
              <span className="font-semibold not-italic">Artinya: </span>{d.arti}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default function DalilList() {
  return (
    <SectionShell id="dalil" index="03" eyebrow="Dalil" title="Contoh dan Dalil Ayat Sajadah">
      <div className="flex flex-col gap-5">
        {dalil.map((d, i) => <DalilRow key={d.no} d={d} i={i} />)}
      </div>
      <p className="mt-6 text-center text-xs text-slate-ink">Terjemahan mengikuti terjemahan Kemenag RI.</p>
    </SectionShell>
  );
}
