import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import SiteNavbar from '@/components/blog/SiteNavbar';
import SiteFooter from '@/components/blog/SiteFooter';

// ── GODDESSES ─────────────────────────────────────────────────────────────────
const GODDESSES = [
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/d028269ef_generated_image.png',
    name: 'Mnemosyne',
    title: 'Goddess of Memory',
    caption: 'Remembrance · Time · Legacy',
    domain: 'Mind & Soul',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/db34fc59e_generated_image.png',
    name: 'Hypatia',
    title: 'Goddess of Mathematics',
    caption: 'Sacred Geometry · The Golden Ratio · Infinity',
    domain: 'Numbers & Cosmos',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/9dcfc3aa2_generated_image.png',
    name: 'Calliope',
    title: 'Muse of Epic Poetry',
    caption: 'Words · Scrolls · Story',
    domain: 'Art & Story',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/65ccea847_generated_image.png',
    name: 'Nyx',
    title: 'Goddess of Night',
    caption: 'Stars · Moon · Mystery',
    domain: 'Cosmos & Shadow',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/64eea78e0_generated_image.png',
    name: 'Eirene',
    title: 'Goddess of Peace',
    caption: 'Olive · Dove · Stillness',
    domain: 'Human Harmony',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/6bd7511ec_generated_image.png',
    name: 'Psyche',
    title: 'Goddess of the Soul',
    caption: 'Butterfly · Transformation · Inner Life',
    domain: 'Mind & Soul',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/ab9e5b8b3_generated_image.png',
    name: 'Tyche',
    title: 'Goddess of Fate',
    caption: 'Wheel · Stars · The Unknown',
    domain: 'Fate & Time',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/14c14feda_generated_image.png',
    name: 'Iris',
    title: 'Goddess of the Rainbow',
    caption: 'Color · Bridge · Messenger',
    domain: 'Nature & Light',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/f13d9892b_generated_image.png',
    name: 'Crowned',
    title: 'The Ornate One',
    caption: 'Crown · Bloom · Lace',
    domain: 'Beauty & Ritual',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/c53cc6c40_generated_image.png',
    name: 'Sophia',
    title: 'Goddess of Wisdom',
    caption: 'Geometry · Constellations · Knowledge',
    domain: 'Numbers & Cosmos',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/4cd04d3b8_generated_image.png',
    name: 'Eris',
    title: 'Goddess of Discord',
    caption: 'Change · Wildness · Transformation',
    domain: 'Fate & Time',
  },
  // From original generation — keep best ones
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/e19ce45cf_generated_image.png',
    name: 'Athena',
    title: 'Goddess of Wisdom',
    caption: 'Olive branch · Helmet · Justice',
    domain: 'Mind & Soul',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/5de554e8d_generated_image.png',
    name: 'Aphrodite',
    title: 'Goddess of Love',
    caption: 'Roses · Peonies · Beauty',
    domain: 'Human Harmony',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/ca635e6ab_generated_image.png',
    name: 'Artemis',
    title: 'Goddess of the Moon',
    caption: 'Crescent · Laurel · Moonlight',
    domain: 'Nature & Light',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/0f21b0bbf_generated_image.png',
    name: 'Hera',
    title: 'Queen of the Gods',
    caption: 'Crown · Peacock · Majesty',
    domain: 'Beauty & Ritual',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/9a27fa909_generated_image.png',
    name: 'Persephone',
    title: 'Goddess of Spring',
    caption: 'Pomegranate · Narcissus · Duality',
    domain: 'Fate & Time',
  },
];

// ── DESIGN ELEMENTS ───────────────────────────────────────────────────────────
const DESIGN_ELEMENTS = [
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/34c38decc_generated_image.png',
    name: 'Magnolia Pillar Panel',
    caption: 'Botanical column motif',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/7e2a27351_generated_image.png',
    name: 'Meander & Laurel Divider',
    caption: 'Horizontal rule element',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/f754fbede_generated_image.png',
    name: 'Classical Arch Frame',
    caption: 'Page framing element',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/57650f473_generated_image.png',
    name: 'Corner Ornament',
    caption: 'Papercut floral corner motif',
  },
];

