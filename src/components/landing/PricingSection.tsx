import React from 'react';
import { Check } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import { PLANS } from '../../constants';

const PricingSection: React.FC = () => {
  return (
    <section className="section-container bg-earth-50">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-navy-800">Simple, Transparent Pricing</h2>
        <p className="text-xl text-earth-500 max-w-2xl mx-auto">Choose the perfect plan for your learning goals</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {PLANS.map((plan, index) => (
          <Card
            key={index}
            variant={index === 1 ? 'elevated' : 'default'}
            className={index === 1 ? 'ring-2 ring-brand-500 relative scale-105' : ''}
          >
            {index === 1 && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-brand text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-navy-800">{plan.name}</h3>
                <p className="text-earth-500 mt-2">{plan.description}</p>
              </div>

              <div>
                <span className="text-4xl font-bold text-navy-800">₹{plan.price}</span>
                <span className="text-earth-500">/month</span>
              </div>

              <Button
                variant={index === 1 ? 'primary' : 'outline'}
                fullWidth
                size="lg"
                className={index === 1 ? 'btn-primary' : 'btn-outline'}
              >
                Get Started
              </Button>

              <div className="space-y-3 pt-6 border-t border-earth-200">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check size={20} className="text-brand-500 flex-shrink-0 mt-1" />
                    <span className="text-navy-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
