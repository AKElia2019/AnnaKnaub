import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import SiteNavbar from '@/components/blog/SiteNavbar';
import SiteFooter from '@/components/blog/SiteFooter';

const GALLERY_ITEMS = [
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/369353b40_generated_image.png',
    title: 'Goddess of the Columns',
    caption: 'Marble & Papercut Florals',
    size: 'tall',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/c180799a9_generated_image.png',
    title: 'The Archway Garden',
    caption: 'Neoclassical Stone & Botanicals',
    size: 'wide',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/5781f969d_generated_image.png',
    title: 'Amphora & Roses',
    caption: 'Papercut Still Life',
    size: 'square',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/7466ab662_generated_image.png',
    title: 'Crowned in Laurel',
    caption: 'Goddess Bust Study',
    size: 'tall',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/b877752d6_generated_image.png',
    title: 'Temple of Blossoms',
    caption: 'Ionic Columns & Cherry Blossom',
    size: 'wide',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/e56e645d8_generated_image.png',
    title: 'Hilltop Rotunda',
    caption: 'Papercut Landscape',
    size: 'square',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/36b3c790e_generated_image.png',
    title: 'Relief of the Muse',
    caption: 'Classical Marble Carving',
    size: 'wide',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/a955c7e25_generated_image.png',
    title: 'Through the Arch',
    caption: 'Garden Beyond the Portal',
    size: 'tall',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/65652bbf5_generated_image.png',
    title: 'Arch of Peonies',
    caption: 'Roman Arch & White Florals',
    size: 'square',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/a6b8b9f37_generated_image.png',
    title: 'The Enthroned',
    caption: 'Goddess on Marble Throne',
    size: 'tall',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/096268133_generated_image.png',
    title: 'Goddess in Ivory',
    caption: 'Marble & Papercut Composition',
    size: 'square',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/cf24cb86a_generated_image.png',
    title: 'Botanical Columns',
    caption: 'Papercut Layers on Stone',
    size: 'wide',
  },
];

const ASPECT = {
  tall: 'aspect-[3/4]',
  wide: 'aspect-[4/3]',
  square: 'aspect-square',
};

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const open = (index) => setLightbox(index);
  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  const next = () => setLightbox((i) => (i + 1) % GALLERY_ITEMS.length);

  const handleKey = (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  const current = lightbox !== null ? GALLERY_ITEMS[lightbox] : null;

  return (
    <div className="min-h-screen bg-background" onKeyDown={handleKey} tabIndex={-1}>
      <SiteNavbar />

      {/* ── PAGE HEADER ── */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        {/* Decorative arch silhouette */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[360px] h-[260px] pointer-events-none opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse at top, hsl(var(--accent)) 0%, transparent 70%)' }} />
        <svg className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.06] hidden md:block"
          width="320" height="200" viewBox="0 0 320 200" fill="none">
          <path d="M20 200 L20 90 Q20 20 160 20 Q300 20 300 90 L300 200" stroke="hsl(var(--accent))" strokeWidth="1.5" fill="none"/>
          <line x1="20" y1="200" x2="0" y2="200" stroke="hsl(var(--accent))" strokeWidth="1.5"/>
          <line x1="300" y1="200" x2="320" y2="200" stroke="hsl(var(--accent))" strokeWidth="1.5"/>
          <line x1="20" y1="100" x2="20" y2="110" stroke="hsl(var(--accent))" strokeWidth="3"/>
          <line x1="300" y1="100" x2="300" y2="110" stroke="hsl(var(--accent))" strokeWidth="3"/>
        </svg>

        <div className="max-w-6xl mx-auto px-6 md:px-10 relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-body text-xs tracking-[0.35em] uppercase text-accent block mb-4">The Collection</span>
            <h1 className="font-display font-light text-foreground leading-tight mb-4" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)' }}>
              Marble, Myth &amp; <span className="italic text-accent">Bloom</span>
            </h1>
            <div className="w-20 h-px mx-auto mb-6" style={{ background: 'repeating-linear-gradient(90deg, hsl(var(--border)) 0px, hsl(var(--border)) 0.5px, transparent 0.5px, transparent 8px)' }} />
            <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              A curated gallery of neoclassical imagery — Greek goddesses, marble architecture, papercut botanicals, and the timeless beauty of column and arch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY GRID ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
        {/* Decorative rule */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-border" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent opacity-60">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1"/>
            <path d="M12 2 L12 7 M12 17 L12 22 M2 12 L7 12 M17 12 L22 12" stroke="currentColor" strokeWidth="1"/>
          </svg>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="break-inside-avoid group cursor-pointer relative"
              onClick={() => open(i)}
            >
              {/* Arch frame overlay */}
              <div className="relative overflow-hidden border border-border/60 group-hover:border-accent transition-colors duration-400 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                {/* SVG arch top decoration */}
                <svg className="absolute top-0 left-0 right-0 w-full z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  height="40" viewBox="0 0 400 40" preserveAspectRatio="none" fill="none">
                  <path d="M0 40 L0 20 Q200 0 400 20 L400 40" fill="hsla(38,42%,52%,0.08)" />
                  <path d="M0 20 Q200 0 400 20" stroke="hsl(var(--accent))" strokeWidth="0.8" fill="none" opacity="0.5"/>
                </svg>

                <div className={`${ASPECT[item.size]} w-full overflow-hidden`}>
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                  />
                </div>

                {/* Bottom caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent pt-8 pb-4 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <p className="font-display text-base font-light text-primary-foreground leading-tight">{item.title}</p>
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-primary-foreground/60 mt-0.5">{item.caption}</p>
                </div>

                {/* Corner pillar accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
              </div>

              {/* Below-image title (always visible) */}
              <div className="mt-3 px-1">
                <p className="font-display text-sm font-light text-foreground italic">{item.title}</p>
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-4 md:p-10"
            onClick={close}
          >
            {/* Close */}
            <button onClick={close} className="absolute top-6 right-6 text-primary-foreground/70 hover:text-primary-foreground transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center">
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 text-primary-foreground/70 hover:text-primary-foreground transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center">
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Arch frame SVG */}
              <svg className="absolute -top-6 left-0 right-0 w-full pointer-events-none z-10 opacity-30"
                height="60" viewBox="0 0 600 60" preserveAspectRatio="none" fill="none">
                <path d="M0 60 L0 30 Q300 0 600 30 L600 60" fill="none" />
                <path d="M0 30 Q300 0 600 30" stroke="hsl(var(--accent))" strokeWidth="1" fill="none"/>
                <line x1="0" y1="30" x2="0" y2="60" stroke="hsl(var(--accent))" strokeWidth="1"/>
                <line x1="600" y1="30" x2="600" y2="60" stroke="hsl(var(--accent))" strokeWidth="1"/>
              </svg>

              <div className="border border-accent/30 overflow-hidden shadow-[0_32px_120px_rgba(0,0,0,0.4)]">
                <img src={current.url} alt={current.title} className="w-full max-h-[75vh] object-contain bg-primary" />
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-accent/60" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-accent/60" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-accent/60" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-accent/60" />

              <div className="mt-5 text-center">
                <p className="font-display text-2xl font-light text-primary-foreground italic">{current.title}</p>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary-foreground/50 mt-1">{current.caption}</p>
                <p className="font-body text-xs text-primary-foreground/30 mt-3">{lightbox + 1} / {GALLERY_ITEMS.length}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 text-primary-foreground/70 hover:text-primary-foreground transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center">
              <ChevronRight className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}