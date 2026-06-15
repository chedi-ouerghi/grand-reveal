import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { getVilla, villas, type Villa } from "@/data/villas";

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

export const Route = createFileRoute("/villa/$slug")({
  loader: ({ params }) => {
    const villa = getVilla(params.slug);
    if (!villa) throw notFound();
    return { villa };
  },
  head: ({ loaderData }) => {
    const v = loaderData?.villa;
    if (!v) {
      return { meta: [{ title: "Residence — Aetheris" }] };
    }
    return {
      meta: [
        { title: `${v.name} — ${v.location} | Aetheris` },
        { name: "description", content: `${v.tagline} ${v.excerpt}` },
        { property: "og:title", content: `${v.name} — Aetheris` },
        { property: "og:description", content: v.excerpt },
        { property: "og:image", content: v.cover },
        { name: "twitter:image", content: v.cover },
      ],
    };
  },
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen flex items-center justify-center bg-pearl text-obsidian px-6">
      <div className="text-center max-w-md">
        <p className="text-[10px] uppercase tracking-[0.4em] text-champagne mb-4">Error</p>
        <h1 className="font-serif text-3xl mb-4">This residence could not be loaded.</h1>
        <p className="text-sm text-obsidian/60 mb-8">{error.message}</p>
        <button
          onClick={reset}
          className="text-[10px] uppercase tracking-[0.3em] border-b border-obsidian/20 pb-1 hover:border-champagne"
        >
          Try again
        </button>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-pearl text-obsidian px-6">
      <div className="text-center max-w-md">
        <p className="text-[10px] uppercase tracking-[0.4em] text-champagne mb-4">Unlisted</p>
        <h1 className="font-serif text-3xl mb-4">
          This residence is not part of the public archive.
        </h1>
        <Link
          to="/collection"
          className="inline-block text-[10px] uppercase tracking-[0.3em] border-b border-obsidian/20 pb-1 hover:border-champagne"
        >
          Return to the collection
        </Link>
      </div>
    </div>
  ),
  component: VillaPage,
});

