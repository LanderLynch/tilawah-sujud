export const MosqueSilhouette = ({ color = "#C8A04A", cut = "#0E2243", className = "", animated = false, label }) => (
  <svg viewBox="0 0 200 200" className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
    <g className={animated ? "animate-float" : ""} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
      <path d="M106 14a13 13 0 1 0 0 24 10 10 0 1 1 0-24z" fill={color} />
    </g>
    <rect x="99" y="40" width="2" height="18" fill={color} />
    <g className={animated ? "animate-pulse-glow" : ""}>
      <path d="M58 112c0-28 18-46 42-52 24 6 42 24 42 52z" fill={color} />
    </g>
    <rect x="50" y="110" width="100" height="60" fill={color} />
    <path d="M88 170v-26a12 12 0 0 1 24 0v26z" fill={cut} />
    <path d="M62 140v-10a6 6 0 0 1 12 0v10zM126 140v-10a6 6 0 0 1 12 0v10z" fill={cut} />
    {[28, 160].map((x) => (
      <g key={x}>
        <path d={`M${x} 74l6-22 6 22z`} fill={color} />
        <rect x={x} y="74" width="12" height="96" fill={color} />
        <rect x={x - 3} y="98" width="18" height="4" rx="1" fill={color} />
      </g>
    ))}
    <rect x="18" y="170" width="164" height="6" rx="2" fill={color} />
  </svg>
);

export default MosqueSilhouette;
