'use client';

import { Key, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHorizontalScroll } from '@/hooks/use-horizontal-scroll';
import ProjectCursor from '@/components/project-cursor';
import { useNavigation } from '@/lib/context/navigation-context';
import { ScrollIndicator } from './progress';
import { Project } from '@/lib/types';
import { projects } from '@/lib/data';

export default function Projects() {
  const isMobile = useIsMobile();
  const { navigateTo } = useNavigation();
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const { containerRef, contentRef, scrollProgress, isScrolling } =
    useHorizontalScroll({
      disabled: isMobile,
    });

  const handleProjectClick = (link: string | undefined) => {
    window.open(link, '_blank');
  };

  return (
    <div
      ref={containerRef}
      className="h-screen py-20 lg:pt-10 lg:py-0 lg:overflow-hidden select-none"
    >
      {/* Custom cursor is automatically managed by derived state */}
      <ProjectCursor projectImage={hoveredProject?.image} />

      <motion.h1
        className="text-6xl md:text-7xl font-bold text-center tracking-tighter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: isMobile ? 0.7 : 0.5 }}
      >
        PROJECTS ({projects.length})
      </motion.h1>

      <motion.div
        className="flex items-center justify-center gap-2 text-center mb-4 text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {!isMobile && (
          <ScrollIndicator progress={scrollProgress} isMobile={isMobile} />
        )}
      </motion.div>

      <motion.div
        ref={contentRef}
        className={`
          flex lg:flex-row flex-col w-full overflow-x-auto 
          lg:scroll-smooth lg:pb-4 scroll-hidden gap-4 cursor-pointer px-4
          ${isScrolling ? 'lg:scroll-auto' : ''}
        `}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: isMobile ? 0.7 : 0.5, delay: 0.2 }}
      >
        {projects.map((project: Project, index: Key | null | undefined) => (
          <motion.div
            key={index}
            className="project-card min-h-[300px] w-full lg:w-[calc(100vw/3)] flex-shrink-0 flex flex-col rounded-2xl p-8"
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
            transition={{ duration: isMobile ? 0.5 : 0.3 }}
            onClick={() => handleProjectClick(project.link)}
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
            <p className="text-gray-500 mb-auto">{project.description}</p>
            <div className="flex flex-wrap gap-4 mt-8">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="text-gray-400 text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-16 text-gray-500 text-sm"
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
  );
}
