import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import SiteNavbar from '@/components/blog/SiteNavbar';
import SiteFooter from '@/components/blog/SiteFooter';

const DEITIES = [
  // ── OLYMPIANS ──────────────────────────────────────────────────────────────
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/e19ce45cf_generated_image.png',
    name: 'Athena',
    title: 'Goddess of Wisdom & Strategy',
    caption: 'Olive · Helmet · Owl',
    domain: 'Mind & Wisdom',
    story: 'Born fully armored from the mind of Zeus, Athena is the embodiment of rational thought and strategic clarity. She does not act from impulse — she calculates, plans, and moves with purpose. Patron of Athens, she gifted humanity the olive tree: not a weapon, but sustenance. She reminds us that the most enduring victories are won not by force, but by understanding.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/5de554e8d_generated_image.png',
    name: 'Aphrodite',
    title: 'Goddess of Love & Beauty',
    caption: 'Rose · Pearl · Golden light',
    domain: 'Love & Beauty',
    story: 'Aphrodite rose from the sea-foam, born of the ocean\'s depth and radiant with a beauty that moved even the gods. She governs not only romantic love but all acts of creation born from desire — art, poetry, the urge to bring something beautiful into being. Her power is the oldest force: the pull between things that belong together.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/0f21b0bbf_generated_image.png',
    name: 'Hera',
    title: 'Queen of Olympus',
    caption: 'Crown · Peacock · Sacred bond',
    domain: 'Love & Beauty',
    story: 'Hera rules not by beauty alone but by sovereign authority. She is the goddess of marriage, commitment, and the sacred contracts that bind lives together. Often misread as merely jealous, she is in truth the guardian of promises — the force that demands we honor what we vow. Her peacock, with its thousand eyes, sees all that is hidden.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/4c9a98afc_generated_image.png',
    name: 'Demeter',
    title: 'Goddess of Harvest & Nourishment',
    caption: 'Wheat · Poppy · Abundance',
    domain: 'Nature & Earth',
    story: 'When Persephone was taken, Demeter\'s grief froze the earth. Crops withered. Winter was born. In her mourning we see that love and loss are woven into the fabric of all living things. But she also teaches restoration — every spring, the earth returns. Demeter is the cycle of life made visible: the patience of the soil, the faithfulness of the seasons.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/ca635e6ab_generated_image.png',
    name: 'Artemis',
    title: 'Goddess of the Hunt & Moon',
    caption: 'Crescent · Bow · Silver light',
    domain: 'Nature & Earth',
    story: 'Artemis runs free through moonlit forests, owing allegiance to no one. She is independence made divine — the wilderness that refuses to be tamed. Twin to Apollo, she governs the moon where he commands the sun. She protects the young, the untamed, and all who walk their own path. Her arrow never misses; her solitude is not loneliness but sovereignty.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/4e5b23e71_generated_image.png',
    name: 'Hestia',
    title: 'Goddess of the Hearth & Home',
    caption: 'Flame · Hearth · Belonging',
    domain: 'Love & Beauty',
    story: 'The quietest of the Olympians, Hestia asked for nothing — no throne, no myths of conquest — only to tend the sacred flame at the center of the world. She is the warmth that turns a house into a home, the invisible presence at every table. In an age that celebrates the loud and the dramatic, Hestia reminds us: the most sacred things are the ones we return to every day.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/49ec2b610_generated_image.png',
    name: 'Hermes',
    title: 'Messenger of the Gods',
    caption: 'Caduceus · Wings · Crossroads',
    domain: 'Story & Language',
    story: 'Fleet-footed Hermes moves between worlds — Olympus and the mortal realm, the living and the dead. He is the god of language, commerce, travel, and thieves, for all these require crossing boundaries and speaking across difference. He invented writing, the lyre, and arithmetic. He is the original communicator: the one who makes connection possible.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/561a1bc74_generated_image.png',
    name: 'Apollo',
    title: 'God of the Sun, Music & Truth',
    caption: 'Lyre · Laurel · Golden rays',
    domain: 'Mind & Wisdom',
    story: 'Apollo blazes across the sky, drawing the sun in his golden chariot, but his true gift is inner light — the clarity of truth, the ordering power of music and mathematics. He is the patron of poetry, medicine, and prophecy. His oracle at Delphi spoke the words "Know thyself" — perhaps the most important command ever given. He is reason, illumination, and the harmony of all things working together.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/b211875c3_generated_image.png',
    name: 'Dionysus',
    title: 'God of Wine, Ecstasy & Theatre',
    caption: 'Grapevine · Ivy · Mask',
    domain: 'Story & Language',
    story: 'Twice-born Dionysus — first from his mother Semele, then from the thigh of Zeus — is the god of all things that dissolve boundaries: wine, theatre, madness, and ecstasy. He is the patron of transformation. Through his rituals, the ancient Greeks found catharsis — the release of grief and joy that art alone can provide. He teaches that dissolution is not destruction; sometimes, to become fully alive, the old self must come apart.',
  },
  // ── PRIMORDIAL & TITANS ────────────────────────────────────────────────────
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/ccb0cac2f_generated_image.png',
    name: 'Gaia',
    title: 'The Earth Mother',
    caption: 'Soil · Root · All living things',
    domain: 'Nature & Earth',
    story: 'Before the Olympians, before the Titans, there was Gaia. She is the earth itself — not a goddess who rules it, but the living body of the world. Every mountain is her bone, every river her blood. All gods and mortals alike were born of her. She is the original mother, the ground beneath every step, the force that will outlast every civilization that rises and falls upon her skin.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/65ccea847_generated_image.png',
    name: 'Nyx',
    title: 'Goddess of the Night',
    caption: 'Stars · Darkness · Mystery',
    domain: 'Cosmos & Shadow',
    story: 'Even Zeus feared Nyx, the primordial goddess of night. She is older than the Olympians, born in the first moments of creation. From her darkness came Sleep and Death, Dreams and Discord, but also Friendship and Love. Nyx reminds us that the night is not empty — it is full. Every truth we avoid in daylight waits for us in the dark.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/d028269ef_generated_image.png',
    name: 'Mnemosyne',
    title: 'Goddess of Memory',
    caption: 'Time · Remembrance · Legacy',
    domain: 'Mind & Wisdom',
    story: 'Mnemosyne is the titaness of memory, mother of the nine Muses. Without her, there is no art, no history, no identity. She is the thread that connects who we are to who we were. The ancient Greeks believed that at death, souls could drink from the River Lethe — forgetting — or from Mnemosyne\'s spring, and remember everything. Memory is not the past: it is how the past lives in the present.',
  },
  // ── LESSER GODS & PERSONIFICATIONS ────────────────────────────────────────
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/9a27fa909_generated_image.png',
    name: 'Persephone',
    title: 'Queen of the Underworld',
    caption: 'Pomegranate · Narcissus · Duality',
    domain: 'Fate & Transformation',
    story: 'Persephone is the goddess of thresholds. As Kore, she was the maiden of spring, picking flowers in a meadow. As Queen of the Underworld, she rules the realm of the dead with quiet authority. She is the only being who moves freely between the living and the dead. Her myth is the oldest story of coming into one\'s power — the girl who was taken, and became a queen.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/9dcfc3aa2_generated_image.png',
    name: 'Calliope',
    title: 'Muse of Epic Poetry',
    caption: 'Scroll · Quill · Voice',
    domain: 'Story & Language',
    story: 'Chief of the nine Muses, Calliope breathed life into the Iliad and the Odyssey through Homer\'s hand. Her name means "beautiful voice." She governs the epic — the long form, the sweeping narrative, the stories that take a lifetime to fully understand. She is summoned at the opening of every great work: "Sing in me, Muse, and through me tell the story..."',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/db34fc59e_generated_image.png',
    name: 'Hypatia',
    title: 'Embodiment of Mathematics',
    caption: 'Golden ratio · Geometry · Infinity',
    domain: 'Numbers & Cosmos',
    story: 'Hypatia of Alexandria was the last great philosopher of the ancient world — mathematician, astronomer, and teacher. She edited Ptolemy\'s Almagest and mapped the stars. In her we find the divine meeting the rational: the belief that the universe speaks in numbers, and that to understand mathematics is to hear the language of creation. She was killed for her knowledge. Her ideas survived.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/c53cc6c40_generated_image.png',
    name: 'Sophia',
    title: 'Goddess of Divine Wisdom',
    caption: 'Compass · Constellation · Sacred knowledge',
    domain: 'Numbers & Cosmos',
    story: 'In Gnostic tradition, Sophia is the divine feminine wisdom that preceded creation — the architect\'s blueprint, the pattern behind all patterns. She is associated with the sacred geometry that underlies the natural world: the spiral of a shell, the branching of a tree, the orbit of planets. To seek wisdom is to seek Sophia; to find a pattern in the chaos is to glimpse her face.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/76b474bc6_generated_image.png',
    name: 'Astraea',
    title: 'Goddess of Stars & Innocence',
    caption: 'Constellation · Scale · Purity',
    domain: 'Numbers & Cosmos',
    story: 'Astraea was the last immortal to live among humans during the Golden Age. As mankind grew cruel, the gods retreated to Olympus one by one. Astraea stayed longest, tending to justice among mortals. When even she could bear it no longer, she ascended to the stars and became the constellation Virgo. She holds the scales of Libra — a reminder that justice is not lost, only waiting.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/6bd7511ec_generated_image.png',
    name: 'Psyche',
    title: 'Goddess of the Soul',
    caption: 'Butterfly · Rose · Inner journey',
    domain: 'Fate & Transformation',
    story: 'Psyche means "soul" in Greek — and her myth is the soul\'s journey. She was a mortal girl so beautiful that Aphrodite grew jealous, setting her impossible tasks: separating seeds, fetching water from the underworld, capturing beauty in a box. She completed them all. In loving Eros and being transformed by it, she became immortal. Her story is the oldest hero\'s journey: the soul, tested, becomes divine.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/64eea78e0_generated_image.png',
    name: 'Eirene',
    title: 'Goddess of Peace',
    caption: 'Olive · Dove · Stillness',
    domain: 'Love & Beauty',
    story: 'Eirene is one of the Horae, the goddesses of the seasons and the natural order. She presides over peace — not the peace of surrender, but the peace that follows understanding. She is depicted carrying a cornucopia, because peace is the condition in which abundance becomes possible. The Athenians built temples to Eirene not after wars ended, but in the hope of preventing them.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/5c34bf490_generated_image.png',
    name: 'Themis',
    title: 'Goddess of Divine Law',
    caption: 'Scales · Order · Sacred oath',
    domain: 'Mind & Wisdom',
    story: 'Before there were courts, there was Themis — the personification of divine law and natural order. She is not the law of kings, but the law written into the fabric of the cosmos: cause and consequence, the balance that must eventually be restored. She organized the first assembly of the gods and speaks at critical moments when order is at risk. She is the still voice that knows what is right.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/afcb73cf0_generated_image.png',
    name: 'Nemesis',
    title: 'Goddess of Retribution',
    caption: 'Wings · Wheel · Measure',
    domain: 'Fate & Transformation',
    story: 'Nemesis does not punish the wicked out of cruelty — she restores balance. Her name means "to give what is due." She is the force that corrects excessive pride, unearned fortune, and abuse of privilege. In Greek thought, no mortal could escape her indefinitely. She is not a goddess of vengeance but of proportion — the universe\'s insistence that what rises too high must come level again.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/42ff5f968_generated_image.png',
    name: 'Hecate',
    title: 'Goddess of Magic & Crossroads',
    caption: 'Torch · Key · Three faces',
    domain: 'Cosmos & Shadow',
    story: 'Hecate stands at the crossroads with her torches, illuminating the choices we must make in darkness. She is the goddess of witchcraft, the night, the moon, and all liminal spaces — doorways, thresholds, transitions. She is triple-formed: maiden, mother, crone — past, present, future. To encounter her at the crossroads is not a curse but an invitation: to choose consciously, to walk forward with eyes open.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/ab9e5b8b3_generated_image.png',
    name: 'Tyche',
    title: 'Goddess of Fortune & Fate',
    caption: 'Wheel · Stars · The unknown',
    domain: 'Fate & Transformation',
    story: 'Tyche spins her wheel, and empires rise and fall. She is the unpredictable force in human affairs — the coincidence that changes everything, the chance encounter, the unexpected turn. The ancients built temples to her not to beg for luck but to acknowledge her reality: that not everything can be planned. Wisdom lies in acting with intention while making peace with the turn of the wheel.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/14c14feda_generated_image.png',
    name: 'Iris',
    title: 'Goddess of the Rainbow',
    caption: 'Rainbow · Wings · Bridge',
    domain: 'Nature & Earth',
    story: 'Iris stretches across the sky as a living bridge between heaven and earth, carrying messages from the gods to mortals. She is the original messenger, golden-winged and swift. Where Hermes carries words, Iris carries light — and the rainbow she leaves behind is her signature: proof that connection is possible across vast distance. Every rainbow is a reminder that the divine still speaks.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/5163cb508_generated_image.png',
    name: 'Selene',
    title: 'Goddess of the Full Moon',
    caption: 'Moon · Silver · Tides',
    domain: 'Cosmos & Shadow',
    story: 'Selene drives her silver chariot across the night sky, and in doing so governs tides, cycles, and the rhythms of the feminine. She fell in love with the sleeping shepherd Endymion and asked Zeus to grant him eternal sleep so she could visit him every night forever. She is the goddess of longing — of the love that circles, always returning, never quite consummated. The full moon is her face, unchanging and luminous.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/00f613dba_generated_image.png',
    name: 'Nike',
    title: 'Goddess of Victory',
    caption: 'Wings · Laurel · Triumph',
    domain: 'Fate & Transformation',
    story: 'Nike flies alongside those who strive. She does not give victory — she attends it, crowning those who have earned it through effort and excellence. Winged and swift, she is often depicted mid-flight, arriving with a wreath and the news that the struggle has been worth it. She teaches that victory is not luck: it is the natural outcome of preparation meeting the moment.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/f13d9892b_generated_image.png',
    name: 'The Crowned One',
    title: 'Beauty & Sacred Ritual',
    caption: 'Lace crown · Bloom · Ceremony',
    domain: 'Love & Beauty',
    story: 'She wears the crown of flowers and bone-white lace — not inherited but grown. Her headdress is a living architecture of rose and leaf, built piece by piece like a life well-lived. She is the unnamed goddess of all sacred ritual: the wedding procession, the naming ceremony, the funeral garland. She reminds us that beauty is not frivolous — it is how humans mark the moments that matter most.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/4cd04d3b8_generated_image.png',
    name: 'Eris',
    title: 'Goddess of Discord & Change',
    caption: 'Wild bloom · Rupture · Becoming',
    domain: 'Fate & Transformation',
    story: 'Eris threw the golden apple — "for the fairest" — and set in motion the Trojan War. She is blamed for chaos, but the Greeks knew something we often forget: disruption is creative. Without the catalyst of her golden apple, there would have been no Helen, no Homer, no Iliad. Eris is the force that breaks stagnant systems apart so that something new can emerge from the ruins.',
  },
];

