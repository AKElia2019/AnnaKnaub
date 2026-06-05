import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import SiteNavbar from '@/components/blog/SiteNavbar';
import SiteFooter from '@/components/blog/SiteFooter';

const GODDESSES = [
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/e19ce45cf_generated_image.png',
    name: 'Athena',
    title: 'Goddess of Wisdom',
    caption: 'Olive branch · Corinthian helmet · Justice',
    size: 'tall',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/5de554e8d_generated_image.png',
    name: 'Aphrodite',
    title: 'Goddess of Love',
    caption: 'Roses · Peonies · Golden light',
    size: 'tall',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/4c9a98afc_generated_image.png',
    name: 'Demeter',
    title: 'Goddess of Harvest',
    caption: 'Wheat · Poppies · Abundance',
    size: 'tall',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/ca635e6ab_generated_image.png',
    name: 'Artemis',
    title: 'Goddess of the Moon',
    caption: 'Crescent · Laurel · Moonlight',
    size: 'tall',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/0f21b0bbf_generated_image.png',
    name: 'Hera',
    title: 'Queen of the Gods',
    caption: 'Crown · Peacock · Royal throne',
    size: 'tall',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/9a27fa909_generated_image.png',
    name: 'Persephone',
    title: 'Goddess of Spring',
    caption: 'Pomegranate · Narcissus · Duality',
    size: 'tall',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/00f613dba_generated_image.png',
    name: 'Nike',
    title: 'Goddess of Victory',
    caption: 'Wings · Laurel wreath · Triumph',
    size: 'tall',
  },
];

const DESIGN_ELEMENTS = [
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/7e2a27351_generated_image.png',
    name: 'Divider · Meander & Laurel',
    caption: 'Horizontal rule element',
    size: 'wide',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/f754fbede_generated_image.png',
    name: 'Arch Frame',
    caption: 'Page framing element',
    size: 'square',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/57650f473_generated_image.png',
    name: 'Corner Ornament',
    caption: 'Papercut floral corner motif',
    size: 'square',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/369353b40_generated_image.png',
    name: 'Goddess of the Columns',
    caption: 'Marble & Papercut Florals',
    size: 'tall',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/c180799a9_generated_image.png',
    name: 'The Archway Garden',
    caption: 'Neoclassical portal element',
    size: 'wide',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/36b3c790e_generated_image.png',
    name: 'Relief Panel',
    caption: 'Marble carving motif',
    size: 'wide',
  },
];

// Flat list for lightbox navigation — goddesses first, then elements
const ALL_ITEMS = [
  ...GODDESSES.map(g => ({ ...g, section: 'goddesses' })),
  ...DESIGN_ELEMENTS.map(e => ({ ...e, section: 'elements' })),
];

const ASPECT = {
  tall: 'aspect-[3/4]',
  wide: 'aspect-[4/3]',
  square: 'aspect-square',
};

