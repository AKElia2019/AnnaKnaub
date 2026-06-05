import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { FloralDivider } from '@/components/blog/FloralDivider';

const inputCls = "w-full font-body text-sm bg-background border border-border px-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors duration-200";
const labelCls = "font-body text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-1 block";

export default function CheckoutModal({ open, onClose, cart, total, onSuccess }) {
  const [step, setStep] = useState(1); // 1: details, 2: confirm, 3: done
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '',
    address_line1: '', address_line2: '', city: '', state: '', postal_code: '', country: '',
    notes: ''
  });

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true);
    await base44.entities.Order.create({
      ...form,
      items: cart.map(i => ({
        product_id: i.id,
        product_name: i.name,
        material: i.material,
        weight_oz: i.weight_oz,
        quantity: i.quantity,
        price_usd: i.price_usd,
      })),
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
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl bg-background border border-border my-8"
            onClick={e => e.stopPropagation()}
          >
            {/* Corner marks */}
            {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r','bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((cls,i)=>(
              <div key={i} className={`absolute w-4 h-4 border-accent/40 ${cls}`}/>
            ))}

            {/* Close */}
            <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground z-10">
              <X className="w-4 h-4" />
            </button>

            <div className="px-8 py-8">
              {/* Step indicator */}
              {step < 3 && (
                <div className="flex items-center gap-3 mb-6">
                  {[1, 2].map(s => (
                    <React.Fragment key={s}>
                      <div className={`flex items-center gap-2 ${step === s ? 'text-foreground' : 'text-muted-foreground/40'}`}>
                        <span className={`w-5 h-5 border flex items-center justify-center font-body text-[9px] ${step === s ? 'border-accent bg-accent/10 text-accent' : 'border-border'}`}>{s}</span>
                        <span className="font-body text-[9px] tracking-[0.2em] uppercase">{s === 1 ? 'Your Details' : 'Confirm'}</span>
                      </div>
                      {s < 2 && <div className="flex-1 h-px bg-border" />}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* STEP 1: Contact + Shipping */}
              {step === 1 && (
                <>
                  <h2 className="font-display text-2xl font-light italic text-foreground mb-1">Your Details</h2>
                  <p className="font-body text-xs text-muted-foreground mb-6">We'll use this to confirm and ship your order.</p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Full Name *</label>
                        <input className={inputCls} value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="Jane Smith" />
                      </div>
                      <div>
                        <label className={labelCls}>Email *</label>
                        <input className={inputCls} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Phone</label>
                      <input className={inputCls} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 555 000 0000" />
                    </div>
                    <div className="fluted-divider w-full opacity-40" />
                    <div>
                      <label className={labelCls}>Address Line 1 *</label>
                      <input className={inputCls} value={form.address_line1} onChange={e => set('address_line1', e.target.value)} placeholder="123 Main Street" />
                    </div>
                    <div>
                      <label className={labelCls}>Address Line 2</label>
                      <input className={inputCls} value={form.address_line2} onChange={e => set('address_line2', e.target.value)} placeholder="Apt, suite, etc." />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <label className={labelCls}>City *</label>
                        <input className={inputCls} value={form.city} onChange={e => set('city', e.target.value)} placeholder="New York" />
                      </div>
                      <div>
                        <label className={labelCls}>State</label>
                        <input className={inputCls} value={form.state} onChange={e => set('state', e.target.value)} placeholder="NY" />
                      </div>
                      <div>
                        <label className={labelCls}>Postal Code *</label>
                        <input className={inputCls} value={form.postal_code} onChange={e => set('postal_code', e.target.value)} placeholder="10001" />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Country *</label>
                      <input className={inputCls} value={form.country} onChange={e => set('country', e.target.value)} placeholder="United States" />
                    </div>
                    <div>
                      <label className={labelCls}>Notes</label>
                      <textarea className={`${inputCls} resize-none h-20`} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Any special instructions…" />
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!form.full_name || !form.email || !form.address_line1 || !form.city || !form.postal_code || !form.country}
                    className="mt-6 w-full font-body text-[10px] tracking-[0.3em] uppercase py-3 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Review Order
                  </button>
                </>
              )}

              {/* STEP 2: Confirm */}
              {step === 2 && (
                <>
                  <h2 className="font-display text-2xl font-light italic text-foreground mb-1">Confirm Request</h2>
                  <p className="font-body text-xs text-muted-foreground mb-6">Please review your details before submitting.</p>

                  {/* Order items */}
                  <div className="space-y-2 mb-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b border-border/60">
                        <div>
                          <p className="font-display text-sm italic">{item.name}</p>
                          <p className="font-body text-[9px] tracking-[0.15em] uppercase text-muted-foreground">qty {item.quantity}</p>
                        </div>
                        <p className="font-display text-sm">${(item.price_usd * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="font-body text-[9px] tracking-[0.3em] uppercase text-muted-foreground">Estimated Total</span>
                    <span className="font-display text-xl">${total.toLocaleString()}</span>
                  </div>

                  {/* Shipping summary */}
                  <div className="bg-secondary/50 border border-border p-4 mb-6 text-xs font-body text-muted-foreground space-y-0.5">
                    <p className="text-foreground font-medium">{form.full_name}</p>
                    <p>{form.email}{form.phone ? ` · ${form.phone}` : ''}</p>
                    <p>{form.address_line1}{form.address_line2 ? `, ${form.address_line2}` : ''}</p>
                    <p>{form.city}{form.state ? `, ${form.state}` : ''} {form.postal_code}</p>
                    <p>{form.country}</p>
                  </div>

                  <p className="font-body text-[10px] text-muted-foreground/60 mb-4 leading-relaxed">
                    By submitting, you agree to be contacted by our team to finalize payment and shipping. No charges are made at this step.
                  </p>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 font-body text-[10px] tracking-[0.2em] uppercase py-3 border border-border text-muted-foreground hover:border-accent hover:text-foreground transition-colors">
                      Edit Details
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 font-body text-[10px] tracking-[0.2em] uppercase py-3 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Submitting…' : 'Submit Request'}
                    </button>
                  </div>
                </>
              )}

              {/* STEP 3: Success */}
              {step === 3 && (
                <div className="flex flex-col items-center text-center py-6">
                  <CheckCircle2 className="w-10 h-10 text-accent mb-4" />
                  <h2 className="font-display text-3xl font-light italic text-foreground mb-2">Request Received</h2>
                  <FloralDivider className="my-3 w-48" />
                  <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
                    Thank you, {form.full_name.split(' ')[0]}. Your purchase request has been submitted. Our team will be in touch at <span className="text-foreground">{form.email}</span> to confirm pricing and arrange delivery.
                  </p>
                  <button onClick={handleClose} className="mt-8 font-body text-[10px] tracking-[0.3em] uppercase px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors">
                    Back to Collection
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}