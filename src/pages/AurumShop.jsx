import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sparkles, Shield, Truck, Award } from 'lucide-react';
import ShopNav from '@/components/shop/ShopNav';
import GoldProductCard from '@/components/shop/GoldProductCard';
import GoldCartDrawer from '@/components/shop/GoldCartDrawer';
import GoldCheckoutModal from '@/components/shop/GoldCheckoutModal';
import BlossomFlower from '@/components/shop/BlossomFlower';
import FallingPetals from '@/components/shop/FallingPetals';
import { FloralDivider } from '@/components/blog/FloralDivider';

const PRODUCTS = [
  { id: 'g1', name: '1 oz Gold Bar', material: 'Gold', weight_oz: 1, price_usd: 2350, image_url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&q=80', in_stock: true, description: 'Fine .9999 gold bar, individually assayed and sealed.', featured: true },
  { id: 'g2', name: '5 oz Gold Bar', material: 'Gold', weight_oz: 5, price_usd: 11500, image_url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&q=80', in_stock: true, description: 'Investment-grade 5 troy ounce gold bar.' },
  { id: 'g3', name: '10 oz Gold Bar', material: 'Gold', weight_oz: 10, price_usd: 22800, image_url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&q=80', in_stock: true, description: 'Premium 10 oz gold bar — ideal for substantial positions.' },
  { id: 'g4', name: '1 kg Gold Bar', material: 'Gold', weight_oz: 32.15, price_usd: 75500, image_url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&q=80', in_stock: true, description: 'Professional 1 kilogram gold bar, vault-ready.' },
  { id: 's1', name: '1 oz Silver Bar', material: 'Silver', weight_oz: 1, price_usd: 32, image_url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&q=80', in_stock: true, description: '.999 fine silver bar, individually packaged.' },
  { id: 's2', name: '10 oz Silver Bar', material: 'Silver', weight_oz: 10, price_usd: 295, image_url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&q=80', in_stock: true, description: 'Pure .999 silver, 10 troy ounces.' },
  { id: 's3', name: '100 oz Silver Bar', material: 'Silver', weight_oz: 100, price_usd: 2850, image_url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&q=80', in_stock: true, description: '100 oz silver — the vault staple.', featured: true },
  { id: 'p1', name: '1 oz Platinum Bar', material: 'Platinum', weight_oz: 1, price_usd: 1020, image_url: 'https://images.unsplash.com/photo-1531170605939-e28c2a31b2f2?w=600&q=80', in_stock: true, description: '.9995 fine platinum bar, certified and sealed.' },
  { id: 'p2', name: '5 oz Platinum Bar', material: 'Platinum', weight_oz: 5, price_usd: 4950, image_url: 'https://images.unsplash.com/photo-1531170605939-e28c2a31b2f2?w=600&q=80', in_stock: true, description: 'Investment-grade 5 oz platinum bar.' },
];

const PERKS = [
  { icon: Shield, label: 'Insured Vault Storage', desc: 'Every bar is stored under full insurance until delivery.' },
  { icon: Truck, label: 'Secure Delivery', desc: 'Discreet, trackable, insured shipping worldwide.' },
  { icon: Award, label: 'Certified Authenticity', desc: 'All metals are assayed and come with certificates.' },
  { icon: Sparkles, label: 'White-Glove Service', desc: 'A dedicated specialist handles every order personally.' },
];

function PerksRow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section ref={ref} className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PERKS.map((p, i) => (
          <motion.div key={p.label}
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group flex flex-col items-start gap-3 p-6 border border-border hover:border-accent/50 transition-colors duration-300 bg-card">
            <div className="w-9 h-9 border border-accent/40 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
              <p.icon className="w-4 h-4" />
            </div>
            <p className="font-display text-base italic text-foreground">{p.label}</p>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ label, title, sub, flowerVariant = 'rose' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex items-center gap-6 mb-10">
      <motion.div initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}>
        <BlossomFlower size={48} delay={0.1} variant={flowerVariant} />
      </motion.div>
      <div>
        <span className="font-body text-[9px] tracking-[0.4em] uppercase text-accent">{label}</span>
        <h2 className="font-display text-2xl font-light italic text-foreground">{title}</h2>
        {sub && <p className="font-body text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

export default function AurumShop() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      return ex ? prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i) : [...prev, { ...p, quantity: 1 }];
    });
    setCartOpen(true);
  };
  const updateQty = (id, d) => setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + d) } : i));
  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const cartTotal = cart.reduce((s, i) => s + i.price_usd * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const filters = ['All', 'Gold', 'Silver', 'Platinum'];
  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.material === filter);
  const byMaterial = { Gold: filtered.filter(p=>p.material==='Gold'), Silver: filtered.filter(p=>p.material==='Silver'), Platinum: filtered.filter(p=>p.material==='Platinum') };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <FallingPetals count={14} />
      <ShopNav cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Green bg panel */}
        <div className="absolute inset-0 green-bg opacity-95" />
        <div className="absolute inset-0 marble-bg opacity-20" />

        {/* Decorative blossoms */}
        <div className="absolute top-16 left-8 opacity-30 pointer-events-none">
          <BlossomFlower size={120} delay={0.8} variant="peony" />
        </div>
        <div className="absolute bottom-16 right-8 opacity-30 pointer-events-none">
          <BlossomFlower size={100} delay={1.0} variant="rose" />
        </div>
        <div className="absolute top-1/3 right-16 opacity-20 pointer-events-none hidden lg:block">
          <BlossomFlower size={80} delay={1.2} variant="lotus" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <span className="font-body text-[10px] tracking-[0.5em] uppercase text-accent/80 block mb-6">Est. Since Antiquity</span>
            <h1 className="font-display font-light text-primary-foreground leading-[1.1] mb-6"
              style={{ fontSize: 'clamp(3rem,7vw,6rem)' }}>
              Aurum<br /><span className="italic text-accent">Precious Metals</span>
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-accent/40" />
              <BlossomFlower size={32} delay={1.4} variant="rose" />
              <div className="h-px w-16 bg-accent/40" />
            </div>
            <p className="font-body text-sm text-primary-foreground/60 max-w-md mx-auto leading-relaxed mb-10">
              Curated gold, silver &amp; platinum bars — each a timeless store of enduring wealth. Delivered with discretion and care.
            </p>
            <motion.button
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.03, backgroundColor: 'hsl(42,58%,48%)' }}
              whileTap={{ scale: 0.98 }}
              className="font-body text-[10px] tracking-[0.4em] uppercase px-10 py-4 border border-accent/60 text-accent hover:text-accent-foreground transition-all duration-300"
            >
              Explore the Collection
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* ── PERKS ── */}
      <PerksRow />

      <FloralDivider className="px-6 md:px-10" />

      {/* ── COLLECTION ── */}
      <section id="collection" className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <SectionHeader label="The Collection" title="Precious Metals" flowerVariant="peony" />
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map(f => (
            <motion.button key={f} onClick={() => setFilter(f)}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className={`font-body text-[9px] tracking-[0.3em] uppercase px-5 py-2 border transition-all duration-200 ${
                filter === f ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-accent hover:text-foreground'
              }`}>
              {f}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Gold section */}
      {(filter === 'All' || filter === 'Gold') && byMaterial.Gold.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
          <SectionHeader label="Aurum" title="Gold Bars" sub="Fine .9999 gold" flowerVariant="rose" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {byMaterial.Gold.map((p, i) => <GoldProductCard key={p.id} product={p} onAddToCart={addToCart} index={i} />)}
          </div>
        </section>
      )}

      {/* Silver section */}
      {(filter === 'All' || filter === 'Silver') && byMaterial.Silver.length > 0 && (
        <>
          <FloralDivider className="px-6 md:px-10" />
          <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
            <SectionHeader label="Argentum" title="Silver Bars" sub="Fine .999 silver" flowerVariant="lotus" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {byMaterial.Silver.map((p, i) => <GoldProductCard key={p.id} product={p} onAddToCart={addToCart} index={i} />)}
            </div>
          </section>
        </>
      )}

      {/* Platinum section */}
      {(filter === 'All' || filter === 'Platinum') && byMaterial.Platinum.length > 0 && (
        <>
          <FloralDivider className="px-6 md:px-10" />
          <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
            <SectionHeader label="Platinum" title="Platinum Bars" sub="Fine .9995 platinum" flowerVariant="peony" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {byMaterial.Platinum.map((p, i) => <GoldProductCard key={p.id} product={p} onAddToCart={addToCart} index={i} />)}
            </div>
          </section>
        </>
      )}

      {/* ── CTA BANNER ── */}
      <section className="relative green-bg py-24 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none opacity-20">
          <BlossomFlower size={120} delay={0.3} variant="peony" />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none opacity-20 flex items-center justify-end pr-4">
          <BlossomFlower size={100} delay={0.5} variant="rose" />
        </div>
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <span className="font-body text-[9px] tracking-[0.5em] uppercase text-accent/80 block mb-4">White-Glove Service</span>
          <h2 className="font-display text-4xl font-light italic text-primary-foreground mb-4">Need Guidance?</h2>
          <p className="font-body text-sm text-primary-foreground/60 mb-8 leading-relaxed">
            Our specialists are available for bespoke consultations — portfolio sizing, storage options, and custom allocation strategies.
          </p>
          <a href="mailto:hello@aurum.com"
            className="inline-block font-body text-[10px] tracking-[0.4em] uppercase px-10 py-4 border border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-300">
            Contact a Specialist
          </a>
        </div>
      </section>

      <FloralDivider className="px-6 md:px-10" />

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-display text-xl tracking-[0.18em] text-primary">AURUM</span>
            <span className="font-body text-[8px] tracking-[0.4em] uppercase text-muted-foreground ml-3">Precious Metals</span>
          </div>
          <p className="font-body text-xs text-muted-foreground/50">© {new Date().getFullYear()} Aurum Precious Metals. All rights reserved.</p>
          <div className="flex gap-6">
            {['Shop', 'Client Portal', 'Admin'].map(l => (
              <a key={l} href={`/${l.toLowerCase().replace(' ','-')}`} className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>

      <GoldCartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart}
        onUpdateQty={updateQty} onRemove={removeItem} total={cartTotal}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }} />

      <GoldCheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)}
        cart={cart} total={cartTotal}
        onSuccess={() => { setCart([]); setCheckoutOpen(false); }} />
    </div>
  );
}