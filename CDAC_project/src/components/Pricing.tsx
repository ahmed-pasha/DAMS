import React from 'react';
import { Check, Star, Zap } from 'lucide-react';

interface PricingProps {
  onSignupClick: () => void;
  onSubscribeClick?: () => void;
}

export default function Pricing({ onSignupClick, onSubscribeClick }: PricingProps) {
  const plans = [
    {
      name: 'Free',
      price: 'Free',
      period: 'Forever',
      description: 'Perfect for individuals and small teams getting started',
      features: [
        'Up to 15GB storage',
        'Basic support',
        'Basic search & filtering',
        'Mobile access'
      ],
      cta: 'Get Started Free',
      popular: false,
      color: 'gray'
    },
    {
      name: 'Pricing',
      price: '$10',
      period: '/month',
      description: 'Store files more than 15 GB',
      features: [
        'More than 15 GB file storage',
        'Priority support',
        'Advanced search & filtering',
        'Mobile & desktop access'
      ],
      cta: 'Subscribe Now',
      popular: false,
      color: 'blue'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. Start free and scale as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 justify-center max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-transform duration-300 transform hover:-translate-y-1 ${
                plan.popular ? 'ring-4 ring-purple-600 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-1 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-lg">
                    <Star className="h-5 w-5" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}
              
              <div className="p-10">
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-3">{plan.name}</h3>
                  <div className="mb-5">
                    <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-600 ml-2 text-lg">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600 text-lg">{plan.description}</p>
                </div>
                
                <ul className="space-y-5 mb-10">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-4">
                      <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                      <span className="text-gray-800 text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                onClick={plan.cta === 'Subscribe Now' && onSubscribeClick ? onSubscribeClick : onSignupClick}
                className={`w-full py-4 px-8 rounded-xl font-bold transition-all duration-300 transform hover:scale-110 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Can I change plans anytime?</h4>
                <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
                <p className="text-gray-600">Yes, we offer a 14-day free trial for all paid plans with full access to features.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
                <p className="text-gray-600">We accept all major credit cards, PayPal, and offer annual billing discounts.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Is my data secure?</h4>
                <p className="text-gray-600">Absolutely. We use enterprise-grade encryption and are SOC 2 compliant.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Do you offer custom solutions?</h4>
                <p className="text-gray-600">Yes, our Enterprise plan includes custom integrations and white-label options.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h4>
                <p className="text-gray-600">Yes, there are no long-term contracts. Cancel anytime with no penalties.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <Zap className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of satisfied customers and transform your digital asset management today.
            </p>
            <button 
              onClick={onSignupClick}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
            >
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
