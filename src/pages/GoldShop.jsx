import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import SiteNavbar from '@/components/blog/SiteNavbar';
import SiteFooter from '@/components/blog/SiteFooter';
import { FloralDivider } from '@/components/blog/FloralDivider';
import ProductCard from '@/components/shop/ProductCard';
import CartDrawer from '@/components/shop/CartDrawer';
import CheckoutModal from '@/components/shop/CheckoutModal';

const SAMPLE_PRODUCTS = [
  { id: 's1', name: '1 oz Gold Bar', material: 'Gold', weight_oz: 1, price_usd: 2350, image_url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&q=80', in_stock: true, description: 'Fine .9999 gold bar, assayed and certified.' },
  { id: 's2', name: '5 oz Gold Bar', material: 'Gold', weight_oz: 5, price_usd: 11500, image_url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&q=80', in_stock: true, description: 'Investment-grade 5 troy ounce gold bar.' },
  { id: 's3', name: '10 oz Gold Bar', material: 'Gold', weight_oz: 10, price_usd: 22800, image_url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&q=80', in_stock: true, description: 'Premium 10 troy ounce gold bar, ideal for serious investors.' },
  { id: 's4', name: '1 oz Silver Bar', material: 'Silver', weight_oz: 1, price_usd: 32, image_url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&q=80', in_stock: true, description: '.999 fine silver bar, individually packaged.' },
  { id: 's5', name: '10 oz Silver Bar', material: 'Silver', weight_oz: 10, price_usd: 295, image_url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&q=80', in_stock: true, description: 'Pure .999 silver, 10 troy ounces.' },
  { id: 's6', name: '100 oz Silver Bar', material: 'Silver', weight_oz: 100, price_usd: 2850, image_url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&q=80', in_stock: true, description: '100 oz silver bar — a vault staple.' },
  { id: 's7', name: '1 oz Platinum Bar', material: 'Platinum', weight_oz: 1, price_usd: 1020, image_url: 'https://images.unsplash.com/photo-1531170605939-e28c2a31b2f2?w=600&q=80', in_stock: true, description: '.9995 fine platinum bar, certified and sealed.' },
  { id: 's8', name: '5 oz Platinum Bar', material: 'Platinum', weight_oz: 5, price_usd: 4950, image_url: 'https://images.unsplash.com/photo-1531170605939-e28c2a31b2f2?w=600&q=80', in_stock: true, description: 'Investment-grade 5 oz platinum bar.' },
];

export default function GoldShop() {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Gold', 'Silver', 'Platinum'];
  const filtered = activeFilter === 'All' ? products : products.filter(p => p.material === activeFilter);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i).filter(i => i.quantity > 0));
  };

  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const cartTotal = cart.reduce((sum, i) => sum + i.price_usd * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-accent block mb-4">The Collection</span>
            <h1 className="font-display font-light text-foreground leading-tight mb-4" style={{ fontSize: 'clamp(2.4rem,5vw,4.5rem)' }}>
              Precious Metals <span className="italic text-accent">Boutique</span>
            </h1>
            <FloralDivider className="my-4" />
            <p className="font-body text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Curated gold, silver, and platinum bars — each a tangible store of enduring value. Select your preferred weight and submit your purchase request.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters + Cart Button */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`font-body text-[9px] tracking-[0.25em] uppercase px-4 py-1.5 border transition-colors duration-200 ${
                  activeFilter === f ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-accent hover:text-foreground'
                }`}>
                {f}
              </button>
            ))}
          </div>
          <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 font-body text-[10px] tracking-[0.25em] uppercase px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
            <ShoppingCart className="w-3.5 h-3.5" />
            Request List
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[9px] flex items-center justify-center font-body">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filtered.map((product, i) => (
              <motion.div key={product.id} layout
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}>
                <ProductCard product={product} onAddToCart={addToCart} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <FloralDivider className="px-6 md:px-10" />
      <SiteFooter />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        total={cartTotal}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        total={cartTotal}
        onSuccess={() => { setCart([]); setCheckoutOpen(false); }}
      />
    </div>
  );
}