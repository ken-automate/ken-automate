import { renderToString } from "react-dom/server";
import { HomePage } from "@/components/portfolio/HomePage";

// Build-time entry: renders the homepage to static HTML so AI crawlers and other bots
// that do not run JavaScript can read the full content. scripts/prerender.mjs places the
// result inside #root in dist/index.html; the browser app then renders over it as usual.
export function render() {
  return renderToString(<HomePage />);
}
