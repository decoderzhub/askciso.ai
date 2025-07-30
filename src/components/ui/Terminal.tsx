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