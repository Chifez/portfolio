'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  technologies: string[];
}

export default function Projects() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      title: 'ASSIGNGPT',
      description:
        'A GPT-4 based AI assistant for people to get quizzes on any subject',
      technologies: ['NEXTJS', 'TYPESCRIPT', 'TAILWINDCSS', 'OPENAI API'],
    },
    {
      title: 'CONVERTLY',
      description: 'A speech-to-speech translation app',
      technologies: [
        'TAILWINDCSS',
        'NEXTJS',
        'TYPESCRIPT',
        'MONGODB',
        'EXPRESSJS',
        'NODEJS',
      ],
    },
    {
      title: 'URLIFY',
      description: 'A super simple URL shortener',
      technologies: ['HTML', 'CSS', 'JS', 'BITLY API'],
    },
  ];

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
    if (projectsRef.current) observer.observe(projectsRef.current);

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (projectsRef.current) observer.unobserve(projectsRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen py-20 lg:py-10">
      <motion.h1
        ref={headingRef}
        className="text-6xl md:text-7xl font-bold text-center mb-10 opacity-0 tracking-tighter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        PROJECTS ({projects.length})
      </motion.h1>
      <motion.div
        className="text-center mt-2 mb-4 text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        (scroll to view projects)
      </motion.div>
      <motion.div
        ref={projectsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-0 opacity-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card min-h-[300px] flex flex-col"
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
            transition={{ duration: 0.3 }}
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
        <a href="#" className="underline">
          Lemme know
        </a>
      </motion.div>
    </div>
  );
}
