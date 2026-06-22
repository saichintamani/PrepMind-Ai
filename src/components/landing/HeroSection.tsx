import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { scrollToSection } from '../../utils/scroll';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="section-container pt-20 lg:pt-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 rounded-full">
              <Sparkles size={18} className="text-brand-500" />
              <span className="text-sm font-semibold text-brand-600">AI-Powered Learning Platform</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-navy-800 leading-tight">
              Study Smart.<br />
              <span className="gradient-text">Prepare Better.</span>
              <br />
              Get Hired.
            </h1>

            <p className="text-xl text-earth-500 leading-relaxed max-w-lg">
              PrepMind AI combines intelligent study tools, placement preparation, and coding interview prep to help
              you ace your exams and land your dream job.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              size="lg"
              className="group"
              onClick={() => navigate('/signup')}
            >
              Get Started Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToSection('demo')}>
              Watch Demo
            </Button>
          </div>

          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-3xl font-bold text-brand-500">10K+</p>
              <p className="text-sm text-earth-500">Students Learning</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-500">95%</p>
              <p className="text-sm text-earth-500">Success Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-500">500+</p>
              <p className="text-sm text-earth-500">Coding Problems</p>
            </div>
          </div>
        </div>

        <div className="relative h-96 lg:h-full min-h-96 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-brand opacity-10 rounded-2xl" />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-50 rounded-2xl shadow-xl overflow-hidden flex items-center justify-center">
              <img
                src="/ChatGPT_Image_May_24,_2026,_05_30_38_PM.png"
                alt="PrepMind dashboard preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback instanceof HTMLElement) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden text-center space-y-4 flex-col items-center justify-center p-8">
                <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center text-4xl">
                  📚
                </div>
                <p className="text-earth-500">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
