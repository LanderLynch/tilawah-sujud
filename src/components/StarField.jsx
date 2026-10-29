import { useEffect, useRef } from "react";

export default function StarField({ density = 1, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let raf = 0;
    let visible = false;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((width < 768 ? 70 : 170) * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        r: Math.random() * 1.3 + 0.3, d: Math.random() * 0.8 + 0.2,
        p: Math.random() * Math.PI * 2, s: Math.random() * 0.02 + 0.006,
        gold: Math.random() < 0.18,
      }));
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      for (const s of stars) {
        s.p += s.s;
        const a = 0.35 + Math.sin(s.p) * 0.35 + 0.3;
        ctx.globalAlpha = Math.max(0.08, Math.min(1, a));
        ctx.fillStyle = s.gold ? "#E0C27E" : "#FFFFFF";
        ctx.beginPath();
        ctx.arc(s.x + mouse.x * s.d * 18, s.y + mouse.y * s.d * 18, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (visible) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = e.clientY / window.innerHeight - 0.5;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });

    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
