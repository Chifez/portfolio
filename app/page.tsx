'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/navigation';
import Home from '@/components/home';
import About from '@/components/about';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import Resume from '@/components/resume';

export default function Page() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Function to handle section changes
  const handleSectionChange = (section: string) => {
    console.log('Changing section to:', section);
    setCurrentSection(section);
  };

  const sections = {
    home: <Home />,
    about: <About />,
    projects: <Projects />,
    resume: <Resume />,
    contact: <Contact />,
  };

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 bg-[#111111] flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl font-bold mb-8 text-gray-400">
              <LoadingPercentage />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <Navigation
              currentSection={currentSection}
              setCurrentSection={handleSectionChange}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                layoutId={currentSection}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1], // cubic-bezier for smooth animation
                }}
                className="w-full"
              >
                {sections[currentSection as keyof typeof sections]}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function LoadingPercentage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = 2000; // 2 seconds for loading

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(
        Math.floor((elapsed / totalDuration) * 100),
        100
      );
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  return (
    <div className="realtive flex flex-col items-center">
      <div className="absolute right-3 bottom-2 text-7xl font-bold mb-8 text-gray-400">
        {progress}%
      </div>
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gray-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
