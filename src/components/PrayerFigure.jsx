import { forwardRef, useImperativeHandle, useRef } from "react";
import { doa } from "../data/content";

export const ZERO = { foot: 0, ankle: 0, knee: 0, hip: 0, neck: 0, shoulder: 0, elbow: 0, wrist: 0 };
export const KNEEL = { foot: 65, ankle: 37.9, knee: -107.8, hip: 22.9, neck: 12.2, shoulder: -58, elbow: -30, wrist: -10 };
export const SUJUD = { foot: 65, ankle: 37.9, knee: -112.8, hip: 124.9, neck: 47.5, shoulder: -202.3, elbow: 84.4, wrist: -87.1 };

// Titik pivot sendi (koordinat pose berdiri)
const PIVOTS = {
  foot: "250 340", ankle: "222 330", knee: "222 260", hip: "222 190",
  neck: "222 102", shoulder: "222 112", elbow: "222 156", wrist: "222 196",
};

const GOLD = "#C8A04A";
const NAVY = "#14305A";

const PrayerFigure = forwardRef(function PrayerFigure(_, ref) {
  const g = useRef({});
  const o = useRef({});
  const set = (k) => (el) => { g.current[k] = el; };
  const ov = (k) => (el) => { o.current[k] = el; };

  useImperativeHandle(ref, () => ({
    apply(pose) {
      Object.keys(PIVOTS).forEach((k) => {
        g.current[k]?.setAttribute("transform", `rotate(${pose[k]} ${PIVOTS[k]})`);
      });
    },
    overlays: () => o.current,
  }));

  return (
    <div className="relative h-full w-full">
      <svg viewBox="110 -10 440 380" className="h-full w-full" role="img" aria-label="Animasi siluet orang melakukan sujud tilawah, tampak samping" data-testid="prayer-figure-svg">
        <defs>
          <radialGradient id="pf-glow">
            <stop offset="0%" stopColor="#E0C27E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#C8A04A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pf-mat" x1="0" x2="1">
            <stop offset="0%" stopColor="#1D4079" />
            <stop offset="100%" stopColor="#14305A" />
          </linearGradient>
        </defs>

        {/* lantai & sajadah */}
        <line x1="110" y1="340" x2="550" y2="340" stroke={GOLD} strokeOpacity="0.25" />
        <rect x="196" y="340" width="278" height="9" rx="2" fill="url(#pf-mat)" stroke={GOLD} strokeWidth="1" />
        {[206, 214, 456, 464].map((x) => <line key={x} x1={x} y1="341" x2={x} y2="348" stroke={GOLD} strokeOpacity="0.7" />)}
        <path d="M226 344.5h220" stroke={GOLD} strokeOpacity="0.5" strokeDasharray="3 5" />

        {/* cincin takbir */}
        <circle ref={ov("ring")} cx="224" cy="170" r="90" fill="none" stroke={GOLD} strokeWidth="2" opacity="0" />
        <circle ref={ov("ring2")} cx="224" cy="170" r="90" fill="none" stroke="#E0C27E" strokeWidth="1" opacity="0" />
        <circle ref={ov("glow")} cx="388" cy="318" r="70" fill="url(#pf-glow)" opacity="0" />

        {/* figur: rantai sendi dari ujung kaki */}
        <g fill={GOLD} stroke="none">
          <g ref={set("foot")}>
            <path d="M214 327C209 331 209 340 217 340L250 340C252 340 252 335 248 334L231 326Z" />
            <g ref={set("ankle")}>
              <path d="M210 260L234 260L235 331L209 331Z" />
              <circle cx="222" cy="331" r="9" />
              <g ref={set("knee")}>
                <line x1="222" y1="260" x2="222" y2="190" stroke={GOLD} strokeWidth="30" strokeLinecap="round" />
                <g ref={set("hip")}>
                  <line x1="222" y1="188" x2="222" y2="118" stroke={GOLD} strokeWidth="38" strokeLinecap="round" />
                  <g ref={set("neck")}>
                    <rect x="216" y="86" width="12" height="20" rx="5" />
                    <circle cx="224" cy="78" r="18" />
                  </g>
                  <g ref={set("shoulder")}>
                    <line x1="222" y1="112" x2="222" y2="156" stroke={NAVY} strokeWidth="19" strokeLinecap="round" />
                    <line x1="222" y1="112" x2="222" y2="156" stroke={GOLD} strokeWidth="14" strokeLinecap="round" />
                    <g ref={set("elbow")}>
                      <line x1="222" y1="156" x2="222" y2="196" stroke={NAVY} strokeWidth="17" strokeLinecap="round" />
                      <line x1="222" y1="156" x2="222" y2="196" stroke={GOLD} strokeWidth="12" strokeLinecap="round" />
                      <g ref={set("wrist")}>
                        <line x1="222" y1="196" x2="222" y2="210" stroke={GOLD} strokeWidth="10" strokeLinecap="round" />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>

        {/* penanda */}
        <text ref={ov("icon")} x="224" y="36" textAnchor="middle" fontSize="34" fill="#E0C27E" fontFamily="Amiri, serif" opacity="0">۩</text>
        <g ref={ov("bubble")} opacity="0">
          <rect x="258" y="14" width="132" height="36" rx="18" fill="#FBF9F4" />
          <path d="M270 46l-14 16 24-12z" fill="#FBF9F4" />
          <text x="324" y="37" textAnchor="middle" fontSize="15" fontWeight="700" fill={NAVY} fontFamily="Inter, sans-serif">Allāhu Akbar</text>
        </g>
        <text ref={ov("onex")} x="452" y="250" textAnchor="middle" fontSize="44" fontWeight="800" fill="#E0C27E" fontFamily="Inter, sans-serif" opacity="0">1×</text>
        <g ref={ov("check")} opacity="0">
          <circle cx="224" cy="26" r="17" fill="none" stroke={GOLD} strokeWidth="2.5" />
          <path d="M216 26l6 6 11-12" fill="none" stroke="#E0C27E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>

      <p
        ref={ov("doa")}
        lang="ar" dir="rtl"
        className="arab pointer-events-none absolute inset-x-4 top-3 text-center text-[22px] text-gold-300 opacity-0 sm:text-3xl lg:text-[34px]"
        style={{ textShadow: "0 0 24px rgba(224,194,126,0.6)" }}
        data-testid="prayer-doa-overlay"
      >
        {doa.arab}
      </p>
    </div>
  );
});

export default PrayerFigure;
