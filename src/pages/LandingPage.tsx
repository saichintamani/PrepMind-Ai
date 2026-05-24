import React from 'react';
import { HeroSection, FeaturesSection, PricingSection } from '../components/landing';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white bg-opacity-95 backdrop-blur-md border-b border-earth-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="text-xl font-bold gradient-text">PrepMind</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-navy-800 hover:text-brand-500 transition-colors">Features</button>
              <button className="text-navy-800 hover:text-brand-500 transition-colors">Pricing</button>
              <a href="/login" className="px-6 py-2 text-brand-500 font-semibold hover:bg-brand-50 rounded-lg">
                Sign in
              </a>
              <a href="/signup" className="btn-primary text-sm">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
      </main>

      <footer className="bg-navy-800 text-white py-12">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-brand-500 rounded-lg" />
                <span className="text-xl font-bold">PrepMind</span>
              </div>
              <p className="text-white text-opacity-70">Study Smart. Prepare Better. Get Hired.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-white text-opacity-70 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white text-opacity-70 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-white text-opacity-70 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white border-opacity-10 pt-8 text-center text-white text-opacity-70">
            <p>&copy; 2026 PrepMind AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
