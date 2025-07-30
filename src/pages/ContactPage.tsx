import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Calendar,
  Users,
  Building2,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ParticleNetwork } from '../components/animations/ParticleNetwork';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    companySize: '',
    inquiryType: 'demo',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: MessageSquare,
      title: 'Schedule a Demo',
      description: 'See vCISO AI in action with a personalized demonstration',
      action: 'Book Demo',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20'
    },
    {
      icon: Phone,
      title: 'Sales Consultation',
      description: 'Speak with our security experts about your specific needs',
      action: 'Call Sales',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      icon: Mail,
      title: 'Technical Support',
      description: 'Get help with implementation and technical questions',
      action: 'Contact Support',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ];

  const companyInfo = [
    {
      icon: MapPin,
      title: 'Headquarters',
      details: ['San Francisco, CA', 'United States']
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday', '9:00 AM - 6:00 PM PST']
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', 'Sales & Support']
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['hello@vciso-ai.com', 'General Inquiries']
    }
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-1000 employees',
    '1000+ employees'
  ];

  const inquiryTypes = [
    { value: 'demo', label: 'Schedule a Demo' },
    { value: 'sales', label: 'Sales Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center">
        <ParticleNetwork />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center max-w-md mx-auto px-4"
        >
          <Card variant="cyberpunk" className="p-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Message Sent!</h2>
            <p className="text-slate-300 mb-6">
              Thank you for contacting us. Our team will get back to you within 24 hours.
            </p>
            <Button 
              variant="primary" 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  company: '',
                  jobTitle: '',
                  companySize: '',
                  inquiryType: 'demo',
                  message: ''
                });
              }}
            >
              Send Another Message
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

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
              Get in Touch
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                With Our Experts
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Ready to transform your cybersecurity posture? Our team of security experts 
              is here to help you get started with vCISO AI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="neural" className="text-center h-full">
                  <div className={`w-16 h-16 ${method.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <method.icon className={`w-8 h-8 ${method.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{method.title}</h3>
                  <p className="text-slate-300 mb-6">{method.description}</p>
                  <Button variant="glassmorphism" className="w-full">
                    {method.action}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card variant="cyberpunk">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                      placeholder="john.doe@company.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        placeholder="Acme Corp"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Job Title
                      </label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        placeholder="CISO"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Company Size
                    </label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                    >
                      <option value="">Select company size</option>
                      {companySizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                    >
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none"
                      placeholder="Tell us about your cybersecurity needs..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    loading={isSubmitting}
                    icon={Send}
                    iconPosition="right"
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Our team of cybersecurity experts is ready to help you strengthen your 
                  security posture. Whether you need a demo, have technical questions, 
                  or want to discuss your specific requirements, we're here to help.
                </p>
              </div>

              <div className="space-y-6">
                {companyInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card variant="glassmorphism">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex-shrink-0">
                          <info.icon className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-slate-300">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card variant="neural" className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Response Time</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-slate-300">Sales inquiries: Within 2 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="text-slate-300">Technical support: Within 4 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span className="text-slate-300">General inquiries: Within 24 hours</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};