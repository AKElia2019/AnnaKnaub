import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const CATEGORY_COLORS = {
  'Personal Finance': 'text-accent',
  'Investing': 'text-foreground',
  'FIRE': 'text-accent',
  'Market Analysis': 'text-foreground',
  'Wealth Building': 'text-accent',
};

const FALLBACK_IMAGES = [
  'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/41a565a1c_generated_image.png',
  'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/58effd276_generated_image.png',
  'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/a5df5a72b_generated_image.png',
  'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/31c716472_generated_image.png',
];

export default function PostCard({ post, index = 0, featured = false }) {
  const image = post.cover_image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  const slug = post.slug || post.id;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group bg-card border border-border hover:border-accent transition-all duration-400 overflow-hidden ${featured ? 'md:flex md:gap-0' : ''}`}
    >
      <Link to={`/blog/${slug}`} className={`block overflow-hidden ${featured ? 'md:w-1/2 shrink-0' : ''}`}>
        <div className="overflow-hidden" style={{ aspectRatio: featured ? '4/3' : '3/2' }}>
          <img
            src={image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
          />
        </div>
      </Link>

      <div className={`p-6 md:p-8 flex flex-col justify-between ${featured ? 'md:p-10' : ''}`}>
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className={`font-body text-[10px] tracking-[0.3em] uppercase ${CATEGORY_COLORS[post.category] || 'text-accent'}`}>
              {post.category}
            </span>
            {post.read_time && (
              <>
                <span className="text-border">·</span>
                <span className="flex items-center gap-1 font-body text-[10px] text-muted-foreground">
                  <Clock className="w-3 h-3" /> {post.read_time} min read
                </span>
              </>
            )}
          </div>
          <Link to={`/blog/${slug}`}>
            <h2 className={`font-display font-light text-foreground hover:text-accent transition-colors leading-tight mb-3 ${featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
              {post.title}
            </h2>
          </Link>
          <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
        <div className="mt-6">
          <Link
            to={`/blog/${slug}`}
            className="font-body text-xs tracking-[0.2em] uppercase text-foreground border-b border-accent pb-0.5 hover:text-accent transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.article>
  );
}