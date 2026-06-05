import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function NewsletterInline({ dark = false }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.entities.NewsletterSubscriber.create({ email, first_name: firstName });
    setDone(true);
    setSubmitting(false);
    toast.success("You're on the list!");
  };

  const bg = dark ? 'bg-primary text-primary-foreground' : 'bg-secondary';
  const labelColor = dark ? 'text-primary-foreground/60' : 'text-muted-foreground';
  const inputClass = dark
    ? 'bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:ring-accent'
    : 'bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-accent';

  if (done) {
    return (
      <div className={`${bg} px-8 py-10 text-center`}>
        <p className={`font-display text-2xl font-light ${dark ? 'text-primary-foreground' : 'text-foreground'}`}>Welcome aboard.</p>
        <p className={`font-body text-sm mt-2 ${labelColor}`}>Check your inbox for a welcome note.</p>
      </div>
    );
  }

  return (
    <div className={`${bg} px-8 py-10`}>
      <p className={`font-body text-[10px] tracking-[0.35em] uppercase mb-2 ${labelColor}`}>Free Newsletter</p>
      <h3 className={`font-display text-2xl md:text-3xl font-light mb-1 ${dark ? 'text-primary-foreground' : 'text-foreground'}`}>
        Wealth, clearly explained.
      </h3>
      <p className={`font-body text-sm mb-6 leading-relaxed max-w-sm ${labelColor}`}>
        Weekly insights on personal finance, investing, and building lasting wealth — no fluff.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          className={`border h-11 px-4 font-body text-sm flex-1 focus:outline-none focus:ring-2 ${inputClass}`}
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className={`border h-11 px-4 font-body text-sm flex-1 focus:outline-none focus:ring-2 ${inputClass}`}
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-accent text-accent-foreground font-body text-xs tracking-[0.25em] uppercase px-6 h-11 hover:bg-primary hover:text-primary-foreground transition-colors duration-300 whitespace-nowrap disabled:opacity-50"
        >
          {submitting ? 'Joining...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}