function GalleryCard({ item, globalIndex, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer relative break-inside-avoid"
      onClick={() => onOpen(globalIndex)}
    >
      <div className="relative overflow-hidden border border-border/60 group-hover:border-accent transition-colors duration-400 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        {/* Arch top on hover */}
        <svg className="absolute top-0 left-0 right-0 w-full z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          height="40" viewBox="0 0 400 40" preserveAspectRatio="none" fill="none">
          <path d="M0 40 L0 20 Q200 0 400 20 L400 40" fill="hsla(38,42%,52%,0.08)" />
          <path d="M0 20 Q200 0 400 20" stroke="hsl(var(--accent))" strokeWidth="0.8" fill="none" opacity="0.6"/>
        </svg>

        <div className={`${ASPECT[item.size]} w-full overflow-hidden`}>
          <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
        </div>

        {/* Caption overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/85 to-transparent pt-10 pb-4 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <p className="font-display text-base font-light text-primary-foreground leading-tight">{item.name}</p>
          <p className="font-body text-[10px] tracking-[0.2em] uppercase text-primary-foreground/60 mt-0.5">{item.caption}</p>
        </div>

        {/* Corner pillar accents */}
        {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((cls, i) => (
          <div key={i} className={`absolute w-4 h-4 border-accent opacity-0 group-hover:opacity-70 transition-opacity duration-300 ${cls}`} />
        ))}
      </div>

      <div className="mt-3 px-1">
        <p className="font-display text-sm font-light text-foreground italic">{item.name}</p>
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">{item.caption}</p>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const close = () => setLightbox(null);
  const prev = () => setLightbox(i => (i - 1 + ALL_ITEMS.length) % ALL_ITEMS.length);
  const next = () => setLightbox(i => (i + 1) % ALL_ITEMS.length);
  const current = lightbox !== null ? ALL_ITEMS[lightbox] : null;

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      {/* ── PAGE HEADER ── */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.05] hidden md:block">
          <svg width="340" height="220" viewBox="0 0 340 220" fill="none">
            <path d="M20 220 L20 90 Q170 10 320 90 L320 220" stroke="hsl(var(--accent))" strokeWidth="1.5" fill="none"/>
            <line x1="20" y1="90" x2="20" y2="100" stroke="hsl(var(--accent))" strokeWidth="4"/>
            <line x1="320" y1="90" x2="320" y2="100" stroke="hsl(var(--accent))" strokeWidth="4"/>
            <line x1="0" y1="220" x2="340" y2="220" stroke="hsl(var(--accent))" strokeWidth="1"/>
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-10 relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-body text-xs tracking-[0.35em] uppercase text-accent block mb-4">The Collection</span>
            <h1 className="font-display font-light text-foreground leading-tight mb-4" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)' }}>
              Marble, Myth &amp; <span className="italic text-accent">Bloom</span>
            </h1>
            <div className="w-20 h-px mx-auto mb-6" style={{ background: 'repeating-linear-gradient(90deg, hsl(var(--border)) 0px, hsl(var(--border)) 0.5px, transparent 0.5px, transparent 8px)' }} />
            <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              A curated collection of neoclassical goddesses — each depicted with her own symbols and botanicals — alongside design motifs for use throughout this site.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── GODDESSES ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-20">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-body text-xs tracking-[0.35em] uppercase text-accent whitespace-nowrap">The Goddesses</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {GODDESSES.map((item, i) => (
            <div key={i} className="flex flex-col">
              <GalleryCard item={item} globalIndex={i} onOpen={setLightbox} />
              {/* Goddess name label */}
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-accent mt-1 px-1">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DESIGN ELEMENTS ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-24 border-t border-border pt-16">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-body text-xs tracking-[0.35em] uppercase text-accent whitespace-nowrap">Design Elements</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {DESIGN_ELEMENTS.map((item, i) => (
            <GalleryCard key={i} item={item} globalIndex={GODDESSES.length + i} onOpen={setLightbox} />
          ))}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-4 md:p-10"
            onClick={close}
          >
            <button onClick={close} className="absolute top-6 right-6 text-primary-foreground/70 hover:text-primary-foreground z-10 min-w-[44px] min-h-[44px] flex items-center justify-center">
              <X className="w-6 h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 md:left-8 text-primary-foreground/70 hover:text-primary-foreground z-10 min-w-[44px] min-h-[44px] flex items-center justify-center">
              <ChevronLeft className="w-7 h-7" />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}
              className="relative max-w-2xl w-full"
              onClick={e => e.stopPropagation()}
            >
              {/* Arch frame */}
              <svg className="absolute -top-6 left-0 right-0 w-full pointer-events-none z-10 opacity-25"
                height="60" viewBox="0 0 600 60" preserveAspectRatio="none" fill="none">
                <path d="M0 30 Q300 0 600 30" stroke="hsl(var(--accent))" strokeWidth="1" fill="none"/>
                <line x1="0" y1="30" x2="0" y2="60" stroke="hsl(var(--accent))" strokeWidth="1"/>
                <line x1="600" y1="30" x2="600" y2="60" stroke="hsl(var(--accent))" strokeWidth="1"/>
              </svg>

              <div className="border border-accent/30 overflow-hidden shadow-[0_32px_120px_rgba(0,0,0,0.4)] relative">
                <img src={current.url} alt={current.name} className="w-full max-h-[70vh] object-contain bg-primary" />
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-accent/60" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-accent/60" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-accent/60" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-accent/60" />
              </div>

              <div className="mt-5 text-center">
                <p className="font-display text-2xl font-light text-primary-foreground italic">{current.name}</p>
                {current.title && <p className="font-body text-xs tracking-[0.25em] uppercase text-accent mt-1">{current.title}</p>}
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary-foreground/40 mt-1">{current.caption}</p>
                <p className="font-body text-xs text-primary-foreground/25 mt-3">{lightbox + 1} / {ALL_ITEMS.length}</p>
              </div>
            </motion.div>

            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-8 text-primary-foreground/70 hover:text-primary-foreground z-10 min-w-[44px] min-h-[44px] flex items-center justify-center">
              <ChevronRight className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}