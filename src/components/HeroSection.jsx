import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Halo gradient */}
      <div className="absolute inset-0 elia-halo pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[80vh]">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-8">
              <p className="font-body text-sm tracking-[0.3em] uppercase text-accent">
                Investment Advisors
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] tracking-tight text-foreground">
                The Wealth
                <br />
                of Nations
                <br />
                <span className="italic text-accent">Reimagined</span>
              </h1>
              <div className="fluted-divider w-32" />
              <p className="font-body text-body text-muted-foreground max-w-md leading-relaxed">
                We cultivate legacies that, like the sacred olive tree, flourish
                for generations under the watchful eye of strategic wisdom.
              </p>
              <a
                href="#philosophy"
                className="inline-block font-body text-sm tracking-widest uppercase bg-primary text-primary-foreground px-8 py-4 hover:bg-accent hover:text-accent-foreground transition-colors duration-300 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                Discover Our Approach
              </a>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-[3/4] max-h-[70vh] mx-auto lg:mx-0 shadow-[0_20px_80px_rgba(0,0,0,0.08)] overflow-hidden arch-frame">
              <img
                src={heroImage}
                alt="Classical Greek goddess statue in weathered marble with olive leaf shadows"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}