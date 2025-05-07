'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/lib/context/navigation-context';

export default function PageTransition({ children }: { children: ReactNode }) {
  const { isTransitioning } = useNavigation();
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [overlayState, setOverlayState] = useState<
    'hidden' | 'entering' | 'exiting'
  >('hidden');

  useEffect(() => {
    if (isTransitioning) {
      // Start overlay scale down (entering: covering page)
      setOverlayState('entering');

      const enterTimeout = setTimeout(() => {
        // Swap page content once covered
        setDisplayedChildren(children);
        setOverlayState('exiting'); // Scale overlay back up (revealing page)

        const exitTimeout = setTimeout(() => {
          setOverlayState('hidden');
        }, 800);

        return () => clearTimeout(exitTimeout);
      }, 800);

      return () => clearTimeout(enterTimeout);
    }
  }, [isTransitioning, children]);

  return (
    <>
      {/* Page content */}
      <div className="w-full">{displayedChildren}</div>

      {/* Overlay */}
      <AnimatePresence>
        {overlayState !== 'hidden' && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black z-50"
            style={{
              transformOrigin: overlayState === 'entering' ? 'top' : 'bottom',
            }}
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: overlayState === 'entering' ? 1 : 0,
            }}
            exit={{ scaleY: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
