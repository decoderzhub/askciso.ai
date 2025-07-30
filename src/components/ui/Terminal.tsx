import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

  const conversation = [
    {
      type: 'input' as const,
      content: 'askCISO --help',
      delay: 500
    },
    {
      type: 'output' as const,
      content: 'askCISO AI v2.0 - Your Virtual Chief Information Security Officer',
      delay: 1000
    },
    {
      type: 'output' as const,
      content: 'Available commands: compliance, risk-assessment, policy-review, incident-response',
      delay: 1500
    },
    {
      type: 'input' as const,
      content: 'How do I implement NIST Cybersecurity Framework for my organization?',
      delay: 2500
    },
    {
      type: 'success' as const,
      content: 'askCISO AI: Analyzing your request...',
      delay: 3000
    },
    {
      type: 'output' as const,
      content: 'NIST CSF Implementation Roadmap:',
      delay: 3500
    },
    {
      type: 'output' as const,
      content: '1. IDENTIFY: Asset inventory & risk assessment (Weeks 1-4)',
      delay: 4000
    },
    {
      type: 'output' as const,
      content: '2. PROTECT: Access controls & security policies (Weeks 5-12)',
      delay: 4500
    },
    {
      type: 'output' as const,
      content: '3. DETECT: Monitoring & anomaly detection (Weeks 13-20)',
      delay: 5000
    },
    {
      type: 'output' as const,
      content: '4. RESPOND: Incident response procedures (Weeks 21-24)',
      delay: 5500
    },
    {
      type: 'output' as const,
      content: '5. RECOVER: Business continuity planning (Weeks 25-28)',
      delay: 6000
    },
    {
      type: 'input' as const,
      content: 'What about SOC 2 compliance for our SaaS product?',
      delay: 7000
    },
    {
      type: 'success' as const,
      content: 'askCISO AI: Processing SOC 2 requirements...',
      delay: 7500
    },
    {
      type: 'output' as const,
      content: 'SOC 2 Type II Compliance Plan:',
      delay: 8000
    },
    {
      type: 'output' as const,
      content: '• Security: Multi-factor authentication, encryption at rest/transit',
      delay: 8500
    },
    {
      type: 'output' as const,
      content: '• Availability: 99.9% uptime SLA, redundant infrastructure',
      delay: 9000
    },
    {
      type: 'output' as const,
      content: '• Processing Integrity: Data validation, error handling',
      delay: 9500
    },
    {
      type: 'output' as const,
      content: '• Confidentiality: Data classification, access controls',
      delay: 10000
    },
    {
      type: 'success' as const,
      content: 'Estimated timeline: 6-9 months for full implementation',
      delay: 10500
    }
  ];

  useEffect(() => {
    if (currentStep < conversation.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, conversation[currentStep].delay);
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      // Reset after showing complete conversation for 3 seconds
      const resetTimer = setTimeout(() => {
        setCurrentStep(0);
        setIsComplete(false);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentStep, conversation, isComplete]);

  return (
    <Terminal title="askCISO_AI_Terminal_v2.0" className="max-w-4xl mx-auto">
      {conversation.slice(0, currentStep).map((line, index) => (
        <TerminalLine key={index} type={line.type}>
          {line.content}
        </TerminalLine>
      ))}
      {currentStep < conversation.length && (
        <TerminalLine type="input">
          <span className="animate-pulse">|</span>
        </TerminalLine>
      )}
    </Terminal>
  );
};