function VillaPage() {
  const { villa } = Route.useLoaderData() as { villa: Villa };
  const index = villas.findIndex((v) => v.slug === villa.slug);
  const next = villas[(index + 1) % villas.length];
  const { scrollYProgress } = useScroll();

  return (
    <>
      <UltraCursor />
      <motion.div
        className="fixed top-0 left-0 right-0 z-[70] h-[2px] origin-left bg-champagne"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="bg-pearl text-obsidian overflow-hidden">
        <CoverSection villa={villa} index={index} />
        <IntroSection villa={villa} />
        <QuoteSection villa={villa} />
        <SpecsSection villa={villa} index={index} />
        <GallerySection villa={villa} />
        <NextSection next={next} />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   Cover – Parallaxe multicouche + barre de progression intégrée
   ──────────────────────────────────────────── */
function CoverSection({ villa, index }: { villa: Villa; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallaxe de l’image
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Overlay qui s’assombrit
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.35, 0.55, 0.75]);

  // Titre qui monte légèrement
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  // Grande typo d’ambiance en arrière‑plan
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);

  // Barre de progression globale (unique)
  const { scrollYProgress: globalProgress } = useScroll();

  return (
    <header ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Image avec parallaxe */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <img
          src={villa.cover}
          alt={villa.name}
          width={1920}
          height={1080}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* Overlay dynamique */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-obsidian/80 pointer-events-none"
      />

      {/* Grande typo architecturale en arrière‑plan (effet PremiumShowcase) */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        aria-hidden
      >
        <span className="font-serif italic text-[30vw] md:text-[25vw] leading-none text-white/[0.03] blur-[1px] whitespace-nowrap">
          {villa.name.split(" ").pop()}
        </span>
      </motion.div>

      {/* Texte du cover */}
      <motion.div
        style={{ y: titleY }}
        className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-16"
      >
        <p className="text-[10px] uppercase tracking-[0.4em] text-champagne mb-4">
          {villa.volume} — {villa.status}
        </p>
        <h1 className="font-serif text-6xl md:text-[9rem] leading-[0.9] italic max-w-5xl">
          {villa.name}
        </h1>
        <p className="mt-6 text-[11px] uppercase tracking-[0.3em] opacity-80">
          {villa.location} · {villa.year}
        </p>
      </motion.div>

    </header>
  );
}

/* ─────────────────────────────────────────────
   Intro – Masque de révélation + typo de fond
   ──────────────────────────────────────────── */
function IntroSection({ villa }: { villa: Villa }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["5%", "-10%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.25, 0.25, 0]);
  const clipPath = useTransform(
    scrollYProgress,
    [0.1, 0.5],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <section ref={ref} className="relative py-32 md:py-40 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden">
      <motion.div
        style={{ y: bgY, opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none z-0"
        aria-hidden
      >
        <span className="font-serif italic text-[18vw] md:text-[14vw] leading-none text-stroke-pearl whitespace-nowrap opacity-20">
          The Narrative
        </span>
      </motion.div>

      <motion.div style={{ clipPath }} className="relative z-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.4em] text-champagne mb-6">
              The Narrative
            </p>
            <h2 className="font-serif text-4xl md:text-5xl italic leading-tight">
              {villa.tagline}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-6 text-obsidian/75 leading-relaxed text-lg">
            {villa.story.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Quote – Parallaxe + ligne décorative dynamique
   ──────────────────────────────────────────── */
function QuoteSection({ villa }: { villa: Villa }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const quoteY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);
  const lineScaleX = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative py-24 bg-[color:var(--obsidian)] text-[color:var(--noir-deep)] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.p
          style={{ y: quoteY, opacity: quoteOpacity }}
          className="font-serif italic text-3xl md:text-5xl leading-tight"
        >
          "{villa.quote}"
        </motion.p>
        <motion.div
          className="w-16 h-px bg-champagne mx-auto mt-10"
          style={{ scaleX: lineScaleX, originX: 0 }}
        />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Specs – Apparition par balayage vertical
   ──────────────────────────────────────────── */
function SpecsSection({ villa, index }: { villa: Villa; index: number }) {
  const specs = [
    { label: "Location", value: villa.location },
    { label: "Interior", value: villa.area },
    { label: "Bedrooms", value: String(villa.bedrooms).padStart(2, "0") },
    { label: "Status", value: villa.status },
    { label: "Year", value: villa.year },
    {
      label: "Reference",
      value: `AET-${villa.slug.slice(0, 3).toUpperCase()}-0${index + 1}`,
    },
    { label: "Price", value: villa.price },
    { label: "Viewings", value: "Private" },
  ];

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const clipProgress = useTransform(scrollYProgress, [0, 0.5], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]);

  return (
    <section ref={ref} className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div
        style={{ clipPath: clipProgress }}
        className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-b border-obsidian/10 py-12"
      >
        {specs.map((spec) => (
          <div key={spec.label}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-obsidian/40 mb-2">
              {spec.label}
            </p>
            <p className="font-serif text-xl">{spec.value}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Gallery – Image par image avec parallaxe & rail latéral
   ──────────────────────────────────────────── */
function GallerySection({ villa }: { villa: Villa }) {
  const galleryImages = villa.gallery.slice(1);

  return (
    <section className="pb-32 px-6 md:px-12 max-w-6xl mx-auto space-y-12">
      {galleryImages.map((src, i) => (
        <GalleryImage
          key={i}
          src={src}
          alt={`${villa.name} — plate ${i + 2}`}
          index={i}
          total={galleryImages.length}
        />
      ))}
    </section>
  );
}

function GalleryImage({
  src,
  alt,
  index,
  total,
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.03]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`flex ${isEven ? "justify-start" : "justify-end"} relative`}>
      <div
        className={`absolute top-0 h-full hidden md:flex flex-col items-center justify-between py-6 z-20 text-obsidian/60 ${isEven ? "-right-16" : "-left-16"
          }`}
      >
        <span className="font-serif italic text-xl">0{index + 2}</span>
        <motion.div
          style={{ scaleY: railScale, originY: 0 }}
          className="w-px h-1/2 bg-champagne/50"
        />
        <span className="text-[9px] uppercase tracking-[0.4em] [writing-mode:vertical-rl] rotate-180">
          plate
        </span>
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className={`overflow-hidden ${isEven ? "w-full md:w-3/4 aspect-[16/10]" : "w-full md:w-1/2 aspect-[4/5]"
          }`}
      >
        <img src={src} alt={alt} width={1200} height={900} loading="lazy" className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Next – Transition immersive
   ──────────────────────────────────────────── */
function NextSection({ next }: { next: Villa }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className="bg-[color:var(--noir-soft)] text-[color:var(--obsidian)] py-24 px-6 md:px-12 overflow-hidden"
    >
      <Link
        to="/villa/$slug"
        params={{ slug: next.slug }}
        className="group max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 hover:text-champagne transition-colors"
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-3">
            Next residence
          </p>
          <h3 className="font-serif text-4xl md:text-6xl italic">{next.name}</h3>
          <p className="text-[10px] uppercase tracking-[0.25em] opacity-60 mt-3">
            {next.location}
          </p>
        </div>
        <motion.span
          className="text-5xl font-serif"
          whileHover={{ x: 8 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          →
        </motion.span>
      </Link>
    </motion.section>
  );
}