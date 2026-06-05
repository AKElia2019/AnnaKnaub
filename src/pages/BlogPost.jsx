import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Clock, ArrowLeft } from 'lucide-react';
import SiteNavbar from '@/components/blog/SiteNavbar';
import SiteFooter from '@/components/blog/SiteFooter';
import NewsletterInline from '@/components/blog/NewsletterInline';
import { base44 } from '@/api/base44Client';

const FALLBACK_IMAGES = [
  'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/41a565a1c_generated_image.png',
  'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/58effd276_generated_image.png',
];

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      // Try by slug first, then by id
      let results = await base44.entities.BlogPost.filter({ slug });
      if (!results.length) results = await base44.entities.BlogPost.filter({ id: slug });
      setPost(results[0] || null);
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-border border-t-accent rounded-full animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <p className="font-display text-3xl font-light text-muted-foreground italic">Article not found.</p>
      <Link to="/blog" className="font-body text-xs tracking-widest uppercase text-accent border-b border-accent pb-0.5">Back to Blog</Link>
    </div>
  );

  const image = post.cover_image || FALLBACK_IMAGES[0];

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      {/* Cover */}
      <div className="relative pt-20 overflow-hidden">
        <div className="relative h-[50vh] md:h-[60vh] max-h-[600px]">
          <img src={image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 md:px-10 -mt-24 relative z-10 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Link to="/blog" className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-3 h-3" /> Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-accent">{post.category}</span>
            {post.read_time && (
              <>
                <span className="text-border">·</span>
                <span className="flex items-center gap-1 font-body text-[10px] text-muted-foreground">
                  <Clock className="w-3 h-3" /> {post.read_time} min read
                </span>
              </>
            )}
          </div>

          <h1 className="font-display font-light text-foreground leading-tight mb-6" style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)' }}>
            {post.title}
          </h1>

          <div className="w-16 h-px bg-accent mb-8" />

          <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10 italic">
            {post.excerpt}
          </p>

          <div className="prose prose-lg max-w-none font-body text-foreground prose-headings:font-display prose-headings:font-light prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </motion.div>
      </article>

      {/* Newsletter */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 pb-24">
        <NewsletterInline />
      </div>

      <SiteFooter />
    </div>
  );
}