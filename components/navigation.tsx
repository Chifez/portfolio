'use client';

import { useNavigation } from '@/lib/context/navigation-context';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import Logo from './logo';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const { currentSection, navigateTo } = useNavigation();
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
    { id: 'resume', label: 'Résumé' },
  ];

  const router = useRouter();
  const handleNavClick = (section: string) => {
    console.log('Navigation clicked:', section);
    navigateTo(section as any);
  };

  const handleResumeClick = () => {
    window.open('/resume.pdf', '_blank');
  };

  const getNavLinks = () => {
    if (currentSection === 'home') {
      return (
        <>
          <div className="fixed top-8 left-8 z-40">
            <Logo size={48} />
          </div>
          <div className="z-20 px-4 fixed top-8 md:right-8 flex flex-col lg:flex-row items-end justify-between w-screen md:w-fit lg:gap-4 space-y-2">
            {navItems.map((item) =>
              item.id === 'blog' ? (
                <motion.button
                  key={item.id}
                  className="cursor-pointer nav-link text-left text-xs text-gray-500 hover:text-gray-300"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href="/blog" prefetch={true}>
                    {item.label}
                  </Link>
                </motion.button>
              ) : (
                <motion.button
                  key={item.id}
                  className="cursor-pointer nav-link text-left text-xs text-gray-500 hover:text-gray-300"
                  onClick={() => navigateTo(item.id as any)}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.button>
              )
            )}
          </div>

          {/* <div
            onClick={() => handleNavClick('about')}
            className="hidden md:block fixed top-8 right-8"
          >
            <div className="relative w-12 h-12 overflow-hidden rounded-md">
              <Image
                src="/user.webp?height=48&width=48"
                alt="Profile"
                width={48}
                height={48}
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 text-[8px] text-center bg-black bg-opacity-50 py-1">
                reveal me
              </div>
            </div>
          </div> */}
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
              onClick={() => handleNavClick('projects')}
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
        <div className="bg-[#111111] lg:bg-none z-20 fixed h-[70px] lg:h-fit w-full flex items-center justify-between">
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
        </div>
      );
    }

    if (currentSection === 'resume') {
      return (
        <div className="bg-[#111111] lg:bg-transparent fixed z-20 h-[70px] lg:h-fit w-full flex items-center justify-between px-8">
          <div className="fixed top-8 left-6 lg:left-8 flex items-center space-x-2">
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
          <motion.a
            href="/resume.pdf"
            download
            className="fixed top-8 right-6 lg:right-8 flex items-center space-x-2 text-xs text-gray-500 hover:text-gray-300"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
            onClick={handleResumeClick}
          >
            <span>Download Resume</span>
            <Download className="w-4 h-4" />
          </motion.a>
        </div>
      );
    }

    if (currentSection === 'contact') {
      return (
        <div className="bg-[#111111] lg:bg-none fixed z-20 h-[70px] lg:h-fit w-full flex items-center justify-between">
          <div className="fixed top-8 left-6 lg:left-8 flex items-center space-x-2">
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
        </div>
      );
    }

    return null;
  };

  return <nav className="w-full">{getNavLinks()}</nav>;
}
