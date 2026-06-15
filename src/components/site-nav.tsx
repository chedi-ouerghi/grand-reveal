import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled ? "glass-panel py-3" : "bg-transparent py-6",
      ].join(" ")}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 flex justify-between items-center text-[color:var(--obsidian)]">
        <Link
          to="/"
          className="font-serif italic text-2xl tracking-tight font-medium hover:text-champagne transition-colors"
        >
          Aetheris&nbsp;<span className="opacity-50">Albania</span>
        </Link>
        <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-medium">
          <Link to="/collection" className="hover:text-champagne transition-colors">
            Residences
          </Link>
          <Link to="/philosophy" className="hover:text-champagne transition-colors">
            Philosophy
          </Link>
          <Link to="/inquiry" className="hover:text-champagne transition-colors">
            Concierge
          </Link>
        </div>
        <Link
          to="/inquiry"
          className="hidden md:inline-block border border-[color:var(--obsidian)]/25 hover:border-champagne hover:text-champagne text-[10px] uppercase tracking-[0.3em] px-5 py-2.5 ml-4 transition-all duration-300"
        >
          Private Viewing
        </Link>
      </div>
    </nav>
  );
}