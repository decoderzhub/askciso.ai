import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'terminal' | 'glassmorphism' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg hover:shadow-cyan-500/25 focus:ring-cyan-500',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 hover:border-slate-500 focus:ring-slate-500',
    terminal: 'bg-black border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/25 font-mono focus:ring-cyan-500',
    glassmorphism: 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:shadow-lg hover:shadow-white/10 focus:ring-white/50',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/25 focus:ring-red-500'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl'
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <div className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {Icon && iconPosition === 'left' && <Icon size={18} />}
        {children}
        {Icon && iconPosition === 'right' && <Icon size={18} />}
      </div>
    </motion.button>
  );
};