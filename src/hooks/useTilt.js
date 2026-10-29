import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import useReducedMotion from "./useReducedMotion";

export default function useTilt(options = {}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const opts = JSON.stringify(options);
  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!el || reduced || !fine) return undefined;
    VanillaTilt.init(el, { max: 8, speed: 600, glare: true, "max-glare": 0.18, scale: 1.01, ...JSON.parse(opts) });
    return () => el.vanillaTilt?.destroy();
  }, [reduced, opts]);
  return ref;
}
