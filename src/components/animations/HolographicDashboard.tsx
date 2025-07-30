import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, TrendingUp, Lock } from 'lucide-react';

export const HolographicDashboard: React.FC = () => {
  const metrics = [
    { label: 'Security Score', value: '94%', icon: Shield, color: 'text-green-400' },
    { label: 'Active Threats', value: '3', icon: Activity, color: 'text-yellow-400' },
    { label: 'Compliance', value: '87%', icon: TrendingUp, color: 'text-cyan-400' },
    { label: 'Encrypted Assets', value: '256', icon: Lock, color: 'text-purple-400' }
  ];

  return (
    <div className="relative w-96 h-96">
      {/* Holographic Base */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-cyan-500/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Central Core */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-24 h-24 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          left: '50%',
          top: '50%'
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur-lg opacity-50" />
        <Shield className="absolute top-1/2 left-1/2 w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 text-white z-10" style={{
          left: '50%',
          top: '50%'
        }} />
      </motion.div>

      {/* Orbiting Metrics */}
      {metrics.map((metric, index) => {
        const angle = (index * 90) * (Math.PI / 180);
        const radius = 140;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={metric.label}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`
            }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
          >
            <motion.div
              className="bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-3 min-w-28 whitespace-nowrap"
              whileHover={{ 
                scale: 1.1, 
                borderColor: 'rgb(34 197 94 / 0.8)',
                y: -4
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
                <div>
                  <div className={`text-sm font-bold ${metric.color}`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-400">
                    {metric.label}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Data Streams */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="stream-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(34, 197, 94)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {[0, 1, 2, 3].map(index => (
          <motion.line
            key={index}
            x1="50%"
            y1="50%"
            x2="90%"
            y2="50%"
            stroke="url(#stream-gradient)"
            strokeWidth="2"
            transform={`rotate(${index * 90} 200 200)`}
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
};