const DESIGN_ELEMENTS = [
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/34c38decc_generated_image.png',
    name: 'Magnolia Pillar Panel',
    caption: 'Botanical column motif',
    story: 'A decorative horizontal panel featuring layered magnolia and lotus blossoms framed by classical columns — for use as section dividers and visual breathing space throughout the site.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/246d9abdf_generated_image.png',
    name: 'Botanical Column Panel',
    caption: 'Horizontal botanical element',
    story: 'Papercut botanicals arranged within a classical architectural frame — sage greens and warm creams in layered relief, evoking the feeling of carved stone softened by living things.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/ae32578fa_generated_image.png',
    name: 'Layered Arch Frame',
    caption: 'Page framing element',
    story: 'Concentric arches in graduated cream and sage tones, with a botanical garland crowning the apex. Used to frame portraits, pull-quotes, and moments of emphasis across the site.',
  },
  {
    url: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/57650f473_generated_image.png',
    name: 'Corner Ornament',
    caption: 'Papercut floral corner motif',
    story: 'A quarter-circle corner motif in layered papercut roses and laurel — for decorating borders, cards, and section edges with the neoclassical botanical language of the collection.',
  },
];

const DOMAINS = ['Mind & Wisdom', 'Love & Beauty', 'Nature & Earth', 'Story & Language', 'Numbers & Cosmos', 'Cosmos & Shadow', 'Fate & Transformation'];
const ALL_ITEMS = [...DEITIES, ...DESIGN_ELEMENTS.map(e => ({ ...e, domain: 'Design Element', title: '' }))];

