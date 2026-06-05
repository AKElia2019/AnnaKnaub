import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SiteNavbar from '@/components/blog/SiteNavbar';
import SiteFooter from '@/components/blog/SiteFooter';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

const HERO_IMG = 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/31c716472_generated_image.png';
const COIN_IMG = 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/a5df5a72b_generated_image.png';

const perks = [
  'Weekly insights on personal finance & investing',
  'Early access to new articles',
  'My favourite reads & tools each month',
  'Real talk — no sponsored content, ever',
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22,1,0.36,1] } } };

export default function Newsletter() {
  const [form, setForm] = useState({ first_name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.entities.NewsletterSubscriber.create(form);
    setDone(true);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      <section className="relative pt-36 pb-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, hsla(38,42%,52%,0.07) 0%, transparent 55%)' }} />

        <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Form */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span variants={item} className="font-body text-xs tracking-[0.35em] uppercase text-accent block mb-5">Free Newsletter</motion.span>
            <motion.h1 variants={item} className="font-display font-light text-foreground leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)' }}>
              Wealth, clearly<br /><span className="italic text-accent">explained.</span>
            </motion.h1>
            <motion.div variants={item} className="w-20 h-px mb-8" style={{ background: 'repeating-linear-gradient(90deg, hsl(var(--border)) 0px, hsl(var(--border)) 0.5px, transparent 0.5px, transparent 8px)' }} />

            <motion.ul variants={item} className="space-y-3 mb-10">
              {perks.map(perk => (
                <li key={perk} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-muted-foreground">{perk}</span>
                </li>
              ))}
            </motion.ul>

            {done ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-secondary border border-border p-8 text-center">
                <p className="font-display text-3xl font-light text-foreground italic mb-2">Welcome aboard.</p>
                <p className="font-body text-sm text-muted-foreground">Check your inbox — something good is on its way.</p>
              </motion.div>
            ) : (
              <motion.form variants={item} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-1.5">First Name</label>
                  <input
                    type="text"
                    value={form.first_name}
                    onChange={e => setForm(p => ({ ...p, first_name: e.target.value }))}
                    placeholder="Anna"
                    className="w-full h-12 px-4 border border-border bg-card font-body text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="anna@example.com"
                    required
                    className="w-full h-12 px-4 border border-border bg-card font-body text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-primary-foreground font-body text-xs tracking-[0.3em] uppercase py-4 hover:bg-accent hover:text-accent-foreground transition-colors duration-300 disabled:opacity-50"
                >
                  {submitting ? 'Subscribing...' : 'Subscribe — It\'s Free'}
                </button>
                <p className="font-body text-[10px] text-muted-foreground text-center">No spam. Unsubscribe anytime.</p>
              </motion.form>
            )}
          </motion.div>

          {/* Right — Image composition */}
          <div className="relative flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.22,1,0.36,1], delay: 0.3 }} className="relative w-full max-w-[420px] mx-auto">
              <div className="border border-border/50 overflow-hidden" style={{ borderRadius: '50% 50% 0 0 / 22% 22% 0 0' }}>
                <img src={HERO_IMG} alt="" className="w-full object-cover" style={{ aspectRatio: '4/5' }} />
              </div>
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 1.4 }}
                className="absolute -bottom-5 -left-5 md:-left-8 bg-background border border-border p-3 shadow-lg w-28">
                <img src={COIN_IMG} alt="" className="w-full h-20 object-cover" />
                <p className="font-body text-[9px] tracking-widest uppercase text-muted-foreground mt-1.5 text-center">Compound Now</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 1.6 }}
                className="absolute top-8 -right-3 md:-right-6 bg-primary text-primary-foreground px-4 py-3 shadow-lg">
                <p className="font-display text-lg font-light leading-none">Weekly</p>
                <p className="font-body text-[8px] tracking-[0.2em] uppercase opacity-60 mt-0.5">Finance Insights</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}