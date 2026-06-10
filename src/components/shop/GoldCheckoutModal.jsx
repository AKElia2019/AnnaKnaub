import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Leaf } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import BlossomFlower from './BlossomFlower';

const inp = "w-full font-body text-sm bg-background border border-border px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors duration-200";
const lbl = "font-body text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-1.5 block";

export default function GoldCheckoutModal({ open, onClose, cart, total, onSuccess }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '',
    address_line1: '', address_line2: '', city: '', state: '', postal_code: '', country: '',
    notes: ''
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const canProceed = form.full_name && form.email && form.address_line1 && form.city && form.postal_code && form.country;

  const handleSubmit = async () => {
    setLoading(true);
    await base44.entities.Order.create({
      ...form,
      items: cart.map(i => ({ product_id: i.id, product_name: i.name, material: i.material, weight_oz: i.weight_oz, quantity: i.quantity, price_usd: i.price_usd })),
      total_usd: total,
      status: 'pending',
    });
    setLoading(false);
    setStep(3);
  };

  const handleClose = () => {
    if (step === 3) onSuccess();
    else onClose();
    setTimeout(() => setStep(1), 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-primary/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-background border border-border my-8 overflow-hidden"
            onClick={e => e.stopPropagation()}>

            {/* Corner accents */}
            {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r','bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((cls,i)=>(
              <div key={i} className={`absolute w-5 h-5 border-accent/40 z-10 ${cls}`}/>
            ))}

            {/* Green top bar */}
            <div className="green-bg px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Leaf className="w-4 h-4 text-primary-foreground/60" />
                <span className="font-body text-[9px] tracking-[0.35em] uppercase text-primary-foreground/70">
                  {step === 1 ? 'Shipping Details' : step === 2 ? 'Review & Confirm' : 'Request Submitted'}
                </span>
              </div>
              <button onClick={handleClose} className="text-primary-foreground/50 hover:text-primary-foreground w-8 h-8 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-8 py-8">
              {/* Progress */}
              {step < 3 && (
                <div className="flex items-center gap-2 mb-8">
                  {[1, 2].map(s => (
                    <React.Fragment key={s}>
                      <div className={`flex items-center gap-2 ${step >= s ? 'text-foreground' : 'text-muted-foreground/40'}`}>
                        <div className={`w-6 h-6 border flex items-center justify-center font-body text-[9px] transition-colors duration-300 ${step >= s ? 'border-primary bg-primary text-primary-foreground' : 'border-border'}`}>{s}</div>
                        <span className="font-body text-[9px] tracking-[0.2em] uppercase hidden sm:inline">{s === 1 ? 'Details' : 'Confirm'}</span>
                      </div>
                      {s < 2 && <div className={`flex-1 h-px transition-colors duration-500 ${step > s ? 'bg-primary' : 'bg-border'}`} />}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <h2 className="font-display text-3xl font-light italic text-foreground mb-1">Your Details</h2>
                  <p className="font-body text-xs text-muted-foreground mb-6">We'll confirm and arrange secure delivery to your address.</p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className={lbl}>Full Name *</label><input className={inp} value={form.full_name} onChange={e=>set('full_name',e.target.value)} placeholder="Jane Smith" /></div>
                      <div><label className={lbl}>Email *</label><input className={inp} type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="jane@example.com" /></div>
                    </div>
                    <div><label className={lbl}>Phone</label><input className={inp} value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+1 555 000 0000" /></div>
                    <div className="fluted-divider opacity-50" />
                    <div><label className={lbl}>Address *</label><input className={inp} value={form.address_line1} onChange={e=>set('address_line1',e.target.value)} placeholder="123 Main Street" /></div>
                    <div><input className={inp} value={form.address_line2} onChange={e=>set('address_line2',e.target.value)} placeholder="Apt, suite, floor (optional)" /></div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-1"><label className={lbl}>City *</label><input className={inp} value={form.city} onChange={e=>set('city',e.target.value)} placeholder="New York" /></div>
                      <div><label className={lbl}>State</label><input className={inp} value={form.state} onChange={e=>set('state',e.target.value)} placeholder="NY" /></div>
                      <div><label className={lbl}>Post Code *</label><input className={inp} value={form.postal_code} onChange={e=>set('postal_code',e.target.value)} placeholder="10001" /></div>
                    </div>
                    <div><label className={lbl}>Country *</label><input className={inp} value={form.country} onChange={e=>set('country',e.target.value)} placeholder="United States" /></div>
                    <div><label className={lbl}>Notes</label><textarea className={`${inp} resize-none h-20`} value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Special handling or delivery instructions…" /></div>
                  </div>
                  <motion.button onClick={() => setStep(2)} disabled={!canProceed} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    className="mt-6 w-full font-body text-[10px] tracking-[0.35em] uppercase py-3.5 green-bg text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed">
                    Review Order →
                  </motion.button>
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <h2 className="font-display text-3xl font-light italic text-foreground mb-1">Confirm Request</h2>
                  <p className="font-body text-xs text-muted-foreground mb-6">Review your order before submitting.</p>

                  <div className="space-y-2 mb-5">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center py-2.5 border-b border-border/60 last:border-0">
                        <div>
                          <p className="font-display text-sm italic">{item.name}</p>
                          <p className="font-body text-[9px] tracking-[0.15em] uppercase text-muted-foreground">qty {item.quantity} · {item.material}</p>
                        </div>
                        <p className="font-display text-sm">${(item.price_usd * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-baseline py-3 border-y border-border mb-5">
                    <span className="font-body text-[9px] tracking-[0.3em] uppercase text-muted-foreground">Estimated Total</span>
                    <span className="font-display text-2xl">${total.toLocaleString()}</span>
                  </div>

                  <div className="marble-bg border border-border p-4 mb-5 text-xs font-body text-muted-foreground space-y-0.5">
                    <p className="text-foreground font-medium text-sm">{form.full_name}</p>
                    <p>{form.email}{form.phone ? ` · ${form.phone}` : ''}</p>
                    <p>{form.address_line1}{form.address_line2 ? `, ${form.address_line2}` : ''}</p>
                    <p>{[form.city, form.state, form.postal_code].filter(Boolean).join(', ')}</p>
                    <p>{form.country}</p>
                  </div>

                  <p className="font-body text-[10px] text-muted-foreground/60 mb-5 leading-relaxed">
                    No payment is taken at this stage. Our team will contact you within 24 hours to confirm pricing and arrange secure delivery.
                  </p>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 font-body text-[10px] tracking-[0.2em] uppercase py-3 border border-border text-muted-foreground hover:border-accent hover:text-foreground transition-colors">
                      ← Edit
                    </button>
                    <motion.button onClick={handleSubmit} disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                      className="flex-1 font-body text-[10px] tracking-[0.2em] uppercase py-3 green-bg text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50">
                      {loading ? 'Submitting…' : 'Submit Request'}
                    </motion.button>
                  </div>
                </>
              )}

              {/* STEP 3 — success */}
              {step === 3 && (
                <div className="flex flex-col items-center text-center py-8">
                  <BlossomFlower size={90} delay={0.1} variant="rose" className="mb-4" />
                  <h2 className="font-display text-3xl font-light italic text-foreground mb-2">Request Received</h2>
                  <div className="fluted-divider w-24 mx-auto my-3 opacity-40" />
                  <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs mt-2">
                    Thank you, <span className="text-foreground">{form.full_name.split(' ')[0]}</span>. We'll reach you at <span className="text-foreground">{form.email}</span> within 24 hours to confirm your order.
                  </p>
                  <motion.button onClick={handleClose} whileHover={{ scale: 1.02 }}
                    className="mt-8 font-body text-[10px] tracking-[0.35em] uppercase px-10 py-3.5 green-bg text-primary-foreground hover:opacity-90 transition-opacity">
                    Continue Shopping
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}