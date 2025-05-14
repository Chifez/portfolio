'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';

interface ProjectCursorProps {
  projectImage?: string;
}

export default function ProjectCursor({ projectImage }: ProjectCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isProjectHovering, setIsProjectHovering] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  useEffect(() => {
    if (projectImage) {
      setIsProjectHovering(true);
    } else {
      setIsProjectHovering(false);
    }
  }, [projectImage]);

  // Don't render on mobile
  if (isMobile) return null;
  return (
    <>
      <motion.div
        className="hidden lg:block fixed top-0 left-0 w-6 h-6 rounded-full bg-white mix-blend-difference pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering || isProjectHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      />

      <AnimatePresence>
        {isProjectHovering && projectImage && (
          <motion.div
            className="hidden lg:block fixed pointer-events-none z-40"
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
              y: mousePosition.y - 180,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
              mass: 0.5,
            }}
          >
            <motion.div
              className="w-52 h-32 rounded-xl p-2 overflow-hidden bg-slate-800"
              initial={{ rotate: -5 }}
              animate={{ rotate: 5 }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 2,
                ease: 'easeInOut',
              }}
            >
              <Image
                src={projectImage}
                alt="Project preview"
                fill
                priority
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
