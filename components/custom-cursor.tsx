'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomCursorProps {
  projectImage?: string;
}

export default function CustomCursor({ projectImage }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (projectImage) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  }, [projectImage]);

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          mass: 0.6,
          stiffness: 200,
          damping: 20,
        }}
      >
        <div className="w-8 h-8 bg-white rounded-full" />
      </motion.div>

      <AnimatePresence>
        {isHovering && projectImage && (
          <motion.div
            className="fixed pointer-events-none z-40"
            initial={{
              opacity: 0,
              scale: 0.8,
              x: mousePosition.x - 100,
              y: mousePosition.y - 100,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x - 100,
              y: mousePosition.y - 100,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              mass: 0.6,
              stiffness: 200,
              damping: 20,
            }}
          >
            <motion.div
              className="w-48 h-48 rounded-lg overflow-hidden"
              initial={{ rotate: -5 }}
              animate={{ rotate: 5 }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 2,
                ease: 'easeInOut',
              }}
            >
              <img
                src={projectImage}
                alt="Project preview"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
