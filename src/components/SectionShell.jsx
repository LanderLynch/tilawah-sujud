import { motion } from "framer-motion";

const Diamonds = ({ dark }) => (
  <div className="pointer-events-none absolute right-6 top-8 flex items-center gap-2 sm:right-12 sm:top-12" aria-hidden>
    <span className="h-3 w-3 rotate-45 bg-gold" />
    <span className={`h-2 w-2 rotate-45 ${dark ? "bg-sky-note/60" : "bg-sky-ink/70"}`} />
  </div>
);

export const SectionTitle = ({ id, index, eyebrow, title, dark }) => (
  <div className="mb-14 text-center sm:mb-16">
    <p className={`eyebrow ${dark ? "text-gold-300" : ""}`}>
      <span className="mr-3 opacity-70">{index}</span>{eyebrow}
    </p>
    <motion.h2
      id={`${id}-title`}
      className={`mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${dark ? "text-white" : "text-navy"}`}
      initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: 0.08 }}
    >
      {title.split(" ").map((w, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom last:mr-0">
          <motion.span className="inline-block" variants={{ hidden: { y: "105%" }, show: { y: 0 } }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            {w}
          </motion.span>
        </span>
      ))}
    </motion.h2>
    <motion.span
      className="mx-auto mt-5 block h-[3px] w-16 origin-center rounded-full bg-gold"
      initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3 }}
    />
  </div>
);

export default function SectionShell({ id, index, eyebrow, title, dark = false, className = "", children, bg }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-testid={`section-${id}`}
      className={`relative overflow-hidden py-24 sm:py-28 ${dark ? "bg-navy-900 text-white" : "bg-cream"} ${className}`}
    >
      {bg}
      {dark ? (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      ) : (
        <div className="pointer-events-none absolute bottom-10 left-3 top-10 flex gap-1 sm:left-8" aria-hidden>
          <span className="w-[3px] rounded-full bg-navy" />
          <span className="w-[2px] rounded-full bg-gold" />
        </div>
      )}
      <Diamonds dark={dark} />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
        <SectionTitle id={id} index={index} eyebrow={eyebrow} title={title} dark={dark} />
        {children}
      </div>
    </section>
  );
}
