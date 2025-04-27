'use client'; // if using Next.js app router

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState } from 'react';

export default function ProjectCard({
  project,
  children,
}: {
  project: any;
  children: ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative" // important for the positioning
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Your card content */}
      {children}

      {/* Floating Preview Image */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="pointer-events-none fixed z-50" // fixed to viewport
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePos.x + 20, // add slight offset
              y: mousePos.y + 20,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ width: 200, height: 120 }} // adjust as you need
          >
            <img
              src="/user.webp"
              alt="Profile"
              //   width={48}
              //   height={48}
              //   src={project.previewImage}
              //   alt="preview"
              className="w-full h-full object-cover rounded-md shadow-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
