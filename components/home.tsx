'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedName from './animations/animated-name';

const socialLinks = [
  {
    href: 'https://github.com/Chifez',
    label: 'github',
  },
  {
    href: 'https://twitter.com/chifez4u',
    label: 'follow on twitter',
  },
  {
    href: 'https://linkedin.com/in/nwosuifeanyiemmanuel',
    label: 'visit linkedin',
  },
];

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
    <div className="cursor-pointer min-h-screen flex flex-col">
      <div className="mt-40 px-2 lg:px-4">
        <AnimatedName />
      </div>

      <motion.div
        className="fixed bottom-8 flex justify-end w-full px-8 space-x-8"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
          exit: {
            opacity: 0,
            transition: {
              staggerChildren: 0.1,
              staggerDirection: -1,
            },
          },
        }}
      >
        {socialLinks.map((link, index) => (
          <motion.div
            key={link.href}
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  ease: [0.32, 0.72, 0, 1],
                },
              },
              exit: {
                opacity: 0,
                y: -20,
                transition: {
                  duration: 1,
                  ease: [0.32, 0.72, 0, 1],
                },
              },
            }}
          >
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
