import React from 'react';
import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-2xl tracking-widest mb-3">ANNA KNAUB</h3>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              Personal finance, investing, and building wealth that lasts — for real people living real lives.
            </p>
          </div>
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/40 mb-4">Explore</p>
            <div className="space-y-3">
              {[['Home', '/'], ['Blog', '/blog'], ['About', '/about'], ['Newsletter', '/newsletter']].map(([label, href]) => (
                <Link key={href} to={href} className="block font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/40 mb-4">Categories</p>
            <div className="space-y-3">
              {['Personal Finance', 'Investing', 'FIRE', 'Market Analysis', 'Wealth Building'].map((c) => (
                <Link key={c} to={`/blog?category=${encodeURIComponent(c)}`} className="block font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="fluted-divider w-full my-10 opacity-20" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Anna Knaub. All rights reserved.
          </p>
          <p className="font-body text-xs text-primary-foreground/40 italic">
            Not financial advice. For educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}