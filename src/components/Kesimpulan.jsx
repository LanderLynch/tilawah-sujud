import { motion } from "framer-motion";
import { BookOpen, HeartHandshake, Scale } from "lucide-react";
import SectionShell from "./SectionShell";
import StarField from "./StarField";
import useReducedMotion from "../hooks/useReducedMotion";
import { anggota, hero, kesimpulan } from "../data/content";

const ICONS = { BookOpen, HeartHandshake, Scale };

export default function Kesimpulan() {
  const reduced = useReducedMotion();
  return (
    <SectionShell id="kesimpulan" index="09" eyebrow="Penutup" title="Kesimpulan" dark className="grain" bg={!reduced && <StarField density={0.6} />}>
      <div className="grid gap-5 md:grid-cols-3">
        {kesimpulan.items.map((k, i) => {
          const Icon = ICONS[k.icon];
          return (
            <motion.article key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl border border-gold/25 bg-navy-700 p-7 transition-[transform,border-color] duration-500 hover:-translate-y-2 hover:border-gold/70"
              data-testid={`kesimpulan-card-${i}`}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-navy-900 text-gold transition-transform duration-500 group-hover:scale-110"><Icon size={22} /></span>
              <p className="mt-5 text-base leading-relaxed text-white/90">{k.text}</p>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-24 text-center">
        <motion.span className="mx-auto block h-[3px] w-20 rounded-full bg-gold" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
        <p className="mt-10 bg-gradient-to-r from-gold-300 via-gold to-gold-600 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-7xl lg:text-8xl" data-testid="kesimpulan-thanks">
          {kesimpulan.thanks}
        </p>
        <p className="mt-6 text-base text-white/85 md:text-lg" data-testid="kesimpulan-salam">{kesimpulan.salam}</p>
      </div>

      <footer className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/60 sm:flex-row">
        <span>{hero.label} · {hero.kelompok}</span>
        <span>{anggota.length} anggota · {hero.footer}</span>
      </footer>
    </SectionShell>
  );
}
