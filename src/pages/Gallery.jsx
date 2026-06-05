import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import SiteNavbar from '@/components/blog/SiteNavbar';
import SiteFooter from '@/components/blog/SiteFooter';

const GODDESSES = [
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/5431c124f_generated_image.png',
    name: 'Mnemosyne',
    title: 'Goddess of Memory',
    caption: 'Remembrance · Time · Legacy',
    domain: 'Mind & Soul',
    story: 'Before there were Muses, there was Mnemosyne. She is the deep well from which all creation drinks — the mother of the nine Muses and the keeper of everything that has ever been known. Her face holds the quiet gravity of ages: silver-threaded hair, deep-set eyes that have witnessed the rise and fall of civilizations. To drink from her river was to remember everything. To forget her was to cease to be. She reminds us that to live fully, we must first remember clearly.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/29f6bacf1_generated_image.png',
    name: 'Hypatia',
    title: 'Goddess of Mathematics',
    caption: 'Sacred Geometry · The Golden Ratio · Infinity',
    domain: 'Numbers & Cosmos',
    story: 'She sees the world as a lattice of ratios, proportions, and spirals. Where others see chaos, Hypatia traces the hidden order — the Fibonacci curve in a nautilus shell, the golden rectangle in the human face, the prime numbers spaced like stars across an infinite field. Her features are angular and precise, her gaze relentlessly focused. She does not observe beauty; she calculates it. In her universe, mathematics is not a tool. It is the language the cosmos chose to speak in.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/5cfeefef3_generated_image.png',
    name: 'Calliope',
    title: 'Muse of Epic Poetry',
    caption: 'Words · Scrolls · Story',
    domain: 'Art & Story',
    story: 'Of all the Muses, Calliope stands tallest — the one who breathed fire into Homer, who set Virgil\'s hand trembling. Her face is alive with motion: wide expressive eyes that seem to already be mid-verse, full lips shaped for proclamation, wild curls that defy the laurel crown trying to contain them. She does not wait for inspiration to arrive. She is the source. Every epic ever told, every myth that outlasted the empire that birthed it — it passed first through her open, singing mouth.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/7efa5bbbb_generated_image.png',
    name: 'Nyx',
    title: 'Goddess of Night',
    caption: 'Stars · Moon · Mystery',
    domain: 'Cosmos & Shadow',
    story: 'Nyx was born before the gods, before the sun, before time learned to count. She is the primordial darkness that gave birth to Sleep, Death, Dreams, and Strife. Even Zeus — king of Olympus — feared to cross her. Her face is all shadow and suggestion: heavy-lidded eyes that hold the silence between stars, long dark hair that flows like the space between worlds. She is not evil. She is necessary. Without her darkness, no dawn would mean anything at all.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/3dcd8c1a8_generated_image.png',
    name: 'Eirene',
    title: 'Goddess of Peace',
    caption: 'Olive · Dove · Stillness',
    domain: 'Human Harmony',
    story: 'Eirene is not passive. She is the hardest thing — the choice made after conflict, the hand extended across a wound, the silence that follows the last sword being sheathed. One of the Horae, the goddess of seasons and order, her round face carries a warmth that is not soft but earned. Her smile has seen war. Her braided hair is wound with olive sprigs and small white doves, symbols not of naivety but of deliberate, practiced grace. Peace, she teaches, is not the absence of struggle. It is its resolution.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/ec1440873_generated_image.png',
    name: 'Psyche',
    title: 'Goddess of the Soul',
    caption: 'Butterfly · Transformation · Inner Life',
    domain: 'Mind & Soul',
    story: 'Psyche began as a mortal girl so beautiful that Aphrodite grew jealous. She endured four impossible labors — descending into the underworld, sorting mountains of seeds, stealing golden fleece — all to earn back love she had lost through a single moment of doubt. Her face is young and luminous, but her eyes carry the weight of someone who has walked among the dead and returned. The butterfly wings behind her are not decoration. They are the proof: she was crushed, and she became something that could fly.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/7b07a308a_generated_image.png',
    name: 'Tyche',
    title: 'Goddess of Fate',
    caption: 'Wheel · Stars · The Unknown',
    domain: 'Fate & Time',
    story: 'Tyche governs what no plan can account for. She holds the rudder of fortune, spinning her great wheel with the same indifference as the turning of seasons. Her expression is the most unsettling of all: enigmatic, one eye open and one closed, as if she already knows the outcome and finds your suspense amusing. Cities built temples to her, hoping she might favor them. But Tyche does not take requests. She simply spins. The lesson she teaches is radical acceptance — that some forces are not to be mastered, only navigated.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/e4760ed2e_generated_image.png',
    name: 'Iris',
    title: 'Goddess of the Rainbow',
    caption: 'Color · Bridge · Messenger',
    domain: 'Nature & Light',
    story: 'Iris runs between worlds. As messenger of the gods, she stitches the sky with color wherever her feet have touched — her trail the rainbow arc that humans point at after storms. Her face is the most joyful in the pantheon: wide bright eyes, cheeks flushed with the speed of flight, flower-strewn hair still caught mid-wind. She reminds us that the rainbow only appears when both sun and rain are present at once. Beauty, she whispers, is not what happens after the storm. It is what happens inside it.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/f13d9892b_generated_image.png',
    name: 'The Crowned',
    title: 'The Ornate One',
    caption: 'Crown · Bloom · Ceremony',
    domain: 'Beauty & Ritual',
    story: 'She has no single name — she is the spirit of ritual itself, the sacred act of adorning. Every culture has her: the figure dressed for ceremony, crowned with flowers and lace and memory. Her elaborate papercut headdress is a living archive — each bloom a rite of passage, each leaf a prayer. She presides over weddings, harvests, initiations, and funerals. She is proof that humans have always understood: the things we cannot say in words, we say with beauty.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/8ba711ba4_generated_image.png',
    name: 'Sophia',
    title: 'Goddess of Wisdom',
    caption: 'Geometry · Constellations · Knowledge',
    domain: 'Numbers & Cosmos',
    story: 'Sophia is the Gnostic soul of the cosmos — wisdom personified not as accumulated learning but as deep, embodied knowing. Her features are strong and mature: prominent nose, heavy-lidded eyes that have read every text ever written and remember what the authors forgot to say. She wears constellations like jewelry. In her hands, philosophy and mathematics are not separate disciplines but two dialects of the same language. She does not give answers. She teaches you to ask better questions.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/a7c7def8a_generated_image.png',
    name: 'Eris',
    title: 'Goddess of Discord',
    caption: 'Change · Wildness · Transformation',
    domain: 'Fate & Time',
    story: 'Eris threw one golden apple and started the Trojan War. History blamed her. But Eris understood something the other gods refused to acknowledge: nothing grows in perfect comfort. Her face is all edges — sharp jaw, fierce eyes, hair wild as a storm front. She is the splinter that forces the body to heal. The argument that clears the air. The creative destruction before the new form emerges. She is not the enemy of order. She is what order becomes when it stops being honest with itself.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/d5a676be0_generated_image.png',
    name: 'Athena',
    title: 'Goddess of Wisdom & War',
    caption: 'Olive branch · Owl · Strategy',
    domain: 'Mind & Soul',
    story: 'Athena did not emerge from childhood — she was born fully formed, in armor, from the mind of Zeus. She is the union of intellect and force: the philosopher who can fight, the warrior who reads. Her jaw is set, her eyes carry the cool appraisal of someone calculating three moves ahead. The helmet pushed back on her head says: I have been in battle, and I came back thinking. She is the patron of Athens because she gave them not just victory, but the olive tree — a symbol that civilization is built not on conquest, but on sustenance.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/eed6f269b_generated_image.png',
    name: 'Aphrodite',
    title: 'Goddess of Love & Beauty',
    caption: 'Roses · Desire · Connection',
    domain: 'Human Harmony',
    story: 'Aphrodite was born from sea foam — from the churning of something vast and old — and she arrived in the world already complete. Her beauty is not a gift she gives lightly. It is a force, ungovernable and indiscriminate. Her face is the warmest of all: soft lips that curve without apology, almond eyes that invite and hold. She is not merely the goddess of romance. She is the principle that makes humans reach toward each other across the terrifying distance between souls. Without her, no city was ever built. No child ever born.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/4747f7411_generated_image.png',
    name: 'Artemis',
    title: 'Goddess of the Hunt & Moon',
    caption: 'Crescent · Forest · Solitude',
    domain: 'Nature & Light',
    story: 'Artemis asked her father Zeus for one thing above all others: to remain free. Free of marriage, free of the city, free to run through the forest under moonlight with her hounds. Her face is lean and alert, with cheekbones carved by wind and the kind of eyes that track movement in peripheral darkness. She is the goddess of the threshold between civilization and wilderness, between the known and the untamed. She is not cold — she is sovereign. There is a difference, though the world has always confused the two.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/1566fd9ca_generated_image.png',
    name: 'Hera',
    title: 'Queen of the Gods',
    caption: 'Crown · Peacock · Sovereignty',
    domain: 'Beauty & Ritual',
    story: 'Hera is so often told as the jealous wife, and so rarely as what she truly is: the goddess of sacred bonds. She governs marriage not because she is trapped in one, but because she understands the terrifying depth of commitment — what it costs, what it protects. Her face is regal and commanding: arched brows that have raised in disappointment at gods and mortals alike, eyes that see through every excuse. The peacock in her crown is not vanity. It is the display of power made honest — beauty worn not to seduce, but to be known.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/c6837334f_generated_image.png',
    name: 'Persephone',
    title: 'Goddess of Spring & Shadow',
    caption: 'Pomegranate · Narcissus · Duality',
    domain: 'Fate & Time',
    story: 'Persephone is the only god who lives in both worlds — and she chose to. The six pomegranate seeds she ate were not a trap. They were a declaration. Her face reflects this duality: one side lit by the warmth of spring flowers blooming, the other shadowed by the underworld she learned to rule. She is the proof that descending into darkness does not destroy you — it completes you. Every spring when she returns, she is not the same girl who left. She is the queen who came back. That is the oldest story of all.',
  },
];

