import path from "node:path";
import esbuild from "esbuild";

// Bundles src/ into the single file that index.html loads.
// Styles are NOT rebuilt here — the compiled Tailwind CSS (static/css/main.css) is reused as-is.
await esbuild.build({
  entryPoints: ["src/index.js"],
  bundle: true,
  minify: true,
  format: "iife",
  jsx: "automatic",
  loader: { ".js": "jsx" },
  target: "es2019",
  define: { "process.env.NODE_ENV": '"production"' },
  alias: { "@": path.resolve("src") },
  outfile: "static/js/main.js",
  logLevel: "info",
});

console.log("Built static/js/main.js");
