// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { useIsMobile } from '@/hooks/use-mobile';
// import CustomCursor from './cursor';
// import { useNavigation } from '@/lib/context/navigation-context';
// import { ScrollIndicator } from './progress';

// interface Project {
//   title: string;
//   description: string;
//   technologies: string[];
//   link?: string;
//   image?: string;
// }

// export default function Projects() {
//   const headingRef = useRef<HTMLHeadingElement>(null);
//   const projectsContainerRef = useRef<HTMLDivElement>(null);
//   const projectsRef = useRef<HTMLDivElement>(null);
//   const isMobile = useIsMobile();
//   const { navigateTo } = useNavigation();
//   const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
//   const [isScrolling, setIsScrolling] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   const projects: Project[] = [
//     {
//       title: 'ASSIGNGPT',
//       description:
//         'A GPT-4 based AI assistant for people to get quizzes on any subject',
//       technologies: ['NEXTJS', 'TYPESCRIPT', 'TAILWINDCSS', 'OPENAI API'],
//       link: 'https://assign-gpt.vercel.app/',
//       image: '/assign.png',
//     },
//     {
//       title: 'ECHO',
//       description:
//         'A personal blogging website, where I write about my experiences and thoughts',
//       technologies: [
//         'TAILWINDCSS',
//         'SVELTE',
//         'TYPESCRIPT',
//         'MONGODB',
//         'NODEJS',
//       ],
//       link: 'https://echo-chifez.vercel.app/',
//       image: '/echo.png',
//     },
//     {
//       title: 'CONVERTLY',
//       description:
//         'A speech-to-text converter, with options for downloading, editing and sharing either as an image or a text file format of choice',
//       technologies: [
//         'TAILWINDCSS',
//         'NEXTJS',
//         'TYPESCRIPT',
//         'MONGODB',
//         'EXPRESSJS',
//         'NODEJS',
//       ],
//       link: 'https://stt-app-roan.vercel.app/',
//       image: '/convertly.png',
//     },
//     {
//       title: 'CLI-TEMPLATE-STARTER',
//       description:
//         'A cli tool for scaffolding frontend projects with a framework of choice',
//       technologies: ['JAVASCRIPT', 'NODEJS', 'YAML', 'NODEJS'],
//       link: 'https://github.com/Chifez/cli-template-starter',
//       image: '/user.webp',
//     },
//     {
//       title: 'ENSUBEB',
//       description:
//         'A website and admin dashboard for the Ensubeb, a Nigerian government agency that oversees the primary education in ENUGU STATE',
//       technologies: [
//         'NEXTJS',
//         'TYPESCRIPT',
//         'TAILWINDCSS',
//         'SANITY CMS',
//         'DJANGO',
//       ],
//       link: 'https://frontend-et2i.onrender.com/',
//       image: '/ensubeb.png',
//     },
//   ];

//   const handleProjectClick = (link: string | undefined) => {
//     window.open(link, '_blank');
//   };

//   // Handle scroll events to convert vertical scroll to horizontal scroll
//   // useEffect(() => {
//   //   if (isMobile) return;

//   //   const projectsContainer = projectsContainerRef.current;
//   //   if (!projectsContainer) return;

//   //   let isWheelEventProcessing = false;
//   //   let totalScroll = 0;
//   //   let maxScroll = 0;

//   //   // Calculate the maximum scroll distance
//   //   const calculateMaxScroll = () => {
//   //     const projectsElement = projectsRef.current;
//   //     if (projectsElement) {
//   //       maxScroll = projectsElement.scrollWidth - projectsElement.clientWidth;
//   //     }
//   //   };

//   //   // Calculate initially and on resize
//   //   calculateMaxScroll();
//   //   window.addEventListener('resize', calculateMaxScroll);

//   //   const handleWheel = (e: WheelEvent) => {
//   //     if (isWheelEventProcessing) return;
//   //     isWheelEventProcessing = true;

//   //     e.preventDefault();

//   //     // Determine the scroll amount (with some dampening)
//   //     const scrollAmount = e.deltaY * 1.5;

//   //     // Update the total scroll position
//   //     totalScroll = Math.max(
//   //       0,
//   //       Math.min(totalScroll + scrollAmount, maxScroll)
//   //     );

//   //     // Calculate scroll progress as a percentage
//   //     const progress = maxScroll > 0 ? totalScroll / maxScroll : 0;
//   //     setScrollProgress(progress);

