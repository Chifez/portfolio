'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
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
      link: 'https://assigngpt.vercel.app/',
    },
    {
      title: 'CONVERTLY',
      description:
        'A speech-to-text converter, with options for downloading, editing and sharing either as an image or a text file format of choice',
      technologies: [
        'TAILWINDCSS',
        'NEXTJS',
        'TYPESCRIPT',
        'MONGODB',
        'EXPRESSJS',
        'NODEJS',
      ],
      link: 'https://stt-app-roan.vercel.app/',
    },
    {
      title: 'CLI-TEMPLATE-STARTER',
      description:
        'A cli tool for scaffolding frontend projects with a framework of choice',
      technologies: ['JAVASCRIPT', 'NODEJS', 'YAML', 'NODEJS'],
      link: 'https://github.com/Chifez/cli-template-starter',
    },
    {
      title: 'ENSUBEB',
      description:
        'A website and admin dashboard for the Ensubeb, a Nigerian government agency that oversees the primary education in ENUGU STATE',
      technologies: [
        'NEXTJS',
        'TYPESCRIPT',
        'TAILWINDCSS',
        'SANITY CMS',
        'DJANGO',
      ],
      link: 'https://frontend-et2i.onrender.com/',
    },
  ];

  const handleProjectClick = (link: string | undefined) => {
    window.open(link, '_blank');
  };

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
        className="flex lg:flex-row flex-col w-full overflow-x-auto scroll-hidden gap-0 opacity-0 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card min-h-[300px] w-full lg:w-[calc(100vw/3)] flex-shrink-0 flex flex-col p-8"
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
            transition={{ duration: 0.3 }}
            onClick={() => handleProjectClick(project.link)}
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
