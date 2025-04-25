'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
}

export function AnimatedBackground({ className }: AnimatedBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const gradientVariants = {
    animate: {
      background: [
        `radial-gradient(circle at ${mousePosition.x * 100}% ${
          mousePosition.y * 100
        }%, hsl(var(--primary) / 0.1), transparent 40%)`,
      ],
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={cn('fixed inset-0 -z-10 opacity-70', className)}
      variants={gradientVariants}
      animate="animate"
    />
  );
}