const DESIGN_ELEMENTS = [
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/34c38decc_generated_image.png',
    name: 'Magnolia Pillar Panel',
    caption: 'Botanical column motif',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/246d9abdf_generated_image.png',
    name: 'Botanical Column Panel',
    caption: 'Horizontal botanical element',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/ae32578fa_generated_image.png',
    name: 'Layered Arch Frame',
    caption: 'Page framing element',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/57650f473_generated_image.png',
    name: 'Corner Ornament',
    caption: 'Papercut floral corner motif',
  },
];

const ALL_ITEMS = [
  ...GODDESSES,
  ...DESIGN_ELEMENTS.map(e => ({ ...e, title: '', domain: 'Design Element', story: '' })),
];

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
        <svg className="absolute top-0 left-0 right-0 w-full z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          height="40" viewBox="0 0 400 40" preserveAspectRatio="none" fill="none">
          <path d="M0 40 L0 20 Q200 0 400 20 L400 40" fill="hsla(38,42%,52%,0.08)" />
          <path d="M0 20 Q200 0 400 20" stroke="hsl(var(--accent))" strokeWidth="0.8" fill="none" opacity="0.6" />
        </svg>

        <div className="aspect-[3/4] w-full overflow-hidden">
          <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent pt-12 pb-4 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <p className="font-display text-base font-light text-primary-foreground leading-tight">{item.name}</p>
          {item.title && <p className="font-body text-[9px] tracking-[0.25em] uppercase text-accent mt-0.5">{item.title}</p>}
          {item.story && <p className="font-body text-[10px] text-primary-foreground/60 mt-1 leading-relaxed line-clamp-2">{item.story}</p>}
        </div>

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
              Each goddess embodies a dimension of human existence. Click any portrait to read her story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`font-body text-[10px] tracking-[0.25em] uppercase px-4 py-1.5 border transition-colors duration-300 ${
                activeFilter === f ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-accent hover:text-foreground bg-transparent'
              }`}>
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* ── GODDESS GRID ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-20">
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
          <AnimatePresence>
            {filtered.map((item) => {
              const globalIndex = ALL_ITEMS.findIndex(a => a.name === item.name);
              return (
                <motion.div key={item.name} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4 }}>
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
            className="fixed inset-0 z-50 bg-primary/97 flex items-center justify-center p-4 md:p-10 overflow-y-auto"
            onClick={close}
          >
            <button onClick={close} className="fixed top-6 right-6 text-primary-foreground/60 hover:text-primary-foreground z-10 w-11 h-11 flex items-center justify-center">
              <X className="w-6 h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="fixed left-3 md:left-6 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground z-10 w-11 h-11 flex items-center justify-center">
              <ChevronLeft className="w-7 h-7" />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35 }}
              className="relative w-full max-w-3xl my-8 md:my-0"
              onClick={e => e.stopPropagation()}
            >
              <div className="md:flex gap-0 border border-accent/20 shadow-[0_32px_100px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* Image side */}
                <div className="md:w-2/5 shrink-0 relative">
                  <img src={current.url} alt={current.name} className="w-full h-64 md:h-full object-cover" />
                  {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((cls, i) => (
                    <div key={i} className={`absolute w-5 h-5 border-accent/40 ${cls}`} />
                  ))}
                </div>

                {/* Story side */}
                <div className="md:w-3/5 bg-primary/80 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    {/* Arch accent */}
                    <svg className="w-full mb-6 opacity-15" height="24" viewBox="0 0 400 24" fill="none">
                      <path d="M0 12 Q200 0 400 12" stroke="hsl(var(--accent))" strokeWidth="1" fill="none" />
                    </svg>

                    <p className="font-body text-[9px] tracking-[0.35em] uppercase text-accent mb-2">{current.domain}</p>
                    <h2 className="font-display text-3xl md:text-4xl font-light text-primary-foreground italic mb-1">{current.name}</h2>
                    {current.title && <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary-foreground/40 mb-6">{current.title}</p>}

                    <div className="fluted-divider w-12 mb-6 opacity-20" />

                    {current.story ? (
                      <p className="font-body text-sm text-primary-foreground/75 leading-relaxed">{current.story}</p>
                    ) : (
                      <p className="font-body text-sm text-primary-foreground/40 italic leading-relaxed">{current.caption}</p>
                    )}
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <p className="font-body text-[9px] tracking-[0.2em] uppercase text-primary-foreground/25">{current.caption}</p>
                    <p className="font-body text-[9px] text-primary-foreground/20">{lightbox + 1} / {ALL_ITEMS.length}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <button onClick={(e) => { e.stopPropagation(); next(); }} className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground z-10 w-11 h-11 flex items-center justify-center">
              <ChevronRight className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}