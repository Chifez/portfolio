'use client';

import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigation } from '@/lib/context/navigation-context';
import { useCursorStore } from '@/lib/store/cursor-store';
import { Project } from '@/lib/types';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';
import ProjectCursor from './project-cursor';

const projectImageSources = Array.from(
  new Set(projects.map((project) => project.image).filter(Boolean))
);

type ProjectRowProps = {
  project: Project;
  index: number;
  isActive: boolean;
  onToggle: (index: number) => void;
  onPreview: (image: string | null) => void;
  isMobile: boolean;
};

function ProjectRow({
  project,
  index,
  isActive,
  onToggle,
  onPreview,
  isMobile,
}: ProjectRowProps) {
  const imageSrc = project.image ?? '/placeholder.svg';

  const handlePointerEnter = () => {
    if (isMobile) return;
    onPreview(imageSrc);
  };

  const handlePointerLeave = () => {
    if (isMobile) return;
    onPreview(null);
  };

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } }}
      className="border-b border-white/10 transition-all duration-500 ease-[cubic-bezier(0.22,0.68,0,1.01)]"
    >
      <motion.button
        type="button"
        layout
        className="relative w-full cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,0.68,0,1.01)]"
        onClick={() => onToggle(index)}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
        onFocus={handlePointerEnter}
        onBlur={handlePointerLeave}
        transition={{ layout: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } }}
      >
        <div
          className={cn(
            'overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,0.68,0,1.01)]',
            isActive ? 'py-6 md:py-8' : 'py-10 md:py-12'
          )}
        >
          <motion.h2
            layout
            animate={{ opacity: isActive ? 0.2 : 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'text-3xl md:text-5xl font-bold uppercase tracking-tight text-center transition duration-300',
              isActive ? 'text-white' : 'text-white/80'
            )}
          >
            {project.title}
          </motion.h2>
        </div>

        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ opacity: isActive ? 0.35 : 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0 -z-10 bg-black"
        />

        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              key="expanded"
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative w-full overflow-visible"
            >
              <div className="relative flex flex-col items-center gap-6 md:gap-8 pb-12 md:pb-16 pt-12 md:pt-32">
                <div className="md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2 md:-translate-y-[60%] w-full flex justify-center">
                  <div className="relative w-[90vw] aspect-video overflow-hidden rounded-2xl border border-white/20 bg-black/30 shadow-lg shadow-black/40 md:w-[20rem]">
                    <Image
                      src={imageSrc}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 90vw, 20rem"
                      className="object-cover"
                      priority
                      loading="eager"
                    />
                  </div>
                </div>
                <h3 className="text-3xl md:text-5xl font-semibold uppercase tracking-tight text-white text-center">
                  {project.title}
                </h3>
                <div className="flex flex-wrap justify-center gap-3 uppercase tracking-[0.25em] text-[10px] md:text-xs text-gray-200">
                  {project.technologies.map((tech) => (
                    <span
                      key={`${project.title}-${tech}`}
                      className="rounded-full border border-white/30 px-5 py-1 bg-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="max-w-3xl text-center text-sm md:text-base text-gray-300 leading-relaxed px-4 md:px-12">
                  {project.description}
                </p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    className="mt-4 inline-flex items-center rounded-full border border-white/40 px-6 py-2 text-xs uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-black"
                  >
                    Visit project
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

export default function Projects() {
  const isMobile = useIsMobile();
  const { navigateTo } = useNavigation();
  const projectImage = useCursorStore((state) => state.projectImage);
  const setProjectImage = useCursorStore((state) => state.setProjectImage);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handlePreview = useCallback(
    (image: string | null) => {
      if (isMobile) return;
      setProjectImage(image);
    },
    [isMobile, setProjectImage]
  );

  useEffect(() => {
    if (isMobile) {
      setProjectImage(null);
    }

    return () => {
      setProjectImage(null);
    };
  }, [isMobile, setProjectImage]);

  return (
    <>
      <Head>
        {projectImageSources.map((source) => (
          <link key={source} rel="preload" as="image" href={source} />
        ))}
      </Head>
      <section className="relative py-16 md:py-24 lg:py-28">
        <div className="px-0">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-center tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.7 : 0.5 }}
          >
            PROJECTS ({projects.length})
          </motion.h1>

          <div className="mt-12 border-t border-white/10">
            {projects.map((project: Project, index: number) => (
              <ProjectRow
                key={project.title}
                project={project}
                index={index}
                isActive={expandedIndex === index}
                onToggle={handleToggle}
                onPreview={handlePreview}
                isMobile={isMobile}
              />
            ))}
          </div>

          <motion.div
            className="text-center mt-16 text-gray-500 text-sm px-4 md:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Should I count this website as my project?{' '}
            <span onClick={() => navigateTo('contact')} className="underline">
              Lemme know
            </span>
          </motion.div>
        </div>
      </section>
      <ProjectCursor projectImage={projectImage ?? undefined} />
    </>
  );
}
