'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Text3DEffectProps {
  text: string;
  className?: string;
  depth?: number;
  color?: string;
  shadowColor?: string;
}

export function Text3DEffect({
  text,
  className,
  depth = 8,
  color = 'text-primary',
  shadowColor = 'rgba(0,0,0,0.2)',
}: Text3DEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top, width, height } =
          containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create text shadow for 3D effect
  const generateTextShadow = () => {
    let shadows = [];
    for (let i = 1; i <= depth; i++) {
      shadows.push(`${i}px ${i}px 0 ${shadowColor}`);
    }
    return shadows.join(', ');
  };

  const textVariants = {
    initial: {
      textShadow: generateTextShadow(),
    },
    animate: {
      textShadow: generateTextShadow(),
      rotateX: mousePosition.y * -1,
      rotateY: mousePosition.x,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 25,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn('perspective-1000 transform-style-3d', className)}
      style={{ perspective: '1000px' }}
      initial="initial"
      animate="animate"
      variants={textVariants}
    >
      <motion.span
        className={cn('inline-block font-extrabold', color)}
        style={{
          textShadow: generateTextShadow(),
          transformStyle: 'preserve-3d',
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}
