import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand */}
          <div>
            <h3 className="font-display text-3xl tracking-wider mb-4">ELIA</h3>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              Investment advisors cultivating legacies
              that flourish for generations.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/40 mb-4">
              Navigate
            </p>
            <div className="space-y-3">
              {['Philosophy', 'Performance', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors min-h-[44px] flex items-center"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/40 mb-4">
              Legal
            </p>
            <div className="space-y-3">
              <p className="font-body text-sm text-primary-foreground/70">
                Elia Investment Advisors S.A.
              </p>
              <p className="font-body text-sm text-primary-foreground/70">
                Licensed by the Hellenic Capital Market Commission
              </p>
            </div>
          </div>
        </div>

        <div className="fluted-divider w-full my-12 opacity-20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Elia Investment Advisors. All rights reserved.
          </p>
          <p className="font-body text-xs text-primary-foreground/40 italic">
            Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}