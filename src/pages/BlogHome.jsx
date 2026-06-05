import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SiteNavbar from '@/components/blog/SiteNavbar';
import SiteFooter from '@/components/blog/SiteFooter';
import PostCard from '@/components/blog/PostCard';
import NewsletterInline from '@/components/blog/NewsletterInline';
import { base44 } from '@/api/base44Client';

const HERO_IMG = 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/096268133_generated_image.png';
const COIN_IMG = 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/b67815ce7_generated_image.png';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22,1,0.36,1] } } };

export default function BlogHome() {
  const [posts, setPosts] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    base44.entities.BlogPost.filter({ published: true }, '-created_date', 20).then(setPosts);
  }, []);

  const featured = posts.find(p => p.featured) || posts[0];
  const rest = posts.filter(p => p !== featured).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-background pt-20">
        <div className="absolute pointer-events-none" style={{ top: '8%', left: '50%', transform: 'translateX(-50%)', width: '70vw', height: '70vw', maxWidth: 800, background: 'radial-gradient(ellipse at center, hsla(38,42%,52%,0.07) 0%, transparent 65%)' }} />

        <div className="flex-1 max-w-6xl mx-auto w-full px-6 md:px-10 flex flex-col justify-center py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Typography */}
            <motion.div variants={stagger} initial="hidden" animate={mounted ? 'visible' : 'hidden'}
              className="lg:col-span-6 flex flex-col gap-7 order-2 lg:order-1">
              <motion.div variants={item} className="flex items-center gap-4">
                <span className="block w-8 h-px bg-accent" />
                <span className="font-body text-xs tracking-[0.35em] uppercase text-accent">Finance · Wealth · Life</span>
              </motion.div>

              <motion.h1 variants={item} className="font-display font-light leading-[0.9] tracking-tight text-foreground" style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)' }}>
                Money,<br /><span className="italic text-accent">Demystified.</span>
              </motion.h1>

              <motion.div variants={item}>
                <div className="w-24 h-px" style={{ background: 'repeating-linear-gradient(90deg, hsl(var(--border)) 0px, hsl(var(--border)) 0.5px, transparent 0.5px, transparent 8px)' }} />
              </motion.div>

              <motion.p variants={item} className="font-body text-[17px] leading-[1.75] text-muted-foreground max-w-[400px]">
                Anna Knaub writes about personal finance, investing, and building real wealth — with clarity, honesty, and zero jargon.
              </motion.p>

              <motion.div variants={item} className="flex flex-wrap gap-4">
                <a href="/blog" className="bg-primary text-primary-foreground font-body text-xs tracking-[0.25em] uppercase px-7 py-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300 min-h-[44px] flex items-center">
                  Read the Blog
                </a>
                <a href="/newsletter" className="border-b border-accent font-body text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center pb-0.5">
                  Get the Newsletter
                </a>
              </motion.div>
            </motion.div>

            {/* Hero image composition */}
            <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2">
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease: [0.22,1,0.36,1], delay: 0.1 }} className="relative w-full max-w-[480px] mx-auto">
                <div className="absolute inset-0 border border-border/50 pointer-events-none" style={{ borderRadius: '50% 50% 0 0 / 22% 22% 0 0' }} />
                <img src={HERO_IMG} alt="Finance illustration" className="w-full object-cover shadow-[0_24px_80px_rgba(0,0,0,0.09)]" style={{ aspectRatio: '4/5', borderRadius: '50% 50% 0 0 / 22% 22% 0 0' }} />

                {/* Floating card */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 1.3 }}
                  className="absolute -bottom-5 -left-5 md:-left-10 bg-background border border-border p-3 shadow-lg w-28 md:w-32">
                  <img src={COIN_IMG} alt="" className="w-full h-20 object-cover" />
                  <p className="font-body text-[9px] tracking-widest uppercase text-muted-foreground mt-1.5 text-center">Timeless Beauty</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 1.5 }}
                  className="absolute top-6 -right-3 md:-right-6 bg-primary text-primary-foreground px-4 py-3 shadow-lg">
                  <p className="font-display text-lg font-light">annaknaub</p>
                  <p className="font-body text-[8px] tracking-[0.2em] uppercase opacity-60 mt-0.5">.com</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="h-px bg-border opacity-40 mx-6 md:mx-10" />
      </section>

      {/* ── FEATURED POST ── */}
      {featured && (
        <section className="max-w-6xl mx-auto px-6 md:px-10 py-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-body text-xs tracking-[0.35em] uppercase text-accent">Featured</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <PostCard post={featured} index={0} featured={true} />
        </section>
      )}

      {/* ── LATEST POSTS ── */}
      {rest.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 md:px-10 pb-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-body text-xs tracking-[0.35em] uppercase text-accent">Latest</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
          </div>
        </section>
      )}

      {/* ── NEWSLETTER ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
        <NewsletterInline />
      </section>

      <SiteFooter />
    </div>
  );
}