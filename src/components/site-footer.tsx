import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-[color:var(--noir-deep)] text-[color:var(--obsidian)] py-28 border-t border-[color:var(--obsidian)]/8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <div className="w-24 h-px bg-champagne mb-12" />
        <h2 className="font-serif text-4xl md:text-6xl mb-10 italic leading-[1.05]">
          Private Viewing <br />
          by Invitation
        </h2>
        <p className="text-xs tracking-[0.25em] uppercase font-light mb-12 max-w-md mx-auto text-[color:var(--obsidian)]/55">
          The residences are not advertised. Access is granted following a confidential introduction.
        </p>
        <Link
          to="/inquiry"
          className="px-12 py-5 bg-champagne text-[color:var(--noir-deep)] text-[10px] uppercase tracking-[0.4em] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[color:var(--obsidian)] hover:text-[color:var(--noir-deep)] hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.45)]"
        >
          Request a Dossier
        </Link>
        <div className="mt-28 w-full flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-[color:var(--obsidian)]/35">
          <span>© MMXXVI Aetheris Albania</span>
          <span>Albanian Riviera · Adriatic Coast</span>
          <span>Private Registry / Brokers by Invitation</span>
        </div>
      </div>
    </footer>
  );
}