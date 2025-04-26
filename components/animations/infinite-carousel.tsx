'use client';

import { motion } from 'framer-motion';

interface InfiniteCarouselProps {
  text: string;
  direction: 'left' | 'right';
  className?: string;
}

export default function InfiniteCarousel({
  text,
  direction,
  className = '',
}: InfiniteCarouselProps) {
  // Create an array of 4 sets of text to ensure smooth infinite loop
  const carouselText = Array(4).fill(text).join(' • ');

  return (
    <div className="relative w-full h-32 overflow-hidden">
      <motion.div
        className="absolute whitespace-nowrap"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <span
          className={`text-[8rem] sm:text-[9rem] font-bold text-gray-400 leading-[0.85] tracking-tighter ${className}`}
        >
          {carouselText}
        </span>
      </motion.div>
    </div>
  );
}
