import React from 'react';
import { motion } from 'framer-motion';

export const FibonacciSpiral: React.FC = () => {
  // Generate fibonacci sequence
  const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="spiral-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Fibonacci spiral path */}
        <motion.path
          d="M500,500 Q600,400 700,500 Q700,600 600,700 Q400,700 300,600 Q300,300 600,300 Q800,300 800,600 Q800,900 500,900 Q100,900 100,500 Q100,0 700,0"
          fill="none"
          stroke="url(#spiral-gradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        
        {/* Fibonacci squares */}
        {fibonacci.slice(0, 8).map((num, index) => {
          const size = num * 20;
          const x = 500 + (index % 2 === 0 ? 1 : -1) * index * 30;
          const y = 500 + (index % 2 === 0 ? 1 : -1) * index * 20;
          
          return (
            <motion.rect
              key={index}
              x={x - size / 2}
              y={y - size / 2}
              width={size}
              height={size}
              fill="none"
              stroke="rgb(34, 197, 94)"
              strokeWidth="1"
              strokeOpacity="0.2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};