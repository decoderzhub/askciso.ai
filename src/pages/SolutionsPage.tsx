import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Shield, 
  Zap, 
  Target, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Globe,
  Lock,
  Activity,
  FileText,
  Network,
  Crown,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ParticleNetwork } from '../components/animations/ParticleNetwork';

export const SolutionsPage: React.FC = () => {
  const solutions = [
    {
      icon: Building2,
      title: 'Small & Medium Business',
      subtitle: 'SMB Security Solutions',
      description: 'Comprehensive cybersecurity for growing businesses without the enterprise complexity or cost.',
      targetAudience: '10-500 employees',
      keyBenefits: [
        'Affordable enterprise-grade security',
        'Easy setup and management',
        'Automated compliance tracking',
        'No dedicated security team required'
      ],
      features: [
        'Essential compliance frameworks (NIST, SOC2)',
        'Automated risk assessments',
        'Policy template library',
        'Basic incident response',
        'Email and chat support'
      ],
      pricing: 'Starting at $99/month',
      color: 'from-green-500 to-teal-500',
      popular: false
    },
    {
      icon: Network,
      title: 'Managed Service Providers',
      subtitle: 'MSP Partner Solutions',
      description: 'White-label cybersecurity platform for MSPs to deliver comprehensive security services to their clients.',
      targetAudience: 'MSPs with 50+ clients',
      keyBenefits: [
        'Multi-tenant client management',
        'White-label branding options',
        'Scalable pricing model',
        'Partner support program'
      ],
      features: [
        'Multi-client dashboard',
        'White-label customization',
        'Bulk client onboarding',
        'Partner training program',
        'Revenue sharing model'
      ],
      pricing: 'Custom pricing',
      color: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      icon: Crown,
      title: 'Enterprise Organizations',
      subtitle: 'Enterprise Security Platform',
      description: 'Full-scale cybersecurity governance platform for large organizations with complex compliance requirements.',
      targetAudience: '1000+ employees',
      keyBenefits: [
        'Advanced compliance automation',
        'Custom framework support',
        'Dedicated success manager',
        'On-premise deployment options'
      ],
      features: [
        'All compliance frameworks',
        'Custom integrations',
        'Advanced analytics',
        'Dedicated support',
        'SLA guarantees'
      ],
      pricing: 'Contact for pricing',
      color: 'from-cyan-500 to-blue-500',
      popular: false
    }
  ];

  const industries = [
    {
      icon: Shield,
      title: 'Defense & Government',
      description: 'CMMC compliance and federal security requirements',
      frameworks: ['CMMC', 'NIST 800-53', 'FedRAMP'],
      color: 'text-red-400'
    },
    {
      icon: Activity,
      title: 'Healthcare',
      description: 'HIPAA compliance and patient data protection',
      frameworks: ['HIPAA', 'HITECH', 'NIST'],
      color: 'text-green-400'
    },
    {
      icon: Briefcase,
      title: 'Financial Services',
      description: 'Banking regulations and financial data security',
      frameworks: ['SOX', 'PCI DSS', 'GLBA'],
      color: 'text-yellow-400'
    },
    {
      icon: Globe,
      title: 'Technology',
      description: 'Software security and data privacy compliance',
      frameworks: ['SOC 2', 'ISO 27001', 'GDPR'],
      color: 'text-cyan-400'
    },
    {
      icon: Building2,
      title: 'Manufacturing',
      description: 'Industrial control systems and supply chain security',
      frameworks: ['NIST', 'IEC 62443', 'ISO 27001'],
      color: 'text-purple-400'
    },
    {
      icon: Users,
      title: 'Professional Services',
      description: 'Client data protection and business continuity',
      frameworks: ['SOC 2', 'NIST', 'ISO 27001'],
      color: 'text-blue-400'
    }
  ];

  const useCases = [
    {
      title: 'Compliance Automation',
      description: 'Automate gap analysis, control mapping, and evidence collection for major cybersecurity frameworks.',
      icon: CheckCircle,
      benefits: ['90% faster compliance', 'Automated evidence collection', 'Real-time gap analysis']
    },
    {
      title: 'Risk Management',
      description: 'Continuous risk assessment with AI-powered threat intelligence and vendor risk management.',
      icon: Target,
      benefits: ['Predictive risk scoring', 'Automated vendor assessments', 'Real-time monitoring']
    },
    {
      title: 'Incident Response',
      description: 'AI-guided incident response with automated playbooks and real-time threat correlation.',
      icon: Zap,
      benefits: ['Faster response times', 'Automated playbooks', 'Threat correlation']
    },
    {
      title: 'Security Governance',
      description: 'Executive dashboards, KPI tracking, and board-ready reporting for security leadership.',
      icon: BarChart3,
      benefits: ['Executive visibility', 'KPI tracking', 'Board-ready reports']
    }
  ];

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
              Cybersecurity Solutions
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                For Every Organization
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              From small businesses to enterprise organizations, our AI-powered platform 
              scales to meet your cybersecurity and compliance needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {solution.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <Card variant="neural" className={`h-full ${solution.popular ? 'border-cyan-500/50' : ''}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${solution.color} bg-opacity-20 border border-current/30`}>
                      <solution.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{solution.title}</h3>
                      <p className="text-cyan-400 text-sm">{solution.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 mb-4 leading-relaxed">{solution.description}</p>
                  
                  <div className="mb-6">
                    <div className="text-sm text-slate-400 mb-2">Target Audience</div>
                    <div className="text-white font-semibold">{solution.targetAudience}</div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-sm text-slate-400 mb-3">Key Benefits</div>
                    <div className="space-y-2">
                      {solution.keyBenefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-sm text-slate-400 mb-3">Features Included</div>
                    <div className="space-y-1">
                      {solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                          <span className="text-slate-400 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-white">{solution.pricing}</div>
                    </div>
                    <Button 
                      variant={solution.popular ? "primary" : "glassmorphism"} 
                      className="w-full"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      Get Started
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Industry-Specific Solutions</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Tailored cybersecurity solutions for regulated industries with specific compliance requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="cyberpunk" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <industry.icon className={`w-8 h-8 ${industry.color}`} />
                    <h3 className="text-xl font-bold text-white">{industry.title}</h3>
                  </div>
                  
                  <p className="text-slate-300 mb-4">{industry.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {industry.frameworks.map((framework) => (
                      <span
                        key={framework}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full border border-cyan-500/30"
                      >
                        {framework}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Common Use Cases</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              How organizations leverage vCISO AI to transform their cybersecurity operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="glassmorphism" className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex-shrink-0">
                      <useCase.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                      <p className="text-slate-300 mb-4">{useCase.description}</p>
                      <div className="space-y-2">
                        {useCase.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-slate-400 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
              Find the Perfect Solution
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                For Your Organization
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Not sure which solution is right for you? Our security experts will help you 
              choose the perfect plan for your organization's needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Schedule Consultation
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="glassmorphism" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};