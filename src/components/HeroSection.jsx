import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HERO_IMAGE = 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/4e724b62b_generated_image.png';
const OLIVE_IMAGE = 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/527b3bea0_generated_image.png';

// Stagger children animation
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, 80]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">

      {/* Subtle radial halo behind content */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: '80vw', height: '80vw', maxWidth: 900,
          background: 'radial-gradient(ellipse at center, hsla(38,42%,52%,0.07) 0%, transparent 65%)',
        }}
      />

      {/* Decorative top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border opacity-60" />

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 pt-28 pb-16 flex flex-col">

        {/* ── MAIN GRID ── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">

          {/* LEFT — Typography */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? 'visible' : 'hidden'}
            className="lg:col-span-6 xl:col-span-5 flex flex-col gap-8 relative z-10 order-2 lg:order-1 pb-12 lg:pb-0"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <span className="block w-8 h-px bg-accent" />
              <span className="font-body text-xs tracking-[0.35em] uppercase text-accent">
                Athens · Est. 2009
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-light leading-[0.92] tracking-tight text-foreground"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
            >
              The Art of
              <br />
              <span className="italic text-accent">Enduring</span>
              <br />
              Wealth
            </motion.h1>

            {/* Fluted divider */}
            <motion.div variants={itemVariants}>
              <div
                className="w-28 h-px"
                style={{
                  background: 'repeating-linear-gradient(90deg, hsl(var(--border)) 0px, hsl(var(--border)) 0.5px, transparent 0.5px, transparent 8px)',
                }}
              />
            </motion.div>

            {/* Body */}
            <motion.p
              variants={itemVariants}
              className="font-body text-[17px] leading-[1.75] text-muted-foreground max-w-[420px]"
            >
              Elia Investment Advisors cultivates capital with the patience
              of the olive farmer — rooted in Mediterranean wisdom,
              growing quietly across generations.
            </motion.p>

            {/* CTA row */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-primary text-primary-foreground font-body text-xs tracking-[0.25em] uppercase px-8 py-4 hover:bg-accent hover:text-accent-foreground transition-all duration-400 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                Private Consultation
              </a>
              <a
                href="#philosophy"
                className="inline-flex items-center gap-2 font-body text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 border-b border-transparent hover:border-accent pb-0.5"
              >
                Our Philosophy
              </a>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              variants={itemVariants}
              className="flex gap-8 pt-4 border-t border-border"
            >
              {[
                { value: '€420M', label: 'Under Advisory' },
                { value: '9.2%', label: 'Ann. Return' },
                { value: '15+', label: 'Years Legacy' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-light text-foreground">{s.value}</p>
                  <p className="font-body text-[10px] tracking-widest uppercase text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Image composition */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0 min-h-[55vw] lg:min-h-0">

            {/* Outer arch frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative w-full max-w-[540px] mx-auto"
            >
              {/* Decorative arch border */}
              <div
                className="absolute inset-0 border border-border/60 pointer-events-none"
                style={{ borderRadius: '50% 50% 0 0 / 20% 20% 0 0' }}
              />

              {/* Parallax image */}
              <motion.div
                style={{ y: imageY }}
                className="overflow-hidden shadow-[0_32px_100px_rgba(0,0,0,0.09)]"
                css={{ borderRadius: '50% 50% 0 0 / 20% 20% 0 0' }}
              >
                <img
                  src={HERO_IMAGE}
                  alt="Neoclassical Greek temple portico with goddess statue and olive branches"
                  className="w-full object-cover"
                  style={{
                    aspectRatio: '4/5',
                    borderRadius: '50% 50% 0 0 / 20% 20% 0 0',
                  }}
                />
              </motion.div>

              {/* Floating olive branch card — bottom left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-6 -left-6 md:-left-12 bg-background border border-border/80 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.07)] w-28 md:w-36"
              >
                <img
                  src={OLIVE_IMAGE}
                  alt="Olive branch detail"
                  className="w-full h-20 md:h-24 object-cover"
                />
                <p className="font-body text-[9px] tracking-widest uppercase text-muted-foreground mt-2 text-center">
                  Sacred Olive
                </p>
              </motion.div>

              {/* Floating label — top right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-8 -right-4 md:-right-8 bg-primary text-primary-foreground px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
              >
                <p className="font-display text-xl font-light leading-none">ELIA</p>
                <p className="font-body text-[8px] tracking-[0.2em] uppercase opacity-70 mt-0.5">
                  Investment Advisors
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── BOTTOM SCROLL CUE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="hidden lg:flex items-center gap-3 self-start pb-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-accent" />
          </motion.div>
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Scroll to explore
          </span>
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="h-px bg-border opacity-40 mx-6 md:mx-12 lg:mx-16" />
    </section>
  );
}