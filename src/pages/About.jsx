import React from 'react';
import { motion } from 'framer-motion';
import SiteNavbar from '@/components/blog/SiteNavbar';
import SiteFooter from '@/components/blog/SiteFooter';
import NewsletterInline from '@/components/blog/NewsletterInline';

const STATUE_IMG = 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/58effd276_generated_image.png';
const ABUNDANCE_IMG = 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/31c716472_generated_image.png';

const values = [
  { title: 'Clarity over complexity', body: 'Finance is complicated enough. My job is to make it simple, actionable, and human.' },
  { title: 'Long-term thinking', body: 'Wealth isn\'t built in a day. I believe in slow, steady, compounding progress over quick wins.' },
  { title: 'No-nonsense honesty', body: 'I share what works and what doesn\'t — including my own mistakes. No sponsored fluff.' },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22,1,0.36,1] } } };

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 40%, hsla(38,42%,52%,0.06) 0%, transparent 60%)' }} />
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.span variants={item} className="font-body text-xs tracking-[0.35em] uppercase text-accent block mb-4">
              About Anna
            </motion.span>
            <motion.h1 variants={item} className="font-display font-light text-foreground leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)' }}>
              Hi, I'm Anna.<br /><span className="italic text-accent">I write about money.</span>
            </motion.h1>
            <motion.div variants={item} className="w-20 h-px mb-8" style={{ background: 'repeating-linear-gradient(90deg, hsl(var(--border)) 0px, hsl(var(--border)) 0.5px, transparent 0.5px, transparent 8px)' }} />
            <motion.div variants={item} className="space-y-5 font-body text-[17px] leading-[1.8] text-muted-foreground">
              <p>
                I started annaknaub.com because I was tired of financial content that either talked down to you or tried to sell you something. Real personal finance is messy, personal, and — when done right — genuinely life-changing.
              </p>
              <p>
                I cover everything from the basics of budgeting to deep dives on index funds, from FIRE math to the psychology of spending. My readers are people who want to take their financial lives seriously without losing themselves in spreadsheets.
              </p>
              <p>
                When I'm not writing, I'm probably reading, hiking, or arguing about the merits of index funds at dinner parties.
              </p>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.22,1,0.36,1] }}
            className="relative">
            <div className="border border-border/50 overflow-hidden" style={{ borderRadius: '50% 50% 0 0 / 20% 20% 0 0' }}>
              <img src={STATUE_IMG} alt="Anna Knaub" className="w-full object-cover" style={{ aspectRatio: '4/5' }} />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-4 shadow-lg">
              <p className="font-display text-lg font-light">Est. 2019</p>
              <p className="font-body text-[9px] tracking-widest uppercase opacity-60">Writing about money</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20 border-t border-border">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-body text-xs tracking-[0.35em] uppercase text-accent">What I Believe</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
              className="border border-border p-8 hover:border-accent transition-colors duration-300">
              <div className="w-8 h-px bg-accent mb-5" />
              <h3 className="font-display text-xl font-light text-foreground mb-3 italic">{v.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Secondary image section */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <img src={ABUNDANCE_IMG} alt="Abundance and growth" className="w-full object-cover border border-border/40 shadow-[0_16px_60px_rgba(0,0,0,0.07)]" style={{ aspectRatio: '5/4' }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}>
            <span className="font-body text-xs tracking-[0.35em] uppercase text-accent block mb-4">The Mission</span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground leading-tight mb-6">
              Financial freedom<br /><span className="italic">for real people.</span>
            </h2>
            <p className="font-body text-[17px] leading-[1.8] text-muted-foreground mb-6">
              Every article I write is aimed at one thing: helping you feel more confident and in control of your money. Whether you're just starting out or optimising an already-solid financial life, there's something here for you.
            </p>
            <a href="/newsletter" className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-body text-xs tracking-[0.25em] uppercase px-7 py-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
              Join the Newsletter
            </a>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
        <NewsletterInline />
      </div>

      <SiteFooter />
    </div>
  );
}