// All items for lightbox navigation
const ALL_ITEMS = [
  ...GODDESSES.map(g => ({ ...g })),
  ...DESIGN_ELEMENTS.map(e => ({ ...e, title: '', domain: 'Design Element' })),
];

// Domain color map
const DOMAIN_COLORS = {
  'Mind & Soul': 'text-accent',
  'Numbers & Cosmos': 'text-foreground/70',
  'Art & Story': 'text-accent',
  'Cosmos & Shadow': 'text-foreground/70',
  'Human Harmony': 'text-accent',
  'Fate & Time': 'text-foreground/70',
  'Nature & Light': 'text-accent',
  'Beauty & Ritual': 'text-foreground/70',
};

// Group goddesses by domain
const DOMAINS = ['Mind & Soul', 'Numbers & Cosmos', 'Art & Story', 'Human Harmony', 'Fate & Time', 'Nature & Light', 'Beauty & Ritual', 'Cosmos & Shadow'];

function GalleryCard({ item, globalIndex, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer relative"
      onClick={() => onOpen(globalIndex)}
    >
      <div className="relative overflow-hidden border border-border/60 group-hover:border-accent transition-colors duration-400 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        {/* Arch SVG on hover */}
        <svg
          className="absolute top-0 left-0 right-0 w-full z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          height="40" viewBox="0 0 400 40" preserveAspectRatio="none" fill="none"
        >
          <path d="M0 40 L0 20 Q200 0 400 20 L400 40" fill="hsla(38,42%,52%,0.08)" />
          <path d="M0 20 Q200 0 400 20" stroke="hsl(var(--accent))" strokeWidth="0.8" fill="none" opacity="0.6" />
        </svg>

        <div className="aspect-[3/4] w-full overflow-hidden">
          <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
        </div>

        {/* Hover caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/85 to-transparent pt-10 pb-4 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <p className="font-display text-base font-light text-primary-foreground leading-tight">{item.name}</p>
          {item.title && <p className="font-body text-[9px] tracking-[0.25em] uppercase text-accent mt-0.5">{item.title}</p>}
          <p className="font-body text-[9px] tracking-[0.2em] uppercase text-primary-foreground/50 mt-0.5">{item.caption}</p>
        </div>

        {/* Corner accents */}
        {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((cls, i) => (
          <div key={i} className={`absolute w-3 h-3 border-accent opacity-0 group-hover:opacity-60 transition-opacity duration-300 ${cls}`} />
        ))}
      </div>

      <div className="mt-2.5 px-0.5">
        <p className="font-display text-sm font-light text-foreground italic leading-snug">{item.name}</p>
        {item.domain && <p className={`font-body text-[9px] tracking-[0.25em] uppercase mt-0.5 ${DOMAIN_COLORS[item.domain] || 'text-muted-foreground'}`}>{item.domain}</p>}
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', ...DOMAINS];
  const filtered = activeFilter === 'All' ? GODDESSES : GODDESSES.filter(g => g.domain === activeFilter);

  const close = () => setLightbox(null);
  const prev = () => setLightbox(i => (i - 1 + ALL_ITEMS.length) % ALL_ITEMS.length);
  const next = () => setLightbox(i => (i + 1) % ALL_ITEMS.length);
  const current = lightbox !== null ? ALL_ITEMS[lightbox] : null;

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      {/* ── HEADER ── */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.04] hidden md:block">
          <svg width="360" height="230" viewBox="0 0 360 230" fill="none">
            <path d="M20 230 L20 95 Q180 12 340 95 L340 230" stroke="hsl(var(--accent))" strokeWidth="1.5" fill="none" />
            <line x1="20" y1="95" x2="20" y2="110" stroke="hsl(var(--accent))" strokeWidth="5" />
            <line x1="340" y1="95" x2="340" y2="110" stroke="hsl(var(--accent))" strokeWidth="5" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-10 relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-accent block mb-4">The Collection</span>
            <h1 className="font-display font-light text-foreground leading-tight mb-4" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)' }}>
              Goddess, Myth &amp; <span className="italic text-accent">Cosmos</span>
            </h1>
            <div className="fluted-divider w-20 mx-auto mb-6" />
            <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              A growing collection of goddesses — each embodying a dimension of human existence: memory, love, fate, mathematics, story, peace, and the night sky.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-body text-[10px] tracking-[0.25em] uppercase px-4 py-1.5 border transition-colors duration-300 ${
                activeFilter === f
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:border-accent hover:text-foreground bg-transparent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* ── GODDESS GRID ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-20">
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8"
        >
          <AnimatePresence>
            {filtered.map((item, i) => {
              const globalIndex = ALL_ITEMS.findIndex(a => a.name === item.name);
              return (
                <motion.div
                  key={item.name}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                >
                  <GalleryCard item={item} globalIndex={globalIndex} onOpen={setLightbox} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── DESIGN ELEMENTS ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-24 border-t border-border pt-16">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-accent whitespace-nowrap">Design Elements</span>
          <div className="flex-1 h-px bg-border" />
          <span className="font-body text-[9px] tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap">For use across this site</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
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
            className="fixed inset-0 z-50 bg-primary/96 flex items-center justify-center p-4 md:p-12"
            onClick={close}
          >
            <button onClick={close} className="absolute top-6 right-6 text-primary-foreground/60 hover:text-primary-foreground z-10 w-11 h-11 flex items-center justify-center">
              <X className="w-6 h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 md:left-8 text-primary-foreground/60 hover:text-primary-foreground z-10 w-11 h-11 flex items-center justify-center">
              <ChevronLeft className="w-7 h-7" />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}
              className="relative max-w-xl w-full"
              onClick={e => e.stopPropagation()}
            >
              {/* Arch frame accent */}
              <svg className="absolute -top-5 left-0 right-0 w-full pointer-events-none z-10 opacity-20"
                height="50" viewBox="0 0 600 50" preserveAspectRatio="none" fill="none">
                <path d="M0 25 Q300 0 600 25" stroke="hsl(var(--accent))" strokeWidth="1" fill="none" />
                <line x1="0" y1="25" x2="0" y2="50" stroke="hsl(var(--accent))" strokeWidth="1" />
                <line x1="600" y1="25" x2="600" y2="50" stroke="hsl(var(--accent))" strokeWidth="1" />
              </svg>

              <div className="border border-accent/25 overflow-hidden shadow-[0_32px_100px_rgba(0,0,0,0.5)] relative">
                <img src={current.url} alt={current.name} className="w-full max-h-[72vh] object-contain bg-primary/60" />
                {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((cls, i) => (
                  <div key={i} className={`absolute w-5 h-5 border-accent/50 ${cls}`} />
                ))}
              </div>

              <div className="mt-5 text-center">
                <p className="font-display text-2xl font-light text-primary-foreground italic">{current.name}</p>
                {current.title && <p className="font-body text-[10px] tracking-[0.3em] uppercase text-accent mt-1">{current.title}</p>}
                <p className="font-body text-[9px] tracking-[0.25em] uppercase text-primary-foreground/35 mt-1">{current.caption}</p>
                <p className="font-body text-[9px] text-primary-foreground/20 mt-3">{lightbox + 1} / {ALL_ITEMS.length}</p>
              </div>
            </motion.div>

            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-8 text-primary-foreground/60 hover:text-primary-foreground z-10 w-11 h-11 flex items-center justify-center">
              <ChevronRight className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}