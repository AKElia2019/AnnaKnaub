import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import BlossomFlower from './BlossomFlower';

const MATERIAL_STYLE = {
  Gold:     { badge: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-400', glow: 'hover:shadow-amber-100' },
  Silver:   { badge: 'bg-slate-50 text-slate-600 border-slate-200', dot: 'bg-slate-400', glow: 'hover:shadow-slate-100' },
  Platinum: { badge: 'bg-zinc-50 text-zinc-600 border-zinc-200',   dot: 'bg-zinc-400',  glow: 'hover:shadow-zinc-100' },
};

export default function GoldProductCard({ product, onAddToCart, index = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const style = MATERIAL_STYLE[product.material] || MATERIAL_STYLE.Gold;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative border border-border hover:border-accent/70 transition-all duration-500 bg-card flex flex-col overflow-hidden shadow-sm hover:shadow-xl ${style.glow}`}
    >
      {/* Bloom decoration - appears on hover */}
      <div className="absolute -top-6 -right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10">
        <BlossomFlower size={60} delay={0} variant="rose" />
      </div>

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r','bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((cls, i) => (
          <div key={i} className={`absolute w-3 h-3 border-accent/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${cls}`} />
        ))}

        <motion.img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7 }}
        />

        {/* Marble overlay shimmer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, hsla(42,58%,80%,0.4) 0%, transparent 50%, hsla(155,28%,80%,0.3) 100%)' }} />

        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 border text-[9px] tracking-[0.2em] uppercase font-body ${style.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          {product.material}
        </div>

        {product.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-primary/90 text-primary-foreground text-[8px] tracking-[0.2em] uppercase font-body">
            <Star className="w-2.5 h-2.5" />
            Featured
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <motion.p
          className="font-display text-xl font-light italic text-foreground leading-tight"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.08 + 0.2 }}
        >
          {product.name}
        </motion.p>
        <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">{product.weight_oz} troy oz</p>
        {product.description && (
          <p className="font-body text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">{product.description}</p>
        )}

        {/* Purity tag */}
        <div className="mt-3 flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="font-body text-[8px] tracking-[0.3em] uppercase text-muted-foreground/60">
            {product.material === 'Gold' ? '.9999 Fine' : product.material === 'Silver' ? '.999 Fine' : '.9995 Fine'}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            <p className="font-display text-2xl font-light text-foreground">${product.price_usd.toLocaleString()}</p>
            <p className="font-body text-[9px] text-muted-foreground/60 tracking-wide">USD · spot rate</p>
          </div>
          <motion.button
            onClick={() => onAddToCart(product)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.2em] uppercase px-4 py-2.5 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
          >
            <Plus className="w-3 h-3" />
            Add
          </motion.button>
        </div>
      </div>

      {/* Bottom floral accent line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}