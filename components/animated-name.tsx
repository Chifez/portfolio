'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RollingTitles } from './rolling-title';
import InfiniteCarousel from './infinite-carousel';

const titles = ['FRONTEND ENGINEER', 'FULLSTACK ENGINEER'];

export default function AnimatedName() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Title rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Desktop Layout */}
      {!isMobile && (
        <div>
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[8rem] sm:text-[9rem] md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-bold text-gray-400 leading-[0.85] tracking-tighter"
            >
              IFEANYI
            </motion.div>
            <RollingTitles />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[8rem] sm:text-[9rem] md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-bold text-gray-400 leading-[0.85] tracking-tighter"
          >
            EMMANUEL
          </motion.div>
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <div className="relative flex flex-col items-center justify-center h-[400px] w-full overflow-hidden">
          {/* Top Row - Right to Left */}
          <InfiniteCarousel text="IFEANYI EMMANUEL" direction="left" />

          {/* Middle - Rolling Title */}
          <RollingTitles />

          {/* Bottom Row - Left to Right */}
          <InfiniteCarousel text="IFEANYI EMMANUEL" direction="right" />
        </div>
      )}
    </div>
  );
}
