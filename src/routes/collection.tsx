import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { villas } from "@/data/villas";

/* ─────────────────────────────────────────────
   Ultra‑Premium Custom Cursor (local)
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
   Scroll Progress Bar (discrete)
   ──────────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-champagne origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "The Collection — Aetheris" },
      {
        name: "description",
        content:
          "A complete edition of seven archival residences, each available by invitation only.",
      },
      { property: "og:title", content: "The Collection — Aetheris" },
      {
        property: "og:description",
        content:
          "A complete edition of seven archival residences, each available by invitation only.",
      },
    ],
  }),
  component: CollectionPage,
});

/* ─────────────────────────────────────────────
   Variants pour animations
   ──────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

function CollectionPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px 0px" });

  return (
    <>
      <UltraCursor />
      <ScrollProgress />
      <div className="bg-pearl text-obsidian min-h-screen overflow-x-hidden">
        {/* ─── Header animé ─── */}
        <motion.header
          ref={headerRef}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto"
        >
          <motion.p
            className="text-[10px] uppercase tracking-[0.5em] text-champagne mb-6"
          >
            Edition N° 01
          </motion.p>
          <motion.h1
            className="font-serif text-6xl md:text-8xl leading-[0.95] italic max-w-4xl"
          >
            The Collection
          </motion.h1>
          <motion.p
            className="mt-10 max-w-xl text-obsidian/60 leading-relaxed"
          >
            Four architectural residences from a private archive of seven. Three
            further entries are withheld from public view and disclosed only after
            vetted inquiry.
          </motion.p>
        </motion.header>

        {/* ─── Liste des villas ─── */}
        <section className="px-6 md:px-12 pb-32 max-w-7xl mx-auto">
          <div className="border-t border-obsidian/10">
            {villas.map((v, i) => (
              <VillaRow key={v.slug} villa={v} index={i} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   Villa Row avec animation individuelle
   ──────────────────────────────────────────── */
function VillaRow({ villa, index }: { villa: (typeof villas)[0]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Effet de parallaxe sur l'image
  const imgY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  // La ligne entière gagne en opacité et en translation verticale
  const rowY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);
  const rowOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      style={{ opacity: rowOpacity, y: rowY }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <Link
        ref={ref}
        to="/villa/$slug"
        params={{ slug: villa.slug }}
        className="group grid grid-cols-12 gap-6 items-center py-10 border-b border-obsidian/10 hover:bg-obsidian/[0.03] transition-colors relative overflow-hidden"
      >
        {/* Numéro animé */}
        <motion.div
          className="col-span-2 md:col-span-1 font-serif italic text-2xl md:text-3xl text-obsidian/40"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.1 + index * 0.05 }}
        >
          0{index + 1}
        </motion.div>

        {/* Nom et localisation */}
        <motion.div
          className="col-span-10 md:col-span-3"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 + index * 0.05 }}
        >
          <h2 className="font-serif text-2xl md:text-3xl group-hover:italic transition-all duration-300">
            {villa.name}
          </h2>
          <p className="text-[10px] uppercase tracking-[0.25em] text-obsidian/50 mt-2">
            {villa.location}
          </p>
        </motion.div>

        {/* Tagline (desktop) */}
        <motion.div
          className="hidden md:block md:col-span-4 text-sm text-obsidian/60 italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 + index * 0.05 }}
        >
          {villa.tagline}
        </motion.div>

        {/* Statut (desktop) */}
        <motion.div
          className="hidden md:block md:col-span-2 text-[10px] uppercase tracking-[0.25em] text-obsidian/50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 + index * 0.05 }}
        >
          {villa.status}
        </motion.div>

        {/* Image avec effets de survol et parallaxe */}
        <motion.div
          className="col-span-12 md:col-span-2 md:text-right overflow-hidden"
          style={{ y: imgY, scale: imgScale }}
        >
          <div className="overflow-hidden relative">
            <motion.img
              src={villa.cover}
              alt={villa.name}
              width={400}
              height={300}
              loading="lazy"
              className="w-full md:w-40 md:ml-auto aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Lueur subtile au survol */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-tr from-champagne/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Ligne décorative animée au survol */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-champagne/30 via-champagne/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
    </motion.div>
  );
}