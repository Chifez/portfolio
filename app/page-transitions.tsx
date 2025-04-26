'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionsProps {
  children: ReactNode;
}

export default function PageTransitions({ children }: PageTransitionsProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
