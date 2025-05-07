'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// A circular progress indicator component
const CircularProgress = ({ progress = 0 }) => {
  // Calculate the SVG path for the progress arc
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10">
      {/* Background circle */}
      <svg className="absolute w-full h-full" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r={radius}
          stroke="rgba(75, 85, 99, 0.3)"
          strokeWidth="4"
          fill="none"
        />
      </svg>

      {/* Progress circle */}
      <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r={radius}
          stroke="#d1d5db"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Center arrow */}
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <ArrowDown />
      </div>
    </div>
  );
};

export function ScrollIndicator({ progress = 0, isMobile = false }) {
  return (
    <motion.div
      className="flex items-center justify-center gap-2 text-center text-gray-500 text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <span>{isMobile ? 'scroll right' : 'scroll down'}</span>

      {/* Use the circular progress component */}
      <CircularProgress progress={isMobile ? 1 : progress} />
    </motion.div>
  );
}
