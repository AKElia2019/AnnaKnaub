import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const MATERIAL_LABEL = {
  Gold: { tag: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-400' },
  Silver: { tag: 'bg-slate-50 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
  Platinum: { tag: 'bg-zinc-50 text-zinc-600 border-zinc-200', dot: 'bg-zinc-400' },
};

export default function ProductCard({ product, onAddToCart }) {
  const style = MATERIAL_LABEL[product.material] || MATERIAL_LABEL.Gold;

  return (
    <div className="group border border-border hover:border-accent/60 transition-colors duration-300 bg-card flex flex-col">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {/* Corner marks */}
        {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((cls, i) => (
          <div key={i} className={`absolute w-3 h-3 border-accent/50 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${cls}`} />
        ))}
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
        />
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 border text-[9px] tracking-[0.2em] uppercase font-body ${style.tag}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          {product.material}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="font-display text-lg font-light italic text-foreground leading-tight">{product.name}</p>
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">{product.weight_oz} troy oz</p>
        {product.description && (
          <p className="font-body text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">{product.description}</p>
        )}
        <div className="mt-auto pt-4 flex items-end justify-between">
          <p className="font-display text-xl font-light text-foreground">
            ${product.price_usd.toLocaleString()}
          </p>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.2em] uppercase px-3 py-2 border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
          >
            <Plus className="w-3 h-3" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}