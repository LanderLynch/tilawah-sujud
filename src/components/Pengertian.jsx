import { motion } from "framer-motion";
import { BookOpen, HeartHandshake, MoonStar } from "lucide-react";
import SectionShell from "./SectionShell";
import useTilt from "../hooks/useTilt";
import { pengertian } from "../data/content";

const ICONS = [MoonStar, HeartHandshake];

const InfoCard = ({ card, Icon, i }) => {
  const tilt = useTilt({ max: 8 });
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}>
      <div ref={tilt} className="rounded-2xl">
        <article className="card-base group flex h-full gap-5 p-7 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:border-gold/60 hover:shadow-[0_24px_50px_-20px_rgba(200,160,74,0.55)]" data-testid={`pengertian-card-${i}`}>
          <span className="icon-ring transition-transform duration-700 group-hover:rotate-[20deg] group-hover:scale-110"><Icon size={22} /></span>
          <div>
            <h3 className="text-lg font-bold text-navy">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-ink sm:text-base">{card.text}</p>
          </div>
        </article>
      </div>
    </motion.div>
  );
};

export default function Pengertian() {
  return (
    <SectionShell id="pengertian" index="01" eyebrow="Mengenal" title="Pengertian Ayat Sajadah">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="grain relative flex flex-col items-start gap-6 overflow-hidden rounded-[28px] bg-navy p-8 text-white sm:flex-row sm:items-center sm:p-12"
        data-testid="pengertian-banner"
      >
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-gold-300 ring-1 ring-gold/40"><BookOpen size={28} /></span>
        <p className="text-xl font-semibold leading-snug sm:text-2xl lg:text-3xl">{pengertian.banner}</p>
        <span className="pointer-events-none absolute -right-6 -top-10 font-arab text-[180px] leading-none text-gold/10" aria-hidden>۩</span>
      </motion.div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {pengertian.cards.map((c, i) => <InfoCard key={c.title} card={c} Icon={ICONS[i]} i={i} />)}
      </div>

      <div className="note-box mt-8 flex items-center gap-5" data-testid="pengertian-note">
        <span className="font-arab text-5xl not-italic leading-none text-gold animate-pulse-glow sm:text-6xl" aria-hidden>{pengertian.symbol}</span>
        <p>{pengertian.note} <span className="font-arab not-italic text-gold-600">{pengertian.symbol}</span></p>
      </div>
    </SectionShell>
  );
}
