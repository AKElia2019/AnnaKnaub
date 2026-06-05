import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PhilosophySection from '@/components/PhilosophySection';
import PerformanceSection from '@/components/PerformanceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const IMAGES = {
  hero: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/5d9766775_generated_04dc4c49.png',
  oliveTree: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/19cff167b_generated_470fdeb5.png',
  coin: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/d2211c490_generated_47e9d1c1.png',
  grove: 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/39f0f0d7a_generated_b066df34.png',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PhilosophySection oliveTreeImage={IMAGES.oliveTree} />
      <PerformanceSection coinImage={IMAGES.coin} />
      <ContactSection groveImage={IMAGES.grove} />
      <Footer />
    </div>
  );
}