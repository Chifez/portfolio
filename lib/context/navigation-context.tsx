'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

type Section = 'home' | 'about' | 'projects' | 'resume' | 'blog' | 'contact';

interface NavigationContextType {
  currentSection: Section;
  navigateTo: (section: Section) => void;
  isTransitioning: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateTo = useCallback(
    (section: Section) => {
      if (currentSection === section || isTransitioning) return;

      setIsTransitioning(true);

      // Update section after a delay
      setTimeout(() => {
        setCurrentSection(section);

        // End transition after a delay
        setTimeout(() => {
          setIsTransitioning(false);
        }, 800);
      }, 800);
    },
    [currentSection, isTransitioning]
  );

  return (
    <NavigationContext.Provider
      value={{ currentSection, navigateTo, isTransitioning }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
