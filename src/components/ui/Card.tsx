import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glassmorphism' | 'cyberpunk' | 'neural';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = true
}) => {
  const variants = {
    default: 'bg-slate-800 border border-slate-700',
    glassmorphism: 'bg-white/10 backdrop-blur-xl border border-white/20',
    cyberpunk: 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-cyan-500/30',
    neural: 'bg-slate-900/90 border border-cyan-500/20 relative overflow-hidden'
  };

  const hoverEffects = hover ? 'hover:shadow-2xl hover:border-cyan-500/50 hover:-translate-y-1' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        ${variants[variant]}
        ${hoverEffects}
        rounded-2xl p-6 transition-all duration-300 shadow-lg
        ${className}
      `}
    >
      {variant === 'neural' && (
        <div className="absolute inset-0 opacity-10">
          <NeuralNetworkPattern />
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

const NeuralNetworkPattern: React.FC = () => (
  <svg className="w-full h-full" viewBox="0 0 400 300">
    <defs>
      <pattern id="neural-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.3" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#neural-grid)" />
    {/* Neural connection lines */}
    <g stroke="currentColor" strokeWidth="0.5" opacity="0.2">
      <line x1="40" y1="40" x2="120" y2="80" />
      <line x1="120" y1="80" x2="200" y2="40" />
      <line x1="200" y1="40" x2="280" y2="120" />
      <line x1="80" y1="160" x2="160" y2="120" />
      <line x1="160" y1="120" x2="240" y2="200" />
    </g>
  </svg>
);