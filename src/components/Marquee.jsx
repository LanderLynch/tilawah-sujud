const ITEMS = ["AYAT AL-QUR'AN", "۩", "SUJUD TILAWAH", "۩", "HIKMAH", "۩", "TUNDUK DAN TAAT", "۩"];

export default function Marquee() {
  const row = (k) => (
    <div key={k} className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={k === 1}>
      {ITEMS.map((t, i) => (
        <span key={i} className={t === "۩" ? "font-arab text-3xl text-gold" : "text-2xl font-extrabold tracking-[0.18em] text-white/90 sm:text-4xl"}>{t}</span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden border-y border-gold/30 bg-navy py-6" data-testid="editorial-marquee">
      <div className="flex w-max animate-marquee">{[0, 1].map(row)}</div>
    </div>
  );
}
