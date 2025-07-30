import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Star, 
  Shield, 
  Zap, 
  Crown, 
  ArrowRight,
  Users,
  Building2,
  Network,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ParticleNetwork } from '../components/animations/ParticleNetwork';

export const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Starter',
      icon: Shield,
      description: 'Perfect for small businesses getting started with cybersecurity',
      monthlyPrice: 99,
      annualPrice: 990,
      savings: 20,
      color: 'from-green-500 to-teal-500',
      popular: false,
      features: [
        { name: 'Up to 50 employees', included: true },
        { name: 'Basic compliance frameworks (NIST, SOC2)', included: true },
        { name: 'AI-powered risk assessments', included: true },
        { name: 'Policy template library', included: true },
        { name: 'Email support', included: true },
        { name: 'Basic incident response', included: true },
        { name: 'Monthly security reports', included: true },
        { name: 'Advanced integrations', included: false },
        { name: 'Custom frameworks', included: false },
        { name: 'Dedicated support', included: false },
        { name: 'On-premise deployment', included: false }
      ],
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      icon: Zap,
      description: 'Comprehensive security for growing organizations',
      monthlyPrice: 299,
      annualPrice: 2990,
      savings: 17,
      color: 'from-purple-500 to-pink-500',
      popular: true,
      features: [
        { name: 'Up to 500 employees', included: true },
        { name: 'All compliance frameworks', included: true },
        { name: 'Advanced AI analytics', included: true },
        { name: 'Custom policy creation', included: true },
        { name: 'Priority support', included: true },
        { name: 'Advanced incident response', included: true },
        { name: 'Weekly security reports', included: true },
        { name: 'Advanced integrations', included: true },
        { name: 'Team collaboration tools', included: true },
        { name: 'Custom frameworks', included: false },
        { name: 'On-premise deployment', included: false }
      ],
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      icon: Crown,
      description: 'Full-scale security governance for large organizations',
      monthlyPrice: null,
      annualPrice: null,
      savings: null,
      color: 'from-cyan-500 to-blue-500',
      popular: false,
      features: [
        { name: 'Unlimited employees', included: true },
        { name: 'All compliance frameworks', included: true },
        { name: 'Custom AI model training', included: true },
        { name: 'Unlimited custom policies', included: true },
        { name: 'Dedicated success manager', included: true },
        { name: 'Custom incident response', included: true },
        { name: 'Real-time reporting', included: true },
        { name: 'Advanced integrations', included: true },
        { name: 'Advanced team features', included: true },
        { name: 'Custom frameworks', included: true },
        { name: 'On-premise deployment', included: true }
      ],
      cta: 'Contact Sales'
    }
  ];

  const addOns = [
    {
      name: 'MSP Multi-Tenant',
      description: 'White-label platform for managed service providers',
      price: 'Custom pricing',
      icon: Network,
      features: [
        'Multi-client dashboard',
        'White-label branding',
        'Bulk client management',
        'Partner training program'
      ]
    },
    {
      name: 'Professional Services',
      description: 'Expert implementation and consulting services',
      price: 'Starting at $5,000',
      icon: Users,
      features: [
        'Implementation consulting',
        'Custom framework development',
        'Staff training programs',
        'Ongoing advisory services'
      ]
    },
    {
      name: 'Premium Support',
      description: '24/7 dedicated support with guaranteed response times',
      price: '$500/month',
      icon: Phone,
      features: [
        '24/7 phone support',
        '1-hour response SLA',
        'Dedicated support engineer',
        'Priority feature requests'
      ]
    }
  ];

  const faqs = [
    {
      question: 'What\'s included in the free trial?',
      answer: 'The 14-day free trial includes full access to all features in your selected plan, with no credit card required. You can explore the platform, set up your company profile, and experience the AI-powered security guidance.'
    },
    {
      question: 'Can I change plans at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing adjustments on your next invoice.'
    },
    {
      question: 'Do you offer custom pricing for large organizations?',
      answer: 'Yes, we offer custom pricing for organizations with 1000+ employees or specific requirements. Contact our sales team to discuss your needs and get a tailored quote.'
    },
    {
      question: 'What compliance frameworks do you support?',
      answer: 'We support all major frameworks including NIST Cybersecurity Framework, SOC 2 Type II, ISO 27001, CMMC, GDPR, HIPAA, PCI DSS, and many others. Enterprise plans include support for custom frameworks.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade security with AES-256 encryption, SOC 2 Type II compliance, and zero-trust architecture. Your data is never used to train AI models or shared with third parties.'
    },
    {
      question: 'Do you offer on-premise deployment?',
      answer: 'Yes, on-premise deployment is available for Enterprise customers with specific security or compliance requirements. Contact our sales team to discuss deployment options.'
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (!plan.monthlyPrice) return 'Custom';
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice! / 12;
    return `$${Math.round(price)}`;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (!plan.savings) return null;
    return billingCycle === 'annual' ? `Save ${plan.savings}%` : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <ParticleNetwork />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Simple, Transparent
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your organization. All plans include our AI-powered 
              Virtual CISO, compliance automation, and enterprise-grade security.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  billingCycle === 'annual' ? 'bg-cyan-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    billingCycle === 'annual' ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
                Annual
              </span>
              {billingCycle === 'annual' && (
                <span className="text-green-400 text-sm font-semibold">Save up to 20%</span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <Card variant="neural" className={`h-full ${plan.popular ? 'border-cyan-500/50 scale-105' : ''}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${plan.color} bg-opacity-20 border border-current/30`}>
                      <plan.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                      {getSavings(plan) && (
                        <span className="text-green-400 text-sm font-semibold">{getSavings(plan)}</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-slate-300 mb-6">{plan.description}</p>
                  
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-white">{getPrice(plan)}</span>
                      {plan.monthlyPrice && (
                        <span className="text-slate-400">
                          /{billingCycle === 'monthly' ? 'month' : 'month'}
                        </span>
                      )}
                    </div>
                    {billingCycle === 'annual' && plan.annualPrice && (
                      <p className="text-sm text-slate-400 mt-1">
                        Billed annually (${plan.annualPrice})
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-slate-600 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-slate-300' : 'text-slate-500'}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <Button 
                      variant={plan.popular ? "primary" : "glassmorphism"} 
                      className="w-full"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Add-ons & Services</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Enhance your security platform with additional services and specialized solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="cyberpunk" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                      <addon.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{addon.name}</h3>
                  </div>
                  
                  <p className="text-slate-300 mb-4">{addon.description}</p>
                  
                  <div className="text-2xl font-bold text-cyan-400 mb-4">{addon.price}</div>
                  
                  <div className="space-y-2 mb-6">
                    {addon.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="glassmorphism" className="w-full">
                    Learn More
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-300">
              Get answers to common questions about our pricing and platform
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="glassmorphism">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-cyan-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Start your free trial today and experience the power of AI-driven cybersecurity. 
              No credit card required, cancel anytime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="glassmorphism" size="lg" icon={MessageSquare}>
                  Talk to Sales
                </Button>
              </Link>
            </div>

            <p className="text-sm text-slate-400 mt-6">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};