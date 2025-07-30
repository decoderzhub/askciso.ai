import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Brain, 
  Zap, 
  Lock, 
  Users, 
  BarChart3,
  FileText,
  Target,
  Activity,
  CheckCircle,
  ArrowRight,
  Cpu,
  Network,
  Eye,
  AlertTriangle,
  Clock,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ParticleNetwork } from '../components/animations/ParticleNetwork';

export const FeaturesPage: React.FC = () => {
  const coreFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Security Intelligence',
      description: 'Advanced neural networks analyze your security posture and provide intelligent recommendations tailored to your industry and threat landscape.',
      features: [
        'Claude 3 Sonnet AI integration',
        'Company-aware contextual responses',
        'Real-time threat intelligence',
        'Predictive risk analysis'
      ],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Shield,
      title: 'Compliance Automation',
      description: 'Automated gap analysis and control mapping for major cybersecurity frameworks with continuous monitoring and reporting.',
      features: [
        'NIST Cybersecurity Framework',
        'SOC 2 Type II compliance',
        'ISO 27001 certification',
        'CMMC for defense contractors'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Lock,
      title: 'Risk Assessment & TPRM',
      description: 'Intelligent third-party risk management with automated vendor assessment, monitoring, and continuous risk scoring.',
      features: [
        'Automated vendor assessments',
        'Continuous risk monitoring',
        'Supply chain risk analysis',
        'Risk quantification metrics'
      ],
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Continuous security monitoring with instant alerts, automated incident response workflows, and 24/7 threat detection.',
      features: [
        'Real-time threat detection',
        'Automated incident response',
        'Security event correlation',
        'Custom alert workflows'
      ],
      color: 'from-red-500 to-orange-500'
    }
  ];

  const advancedFeatures = [
    {
      icon: FileText,
      title: 'Document Intelligence',
      description: 'AI-powered analysis of security policies, procedures, and documentation with automatic compliance mapping.',
      capabilities: ['Policy gap analysis', 'Automated control mapping', 'Version control', 'Collaborative editing']
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Multi-tenant architecture with role-based permissions, team workspaces, and real-time collaboration tools.',
      capabilities: ['Role-based access', 'Team workspaces', 'Real-time chat', 'Audit trails']
    },
    {
      icon: BarChart3,
      title: 'Executive Dashboards',
      description: 'C-suite ready dashboards with KPIs, risk metrics, compliance status, and executive-level reporting.',
      capabilities: ['Executive KPIs', 'Risk heat maps', 'Compliance tracking', 'Custom reports']
    },
    {
      icon: Target,
      title: 'Gap Analysis Engine',
      description: 'Automated identification of security gaps, control deficiencies, and remediation recommendations.',
      capabilities: ['Control gap identification', 'Risk prioritization', 'Remediation planning', 'Progress tracking']
    },
    {
      icon: Network,
      title: 'Integration Hub',
      description: 'Seamless integration with existing security tools, SIEM platforms, and enterprise systems.',
      capabilities: ['SIEM integration', 'API connectivity', 'Webhook support', 'Custom connectors']
    },
    {
      icon: Globe,
      title: 'Multi-Framework Support',
      description: 'Support for multiple compliance frameworks simultaneously with cross-framework control mapping.',
      capabilities: ['Framework mapping', 'Control inheritance', 'Multi-standard compliance', 'Custom frameworks']
    }
  ];

  const technicalSpecs = [
    { label: 'AI Model', value: 'Claude 3 Sonnet', icon: Cpu },
    { label: 'Response Time', value: '< 2 seconds', icon: Zap },
    { label: 'Uptime SLA', value: '99.9%', icon: CheckCircle },
    { label: 'Data Encryption', value: 'AES-256', icon: Lock },
    { label: 'Compliance Ready', value: 'SOC 2 Type II', icon: Shield },
    { label: 'Global Deployment', value: 'Multi-region', icon: Globe }
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
              Enterprise-Grade
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Security Intelligence
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Harness the power of advanced AI to secure your organization with 
              military-grade precision and enterprise-scale reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="glassmorphism" size="lg">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Core Capabilities</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Four pillars of cybersecurity excellence powered by artificial intelligence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="neural" className="h-full group">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${feature.color} bg-opacity-20 border border-current/30`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-slate-300 leading-relaxed mb-4">{feature.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Advanced Features</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Comprehensive security management tools for modern enterprises
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="cyberpunk" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                      <feature.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  </div>
                  
                  <p className="text-slate-300 mb-4 leading-relaxed">{feature.description}</p>
                  
                  <div className="space-y-2">
                    {feature.capabilities.map((capability, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                        <span className="text-slate-400 text-sm">{capability}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Technical Specifications</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Enterprise-grade infrastructure built for scale and security
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalSpecs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="glassmorphism" className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                      <spec.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{spec.value}</div>
                  <div className="text-slate-400 text-sm">{spec.label}</div>
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
              Ready to Experience
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Next-Generation Security?
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of organizations using vCISO AI to strengthen their 
              cybersecurity posture and achieve compliance faster than ever.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="glassmorphism" size="lg">
                  Schedule Demo
                </Button>
              </Link>
            </div>

            <p className="text-sm text-slate-400 mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};