import { motion } from "framer-motion";
import { ChevronsDown, HandHeart, ShieldCheck, Sun, TreePalm, TrendingUp } from "lucide-react";
import SectionShell from "./SectionShell";
import useTilt from "../hooks/useTilt";
import { hikmah } from "../data/content";

const ICONS = { HandHeart, TrendingUp, ChevronsDown, Sun, ShieldCheck, TreePalm };
const ANIM = {
  wiggle: "group-hover:animate-wiggle",
  bob: "group-hover:animate-bob",
  spin: "group-hover:animate-[spin_3s_linear_infinite]",
  pulse: "group-hover:animate-pulse-glow",
};

const HikmahCard = ({ h, i }) => {
  const tilt = useTilt({ max: 8, glare: true, "max-glare": 0.2 });
  const Icon = ICONS[h.icon];
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}>
      <div ref={tilt} className="h-full rounded-2xl">
        <article className="card-base group relative flex h-full flex-col overflow-hidden p-7 transition-[border-color,box-shadow] duration-500 hover:border-gold/60 hover:shadow-[0_24px_50px_-22px_rgba(200,160,74,0.6)]" data-testid={`hikmah-card-${i}`}>
          <span className="absolute right-6 top-6 text-5xl font-black text-sky-note">{String(i + 1).padStart(2, "0")}</span>
          <span className="icon-ring relative"><Icon size={22} className={ANIM[h.anim]} /></span>
          <h3 className="relative mt-6 text-lg font-bold leading-snug text-navy">{h.title}</h3>
          <p className="relative mt-2 text-sm leading-relaxed text-slate-ink sm:text-base">{h.text}</p>
        </article>
      </div>
    </motion.div>
  );
};

export default function Hikmah() {
  return (
    <SectionShell id="hikmah" index="07" eyebrow="Pelajaran" title="Hikmah Sujud Tilawah">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {hikmah.items.map((h, i) => <HikmahCard key={h.title} h={h} i={i} />)}
      </div>
      <p className="note-box mt-8" data-testid="hikmah-note">{hikmah.note}</p>
    </SectionShell>
  );
}
