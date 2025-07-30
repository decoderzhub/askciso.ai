import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface TerminalProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({
  children,
  title = 'CISO_AI_Terminal_v2.0',
  className = ''
}) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-black/95 backdrop-blur-xl border border-cyan-500/50 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/20 ${className}`}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-cyan-500/30">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm font-mono">{title}</span>
          <span className="text-cyan-400 text-sm font-mono">{currentTime}</span>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="p-6 font-mono text-sm">
        {children}
      </div>
    </motion.div>
  );
};

interface TerminalLineProps {
  type?: 'input' | 'output' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  delay?: number;
}

export const TerminalLine: React.FC<TerminalLineProps> = ({
  type = 'output',
  children,
  delay = 0
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const prefixes = {
    input: <span className="text-cyan-400">user@security:~$</span>,
    output: <span className="text-slate-300">&gt;</span>,
    success: <span className="text-green-400">✓</span>,
    warning: <span className="text-yellow-400">⚠</span>,
    error: <span className="text-red-400">✗</span>
  };

  const colors = {
    input: 'text-green-400',
    output: 'text-slate-300',
    success: 'text-green-300',
    warning: 'text-yellow-300',
    error: 'text-red-300'
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-2 mb-2 ${colors[type]}`}
    >
      {prefixes[type]}
      <span>{children}</span>
      {type === 'input' && <span className="animate-pulse">|</span>}
    </motion.div>
  );
};

export const AnimatedTerminalDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'assistant', content: string}>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const conversationSteps = [
    {
      type: 'user' as const,
      content: 'How do I implement NIST Cybersecurity Framework for my organization?',
      delay: 1000
    },
    {
      type: 'assistant' as const,
      content: 'I\'ll help you create a comprehensive NIST CSF implementation roadmap tailored to your organization.\n\n**NIST Cybersecurity Framework Implementation Plan:**\n\n**Phase 1: IDENTIFY (Weeks 1-4)**\n• Asset inventory and classification\n• Risk assessment and threat modeling\n• Business environment analysis\n• Governance structure establishment\n\n**Phase 2: PROTECT (Weeks 5-12)**\n• Access control implementation\n• Security awareness training\n• Data security measures\n• Protective technology deployment\n\n**Phase 3: DETECT (Weeks 13-20)**\n• Continuous monitoring setup\n• Anomaly detection systems\n• Security event logging\n• Detection process refinement\n\n**Phase 4: RESPOND (Weeks 21-24)**\n• Incident response procedures\n• Communication protocols\n• Analysis and mitigation strategies\n• Improvement processes\n\n**Phase 5: RECOVER (Weeks 25-28)**\n• Recovery planning\n• Business continuity procedures\n• Communication strategies\n• Lessons learned integration',
      delay: 1500
    },
    {
      type: 'user' as const,
      content: 'What about SOC 2 compliance for our SaaS product?',
      delay: 4000
    },
    {
      type: 'assistant' as const,
      content: 'Excellent question! SOC 2 Type II compliance is crucial for SaaS providers. Here\'s your implementation roadmap:\n\n**SOC 2 Type II Compliance Plan:**\n\n**Security Criteria:**\n• Multi-factor authentication (MFA) for all users\n• Encryption at rest and in transit (AES-256)\n• Network security controls and firewalls\n• Vulnerability management program\n\n**Availability Criteria:**\n• 99.9% uptime SLA with monitoring\n• Redundant infrastructure and failover\n• Capacity planning and performance monitoring\n• Incident response for availability issues\n\n**Processing Integrity:**\n• Data validation and error handling\n• System processing controls\n• Automated monitoring of data flows\n• Quality assurance procedures\n\n**Confidentiality (if applicable):**\n• Data classification and handling\n• Access controls and least privilege\n• Confidentiality agreements\n• Secure data disposal\n\n**Timeline:** 6-9 months for full implementation\n**Audit Frequency:** Annual Type II audits\n**Cost Estimate:** $50K-$150K depending on organization size',
      delay: 4500
    }
  ];

  useEffect(() => {
    if (currentStep < conversationSteps.length) {
      const timer = setTimeout(() => {
        const step = conversationSteps[currentStep];
        setMessages(prev => [...prev, { type: step.type, content: step.content }]);
        setCurrentStep(currentStep + 1);
      }, conversationSteps[currentStep].delay);
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      // Reset after showing complete conversation for 3 seconds
      const resetTimer = setTimeout(() => {
        setCurrentStep(0);
        setMessages([]);
        setIsComplete(false);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentStep, conversationSteps, isComplete]);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/50 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/20"
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-cyan-500/30">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm font-mono">AskCiso.AI Chat</span>
            <span className="text-cyan-400 text-sm font-mono">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        
        {/* Chat Messages - Scrollable */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-900">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-3xl ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                <div className={`p-4 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-cyan-600/20 border border-cyan-500/30 text-cyan-100' 
                    : 'bg-slate-800/50 border border-slate-700 text-slate-200'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                </div>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </motion.div>
          ))}
          
          {currentStep < conversationSteps.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-75" />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150" />
                <span className="ml-2 text-sm">AskCiso.AI is thinking...</span>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input (Demo) */}
        <div className="border-t border-slate-700 p-4 bg-slate-800/50">
          <div className="flex gap-3">
            <div className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-400 text-sm">
              Ask me about cybersecurity, compliance, or risk management...
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg text-sm font-medium">
              Send
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};