import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function ContactSection({ groveImage }) {
  const [headerRef, headerInView] = useInView({ threshold: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));
    toast.success('Thank you. We will be in touch shortly.');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setSubmitting(false);
  };

  return (
    <section id="contact" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={groveImage}
          alt="Sun-drenched Mediterranean olive grove"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-32 md:py-40 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left text */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              The Adyton
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-8">
              Begin your
              <br />
              <span className="italic">consultation</span>
            </h2>
            <div className="fluted-divider w-32 mb-8" />
            <p className="font-body text-body text-muted-foreground max-w-md leading-relaxed mb-8">
              Every enduring legacy begins with a single conversation.
              Share your vision, and we will craft a strategy worthy
              of the ages.
            </p>
            <div className="space-y-4 text-muted-foreground font-body text-sm">
              <p>
                <span className="tracking-widest uppercase text-xs text-accent block mb-1">Address</span>
                12 Voukourestiou Street, Athens 10671, Greece
              </p>
              <p>
                <span className="tracking-widest uppercase text-xs text-accent block mb-1">Email</span>
                counsel@elia-advisors.com
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2">
                  Full Name
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="bg-background/60 backdrop-blur-sm border-border h-12 font-body text-body focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2">
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="bg-background/60 backdrop-blur-sm border-border h-12 font-body text-body focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2">
                  Phone
                </label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+30 xxx xxx xxxx"
                  className="bg-background/60 backdrop-blur-sm border-border h-12 font-body text-body focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2">
                  Your Vision
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your goals and aspirations..."
                  rows={5}
                  className="bg-background/60 backdrop-blur-sm border-border font-body text-body resize-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent text-accent-foreground font-body text-sm tracking-[0.3em] uppercase py-5 hover:bg-primary hover:text-primary-foreground transition-colors duration-500 min-h-[44px] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                {submitting ? 'Sending...' : 'Enter the Grove'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}