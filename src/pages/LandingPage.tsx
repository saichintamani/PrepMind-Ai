import React from 'react';
import { HeroSection, FeaturesSection, PricingSection, DemoSection } from '../components/landing';

const LandingPage: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <PricingSection />
    </main>
  );
};

export default LandingPage;
