'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/navigation';
import Home from '@/components/home';
import About from '@/components/about';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import Resume from '@/components/resume';
import { useNavigation } from '@/lib/context/navigation-context';

export default function Page() {
  const { currentSection } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    let timer: NodeJS.Timeout;
    if (hasLoaded) {
      setIsLoading(false);
    } else {
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      sessionStorage.setItem('hasLoaded', 'true');
    }
    return () => clearTimeout(timer);
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'resume':
        return <Resume />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 bg-[#111111] flex flex-col items-center justify-center z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl font-bold mb-8 text-gray-400">
              <LoadingPercentage />
            </div>
          </motion.div>
        ) : (
          <div key="content" className="w-full">
            <Navigation />
            {renderSection()}
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

function LoadingPercentage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = 2000;

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
