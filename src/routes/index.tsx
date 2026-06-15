import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  MotionValue
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { Villa, villas } from "@/data/villas";
import villaHero from "@/assets/villa-palm-crescent.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aetheris Albania — Private Residences of Exception" },
      {
        name: "description",
        content:
          "An invitation-only brokerage of architectural villas in Albania. Dhërmi, Palasë, Vlorë and Ksamil — fewer than a dozen residences, ever.",
      },
      {
        property: "og:title",
        content: "Aetheris Albania — Private Residences of Exception",
      },
      {
        property: "og:description",
        content:
          "An invitation-only brokerage of architectural villas in Albania. Dhërmi, Palasë, Vlorë and Ksamil — fewer than a dozen residences, ever.",
      },
      { property: "og:image", content: villaHero },
      { name: "twitter:image", content: villaHero },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: villaHero,
        fetchPriority: "high",
      },
    ],
  }),
  component: Index,
});

/* ─────────────────────────────────────────────
   Ultra‑Premium Custom Cursor
   ──────────────────────────────────────────── */
function UltraCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 24}px, ${e.clientY - 24}px)`;
    };
    const onMouseEnterLink = () => setHovering(true);
    const onMouseLeaveLink = () => setHovering(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.querySelectorAll("a, button, [data-cursor-hover]").forEach((target) => {
      target.addEventListener("mouseenter", onMouseEnterLink);
      target.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((target) => {
        target.removeEventListener("mouseenter", onMouseEnterLink);
        target.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:block will-change-transform"
      style={{ transition: "transform 0.04s linear" }}
    >
      <motion.div
        animate={hovering ? { scale: 1.6, borderColor: "rgba(200,162,106,0.9)" } : { scale: 1, borderColor: "rgba(200,162,106,0.3)" }}
        className="w-12 h-12 rounded-full border border-champagne/30 bg-transparent mix-blend-difference"
        style={{ transition: "transform 0.15s ease, border-color 0.15s ease" }}
      />
    </div>
  );
}

function Index() {
  useLenis();

  return (
    <>
      <UltraCursor />
      <motion.div
        className="fixed top-0 left-0 right-0 z-[70] h-[2px] origin-left bg-champagne"
        style={{ scaleX: useScroll().scrollYProgress }}
      />
      <div className="overflow-hidden">
        <Hero />
        <Manifesto />
        <PremiumShowcase villas={villas} />
        <ClosingBand />
      </div>
      <SiteFooter />
    </>
  );
}

/* ─────────────────────────────────────────────
   HERO ULTRA‑PREMIUM (avec barre de progression intégrée)
   ──────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: globalProgress } = useScroll();
  const scaleX = useSpring(globalProgress, { stiffness: 100, damping: 30 });

  const titleY = useTransform(sectionProgress, [0, 1], ["0%", "-30%"]);
  const imgY = useTransform(sectionProgress, [0, 1], ["0%", "20%"]);
  const imgScale = useTransform(sectionProgress, [0, 1], [1, 1.15]);
  const bgY = useTransform(sectionProgress, [0, 1], ["0%", "10%"]);

  return (
    <header
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-black text-white flex flex-col justify-end px-6 md:px-12 pt-32 pb-12"
    >
      {/* Fond multicouche (inchangé) */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0d0d0d]" />
        <motion.div
          style={{ y: bgY }}
          className="absolute left-1/2 top-[35%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#c8a26a]/10 blur-[180px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMzYgMjRoLTJ2Mmgyek0yOCAyNGgtMnYyaDJ6TTI4IDI4aC0ydjJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] bg-[size:60px_60px]" />
      </div>

      {/* Étiquette éditoriale latérale */}
      <div className="hidden xl:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20">
        <div className="h-28 w-px bg-white/15" />
        <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 [writing-mode:vertical-rl] rotate-180">
          Private Collection
        </span>
        <div className="h-28 w-px bg-white/15" />
      </div>

      {/* Typographie couche 1 & 2 */}
      <motion.h1
        style={{ y: titleY }}
        className="pointer-events-none absolute inset-x-0 top-[25vh] z-0 text-center font-serif italic leading-none text-[30vw] md:text-[22vw] tracking-[0.08em] text-white/[0.04] blur-[2px] select-none whitespace-nowrap"
      >
        Albania
      </motion.h1>
      <motion.h1
        style={{ y: titleY }}
        className="pointer-events-none absolute inset-x-0 top-[25vh] z-0 text-center font-serif italic leading-none text-[30vw] md:text-[22vw] tracking-[0.08em] text-transparent select-none whitespace-nowrap [-webkit-text-stroke:1px_rgba(255,255,255,0.15)]"
      >
        Albania
      </motion.h1>

      {/* Image héro */}
      <div className="relative mx-auto z-10 w-[78vw] md:w-[40vw] max-w-[560px]">
        <div className="absolute -inset-8 border border-white/5 backdrop-blur-sm" />
        <div className="absolute -inset-4 border border-white/10 shadow-[inset_0_0_60px_rgba(200,162,106,0.03)]" />
        <div className="absolute -inset-[2px] border border-champagne/20 blur-[2px]" />

        <motion.img
          src={villaHero}
          alt="Luxury Residence Albania"
          width={1280}
          height={1600}
          fetchPriority="high"
          style={{ y: imgY, scale: imgScale }}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-[3/4] object-cover shadow-[0_40px_140px_-30px_rgba(0,0,0,0.85)] will-change-transform"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Contenu du bas */}
      <div className="relative z-20 mt-20 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-4">
            <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-[#c8a26a]">
              Edition N° 04 — MMXXVI
            </p>
            <h2 className="font-serif italic text-2xl md:text-3xl leading-snug">
              Curating extraordinary residences
              <br />
              for a global clientele seeking
              <br />
              privacy, rarity and distinction.
            </h2>
            <div className="mt-10 flex items-center gap-5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border border-white/15 px-8 py-4 text-[11px] uppercase tracking-[0.3em] transition-all duration-500 hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(200,162,106,0.2)]"
              >
                View Collection
              </motion.button>
              <span className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                By Appointment Only
              </span>
            </div>
          </div>

          <div className="hidden md:flex md:col-span-4 justify-center">
            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/40">
                Scroll
              </span>
              <motion.div
                animate={{ scaleY: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="h-16 w-px bg-white/20 origin-top"
              />
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 md:text-right">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/55">
              04 Residences · 07 Plots · Q2 2026
            </div>
            <div className="mt-4 text-sm text-white/50">Albania · Adriatic Coast</div>
          </div>
        </div>
      </div>

    </header>
  );
}

/* ─────────────────────────────────────────────
   MANIFESTO (inchangé)
   ──────────────────────────────────────────── */
function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="relative py-40 md:py-56 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[200%] -translate-y-1/2 pointer-events-none opacity-90">
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
          className="flex"
        >
          <span className="text-[18vw] whitespace-nowrap font-serif italic text-stroke-champagne pr-12">
            Architecture as a private language —
          </span>
          <span className="text-[18vw] whitespace-nowrap font-serif italic text-stroke-champagne pr-12">
            Architecture as a private language —
          </span>
          <span className="text-[18vw] whitespace-nowrap font-serif italic text-stroke-champagne pr-12">
            Architecture as a private language —
          </span>
          <span className="text-[18vw] whitespace-nowrap font-serif italic text-stroke-champagne pr-12">
            Architecture as a private language —
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl mx-auto px-6 md:px-12 text-center z-10"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[color:var(--obsidian)]/[0.08] bg-[color:var(--obsidian)]/[0.025] px-6 py-10 md:px-12 md:py-16 backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.5em] text-champagne mb-8">
            Manifesto
          </p>
          <h2 className="font-serif text-4xl md:text-6xl italic leading-[1.05] tracking-[-0.02em]">
            We do not list properties. <br />
            We introduce buyers to buildings <br />
            that were never meant to be advertised.
          </h2>
          <div className="w-16 h-px bg-champagne mx-auto mt-12" />
          <Link
            to="/philosophy"
            className="inline-block mt-12 text-[10px] uppercase tracking-[0.4em] border-b border-champagne pb-2 hover:text-champagne transition-colors duration-300"
          >
            Read the philosophy
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CLOSING BAND (inchangé)
   ──────────────────────────────────────────── */
function AnimatedCounter({
  value,
  label,
  copy,
}: {
  value: string;
  label: string;
  copy: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const numericPart = parseInt(value) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const display = useTransform(rounded, (v) => `${v}${suffix}`);

  useEffect(() => {
    if (inView) {
      const controls = motionVal;
      controls.set(0);
      const timeout = setTimeout(() => {
        controls.set(numericPart);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [inView, motionVal, numericPart]);

  const springVal = useSpring(motionVal, { stiffness: 60, damping: 20 });

  return (
    <div className="space-y-3">
      <p ref={ref} className="font-serif text-6xl md:text-7xl italic text-champagne tabular-nums">
        <motion.span>{display}</motion.span>
      </p>
      <p className="text-[10px] uppercase tracking-[0.35em] opacity-60">{label}</p>
      <p className="text-sm leading-relaxed text-[color:var(--obsidian)]/70">{copy}</p>
    </div>
  );
}

function ClosingBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  // Image Unsplash de fond (libre de droits, ambiance luxueuse)
  const bgImageUrl =
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80";

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-32 px-6 md:px-12 border-y border-black/10 overflow-hidden"
    >
      {/* Image de fond animée au scroll */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src={bgImageUrl}
            alt="Fond luxueux"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Overlays pour lisibilité */}
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px]" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,_rgba(200,162,106,0.15)_0%,_transparent_70%)] pointer-events-none" />

      {/* Contenu (même données) */}
      <div className="relative z-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left text-white">
        <AnimatedCounter
          value="04"
          label="Residences in Edition"
          copy="Hand-selected from over 200 candidates each quarter."
        />
        <AnimatedCounter
          value="00"
          label="Public Listings"
          copy="Every dossier is shared after an introduction, never before."
        />
        <AnimatedCounter
          value="72h"
          label="Vetted Access"
          copy="Inquiries reviewed within seventy-two hours by a partner."
        />
      </div>
    </motion.section>
  );
}


/* ─────────────────────────────────────────────
   PREMIUM SHOWCASE (inchangé)
   ──────────────────────────────────────────── */
export function PremiumShowcase({ villas }: { villas: Villa[] }) {
  return (
    <section className="relative bg-[color:var(--pearl)]">
      {villas.map((villa, i) => (
        <ShowcaseSlide key={villa.slug} villa={villa} index={i} />
      ))}
    </section>
  );
}

function ShowcaseSlide({ villa, index }: { villa: Villa; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["12%", "-18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);

  const bgY = useTransform(scrollYProgress, [0, 1], ["-22%", "22%"]);
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0]
  );

  const metaY = useTransform(scrollYProgress, [0.15, 0.45], [40, 0]);
  const metaOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

  const isOdd = index % 2 === 1;
  const clipProgress = useTransform(scrollYProgress, [0, 0.4], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]);

  return (
    <div
      ref={ref}
      className="relative min-h-[140vh] w-full overflow-hidden border-t border-[color:var(--obsidian)]/8"
    >
      <motion.div
        style={{ y: bgY, opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center select-none"
        aria-hidden
      >
        <span className="font-serif italic text-[22vw] leading-[0.82] text-stroke-pearl whitespace-nowrap tracking-[0.03em]">
          {villa.name.split(" ").slice(-1)[0]}
        </span>
        <span className="font-serif text-[8vw] leading-none mt-2 text-champagne/35 whitespace-nowrap tracking-[0.25em] uppercase">
          {villa.price}
        </span>
      </motion.div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <div
          className={[
            "relative w-[78vw] md:w-[46vw] aspect-[3/4] max-w-[640px]",
            isOdd ? "md:ml-[18vw]" : "md:mr-[18vw]",
          ].join(" ")}
        >
          <motion.div
            style={{ clipPath: clipProgress }}
            className="absolute inset-0 z-10"
          >
            <motion.img
              src={villa.cover}
              alt={`${villa.name} — ${villa.location}`}
              width={1280}
              height={1600}
              loading={index === 0 ? "eager" : "lazy"}
              style={{ y: imgY, scale: imgScale }}
              className="absolute inset-0 w-full h-full object-cover shadow-[0_30px_120px_-30px_rgba(0,0,0,0.7)] will-change-transform"
            />
          </motion.div>

          <motion.div
            style={{ y: metaY, opacity: metaOpacity }}
            className={[
              "absolute z-20 max-w-[18rem] md:max-w-sm p-7 md:p-8 glass-panel border border-[color:var(--obsidian)]/10 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.35)]",
              isOdd
                ? "-left-4 md:-left-24 -bottom-12"
                : "-right-4 md:-right-24 -bottom-12",
            ].join(" ")}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-champagne mb-3">
              {villa.volume} · {villa.status}
            </p>
            <h3 className="font-serif italic text-2xl md:text-3xl leading-tight mb-2 text-[color:var(--obsidian)]/95">
              {villa.name}
            </h3>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--obsidian)]/70">
              {villa.location}
            </p>
            <div className="w-10 h-px bg-champagne my-5" />
            <p className="text-sm italic font-light leading-relaxed text-[color:var(--obsidian)]/80">
              {villa.excerpt}
            </p>
            <Link
              to="/villa/$slug"
              params={{ slug: villa.slug }}
              className="inline-block mt-6 text-[10px] uppercase tracking-[0.35em] border-b border-champagne pb-1 text-[color:var(--obsidian)]/90 hover:text-champagne transition-colors duration-300"
            >
              Open dossier →
            </Link>
          </motion.div>

          <SideRail progress={scrollYProgress} index={index} villa={villa} isOdd={isOdd} />
        </div>
      </div>
    </div>
  );
}

function SideRail({
  progress,
  index,
  villa,
  isOdd,
}: {
  progress: MotionValue<number>;
  index: number;
  villa: Villa;
  isOdd: boolean;
}) {
  const lineScale = useTransform(progress, [0, 1], [0.1, 1]);

  return (
    <div
      className={[
        "absolute top-0 h-full hidden md:flex flex-col items-center justify-between py-6 z-20 text-[color:var(--obsidian)]/70",
        isOdd ? "-right-16" : "-left-16",
      ].join(" ")}
    >
      <span className="font-serif italic text-2xl">0{index + 1}</span>
      <motion.span
        style={{ scaleY: lineScale }}
        className="block w-px h-1/2 origin-top bg-champagne/70"
      />
      <span className="text-[9px] uppercase tracking-[0.4em] [writing-mode:vertical-rl] rotate-180 mt-4">
        {villa.area} · {villa.bedrooms} suites
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FOOTER (inchangé)
   ──────────────────────────────────────────── */
export function SiteFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <footer
      ref={ref}
      className="relative bg-[color:var(--noir-deep)] text-[color:var(--obsidian)] py-28 border-t border-[color:var(--obsidian)]/8 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(200,162,106,0.06)_0%,_transparent_70%)] pointer-events-none"
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="w-24 h-px bg-champagne mb-12 origin-top"
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl mb-10 italic leading-[1.05]"
        >
          Private Viewing <br />
          by Invitation
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-xs tracking-[0.25em] uppercase font-light mb-12 max-w-md mx-auto text-[color:var(--obsidian)]/55"
        >
          The residences are not advertised. Access is granted following a
          confidential introduction.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            to="/inquiry"
            className="px-12 py-5 bg-champagne text-[color:var(--noir-deep)] text-[10px] uppercase tracking-[0.4em] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[color:var(--obsidian)] hover:text-[color:var(--noir-deep)] hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.45)]"
          >
            Request a Dossier
          </Link>
        </motion.div>
        <div className="mt-28 w-full flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-[color:var(--obsidian)]/35">
          <span>© MMXXVI Aetheris Albania</span>
          <span>Albanian Riviera · Adriatic Coast</span>
          <span>Private Registry / Brokers by Invitation</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   NAV (inchangé)
   ──────────────────────────────────────────── */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "glass-panel py-3 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.1)]"
          : "bg-transparent py-6",
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
          className="hidden md:inline-block border border-[color:var(--obsidian)]/25 hover:border-champagne hover:text-champagne text-[10px] uppercase tracking-[0.3em] px-5 py-2.5 ml-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(200,162,106,0.15)]"
        >
          Private Viewing
        </Link>
      </div>
    </motion.nav>
  );
}