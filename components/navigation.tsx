'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface NavigationProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

export default function Navigation({
  currentSection,
  setCurrentSection,
}: NavigationProps) {
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
    { id: 'resume', label: 'Résumé' },
  ];

  const handleNavClick = (section: string) => {
    console.log('Navigation clicked:', section);
    setCurrentSection(section);
  };

  const getNavLinks = () => {
    if (currentSection === 'home') {
      return (
        <>
          <div className="z-20 px-4 fixed top-8 md:left-8 flex flex-row items-end lg:items-start justify-between w-screen md:w-fit lg:flex-col space-y-4 ">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className="cursor-pointer nav-link text-left text-xs text-gray-500 hover:text-gray-300"
                onClick={() => handleNavClick(item.id)}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
          <div className="hidden md:block fixed top-8 right-8">
            <div className="relative w-12 h-12 overflow-hidden rounded-md">
              <Image
                src="/placeholder.svg?height=48&width=48"
                alt="Profile"
                width={48}
                height={48}
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 text-[8px] text-center bg-black bg-opacity-50 py-1">
                reveal me
              </div>
            </div>
          </div>
        </>
      );
    }

    if (currentSection === 'about') {
      return (
        <div className="bg-[#111111] lg:bg-none z-20 fixed h-[70px] lg:h-fit w-full lg:w-[55vw] flex items-center justify-between">
          <div className="absolute top-8 left-6 lg:left-8 flex items-center justify-between space-x-2">
            <ChevronLeft className="w-4 h-4" />
            <motion.button
              className="nav-link text-xs text-gray-500 hover:text-gray-300"
              onClick={() => handleNavClick('home')}
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              Back to Home
            </motion.button>
          </div>
          <div className="absolute top-8 right-6 lg:left-[40vw] flex items-center space-x-2">
            <motion.button
              className="nav-link text-xs text-gray-500 hover:text-gray-300"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              See my projects
            </motion.button>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      );
    }

    if (currentSection === 'projects') {
      return (
        <>
          <div className="fixed top-8 left-8 flex items-center space-x-2">
            <ChevronLeft className="w-4 h-4" />
            <motion.button
              className="nav-link text-xs text-gray-500 hover:text-gray-300"
              onClick={() => handleNavClick('home')}
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              Back to Home
            </motion.button>
          </div>
          <div className="fixed top-8 right-8 flex items-center space-x-2">
            <motion.button
              className="nav-link text-xs text-gray-500 hover:text-gray-300"
              onClick={() => handleNavClick('contact')}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Connect with me
            </motion.button>
            <ChevronRight className="w-4 h-4" />
          </div>
        </>
      );
    }

    if (currentSection === 'resume') {
      return (
        <div className="fixed top-8 left-8 flex items-center space-x-2">
          <ChevronLeft className="w-4 h-4" />
          <motion.button
            className="nav-link text-xs text-gray-500 hover:text-gray-300"
            onClick={() => handleNavClick('home')}
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
          >
            Back to Home
          </motion.button>
        </div>
      );
    }

    if (currentSection === 'contact') {
      return (
        <div className="fixed top-8 left-8 flex items-center space-x-2">
          <ChevronLeft className="w-4 h-4" />
          <motion.button
            className="nav-link text-xs text-gray-500 hover:text-gray-300"
            onClick={() => handleNavClick('home')}
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
          >
            Back to Home
          </motion.button>
        </div>
      );
    }

    return null;
  };

  return <nav className="w-full">{getNavLinks()}</nav>;
}
