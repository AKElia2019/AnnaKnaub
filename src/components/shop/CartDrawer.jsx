import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';

export default function CartDrawer({ open, onClose, cart, onUpdateQty, onRemove, total, onCheckout }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/40 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-background border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div>
                <p className="font-body text-[9px] tracking-[0.35em] uppercase text-muted-foreground">Your</p>
                <h2 className="font-display text-xl font-light italic text-foreground">Request List</h2>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <ShoppingCart className="w-8 h-8 text-muted-foreground/40" />
                  <p className="font-display text-lg italic text-muted-foreground">Your list is empty</p>
                  <p className="font-body text-xs text-muted-foreground/60">Add bars from the collection to begin your request.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-border last:border-0">
                    <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover border border-border flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm italic text-foreground leading-tight">{item.name}</p>
                      <p className="font-body text-[9px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">{item.weight_oz} oz · {item.material}</p>
                      <p className="font-display text-sm text-foreground mt-1">${(item.price_usd * item.quantity).toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="w-6 h-6 border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-body text-xs w-4 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="w-6 h-6 border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                        <button onClick={() => onRemove(item.id)} className="ml-auto text-muted-foreground hover:text-destructive transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-border space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Estimated Total</span>
                  <span className="font-display text-2xl font-light text-foreground">${total.toLocaleString()}</span>
                </div>
                <p className="font-body text-[10px] text-muted-foreground/60 leading-relaxed">
                  Final pricing confirmed upon order review. Prices reflect spot rates at time of submission.
                </p>
                <button
                  onClick={onCheckout}
                  className="w-full font-body text-[10px] tracking-[0.3em] uppercase py-3 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                >
                  Proceed to Details
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}