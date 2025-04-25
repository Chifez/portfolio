'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedName from './animated-name';

export default function Home() {
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (nameRef.current) {
      observer.observe(nameRef.current);
    }

    return () => {
      if (nameRef.current) {
        observer.unobserve(nameRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="min-h-screen flex flex-col"
    >
      <div className="mt-40 px-2 lg:px-4">
        <AnimatedName />
      </div>

      <div className="fixed bottom-8 flex justify-end w-full px-8 space-x-8">
        <Link
          href="https://github.com/Chifez"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          github
        </Link>
        <Link
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          follow on twitter
        </Link>
        <Link
          href="https://linkedin.com/in/nwosuifeanyiemmanuel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          visit linkedin
        </Link>
      </div>
    </motion.div>
  );
}
