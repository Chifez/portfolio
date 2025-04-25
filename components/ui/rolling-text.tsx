'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RollingTextProps {
  titles: string[];
  interval?: number;
  className?: string;
}

export function RollingText({
  titles,
  interval = 3000,
  className,
}: RollingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, titles.length]);

  return (
    <div
      className={`relative w-full text-nowrap ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{
            rotateX: -90,
            opacity: 0,
            position: 'absolute',
            y: '100%',
          }}
          animate={{
            rotateX: 0,
            opacity: 1,
            y: 0,
          }}
          exit={{
            rotateX: 90,
            opacity: 0,
            position: 'absolute',
            y: '-100%',
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          style={{
            transformOrigin: 'bottom',
            backfaceVisibility: 'hidden',
          }}
        >
          {titles[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
