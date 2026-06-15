import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
        animate={
          hovering
            ? { scale: 1.6, borderColor: "rgba(200,162,106,0.9)" }
            : { scale: 1, borderColor: "rgba(200,162,106,0.3)" }
        }
        className="w-12 h-12 rounded-full border border-champagne/30 bg-transparent mix-blend-difference"
        style={{ transition: "transform 0.15s ease, border-color 0.15s ease" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Scroll Progress Bar
   ──────────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-champagne origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export const Route = createFileRoute("/philosophy")({
  head: () => ({
    meta: [
      { title: "Philosophy — Aetheris" },
      {
        name: "description",
        content:
          "Aetheris brokers a small number of architectural residences each year. A statement of intent.",
      },
      { property: "og:title", content: "Philosophy — Aetheris" },
      {
        property: "og:description",
        content:
          "Aetheris brokers a small number of architectural residences each year. A statement of intent.",
      },
    ],
  }),
  component: PhilosophyPage,
});

/* ─────────────────────────────────────────────
   Page Principale
   ──────────────────────────────────────────── */
function PhilosophyPage() {
  return (
    <>
      <UltraCursor />
      <ScrollProgress />
      <div className="bg-pearl text-obsidian min-h-screen overflow-x-hidden">
        <HeaderSection />
        <BodySection />
        <QuoteSection />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   Header – Grande typographie fantôme + parallaxe
   ──────────────────────────────────────────── */
function HeaderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["-5%", "10%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.15, 0.15, 0]);

  return (
    <header
      ref={ref}
      className="relative pt-40 pb-24 px-6 md:px-12 max-w-4xl mx-auto overflow-hidden"
    >
      {/* Typographie fantôme en arrière-plan */}
      <motion.div
        style={{ y: bgTextY, opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none z-0"
        aria-hidden
      >
        <span className="font-serif italic text-[18vw] md:text-[14vw] leading-none text-stroke-pearl whitespace-nowrap opacity-20">
          Quiet Stewardship
        </span>
      </motion.div>

      <div className="relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] uppercase tracking-[0.5em] text-champagne mb-6"
        >
          Philosophy
        </motion.p>
        <motion.h1
          style={{ y: titleY }}
          className="font-serif text-5xl md:text-7xl italic leading-[0.95] mb-16"
        >
          The work of <br />
          quiet stewardship.
        </motion.h1>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────
   Corps du texte – Masque de révélation
   ──────────────────────────────────────────── */
function BodySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Révélation par balayage vertical
  const clipPath = useTransform(
    scrollYProgress,
    [0.1, 0.6],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <section
      ref={ref}
      className="relative px-6 md:px-12 max-w-4xl mx-auto pb-32 overflow-hidden"
    >
      <motion.div
        style={{ clipPath }}
        className="space-y-8 text-lg leading-relaxed text-obsidian/75 font-light max-w-2xl"
      >
        <p>
          Aetheris was founded on a single conviction: the most significant
          residences of the last century are not on the market. They pass between
          hands quietly, by introduction, often a single time per generation.
        </p>
        <p>
          Our role is to make that conversation possible — between the architect
          who designed the work, the family who has lived inside it, and the
          individual or institution who will hold it next.
        </p>
        <p>
          We accept no more than seven residences per annual edition. We do not
          advertise pricing. We do not publish full addresses. We do not represent
          properties we have not visited at least three times in different seasons.
        </p>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Citation – Parallaxe & ligne décorative
   ──────────────────────────────────────────── */
function QuoteSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const quoteY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);
  const lineScaleX = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative pb-40 px-6 md:px-12 max-w-4xl mx-auto overflow-hidden"
    >
      <motion.div
        style={{ y: quoteY, opacity: quoteOpacity }}
        className="font-serif italic text-2xl md:text-3xl text-obsidian pt-6 border-t border-obsidian/10"
      >
        <p>
          "A house is not a transaction. It is a body of decisions, made by people
          you may never meet, that you will be asked to either honour or undo."
        </p>
        <motion.div
          className="w-16 h-px bg-champagne mt-8"
          style={{ scaleX: lineScaleX, originX: 0 }}
        />
      </motion.div>
    </section>
  );
}