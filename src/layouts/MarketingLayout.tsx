import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../utils/scroll';
import { CUSTOMER_CARE, CUSTOMER_CARE_MAILTO } from '../constants/support';

const MarketingLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const sectionId = location.hash.replace('#', '');
    const timer = window.setTimeout(() => scrollToSection(sectionId), 50);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  const goToSection = (sectionId: string) => {
    if (location.pathname === '/') {
      scrollToSection(sectionId);
      window.history.replaceState(null, '', `/#${sectionId}`);
      return;
    }
    navigate(`/#${sectionId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white bg-opacity-95 backdrop-blur-md border-b border-earth-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="text-xl font-bold gradient-text">PrepMind</span>
            </Link>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => goToSection('features')}
                className="text-navy-800 hover:text-brand-500 transition-colors"
              >
                Features
              </button>
              <button
                type="button"
                onClick={() => goToSection('pricing')}
                className="text-navy-800 hover:text-brand-500 transition-colors"
              >
                Pricing
              </button>
              <button
                type="button"
                onClick={() => goToSection('demo')}
                className="hidden sm:inline text-navy-800 hover:text-brand-500 transition-colors"
              >
                Demo
              </button>
              <Link to="/support" className="hidden md:inline text-navy-800 hover:text-brand-500 transition-colors">
                Support
              </Link>
              <Link to="/login" className="px-6 py-2 text-brand-500 font-semibold hover:bg-brand-50 rounded-lg">
                Sign in
              </Link>
              <Link to="/signup" className="btn-primary text-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />

      <footer className="bg-navy-800 text-white py-12">
        <div className="section-container">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-brand-500 rounded-lg" />
                <span className="text-xl font-bold">PrepMind</span>
              </Link>
              <p className="text-white text-opacity-70">Study Smart. Prepare Better. Get Hired.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-white text-opacity-70 text-sm">
                <li>
                  <button type="button" onClick={() => goToSection('features')} className="hover:text-white transition">
                    Features
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => goToSection('pricing')} className="hover:text-white transition">
                    Pricing
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => goToSection('demo')} className="hover:text-white transition">
                    Demo
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white text-opacity-70 text-sm">
                <li>
                  <Link to="/about" className="hover:text-white transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="hover:text-white transition">
                    Customer Care
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Care</h4>
              <ul className="space-y-2 text-white text-opacity-70 text-sm">
                <li className="font-medium text-white text-opacity-90">{CUSTOMER_CARE.name}</li>
                <li>
                  <a href={CUSTOMER_CARE_MAILTO} className="hover:text-white transition break-all">
                    {CUSTOMER_CARE.email}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-white text-opacity-70 text-sm">
                <li>
                  <Link to="/privacy" className="hover:text-white transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition">
                    Terms
                  </Link>
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

export default MarketingLayout;
