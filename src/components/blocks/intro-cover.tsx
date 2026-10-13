export const INTRO_SEEN = "dorlowski-intro-v2";

// Mirrors the first-visit check in PortfolioMotion, before any paint. It lives in the
// root layout, which never re-renders on client navigation, so it only runs on page loads.
const cover = `try{if(location.pathname==="/"&&!location.hash&&!sessionStorage.getItem("${INTRO_SEEN}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!matchMedia("(forced-colors: active)").matches)document.documentElement.classList.add("intro-pending")}catch(e){}`;

/** Covers the home page in the intro colour until the intro opens, so the hero never flashes first. */
export function IntroCover() {
  return <script dangerouslySetInnerHTML={{ __html: cover }} />;
}
