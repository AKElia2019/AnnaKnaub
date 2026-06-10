import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Shop', href: '/gold-shop' },
  { label: 'About', href: '/gold-about' },
  { label: 'My Account', href: '/client-portal' },
];

export default function ShopNav({ cartCount = 0, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-20">
          <Link to="/gold-shop" className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-[0.18em] text-primary">AURUM</span>
            <span className="font-body text-[8px] tracking-[0.4em] uppercase text-muted-foreground">Precious Metals</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(l => (
              <Link key={l.href} to={l.href}
                className={`font-body text-xs tracking-[0.25em] uppercase transition-colors duration-300 ${
                  location.pathname === l.href ? 'text-accent border-b border-accent pb-0.5' : 'text-muted-foreground hover:text-foreground'
                }`}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={onCartOpen}
              className="relative flex items-center gap-1.5 font-body text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-accent-foreground text-[8px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 flex items-center justify-center">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-background border-b border-border px-6 py-6 space-y-4">
            {navLinks.map(l => (
              <Link key={l.href} to={l.href} onClick={() => setMobileOpen(false)}
                className="block font-display text-lg tracking-wider text-foreground hover:text-accent transition-colors">
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}