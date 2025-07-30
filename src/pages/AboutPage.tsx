import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Target, 
  Users, 
  Award, 
  Brain, 
  Zap,
  Globe,
  Heart,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { ParticleNetwork } from '../components/animations/ParticleNetwork';

export const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We believe cybersecurity should be accessible to every organization, regardless of size or budget.',
      color: 'text-cyan-400'
    },
    {
      icon: Brain,
      title: 'AI-Powered Innovation',
      description: 'Leveraging cutting-edge artificial intelligence to make cybersecurity smarter and more effective.',
      color: 'text-purple-400'
    },
    {
      icon: Users,
      title: 'Customer Success',
      description: 'Our success is measured by our customers\' security posture and compliance achievements.',
      color: 'text-green-400'
    },
    {
      icon: Heart,
      title: 'Transparency',
      description: 'Open, honest communication and transparent pricing with no hidden fees or surprises.',
      color: 'text-red-400'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former CISO at Fortune 500 companies with 15+ years in cybersecurity leadership.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'AI/ML expert and former security architect with deep expertise in neural networks.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      social: {
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Emily Watson',
      role: 'VP of Compliance',
      bio: 'Former Big 4 consultant specializing in cybersecurity frameworks and regulatory compliance.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'David Kim',
      role: 'VP of Engineering',
      bio: 'Full-stack architect with expertise in scalable security platforms and enterprise systems.',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
      social: {
        linkedin: '#',
        github: '#'
      }
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Company Founded',
      description: 'vCISO AI was founded with the mission to democratize enterprise-grade cybersecurity.'
    },
    {
      year: '2023',
      title: 'Seed Funding',
      description: 'Raised $5M in seed funding from leading cybersecurity and AI investors.'
    },
    {
      year: '2024',
      title: 'Product Launch',
      description: 'Launched our AI-powered Virtual CISO platform with initial customer base.'
    },
    {
      year: '2024',
      title: 'SOC 2 Certified',
      description: 'Achieved SOC 2 Type II certification, demonstrating our commitment to security.'
    },
    {
      year: '2024',
      title: '1000+ Customers',
      description: 'Reached milestone of serving over 1000 organizations across various industries.'
    },
    {
      year: '2025',
      title: 'Series A',
      description: 'Raised $15M Series A to accelerate product development and market expansion.'
    }
  ];

  const stats = [
    { label: 'Organizations Protected', value: '1,200+', icon: Shield },
    { label: 'Threats Neutralized', value: '10.2K+', icon: Target },
    { label: 'Compliance Checks', value: '847K+', icon: Award },
    { label: 'Team Members', value: '45+', icon: Users }
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
              Securing the Future
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                With AI Intelligence
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We're on a mission to democratize enterprise-grade cybersecurity, making advanced 
              security intelligence accessible to organizations of all sizes through the power of AI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="neural" className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                      <stat.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                In today's threat landscape, every organization needs enterprise-grade cybersecurity, 
                but traditional solutions are complex, expensive, and require specialized expertise 
                that many companies can't afford.
              </p>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                We're changing that by combining artificial intelligence with deep cybersecurity 
                expertise to create a Virtual CISO that thinks, learns, and adapts to your 
                organization's unique needs.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Our vision is a world where every organization, regardless of size or budget, 
                has access to world-class cybersecurity guidance and protection.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Card variant="cyberpunk" className="p-8">
                <div className="text-center">
                  <Globe className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Global Impact</h3>
                  <p className="text-slate-300 mb-6">
                    Protecting organizations across 50+ countries with AI-powered security intelligence.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-cyan-400">50+</div>
                      <div className="text-slate-400 text-sm">Countries</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">24/7</div>
                      <div className="text-slate-400 text-sm">Protection</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="glassmorphism" className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-slate-800 flex-shrink-0">
                      <value.icon className={`w-6 h-6 ${value.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                      <p className="text-slate-300 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Leadership Team</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Meet the cybersecurity experts and AI innovators building the future of security
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="neural" className="text-center">
                  <div className="mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-cyan-500/30"
                    />
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-cyan-400 text-sm mb-3">{member.role}</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                  
                  <div className="flex justify-center gap-3">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-slate-400 hover:text-cyan-400 transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="text-slate-400 hover:text-cyan-400 transition-colors">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} className="text-slate-400 hover:text-cyan-400 transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-slate-300">
              Key milestones in our mission to democratize cybersecurity
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 relative z-10">
                    {milestone.year}
                  </div>
                  <Card variant="glassmorphism" className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-slate-300">{milestone.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
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
              Join Our Mission
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for 
              cybersecurity and AI innovation. Help us build the future of security.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:careers@vciso-ai.com">
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                  View Open Positions
                </button>
              </a>
              <a href="mailto:hello@vciso-ai.com">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 font-semibold rounded-xl transition-all duration-300">
                  Get in Touch
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};