//   //     // Apply the scroll to the projects container
//   //     if (projectsRef.current) {
//   //       projectsRef.current.scrollLeft = totalScroll;
//   //       setIsScrolling(true);
//   //     }

//   //     // Reset the processing flag after a short delay
//   //     setTimeout(() => {
//   //       isWheelEventProcessing = false;
//   //       setIsScrolling(false);
//   //     }, 50);
//   //   };

//   //   projectsContainer.addEventListener('wheel', handleWheel, {
//   //     passive: false,
//   //   });

//   //   return () => {
//   //     projectsContainer.removeEventListener('wheel', handleWheel);
//   //     window.removeEventListener('resize', calculateMaxScroll);
//   //   };
//   // }, [isMobile]);

//   useEffect(() => {
//     if (isMobile) return;

//     const projectsContainer = projectsContainerRef.current;
//     if (!projectsContainer) return;

//     let animationFrameId: number;
//     let totalScroll = 0;
//     let maxScroll = 0;
//     let targetScroll = 0;
//     let isScrolling = false;

//     const calculateMaxScroll = () => {
//       const projectsElement = projectsRef.current;
//       if (projectsElement) {
//         maxScroll = projectsElement.scrollWidth - projectsElement.clientWidth;
//       }
//     };

//     calculateMaxScroll();
//     window.addEventListener('resize', calculateMaxScroll);

//     const animateScroll = () => {
//       if (!isScrolling) return;

//       const easingFactor = 0.1;
//       totalScroll += (targetScroll - totalScroll) * easingFactor;

//       if (Math.abs(targetScroll - totalScroll) < 0.5) {
//         totalScroll = targetScroll;
//         isScrolling = false;
//       }

//       if (projectsRef.current) {
//         projectsRef.current.scrollLeft = totalScroll;
//         setScrollProgress(maxScroll > 0 ? totalScroll / maxScroll : 0);
//       }

//       animationFrameId = requestAnimationFrame(animateScroll);
//     };

//     const handleWheel = (e: WheelEvent) => {
//       e.preventDefault();

//       // Use deltaMode to handle different wheel input types
//       const delta = e.deltaMode === 1 ? e.deltaY * 40 : e.deltaY;

//       // Apply non-linear dampening for better feel
//       const scrollAmount = delta * (Math.abs(delta) > 50 ? 1.2 : 0.8);

//       targetScroll = Math.max(
//         0,
//         Math.min(targetScroll + scrollAmount, maxScroll)
//       );

//       if (!isScrolling) {
//         isScrolling = true;
//         animationFrameId = requestAnimationFrame(animateScroll);
//       }
//     };

//     projectsContainer.addEventListener('wheel', handleWheel, {
//       passive: false,
//     });

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       projectsContainer.removeEventListener('wheel', handleWheel);
//       window.removeEventListener('resize', calculateMaxScroll);
//     };
//   }, [isMobile]);

//   // Animation effects
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('animate-fade-in');
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (headingRef.current) observer.observe(headingRef.current);
//     if (projectsRef.current) observer.observe(projectsRef.current);

//     return () => {
//       if (headingRef.current) observer.unobserve(headingRef.current);
//       if (projectsRef.current) observer.unobserve(projectsRef.current);
//     };
//   }, []);

//   return (
//     <div
//       ref={projectsContainerRef}
//       className="h-screen py-20 lg:pt-10 lg:py-0 lg:overflow-hidden select-none"
//     >
//       <CustomCursor projectImage={hoveredProject?.image} />

//       <motion.h1
//         ref={headingRef}
//         className="text-6xl md:text-7xl font-bold text-center opacity-0 tracking-tighter"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: isMobile ? 0.7 : 0.5 }}
//       >
//         PROJECTS ({projects.length})
//       </motion.h1>
//       <motion.div
//         className="flex items-center justify-center gap-2 text-center mb-4 text-gray-500 text-sm"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.6 }}
//       >
//         scroll down
//         {!isMobile && (
//           <ScrollIndicator progress={scrollProgress} isMobile={isMobile} />
//         )}
//       </motion.div>

