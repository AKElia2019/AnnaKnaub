import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const pillars = [
  {
    number: '01',
    title: 'Endurance Over Exuberance',
    description:
      'We reject speculative fervor. Our portfolios are designed for low volatility and compounding growth — the patience of the olive farmer, not the gambler.',
  },
  {
    number: '02',
    title: 'Sovereign Diversification',
    description:
      'Assets are allocated across geographies and asset classes with the precision of ancient trade routes — each position serving a strategic purpose.',
  },
  {
    number: '03',
    title: 'Generational Stewardship',
    description:
      'We think in decades, not quarters. Every decision is weighed against the question: will this serve the third generation as faithfully as the first?',
  },
];

function PillarCard({ pillar, index }) {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: 'easeOut' }}
      className="group relative"
    >
      <div className="p-8 md:p-10 border border-border hover:border-accent/40 transition-colors duration-500 h-full">
        {/* Number */}
        <span className="font-display text-6xl font-light text-accent/30 group-hover:text-accent/60 transition-colors duration-500">
          {pillar.number}
        </span>

        {/* Fluted divider */}
        <div className="fluted-divider w-full my-6" />

        {/* Content */}
        <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-4 leading-tight">
          {pillar.title}
        </h3>
        <p className="font-body text-body text-muted-foreground leading-relaxed">
          {pillar.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function PhilosophySection({ oliveTreeImage }) {
  const [headerRef, headerInView] = useInView({ threshold: 0.3 });

  return (
    <section id="philosophy" className="py-32 md:py-40 relative">
      <div className="absolute inset-0 elia-halo pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-28"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
            The Sacred Grove
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground max-w-3xl leading-tight">
            An investment philosophy rooted in{' '}
            <span className="italic">ancient wisdom</span>
          </h2>
        </motion.div>

        {/* Image + Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5"
          >
            <div className="aspect-video lg:aspect-[4/5] relative overflow-hidden sticky top-24">
              <img
                src={oliveTreeImage}
                alt="Ancient gnarled olive tree trunk at golden hour sunset"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Pillar Cards */}
          <div className="lg:col-span-7 space-y-8">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.number} pillar={pillar} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}