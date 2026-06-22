import React from 'react';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { scrollToSection } from '../../utils/scroll';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="section-container pt-20 lg:pt-32 relative">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 rounded-full glass hover-scale cursor-default">
              <Sparkles size={18} className="text-brand-500 animate-pulse" />
              <span className="text-sm font-semibold text-brand-600">✨ AI-Powered Learning Platform</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-navy-800 leading-tight tracking-tight">
              Study Smart.<br />
              <span className="gradient-text bg-gradient-to-r from-brand-500 via-purple-500 to-brand-600 animate-pulse-glow">Prepare Better.</span>
              <br />
              <span className="text-brand-600">Get Hired.</span>
            </h1>

            <p className="text-lg md:text-xl text-earth-500 leading-relaxed max-w-lg">
              PrepMind AI combines intelligent study tools, placement preparation, and coding interview prep to help you ace your exams and land your dream job.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              size="lg"
              className="group shadow-glow hover:-translate-y-1"
              onClick={() => navigate('/signup')}
            >
              Get Started Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="hover-lift"
              onClick={() => scrollToSection('demo')}
            >
              Watch Demo
            </Button>
          </div>

          <div className="flex gap-8 pt-4">
            <div className="group hover-scale cursor-default">
              <p className="text-3xl md:text-4xl font-bold gradient-text">10K+</p>
              <p className="text-sm text-earth-500">Students Learning</p>
            </div>
            <div className="group hover-scale cursor-default">
              <p className="text-3xl md:text-4xl font-bold gradient-text">95%</p>
              <p className="text-sm text-earth-500">Success Rate</p>
            </div>
            <div className="group hover-scale cursor-default">
              <p className="text-3xl md:text-4xl font-bold gradient-text">500+</p>
              <p className="text-sm text-earth-500">Coding Problems</p>
            </div>
          </div>
        </div>

        <div className="relative h-96 lg:h-full min-h-96 flex items-center justify-center animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-100 via-purple-100 to-brand-50 rounded-3xl opacity-40 animate-pulse" />
          <div className="absolute inset-4 bg-gradient-to-br from-brand-50 to-transparent rounded-3xl opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
          
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-50 rounded-3xl shadow-elevated overflow-hidden flex items-center justify-center group hover:shadow-xl transition-all duration-300">
              <img
                src="/ChatGPT_Image_May_24,_2026,_05_30_38_PM.png"
                alt="PrepMind dashboard preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback instanceof HTMLElement) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden text-center space-y-6 flex-col items-center justify-center p-8 animate-scale-in">
                <div className="w-24 h-24 bg-gradient-brand rounded-full shadow-glow flex items-center justify-center text-5xl animate-bounce-in">
                  📚
                </div>
                <div className="space-y-2">
                  <p className="text-earth-600 font-semibold">Dashboard Preview</p>
                  <div className="flex gap-2 justify-center">
                    <div className="w-2 h-2 bg-brand-500 rounded-full" />
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <div className="w-2 h-2 bg-brand-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-300 rounded-full opacity-10 blur-3xl animate-float" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-300 rounded-full opacity-10 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>

      {/* Feature indicators */}
      <div className="absolute bottom-8 left-8 hidden lg:flex items-center gap-3 glass p-4 rounded-lg hover-lift">
        <Zap size={20} className="text-brand-500" />
        <span className="text-sm font-semibold text-navy-800">Instant AI Generation</span>
      </div>
      
      <div className="absolute top-1/3 right-8 hidden lg:flex items-center gap-3 glass p-4 rounded-lg hover-lift">
        <Target size={20} className="text-purple-500" />
        <span className="text-sm font-semibold text-navy-800">Personalized Learning</span>
      </div>
    </section>
  );
};

export default HeroSection;
