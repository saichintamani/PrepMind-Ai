import React from 'react';
import { Check, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Card from '../common/Card';
import { PLANS } from '../../constants';
import { setSelectedPlan } from '../../utils/planIntent';
import { useAuthStore } from '../../store/authStore';

const PricingSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    if (user) {
      navigate('/dashboard/billing');
      return;
    }
    navigate(`/signup?plan=${planId}`);
  };

  return (
    <section id="pricing" className="section-container scroll-mt-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="text-center space-y-4 mb-16 animate-fade-in-up">
        <span className="inline-block px-4 py-2 bg-brand-50 rounded-full text-sm font-semibold text-brand-600 glass">
          💰 Affordable Plans
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-navy-800">Simple, Transparent Pricing</h2>
        <p className="text-xl text-earth-500 max-w-2xl mx-auto">Choose the perfect plan for your learning goals</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {PLANS.map((plan, index) => (
          <div key={plan.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
            <Card
              variant={index === 1 ? 'elevated' : 'glass'}
              className={`
                h-full space-y-6 transition-all duration-300
                ${index === 1 ? 'ring-2 ring-brand-500 md:scale-105 hover:shadow-xl hover:ring-brand-600' : 'hover:ring-1 hover:ring-brand-200'}
              `}
            >
              {index === 1 && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-brand text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                  <Zap size={16} />
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-navy-800">{plan.name}</h3>
                <p className="text-earth-500 mt-2 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-2">
                <span className="text-5xl font-bold gradient-text">₹{plan.price}</span>
                <p className="text-earth-500 text-sm">/month billed annually</p>
              </div>

              <Button
                variant={index === 1 ? 'primary' : 'outline'}
                fullWidth
                size="lg"
                onClick={() => handlePlanSelect(plan.id)}
                className={index === 1 ? 'shadow-glow' : ''}
              >
                Get Started
              </Button>

              <div className="space-y-4 pt-6 border-t border-earth-200 border-opacity-50">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3 group">
                    <Check size={20} className="text-brand-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-navy-800 text-sm group-hover:text-navy-900 transition-colors">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-10 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white to-transparent" />
            </Card>
          </div>
        ))}
      </div>

      {/* FAQ CTA */}
      <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
        <p className="text-earth-600 font-semibold mb-4">Have questions?</p>
        <button
          onClick={() => navigate('/contact')}
          className="text-brand-600 hover:text-brand-700 font-semibold transition-colors inline-flex items-center gap-2 group"
        >
          Contact our sales team
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </section>
  );
};

export default PricingSection;
