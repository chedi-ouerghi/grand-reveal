import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Link } from "@tanstack/react-router";
import type { Villa } from "@/data/villas";

/**
 * PremiumShowcase — editorial scroll section where each villa unfolds:
 *   - Oversized typography (price, name) sits as a background layer
 *   - The principal image is rendered ON TOP, with parallax translation
 *   - As the user scrolls, the text passes BEHIND the image (z-index 0 vs 10)
 *     and the image translates upward, producing a 3D depth parallax.
 *
 * Animations are GPU-only (transform / opacity) for 60fps fluidity.
 */
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

  // The image slides upward as we scroll, exposing the text layer beneath.
  const imgY = useTransform(scrollYProgress, [0, 1], ["12%", "-18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);

  // Background editorial text drifts in the opposite direction for true parallax.
  const bgY = useTransform(scrollYProgress, [0, 1], ["-22%", "22%"]);
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0]
  );

  const meta = useTransform(scrollYProgress, [0.15, 0.45], [40, 0]);
  const metaOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

  const isOdd = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="relative min-h-[140vh] w-full overflow-hidden border-t border-[color:var(--obsidian)]/8"
    >
      {/* LAYER 0 — Oversized editorial type (BEHIND the image) */}
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

      {/* Sticky frame keeps the image centered while the section scrolls past */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <div
          className={[
            "relative w-[78vw] md:w-[46vw] aspect-[3/4] max-w-[640px]",
            isOdd ? "md:ml-[18vw]" : "md:mr-[18vw]",
          ].join(" ")}
        >
          {/* LAYER 10 — The image, lifted in front of the type */}
          <motion.img
            src={villa.cover}
            alt={`${villa.name} — ${villa.location}`}
            width={1280}
            height={1600}
            loading={index === 0 ? "eager" : "lazy"}
            style={{ y: imgY, scale: imgScale }}
            className="relative z-10 w-full h-full object-cover shadow-[0_30px_120px_-30px_rgba(0,0,0,0.7)] will-change-transform"
          />

          {/* LAYER 20 — Editorial caption card, glassmorphism on top */}
          <motion.div
            style={{ y: meta, opacity: metaOpacity }}
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

          {/* Side-rail counter */}
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