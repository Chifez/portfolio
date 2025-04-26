'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
export default function About() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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

    if (headingRef.current) observer.observe(headingRef.current);
    if (textRef.current) observer.observe(textRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (textRef.current) observer.unobserve(textRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <div className="px-4 lg:px-0 lg:pl-10 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 py-20 lg:py-0">
      <div className="flex flex-col justify-center lg:pt-10">
        <motion.h1
          ref={headingRef}
          className="text-6xl font-bold mb-8 opacity-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.7 : 0.5 }}
        >
          WHO AM I?
        </motion.h1>
        <motion.p
          ref={textRef}
          className="text-xl leading-relaxed text-gray-400 opacity-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.7 : 0.5, delay: 0.2 }}
        >
          I’m Emmanuel, a frontend engineer who loves making things feel
          effortless — even when they’re not. My work sits at the intersection
          of interaction and intention. I design and build interfaces that are
          fast, minimal, and thoughtful — not just in how they look, but how
          they work. I care about how users feel while using what I build. My
          toolkit shifts with the project, but you'll usually find me working
          with Next.js, Svelte, Supabase, and Tailwind. I’ve built everything
          from learning platforms to dashboards — with clean code and clean
          design going hand in hand. If it moves with purpose and looks like it
          belongs, I probably had something to do with it.
        </motion.p>

        <div className="mt-8 flex items-center">
          <div className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center mr-4">
            <Image
              src="/placeholder.svg?height=48&width=48"
              alt="Album cover"
              width={32}
              height={32}
              className="rounded"
            />
          </div>
          <div>
            <div className="text-sm">Creep</div>
            <div className="text-xs text-gray-500">Radiohead</div>
          </div>
          <div className="ml-2 w-4 h-4 bg-green-500 rounded-sm"></div>
        </div>
      </div>

      <motion.div
        ref={imageRef}
        className="flex items-center justify-center opacity-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="relative w-full h-[600px] lg:h-screen">
          <Image
            src="/placeholder.svg?height=600&width=500"
            alt="Profile image with dot pattern"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