//       <motion.div
//         ref={projectsRef}
//         className={`
//           flex lg:flex-row flex-col w-full overflow-x-auto
//           lg:scroll-smooth lg:pb-4 scroll-hidden gap-4 opacity-0 cursor-pointer px-4
//           ${isScrolling ? 'lg:scroll-smooth' : ''}
//         `}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: isMobile ? 0.7 : 0.5, delay: 0.2 }}
//       >
//         {projects.map((project, index) => (
//           <motion.div
//             key={index}
//             className="project-card min-h-[300px] w-full lg:w-[calc(100vw/3)] flex-shrink-0 flex flex-col rounded-2xl p-8"
//             whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
//             transition={{ duration: isMobile ? 0.5 : 0.3 }}
//             onClick={() => handleProjectClick(project.link)}
//             onMouseEnter={() => setHoveredProject(project)}
//             onMouseLeave={() => setHoveredProject(null)}
//           >
//             <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
//             <p className="text-gray-500 mb-auto">{project.description}</p>
//             <div className="flex flex-wrap gap-4 mt-8">
//               {project.technologies.map((tech, techIndex) => (
//                 <span key={techIndex} className="text-gray-400 text-sm">
//                   {tech}
//                 </span>
//               ))}
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>

//       <motion.div
//         className="text-center mt-16 text-gray-500 text-sm"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.8 }}
//       >
//         Should I count this website as my project?{' '}
//         <span onClick={() => navigateTo('contact')} className="underline">
//           Lemme know
//         </span>
//       </motion.div>
//     </div>
//   );
// }

'use client';

import { Key, SetStateAction, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import ProjectCursor from '@/components/project-cursor';
import { useNavigation } from '@/lib/context/navigation-context';
import { useCursorStore } from '@/lib/store/cursor-store';
import { ScrollIndicator } from './progress';
import { Project } from '@/lib/types';
import { projects } from '@/lib/data';

export default function Projects() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { navigateTo } = useNavigation();
  const { setCustomCursorActive } = useCursorStore();
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleProjectClick = (link: string | undefined) => {
    window.open(link, '_blank');
  };

  // Enable custom cursor when component mounts, disable when unmounts
  useEffect(() => {
    setCustomCursorActive(true);

    return () => {
      setCustomCursorActive(false);
    };
  }, [setCustomCursorActive]);

  // Handle scroll events to convert vertical scroll to horizontal scroll
  useEffect(() => {
    if (isMobile) return;

    const projectsContainer = projectsContainerRef.current;
    if (!projectsContainer) return;

    let isWheelEventProcessing = false;
    let totalScroll = 0;
    let maxScroll = 0;

    // Calculate the maximum scroll distance
    const calculateMaxScroll = () => {
      const projectsElement = projectsRef.current;
      if (projectsElement) {
        maxScroll = projectsElement.scrollWidth - projectsElement.clientWidth;
      }
    };

    // Calculate initially and on resize
    calculateMaxScroll();
    window.addEventListener('resize', calculateMaxScroll);

    const handleWheel = (e: WheelEvent) => {
      if (isWheelEventProcessing) return;
      isWheelEventProcessing = true;

      e.preventDefault();

      // Determine the scroll amount (with some dampening)
      const scrollAmount = e.deltaY * 1.5;

      // Update the total scroll position
      totalScroll = Math.max(
        0,
        Math.min(totalScroll + scrollAmount, maxScroll)
      );

      // Calculate scroll progress as a percentage
      const progress = maxScroll > 0 ? totalScroll / maxScroll : 0;
      setScrollProgress(progress);

      // Apply the scroll to the projects container
      if (projectsRef.current) {
        projectsRef.current.scrollLeft = totalScroll;
        setIsScrolling(true);
      }

      // Reset the processing flag after a short delay
      setTimeout(() => {
        isWheelEventProcessing = false;
        setIsScrolling(false);
      }, 50);
    };

    projectsContainer.addEventListener('wheel', handleWheel, {
      passive: false,
    });

    return () => {
      projectsContainer.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', calculateMaxScroll);
    };
  }, [isMobile]);

  // Animation effects
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
    <div
      ref={projectsContainerRef}
      className="h-screen py-20 lg:pt-10 lg:py-0 lg:overflow-hidden select-none"
    >
      {/* Use the specialized project cursor here */}
      <ProjectCursor projectImage={hoveredProject?.image} />

      <motion.h1
        ref={headingRef}
        className="text-6xl md:text-7xl font-bold text-center opacity-0 tracking-tighter"
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
        ref={projectsRef}
        className={`
          flex lg:flex-row flex-col w-full overflow-x-auto 
          lg:scroll-smooth lg:pb-4 scroll-hidden gap-4 opacity-0 cursor-pointer px-4
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
