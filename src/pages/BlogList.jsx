import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SiteNavbar from '@/components/blog/SiteNavbar';
import SiteFooter from '@/components/blog/SiteFooter';
import PostCard from '@/components/blog/PostCard';
import NewsletterInline from '@/components/blog/NewsletterInline';
import { base44 } from '@/api/base44Client';

const CATEGORIES = ['All', 'Personal Finance', 'Investing', 'FIRE', 'Market Analysis', 'Wealth Building'];

const ARCH_IMG = 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/cf24cb86a_generated_image.png';

export default function BlogList() {
  const location = useLocation();
  const urlCategory = new URLSearchParams(location.search).get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(urlCategory);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const filter = { published: true };
    if (activeCategory !== 'All') filter.category = activeCategory;
    base44.entities.BlogPost.filter(filter, '-created_date', 50).then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      {/* Page header */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 max-w-sm opacity-20 pointer-events-none hidden lg:block">
          <img src={ARCH_IMG} alt="" className="w-full h-full object-cover object-left" />
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-10 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-body text-xs tracking-[0.35em] uppercase text-accent block mb-4">The Archive</span>
            <h1 className="font-display font-light text-foreground leading-tight mb-4" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)' }}>
              All <span className="italic">Articles</span>
            </h1>
            <div className="w-20 h-px" style={{ background: 'repeating-linear-gradient(90deg, hsl(var(--border)) 0px, hsl(var(--border)) 0.5px, transparent 0.5px, transparent 8px)' }} />
          </motion.div>
        </div>
      </div>

      {/* Category filter */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 mb-12">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-[10px] tracking-[0.25em] uppercase px-4 py-2 border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-accent hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-card border border-border animate-pulse" style={{ aspectRatio:'3/2.5' }} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-3xl font-light text-muted-foreground italic">No articles yet in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
          </div>
        )}
      </div>

      {/* Newsletter */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
        <NewsletterInline />
      </div>

      <SiteFooter />
    </div>
  );
}