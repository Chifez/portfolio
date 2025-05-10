'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/logo';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#111111]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Logo size={80} showRing={true} />
      </motion.div>

      <motion.h1
        className="text-7xl md:text-9xl font-bold text-gray-300 mb-4 tracking-tighter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl text-gray-400 mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link
          href="/"
          className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-sm transition-colors inline-flex items-center"
        >
          Back to Home
        </Link>
      </motion.div>

      <motion.div
        className="absolute bottom-8 text-center text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p>Lost? Don't worry, it happens to the best of us.</p>
      </motion.div>
    </div>
  );
}
