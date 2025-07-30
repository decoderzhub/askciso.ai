import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Brain, 
  Zap, 
  Lock, 
  Users, 
  BarChart3,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { ParticleNetwork } from '../components/animations/ParticleNetwork';
import { FibonacciSpiral } from '../components/animations/FibonacciSpiral';
import { HolographicDashboard } from '../components/animations/HolographicDashboard';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Terminal, TerminalLine } from '../components/ui/Terminal';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Security Intelligence',
      description: 'Advanced neural networks analyze your security posture and provide intelligent recommendations.',
      metrics: [
        { label: 'Threat Detection', value: 98 },
        { label: 'False Positives', value: 15 },
        { label: 'Response Time', value: 85 }
      ]
    },
    {
      icon: Shield,
      title: 'Compliance Automation',
      description: 'Automated gap analysis and control mapping for NIST, SOC2, ISO27001, and CMMC frameworks.',
      metrics: [
        { label: 'Frameworks Supported', value: 12 },
        { label: 'Controls Mapped', value: 95 },
        { label: 'Automation Rate', value: 89 }
      ]
    },
    {
      icon: Lock,
      title: 'Risk Assessment & TPRM',
      description: 'Intelligent third-party risk management with automated vendor assessment and monitoring.',
      metrics: [
        { label: 'Risk Accuracy', value: 94 },
        { label: 'Vendor Coverage', value: 78 },
        { label: 'Time Saved', value: 67 }
      ]
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: 'Continuous security monitoring with instant alerts and automated incident response workflows.',
      metrics: [
        { label: 'Uptime', value: 99 },
        { label: 'Alert Accuracy', value: 92 },
        { label: 'MTTR Reduction', value: 73 }
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CISO at TechCorp',
      company: 'Fortune 500 Technology Company',
      content: 'vCISO AI transformed our security operations. We achieved SOC2 compliance 60% faster than traditional methods.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'IT Director',
      company: 'Healthcare Systems Inc.',
      content: 'The AI-powered risk assessments are incredibly accurate. We\'ve prevented 3 major incidents this quarter alone.',
      rating: 5
    },
    {
      name: 'Emily Watson',
      role: 'Compliance Manager',
      company: 'Financial Services Group',
      content: 'Best investment we\'ve made in cybersecurity. The CMMC compliance features are essential for federal contracts.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero Section with Golden Ratio Layout */}
      <section className="relative min-h-screen overflow-hidden">
        <FibonacciSpiral />
        <ParticleNetwork />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid h-screen grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main Content - Golden Ratio Width */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Neural Security
                  </span>
                  <br />
                  <span className="text-white">Intelligence</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-slate-300 mt-6 max-w-2xl leading-relaxed">
                  AI-powered Virtual CISO that adapts to your environment, 
                  learns from your policies, and thinks like your security team.
                  <span className="block mt-2 text-cyan-400 font-semibold">
                    Enterprise-grade security intelligence for the modern threat landscape.
                  </span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/chat">
                  <Button 
                    variant="terminal" 
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Launch CISO AI Terminal
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="glassmorphism" size="lg">
                    Request Security Assessment
                  </Button>
                </Link>
              </motion.div>

              {/* Live Metrics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-700/50"
              >
                {[
                  { label: 'Threats Neutralized', value: '10.2K+', icon: Shield },
                  { label: 'Compliance Checks', value: '847K+', icon: CheckCircle },
                  { label: 'Enterprise Clients', value: '1.2K+', icon: Users }
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-5 h-5 text-cyan-400 mr-2" />
                      <span className="text-2xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Holographic Dashboard - Golden Ratio Width */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <HolographicDashboard />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Hexagonal Layout */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Enterprise-Grade
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Security Intelligence
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Harness the power of advanced AI to secure your organization with 
              military-grade precision and enterprise-scale reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="neural" className="h-full group">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                      <feature.icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {feature.metrics.map((metric) => (
                      <div key={metric.label} className="flex justify-between items-center">
                        <span className="text-slate-400">{metric.label}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${metric.value}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                          <span className="text-cyan-400 font-mono text-sm w-12 text-right">
                            {metric.value}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Demo Section */}
      <section className="py-24 bg-gradient-to-r from-slate-900 via-purple-900/10 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Experience the
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                CISO AI Terminal
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Chat with our AI-powered Virtual CISO and get expert security guidance instantly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Terminal>
              <TerminalLine type="success" delay={500}>
                CISO AI Terminal initialized successfully
              </TerminalLine>
              <TerminalLine type="output" delay={1000}>
                Loading neural security intelligence modules...
              </TerminalLine>
              <TerminalLine type="success" delay={1500}>
                Connected to threat intelligence feeds
              </TerminalLine>
              <TerminalLine type="input" delay={2000}>
                help me create a NIST cybersecurity framework implementation plan
              </TerminalLine>
              <TerminalLine type="output" delay={2500}>
                Analyzing your organization's security posture...
              </TerminalLine>
              <TerminalLine type="success" delay={3000}>
                Generated comprehensive NIST CSF roadmap with 23 priority controls
              </TerminalLine>
              <TerminalLine type="output" delay={3500}>
                ✓ Identify phase: Asset inventory and risk assessment complete
              </TerminalLine>
              <TerminalLine type="output" delay={4000}>
                ✓ Protect phase: 89% implementation recommended
              </TerminalLine>
              <TerminalLine type="warning" delay={4500}>
                ⚠ Detect phase: 3 critical monitoring gaps identified
              </TerminalLine>
            </Terminal>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-8"
          >
            <Link to="/chat">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Try CISO AI Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Security Leaders
            </h2>
            <p className="text-xl text-slate-300">
              See what CISOs and security professionals are saying about vCISO AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="glassmorphism" className="h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-slate-200 mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-cyan-400 text-sm">{testimonial.role}</div>
                    <div className="text-slate-400 text-sm">{testimonial.company}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-cyan-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Security Operations?
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
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