import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

interface LandingPageProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export default function LandingPage({ onLoginClick, onSignupClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
      <Hero onSignupClick={onSignupClick} />
      <About />
      <Services />
      <Features />
      <Pricing onSignupClick={onSignupClick} />
      <Footer />
    </div>
  );
}
