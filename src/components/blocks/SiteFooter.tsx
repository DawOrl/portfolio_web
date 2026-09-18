import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <div className="footer-top">
        <Link href="/#top" className="brand">
          <BrandMark />
          <span>
            Dawid Orłowski<small>DESIGN & DEVELOPMENT</small>
          </span>
        </Link>
        <div>
          <a
            href="https://github.com/DawOrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight size={15} />
          </a>
          <Link href="/#kontakt">
            Kontakt <ArrowUpRight size={15} />
          </Link>
          <a
            href="/Dawid_Orlowski_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Moje CV <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">
        dorlowski<span>.dev</span>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Dawid Orłowski</span>
        <span>Zaprojektowane z pomysłem. Zakodowane z głową.</span>
        <Link href="/#top">
          Na górę <ArrowUp size={14} />
        </Link>
      </div>
    </footer>
  );
}