const DOMAIN_ACCENT = {
  'Mind & Wisdom': 'text-accent',
  'Love & Beauty': 'text-foreground/60',
  'Nature & Earth': 'text-accent',
  'Story & Language': 'text-foreground/60',
  'Numbers & Cosmos': 'text-accent',
  'Cosmos & Shadow': 'text-foreground/60',
  'Fate & Transformation': 'text-accent',
};

function GalleryCard({ item, globalIndex, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      onClick={() => onOpen(globalIndex)}
    >
      <div className="relative overflow-hidden border border-border/60 group-hover:border-accent/60 transition-colors duration-400 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
        <svg className="absolute top-0 left-0 right-0 w-full z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          height="36" viewBox="0 0 400 36" preserveAspectRatio="none" fill="none">
          <path d="M0 36 L0 18 Q200 0 400 18 L400 36" fill="hsla(38,42%,52%,0.07)" />
          <path d="M0 18 Q200 0 400 18" stroke="hsl(var(--accent))" strokeWidth="0.7" fill="none" opacity="0.5" />
        </svg>
        <div className="aspect-[3/4] overflow-hidden">
          <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/95 via-foreground/70 to-transparent pt-16 pb-4 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <p className="font-display text-sm font-light text-primary-foreground italic leading-tight">{item.name}</p>
          <p className="font-body text-[9px] tracking-[0.2em] uppercase text-primary-foreground/50 mt-0.5 line-clamp-2">{item.story?.substring(0, 80)}…</p>
        </div>
        {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((cls, i) => (
          <div key={i} className={`absolute w-3 h-3 border-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${cls}`} />
        ))}
      </div>
      <div className="mt-2.5 px-0.5">
        <p className="font-display text-sm font-light text-foreground italic">{item.name}</p>
        {item.domain && item.domain !== 'Design Element' && (
          <p className={`font-body text-[9px] tracking-[0.25em] uppercase mt-0.5 ${DOMAIN_ACCENT[item.domain] || 'text-muted-foreground'}`}>{item.domain}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? DEITIES : DEITIES.filter(g => g.domain === activeFilter);
  const current = lightbox !== null ? ALL_ITEMS[lightbox] : null;

  const close = () => setLightbox(null);
  const prev = () => setLightbox(i => (i - 1 + ALL_ITEMS.length) % ALL_ITEMS.length);
  const next = () => setLightbox(i => (i + 1) % ALL_ITEMS.length);

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      {/* ── HEADER ── */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.04] hidden md:block">
          <svg width="360" height="230" viewBox="0 0 360 230" fill="none">
            <path d="M20 230 L20 95 Q180 12 340 95 L340 230" stroke="hsl(var(--accent))" strokeWidth="1.5" fill="none"/>
            <line x1="20" y1="95" x2="20" y2="112" stroke="hsl(var(--accent))" strokeWidth="5"/>
            <line x1="340" y1="95" x2="340" y2="112" stroke="hsl(var(--accent))" strokeWidth="5"/>
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-accent block mb-4">The Collection</span>
            <h1 className="font-display font-light text-foreground leading-tight mb-4" style={{ fontSize: 'clamp(2.4rem,5vw,4.5rem)' }}>
              Myth, Memory &amp; <span className="italic text-accent">Mathematics</span>
            </h1>
            <div className="fluted-divider w-20 mx-auto mb-6" />
            <p className="font-body text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              A collection of gods, goddesses, and embodied ideas — each one a dimension of human experience: love, wisdom, fate, language, the cosmos, and the sacred structures of the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {['All', ...DOMAINS].map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`font-body text-[9px] tracking-[0.25em] uppercase px-4 py-1.5 border transition-colors duration-200 ${
                activeFilter === f
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:border-accent hover:text-foreground'
              }`}>
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* ── DEITY GRID ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8">
          <AnimatePresence>
            {filtered.map((item) => {
              const globalIndex = ALL_ITEMS.findIndex(a => a.name === item.name);
              return (
                <motion.div key={item.name} layout
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35 }}>
                  <GalleryCard item={item} globalIndex={globalIndex} onOpen={setLightbox} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* ── DESIGN ELEMENTS ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-24 border-t border-border pt-16">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-accent whitespace-nowrap">Design Elements</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {DESIGN_ELEMENTS.map((item, i) => (
            <GalleryCard key={i} item={item} globalIndex={DEITIES.length + i} onOpen={setLightbox} />
          ))}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-primary/97 flex items-center justify-center p-4 md:p-10 overflow-y-auto"
            onClick={close}
          >
            <button onClick={close} className="fixed top-6 right-6 text-primary-foreground/50 hover:text-primary-foreground z-10 w-11 h-11 flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="fixed left-3 md:left-6 top-1/2 -translate-y-1/2 text-primary-foreground/50 hover:text-primary-foreground z-10 w-11 h-11 flex items-center justify-center">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div key={lightbox}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl flex flex-col md:flex-row gap-8 items-start my-16 md:my-0"
              onClick={e => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative w-full md:w-80 shrink-0">
                <svg className="absolute -top-4 left-0 right-0 w-full pointer-events-none z-10 opacity-15"
                  height="40" viewBox="0 0 400 40" preserveAspectRatio="none" fill="none">
                  <path d="M0 20 Q200 0 400 20" stroke="hsl(var(--accent))" strokeWidth="1" fill="none"/>
                  <line x1="0" y1="20" x2="0" y2="40" stroke="hsl(var(--accent))" strokeWidth="1"/>
                  <line x1="400" y1="20" x2="400" y2="40" stroke="hsl(var(--accent))" strokeWidth="1"/>
                </svg>
                <div className="border border-accent/20 overflow-hidden relative">
                  <img src={current.url} alt={current.name} className="w-full object-cover" />
                  {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r','bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((cls,i)=>(
                    <div key={i} className={`absolute w-4 h-4 border-accent/40 ${cls}`}/>
                  ))}
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 py-2">
                <span className="font-body text-[9px] tracking-[0.35em] uppercase text-accent/70">{current.domain}</span>
                <h2 className="font-display text-3xl md:text-4xl font-light text-primary-foreground italic mt-1 leading-tight">{current.name}</h2>
                {current.title && <p className="font-body text-[10px] tracking-[0.3em] uppercase text-accent mt-1.5 mb-6">{current.title}</p>}
                <div className="fluted-divider w-12 mb-6 opacity-20" />
                <p className="font-body text-sm text-primary-foreground/70 leading-relaxed">{current.story}</p>
                <p className="font-body text-[9px] tracking-[0.2em] uppercase text-primary-foreground/25 mt-8">{current.caption}</p>
                <p className="font-body text-[9px] text-primary-foreground/15 mt-1">{lightbox + 1} / {ALL_ITEMS.length}</p>
              </div>
            </motion.div>

            <button onClick={(e) => { e.stopPropagation(); next(); }} className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 text-primary-foreground/50 hover:text-primary-foreground z-10 w-11 h-11 flex items-center justify-center">
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}